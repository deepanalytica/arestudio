# Instala la skill oficial Dashboard 3D en el agente elegido.
# Se ejecuta voluntariamente en el equipo local; no modifica producción.
param([ValidateSet('codex','claude-code','opencode')][string]$Agent='codex')
$ErrorActionPreference = 'Stop'
$version = (node --version)
if (-not $version) { throw 'Node.js no disponible. Instala Node.js >= 22.20.' }
$parts = $version.TrimStart('v').Split('.')
if ([int]$parts[0] -lt 22 -or ([int]$parts[0] -eq 22 -and [int]$parts[1] -eq 20 -and [int]$parts[2] -lt 0)) {
  Write-Warning "Verifica requisito del autor: Node.js >=22.20 (actual: $version)."
}
Write-Host "Instalando annderson8/dashboard-3d para $Agent en este proyecto..."
& npx skills add annderson8/dashboard-3d -a $Agent
if ($LASTEXITCODE -ne 0) { throw 'La instalacion de la skill no se completo.' }
Write-Host 'Instalacion realizada. Reinicia la sesion del agente para detectarla.'
