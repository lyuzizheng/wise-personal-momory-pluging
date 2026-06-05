const data = window.WORK_TRACE_DATA || { trace: { exists: false }, stats: {}, projects: [], dailyRecords: [], events: [], rollups: {} };

const palette = ["#2f5711", "#168a88", "#4267c2", "#b94878", "#9b6b12", "#5b6c24", "#7a4fb3", "#c4562f"];
const state = {
  role: "all",
  status: "all",
  project: "all",
  source: "all",
  search: ""
};

const byId = (id) => document.getElementById(id);
const fmt = new Intl.NumberFormat("en");

function init() {
  if (!data.trace?.exists) {
    renderEmpty();
    return;
  }

  renderMeta();
  renderMetrics();
  renderTimeline();
  setupFilters();
  renderProjects();
  renderEvents();
  renderSignals();
  renderRollups();
}

function renderEmpty() {
  const emptyState = byIdFromTemplate();
  document.body.innerHTML = "";
  document.body.appendChild(emptyState);
}

function byIdFromTemplate() {
  const template = document.querySelector("#emptyTemplate");
  return template.content.firstElementChild.cloneNode(true);
}

function renderMeta() {
  byId("generatedMeta").textContent = `Generated ${formatDateTime(data.generated_at)} from ${data.trace.root || "personal-work-trace"}`;
  const range = data.trace.date_range;
  byId("traceRange").textContent = range?.start
    ? `${range.start} to ${range.end}. ${data.trace.initialized ? "Initialized trace store." : "Trace store detected without initialization metadata."}`
    : "Trace store exists but no dated daily records were found.";
}

function renderMetrics() {
  const stats = data.stats || {};
  const metrics = [
    ["Daily records", stats.daily_record_count || 0, "Markdown and summary JSON"],
    ["Events", stats.event_count || 0, "Normalized JSONL traces"],
    ["Projects", stats.project_count || 0, "Active and archived patterns"],
    ["Roles", stats.role_count || 0, "Involvement buckets"],
    ["Source gaps", stats.source_gap_count || 0, "Coverage notes"]
  ];

  byId("metricGrid").innerHTML = metrics.map(([label, value, hint]) => `
    <article class="metric">
      <span>${escapeHtml(label)}</span>
      <strong>${fmt.format(value)}</strong>
      <span>${escapeHtml(hint)}</span>
    </article>
  `).join("");
}

function renderTimeline() {
  const records = [...(data.dailyRecords || [])].sort((a, b) => a.date.localeCompare(b.date));
  const max = Math.max(1, ...records.map((record) => record.event_count || 0));
  const projectIndex = new Map((data.projects || []).map((project, index) => [project.id, index]));

  byId("timeline").innerHTML = records.map((record) => {
    const touched = Object.entries(record.projects_touched || {});
    const segments = touched.length
      ? touched.map(([projectId, count]) => {
          const width = Math.max(4, (count / Math.max(1, record.event_count || count)) * 100);
          const color = palette[(projectIndex.get(projectId) ?? 0) % palette.length];
          return `<span class="bar-segment" title="${escapeAttr(projectId)}: ${count}" style="width:${width}%;background:${color}"></span>`;
        }).join("")
      : `<span class="bar-segment" style="width:${Math.max(4, ((record.event_count || 0) / max) * 100)}%;background:#d7ded0"></span>`;

    return `
      <div class="timeline-row">
        <div class="timeline-date">${escapeHtml(record.date)}</div>
        <div class="bar">${segments}</div>
        <div class="timeline-count">${fmt.format(record.event_count || 0)} events</div>
      </div>
    `;
  }).join("") || `<p class="muted">No daily records found.</p>`;
}

