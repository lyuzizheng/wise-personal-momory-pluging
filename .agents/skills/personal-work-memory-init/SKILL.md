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
3. If Google Drive, Confluence, or local files are available, look for explicitly named planning docs such as quarterly planners, team home pages, team member intros, personal onboarding docs, project plans, or operating docs.
4. For Confluence team spaces, try to find the team home/wiki space first, then inspect fresh team member intro pages and personal onboarding docs for role, team, project, and ritual context.
5. For Confluence team spaces, ignore pages that were last updated more than 24 months before the init date unless the user explicitly names the page or asks to include stale history.
6. If Figma, FigJam, design-system, or other MCP connectors are available, use them as lightweight project/design evidence when relevant.
7. If DataGrip project files, query scratch files, or safe local SQL history are available, use them as lightweight analysis-work evidence through a query-analysis subagent.
8. If Jira, GitHub, or other delivery connectors are available, use them only for lightweight project/repo mapping, not deep backfill.
9. If a connector is unavailable, look for indirect Slack signals from bots and channels before asking the user for the missing seed data.

Do not request plugin installation unless the user specifically asks for live connector-backed initialization.

## Required Init Inputs

Do not proceed with initialization until these seed inputs are discovered or provided:

- Main Slack channel for the team or workstream.
- Confluence or Atlassian team wiki/home space.
- Quarterly plans, planning page, or current big-plan document.

If Slack skill/MCP access is unavailable, warn the user and ask them to either configure Slack access or provide the main Slack channel manually.

If Confluence/Atlassian skill or MCP access is unavailable, warn the user and ask them to either configure Atlassian/Confluence access or provide the team wiki/home URL and quarterly planning URL manually.

If quarterly plans cannot be discovered from available sources, ask the user for the planning page, planner file, or a short manual list of current big plans before proceeding.

## Slack Signal Discovery

Slack is often enough to infer useful role and project context even when Google, Jira, Confluence, Figma, or other connectors are unavailable.

Use these signals when Slack access is available:

- Channel membership: team channels, project channels, daily channels, incident/on-call channels, design/product/legal/compliance/risk channels.
- Bot posts and app messages: Jira, Google Meet, Google Calendar, Confluence, GitHub, Figma, incident, deployment, on-call, and release bots.
- Mentions: messages where the user is `@` mentioned, assigned, requested for review, tagged for approval, or added to an incident/project thread.
- On-call signals: membership in on-call channels, on-call bot rotations, incident handoff messages, escalation mentions, and schedule reminders.
- Daily/standup channels: recurring daily channels can reveal active teams, routines, and current priorities.

Do not scan every joined channel deeply. First rank channels by likely importance, then inspect the top candidates.

Rank channels higher when they:

- match the user's team, department, product area, project names, or Slack profile fields;
- contain recent `@` mentions of the user;
- contain bot messages from Jira, Google Meet/Calendar, Confluence, GitHub, Figma, deployment, incident, or on-call apps;
- look like team home, daily, standup, planning, project, incident, on-call, design, legal, compliance, risk, data, or product channels;
- have recent activity within the init date scope.

Select a small set of important channels to read first. Record why each channel was selected in `knowledge/source-map.md`.

Do not treat bot messages as final truth. Use them as evidence pointers and confidence signals, then confirm ambiguous role, department, or project conclusions with the user.

## Subagent Use

When init context is large, split analysis into subagents if the current platform supports them:

- Slack channel analyst: summarize channel membership, bot signals, and `@` mentions.
- Wiki/planner analyst: inspect fresh Confluence or local planning docs and ignore stale pages.
- Delivery-source analyst: inspect GitHub/Jira/Figma or other MCP evidence when available.
- Query-work analyst: inspect safe DataGrip query files/history and map analysis intent to projects without storing raw SQL, credentials, connection details, query results, or PII.
- Privacy/source-map analyst: identify gaps, unavailable connectors, and sources that should stay excluded.

Each subagent must return concise evidence pointers, candidate projects/departments, confidence, and gaps. Do not ask subagents to write final trace files directly unless the platform explicitly supports safe file coordination.

## Connector Sufficiency

After source discovery, decide whether evidence is enough:

- If Slack plus available local/wiki/MCP evidence is enough, continue.
- If evidence is thin but usable, continue and mark low confidence.
- If evidence is too thin to initialize useful memory, prompt the user to add more connectors or provide manual seed data.

