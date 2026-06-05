# Claude Instructions

This repository is a Claude/Codex-compatible personal agent plugin.

Use these shared skills:

- `skills/personal-work-memory-init/SKILL.md` when `personal-work-trace/` is empty or missing seed context.
- `skills/personal-work-memory/SKILL.md` for work trace documentation, work-memory backfills, daily or weekly summaries, project timelines, source coverage reports, and follow-up extraction.
- `skills/personal-history-chat/SKILL.md` for questions, insights, evidence lookup, and guidance on navigating the local work trace structure.

When reading source evidence, use the skills, plugins, MCP servers, app connectors, local files, or manual notes available to the current Claude runtime. If a source is not available or not authenticated, record the gap instead of filling it from inference.

Before running the main daily workflow, prompt the user for temporary daily data to stage as a manual supplement.

The local work trace store belongs in `personal-work-trace/`. It is intentionally ignored by git because it may contain private work records.
