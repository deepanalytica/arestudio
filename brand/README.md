# AR Estudio — Electric Editorial / Brand Operating System 2.2

Dos experiencias complementarias:

- **Brand Experience**: `/brand/` — manifiesto visual, identidad, paleta, motion y aplicaciones editoriales.
- **Design System Lab**: `/brand/lab/` — tokens, casting tipográfico Syne + Instrument Serif, escalas, contraste WCAG, componentes, estados y descargas.

## Arquitectura

Una sola marca madre: **AR Estudio**, firma corta **AR/**. Dirección de Arte, Experiencias Digitales, Sistemas y Datos, y Comunicación son áreas de práctica, no submarcas. Cada proyecto mantiene su identidad, evidencia y estado real.

## Reutilización

La fuente canónica es `brand/tokens.json`. Ejecutar `npm run brand:tokens` para regenerar `brand/tokens.css`. Validar con `npm run check` y, si Playwright está disponible, `node tests/browser-qa.mjs`.

- SVG maestros: `assets/mark.svg`, `assets/mark-mono.svg`, `assets/favicon.svg`.
- Ejemplos: `assets/cover.svg` (16:9), `assets/social.svg` (1:1), `assets/poster.svg` (vertical).
- `MANUAL_DE_MARCA.md` y `COMUNICACION.md` contienen reglas de identidad y tono.
- GSAP es una mejora progresiva. Three.js solo decora el gesto slash en el hero desktop; el sitio conserva su identidad sin WebGL.
- Respeta `prefers-reduced-motion`, dispositivos pequeños y ahorro de datos.
- Las aplicaciones son conceptuales; no son casos reales ni métricas de clientes.

## Pendientes que requieren trabajo humano

Evaluar originalidad del logotipo frente a marcas existentes y realizar pruebas de legibilidad del isotipo en tamaños reales antes de registro. Reemplazar SVG de ejemplo por capturas o aplicaciones validadas cuando existan.

La UI es estática: GitHub Pages y CDN de las fuentes; no depende de React para funcionar.
