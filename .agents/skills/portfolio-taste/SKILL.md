---
name: portfolio-taste
description: Revisión y mejora editorial de AR Estudio con dirección de arte, storytelling breve, GSAP, movimiento responsable y QA verificable.
---

# AR Estudio / Skill operativa de dirección creativa y UX premium

**Fecha:** 2026-11-08. Skill propia del proyecto, no copia de las skills de terceros ni prueba de que sus CLI estén instaladas.

## Fuentes y alcance

- Taste Skill (Leonxlnx): https://github.com/Leonxlnx/taste-skill
- Impeccable (Paul Bakaus): https://github.com/pbakaus/impeccable
- Motion craft (Emil Kowalski): https://github.com/emilkowalski/skill
- gstack (Garry Tan): https://github.com/garrytan/gstack
- GSAP/ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Remotion: https://www.remotion.dev/docs/

«Kiyowalski» en el encargo se interpreta como **Emil Kowalski**, referente de motion e ingeniería de diseño. No inventar una herramienta diferente. En producción, GSAP y CSS; Remotion vive en el laboratorio y no se ejecuta en la portada.

## Design brief permanente

- Sitio: portafolio creativo y técnico; públicos: clientes y evaluadores de colaboración.
- Diales: **VARIANCE 8, MOTION 6, DENSITY 2**. Una idea por viewport, obra antes que explicaciones.
- Identidad: AR/ sin redibujar; siete swatches exactos: Electric #245BFF, Violet #6236FF, Magenta #F12BBE, Orange #FF652F, Acid #EFFF38, Glacier #F5FAFF, Ink #101729.
- Tipografía: Archivo Regular/Black, DM Sans lectura, IBM Plex Mono metadatos. No introducir otra marca o paleta.
- Copy: hablar como a una persona inteligente y cercana; palabras concretas, frases cortas, curiosidad sin artificio, mostrar consecuencias y decisiones. No copiar textos de Gary Halbert; investigar, despertar interés y demostrar con honestidad.
- Evidencia: 21 casos, origen de imágenes, demos, límites, enlaces y explicaciones verificables.

## Protocolo (gstack adaptado)

1. **Diagnóstico real:** captura móvil y CSS computado, no inferir diseño de clases o docs antiguas.
2. **Diseño:** una idea central y una historia por proyecto antes de dibujar tarjetas. Comparar dos disposiciones.
3. **Construcción:** rama reversible y CSS sobre tokens; preservar navegación, teclado y enlaces.
4. **Auto-crítica (impeccable):** doble título, exceso de etiquetas, cajas anidadas, botones innecesarios, tracking extremo, letra ilegible, imágenes inventadas.
5. **Polish (Kowalski):** transform/opacity, 180–700 ms y easing deliberado, sin layout shift ni scroll hijacking. Respetar la reducción de movimiento.
6. **QA real:** npm run check y Playwright 390/768/1440; revisar capturas, menú, filtros, modal, foco y enlaces.
7. **Entrega:** PR, revisión visual, squash, GitHub Pages y verificación post-deploy; revertir ante regresión.

## Qué cuenta como UI premium

- Primera pantalla: una idea, un párrafo breve y un siguiente paso.
- Trabajo visible desde el primer viewport móvil.
- Cuatro casos con imagen, nombre, microhistoria y acción sin títulos duplicados.
- Primera lectura de caso humana; detalles técnicos accesibles por disclosure.
- Cada proyecto conserva su lenguaje cromático.
- Material real o etiquetado como conceptual. Nunca fingir una captura.
- Foco y acciones claros; hover 2–4 px; movimiento con propósito.
- La página debe ser comprensible sin GSAP.

## Integración técnica verificada por archivo

| Tecnología | Papel | Archivo |
|---|---|---|
| GSAP + ScrollTrigger | Entrada progresiva de historias | app.js + index.html |
| CSS + tokens | Responsive, hover, foco y reducción de movimiento | brand/portfolio-story-v6.css |
| Remotion | Storyboard offline de cuatro escenas, no animador web | react-lab/src/remotion/StudioIntro.tsx |
| Taste / Impeccable / Kowalski | Criterios de diseño y preflight de densidad | Este archivo + scripts/design-preflight.mjs |
| gstack | Design review / QA / ship basados en evidencias | GitHub PR y Actions; CLI no instalado ni requerido |

## Gates

- npm run check incluye scripts/design-preflight.mjs.
- tests/browser-qa.mjs exige 4 casos, 21 proyectos, 7 swatches, disclosure, móvil, enlaces y foco.
- No confundir demos, I+D, dossiers o producción.
- Solo decir publicado tras verificar el SHA de GitHub Pages.
