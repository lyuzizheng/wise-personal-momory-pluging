# Claude Instructions

This repository is a Claude/Codex-compatible personal agent plugin.

Use these shared skills:

- `skills/personal-work-memory-init/SKILL.md` when `personal-work-trace/` is empty or missing seed context.
- `skills/personal-work-memory/SKILL.md` for work trace documentation, work-memory backfills, daily or weekly summaries, project timelines, source coverage reports, and follow-up extraction.
- `skills/personal-history-chat/SKILL.md` for questions, insights, evidence lookup, and guidance on navigating the local work trace structure.

Claude Code project-local copies live under `.claude/skills/`. Canonical skill edits belong in `skills/`; after editing, run `./scripts/sync-project-skills.sh` to refresh `.claude/skills/` and `.agents/skills/`.

When reading source evidence, use the skills, plugins, MCP servers, app connectors, local files, or manual notes available to the current Claude runtime. If a source is not available or not authenticated, record the gap instead of filling it from inference.

Before running the main daily workflow, prompt the user for temporary daily data to stage as a manual supplement.

If direct connectors are unavailable, use Slack bot posts, channel membership, daily/on-call channels, and `@` mentions as lower-confidence evidence pointers. Use Figma/FigJam/design MCPs and other available MCP connectors when relevant.

For large Slack/wiki/backfill contexts, use subagents when Claude Code supports them.

Before updating an existing trace store, compare current skills against `personal-work-trace/state/skill_snapshot.json` and record behavior-impacting changes in `personal-work-trace/logs/skill-update-log.md`.

The local work trace store belongs in `personal-work-trace/`. It is intentionally ignored by git because it may contain private work records.
