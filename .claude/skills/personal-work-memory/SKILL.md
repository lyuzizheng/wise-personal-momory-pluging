---
name: personal-work-memory
description: Use when maintaining, backfilling, querying, or designing a personal work trace memory from available GitHub, Jira, Confluence, Slack, Gmail, Google Calendar, Google Docs, manual notes, or local evidence.
---

# Work Trace Documentation Skill

Version: 0.1
Purpose: Maintain an AI-first personal work documentation system from whatever source plugins, connectors, skills, local files, and manual notes are available to the current agent.
Primary users: Individual contributors, engineers, operators, product/project owners, and managers who want searchable, auditable personal work memory.
Design principle: This is a personal/team memory system, not a productivity surveillance system.

---

## 1. Mission

You are an automation agent that maintains a structured offline work-memory repository for a user.

Each day, you collect the user's work traces from approved tools, normalize them into evidence-backed events, classify those events into projects/goals/workstreams, update daily records, roll them up into weekly/monthly/quarterly summaries, and maintain project-specific memory files.

The repository is optimized for future AI retrieval and reasoning, not for manual reading. Human readability is useful but secondary. The most important properties are:

1. Evidence-backed entries.
2. Stable identifiers.
3. Project association with confidence scores.
4. Append-safe history.
5. Ability to answer future questions like:
   - What did I work on last week?
   - What did I do for Project X in Q2?
   - Which Jira issues, PRs, meetings, Slack threads, and docs relate to this project?
   - What changed since yesterday?
   - What should I follow up on?

---

## 0. Runtime Tool Selection

Before reading or writing work traces, inspect the current agent environment and use the best available capability for each source:

1. If the platform exposes first-party skills, invoke the relevant skill first.
2. If the platform exposes plugins or MCP connectors, use the installed connector for that source.
3. If only local files are available, read from `personal-work-trace/`, `inbox/manual/`, or user-provided files.
4. If a source is unavailable or unauthenticated, look for indirect evidence from available sources such as Slack bot messages, channel membership, `@` mentions, local files, or other MCP connectors.
5. If available evidence is still too thin, record the gap in `Source Coverage and Gaps` and prompt the user to add connectors or provide manual evidence.
6. Never ask the user to install a connector unless the task truly cannot be completed from currently available evidence.

Examples:

- Codex with GitHub, Slack, Google Drive, Gmail, Google Calendar, or Atlassian plugins: use those plugin skills/tools for source reads.
- Claude Code with matching MCP servers: use those MCP tools.
- Figma/FigJam/design MCPs: use them for design, product, prototype, and design-system evidence when available.
- DataGrip/local SQL files: use them only through sanitized query-work analysis; never store query results, credentials, connection strings, or PII.
- Plain local agent: operate on local JSONL, Markdown, and manually supplied evidence only.

All source-specific instructions in this skill are conditional. They apply only when that source is enabled in config and available in the current agent runtime.

## 0.1 Mandatory Run Contract

Treat this skill as a step-based workflow. A work-memory run is not complete until the coordinator has executed or explicitly skipped each phase below with a recorded reason:

1. **Skill/state check:** compare current skill snapshot with `personal-work-trace/state/skill_snapshot.json`.
2. **Date plan:** resolve exact target dates and affected rollup periods in the user's timezone.
3. **Manual supplement prompt:** ask for temporary daily data before source synthesis.
4. **Subagent plan:** build a source-coverage matrix and schedule every applicable source subagent, plus association, synthesis, rollup, and quality agents.
5. **Source collection:** collect or import evidence for each target date from every applicable source, not only the easiest available source.
6. **Normalization and privacy:** normalize events, dedupe, and redact unsafe content.
7. **Project and role association:** classify project and user involvement role for every event.
8. **Daily write:** write events, daily markdown, and daily summary JSON for each target date.
9. **Project write:** update touched project timelines, evidence, decisions, follow-ups, risks, and indexes.
10. **Rollup write:** refresh every affected weekly rollup; then refresh affected monthly and quarterly rollups when requested, when boundary periods are reached, or when their lower-level inputs changed.
11. **Quality check:** verify evidence, privacy, project-role confidence, idempotency, and rollup coverage.
12. **Run log and user summary:** write `logs/YYYY-MM-DD.run.md` and report files updated, skipped phases, gaps, and review items.

If the platform supports subagents, run all applicable source subagents for every maintenance run. If subagents are not available, perform the same source sweep sequentially and say so in the run log.

Never stop after answering from local history when the user asked to maintain or update the work trace. Maintenance runs must write daily/project/rollup outputs or record why no write was possible.

## 0.2 Comprehensive Source Coverage

Every run must build a source-coverage matrix before fetching traces. Include a row for each source that is enabled in config, available in the current runtime, present in local imports, or visible through indirect evidence:

- Manual notes.
- Slack.
- GitHub.
- Jira / Atlassian.
- Confluence / wiki.
- Google Calendar.
- Google Meet.
- Gmail.
- Google Drive / Google Docs.
- Figma / FigJam / design MCPs.
- DataGrip / query work.
- Other available MCP or local evidence.

Each row must have one status:

- `subagent_run`: a dedicated source subagent collected evidence.
- `sequential_fallback`: subagents were unavailable, so the coordinator collected that source sequentially.
- `indirect_fallback`: the direct connector was unavailable, but bot posts, Slack messages, local imports, or linked records were checked.
- `disabled_by_config`: config explicitly disabled the source.
- `unavailable`: no connector, local import, or indirect evidence was available.
- `skipped_with_reason`: skipped only because privacy, policy, or user instruction required it.

Do not mark a source as covered just because it appears in config. Coverage means the run attempted that source for the target date range and wrote events, imports, or a concrete source gap. Slack-only or GitHub-only output is incomplete when Calendar, Jira, Docs, Gmail, Confluence, or other source capabilities are available.

## 2. Non-goals

This system must not:

1. Score productivity.
2. Rank employees.
3. Infer working hours from activity traces.
4. Summarize private messages unless explicitly allowed.
5. Publish anything automatically without user approval.
6. Store secrets, customer data, credentials, or unnecessary personal data.
7. Treat low-confidence inference as fact.
8. Rewrite historical records without preserving provenance.

---

## 3. Core Concepts

### 3.1 Work trace

A raw item fetched from a source system.

Examples:

- GitHub commit.
- GitHub pull request.
- GitHub review comment.
- Jira issue update.
- Jira comment.
- Slack message sent by the user.
- Slack thread reply.
- Confluence page created or edited.
- Google Doc edited.
- Calendar event attended.
- Meet transcript segment.
- Gmail sent email.
- Manual note.

### 3.2 Work event

A normalized, source-independent representation of a work trace.

Every work event must have:

- stable event id;
- source;
- timestamp;
- actor;
- action type;
- short factual summary;
- evidence links or source pointers;
- project candidates;
- project involvement role candidates;
- confidence score;
- privacy classification;
- extraction metadata.

### 3.3 Project

A persistent workstream, initiative, Jira epic, quarterly goal, operating area, or recurring responsibility.

Projects may originate from:

- Jira epics/projects/issues;
- Confluence project pages;
- GitHub repositories;
- Slack channels;
- Calendar recurring meetings;
- manually defined goals;
- inferred clusters of repeated work.

### 3.4 Daily record

The canonical record of one local calendar day.

A daily record contains:

- raw source coverage report;
- normalized events;
- project-attributed summary;
- decisions;
- blockers;
- follow-ups;
- open questions;
- evidence index;
- delta versus previous day.

