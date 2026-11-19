---
name: arestudio-dimensional-spec
description: Produce y verifica planos dimensionales de componentes reales del portafolio comercial de AR Estudio, sin inventar medidas.
---

# AR Estudio · Dimensional Spec

## Objetivo
Incorporar al proceso de diseño comercial el enfoque de dimensional-drawing (Enes Ozturk) como documentación de geometría verificable, sin desplazar la historia comercial hacia la tecnología.

**Fuente upstream (MIT):** https://github.com/enesozturk/dimensional-drawing
**Revisión observada:** 5c457437c8c83524308aad3b7443e81adcc13153

Esta es una skill de integración propia de AR Estudio. No es una copia de los archivos, ejemplos o renderer upstream. Para instalar las skills originales en Codex, Claude Code o Cursor, usar la CLI documentada por el autor:

    npx skills add enesozturk/dimensional-drawing

La versión original trae también dimensional-drawing-motion. No afirmar que el render Motion de esa dependencia se ha ejecutado si no se ha probado.

## Implementación en el repositorio
- Fuente real: comercial-v4/index.html, componente #tab-local.
- Plano opt-in: comercial-v4/plano/index.html, plano.css y plano.js.
- El iframe fuera del viewport reproduce el documento a 390, 768 y 1440 px; se lee getBoundingClientRect y getComputedStyle del elemento REAL.
- La hoja SVG es monocromática. Arquitectura y slots, nunca copy o identidad dentro del dibujo. Cotas W1/H1/S1/S2/S3/G1/R1/B1.
- Se exponen medidas en px CSS. Si falta un valor, decir TBD.
- CTA de retorno a la versión comercial; no añadir peso del laboratorio a la portada principal.

## Cuando se agregue una nueva pieza
1. Leer AGENTS.md, brand/MANUAL_DE_MARCA.md, el plan de rediseño y docs de la V4.
2. Localizar el componente, registrar los selectores y estados. Revisar todas sus instancias.
3. Medir en navegador con Playwright; nunca deducir dimensiones solamente desde una imagen o sumar valores sin verificar.
4. Producir una hoja técnica con plan, slots, variables, vista de capas y notas. Distinguir esquemas de cotas medidas.
5. Verificar 320 / 390 / 820 / 1024 / 1440 px, teclado, lectura, foco y reduced motion.
6. Ejecutar npm run check y npm run qa:comercial-v4 tras instalar Playwright.
7. Revisar capturas antes de fusionar la versión comercial V4. No publicar automáticamente en main.

## Límite de interpretación
Que un componente tenga geometría auditada no demuestra aumento de conversiones, accesibilidad completa ni una prueba con usuarios. Son evaluaciones independientes.
