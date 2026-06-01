#!/usr/bin/env bash
set -euo pipefail

DOCS_DIR="docs"
SRC_DOCS="$(cd "$(dirname "$0")/../../docs" && pwd)"

echo "Syncing docs from $SRC_DOCS/ to $DOCS_DIR/..."
rm -rf "$DOCS_DIR"
cp -r "$SRC_DOCS" "$DOCS_DIR"

# Fix autolinks (<https://...>) for MDX compatibility
find "$DOCS_DIR" -name '*.mdx' -exec sed -i \
  's~<\(https\?://[^>]\+\)>~[\1](\1)~g' {} \;

echo "Docs synced successfully!"
echo "Files: $(find "$DOCS_DIR" -name '*.mdx' | wc -l) MDX files"
