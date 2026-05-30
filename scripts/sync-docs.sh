#!/usr/bin/env bash
set -euo pipefail

DCR_REPO="../dcr"
DOCS_DIR="docs"

if [ ! -d "$DCR_REPO/docs" ]; then
  echo "Error: dcr repo not found at $DCR_REPO"
  echo "Make sure dcr-site and dcr are sibling directories."
  exit 1
fi

echo "Syncing docs from $DCR_REPO/docs/ to $DOCS_DIR/..."

rm -rf "$DOCS_DIR"
cp -r "$DCR_REPO/docs" "$DOCS_DIR"

# Fix autolinks (<https://...>) for MDX compatibility
# Docusaurus/MDX treats <...> as JSX tags, breaks on URLs
find "$DOCS_DIR" -name '*.md' -exec sed -i \
  's~<\(https\?://[^>]\+\)>~[\1](\1)~g' {} \;

echo "Generating sidebar from SUMMARY.md..."
bun run scripts/generate-sidebar.js

# Remove SUMMARY.md — not needed as a doc page, only for sidebar generation
rm -f "$DOCS_DIR/SUMMARY.md"

echo "Docs synced successfully!"
echo "Files: $(find "$DOCS_DIR" -name '*.md' | wc -l) markdown files"
