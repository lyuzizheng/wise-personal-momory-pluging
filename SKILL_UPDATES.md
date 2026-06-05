# Skill Updates

## 2026-06-05

- Created the shared Claude/Codex plugin structure with `personal-work-memory`.
- Added `personal-work-memory-init` for empty store initialization and dated backfills.
- Added `personal-history-chat` for querying local work history and explaining trace structure.
- Added date-aware behavior: today-first runs, yesterday tracing, non-sequential updates, and rollups from available records.
- Added Wise-style fintech department categorisation with Customer Support and Operations out of scope by default.
- Added Confluence freshness handling: skip team-space pages older than 24 months unless explicitly named.
- Added Slack fallback discovery using profile data, channel membership, bot messages, on-call/daily channels, and `@` mentions.
- Added support guidance for Figma, FigJam, design, and other available MCP connectors.
- Added subagent guidance for large initialization/backfill contexts.
- Added local trace skill snapshot policy via `personal-work-trace/state/skill_snapshot.json` and `personal-work-trace/logs/skill-update-log.md`.
- Added project-local discovery mirrors under `.agents/skills/` for Codex and `.claude/skills/` for Claude Code.
- Added `SKILL_SYNC_CONTRACT.md` and `.githooks/pre-commit` so commits keep generated skill mirrors current.
