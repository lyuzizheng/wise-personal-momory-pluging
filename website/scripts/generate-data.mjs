#!/usr/bin/env node
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const websiteDir = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(websiteDir, "..");
const traceRoot = path.resolve(process.argv[2] || path.join(repoRoot, "personal-work-trace"));
const outputFile = path.join(websiteDir, "data", "work-trace.js");

const data = await buildDataset(traceRoot);
await mkdir(path.dirname(outputFile), { recursive: true });
await writeFile(outputFile, `window.WORK_TRACE_DATA = ${JSON.stringify(data, null, 2)};\n`, "utf8");
console.log(`Wrote ${path.relative(repoRoot, outputFile)} from ${path.relative(repoRoot, traceRoot)}`);

async function buildDataset(root) {
  const generatedAt = new Date().toISOString();
  if (!existsSync(root)) {
    return emptyDataset(root, generatedAt, "trace_root_missing");
  }

  const files = await listFiles(root);
  if (!files.length) {
    return emptyDataset(root, generatedAt, "trace_root_empty");
  }

  const config = await readConfig(root);
  const dailyRecords = await readDailyRecords(root);
  const events = await readEvents(root);
  const projects = await readProjects(root, events, dailyRecords);
  const rollups = await readRollups(root);
  const signals = collectSignals(dailyRecords, events, projects, rollups);
  const roles = collectRoles(projects);
  const dateRange = getDateRange(dailyRecords, events);

  return {
    schema_version: 1,
    generated_at: generatedAt,
    trace: {
      exists: true,
      initialized: existsSync(path.join(root, "state", "skill_snapshot.json")) || existsSync(path.join(root, "README.md")),
      root,
      user: config.user,
      date_range: dateRange
    },
    stats: {
      daily_record_count: dailyRecords.length,
      event_count: events.length,
      project_count: projects.length,
      role_count: roles.length,
      source_gap_count: signals.source_gaps.length,
      followup_count: signals.followups.length,
      risk_count: signals.risks.length
    },
    dailyRecords,
    events,
    projects,
    roles,
    sources: collectSources(config.sources, events, dailyRecords),
    rollups,
    signals
  };
}

function emptyDataset(root, generatedAt, reason) {
  return {
    schema_version: 1,
    generated_at: generatedAt,
    trace: {
      exists: false,
      initialized: false,
      root,
      date_range: null,
      reason
    },
    stats: {
      daily_record_count: 0,
      event_count: 0,
      project_count: 0,
      role_count: 0,
      source_gap_count: 1,
      followup_count: 0,
      risk_count: 0
    },
    dailyRecords: [],
    events: [],
    projects: [],
    roles: [],
    sources: [],
    rollups: { weekly: [], monthly: [], quarterly: [] },
    signals: { followups: [], risks: [], source_gaps: [reason] }
  };
}

async function readConfig(root) {
  const userYaml = await readOptional(path.join(root, "config", "user.yaml"));
  const sourcesYaml = await readOptional(path.join(root, "config", "sources.yaml"));
  return {
    user: parseSimpleYaml(userYaml),
    sources: parseSimpleYaml(sourcesYaml)
  };
}

async function readDailyRecords(root) {
  const summaryFiles = await listMatching(path.join(root, "daily"), /\.summary\.json$/);
  const records = [];

  for (const file of summaryFiles) {
    const summary = await readJson(file);
    if (!summary) continue;
    const date = summary.date || path.basename(file).replace(".summary.json", "");
    const markdownPath = file.replace(".summary.json", ".md");
    const markdown = await readOptional(markdownPath);
    const frontmatter = parseFrontmatter(markdown).data;

    records.push({
      date,
      confidence: numberOrNull(summary.confidence ?? frontmatter.confidence),
      event_count: Number(summary.event_count || 0),
      projects_touched: summary.projects_touched || {},
      unclassified_event_count: Number(summary.unclassified_event_count || 0),
      source_gaps: summary.source_gaps || [],
      executive_summary: extractSection(markdown, "Executive Summary"),
      delta: extractSection(markdown, "Delta vs Previous Day"),
      sources_covered: frontmatter.sources_covered || {},
      path: rel(root, markdownPath)
    });
  }

  return records.sort((a, b) => a.date.localeCompare(b.date));
}

