---
name: personal-work-memory-init
description: Use when initializing an empty personal work trace store, seeding identity, projects, team context, quarterly plans, wiki URLs, source mappings, and starter config before daily work memory can run.
---

# Personal Work Memory Init

Use this skill when `personal-work-trace/` is empty, missing core config, or too sparse for useful daily/project memory.

The goal is a small, useful seed. Do not build integrations or scrape broad history. Create enough context for `$personal-work-memory` and `$personal-history-chat` to classify future work events and ask good follow-up questions.

## Date Scope

Ask the user which initialization date scope they want:

- **Today:** seed the store for the current local date.
- **Yesterday:** seed enough context to prepare yesterday's first daily record.
- **Last week:** initialize context, then run a goal-style loop for each date in the previous local week.
- **Last month:** initialize context, then run a goal-style loop for each date in the previous local month.
- **Custom dates:** initialize context for specific dates or a specific date range.

Always resolve relative dates into exact calendar dates before writing files. The user may prepare or update data out of order; do not require sequential history.

## Goal-Style Backfill

For week or month initialization, work as a dated goal:

1. State the exact date range.
2. Initialize shared config and project context once.
3. For each date in the range, gather available source evidence and prompt for temporary daily data.
4. Write or update that date independently.
5. Continue through the range without stopping for dates that have no evidence.
6. At the end, create or update the weekly/monthly rollup from available records and list gaps.

If the agent platform has an explicit goal or continuation mode, use it for the range so the work can continue date by date. If not, keep a visible checklist of dates and update it as each date completes.

## Empty Store Check

Treat the store as uninitialized if any of these are true:

- `personal-work-trace/` does not exist.
- `personal-work-trace/config/user.yaml` does not exist.
- `personal-work-trace/projects/active/` has no project definitions.
- `personal-work-trace/state/identity_map.json` does not exist.

## Runtime Tool Selection

Use only capabilities available to the current agent:

1. If Slack profile access is available, read the user's basic profile metadata, especially department, title, team, and timezone.
2. Use Slack profile department as the first department categorisation signal.
3. If Google Drive, Confluence, or local files are available, look for explicitly named planning docs such as quarterly planners, team home pages, project plans, or operating docs.
4. For Confluence team spaces, ignore pages that were last updated more than 24 months before the init date unless the user explicitly names the page or asks to include stale history.
5. If Jira or GitHub connectors are available, use them only for lightweight project/repo mapping, not deep backfill.
6. If a connector is unavailable, ask the user for the missing seed data.

Do not request plugin installation unless the user specifically asks for live connector-backed initialization.

## Department Scope

Fit the department list to a Wise-style fintech company. Customer support and operations users are out of scope for this plugin; all other departments may be included when relevant.

Default included departments:

- Engineering
- Product
- Design
- Compliance
- Legal
- Risk
- Finance
- Treasury
- Data and Analytics
- Security
- Privacy
- People
- Marketing
- Business Development
- Banking Partnerships
- Strategy

When Slack profile department is available:

1. Map it to the closest included department.
2. Use title, team, team-home wiki, and project aliases as fallback signals.
3. If it maps to Customer Support or Operations, mark it out of scope and ask the user before continuing.
4. If confidence is below 0.70, ask the user to confirm.

## Confluence Freshness

When using a Confluence team space during init:

- Use pages updated within the last 24 months relative to the init date.
- Ignore pages last updated more than 24 months before the init date.
- Store stale-page skips in `knowledge/source-map.md` as coverage notes, not as project evidence.
- If the user provides a specific old URL, include it only as an explicit user-provided pointer and mark it stale.

## Seed Questions

Ask for missing seed data in small batches. Prefer asking for 3-6 bullets, not a large form.

Prompt the user for:

- Personal basics: preferred name, work email, timezone, Slack handle, GitHub username, Jira identity.
- Department: confirm the Slack-derived department or choose the closest fintech department category.
- Big plans: quarterly goals, important deliverables, current priorities, and things they want the memory to track.
- Team context: team name, manager or lead if relevant, team home wiki URLs, operating docs, recurring rituals.
- Project context: active projects, Jira epics, GitHub repos, Confluence pages, Slack channels, Docs folders, recurring meetings.
- Boundaries: sources to skip, private channels or DMs to exclude, content that must never be stored.

If the user provides wiki URLs or planner files, store them as pointers. Do not copy large documents into the work trace unless explicitly asked.

## Files To Create

Create or update only the seed files needed:

```text
personal-work-trace/
  README.md
  config/
    user.yaml
    sources.yaml
    privacy.yaml
    taxonomy.yaml
    departments.yaml
    project_aliases.yaml
  inbox/
    manual/
  projects/
    active/
  people/
    SELF.md
  knowledge/
    team-home.md
    quarterly-plans.md
    source-map.md
  state/
    identity_map.json
    source_cursors.json
    dedupe_index.json
    project_index.json
  logs/
```

Keep private values minimal. Store identifiers and links, not secrets or credentials.

## Initialization Flow

1. Inspect the store and list what exists.
2. Gather available identity/context from current skills, plugins, MCP connectors, local files, or user-provided evidence.
3. Ask the user for the initialization date scope.
4. Derive department from Slack profile if available and ask the user to confirm if ambiguous.
5. Ask the user for missing big plans, team home wiki URLs, quarterly planner files, and source boundaries.
6. For Confluence team spaces, skip pages older than 24 months without updates unless explicitly named.
7. Create the seed structure and starter config.
8. Create project definitions only for projects with enough signal to classify future events.
9. For week, month, or custom date ranges, process each date independently and roll up from available records.
10. Write `knowledge/source-map.md` with source availability and gaps, including stale wiki pages skipped.
11. Tell the user what was initialized, what is still missing, and which skill to use next.

## Handoff

After initialization, suggest:

- `$personal-work-memory` to add today's temporary daily data and generate the first daily record.
- `$personal-history-chat` to ask what the initialized memory knows and where it is still thin.
