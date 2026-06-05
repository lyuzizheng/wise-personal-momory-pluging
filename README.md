# Wise Personal Work Memory Plugin

Claude/Codex-compatible personal agent plugin for maintaining evidence-backed work traces.

## Structure

- `.codex-plugin/plugin.json` - Codex plugin manifest.
- `.claude-plugin/plugin.json` - Claude plugin manifest.
- `skills/personal-work-memory/SKILL.md` - shared work-memory skill.
- `personal-work-trace/` - local private work trace store, ignored by git.

## Usage

Ask an agent to use `$personal-work-memory` for daily records, weekly rollups, project timelines, source coverage reports, or follow-up extraction.

The skill should use whichever source plugins, MCP connectors, app connectors, local files, or manual notes are available in the current agent runtime.
