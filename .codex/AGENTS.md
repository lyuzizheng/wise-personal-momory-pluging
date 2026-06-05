# Codex Project Skills

This folder is designed so Codex can use the work trace skills immediately when started from the repository root.

## Skills Discovery

Codex-style project-local skills are mirrored under `.agents/skills/`:

- `personal-work-memory` - daily records, rollups, source coverage, and project timelines.
- `personal-work-memory-init` - empty store initialization, dated backfill, Slack/channel/MCP discovery.
- `personal-history-chat` - chat with local work history and explain trace structure.

The canonical skill source is `skills/`. After editing canonical skills, run:

```bash
./scripts/sync-project-skills.sh
```

## Natural Triggers

Use these skills naturally for work trace, memory, daily record, backfill, project history, source coverage, Slack signal, on-call, wiki, Figma/MCP, and skill snapshot requests.