Ask for connectors only after explaining what is missing, for example Jira project mapping, Google Calendar recurring meetings, Figma design context, or Confluence team docs.

## DataGrip And Query Work

For analysts, data, finance, risk, compliance, product, and other query-heavy roles, DataGrip or local SQL work can indicate project activity.

Allowed:

- Query file names, paths, timestamps, and project folders.
- Sanitized query intent, such as "analysed card dispute volume by week".
- Referenced Jira/project labels in comments or filenames after redaction.
- Warehouse/schema/table names only when they are not sensitive and help identify the project.

Never store:

- Query results.
- Customer identifiers, emails, names, account IDs, transfer IDs, or other PII.
- Credentials, connection strings, hostnames, tokens, database usernames, or secrets.
- Raw SQL if it contains PII, sensitive filters, customer identifiers, or privileged business logic.

Use a query-work subagent when query context is non-trivial. The subagent should return only sanitized events with evidence pointers, candidate projects, confidence, and privacy notes.

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

- Try to locate the current team home/wiki space before looking at scattered pages.
- Prefer pages named like team home, team members, team intro, onboarding, personal onboarding, getting started, ways of working, rituals, roadmap, quarterly planning, or project index.
- Use pages updated within the last 24 months relative to the init date.
- Ignore pages last updated more than 24 months before the init date.
- Store stale-page skips in `knowledge/source-map.md` as coverage notes, not as project evidence.
- If the user provides a specific old URL, include it only as an explicit user-provided pointer and mark it stale.

When Atlassian/Confluence access is available, search for the likely current team space using the user's Slack team/department/title, main Slack channel names, project names, Jira project keys, and quarterly plan names. Prefer official team spaces over random linked pages.

## Seed Questions

Ask for missing seed data in small batches. Prefer asking for 3-6 bullets, not a large form.

Prompt the user for:

- Personal basics: preferred name, work email, timezone, Slack handle, GitHub username, Jira identity.
- Department: confirm the Slack-derived department or choose the closest fintech department category.
- Big plans: quarterly goals, important deliverables, current priorities, and things they want the memory to track.
- Team context: team name, manager or lead if relevant, team home wiki URLs, team member intro pages, personal onboarding docs, operating docs, recurring rituals.
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
    skill_snapshot.json
    identity_map.json
    source_cursors.json
    dedupe_index.json
    project_index.json
  logs/
```

Keep private values minimal. Store identifiers and links, not secrets or credentials.

## Initialization Flow

1. Inspect the store and list what exists.
2. Check whether Slack and Confluence/Atlassian capabilities are available.
3. If Slack is unavailable, ask for Slack configuration or the main Slack channel before proceeding.
4. If Confluence/Atlassian is unavailable, ask for Confluence configuration or the team wiki/home URL before proceeding.
5. Ask the user for the initialization date scope.
6. Gather available identity/context from current skills, plugins, MCP connectors, local files, or user-provided evidence.
7. Derive department from Slack profile if available and ask the user to confirm if ambiguous.
8. Rank Slack channels by importance, then inspect the best candidates for role/project signals.
9. Find the Confluence/Atlassian team wiki/home space and quarterly planning page.
10. If main Slack channel, team wiki/home space, or quarterly plans are still missing, ask the user to provide them and stop before writing seed files.
11. Ask the user for missing big plans, quarterly planner details, and source boundaries.
12. For Confluence team spaces, inspect fresh team member intro and personal onboarding pages; skip pages older than 24 months without updates unless explicitly named.
13. Create the seed structure and starter config.
14. Create or update `state/skill_snapshot.json` with the current plugin and skill metadata.
15. Create project definitions only for projects with enough signal to classify future events and the user's likely role in them.
16. For week, month, or custom date ranges, process each date independently and roll up from available records.
17. Write `knowledge/source-map.md` with source availability and gaps, important channel selection reasons, stale wiki pages skipped, and connectors that would improve confidence.
18. Tell the user what was initialized, what is still missing, and which skill to use next.

## Handoff

After initialization, suggest:

- `$personal-work-memory` to add today's temporary daily data and generate the first daily record.
- `$personal-history-chat` to ask what the initialized memory knows and where it is still thin.
