---
name: personal-history-chat
description: Use when chatting with, querying, explaining, or extracting insight from the local personal work trace history and when guiding an AI agent on how to navigate the work trace structure.
---

# Personal History Chat

Use this skill to answer questions from `personal-work-trace/` without mutating history unless the user explicitly asks for an update.

This is the conversational companion to `$personal-work-memory`. It helps the user understand what their recorded work history says, what it does not prove, where confidence is weak, and how an AI agent should interact with the local work trace structure.

## Source Order

Read from the narrowest durable source first:

1. `personal-work-trace/state/skill_snapshot.json`
2. `personal-work-trace/logs/skill-update-log.md`
3. `personal-work-trace/projects/active/*/project.md`
4. `personal-work-trace/projects/active/*/timeline.jsonl`
5. `personal-work-trace/daily/YYYY/MM/YYYY-MM-DD.md`
6. `personal-work-trace/weekly/YYYY/YYYY-Www.md`
7. `personal-work-trace/monthly/YYYY/YYYY-MM.md`
8. `personal-work-trace/quarterly/YYYY/YYYY-Qn.md`
9. `personal-work-trace/events/YYYY/MM/YYYY-MM-DD.events.jsonl`
10. `personal-work-trace/inbox/manual/` and `personal-work-trace/inbox/imports/`

Prefer summaries and indexes for broad questions. Read event JSONL and raw imports only when the user asks for evidence, attribution, or a specific disputed detail.

For narrow project-and-period questions such as "what changed in CBA last week":

1. Resolve the exact date range first.
2. Identify the project id and aliases.
3. Read only scoped project records, rollups, daily records, and event files for that project and period.
4. Use unrelated weekly/monthly summaries only to confirm coverage gaps, not to summarize other projects.
5. Do not inspect or report the whole archive unless the user asks for a broad overview.

## Answering Rules

- Answer from evidence-backed records, not vibes.
- Say when a conclusion is inferred from multiple records.
- Distinguish confirmed events from low-confidence project classification.
- Include event IDs, record paths, or source links when they help the user verify the answer.
- For project update questions, report exact change points, not a full work-history summary.
- If there are no change points for the requested project and period, say that directly and stop after the smallest useful coverage note.
- Do not list unrelated projects, unrelated weekly themes, source inventories, or skill snapshot details unless they directly affect the answer.
- Do not quote private message or transcript content unless the record explicitly marks it safe to quote.
- If the history is missing data, say what is missing and suggest the smallest useful backfill.
- Do not update files during a chat unless the user asks to save, correct, backfill, or append something.
- If `skill_snapshot.json` indicates the trace was produced by an older skill version, mention behavior changes only when they affect the current question.

## Insight Modes

Choose the mode that matches the user's question:

- **Timeline:** What happened, in what order, with evidence.
- **Project insight:** What moved forward, what stalled, and what changed.
- **Project role:** Whether the user appears to be owner, core contributor, reviewer, side helper, observer, or unknown for a project.
- **Department lens:** How work maps to Wise-style fintech departments such as Engineering, Product, Compliance, Legal, Risk, Finance, Treasury, Data, Security, Privacy, People, Marketing, Business Development, Banking Partnerships, Strategy, or Design.
- **Follow-up extraction:** Open follow-ups, blockers, risks, and unresolved questions.
- **Coverage check:** Which sources or days are missing.
- **AI navigation:** Which files an agent should read next and why.
- **Memory hygiene:** Duplicate records, weak project mappings, stale follow-ups, or missing project definitions.
- **Role hygiene:** Projects that appear over-included because the user was only an observer or side helper.

## Empty Or Sparse History

If `personal-work-trace/` is empty, missing, or too sparse to answer:

1. Tell the user the local history is not initialized enough to answer confidently.
2. Recommend `$personal-work-memory-init` to seed identity, projects, team context, quarterly plans, wiki URLs, and source mappings.
3. If the user only needs a one-off answer, ask for temporary evidence and treat it as unsaved unless they ask to store it.

## Output Shape

For narrow project-and-period update questions, use this compact format by default:

```markdown
Short answer: [one sentence naming PROJECT and exact date range.]

Change points:
- [DATE or period]: [exact change/update]. Evidence: [event id or file path]. Confidence: [only if not high].

Coverage: [one short sentence only if data is missing, sparse, or ambiguous.]
```

Rules for this format:

- Keep it under 6 bullets unless the user asks for detail.
- If there are no changes, write `Change points: none found in the local trace for this period`.
- In no-change/no-evidence cases, do not summarize other active projects. Mention only the requested project, requested date range, and the specific missing coverage that affects confidence.
- Evidence should be inline with each change point; avoid a separate evidence dump.
- Do not include suggested next steps unless missing coverage prevents a useful answer.

No-evidence example:

```markdown
Short answer: No evidence-backed CBA updates were found for May 25-31, 2026.

Change points: none found in the local trace for this period.

Coverage: no daily/event records exist for May 25-31, so confidence is limited to local trace coverage.
```

For broader answers, use:

1. Direct answer.
2. Evidence used.
3. Confidence and gaps.
4. Suggested next interaction with the work trace, if useful.

Keep answers compact. The point is to make the history useful, not to mirror the whole archive back to the user.

When a department view is requested, use department labels from `personal-work-trace/config/departments.yaml`, Slack-derived init context, project aliases, and source evidence. Customer Support and Operations are out of scope unless the user explicitly overrides that boundary.
