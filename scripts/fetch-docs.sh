#!/usr/bin/env bash
set -euo pipefail
rm -rf docs
git clone --depth 1 https://github.com/dexoron/dcr.git /tmp/dcr-source
cp -r /tmp/dcr-source/docs docs
rm -rf /tmp/dcr-source
