# AR Estudio — reglas de agentes
Para tareas de branding, imagen, mockups o dirección de arte, consultar .agents/skills/brandkit/SKILL.md y brand/BRANDKIT_WORKFLOW.md.
Trabajar con el logo AR/ existente en brand/assets/mark.svg y con el manifiesto brand/logo-kit/manifest.json. No sustituirlo por aproximaciones generativas.
Conservar catálogo, navegación, pruebas responsive, accesibilidad y movimiento reducido en cualquier modificación de frontend.


## Rediseño pendiente (2026-11-08)
Antes de modificar el portafolio, **leer completo** [docs/2026-11-08_PLAN_REDISENO_AR_ESTUDIO.md](docs/2026-11-08_PLAN_REDISENO_AR_ESTUDIO.md).
Es un **plan, no una autorización para ejecutarlo**. La identidad conserva los **siete colores editoriales oficiales del Design System Lab** (`brand/lab/index.html`): Electric `#245BFF`, Violet `#6236FF`, Magenta `#F12BBE`, Orange `#FF652F`, Acid/verde lima `#EFFF38`, Glacier `#F5FAFF` e Ink `#101729`. `brand/MANUAL_DE_MARCA.md` define su jerarquía. Usar `brand/tokens.json` para primitivos **y** roles funcionales: `#146C52` es éxito semántico y `#173EC9` es variante de interacción, **no colores adicionales de identidad**. Respetar los colores de cada proyecto y no inferir la paleta activa desde CSS heredado. No modificar logo ni atribuir credenciales, clientes o resultados sin evidencia.
El brief exige visibilidad de dirección de arte, criterio creativo, exploración de soluciones, comunicación, marketing digital y dirección de IA, además de datos e ingeniería.

## Implementación V5 (2026-11-08)
Para trabajo posterior a la ejecución del plan, consultar también [docs/2026-11-08_DECISION_DISENO_AR_ESTUDIO_V5.md](docs/2026-11-08_DECISION_DISENO_AR_ESTUDIO_V5.md) y README.md. La implementación V5 está desarrollada en PR #6. Mantener las siete muestras editoriales de marca; no confundir estados semánticos o colores propios de casos con paleta principal. Revisar capturas y ejecutar QA antes de fusionar cambios de interfaz.

## Storytelling y diseño V6 (2026-11-08)
Antes de editar la UI, leer [.agents/skills/portfolio-taste/SKILL.md](.agents/skills/portfolio-taste/SKILL.md) y [docs/2026-11-08_AUDITORIA_VISUAL_Y_STORYTELLING_V6.md](docs/2026-11-08_AUDITORIA_VISUAL_Y_STORYTELLING_V6.md). Priorizar primera pantalla breve, una CTA, cuatro casos visuales, 21 historias con evidencia accesible, navegación y foco. GSAP/ScrollTrigger es opcional; Remotion solo exportación offline del laboratorio. Ejecutar `npm run check` y Playwright y revisar screenshots reales antes de fusionar. Los siete swatches de marca no se alteran.

## V9 · Casos inmersivos (2026-11-09)

Consultar [docs/2026-11-09_CASOS_INMERSIVOS_AR_ESTUDIO_V9.md](docs/2026-11-09_CASOS_INMERSIVOS_AR_ESTUDIO_V9.md) antes de editar las páginas `casos/`. Mantener cuatro mundos visuales diferenciados y rutas propias para 21 proyectos sin duplicar datos; conservar modal legado, escenas conceptuales etiquetadas, capturas públicas auténticas, logo y colores oficiales. No representar Deep Geo como mapa en tiempo real ni Praxios como consola operativa. Validar las cinco páginas de prueba en 1440 y 390 px antes de publicación.

## V10 · Portafolio fullscreen, primera pantalla de proyecto (2026-11-09)

**Leer antes de editar:** [docs/2026-11-09_REDISENO_PORTAFOLIO_FULLSCREEN_OBRA_PRIMERO_V10.md](docs/2026-11-09_REDISENO_PORTAFOLIO_FULLSCREEN_OBRA_PRIMERO_V10.md). La navegación actual está en `index.html` + `home.js` y su única capa `brand/gallery-fullscreen-v10.css`; no reinstalar el hero textual, mosaicos duplicados, carouseles automáticos ni las capas históricas V5–V8. Conservar 4 escenas de imagen `100svh`, 21 proyectos, 7 colores oficiales, logo AR/, índice filtrable y casos inmersivos en `casos/`. El contenido es superior al espectáculo: cada screenshot debe tener procedencia real, y mapas/demos requieren identificación conceptual. Pruebas `npm run check`, `tests/browser-qa.mjs` y capturas 1440/768/390 obligatorias antes de fusionar. 
