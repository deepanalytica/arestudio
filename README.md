# AR Estudio · Dirección creativa, inteligencia y tecnología

**Portafolio profesional de Alexis Reyes Saavedra.** Investigación, criterio, exploración de soluciones, dirección de arte, comunicación, marketing digital, datos, software y dirección de IA.

**Producción:** https://deepanalytica.github.io/arestudio/  
**Perfil:** https://deepanalytica.github.io/arestudio/perfil/  
**Identidad y sistema:** https://deepanalytica.github.io/arestudio/brand/ · https://deepanalytica.github.io/arestudio/brand/lab/

## Arquitectura editorial V6

1. **Portada**: una frase, un párrafo breve y una CTA; trabajo visible en el primer viewport.
2. **Cuatro casos destacados**: ARCHIVO, Deep Geo, Praxios OS y Visual Art AI contados desde preguntas y decisiones concretas.
3. **Tres rutas breves**: datos, software y comunicación, sin el exceso de tarjetas explicativas.
4. **Exploración y dirección de arte**: ejemplo de ARCHIVO con material original; 21 casos tienen introducciones narrativas y disclosure de detalle.
5. **Seis capacidades**: arte, investigación/criterio, marketing/comunicación, datos, producto y dirección de IA.
6. **Método**: investigar, explorar, decidir, dirigir, construir, verificar.
7. **Dirección de IA**: diagrama conceptual de ejecución y revisión humana, claramente identificado.
8. **Archivo completo de 21 proyectos**: filtros, búsqueda, lista/cuadrícula y fichas profundas con URL compartible.
9. **Perfil y contacto**: trayectoria profesional y acceso directo al correo/WhatsApp, sin repetir textos en cada sección.

## Identidad: NO reinterpretar la paleta

El Design System Lab presenta **siete swatches oficiales**:

| Electric | Violet | Magenta | Orange | Acid (verde lima) | Glacier | Ink |
|---|---|---|---|---|---|---|
| #245BFF | #6236FF | #F12BBE | #FF652F | #EFFF38 | #F5FAFF | #101729 |

Fuentes canónicas: brand/lab/index.html, brand/MANUAL_DE_MARCA.md y brand/tokens.json.
Los otros tokens de color son **funcionales** (hover, éxito, error, superficie), no colores editoriales adicionales. Los colores propios de cada obra se preservan dentro de su caso. No redibujar el símbolo AR/ de brand/assets/mark.svg ni el kit oficial.

## Archivos de código y contenido

- index.html: portada y narrativa V6. Los cuatro casos aparecen antes de las explicaciones de capacidad.
- brand/portfolio-strategy-v5.css: capa histórica, mantenida como base.
- brand/portfolio-story-v6.css: nueva capa editorial de jerarquía, galería asimétrica, estados, móvil y reduced-motion. Consume tokens oficiales.
- styles.css, art-direction.css, brand/site-theme.css, brand/portfolio-v3.css, brand/portfolio-ux-v4.css: capas anteriores; verificar precedencia si se modifican.
- data.js: 21 proyectos, detalles y estados acreditados.
- app.js: tarjetas, filtros, diálogo, 21 relatos de apertura, detalles expandibles, foco/teclado y GSAP ScrollTrigger progresivo.
- perfil/: trayectoria, competencias y evidencias.
- assets/proof/: capturas verificadas generadas desde sitios públicos durante workflows; fallback conceptual si no hay evidencia.
- brand/: identidad y Design System Lab; 26 variantes SVG.
- tests/ y scripts/design-preflight.mjs: catálogo, marca, densidad, relatos, UX y QA Playwright 390/768/1440.
- .github/workflows/visual-qa.yml: QA por PR.
- .github/workflows/motion-lab.yml: typecheck y render Remotion en artifact sin publicarlo automáticamente.
- .github/workflows/pages.yml: publicación en Pages tras cambios a main.

## Documentos para cualquier agente

**Leer antes de modificar el sitio:**

1. AGENTS.md
2. docs/2026-11-08_PLAN_REDISENO_AR_ESTUDIO.md — alcance, restricciones, conocimiento aplicado de marketing, fases y gates.
3. docs/2026-11-08_DECISION_DISENO_AR_ESTUDIO_V5.md — alternativas exploradas y elección editorial.
4. docs/2026-11-08_AUDITORIA_VISUAL_Y_STORYTELLING_V6.md y .agents/skills/portfolio-taste/SKILL.md: auditoría visual, Taste, Impeccable, Kowalski, GSAP, gstack y Remotion.
5. brand/BRANDKIT_WORKFLOW.md, .agents/skills/brandkit/SKILL.md, brand/COMUNICACION.md, brand/MANUAL_DE_MARCA.md.

## Desarrollo y pruebas

La portada se sirve sin build framework: HTML/CSS/JS; GSAP y Three.js son mejoras progresivas.

Para servir en local:

    python3 -m http.server 8000

Pruebas estructurales:

    npm run check

La verificación completa ocurre en GitHub Actions: dependencia Playwright, capturas de evidencia, auditoría de destinos y test de navegador con capturas. Ver .github/workflows/visual-qa.yml.

## Política editorial y de evidencia

Nunca atribuir ventas, clientes, conversiones, testimonios, estados comerciales, capacidades operativas ni credenciales sin soporte. Separar publicación, dossier, demo ficticia, I+D y herramienta privada; no representar estas últimas con capturas inventadas. Las exploraciones nuevas se rotulan como tales, no se convierten en una supuesta historia del proyecto.

**Estado del rediseño V6:** implementación en PR #7. Verificar CI, artefactos de capturas y SHA publicado antes de darlo por listo.

## Motion lab y exportaciones

La web usa GSAP/ScrollTrigger solo como mejora progresiva. Remotion se ejecuta **fuera** de la web: `cd react-lab && npm install && npm run render:showreel` genera una pieza de 4 segundos, 1280 × 720, con la paleta real. El workflow `Motion Lab · Remotion Showreel` permite verificar el resultado y obtener el MP4 desde sus artefactos. No existe autoplay ni descarga automática de vídeo en la portada.

## Presentaciones inmersivas de casos (V9 · 2026-11-09)

Los **cuatro proyectos destacados** y las **21 obras del archivo** abren páginas completas en `casos/?proyecto=<id>`: contexto, decisiones verificadas, escenario visual propio, material publicado o conceptual etiquetado y evidencias. Cada presentación usa los datos canónicos de `data.js`; los modales siguen disponibles para enlaces antiguos `?proyecto=<id>` y accesos rápidos desde otras secciones. La documentación está en [docs/2026-11-09_CASOS_INMERSIVOS_AR_ESTUDIO_V9.md](docs/2026-11-09_CASOS_INMERSIVOS_AR_ESTUDIO_V9.md). Estilos y código en `casos/case.css` y `casos/case.js`. QA en `tests/browser-qa.mjs`. No alterar la paleta ni inventar demos o métricas.
