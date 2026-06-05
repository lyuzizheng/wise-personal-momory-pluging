const data = window.WORK_TRACE_DATA || { trace: { exists: false }, stats: {}, projects: [], dailyRecords: [], events: [], rollups: {} };

const state = {
  role: "all",
  status: "all",
  project: "all",
  source: "all",
  search: ""
};

const byId = (id) => document.getElementById(id);

function init() {
  if (!data.trace?.exists) {
    renderEmpty();
    return;
  }

  renderMeta();
  renderMetrics();
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
  const user = data.trace?.user || {};
  byId("generatedMeta").textContent = `Generated ${formatDateTime(data.generated_at)} from ${data.trace.root || "personal-work-trace"}`;
  byId("identitySummary").textContent = identityLine(user);
  const range = data.trace.date_range;
  byId("traceRange").textContent = range?.start
    ? `${range.start} to ${range.end}. ${data.trace.initialized ? "Initialized trace store." : "Trace store detected without initialization metadata."}`
    : "Trace store exists but no dated daily records were found.";
}

function renderMetrics() {
  const latestDaily = [...(data.dailyRecords || [])].sort((a, b) => a.date.localeCompare(b.date)).at(-1);
  const latestWeekly = [...(data.rollups?.weekly || [])].sort((a, b) => String(a.week).localeCompare(String(b.week))).at(-1);
  const focusProjects = [...(data.projects || [])]
    .filter((project) => project.recent_updates?.length || project.timeline?.length)
    .slice(0, 4)
    .map((project) => project.name)
    .join(", ");

  const cards = [
    ["Latest daily summary", latestDaily?.executive_summary || "No daily summary captured yet.", latestDaily?.date],
    ["Current project focus", focusProjects || "No project updates captured yet.", "from project timelines"],
    ["Latest rollup", latestWeekly?.executive_summary || "No weekly rollup text captured yet.", latestWeekly?.week]
  ];

  byId("metricGrid").innerHTML = cards.map(([label, summary, hint]) => `
    <article class="metric metric--text">
      <span>${escapeHtml(label)}</span>
      <p>${escapeHtml(summary)}</p>
      <small>${escapeHtml(hint || "")}</small>
    </article>
  `).join("");
}

function identityLine(user) {
  const name = user.identity?.full_name || user.identity?.preferred_name || "Zizheng Lyu";
  const title = user.role?.title;
  const department = user.department?.category;
  const orgPath = [user.role?.team, user.role?.squad, user.role?.tribe].filter(Boolean).join(" / ");
  const timezone = user.timezone?.local || "";
  return [
    [name, title, department].filter(Boolean).join(" · "),
    orgPath,
    timezone
  ].filter(Boolean).join(" | ");
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
      </div>
      <div class="pill-row">
        <span class="pill pill--priority">${escapeHtml(project.priority || "tracked")}</span>
        <span class="pill">${escapeHtml(project.status || "unknown")}</span>
        <span class="pill ${rolePillClass(project.involvement_role)}">${escapeHtml(roleLabel(project.involvement_role))}</span>
        ${project.role && project.role !== "Unspecified role" ? `<span class="pill pill--blue">${escapeHtml(project.role)}</span>` : ""}
        ${project.role_confidence ? `<span class="pill pill--rose">${escapeHtml(project.role_confidence)} role confidence</span>` : ""}
      </div>
      ${renderProjectUpdates(project)}
      ${renderTextList("Decisions", project.decisions, 3)}
      ${renderTextList("Follow-ups", project.followups, 3)}
      ${renderTextList("Risks", project.risks, 2)}
      ${renderAliases(project)}
    </article>
  `).join("") || `<p class="muted">No projects match the current filters.</p>`;
}

function renderProjectUpdates(project) {
  const updates = (project.recent_updates || []).map((event) => {
    const date = event.date ? `${event.date}: ` : "";
    return `${date}${event.summary || event.title || event.action_type || ""}`.trim();
  });
  const fallback = (project.timeline || []).slice(-4).reverse().map((item) => `${item.date || ""}: ${item.summary || ""}`.trim());
  const items = updates.length ? updates : fallback;
  return renderTextList("Recent updates", items.length ? items : ["No concrete project update captured yet."], 4);
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
      ${items.length ? `<ul>${items.map((item) => `<li>${escapeHtml(signalText(item))}</li>`).join("")}</ul>` : `<p class="muted">None captured.</p>`}
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
      ${rollup.executive_summary ? `<p>${escapeHtml(rollup.executive_summary)}</p>` : ""}
      ${renderTextList("Main outcomes", rollup.main_outcomes, 5)}
      ${renderRollupProjectProgress(rollup.project_progress)}
      ${renderTextList("Open follow-ups", rollup.open_followups, 6)}
    </article>
  `).join("") || `<p class="muted">No rollups found yet.</p>`;
}

function renderRollupProjectProgress(projects = []) {
  const usefulProjects = projects
    .filter((project) => project.moved_forward || project.decisions || project.followups || project.risks)
    .slice(0, 5);
  if (!usefulProjects.length) return "";
  return `
    <div class="rollup-projects">
      ${usefulProjects.map((project) => `
        <section>
          <h4>${escapeHtml(project.name || project.project_id)}</h4>
          ${project.moved_forward ? `<p>${escapeHtml(project.moved_forward)}</p>` : ""}
          ${project.decisions && !/^none captured/i.test(project.decisions) ? `<p><strong>Decision:</strong> ${escapeHtml(project.decisions)}</p>` : ""}
          ${project.followups && !/^none captured/i.test(project.followups) ? `<p><strong>Follow-up:</strong> ${escapeHtml(project.followups)}</p>` : ""}
          ${project.risks && !/^none captured/i.test(project.risks) ? `<p><strong>Risk:</strong> ${escapeHtml(project.risks)}</p>` : ""}
        </section>
      `).join("")}
    </div>
  `;
}

function renderTextList(title, items = [], limit = 4) {
  const visible = items.map(signalText).filter(Boolean).slice(0, limit);
  if (!visible.length) return "";
  return `
    <div class="text-list">
      <h4>${escapeHtml(title)}</h4>
      <ul>${visible.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </div>
  `;
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

function signalText(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (typeof value === "object") return signalText(value.summary || value.text || value.title || value.value || value.id || JSON.stringify(value));
  return "";
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