### 3.5 Rollup

A weekly, monthly, or quarterly synthesis generated from lower-level records, never directly from raw traces unless backfilling.

Daily -> Weekly -> Monthly -> Quarterly.

Project records are updated from daily records and can be used to improve rollups.

---

## 4. Repository Layout

Use a local git repository as the source of truth.

```text
work-memory/
  README.md
  config/
    user.yaml
    sources.yaml
    privacy.yaml
    taxonomy.yaml
    departments.yaml
    project_aliases.yaml
    extraction_policy.yaml
    publishing_policy.yaml
  inbox/
    manual/
      YYYY-MM-DD.md
    imports/
      YYYY-MM-DD/
        github.jsonl
        jira.jsonl
        slack.jsonl
        confluence.jsonl
        google_calendar.jsonl
        google_meet.jsonl
        gmail.jsonl
        gdocs.jsonl
  events/
    YYYY/
      MM/
        YYYY-MM-DD.events.jsonl
  daily/
    YYYY/
      MM/
        YYYY-MM-DD.md
        YYYY-MM-DD.summary.json
  weekly/
    YYYY/
      YYYY-Www.md
      YYYY-Www.summary.json
  monthly/
    YYYY/
      YYYY-MM.md
      YYYY-MM.summary.json
  quarterly/
    YYYY/
      YYYY-Qn.md
      YYYY-Qn.summary.json
  projects/
    active/
      PROJECT-ID/
        project.md
        timeline.jsonl
        daily-index.md
        weekly-index.md
        evidence.jsonl
        decisions.md
        followups.md
        risks.md
    archived/
  people/
    SELF.md
    collaborators/
      person-id.md
  knowledge/
    glossary.md
    recurring-meetings.md
    repositories.md
    jira-projects.md
    slack-channels.md
    confluence-spaces.md
  state/
    last_run.json
    source_cursors.json
    identity_map.json
    dedupe_index.json
    project_index.json
    embedding_index_manifest.json
    skill_snapshot.json
  logs/
    YYYY-MM-DD.run.md
    skill-update-log.md
```

---

## 5. File Format Standards

### 5.1 Markdown records

Markdown records are optimized for AI parsing. Use stable headings and YAML frontmatter.

Daily file path:

```text
daily/YYYY/MM/YYYY-MM-DD.md
```

Daily file schema:

```markdown
---
record_type: daily
user: USER_ID
date: YYYY-MM-DD
timezone: Europe/Tallinn
generated_at: ISO_TIMESTAMP
sources_covered:
  github: true
  jira: true
  slack: true
  confluence: true
  google_calendar: true
  google_meet: true
  gmail: false
privacy_level: internal
publication_status: private_draft
confidence: 0.82
---

# Daily Record: YYYY-MM-DD

## Executive Summary

Brief synthesis of the day. Do not exaggerate. Mention uncertainty.

## Project Activity

### PROJECT-ID: Project Name

- Summary:
- Evidence:
  - EVENT-ID: source link or pointer
- Confidence: 0.00-1.00
- New decisions:
- Follow-ups:
- Blockers:

## Unclassified Activity

Events that could not be confidently mapped to a project.

## Decisions

- DECISION-ID: decision text, source evidence, project.

## Follow-ups

- FOLLOWUP-ID: task, owner, due date if known, evidence.

## Blockers / Risks

- RISK-ID: risk text, project, evidence.

## Meetings

Meeting-derived summaries. Include transcript evidence only if allowed.

## Communication Highlights

Slack/email highlights sent by the user. Avoid private or sensitive content.

## Code / Delivery Highlights

GitHub and code-delivery summaries.

## Jira / Planning Highlights

Jira issue activity summaries.

## Documentation Highlights

Confluence/Docs summaries.

## Delta vs Previous Day

What moved forward, what stayed open, what changed classification.

## Source Coverage and Gaps

List sources queried, failures, missing permissions, or skipped data.
```

### 5.2 Event JSONL

Daily event file path:

```text
events/YYYY/MM/YYYY-MM-DD.events.jsonl
```

Each line is one normalized event.

```json
{
  "event_id": "evt_2026-06-05_github_pr_123456",
  "record_date": "2026-06-05",
  "timestamp": "2026-06-05T10:31:00+03:00",
  "actor": {
    "user_id": "zizheng.lyu",
    "email": "zizheng.lyu@wise.com",
    "source_identity": "github:example-user"
  },
  "source": "github",
  "source_object_type": "pull_request",
  "source_object_id": "repo/name#123",
  "source_url": "https://github.example/repo/pull/123",
  "action_type": "pull_request_reviewed",
  "raw_title": "Fix settlement reconciliation edge case",
  "factual_summary": "Reviewed a pull request related to settlement reconciliation.",
  "evidence": [
    {
      "type": "url",
      "value": "https://github.example/repo/pull/123"
    }
  ],
  "project_candidates": [
    {
      "project_id": "PROJECT-SETTLEMENT-RECON",
      "reason": "Repository ownership and PR title match project aliases.",
      "involvement_role": "reviewer",
      "role_reason": "The user reviewed the pull request but did not author the core implementation.",
      "confidence": 0.87
    }
  ],
  "selected_project_id": "PROJECT-SETTLEMENT-RECON",
  "selected_project_role": "reviewer",
  "classification_confidence": 0.87,
  "privacy": {
    "level": "internal",
    "contains_customer_data": false,
    "contains_secret": false,
    "safe_to_summarize": true,
    "safe_to_publish": false
  },
  "derived_items": {
    "decisions": [],
    "followups": [],
    "risks": []
  },
  "dedupe_key": "github:repo/name:pull_request:123:reviewed:2026-06-05T10:31:00+03:00",
  "extraction": {
    "agent": "github_trace_agent",
    "run_id": "run_2026-06-05",
    "model": "MODEL_NAME",
    "created_at": "2026-06-05T23:00:00+03:00"
  }
}
```

---

## 6. Configuration

### 6.1 config/user.yaml

```yaml
user:
  id: zizheng.lyu
  display_name: Zizheng Lyu
  email: zizheng.lyu@wise.com
  timezone: Europe/Tallinn

identities:
  github:
    usernames: []
  jira:
    account_ids: []
  confluence:
    account_ids: []
  slack:
    user_ids: []
  google:
    emails:
      - zizheng.lyu@wise.com

working_day:
  day_boundary: local_midnight
  default_backfill_days: 1
```

### 6.2 config/sources.yaml

```yaml
sources:
  github:
    enabled: true
    include:
      commits: true
      pull_requests: true
      reviews: true
      review_comments: true
      issues: false
    exclude_repositories: []

  jira:
    enabled: true
    include:
      assigned_issues: true
      reported_issues: true
      watched_issues: true
      comments_by_user: true
      changelog_by_user: true

  confluence:
    enabled: true
    include:
      pages_created_by_user: true
      pages_updated_by_user: true
      comments_by_user: true
    read_history_enabled: false

  slack:
    enabled: true
    include:
      messages_sent_by_user: true
      thread_replies_sent_by_user: true
      channels: true
      dms: false
      private_channels: false
    allowed_channels: []
    excluded_channels: []

  google_calendar:
    enabled: true
    include:
      events_attended: true
      events_organized: true
      recurring_meetings: true

  google_meet:
    enabled: true
    include:
      transcripts: true
      summaries: true
    require_meeting_consent: true

  gmail:
    enabled: false
    include:
      sent_email_metadata: true
      sent_email_body: false
    allowed_domains: []

  gdocs:
    enabled: false
    include:
      docs_created: true
      docs_updated: true
      comments_by_user: true
```