function setupFilters() {
  fillSelect("roleFilter", ["all", ...(data.roles || []).map((role) => ({ value: role.name, label: role.label || roleLabel(role.name) }))], "All roles");
  fillSelect("statusFilter", ["all", ...unique(data.projects.map((project) => project.status).filter(Boolean))], "All statuses");
  fillSelect("projectFilter", ["all", ...data.projects.map((project) => project.id)], "All projects");
  fillSelect("sourceFilter", ["all", ...unique(data.events.map((event) => event.source).filter(Boolean))], "All sources");

  byId("roleFilter").addEventListener("change", (event) => {
    state.role = event.target.value;
    renderProjects();
  });
  byId("statusFilter").addEventListener("change", (event) => {
    state.status = event.target.value;
    renderProjects();
  });
  byId("projectFilter").addEventListener("change", (event) => {
    state.project = event.target.value;
    renderEvents();
  });
  byId("sourceFilter").addEventListener("change", (event) => {
    state.source = event.target.value;
    renderEvents();
  });
  byId("searchInput").addEventListener("input", (event) => {
    state.search = event.target.value.trim().toLowerCase();
    renderEvents();
  });
}

function fillSelect(id, values, allLabel) {
  byId(id).innerHTML = values.map((value, index) => {
    const optionValue = typeof value === "object" ? value.value : value;
    const label = index === 0 && optionValue === "all" ? allLabel : (typeof value === "object" ? value.label : value);
    return `<option value="${escapeAttr(optionValue)}">${escapeHtml(label)}</option>`;
  }).join("");
}

function renderProjects() {
  const projects = data.projects
    .filter((project) => state.role === "all" || normalizeRole(project.involvement_role || project.role) === state.role)
    .filter((project) => state.status === "all" || project.status === state.status)
    .sort((a, b) => (b.event_count - a.event_count) || a.name.localeCompare(b.name));

  byId("projectGrid").innerHTML = projects.map((project) => `
    <article class="project-card">
      <div class="project-head">
        <div>
          <h3>${escapeHtml(project.name || project.id)}</h3>
          <p>${escapeHtml(project.definition || project.current_status || project.id)}</p>
        </div>
        <span class="pill pill--green">${escapeHtml(project.priority || "tracked")}</span>
      </div>
      <div class="pill-row">
        <span class="pill">${escapeHtml(project.status || "unknown")}</span>
        <span class="pill ${rolePillClass(project.involvement_role)}">${escapeHtml(roleLabel(project.involvement_role))}</span>
        ${project.role && project.role !== "Unspecified role" ? `<span class="pill pill--blue">${escapeHtml(project.role)}</span>` : ""}
        ${project.role_confidence ? `<span class="pill pill--rose">${escapeHtml(project.role_confidence)} role confidence</span>` : ""}
      </div>
      <div class="mini-stats">
        <div class="mini-stat"><strong>${fmt.format(project.event_count || 0)}</strong><span>events</span></div>
        <div class="mini-stat"><strong>${fmt.format(project.daily_count || 0)}</strong><span>days</span></div>
        <div class="mini-stat"><strong>${project.latest_date || "none"}</strong><span>latest</span></div>
      </div>
      ${renderAliases(project)}
    </article>
  `).join("") || `<p class="muted">No projects match the current filters.</p>`;
}

function renderAliases(project) {
  const aliases = (project.aliases || []).slice(0, 5);
  if (!aliases.length) return "";
  return `<div class="pill-row">${aliases.map((alias) => `<span class="pill">${escapeHtml(alias)}</span>`).join("")}</div>`;
}

