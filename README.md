# AR Estudio · Dirección creativa, inteligencia y tecnología

**Portafolio profesional de Alexis Reyes Saavedra.** Investigación, criterio, exploración de soluciones, dirección de arte, comunicación, marketing digital, datos, software y dirección de IA.

**Producción:** https://deepanalytica.github.io/arestudio/  
**Perfil:** https://deepanalytica.github.io/arestudio/perfil/  
**Identidad y sistema:** https://deepanalytica.github.io/arestudio/brand/ · https://deepanalytica.github.io/arestudio/brand/lab/

## Arquitectura editorial V5

1. **Portada**: propuesta de valor y obra visible desde el primer viewport.
2. **Cuatro casos destacados**: ARCHIVO, Deep Geo, Praxios OS y Visual Art AI.
3. **Tres problemas**: inteligencia, sistemas y comunicación; enlaces directos a proyectos pertinentes.
4. **Exploración y dirección de arte**: ejemplo editorial de ARCHIVO con materiales publicados.
5. **Seis capacidades**: arte, investigación/criterio, marketing/comunicación, datos, producto y dirección de IA.
6. **Método**: investigar, explorar, decidir, dirigir, construir, verificar.
7. **Dirección de IA**: diagrama conceptual de ejecución y revisión humana, claramente identificado.
8. **Archivo completo de 21 proyectos**: filtros, búsqueda, lista/cuadrícula y fichas profundas con URL compartible.
9. **Perfil y contacto**: trayectoria profesional, canales directos y alcance con evidencia.

## Identidad: NO reinterpretar la paleta

El Design System Lab presenta **siete swatches oficiales**:

| Electric | Violet | Magenta | Orange | Acid (verde lima) | Glacier | Ink |
|---|---|---|---|---|---|---|
| #245BFF | #6236FF | #F12BBE | #FF652F | #EFFF38 | #F5FAFF | #101729 |

Fuentes canónicas: brand/lab/index.html, brand/MANUAL_DE_MARCA.md y brand/tokens.json.
Los otros tokens de color son **funcionales** (hover, éxito, error, superficie), no colores editoriales adicionales. Los colores propios de cada obra se preservan dentro de su caso. No redibujar el símbolo AR/ de brand/assets/mark.svg ni el kit oficial.

## Archivos de código y contenido

- index.html: portada y nueva narrativa V5.
- brand/portfolio-strategy-v5.css: capa editorial final. Depende de brand/tokens.css sin alterar sus valores.
- styles.css, art-direction.css, brand/site-theme.css, brand/portfolio-v3.css, brand/portfolio-ux-v4.css: capas anteriores; verificar precedencia si se modifican.
- data.js: 21 proyectos, detalles y estados acreditados.
- app.js: tarjetas, filtros, diálogo, enlaces de caso, focus/teclado, movimiento progresivo.
- perfil/: trayectoria, competencias y evidencias.
- assets/proof/: capturas verificadas generadas desde sitios públicos durante workflows; fallback conceptual si no hay evidencia.
- brand/: identidad y Design System Lab; 26 variantes SVG.
- tests/: integridad del catálogo, marca, QA Playwright 390/768/1440.
- .github/workflows/visual-qa.yml: QA por PR.
- .github/workflows/pages.yml: publicación en Pages tras cambios a main.

## Documentos para cualquier agente

**Leer antes de modificar el sitio:**

1. AGENTS.md
2. docs/2026-11-08_PLAN_REDISENO_AR_ESTUDIO.md — alcance, restricciones, conocimiento aplicado de marketing, fases y gates.
3. docs/2026-11-08_DECISION_DISENO_AR_ESTUDIO_V5.md — alternativas exploradas y elección editorial.
4. brand/BRANDKIT_WORKFLOW.md, .agents/skills/brandkit/SKILL.md, brand/COMUNICACION.md, brand/MANUAL_DE_MARCA.md.

## Desarrollo y pruebas

La portada se sirve sin build framework: HTML/CSS/JS; GSAP y Three.js son mejoras progresivas.

Para servir en local:

    python3 -m http.server 8000

Pruebas estructurales:

    npm run check

La verificación completa ocurre en GitHub Actions: dependencia Playwright, capturas de evidencia, auditoría de destinos y test de navegador con capturas. Ver .github/workflows/visual-qa.yml.

## Política editorial y de evidencia

Nunca atribuir ventas, clientes, conversiones, testimonios, estados comerciales, capacidades operativas ni credenciales sin soporte. Separar publicación, dossier, demo ficticia, I+D y herramienta privada; no representar estas últimas con capturas inventadas. Las exploraciones nuevas se rotulan como tales, no se convierten en una supuesta historia del proyecto.

**Estado del rediseño V5:** implementación iniciada en PR #6; el estado de publicación debe verificarse en GitHub Actions y en la URL pública.