### 6.3 config/privacy.yaml

```yaml
privacy:
  default_publish_status: private_draft
  never_collect:
    - plaintext_credentials
    - api_keys
    - secrets
    - high_risk_customer_data
    - unnecessary_personal_data

  slack:
    include_dms: false
    include_private_channels: false
    summarize_message_content: true
    quote_messages: false

  meetings:
    include_transcripts_only_if_available_and_allowed: true
    quote_transcripts: false

  output:
    evidence_links_allowed: true
    raw_content_allowed_in_private_records: limited
    raw_content_allowed_in_publishable_records: false
```

### 6.4 config/taxonomy.yaml

```yaml
activity_types:
  - code_delivery
  - code_review
  - project_planning
  - stakeholder_communication
  - incident_or_support
  - documentation
  - analysis
  - decision_making
  - meeting
  - follow_up
  - admin
  - learning
  - unclassified

project_statuses:
  - active
  - paused
  - blocked
  - shipped
  - archived

confidence_thresholds:
  auto_assign_project: 0.78
  suggest_project: 0.55
  leave_unclassified_below: 0.55

project_role_thresholds:
  core_contributor: 0.75
  side_helper: 0.55
  observer: 0.40
```

### 6.5 config/departments.yaml

Use department categories to shape summaries and auto-categorise work for a Wise-style fintech environment. These are business context labels, not employee profiles.

```yaml
departments:
  included:
    - engineering
    - product
    - design
    - compliance
    - legal
    - risk
    - finance
    - treasury
    - data_analytics
    - security
    - privacy
    - people
    - marketing
    - business_development
    - banking_partnerships
    - strategy
  excluded:
    - customer_support
    - operations

categorisation:
  primary_source: slack_profile_department
  fallback_sources:
    - slack_profile_title
    - slack_profile_team
    - team_home_wiki
    - project_aliases
  confidence_threshold: 0.70
  require_user_review_below: 0.70
```

Rules:

- If Slack profile data has a department, use it as the first department candidate.
- If the Slack department maps to customer support or operations, keep it out of this memory unless the user explicitly overrides the scope.
- If department is ambiguous, ask the user instead of guessing.
- Use department labels to choose summary language and audience views; do not store unnecessary personal attributes.

### 6.6 config/project_aliases.yaml

```yaml
projects:
  PROJECT-ID:
    name: Human Project Name
    status: active
    quarter: 2026-Q2
    jira:
      project_keys: []
      issue_keys: []
      epics: []
      labels: []
    github:
      repositories: []
      branch_patterns: []
      path_patterns: []
    confluence:
      page_ids: []
      space_keys: []
      title_patterns: []
    slack:
      channels: []
      keywords: []
    google:
      calendar_title_patterns: []
      docs: []
    people:
      owners: []
      collaborators: []
    semantic_description: >
      One paragraph describing what belongs to this project and what does not.
```

---

## 7. Agent Architecture

The system uses a coordinator agent and specialized sub-agents.

### 7.1 Coordinator Agent

Responsibilities:

1. Determine exact target dates and affected weekly/monthly/quarterly periods.
2. Load config, previous state, project definitions, existing daily/project/rollup records, and the skill snapshot.
3. Build a run checklist from `0.1 Mandatory Run Contract`.
4. Build the source-coverage matrix from `0.2 Comprehensive Source Coverage`.
5. Spawn every applicable source subagent when the current runtime supports subagents.
6. If a source subagent cannot be spawned, run that source sequentially or record direct/indirect coverage gaps.
7. Spawn project association, rollup, and quality agents when the current runtime supports subagents.
8. Validate normalized events.
9. Dedupe events.
10. Run project and project-role association.
11. When target-date records already exist, merge them with new evidence under the latest skill instructions before writing.
12. Generate or update daily records for every target date.
13. Update project timelines and indexes for every touched project.
14. Always evaluate rollups for every affected period and write/update the required rollup files.
15. Run quality/privacy checks after daily, project, and rollup writes.
16. Write run log with completed/skipped phases and the full source-coverage matrix.
17. Produce review summary for the user.

### 7.2 Source Agents

Each source agent must return normalized work events, not prose only.

Supported source agents, attempted for every run when enabled, available, locally imported, or indirectly signaled:

- GitHub Trace Agent.
- Jira Trace Agent.
- Slack Trace Agent.
- Confluence Trace Agent.
- Google Calendar Agent.
- Google Meet Transcript Agent.
- Gmail Agent.
- Google Docs Agent.
- Figma / Design MCP Agent.
- DataGrip / Query Work Agent.
- Other Available MCP Agent.
- Manual Notes Agent.

The coordinator must attempt all applicable source agents. It must not stop after the first productive source. If Slack returns events but Google Calendar, Jira, Docs, Gmail, GitHub, or Confluence are enabled or available, those sources still need their own subagent result or explicit coverage-gap status.

If a source has no available runtime capability, try indirect Slack and MCP evidence before skipping it:

- Jira bot messages can indicate issue assignments, status changes, reviews, or project links.
- Google Meet/Calendar bots can indicate meetings, recurring rituals, and project discussions.
- Confluence bots can indicate page edits or linked wiki pages.
- GitHub bots can indicate PRs, reviews, merges, and deployments.
- Figma bots can indicate file comments, design review, or prototype activity.
- DataGrip query files and safe local SQL metadata can indicate analysis work for analyst, data, finance, risk, compliance, and product roles.
- On-call bots and incident channels can indicate on-call duty, incident response, escalation, and handoff work.
- Daily/standup channels can indicate active team context and current priorities.

Record indirect evidence as lower confidence unless a source link or explicit assignment confirms it. If external sources are too sparse after this fallback, ask the user to add more connectors or provide manual daily data.

For all maintenance runs, use source subagents when the platform supports them. Split by source first, then by task if needed: Slack signals, delivery sources, Jira/Atlassian, wiki/planning docs, Calendar/Meet, Gmail, Docs/Drive, design sources, query work, project association, rollup synthesis, and privacy/source coverage. Subagents should return concise normalized findings and evidence pointers, not broad prose dumps.

Required subagent output shape:

```json
{
  "agent": "slack_trace_agent",
  "date_range": ["YYYY-MM-DD"],
  "events": [],
  "source_gaps": [],
  "privacy_redactions": [],
  "project_role_notes": [],
  "files_or_records_read": []
}
```

The coordinator must merge subagent outputs, dedupe them, and write canonical files. Subagents may recommend writes, but the coordinator owns final file writes unless the user explicitly asks for a delegated implementation run.

For query work, require a query-work subagent when there is more than a single obvious query file. The subagent must sanitize query intent and map it to candidate projects without storing raw SQL, query results, credentials, connection strings, hostnames, tokens, customer identifiers, or PII.

### 7.3 Project Association Agent

Responsibilities:

1. Load active project definitions.
2. Match deterministic signals.
3. Run semantic classification for uncertain events.
4. Assign selected_project_id when confidence is high.
5. Keep ambiguous events unclassified.
6. Suggest new project candidates when repeated unclassified clusters appear.

### 7.4 Daily Synthesis Agent

Responsibilities:

1. Summarize events by project.
2. Identify deltas from previous day.
3. Extract decisions, blockers, follow-ups, and risks.
4. Preserve uncertainty and evidence.
5. Avoid unsupported claims.

### 7.5 Rollup Agent

Responsibilities:

1. Generate weekly records from daily records.
2. Generate monthly records from weekly records.
3. Generate quarterly records from monthly/project records.
4. Update project timelines and indexes.
5. Avoid re-reading raw traces unless repairing or backfilling.
6. Run after daily and project updates for every affected target date.
7. List missing lower-level records explicitly instead of blocking rollup generation.
8. Separate owner/core contributor outcomes from reviewer, side-helper, observer, and unknown-role activity.
9. Return a rollup coverage report with files read, files written, missing dates, confidence changes, and carry-over follow-ups.

### 7.6 Quality Agent

Responsibilities:

1. Check for missing evidence.
2. Check for privacy violations.
3. Check for overconfident claims.
4. Check that all summaries are grounded in events.
5. Check that no secrets or high-risk data were written.

---

## 8. Daily Workflow

Run daily after the user’s local workday or the next morning.

Always resolve dates explicitly in the user's timezone. If the user does not specify a date, prefer today's local date first. If they ask to "trace back", "catch up", "prepare data", or "update data", accept any specific date or date range, including yesterday, last week, last month, or non-sequential dates.

Date handling rules:

- **Today first:** for an ordinary daily run, generate or update today's record before suggesting yesterday or older backfill.
- **Yesterday:** if the user asks for yesterday, resolve it to the exact local calendar date before writing.
- **Backfill ranges:** process one date at a time and write each daily record independently.
- **Non-sequential updates:** allow missing days. Do not force records for dates the user did not ask for.
- **Re-runs:** treat an existing daily record as an update, not a replacement. Preserve evidence IDs and source pointers where possible, add new manual/imported data, upgrade missing fields required by the latest skill instructions, and record what changed.
- **Existing today:** if today's record already exists, load the existing daily markdown, summary JSON, event JSONL, touched project files, and affected rollups first. Merge old trace data with new evidence using the current skill rules; do not regenerate from only the newest source fetch.
- **Rollups:** weekly, monthly, and quarterly rollups should use all available daily/project records in scope, even if some dates are missing.

Before generating or updating the daily record, prompt the user for temporary daily data to add on top of recorded history:

- work that happened outside available source connectors;
- decisions, follow-ups, blockers, or risks they remember;
- meetings, docs, or project context that may not appear in imported traces;
- anything from today that should be added as a manual note before synthesis.

If the user provides temporary data, store or stage it under `personal-work-trace/inbox/manual/YYYY-MM-DD.md` before synthesis. If the user says there is no temporary data, record that no manual supplement was provided and continue.

Input:

- target date, default today in user's timezone;
- user config;
- source cursors;
- active project definitions;
- previous daily record;
- current weekly/monthly/quarterly records.

Algorithm:

1. **Plan phase**
   - Resolve each target date to `YYYY-MM-DDT00:00:00` through next day `T00:00:00` in the user timezone.
   - Compute affected ISO weeks, months, quarters, and touched project ids from existing records plus new target dates.
   - Load config, previous state, existing records, project definitions, current rollups, and skill snapshot.
   - Create a checklist matching `0.1 Mandatory Run Contract`.
2. **Manual supplement phase**
   - Prompt for temporary daily data for each target date.
   - If provided, stage it under `personal-work-trace/inbox/manual/YYYY-MM-DD.md`.
   - If not provided, record `manual_supplement_not_provided` in source coverage.
3. **Subagent/source phase**
   - Build the source-coverage matrix before fetching data.
   - If subagents are available, spawn all applicable source subagents in parallel by source and target date range.
   - If subagents are unavailable, run the same all-source collection sequentially.
   - Attempt each enabled/available/local/indirect source even if another source already returned enough evidence.
   - For Calendar/Meet, Jira/Atlassian, Gmail, Docs/Drive, Confluence, Figma, GitHub, Slack, query-work, and manual notes, write either normalized events/imports or an explicit source gap.
   - Store raw traces in `inbox/imports/YYYY-MM-DD/*.jsonl`.
   - Every source or subagent must return events, source gaps, privacy redactions, files/source objects read, and a coverage status from `0.2 Comprehensive Source Coverage`.
4. **Normalize/privacy phase**
   - Normalize traces into event objects.
   - Load existing target-date events and treat them as prior evidence.
   - Validate event schema.
   - Dedupe using stable `event_id`, `dedupe_key`, and source object ids.
   - If existing events lack fields now required by the latest skill, enrich them from available daily/project/import evidence instead of dropping them.
   - Redact or skip unsafe content.
5. **Project association phase**
   - Use deterministic mapping first, semantic classification second.
   - Classify both `selected_project_id` and `selected_project_role`.
   - Select project only when confidence meets threshold.
   - Keep low-confidence project or role assignments unclassified or `unknown`.
6. **Daily write phase**
   - Write `events/YYYY/MM/YYYY-MM-DD.events.jsonl` as the merged current view for that date.
   - Generate or update `daily/YYYY/MM/YYYY-MM-DD.md` from merged old and new events.
   - Generate or update `daily/YYYY/MM/YYYY-MM-DD.summary.json` from merged old and new events.
   - Re-runs must preserve stable event ids where possible, keep older evidence links, apply the latest output schema, and log what changed.
7. **Project write phase**
   - For every touched project, append/update:
     - `timeline.jsonl`;
     - `evidence.jsonl`;
     - `daily-index.md`;
     - `decisions.md`;
     - `followups.md`;
     - `risks.md`.
   - Append role-reclassification events when the project role changed.
   - When old project entries are sparse, preserve them and append enriched timeline/evidence/decision entries derived from the merged daily record rather than replacing history.
8. **Mandatory rollup phase**
   - Refresh every affected weekly rollup after daily and project writes.
   - Refresh affected monthly rollups if any weekly input in that month changed, if the user requested a month/backfill, or if the month is complete.
   - Refresh affected quarterly rollups if any monthly/project input in that quarter changed, if the user requested a quarter/backfill, or if the quarter is complete.
   - Rollups must use lower-level records first. Use raw traces only for repair/backfill and record that exception.
   - Rollups must list missing dates or missing lower-level records under `Source Coverage and Gaps`.
9. **Quality phase**
   - Run quality/privacy review over events, daily records, project files, and rollups.
   - Fix blocking quality issues before finishing.
   - Record non-blocking issues in the run log and user summary.
10. **State/log phase**
   - Update `state/last_run.json`, cursors, dedupe index, project index, and skill snapshot.
   - Write `logs/YYYY-MM-DD.run.md` with checklist status, source-coverage matrix, files read, files written, subagents used, skipped phases, source gaps, and rollup coverage.
   - Return review summary to user.

---

## 9. Weekly Workflow

Weekly records are generated from daily records and project timelines.

Weekly rollups do not require all seven daily records to exist. Use the daily records and event files available for that ISO week, list missing dates under `Source Coverage and Gaps`, and keep confidence lower when coverage is incomplete.

Trigger weekly rollup generation after every daily/backfill run that touches a date in the week. Do not wait for Sunday/Monday boundaries if the user is preparing, repairing, or updating records.

Weekly file path:

```text
weekly/YYYY/YYYY-Www.md
```

Weekly schema:

