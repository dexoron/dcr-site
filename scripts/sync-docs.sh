#!/usr/bin/env bash
set -euo pipefail

DOCS_DIR="docs"

# If DCR_REPO is provided explicitly or ../dcr exists locally — use local copy
if [ -n "${DCR_REPO:-}" ] || [ -d "../dcr/docs" ]; then
  DCR_REPO="${DCR_REPO:-../dcr}"
  echo "Syncing docs from $DCR_REPO/docs/ to $DOCS_DIR/..."
  rm -rf "$DOCS_DIR"
  cp -r "$DCR_REPO/docs" "$DOCS_DIR"

else
  # Clone only docs/ from GitHub (CI / fresh environment)
  echo "No local dcr repo found, cloning docs from GitHub..."
  rm -rf _dcr_tmp "$DOCS_DIR"
  git clone --depth 1 --filter=blob:none --sparse \
    https://github.com/dexoron/dcr.git _dcr_tmp
  git -C _dcr_tmp sparse-checkout set docs
  mv _dcr_tmp/docs "$DOCS_DIR"
  rm -rf _dcr_tmp
fi

# Fix autolinks (<https://...>) for MDX compatibility
find "$DOCS_DIR" -name '*.md' -exec sed -i \
  's~<\(https\?://[^>]\+\)>~[\1](\1)~g' {} \;

echo "Generating sidebar from SUMMARY.md..."
bun run scripts/generate-sidebar.js

# Remove SUMMARY.md — not needed as a doc page, only for sidebar generation
rm -f "$DOCS_DIR/SUMMARY.md"

echo "Docs synced successfully!"
echo "Files: $(find "$DOCS_DIR" -name '*.md' | wc -l) markdown files"
