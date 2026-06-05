# Wise Personal Work Memory Plugin

Claude/Codex-compatible personal agent plugin for maintaining evidence-backed work traces.

## Structure

- `.codex-plugin/plugin.json` - Codex plugin manifest.
- `.claude-plugin/plugin.json` - Claude Code plugin manifest.
- `skills/personal-work-memory/SKILL.md` - shared work-memory skill.
- `skills/personal-work-memory-init/SKILL.md` - initialization skill for empty stores.
- `skills/personal-history-chat/SKILL.md` - chat and insight skill for existing history.
- `.agents/skills/` - Codex-style project-local skill copies for immediate discovery.
- `.claude/skills/` - Claude Code project-local skill copies for immediate discovery.
- `.codex/AGENTS.md` - Codex-specific project skill guidance.
- `SKILL_UPDATES.md` - update record for this plugin's skills.
- `SKILL_SYNC_CONTRACT.md` - contract for canonical skills and generated mirrors.
- `.githooks/pre-commit` - syncs generated mirrors before commit.
- `personal-work-trace/` - local private work trace store, ignored by git.

## Usage

Ask an agent to use:

- `$personal-work-memory-init` to seed an empty trace store.
- `$personal-work-memory` for daily records, weekly rollups, project timelines, source coverage reports, or follow-up extraction.
- `$personal-history-chat` to chat with local history and learn how an AI should navigate the trace structure.

The skill should use whichever source plugins, MCP connectors, app connectors, local files, or manual notes are available in the current agent runtime.

## Work Trace Website

The `website/` folder contains a static visualisation of the local `personal-work-trace/` store.

After generating or updating daily records, refresh the website data:

```bash
node website/scripts/generate-data.mjs
```

Then open `website/index.html` in a browser. If you prefer serving it over HTTP:

```bash
cd website
python3 -m http.server 4173
```

Open `http://localhost:4173/`. The refresh command updates only `website/data/work-trace.js`; it does not regenerate the website code.

When starting a new Claude Code or Codex chat inside this folder, the skills should be discoverable from the project-local mirrors:

- Codex: `.agents/skills/`
- Claude Code: `.claude/skills/`

Canonical edits belong in `skills/`. The tracked pre-commit hook refreshes both mirrors and stages only the generated mirror directories. Enable it once with:

```bash
git config core.hooksPath .githooks
```

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
- During init, try to find the current Confluence team wiki/home space, team member intro pages, and personal onboarding docs.
- For Confluence team spaces, ignore pages not updated in the last 24 months unless the user explicitly names them.

## Source Discovery

- Use available connectors first: Slack, Jira, GitHub, Confluence, Google, Figma/FigJam, and other MCPs.
- Init requires a main Slack channel, Confluence/Atlassian team wiki/home space, and quarterly plans before writing seed files.
- If Slack or Confluence/Atlassian access is unavailable, the agent should warn and ask for connector setup or manual channel/wiki/plan inputs first.
- During init, rank Slack channels by importance and inspect the best candidates instead of scanning everything deeply.
- If Google/Jira/Confluence/Figma connectors are unavailable, use Slack signals where possible: bot posts, channel membership, daily channels, on-call channels, and `@` mentions.
- For analysts and query-heavy roles, use DataGrip/local SQL files only through sanitized query-work analysis by subagent.
- Never store query results, credentials, connection strings, raw sensitive SQL, customer identifiers, or PII.
- Project matching includes the user's role: owner, core contributor, reviewer, side helper, observer, or unknown.
- Side-helper and observer projects should not be mixed into owned/core achievement summaries.
- Bot messages are evidence pointers, not final truth. Keep confidence lower and ask when ambiguous.
- If available sources are too thin, ask the user to add connectors or provide manual seed data.
- For large Slack/wiki/backfill context, use subagents when the current agent supports them.

## Skill Snapshot

- Each local trace store should keep `personal-work-trace/state/skill_snapshot.json`.
- Each local trace store should keep `personal-work-trace/logs/skill-update-log.md`.
- When skills change, compare the current skill snapshot with the stored snapshot before updating old traces.
- If project-role rules changed, mark likely observer/side-helper projects for review before future rollups.
- Prefer migration notes or rollup updates over rewriting historical daily records.