```markdown
---
record_type: weekly
week: YYYY-Www
user: USER_ID
source_daily_records:
  - YYYY-MM-DD
  - YYYY-MM-DD
confidence: 0.00
publication_status: private_draft
---

# Weekly Record: YYYY-Www

## Executive Summary

## Main Outcomes

## Project Progress

### PROJECT-ID: Project Name

- What moved forward:
- Evidence:
- Decisions:
- Follow-ups:
- Risks:
- Confidence:

## Cross-project Themes

## Notable Collaborations

## Open Follow-ups

## Carry-over to Next Week

## Unclassified / Needs Review

## Source Coverage and Gaps
```

Rules:

- Use only daily records and event files unless repairing missing days.
- Do not invent outcomes.
- Keep unresolved follow-ups visible.
- Link back to daily records and event ids.
- Separate `owner` and `core_contributor` work from `reviewer`, `side_helper`, `observer`, and `unknown` activity.
- Include `source_daily_records` and a missing-date list even when records are non-sequential.
- If the weekly file already exists, update it idempotently from current daily/project records and record changed inputs.
- If no daily records exist for the week, do not synthesize the week from memory alone; record the coverage gap and ask for source/manual evidence.

Weekly rollup steps:

1. Resolve the ISO week and dates in the user timezone.
2. Read all available `daily/YYYY/MM/*.md`, `daily/**/*.summary.json`, and `events/**/*.events.jsonl` for those dates.
3. Read touched project timelines and project indexes.
4. Group outcomes by project and involvement role.
5. Carry forward open follow-ups, risks, and unresolved questions.
6. Write/update `weekly/YYYY/YYYY-Www.md`.
7. Write/update `weekly/YYYY/YYYY-Www.summary.json`.
8. Return a rollup coverage report to the coordinator.

---

## 10. Monthly Workflow

Monthly records are generated from weekly records and project records.

Monthly rollups do not require every week or every day to be present. Use available weekly records, daily records, and project timelines for the requested month. Record missing date ranges explicitly.

Trigger monthly rollup generation when a weekly record in the month changed, when the user asked for a month/backfill, or when the month is complete. If weekly records are missing but daily records exist, use the daily records as fallback and list the missing weekly records.

Monthly file path:

```text
monthly/YYYY/YYYY-MM.md
```

Monthly sections:

1. Executive summary.
2. Key outcomes.
3. Project-by-project progress.
4. Decisions made.
5. Shipped or completed work.
6. Recurring blockers.
7. Stakeholder/collaboration map.
8. Follow-ups carried forward.
9. Goals alignment.
10. Evidence index.

Monthly rollup steps:

1. Read weekly rollups for the month.
2. Read daily/project records only for missing or repaired weekly inputs.
3. Group owner/core outcomes separately from supporting involvement.
4. Preserve open follow-ups and risks.
5. Write/update `monthly/YYYY/YYYY-MM.md` and `.summary.json`.
6. Report missing weeks/dates and confidence impact.

---

## 11. Quarterly Workflow

Quarterly records are generated from monthly records, project records, and declared quarterly goals.

Quarterly rollups do not require continuous monthly coverage. Use available records in scope and mark gaps clearly.

Trigger quarterly rollup generation when a monthly record or project record in the quarter changed, when the user asked for a quarter/backfill, or when the quarter is complete. If monthly records are missing but weekly/daily records exist, use them as fallback and record the gap.

Quarterly file path:

```text
quarterly/YYYY/YYYY-Qn.md
```

Quarterly sections:

1. Quarterly narrative.
2. Goals and outcomes.
3. Project portfolio.
4. Major shipped work.
5. Major decisions.
6. Impact evidence.
7. Work that did not land.
8. Lessons learned.
9. Next quarter carry-over.
10. Appendix: evidence and links.

Quarterly rollup steps:

1. Read declared quarterly goals, monthly records, and project records.
2. Use weekly/daily records only for missing or repaired monthly inputs.
3. Summarize portfolio outcomes by project and involvement role.
4. Separate shipped/core work from support/background visibility.
5. Write/update `quarterly/YYYY/YYYY-Qn.md` and `.summary.json`.
6. Report missing months/weeks/dates and confidence impact.

---

## 12. Project Record

Each project has a directory:

```text
projects/active/PROJECT-ID/
```

### 12.1 project.md

```markdown
---
record_type: project
project_id: PROJECT-ID
name: Project Name
status: active
created_at: ISO_TIMESTAMP
updated_at: ISO_TIMESTAMP
quarter: 2026-Q2
confidence: 0.00
user_involvement_role: core_contributor
role_confidence: 0.00
---

# PROJECT-ID: Project Name

## Definition

What belongs to this project.

## Non-goals

What does not belong to this project.

## Source Mapping

- Jira:
- GitHub:
- Confluence:
- Slack:
- Google:

## Current Status

## User Involvement Role

- Role:
- Evidence:
- Confidence:
- Notes:

## Timeline Summary

## Decisions

## Follow-ups

## Risks / Blockers

## Key Evidence

## Open Questions
```

### 12.2 timeline.jsonl

Append one project-attributed event per line.

### 12.3 evidence.jsonl

Append durable evidence pointers.

---

## 13. Project Association Logic

Use layered classification.

Project association is not enough. The agent must also classify the user's role in the project so side-help and background visibility do not make a project look like owned work.

Supported project involvement roles:

- **owner:** accountable for outcomes, drives planning, owns major decisions, or is named as owner/DRI.
- **core_contributor:** authors implementation/docs/analysis, leads delivery, or repeatedly advances the project.
- **reviewer:** reviews PRs/docs/designs/queries or provides approval without owning delivery.
- **side_helper:** gives occasional advice, answers a question, joins one thread, or helps unblock a small task.
- **observer:** receives updates, is in the channel, attends broad meetings, or is mentioned without meaningful action.
- **unknown:** evidence is insufficient or conflicting.

Default rollups should emphasize owner and core_contributor projects, include reviewer projects when useful, and keep side_helper/observer projects in a separate "supporting involvement" or "background visibility" section.

### 13.1 Deterministic matching

Signals:

- Jira issue key in title/body/branch/commit/PR.
- GitHub repository mapped to project.
- Branch pattern mapped to project.
- Confluence page id mapped to project.
- Slack channel mapped to project.
- Calendar event title mapped to project.
- Known collaborator group mapped to project.
- Existing project alias or keyword.

Role signals:

- GitHub authored PRs, commits, or repeated implementation comments: core_contributor.
- GitHub review-only activity: reviewer.
- Slack user starts planning threads, assigns work, or is asked for decisions: owner or core_contributor depending on evidence.
- Slack one-off advice, reactions, or short unblock replies: side_helper.
- Slack channel membership, broad announcements, or passive mentions: observer unless there is direct action.
- Confluence pages authored/maintained by the user for the project: core_contributor or owner if the page names them as owner.
- Confluence comments or minor edits: reviewer or side_helper.
- Jira assignee/reporter/owner fields: owner or core_contributor depending on issue type and repeated activity.
- Jira watcher/subscriber or copied comments: observer.
- Figma design ownership/comments: core_contributor or reviewer depending on authorship.
- DataGrip/query analysis used for project decisions: core_contributor for analysis work, reviewer if only validating someone else's query.

### 13.2 Semantic matching

Use an LLM or embeddings only after deterministic matching.

Input to classifier:

- event factual summary;
- source title;
- source metadata;
- surrounding thread or issue title if allowed;
- active project definitions;
- recent project activity.

Output:

```json
{
  "event_id": "evt_x",
  "candidates": [
    {
      "project_id": "PROJECT-ID",
      "confidence": 0.82,
      "involvement_role": "core_contributor",
      "role_confidence": 0.76,
      "reason": "The event discusses the same Jira epic and recurring Slack channel as this project."
    }
  ],
  "selected_project_id": "PROJECT-ID",
  "selected_project_role": "core_contributor",
  "needs_user_review": false
}
```

### 13.3 Confidence rules

- >= 0.78: assign automatically.
- 0.55 to 0.77: suggest but mark needs_review.
- < 0.55: leave unclassified.

Role confidence rules:

- If project confidence is high but role confidence is low, keep the project but mark `selected_project_role: unknown`.
- Never upgrade observer or side_helper projects into core_contributor without direct authored work, ownership, repeated project advancement, or explicit source evidence.
- If a project appears only through channel membership, bot notifications, broad meetings, or FYI mentions, classify as observer and exclude from main achievement summaries.
- If a project appears through one-off help, classify as side_helper and summarize separately from owned/core work.

### 13.4 New project detection

If several unclassified events across 3+ days share the same repo, Jira label, Slack channel, meeting title, or semantic cluster, create a draft project candidate:

```text
projects/active/_candidates/CANDIDATE-ID.md
```

Do not promote to active project without user approval.

---

## 14. Source Agent Specifications

### 14.1 GitHub Trace Agent

Collect:

- commits authored by user;
- PRs opened by user;
- PRs merged by user;
- PR reviews by user;
- review comments by user;
- issues opened/commented if enabled.

Normalize into events:

- commit_authored;
- pull_request_opened;
- pull_request_updated;
- pull_request_merged;
- pull_request_reviewed;
- pull_request_commented;
- issue_commented.

Summarization rules:

- Prefer PR title and description over commit messages if both exist.
- Group noisy commits under a PR when possible.
- Do not include code diffs unless explicitly enabled.
- Never store secrets from diffs.

### 14.2 Jira Trace Agent

Collect:

- issues assigned to user and updated during date window;
- issues reported by user;
- comments by user;
- status changes by user;
- field changes by user;
- worklogs if enabled.

Normalize into events:

- jira_issue_created;
- jira_issue_updated;
- jira_comment_added;
- jira_status_changed;
- jira_worklog_added;
- jira_issue_assigned.

Rules:

- Use issue key as primary project signal.
- Preserve old/new status for transitions.
- Do not copy full sensitive descriptions unless allowed.

### 14.3 Slack Trace Agent

Collect:

- messages sent by user in allowed public channels;
- thread replies sent by user;
- permalink, channel, timestamp;
- parent thread title/context if allowed.

Normalize into events:

- slack_message_sent;
- slack_thread_reply_sent;
- slack_decision_participated;
- slack_followup_created.

Rules:

- Default: no DMs.
- Default: no private channels.
- Do not quote messages by default.
- Summarize user's own messages only.
- Use channel name and thread context for project classification.
- If message contains customer data, secrets, credentials, or sensitive personal data, redact or skip.

### 14.4 Confluence Trace Agent

Collect:

- pages created by user;
- pages edited by user;
- comments by user;
- optionally pages read by user if policy allows.

Normalize into events:

- confluence_page_created;
- confluence_page_updated;
- confluence_comment_added;
- confluence_page_read.

Rules:

- Page title and space are strong project signals.
- Avoid storing full page content unless necessary.
- Store page id and URL as evidence.

### 14.5 Google Calendar Agent

Collect:

- meetings attended;
- meetings organized;
- event title;
- attendees;
- location/Meet link metadata;
- description if allowed.

Normalize into events:

- meeting_attended;
- meeting_organized;
- recurring_meeting_attended.

Rules:

- Calendar attendance alone is weak evidence of contribution.
- Use meeting title and recurring series for project association.
- Do not infer decisions from calendar metadata only.

### 14.6 Google Meet Transcript Agent

Collect:

- transcripts and summaries if available and allowed;
- speaker segments for the user if available;
- action items and decisions if generated.

Normalize into events:

- meeting_discussion_contributed;
- meeting_decision_recorded;
- meeting_followup_recorded.

Rules:

- Do not quote transcripts by default.
- Summarize only relevant decisions/actions.
- Preserve meeting link and transcript pointer.
- Mark confidence lower if speaker attribution is missing.

### 14.7 Gmail Agent

Collect only if enabled:

- sent email metadata;
- subject;
- recipients domain-level info;
- body only if explicitly enabled.

Normalize into events:

- email_sent;
- email_followup_sent;
- stakeholder_update_sent.

Rules:

- Default body collection is off.
- Never collect personal email.
- Avoid storing recipient personal details unless needed.

### 14.8 Google Docs Agent

Collect only if enabled:

- docs created;
- docs edited;
- comments by user;
- suggestions by user.

Normalize into events:

- gdoc_created;
- gdoc_updated;
- gdoc_comment_added;
- gdoc_suggestion_added.

Rules:

- Store doc title and URL as evidence.
- Avoid full content unless explicitly enabled.

### 14.9 Manual Notes Agent

Input path:

```text
inbox/manual/YYYY-MM-DD.md
```

Manual note format:

```markdown
# Manual Notes: YYYY-MM-DD

## Worked on

## Decisions

## Follow-ups

## Blockers

## Project hints
```

Rules:

- Manual notes are high-signal.
- Use manual project hints to override low-confidence inference.
- Do not override strong source evidence without noting conflict.

---

## 15. Prompt Templates

### 15.1 Coordinator Prompt

```text
You are the Work Trace Documentation Coordinator.

Goal:
Maintain the user's work-memory repository for DATE_RANGE.

Inputs:
- User config.
- Source configs.
- Privacy policy.
- Active project taxonomy.
- Previous state.
- Existing daily/weekly/monthly/project records.

Tasks:
1. Build a source-coverage matrix for every enabled, available, locally imported, or indirectly signaled source.
2. Run every applicable source subagent, or sequential fallback when subagents are unavailable.
3. Collect raw traces from all source agents; do not stop after Slack, GitHub, or any first productive source.
4. Normalize traces into event JSONL.
5. Dedupe events.
6. Apply privacy filters.
7. Classify events into projects.
8. Generate or update the daily record.
9. Update touched project records.
10. Update every affected weekly/monthly/quarterly rollup or record an explicit skip reason.
11. Run quality checks across daily, project, and rollup outputs.
12. Produce a concise review summary with checklist status, source coverage, subagent status, and rollup coverage.

Hard rules:
- Do not invent work.
- Every claim must be backed by event ids or source evidence.
- Mark uncertainty explicitly.
- Do not store secrets or high-risk data.
- Do not include Slack DMs or private channels unless explicitly enabled.
- Do not publish externally without user approval.
```

### 15.2 Source Agent Prompt

```text
You are SOURCE_NAME Trace Agent.

Collect the user's activity for DATE_RANGE from SOURCE_NAME according to config/sources.yaml and config/privacy.yaml.

Return normalized work events only.

For each event:
- Include stable event_id.
- Include timestamp in user's timezone.
- Include source object id and URL/pointer.
- Include factual summary.
- Include action_type.
- Include candidate project signals if obvious.
- Include privacy flags.
- Include dedupe_key.

Also return:
- coverage_status: subagent_run, sequential_fallback, indirect_fallback, disabled_by_config, unavailable, or skipped_with_reason.
- source_gaps: missing permissions, missing connector, missing import, no activity found, or privacy skip.
- files_or_records_read: local paths, source object ids, query ids, or connector result ids.

Do not write prose summaries. Do not include raw sensitive content. Do not infer impact.
```