async function readEvents(root) {
  const eventFiles = await listMatching(path.join(root, "events"), /\.events\.jsonl$/);
  const events = [];

  for (const file of eventFiles) {
    const rows = await readJsonl(file);
    for (const row of rows) {
      const derived = row.derived_items || {};
      events.push({
        id: row.event_id,
        date: row.record_date || dateFromTimestamp(row.timestamp),
        timestamp: row.timestamp,
        source: row.source,
        action_type: row.action_type,
        title: row.raw_title,
        summary: row.factual_summary,
        project_id: row.selected_project_id || firstProjectCandidate(row.project_candidates),
        confidence: numberOrNull(row.classification_confidence),
        privacy_level: row.privacy?.level,
        safe_to_publish: Boolean(row.privacy?.safe_to_publish),
        evidence_count: Array.isArray(row.evidence) ? row.evidence.length : 0,
        decisions: derived.decisions || [],
        followups: derived.followups || [],
        risks: derived.risks || [],
        path: rel(root, file)
      });
    }
  }

  return events.sort((a, b) => String(a.timestamp || a.date).localeCompare(String(b.timestamp || b.date)));
}

async function readProjects(root, events, dailyRecords) {
  const files = await projectDefinitionFiles(root);
  const projectMap = new Map();

  for (const file of files) {
    const parsed = await parseProjectFile(root, file);
    if (!parsed.id) continue;
    const existing = projectMap.get(parsed.id) || {};
    projectMap.set(parsed.id, mergeProject(existing, parsed));
  }

  for (const project of projectMap.values()) {
    const detailDir = path.join(root, "projects", project.lifecycle || "active", project.id);
    const fallbackDir = await firstExistingDir([
      detailDir,
      path.join(root, "projects", "active", project.id),
      path.join(root, "projects", "archived", project.id)
    ]);
    if (fallbackDir) {
      Object.assign(project, await readProjectDetails(root, fallbackDir, project));
    }
  }

  for (const event of events) {
    if (!event.project_id || projectMap.has(event.project_id)) continue;
    projectMap.set(event.project_id, {
      id: event.project_id,
      name: titleFromId(event.project_id),
      status: "observed",
      role: "Unspecified role",
      lifecycle: "observed",
      paths: []
    });
  }

  const dailyTouches = new Map();
  for (const record of dailyRecords) {
    for (const projectId of Object.keys(record.projects_touched || {})) {
      const current = dailyTouches.get(projectId) || new Set();
      current.add(record.date);
      dailyTouches.set(projectId, current);
    }
  }

  return [...projectMap.values()].map((project) => {
    const projectEvents = events.filter((event) => event.project_id === project.id);
    const latestDate = projectEvents.map((event) => event.date).filter(Boolean).sort().at(-1) || null;
    return {
      ...project,
      name: project.name || titleFromId(project.id),
      status: project.status || project.lifecycle || "unknown",
      role: project.role || "Unspecified role",
      event_count: projectEvents.length,
      daily_count: dailyTouches.get(project.id)?.size || 0,
      latest_date: latestDate,
      timeline_count: project.timeline_count || 0,
      decisions_count: project.decisions_count || 0,
      followups_count: project.followups_count || 0,
      risks_count: project.risks_count || 0
    };
  }).sort((a, b) => (b.event_count - a.event_count) || a.name.localeCompare(b.name));
}

async function projectDefinitionFiles(root) {
  const projectRoot = path.join(root, "projects");
  const files = await listMatching(projectRoot, /\.(ya?ml|md)$/);
  return files.filter((file) => {
    const base = path.basename(file);
    if (["daily-index.md", "decisions.md", "followups.md", "risks.md"].includes(base)) return false;
    if (base === "project.md") return true;
    return path.dirname(file).match(/projects\/(active|archived)$/) && /\.(ya?ml|md)$/.test(base);
  });
}

async function parseProjectFile(root, file) {
  const text = await readOptional(file);
  const lifecycleMatch = file.match(/projects\/(active|archived)(?:\/|$)/);
  const lifecycle = lifecycleMatch?.[1] || "unknown";
  const extension = path.extname(file);
  let meta = {};
  let body = "";

  if (extension === ".md") {
    const parsed = parseFrontmatter(text);
    meta = parsed.data;
    body = parsed.body;
  } else {
    meta = parseSimpleYaml(text);
  }

  const id = meta.id || meta.project_id || projectIdFromPath(file);
  const role = meta.role?.user_role || meta.user_role || meta.role;
  return {
    id,
    name: meta.name,
    status: meta.status,
    priority: meta.priority,
    themes: arrayFrom(meta.themes),
    role: typeof role === "string" ? role : undefined,
    role_confidence: meta.role?.confidence || meta.role_confidence,
    confidence: numberOrNull(meta.confidence),
    aliases: arrayFrom(meta.aliases),
    source_links: arrayFrom(meta.source_links),
    definition: extractSection(body, "Definition"),
    current_status: extractSection(body, "Current Status"),
    lifecycle,
    paths: [rel(root, file)]
  };
}

