#!/usr/bin/env bash
# Helper script to regenerate the presentation slides
# This can be run manually: ./regenerate-slides.sh

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PRESENTATION_FILE="$ROOT/wise-personal-work-memory.html"

echo "Regenerating presentation slides..."
echo ""
echo "Please run the following in Claude Code:"
echo ""
echo "  /frontend-slides"
echo ""
echo "When prompted, convert the README.md to create: wise-personal-work-memory.html"
echo ""

# Check if Claude CLI is available and can be used non-interactively
if command -v claude &> /dev/null; then
  echo "Attempting to launch Claude Code..."
  echo ""
  # This launches Claude Code in interactive mode where you can run /frontend-slides
  cd "$ROOT"
  exec claude
else
  echo "Claude Code CLI not found. Please open Claude Code manually and run:"
  echo "  /frontend-slides"
  echo ""
  exit 1
fi
