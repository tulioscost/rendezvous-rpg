#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
VERSION=$(node -p "JSON.parse(require('fs').readFileSync('system.json','utf8')).version")
NOTES="RELEASE_v${VERSION}.md"
if [[ ! -f "$NOTES" ]]; then echo "Notas ausentes: $NOTES" >&2; exit 1; fi
mkdir -p release
rm -f release/rendezvous-rpg-foundry.zip
zip -q -r release/rendezvous-rpg-foundry.zip system.json template.json module templates styles lang data assets
cp system.json release/system.json
cp "$NOTES" "release/$NOTES"
echo "Assets prontos: release/rendezvous-rpg-foundry.zip | release/system.json | release/$NOTES"
