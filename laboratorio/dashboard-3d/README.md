# AR Estudio / Laboratorio 3D — Experimento 001

**Tipo:** demostración técnica conceptual, no proyecto de cliente.
**Ruta:** `/laboratorio/dashboard-3d/`
**Autoría:** prototipo específico de AR Estudio; enfoque inspirado por la skill [Dashboard 3D de Annder Rey](https://github.com/annderson8/dashboard-3d) (MIT). No se copió la plantilla React Three Fiber del autor.

## Qué demuestra

Una maqueta 3D interactiva de cinco etapas de una operación comercial: Captación → Diagnóstico → Producción → Activación → Medición. Cada estación permite ver su indicador principal, estado y una decisión operativa. Dos escenarios explican qué cambia cuando aparecen restricciones de capacidad.

**Todas las cifras del prototipo son ficticias.** No hay conexión con Shopify, Meta Ads, CRM, ERP, clientes ni API alguna; no contiene datos reales de Fortia o AR Estudio. La escala de las barras es ilustrativa y sus límites están definidos en `app.js`. Los estados de ejemplo se declaran explícitamente en los CSV, no se derivan de métricas reales.

## Cómo abrir

```bash
python3 -m http.server 8000
# abrir http://localhost:8000/laboratorio/dashboard-3d/
```

También se sirve como página estática de GitHub Pages al fusionar la rama que contiene esta demo. Requiere navegador con WebGL y acceso al módulo público de Three.js para la escena 3D; sin ello, el inspector y los botones siguen siendo utilizables.

## Qué puedes hacer

- Cambiar entre el escenario estable y el de presión.
- Arrastrar para girar la escena, usar la rueda para acercar y seleccionar estaciones.
- Cambiar estaciones con teclado mediante sus botones, aunque WebGL esté deshabilitado.
- Descargar `datos/base.csv` y editarlo.
- Importar tu propio archivo CSV. **Se procesa exclusivamente en el navegador y no se transmite al servidor.** Se descarta al recargar la página.

Formato necesario, separado por `;` o `,`:

```csv
id;nombre;valor;unidad;estado;descripcion;accion
captacion;Captación;340;contactos;normal;Ejemplo de contactos recibidos.;Revisar coste de adquisición.
```

Son necesarias cinco filas con IDs exactos: `captacion`, `diagnostico`, `produccion`, `activacion`, `medicion`. Estados: `normal`, `atencion`, `parada`. El parser valida el formato y rechaza valores inválidos. Máximo 500 KB. No cargar nombres de personas, correos, teléfonos u otros datos personales en un demo público.

## Skill original

La skill oficial del autor es un paquete independiente (plantillas React Three Fiber, scripts, referencias, ejemplos). Este repositorio añade una **skill adaptadora local** en `.agents/skills/dashboard-3d/SKILL.md` y un instalador PowerShell para poder obtener el paquete completo en un equipo con Node.js 22.20+ y conexión a Internet.

```powershell
./scripts/install-dashboard-3d-skill.ps1 -Agent codex
# También admite -Agent claude-code
```

Alternativamente:

```bash
npx skills add annderson8/dashboard-3d -a codex
```

**Estado de instalación:** las instrucciones y adaptación local forman parte de esta rama; el instalador oficial no se ejecutó en el computador de desarrollo desde esta sesión. No describirlo como instalación global confirmada.

## Verificación

```bash
npm run dashboard3d:check
npm run check
```

Revisión manual pendiente antes de fusionar: 390, 768 y 1440 px, clic en cinco estaciones, selección con teclado, carga de CSV, escenarios, suspensión de la estación de Producción cuando figura `parada`, contraste, WebGL desactivado, `prefers-reduced-motion` y carga del CDN externo.

## Notas técnicas

- HTML/CSS/JavaScript nativo + Three.js vía import map. No se incorporan React ni dependencias de compilación a la portada.
- En producción, `noindex` evita presentar un experimento como caso real indexado.
- Una integración empresarial real necesita backend autenticado, permisos por rol, observabilidad y fuentes verificadas; este prototipo no implementa esos controles.
- Los cambios viven en rama y PR; un merge a `main` activaría GitHub Pages. No publicar sin verificar los controles anteriores.
