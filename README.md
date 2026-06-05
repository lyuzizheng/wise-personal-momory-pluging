# Wise Personal Work Memory Plugin

Claude/Codex-compatible personal agent plugin for maintaining evidence-backed work traces.

## Structure

- `.codex-plugin/plugin.json` - Codex plugin manifest.
- `.claude-plugin/plugin.json` - Claude Code plugin manifest.
- `skills/personal-work-memory/SKILL.md` - shared work-memory skill.
- `skills/personal-work-memory-init/SKILL.md` - initialization skill for empty stores.
- `skills/personal-history-chat/SKILL.md` - chat and insight skill for existing history.
- `personal-work-trace/` - local private work trace store, ignored by git.

## Usage

Ask an agent to use:

- `$personal-work-memory-init` to seed an empty trace store.
- `$personal-work-memory` for daily records, weekly rollups, project timelines, source coverage reports, or follow-up extraction.
- `$personal-history-chat` to chat with local history and learn how an AI should navigate the trace structure.

The skill should use whichever source plugins, MCP connectors, app connectors, local files, or manual notes are available in the current agent runtime.
