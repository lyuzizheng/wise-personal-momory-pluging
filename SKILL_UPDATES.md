# Skill Updates

## 2026-06-05

- Created the shared Claude/Codex plugin structure with `personal-work-memory`.
- Added `personal-work-memory-init` for empty store initialization and dated backfills.
- Added `personal-history-chat` for querying local work history and explaining trace structure.
- Added date-aware behavior: today-first runs, yesterday tracing, non-sequential updates, and rollups from available records.
- Added Wise-style fintech department categorisation with Customer Support and Operations out of scope by default.
- Added Confluence freshness handling: skip team-space pages older than 24 months unless explicitly named.
- Added init discovery for Confluence team wiki/home spaces, team member intro pages, and personal onboarding docs.
- Added Slack fallback discovery using profile data, channel membership, bot messages, on-call/daily channels, and `@` mentions.
- Added support guidance for Figma, FigJam, design, and other available MCP connectors.
- Added DataGrip/local SQL query-work support for analysts and query-heavy roles, with subagent analysis and strict no-PII/no-credential handling.
- Added init gates requiring main Slack channel, Confluence/Atlassian team wiki/home space, and quarterly plans before seed files are written.
- Added smart Slack channel ranking for init so agents inspect the most important joined channels first.
- Added project involvement role classification so projects distinguish owner/core contributor/reviewer/side helper/observer/unknown instead of treating every matched project as owned work.
- Added trace update guidance for role reclassification when skill behavior changes.
- Added subagent guidance for large initialization/backfill contexts.
- Added local trace skill snapshot policy via `personal-work-trace/state/skill_snapshot.json` and `personal-work-trace/logs/skill-update-log.md`.
- Added project-local discovery mirrors under `.agents/skills/` for Codex and `.claude/skills/` for Claude Code.
- Added `SKILL_SYNC_CONTRACT.md` and `.githooks/pre-commit` so commits keep generated skill mirrors current.
- Tightened `personal-work-memory` so maintenance runs are step-based, use subagents when available, and always refresh or explicitly skip affected weekly/monthly/quarterly rollups after daily/project writes.
- Tightened `personal-history-chat` output for project-and-period questions so it returns a short answer, exact change points, and only relevant coverage gaps instead of broad unrelated summaries.
- Tightened `personal-work-memory` source collection so every enabled, available, locally imported, or indirectly signaled source gets a source subagent/sequential fallback row; Slack/GitHub-only output is now marked incomplete when Calendar, Jira, Docs, Gmail, Confluence, or other available sources were not attempted.
