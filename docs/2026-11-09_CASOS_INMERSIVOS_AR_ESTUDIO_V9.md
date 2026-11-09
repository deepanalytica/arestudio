# AR Estudio V9 — Casos inmersivos con dirección de arte propia

**Fecha:** 9 de noviembre de 2026  
**Repos:** `deepanalytica/arestudio`  
**Alcance:** presentaciones de proyectos independientes, accesibles, responsivas y basadas en evidencia.  
**Ruta:** `/casos/?proyecto=<id>`  
**Punto de entrada:** cuatro proyectos destacados y las 21 tarjetas del archivo.

## Problema anterior

El portafolio había mejorado su primera pantalla, pero al abrir un proyecto todavía aparecía una ficha modal. Una ventana con imagen, introducción y un disclosure técnico no presentaba el producto como un mundo visual propio.

## Decisión editorial

Cada caso es una pequeña experiencia publicada, no un modal de metadatos. La página cuenta cuatro capítulos: **contexto → decisiones → experiencia visual → evidencia y límites**. La primera imagen, el ritmo de la tipografía y los componentes de interfaz son distintos por proyecto. La lectura y la navegación se sostienen sin animación.

### Cuatro direcciones de arte específicas

| Proyecto | Concepto visual | Material | Advertencia de procedencia |
|---|---|---|---|
| **ARCHIVO** | Universo editorial con fotos de colecciones y ventana de catálogo sobrepuesta | Fotos públicas Ownform, Imago, captura de tienda que genera el CI | La tienda existe; no atribuir métricas de ventas |
| **Deep Geo** | Composición territorial con diagrama de capas, observación y contraste | SVG conceptual del proyecto | No representa un mapa operativo ni datos en vivo |
| **Praxios OS** | Un flujo de intención, ejecución, evidencia y revisión, junto a captura de dossier público | Diagrama original + captura del dossier | No presentar el dossier como una consola comercial desplegada |
| **Visual Art AI** | Captura de web en composición tipo dispositivo con acentos suaves | Screenshot publicado del sitio y portada de fallback | No inferir rendimiento publicitario o clientes |

Los otros **17 casos** consumen el mismo catálogo verificado y presentan una escena adaptada por área (diseño, datos, tecnología, investigación, comunicación), sus ilustraciones originales y, si existen, capturas públicas generadas por CI. Cada ficha conserva estado, decisiones, entregables, evidencia y links auditables.

## Arquitectura

- `casos/index.html`: ruta estática de GitHub Pages, con cabecera, anclas de secciones y vuelta al índice.
- `casos/case.js`: importa `projects`, `featured` y `caseStudies` de `data.js`. No duplica hechos, resultados ni enlaces. Renderiza escenas y cuatro capítulos.
- `casos/case.css`: dirección de arte responsiva para las cuatro obras; movimientos contenidos, soporte `prefers-reduced-motion`.
- `app.js`: las tarjetas `data-case-page` navegan a la página completa; el modal histórico continúa funcionando para enlaces legados y accesos rápidos. El modal ahora ofrece «Ver presentación completa».
- `index.html`: los cuatro destacados usan rutas `/casos/`; la navegación funciona incluso si falla JS.
- `perfil/index.html`: cuatro proyectos enlazan a sus casos completos.
- `tests/browser-qa.mjs`: pruebas Playwright 1440/390 de las cuatro escenas y un caso genérico, narrativa, evidencia, límite y vuelta al sitio.
- `scripts/design-preflight.mjs`: inspecciona rutas, colores y conservación de materiales.

## Principios tomados de las referencias

El trabajo Pilo presenta una experiencia completa — problema, flujos, UI, componentes e integración — evitando que el mockup sea un simple adorno. En AR Estudio tomamos el **principio de narrar sistemas con escenas y decisiones**, sin copiar sus composiciones, logos, personajes, textos o material. La referencia Chasus solo aporta el contexto de marketplace solicitado; no se le atribuye una solución visual específica sin haberla podido comprobar.

## Accesibilidad y riesgo

- El contenido existe en el DOM sin necesidad de GSAP; motion opcional y respetuoso con reduced-motion.
- Imágenes con `alt` y etiquetas de procedencia; si la captura pública falla, se oculta sin simular una captura alternativa.
- Enlaces externos reales se derivan exclusivamente de `caseStudies.links`, con `rel=noopener noreferrer`.
- La herramienta de mapas, los agentes y la demo de comercio se describen de acuerdo con su estado documentado.
- No se altera la identidad principal. Los siete colores oficiales siguen siendo: Electric `#245BFF`, Violet `#6236FF`, Magenta `#F12BBE`, Orange `#FF652F`, Acid `#EFFF38`, Glacier `#F5FAFF` e Ink `#101729`.
- Los tonos específicos de cada pieza se limitan a su entorno visual.

## Gate de publicación

1. `npm run check` y auditoría de URLs.
2. Captura de nueve sitios públicos cuando están disponibles.
3. Playwright en la portada y perfil; casos `archivo`, `deep-geo`, `praxios-os`, `visual-art-ai` y `conv-os` en escritorio y móvil.
4. Comprobar `#historia`, `#decisiones`, `#experiencia`, `#evidencia`, navegación, título, escenas distintas y ausencia de scroll horizontal.
5. Revisar screenshots de las escenas, en especial datos visuales falsos, contenido cortado o tipografía pequeña.
6. Solo tras QA y revisión, fusionar el PR y verificar GitHub Pages con SHA. Revertir si hay regresión.

**No atribuir mejoras en ventas, conversión, clientes o resultados sin medirlas con tráfico real.**