### 15.3 Project Association Prompt

```text
You are the Project Association Agent.

Input:
- Normalized work events.
- Active project definitions.
- Project aliases.
- Recent project timelines.
- Confidence thresholds.
- Project role thresholds.

For each event:
1. Identify deterministic project signals.
2. Identify semantic project candidates.
3. Classify the user's involvement role for each candidate: owner, core_contributor, reviewer, side_helper, observer, or unknown.
4. Assign selected_project_id only if confidence is high enough.
5. Assign selected_project_role only if role confidence is high enough.
6. Give project and role reasons for each candidate.
7. Leave ambiguous events unclassified or role unknown.
8. Suggest draft projects for recurring unclassified clusters.

Output valid JSON only.
```

### 15.4 Daily Synthesis Prompt

```text
You are the Daily Synthesis Agent.

Create the daily record for DATE.

Inputs:
- Normalized events for DATE.
- Previous daily record.
- Active project records.
- Manual notes.

Output:
- daily/YYYY/MM/YYYY-MM-DD.md
- daily/YYYY/MM/YYYY-MM-DD.summary.json

Rules:
- Use stable headings.
- Group by project.
- Mention source coverage and gaps.
- Extract decisions, follow-ups, risks, blockers.
- Include event ids as evidence.
- Include confidence levels.
- Do not exaggerate.
- Do not infer productivity or hours worked.
```

### 15.5 Rollup Prompt

```text
You are the Rollup Agent.

Generate or update PERIOD_TYPE record for PERIOD_ID.

Inputs:
- Lower-level records.
- Project timelines.
- Open follow-ups.
- Decisions and risks.

Rules:
- Roll up from existing records, not raw traces.
- Keep evidence links to lower-level records.
- Preserve uncertainty.
- Track carry-over follow-ups.
- Do not create new facts unsupported by daily records.
```

### 15.6 Quality Prompt

```text
You are the Quality and Privacy Agent.

Review generated records and event files.

Check:
1. Every factual claim has evidence.
2. No secrets are present.
3. No high-risk customer data is present.
4. No private Slack DMs were included unless enabled.
5. No productivity scoring or employee ranking appears.
6. Low-confidence items are marked as uncertain.
7. Project assignments respect thresholds.
8. Historical records were not silently rewritten.

Return:
- pass/fail;
- issues;
- required fixes;
- optional improvements.
```

---

## 16. Update Semantics

### 16.1 Append-only principle

Raw imports and normalized events are append-only. If corrections are needed, create a replacement event with:

```json
{
  "supersedes_event_id": "old_event_id",
  "correction_reason": "reason"
}
```

### 16.2 Markdown update principle

Daily records may be regenerated for the same day until locked.

After locking, updates must add a correction section:

```markdown
## Corrections

- TIMESTAMP: Correction text. Supersedes EVENT-ID.
```

### 16.3 Project timeline principle

Project timelines are append-only JSONL. If an event is reclassified, append a reclassification event.

If the project stays the same but the user's role changes, append a role-reclassification event:

```json
{
  "event_type": "project_role_reclassified",
  "event_id": "role_reclass_EVENT_ID",
  "target_event_id": "EVENT_ID",
  "old_project_role": "observer",
  "new_project_role": "side_helper",
  "reason": "New skill version distinguishes one-off Slack help from core contribution.",
  "created_at": "ISO_TIMESTAMP"
}
```

---

## 17. State Management

### 17.1 state/last_run.json

```json
{
  "last_successful_run_at": "2026-06-05T23:10:00+03:00",
  "last_target_date": "2026-06-04",
  "last_run_id": "run_2026-06-05_231000",
  "status": "success"
}
```

### 17.2 state/source_cursors.json

```json
{
  "github": {
    "last_checked_at": "ISO_TIMESTAMP"
  },
  "jira": {
    "last_checked_at": "ISO_TIMESTAMP"
  },
  "slack": {
    "last_checked_at": "ISO_TIMESTAMP"
  }
}
```

### 17.3 state/dedupe_index.json

```json
{
  "dedupe_keys": [
    "source:type:id:timestamp"
  ]
}
```

For large repositories, replace JSON with SQLite.

---

## 18. CLI Interface

Recommended command interface:

```bash
work-memory run daily --date 2026-06-05
work-memory run weekly --week 2026-W23
work-memory run monthly --month 2026-06
work-memory run quarterly --quarter 2026-Q2
work-memory backfill --from 2026-06-01 --to 2026-06-05
work-memory classify --date 2026-06-05
work-memory review --date 2026-06-05
work-memory lock --date 2026-06-05
work-memory publish --date 2026-06-05 --target confluence --dry-run
```

---

## 19. Automation Schedule

Suggested jobs:

1. Daily private draft:
   - every weekday morning for previous day;
   - writes daily record, updates project files, and refreshes affected rollups.
2. Weekly rollup:
   - Monday morning for previous ISO week as a repair/review pass.
3. Monthly rollup:
   - first working day of month for previous month as a repair/review pass.
4. Quarterly rollup:
   - first working day after quarter end as a repair/review pass.
5. Backfill/repair:
   - manual only.

Do not auto-publish unless the user explicitly enables publishing.

---

## 20. Review Output to User

At the end of each run, return:

```markdown
# Work-memory update complete

Date: YYYY-MM-DD

## Sources covered

- GitHub: N events
- Jira: N events
- Slack: N events
- Confluence: N events
- Calendar/Meet: N events
- Gmail: skipped/disabled
- Docs: skipped/disabled

## Source coverage matrix

- Manual notes: subagent_run/sequential_fallback/indirect_fallback/disabled_by_config/unavailable/skipped_with_reason, N events, gap: ...
- Slack: status, N events, gap: ...
- GitHub: status, N events, gap: ...
- Jira / Atlassian: status, N events, gap: ...
- Confluence / wiki: status, N events, gap: ...
- Google Calendar: status, N events, gap: ...
- Google Meet: status, N events, gap: ...
- Gmail: status, N events, gap: ...
- Google Drive / Docs: status, N events, gap: ...
- Figma / design: status, N events, gap: ...
- DataGrip / query work: status, N events, gap: ...
- Other MCP/local evidence: status, N events, gap: ...

## Projects touched

- PROJECT-ID: N events, confidence avg 0.00

## Rollups updated

- Weekly: weekly/YYYY/YYYY-Www.md, confidence 0.00, missing dates: [...]
- Monthly: monthly/YYYY/YYYY-MM.md or skipped: reason
- Quarterly: quarterly/YYYY/YYYY-Qn.md or skipped: reason

## Subagents / phases

- Source collection: all applicable source subagents run / sequential fallback for listed sources
- Project association: subagent used / sequential fallback
- Rollup: subagent used / sequential fallback
- Quality: pass/fail

## Needs review

- N unclassified events
- N low-confidence project assignments
- N privacy redactions
- N rollup coverage gaps

## Files updated

- daily/...
- events/...
- projects/...
- weekly/...
- monthly/... or skipped
- quarterly/... or skipped
- logs/...
```

---

## 21. Skill Snapshot And Update Handling

Each work trace should record which skill/plugin snapshot shaped the data.

Maintain:

```text
personal-work-trace/state/skill_snapshot.json
personal-work-trace/logs/skill-update-log.md
```