async function readProjectDetails(root, dir, project) {
  const result = {};
  const timeline = await readJsonl(path.join(dir, "timeline.jsonl"));
  result.timeline_count = timeline.length;
  result.paths = unique([...(project.paths || []), rel(root, dir)]);

  for (const [key, file] of [
    ["decisions_count", "decisions.md"],
    ["followups_count", "followups.md"],
    ["risks_count", "risks.md"]
  ]) {
    const content = await readOptional(path.join(dir, file));
    result[key] = countMarkdownBullets(content);
  }

  if (!project.definition || !project.current_status) {
    const projectMd = await readOptional(path.join(dir, "project.md"));
    const parsed = parseFrontmatter(projectMd);
    result.definition = project.definition || extractSection(parsed.body, "Definition");
    result.current_status = project.current_status || extractSection(parsed.body, "Current Status");
  }

  return result;
}

async function readRollups(root) {
  return {
    weekly: await readSummaryFiles(path.join(root, "weekly"), /\.summary\.json$/, "week"),
    monthly: await readSummaryFiles(path.join(root, "monthly"), /\.summary\.json$/, "month"),
    quarterly: await readSummaryFiles(path.join(root, "quarterly"), /\.summary\.json$/, "quarter")
  };
}

async function readSummaryFiles(dir, pattern, labelKey) {
  const files = await listMatching(dir, pattern);
  const rows = [];
  for (const file of files) {
    const value = await readJson(file);
    if (!value) continue;
    rows.push({
      ...value,
      [labelKey]: value[labelKey] || path.basename(file).replace(".summary.json", ""),
      path: file
    });
  }
  return rows.sort((a, b) => String(a[labelKey]).localeCompare(String(b[labelKey])));
}

function collectSignals(dailyRecords, events, projects, rollups) {
  const followups = [];
  const risks = [];
  const sourceGaps = [];

  for (const record of dailyRecords) sourceGaps.push(...(record.source_gaps || []));
  for (const event of events) {
    followups.push(...(event.followups || []));
    risks.push(...(event.risks || []));
  }
  for (const project of projects) {
    if (project.followups_count) followups.push(`${project.name}: ${project.followups_count} project follow-up entries`);
    if (project.risks_count) risks.push(`${project.name}: ${project.risks_count} project risk entries`);
  }
  for (const group of Object.values(rollups)) {
    for (const rollup of group) {
      followups.push(...(rollup.open_followups || []));
      sourceGaps.push(...(rollup.source_gaps || []));
    }
  }

  return {
    followups: unique(followups.filter(Boolean)),
    risks: unique(risks.filter(Boolean)),
    source_gaps: unique(sourceGaps.filter(Boolean))
  };
}

function collectRoles(projects) {
  const roles = new Map();
  for (const project of projects) {
    const role = project.role || "Unspecified role";
    const item = roles.get(role) || { name: role, project_count: 0, event_count: 0, projects: [] };
    item.project_count += 1;
    item.event_count += project.event_count || 0;
    item.projects.push(project.id);
    roles.set(role, item);
  }
  return [...roles.values()].sort((a, b) => (b.event_count - a.event_count) || a.name.localeCompare(b.name));
}

function collectSources(configSources, events, dailyRecords) {
  const eventCounts = new Map();
  for (const event of events) eventCounts.set(event.source || "unknown", (eventCounts.get(event.source || "unknown") || 0) + 1);

  const covered = new Map();
  for (const record of dailyRecords) {
    for (const [source, value] of Object.entries(record.sources_covered || {})) {
      const current = covered.get(source) || { true_count: 0, false_count: 0 };
      if (value) current.true_count += 1;
      else current.false_count += 1;
      covered.set(source, current);
    }
  }

  const configured = Object.keys(configSources || {});
  return unique([...configured, ...eventCounts.keys(), ...covered.keys()]).map((source) => ({
    source,
    event_count: eventCounts.get(source) || 0,
    covered_true_count: covered.get(source)?.true_count || 0,
    covered_false_count: covered.get(source)?.false_count || 0
  }));
}

function getDateRange(dailyRecords, events) {
  const dates = [
    ...dailyRecords.map((record) => record.date),
    ...events.map((event) => event.date)
  ].filter(Boolean).sort();
  return dates.length ? { start: dates[0], end: dates.at(-1) } : null;
}

