#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

mkdir -p "$ROOT/.agents/skills" "$ROOT/.claude/skills"

for skill in personal-work-memory personal-work-memory-init personal-history-chat; do
  rm -rf "$ROOT/.agents/skills/$skill" "$ROOT/.claude/skills/$skill"
  cp -R "$ROOT/skills/$skill" "$ROOT/.agents/skills/$skill"
  cp -R "$ROOT/skills/$skill" "$ROOT/.claude/skills/$skill"
done

echo "Synced project-local skills for Codex and Claude Code."
