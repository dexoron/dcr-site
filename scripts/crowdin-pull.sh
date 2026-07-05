#!/usr/bin/env bash
set -euo pipefail
if [ -z "${CROWDIN_TOKEN:-}" ]; then
  echo "CROWDIN_TOKEN not set, skipping translation pull"
  exit 0
fi
bunx @crowdin/cli pull \
  --token "$CROWDIN_TOKEN" \
  --project-id "$CROWDIN_PROJECT_ID" \
  --base-url "https://dcr.api.crowdin.com"
