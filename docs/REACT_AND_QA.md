# React Bits, GStack, GSAP, Remotion y QA

## Qué está activo en la web publicada

La web raíz utiliza HTML/CSS/JS sin build, con GSAP y un acento Three.js opcionales (degradación elegante a SVG si no cargan). El despliegue de GitHub Pages es inmediato y no depende de bibliotecas para navegar o contactar.

## React y Remotion

`react-lab/` contiene una investigación Vite/React/TypeScript con un módulo de Three.js, una escena Remotion y componentes interactivos. **No sustituye producción.** Antes de usarlo: `cd react-lab && npm install && npm run build`, resolver dependencias, ejecutar QA visual y configurar salida para GitHub Pages. No confundir Remotion con animación web de tiempo real: su propósito aquí es exportar clips para mostrar casos y redes.

## React Bits

La biblioteca oficial usa componentes fuente y se instala uno a uno según la documentación https://www.reactbits.dev/ . Para SpotlightCard: confirmar en el catálogo oficial la variante TS/CSS vigente, instalarla en `react-lab` y compararla con `src/components/SpotlightCard.tsx` (implementación propia, **no oficial**). Preferir una sola microinteracción de gran calidad a añadir efectos por volumen.

## GStack — procedimiento propuesto

1. Definir alcance, evidencia real y criterios de aceptación por pantalla.
2. Verificar navegación de primera pantalla, contenido y responsive 390/768/1440.
3. Revisar enfoque del usuario, accesibilidad, idioma, contraste, `prefers-reduced-motion` y foco.
4. Revisar código JS, fallbacks si no funciona GSAP/Three y enlaces rotos.
5. Compilar/probar fuentes, revisar logs y probar despliegue público.
6. Auditar contenido: sin métricas, casos, clientes, resultados, personas o supuestos inventados.
7. Publicar únicamente tras verificar que la URL real carga en navegadores de usuario.

GStack es una disciplina de trabajo para agentes y revisión; no es una biblioteca CSS. Actualizar esta guía cuando se integre al workflow de Codex/Claude.