`skill_snapshot.json` should contain:

```json
{
  "plugin_name": "wise-personal-momory-pluging",
  "plugin_version": "0.1.0",
  "skills": {
    "personal-work-memory": {
      "path": "skills/personal-work-memory/SKILL.md",
      "content_hash": "sha256",
      "updated_at": "ISO_TIMESTAMP"
    },
    "personal-work-memory-init": {
      "path": "skills/personal-work-memory-init/SKILL.md",
      "content_hash": "sha256",
      "updated_at": "ISO_TIMESTAMP"
    },
    "personal-history-chat": {
      "path": "skills/personal-history-chat/SKILL.md",
      "content_hash": "sha256",
      "updated_at": "ISO_TIMESTAMP"
    }
  }
}
```

Before updating local traces, compare the current skill hashes with `state/skill_snapshot.json`:

1. If unchanged, continue normally.
2. If changed, summarize what changed at a behavior level.
3. Check whether the change affects schemas, privacy, source discovery, project association, project-role classification, rollups, or output format.
4. Decide whether old trace records need migration, annotation, role reclassification, rollup refresh, or no action.
5. Record the decision in `logs/skill-update-log.md`.
6. If project-role rules changed, scan existing project timelines and mark likely observer/side_helper projects for review before future rollups.
7. Update `state/skill_snapshot.json` after the run.

When the target date already has daily/event/project data, the run must follow the latest skill instructions while preserving old trace data:

1. Load the existing target-date daily markdown, summary JSON, event JSONL, touched project timelines, project evidence/decision/follow-up/risk files, and affected rollups.
2. Build a merged event set from old events plus newly collected/imported/manual evidence.
3. Keep stable event ids and source pointers for unchanged old events.
4. Add newly required fields to old events when the value can be inferred from existing evidence; otherwise set the field to `unknown`, `not_captured`, or an explicit coverage gap.
5. Preserve old decisions, follow-ups, risks, and timeline entries unless a dedupe key proves they are duplicates.
6. Recompute daily summaries, project records, and affected rollups from the merged event set so old work and new evidence appear together.
7. Record the migration/merge decision and any unfilled new fields in `logs/skill-update-log.md` or the daily run log.

Do not rewrite unrelated old daily/project records only because the skill changed. Prefer appending migration notes or updating rollups unless the user explicitly asks to reprocess records.

---

## 22. Implementation Notes

### 22.1 Storage choice

Start with files and JSONL. Add SQLite only when scale requires it.

Recommended:

- JSONL for raw events and timelines.
- Markdown for synthesized records.
- YAML for config.
- Git for auditability.
- Optional vector index for semantic search.

### 22.2 Retrieval for chat

When a user asks a future question:

1. Search project records first.
2. Search rollups second.
3. Search daily records third.
4. Search event JSONL for evidence.
5. Only fetch original source systems when local evidence is insufficient.

### 22.3 Embeddings

Optional index targets:

- daily executive summaries;
- project timeline summaries;
- event factual summaries;
- decisions;
- follow-ups;
- risks.

Do not embed raw sensitive text unless approved.

---

## 23. Safety and Governance Rules

1. The system is for user-owned memory and documentation.
2. User must know what sources are collected.
3. Sensitive channels and private messages are excluded by default.
4. Meeting transcripts require consent/policy approval.
5. All publication requires review.
6. Project association must expose confidence and evidence.
7. Any use for performance management requires separate policy review.
8. The system must respect approved AI/tooling and data-classification rules.

---

## 24. Minimal MVP Scope

Build this first:

1. GitHub agent.
2. Jira agent.
3. Slack public-channel own-message agent.
4. Calendar metadata agent.
5. Manual notes agent.
6. Project association using rules + simple LLM classifier.
7. Daily markdown record.
8. Project timeline updates.
9. Weekly rollup.
10. Quality/privacy check.

Defer:

- Gmail body ingestion.
- Google Docs content ingestion.
- Meet full transcript ingestion.
- Confluence read history.
- Auto-publishing.
- Team-wide views.

---

## 25. MVP Acceptance Criteria

The MVP is acceptable when:

1. It can generate a daily record for a chosen date.
2. At least 80% of obvious events are assigned to the correct project.
3. Uncertain events are left unclassified instead of misclassified.
4. Every summary line links to event evidence.
5. No private DMs are included by default.
6. No secrets or sensitive raw data are stored.
7. Weekly rollup can be generated from daily records.
8. Project timeline files update correctly.
9. Re-running the same day is idempotent.
10. If the current-day record already exists, the run merges old trace data with new evidence under the latest skill instructions instead of replacing it.
11. The source coverage matrix includes every enabled, available, locally imported, or indirectly signaled source.
12. A run with only Slack/GitHub events is marked incomplete when Calendar, Jira, Docs, Gmail, Confluence, or other connectors/imports were available but not attempted.
13. The user can review what changed.

---

## 26. Example Daily Record Snippet

```markdown
# Daily Record: 2026-06-05

## Executive Summary

Most visible activity was around PROJECT-SETTLEMENT-RECON and PROJECT-WORK-MEMORY. GitHub and Jira evidence show code review and planning activity. Slack activity suggests follow-up discussions, but two messages were left unclassified because project confidence was below threshold.

## Project Activity

### PROJECT-SETTLEMENT-RECON: Settlement Reconciliation

- Summary: Reviewed one PR and commented on one Jira issue related to reconciliation edge cases.
- Evidence:
  - evt_2026-06-05_github_pr_review_123
  - evt_2026-06-05_jira_comment_CARD-456
- Confidence: 0.88
- Follow-ups:
  - Confirm whether CARD-456 needs QA test-case update.

### PROJECT-WORK-MEMORY: Work Trace Documentation System

- Summary: Drafted architecture notes and discussed Slack/Jira/GitHub ingestion approach.
- Evidence:
  - evt_2026-06-05_slack_thread_C123_1717590000
- Confidence: 0.81

## Unclassified Activity

- evt_2026-06-05_slack_message_C999_1717580000: Possible process/admin topic. Confidence too low to assign.
```

---

## 27. Codex / Claude Code Build Instructions

When implementing this skill:

1. Create repository layout under `personal-work-trace/` unless the user gives another path.
2. Implement schemas before connectors.
3. Implement or configure one source agent at a time, preferring available skills/plugins/connectors before custom code.
4. Add tests for event normalization and dedupe.
5. Add golden-file tests for daily record generation.
6. Add privacy tests with fake secrets and fake private Slack messages.
7. Keep source integrations behind interfaces.
8. Do not hardcode credentials.
9. Read secrets only from approved environment or secret manager.
10. Produce dry-run output before writing files.

Suggested implementation modules:

```text
src/
  config/
  connectors/
    github.ts
    jira.ts
    slack.ts
    confluence.ts
    google_calendar.ts
    google_meet.ts
    gmail.ts
    gdocs.ts
  agents/
    coordinator.ts
    source_agent.ts
    project_association.ts
    daily_synthesis.ts
    rollup.ts
    quality.ts
  storage/
    jsonl.ts
    markdown.ts
    state.ts
  schemas/
    event.ts
    project.ts
    record.ts
  cli.ts
  tests/
```

Recommended first command for the coding agent:

```text
Implement the repository skeleton, config schemas, event schema, JSONL storage, dedupe logic, and a fake-source connector that can generate a daily record from fixture events. Do not implement real external API calls yet. Add tests.
```