function renderEvents() {
  const search = state.search;
  const events = data.events
    .filter((event) => state.project === "all" || event.project_id === state.project)
    .filter((event) => state.source === "all" || event.source === state.source)
    .filter((event) => !search || [event.title, event.summary, event.action_type, event.project_id, event.project_role, roleLabel(event.project_role)].some((value) => String(value || "").toLowerCase().includes(search)))
    .sort((a, b) => String(b.timestamp || b.date).localeCompare(String(a.timestamp || a.date)))
    .slice(0, 120);

  byId("eventFeed").innerHTML = events.map((event) => `
    <article class="event-card">
      <div class="event-date">${escapeHtml(event.date || "")}<br>${escapeHtml(timeOnly(event.timestamp))}</div>
      <div>
        <h3>${escapeHtml(event.title || event.action_type || "Untitled event")}</h3>
        <p>${escapeHtml(event.summary || "No summary captured.")}</p>
        <div class="pill-row">
          <span class="pill pill--green">${escapeHtml(event.project_id || "unclassified")}</span>
          ${event.project_role && event.project_role !== "unknown" ? `<span class="pill ${rolePillClass(event.project_role)}">${escapeHtml(roleLabel(event.project_role))}</span>` : ""}
          <span class="pill">${escapeHtml(event.action_type || "event")}</span>
        </div>
      </div>
      <div class="event-source pill pill--blue">${escapeHtml(event.source || "unknown")}</div>
    </article>
  `).join("") || `<p class="muted">No events match the current filters.</p>`;
}

function renderSignals() {
  const followups = (data.signals?.followups || []).slice(0, 12);
  const risks = (data.signals?.risks || []).slice(0, 8);
  const gaps = (data.signals?.source_gaps || []).slice(0, 12);
  const groups = [
    ["Follow-ups", followups],
    ["Risks", risks],
    ["Source gaps", gaps]
  ];

  byId("signalList").innerHTML = groups.map(([title, items]) => `
    <article class="signal-item">
      <h3>${escapeHtml(title)}</h3>
      ${items.length ? `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : `<p class="muted">None captured.</p>`}
    </article>
  `).join("");
}

function renderRollups() {
  const rollups = [
    ...(data.rollups?.weekly || []).map((item) => ({ ...item, kind: "Weekly", label: item.week })),
    ...(data.rollups?.monthly || []).map((item) => ({ ...item, kind: "Monthly", label: item.month })),
    ...(data.rollups?.quarterly || []).map((item) => ({ ...item, kind: "Quarterly", label: item.quarter }))
  ];

  byId("rollupList").innerHTML = rollups.map((rollup) => `
    <article class="rollup-item">
      <h3>${escapeHtml(rollup.kind)}: ${escapeHtml(rollup.label || "unknown")}</h3>
      <ul>
        <li>${fmt.format(sumValues(rollup.projects_touched || {}))} project touches</li>
        <li>${fmt.format((rollup.open_followups || []).length)} open follow-ups</li>
        <li>${escapeHtml(confidenceLabel(rollup.confidence))}</li>
      </ul>
    </article>
  `).join("") || `<p class="muted">No rollups found yet.</p>`;
}

function sumValues(record) {
  return Object.values(record).reduce((sum, value) => sum + Number(value || 0), 0);
}

function confidenceLabel(value) {
  return typeof value === "number" ? `${Math.round(value * 100)}% confidence` : "confidence not set";
}

function formatDateTime(value) {
  if (!value) return "unknown time";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function timeOnly(value) {
  if (!value) return "";
  const match = String(value).match(/T(\d{2}:\d{2})/);
  return match ? match[1] : "";
}

function normalizeRole(value) {
  return String(value || "unknown").trim() || "unknown";
}

function roleLabel(role) {
  return {
    owner: "Owner",
    core_contributor: "Core contributor",
    reviewer: "Reviewer",
    side_helper: "Side helper",
    observer: "Observer",
    unknown: "Unknown"
  }[normalizeRole(role)] || "Unknown";
}

function rolePillClass(role) {
  return {
    owner: "pill--role-owner",
    core_contributor: "pill--role-core",
    reviewer: "pill--role-reviewer",
    side_helper: "pill--role-side",
    observer: "pill--role-observer"
  }[normalizeRole(role)] || "pill--role-unknown";
}

function unique(values) {
  return [...new Set(values)].sort((a, b) => String(a).localeCompare(String(b)));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

init();