function mergeProject(existing, next) {
  return {
    ...existing,
    ...next,
    themes: unique([...(existing.themes || []), ...(next.themes || [])]),
    aliases: unique([...(existing.aliases || []), ...(next.aliases || [])]),
    source_links: unique([...(existing.source_links || []), ...(next.source_links || [])]),
    paths: unique([...(existing.paths || []), ...(next.paths || [])])
  };
}

async function listFiles(dir) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(fullPath));
    else if (entry.isFile()) files.push(fullPath);
  }
  return files;
}

async function listMatching(dir, pattern) {
  const files = await listFiles(dir);
  return files.filter((file) => pattern.test(file)).sort();
}

async function readOptional(file) {
  try {
    return await readFile(file, "utf8");
  } catch {
    return "";
  }
}

async function readJson(file) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch {
    return null;
  }
}

async function readJsonl(file) {
  const text = await readOptional(file);
  if (!text.trim()) return [];
  return text.split(/\r?\n/).filter(Boolean).map((line) => {
    try {
      return JSON.parse(line);
    } catch {
      return null;
    }
  }).filter(Boolean);
}

function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, body: text || "" };
  return {
    data: parseSimpleYaml(match[1]),
    body: text.slice(match[0].length)
  };
}

function parseSimpleYaml(text) {
  const root = {};
  const lines = String(text || "").split(/\r?\n/);
  let currentKey = null;
  let currentNestedKey = null;

  for (const rawLine of lines) {
    const line = rawLine.replace(/\s+#.*$/, "");
    if (!line.trim()) continue;
    const indent = line.match(/^\s*/)[0].length;
    const trimmed = line.trim();

    if (trimmed.startsWith("- ")) {
      const target = currentNestedKey ? root[currentKey][currentNestedKey] : root[currentKey];
      if (Array.isArray(target)) target.push(parseScalar(trimmed.slice(2)));
      continue;
    }

    const pair = trimmed.match(/^([^:]+):\s*(.*)$/);
    if (!pair) continue;
    const key = pair[1].trim();
    const rawValue = pair[2].trim();

    if (indent === 0) {
      currentKey = key;
      currentNestedKey = null;
      root[key] = rawValue ? parseScalar(rawValue) : {};
      if (!rawValue && nextLineIsArray(lines, rawLine)) root[key] = [];
    } else if (currentKey) {
      if (Array.isArray(root[currentKey])) continue;
      if (!root[currentKey] || typeof root[currentKey] !== "object") root[currentKey] = {};
      currentNestedKey = key;
      root[currentKey][key] = rawValue ? parseScalar(rawValue) : [];
    }
  }

  return root;
}

function nextLineIsArray(lines, currentLine) {
  const index = lines.indexOf(currentLine);
  const next = lines.slice(index + 1).find((line) => line.trim());
  return Boolean(next?.trim().startsWith("- "));
}

function parseScalar(value) {
  const trimmed = String(value).trim();
  if (/^".*"$/.test(trimmed) || /^'.*'$/.test(trimmed)) return trimmed.slice(1, -1);
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "null") return null;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  return trimmed;
}

function extractSection(markdown, heading) {
  if (!markdown) return "";
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`^## ${escaped}\\s*\\r?\\n([\\s\\S]*?)(?=^## |\\z)`, "m");
  const match = markdown.match(pattern);
  return match ? cleanMarkdown(match[1]) : "";
}

function cleanMarkdown(text) {
  return String(text || "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function countMarkdownBullets(text) {
  return String(text || "").split(/\r?\n/).filter((line) => /^\s*[-*]\s+\S/.test(line)).length;
}

function firstProjectCandidate(candidates) {
  return Array.isArray(candidates) && candidates[0] ? candidates[0].project_id : null;
}

function dateFromTimestamp(value) {
  return String(value || "").slice(0, 10) || null;
}

function numberOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function arrayFrom(value) {
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (value === undefined || value === null || value === "") return [];
  return [String(value)];
}

function projectIdFromPath(file) {
  if (path.basename(file) === "project.md") return path.basename(path.dirname(file));
  return path.basename(file).replace(/\.(ya?ml|md)$/, "");
}

function titleFromId(id) {
  return String(id || "unknown").split(/[-_]/).map((part) => part ? part[0].toUpperCase() + part.slice(1) : part).join(" ");
}

async function firstExistingDir(dirs) {
  for (const dir of dirs) {
    try {
      if ((await stat(dir)).isDirectory()) return dir;
    } catch {
      continue;
    }
  }
  return null;
}

function rel(root, file) {
  return path.relative(root, file).replaceAll(path.sep, "/");
}

function unique(values) {
  return [...new Set(values.filter((value) => value !== undefined && value !== null && value !== ""))].sort((a, b) => String(a).localeCompare(String(b)));
}

