#!/usr/bin/env bash
set -euo pipefail

if [ -z "${CROWDIN_TOKEN:-}" ]; then
  echo "CROWDIN_TOKEN not set, skipping Crowdin pull"
  exit 0
fi

npx --yes @crowdin/cli@5 pull \
  --token "$CROWDIN_TOKEN" \
  --project-id "${CROWDIN_PROJECT_ID:?CROWDIN_PROJECT_ID is required when CROWDIN_TOKEN is set}" \
  --base-url "${CROWDIN_BASE_URL:-https://api.crowdin.com}" \
  --branch "${CROWDIN_BRANCH:-main}"
