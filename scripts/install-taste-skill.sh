#!/usr/bin/env bash
# Instala Taste Skill para Codex en ESTE proyecto, sin tocar la instalación global.
# El commit del proveedor está fijado para que la instalación sea reproducible.
set -euo pipefail
if ! command -v node >/dev/null; then echo "Node 22+ es obligatorio" >&2; exit 2; fi
node -e 'const n=+process.versions.node.split(".")[0]; if(n<22){console.error("Node 22+ es obligatorio");process.exit(2)}'
echo "Instalando design-taste-frontend (Taste Skill f6b76575f949707b4e3c37cd86cb44b0b98643e8) para Codex..."
npx --yes skills add "Leonxlnx/taste-skill@f6b76575f949707b4e3c37cd86cb44b0b98643e8" --skill design-taste-frontend -a codex --copy --yes
echo "Instalación finalizada. Buscando SKILL.md:"
find .agents .codex .claude -path '*/design-taste-frontend/SKILL.md' -print 2>/dev/null || true
echo "Uso local: node <carpeta-de-taste>/scripts/copy-lint.mjs comercial/index.html --kind service"
