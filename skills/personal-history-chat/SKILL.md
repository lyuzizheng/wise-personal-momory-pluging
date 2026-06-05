---
name: personal-history-chat
description: Use when chatting with, querying, explaining, or extracting insight from the local personal work trace history and when guiding an AI agent on how to navigate the work trace structure.
---

# Personal History Chat

Use this skill to answer questions from `personal-work-trace/` without mutating history unless the user explicitly asks for an update.

This is the conversational companion to `$personal-work-memory`. It helps the user understand what their recorded work history says, what it does not prove, where confidence is weak, and how an AI agent should interact with the local work trace structure.

## Source Order

Read from the narrowest durable source first:

1. `personal-work-trace/projects/active/*/project.md`
2. `personal-work-trace/projects/active/*/timeline.jsonl`
3. `personal-work-trace/daily/YYYY/MM/YYYY-MM-DD.md`
4. `personal-work-trace/weekly/YYYY/YYYY-Www.md`
5. `personal-work-trace/monthly/YYYY/YYYY-MM.md`
6. `personal-work-trace/quarterly/YYYY/YYYY-Qn.md`
7. `personal-work-trace/events/YYYY/MM/YYYY-MM-DD.events.jsonl`
8. `personal-work-trace/inbox/manual/` and `personal-work-trace/inbox/imports/`

Prefer summaries and indexes for broad questions. Read event JSONL and raw imports only when the user asks for evidence, attribution, or a specific disputed detail.

## Answering Rules

- Answer from evidence-backed records, not vibes.
- Say when a conclusion is inferred from multiple records.
- Distinguish confirmed events from low-confidence project classification.
- Include event IDs, record paths, or source links when they help the user verify the answer.
- Do not quote private message or transcript content unless the record explicitly marks it safe to quote.
- If the history is missing data, say what is missing and suggest the smallest useful backfill.
- Do not update files during a chat unless the user asks to save, correct, backfill, or append something.

## Insight Modes

Choose the mode that matches the user's question:

- **Timeline:** What happened, in what order, with evidence.
- **Project insight:** What moved forward, what stalled, and what changed.
- **Department lens:** How work maps to Wise-style fintech departments such as Engineering, Product, Compliance, Legal, Risk, Finance, Treasury, Data, Security, Privacy, People, Marketing, Business Development, Banking Partnerships, Strategy, or Design.
- **Follow-up extraction:** Open follow-ups, blockers, risks, and unresolved questions.
- **Coverage check:** Which sources or days are missing.
- **AI navigation:** Which files an agent should read next and why.
- **Memory hygiene:** Duplicate records, weak project mappings, stale follow-ups, or missing project definitions.

## Empty Or Sparse History

If `personal-work-trace/` is empty, missing, or too sparse to answer:

1. Tell the user the local history is not initialized enough to answer confidently.
2. Recommend `$personal-work-memory-init` to seed identity, projects, team context, quarterly plans, wiki URLs, and source mappings.
3. If the user only needs a one-off answer, ask for temporary evidence and treat it as unsaved unless they ask to store it.

## Output Shape

For most answers, use:

1. Direct answer.
2. Evidence used.
3. Confidence and gaps.
4. Suggested next interaction with the work trace, if useful.

Keep answers compact. The point is to make the history useful, not to mirror the whole archive back to the user.

When a department view is requested, use department labels from `personal-work-trace/config/departments.yaml`, Slack-derived init context, project aliases, and source evidence. Customer Support and Operations are out of scope unless the user explicitly overrides that boundary.
