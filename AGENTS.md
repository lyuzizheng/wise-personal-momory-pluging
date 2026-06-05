# Agent Instructions

This repository is a Claude/Codex-compatible personal agent plugin.

## Plugin Shape

- Codex manifest: `.codex-plugin/plugin.json`
- Claude manifest: `.claude-plugin/plugin.json`
- Shared skills: `skills/`
- Local work trace store: `personal-work-trace/`

## Work Trace Rules

- Use `skills/personal-work-memory-init/SKILL.md` when `personal-work-trace/` is empty or missing seed context.
- Use `skills/personal-work-memory/SKILL.md` for daily ingestion, work-memory backfills, rollups, and project record updates.
- Use `skills/personal-history-chat/SKILL.md` for questions, insights, evidence lookup, and guidance on navigating the local work trace structure.
- When reading source evidence, prefer skills, plugins, MCP connectors, or app connectors that are actually available in the current agent runtime.
- If a requested source is unavailable, record the gap in source coverage instead of inventing or approximating evidence.
- Keep `personal-work-trace/` local and uncommitted. It may contain private or sensitive work records.
- Do not store secrets, credentials, customer data, or unnecessary personal data.
- Before running the main daily workflow, prompt the user for temporary daily data to stage as a manual supplement.

## Change Style

- Keep edits surgical and traceable to the user request.
- Do not add connector code, automations, or publishing behavior unless explicitly requested.
