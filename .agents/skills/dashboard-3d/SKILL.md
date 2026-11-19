---
name: dashboard-3d
description: Adaptar, verificar y ampliar la demostración 3D de AR Estudio con Three.js, métricas CSV y estados de operación. Se usa ante solicitudes de dashboards 3D, visualización de negocios, mundos interactivos o análisis de flujos.
---

# Dashboard 3D · Adaptación para AR Estudio

**Implementación activa en este proyecto:** `laboratorio/dashboard-3d/`.

**Origen del enfoque:** [Dashboard 3D de Annder Rey](https://github.com/annderson8/dashboard-3d), licencia MIT. Esta skill es una **adaptación local de AR Estudio**, no una copia completa de la distribución original ni una garantía de instalación global de Claude Code o Codex.

Para utilizar la distribución oficial con sus plantillas, ejecutar **en el equipo de desarrollo**:

```bash
npx skills add annderson8/dashboard-3d -a codex
# Para Claude Code, en vez de codex:
npx skills add annderson8/dashboard-3d -a claude-code
```

Requiere Node.js 22.20 o posterior según documentación del proveedor. Ver `scripts/install-dashboard-3d-skill.ps1`.

## Trabajar con la demostración existente

1. Leer `AGENTS.md`, `brand/tokens.json`, `laboratorio/dashboard-3d/README.md` y el contrato editorial del portafolio.
2. Los cinco módulos son captación, diagnóstico, producción, activación y medición. Sus IDs se mantienen sincronizados entre `app.js` y los CSV de `datos/`.
3. Importar **solo agregados sin información personal**. La demo carga CSV en el navegador: no existe API ni base de datos.
4. Mantener el aviso **simulación, cifras ficticias** mientras no exista una conexión verificada. No atribuir ingresos, clientes ni conversiones reales.
5. Conservar identidad oficial: Electric #245BFF, Violet #6236FF, Magenta #F12BBE, Orange #FF652F, Acid #EFFF38, Glacier #F5FAFF, Ink #101729. Logo maestro: `brand/assets/mark.svg`.
6. No añadir React al portafolio sin necesidad. La implementación actual usa Three.js, HTML, CSS y JavaScript nativo.
7. Todas las estaciones deben ser accesibles por botones, aun sin WebGL; respetar `prefers-reduced-motion`.
8. Antes de modificar la UI, verificar los CSV, el JavaScript, los estados `normal`, `atencion`, `parada`, el escenario bajo presión y la ruta de retorno al portafolio.
9. No conectar sistemas reales, publicar datos comerciales ni modificar producción sin autorización y controles de acceso.

## Valor para el cliente

Cada indicador necesita una decisión que pueda tomarse a partir de él. No generar métricas de adorno ni fabricar resultados. Un producto real requiere fuente autenticada, validación de datos, gobierno de permisos, reglas operativas y monitoreo.

## Verificación

```bash
npm run dashboard3d:check
python3 -m http.server 8000
# visita /laboratorio/dashboard-3d/
```
