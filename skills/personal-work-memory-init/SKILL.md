---
name: personal-work-memory-init
description: Use when initializing an empty personal work trace store, seeding identity, projects, team context, quarterly plans, wiki URLs, source mappings, and starter config before daily work memory can run.
---

# Personal Work Memory Init

Use this skill when `personal-work-trace/` is empty, missing core config, or too sparse for useful daily/project memory.

The goal is a small, useful seed. Do not build integrations or scrape broad history. Create enough context for `$personal-work-memory` and `$personal-history-chat` to classify future work events and ask good follow-up questions.

## Empty Store Check

Treat the store as uninitialized if any of these are true:

- `personal-work-trace/` does not exist.
- `personal-work-trace/config/user.yaml` does not exist.
- `personal-work-trace/projects/active/` has no project definitions.
- `personal-work-trace/state/identity_map.json` does not exist.

## Runtime Tool Selection

Use only capabilities available to the current agent:

1. If Slack profile access is available, read the user's basic profile metadata.
2. If Google Drive, Confluence, or local files are available, look for explicitly named planning docs such as quarterly planners, team home pages, project plans, or operating docs.
3. If Jira or GitHub connectors are available, use them only for lightweight project/repo mapping, not deep backfill.
4. If a connector is unavailable, ask the user for the missing seed data.

Do not request plugin installation unless the user specifically asks for live connector-backed initialization.

## Seed Questions

Ask for missing seed data in small batches. Prefer asking for 3-6 bullets, not a large form.

Prompt the user for:

- Personal basics: preferred name, work email, timezone, Slack handle, GitHub username, Jira identity.
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
3. Ask the user for missing big plans, team home wiki URLs, quarterly planner files, and source boundaries.
4. Create the seed structure and starter config.
5. Create project definitions only for projects with enough signal to classify future events.
6. Write `knowledge/source-map.md` with source availability and gaps.
7. Tell the user what was initialized, what is still missing, and which skill to use next.

## Handoff

After initialization, suggest:

- `$personal-work-memory` to add today's temporary daily data and generate the first daily record.
- `$personal-history-chat` to ask what the initialized memory knows and where it is still thin.
