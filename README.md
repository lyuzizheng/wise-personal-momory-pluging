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

## Simple Prompts

- `Use $personal-work-memory-init to set up my work trace for today.`
- `Use $personal-work-memory-init to backfill last week.`
- `Use $personal-work-memory-init to backfill last month.`
- `Use $personal-work-memory to update today's record.`
- `Use $personal-work-memory to trace back yesterday.`
- `Use $personal-work-memory to update 2026-06-03 and 2026-06-05.`
- `Use $personal-history-chat to tell me what moved forward last week.`

## Date Rules

- Daily runs default to today's local date.
- Yesterday, last week, last month, and custom dates must be resolved to exact dates before writing.
- Dates can be updated out of order.
- Rollups use the records that exist in the requested range and list missing dates as gaps.
- For week or month init/backfill, the agent should work date by date in goal mode or with a visible checklist.

## Department And Wiki Rules

- The store is intended for an offline internal wiki/work-trace context.
- Department categorisation should fit a fintech company: Engineering, Product, Design, Compliance, Legal, Risk, Finance, Treasury, Data and Analytics, Security, Privacy, People, Marketing, Business Development, Banking Partnerships, and Strategy.
- Customer Support and Operations users are out of scope unless explicitly added.
- During init, use Slack profile department as the first categorisation signal and ask when confidence is low.
- For Confluence team spaces, ignore pages not updated in the last 24 months unless the user explicitly names them.
