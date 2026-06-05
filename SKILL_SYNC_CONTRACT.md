# Skill Sync Contract

## Canonical Source

Canonical skill files live in:

```text
skills/
```

Edit these files first.

## Generated Mirrors

Project-local discovery mirrors live in:

```text
.agents/skills/
.claude/skills/
```

These mirrors exist so Codex and Claude Code can discover the skills when a chat starts inside this folder.

Do not edit mirror files directly. They are generated from `skills/`.

## Pre-Commit Hook

The tracked hook at `.githooks/pre-commit` refreshes mirrors from `skills/` and stages only the generated mirror directories:

```text
.agents/skills/
.claude/skills/
```

It does not stage canonical skill edits, README edits, or unrelated files. Those remain under normal user control.

To enable the tracked hook path in this repo:

```bash
git config core.hooksPath .githooks
```
