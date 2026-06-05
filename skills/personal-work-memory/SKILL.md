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
4. If a source is unavailable or unauthenticated, record the gap in `Source Coverage and Gaps`; do not invent missing traces.
5. Never ask the user to install a connector unless the task truly cannot be completed from currently available evidence.

Examples:

- Codex with GitHub, Slack, Google Drive, Gmail, Google Calendar, or Atlassian plugins: use those plugin skills/tools for source reads.
- Claude Code with matching MCP servers: use those MCP tools.
- Plain local agent: operate on local JSONL, Markdown, and manually supplied evidence only.

All source-specific instructions in this skill are conditional. They apply only when that source is enabled in config and available in the current agent runtime.

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
  logs/
    YYYY-MM-DD.run.md
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
      "confidence": 0.87
    }
  ],
  "selected_project_id": "PROJECT-SETTLEMENT-RECON",
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
```

### 6.5 config/project_aliases.yaml

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

1. Determine date range.
2. Load config and previous state.
3. Spawn source agents for sources that are both enabled and available.
4. Validate normalized events.
5. Dedupe events.
6. Run project association.
7. Generate daily record.
8. Update project records.
9. Update weekly/monthly/quarterly records when needed.
10. Write run log.
11. Produce review summary for the user.

### 7.2 Source Agents

Each source agent must return normalized work events, not prose only.

Supported source agents, used only when the current runtime has a matching skill, plugin, MCP connector, local import, or user-provided evidence:

- GitHub Trace Agent.
- Jira Trace Agent.
- Slack Trace Agent.
- Confluence Trace Agent.
- Google Calendar Agent.
- Google Meet Transcript Agent.
- Gmail Agent.
- Google Docs Agent.
- Manual Notes Agent.

If a source has no available runtime capability, skip it and record the missing source in the daily record's source coverage section.

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

Input:

- target date, default yesterday in user's timezone;
- user config;
- source cursors;
- active project definitions;
- previous daily record;
- current weekly/monthly/quarterly records.

Algorithm:

1. Resolve date window:
   - start = YYYY-MM-DDT00:00:00 in user timezone;
   - end = next day T00:00:00.
2. Load config.
3. Fetch traces from all enabled and available sources.
4. Store raw traces in inbox/imports/YYYY-MM-DD/*.jsonl.
5. Normalize traces into event objects.
6. Validate event schema.
7. Dedupe using dedupe_key and source_object_id.
8. Redact or skip unsafe content.
9. Classify each event into project candidates.
10. Select project if confidence >= auto_assign_project threshold.
11. Leave event unclassified if confidence is low.
12. Write events/YYYY/MM/YYYY-MM-DD.events.jsonl.
13. Generate daily/YYYY/MM/YYYY-MM-DD.md.
14. Generate daily/YYYY/MM/YYYY-MM-DD.summary.json.
15. Update each touched project:
    - append timeline.jsonl;
    - update daily-index.md;
    - update decisions.md;
    - update followups.md;
    - update risks.md.
16. If end of week, update weekly record.
17. If end of month, update monthly record.
18. If end of quarter, update quarterly record.
19. Update state files.
20. Write logs/YYYY-MM-DD.run.md.
21. Return review summary to user.

---

## 9. Weekly Workflow

Weekly records are generated from daily records and project timelines.

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

---

## 10. Monthly Workflow

Monthly records are generated from weekly records and project records.

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

---

## 11. Quarterly Workflow

Quarterly records are generated from monthly records, project records, and declared quarterly goals.

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
      "reason": "The event discusses the same Jira epic and recurring Slack channel as this project."
    }
  ],
  "selected_project_id": "PROJECT-ID",
  "needs_user_review": false
}
```

### 13.3 Confidence rules

- >= 0.78: assign automatically.
- 0.55 to 0.77: suggest but mark needs_review.
- < 0.55: leave unclassified.

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
1. Collect raw traces from enabled source agents.
2. Normalize traces into event JSONL.
3. Dedupe events.
4. Apply privacy filters.
5. Classify events into projects.
6. Generate or update the daily record.
7. Update touched project records.
8. Update weekly/monthly/quarterly rollups if applicable.
9. Run quality checks.
10. Produce a concise review summary.

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

For each event:
1. Identify deterministic project signals.
2. Identify semantic project candidates.
3. Assign selected_project_id only if confidence is high enough.
4. Give a reason for each candidate.
5. Leave ambiguous events unclassified.
6. Suggest draft projects for recurring unclassified clusters.

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
   - writes daily record and updates project files.
2. Weekly rollup:
   - Monday morning for previous ISO week.
3. Monthly rollup:
   - first working day of month for previous month.
4. Quarterly rollup:
   - first working day after quarter end.
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

## Projects touched

- PROJECT-ID: N events, confidence avg 0.00

## Needs review

- N unclassified events
- N low-confidence project assignments
- N privacy redactions

## Files updated

- daily/...
- events/...
- projects/...
```

---

## 21. Implementation Notes

### 21.1 Storage choice

Start with files and JSONL. Add SQLite only when scale requires it.

Recommended:

- JSONL for raw events and timelines.
- Markdown for synthesized records.
- YAML for config.
- Git for auditability.
- Optional vector index for semantic search.

### 21.2 Retrieval for chat

When a user asks a future question:

1. Search project records first.
2. Search rollups second.
3. Search daily records third.
4. Search event JSONL for evidence.
5. Only fetch original source systems when local evidence is insufficient.

### 21.3 Embeddings

Optional index targets:

- daily executive summaries;
- project timeline summaries;
- event factual summaries;
- decisions;
- follow-ups;
- risks.

Do not embed raw sensitive text unless approved.

---

## 22. Safety and Governance Rules

1. The system is for user-owned memory and documentation.
2. User must know what sources are collected.
3. Sensitive channels and private messages are excluded by default.
4. Meeting transcripts require consent/policy approval.
5. All publication requires review.
6. Project association must expose confidence and evidence.
7. Any use for performance management requires separate policy review.
8. The system must respect approved AI/tooling and data-classification rules.

---

## 23. Minimal MVP Scope

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

## 24. MVP Acceptance Criteria

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
10. The user can review what changed.

---

## 25. Example Daily Record Snippet

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

## 26. Codex / Claude Code Build Instructions

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
