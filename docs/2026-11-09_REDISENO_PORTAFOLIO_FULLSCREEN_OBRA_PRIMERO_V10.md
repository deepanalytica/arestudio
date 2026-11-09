# AR Estudio V10 — La obra es la experiencia

**Fecha:** 9 de noviembre de 2026  
**Repositorio:** `deepanalytica/arestudio`  
**Área:** Dirección de arte, UX, arquitectura de información, copy, rendimiento y accesibilidad  
**Objetivo:** convertir el portafolio en una experiencia editorial autónoma, silenciosa y visual, donde la obra ocupa la pantalla completa desde el primer segundo.

## Diagnóstico

La iteración V9 mejoró los casos y agregó escenas conceptuales, pero la portada todavía se comportaba como un catálogo de tarjetas: un hero de presentación personal, varias etiquetas, fichas, múltiples CTAs, explicación de metodología, listado de capacidades y distintas secciones de venta. Al abrir un caso había otra introducción blanca antes de ver la imagen principal. La suma generaba repetición, densidad y una jerarquía débil.

La nueva prioridad no es añadir efectos; es **eliminar todo aquello que compite con el trabajo**.

## Investigación utilizada

1. **Nielsen Norman Group — 5 Steps to Creating a UX-Design Portfolio.** La selección principal debe ser limitada y profunda (3 a 5 casos), mostrar el problema, el rol, las decisiones, restricciones y resultados que pueden respaldarse, y mantener el contenido escaneable. https://www.nngroup.com/articles/ux-design-portfolios/
2. **Nielsen Norman Group — UX Portfolios.** La secuencia debe contar la historia del trabajo con materiales y entregables observables, adaptada a quienes evalúan colaboración profesional. https://www.nngroup.com/videos/ux-portfolios/
3. **W3C WAI — Carousels Tutorial.** Una galería automática puede ocultar contenido o desorientar. Las personas deben poder controlar la navegación y el movimiento. Aquí se evita por completo el carrusel automático: las escenas son secciones visibles en el DOM, desplazables de forma nativa. https://www.w3.org/WAI/tutorials/carousels/
4. **web.dev — Optimize Largest Contentful Paint.** La imagen principal debe descubrirse en el HTML inicial y tener prioridad alta. La fotografía de ARCHIVO se declara directamente en el HTML, con preload y `fetchpriority=high`; las demás imágenes usan carga diferida. https://web.dev/articles/optimize-lcp

Se toman de Pilo y las referencias visuales aportadas los principios de composición y presentación del producto, **no** marcas, ilustraciones ni pantallas de terceros. El lenguaje de marca permanece AR Estudio.

## Brief y usuario objetivo

La web tiene dos interlocutores: una persona que busca contratar dirección creativa/producto/marketing/IA, y un equipo técnico que evalúa criterio, rigor y capacidad de ejecución. Ambos necesitan una respuesta rápida: **qué puedes mostrar, qué aportaste y cómo contactarte**.

No se debe obligar al primer visitante a leer una biografía ni explicar cada herramienta antes de ver la obra.

## Arquitectura de información V10

### Portada

- **Primer viewport:** fotografía editorial auténtica de ARCHIVO, a pantalla completa. Título `ARCHIVO`; subtítulo «Doce marcas. Un mismo espacio editorial.»; enlace **Explorar proyecto**.
- **Segundo viewport:** Deep Geo. Arte territorial conceptual explícitamente identificado; enlace **Explorar investigación**.
- **Tercer viewport:** Praxios OS. Imagen del dossier público, jamás presentada como consola operativa; enlace **Explorar sistema**.
- **Cuarto viewport:** Visual Art AI. Captura del sitio publicado; enlace **Explorar proyecto**.
- Todas las escenas ocupan `100svh`. Cada una tiene solo nombre, especialidad, una frase y una CTA. Un enlace discreto **Siguiente** baja a la escena siguiente.
- No hay carrusel ni reproducción automática, secuestro del scroll, audio, efectos WebGL decorativos, navegación horizontal forzada ni títulos introductorios antes de la obra.

### Archivo

Los 21 casos existen en un índice editorial minimalista, con miniaturas, nombre y especialidad, y filtros por área y búsqueda. El archivo se presenta **después** de las cuatro obras de pantalla completa, nunca antes.

### Enfoque

Una única frase profesional explica la combinación de investigación, criterio, dirección de arte, comunicación, marketing, datos, software y dirección de IA. El perfil extenso sigue en `/perfil/`.

### Contacto

Dos opciones justificadas: **Escribir por correo** y **WhatsApp**. No hay formularios simulados, promesas de respuesta ni urgencias ficticias.

### Casos profundos

La pantalla inicial de cada caso también se convierte en una experiencia fullscreen con el nombre, imagen y contexto breve. Solo después aparecen la historia, alternativas, decisiones, material acreditado, entregables y evidencia. Las 21 URL antiguas y los estados de investigación/dossier/demo conservan significado.

## Sistema visual

**Siete colores oficiales sin cambios:** Electric `#245BFF`, Violet `#6236FF`, Magenta `#F12BBE`, Orange `#FF652F`, Acid `#EFFF38`, Glacier `#F5FAFF`, Ink `#101729`. No adoptar verde oscuro como nueva identidad: el verde del proyecto Deep Geo es tonalidad propia de su material visual, no un token de AR Estudio. Logo AR/ oficial, tipografía Archivo, DM Sans e IBM Plex Mono.

- Composición full-bleed, texto inferior alineado a margen editorial.
- Gradientes funcionales para legibilidad, no cajas decorativas.
- Una acción principal por escena; sin botones duplicados en el hero.
- Márgenes y escalas distintos para desktop y mobile sin ocultar el contenido.
- Capturas del producto solo cuando la fuente es verificable. Fallback conceptual identificado si falla la red.
- Microinteracciones CSS ligeras, con soporte `prefers-reduced-motion`.

## Copy y evidencia

**Regla:** usar nombres concretos y relaciones verificables. Prohibir frases de autopromoción hueca, superlativos, conversiones no medidas y atribuciones indebidas.

| Proyecto | Copy del primer vistazo | Evidencia |
|---|---|---|
| ARCHIVO | «Doce marcas. Un mismo espacio editorial.» | Fotografía editorial y tienda publicada |
| Deep Geo | «Capas de información. Nuevas lecturas del territorio.» | Representación conceptual, no mapa en vivo |
| Praxios OS | «Supervisión, trazabilidad y evidencia para sistemas de IA.» | Captura de dossier público |
| Visual Art AI | «Una oferta clara, una experiencia digital coherente.» | Captura de sitio publicado |

El visitante que quiera saber **qué se decidió, cómo y qué se puede comprobar** tiene una página específica, no un gran bloque de texto en el primer viewport.

## Archivos y reversibilidad

- `index.html`: portada íntegramente reelaborada con cuatro obras en HTML, sin depender de JS para navegar.
- `home.js`: índice de 21 proyectos, búsqueda/filtros, enlaces legados y fallbacks de imágenes. No hay framework.
- `brand/gallery-fullscreen-v10.css`: composición premium desktop/mobile consumiendo los tokens oficiales.
- `casos/case.js`: escena antes del copy con intro superpuesta, portada fotográfica de ARCHIVO y textos concretos.
- `casos/fullscreen-openings-v10.css`: aspecto fullscreen de 21 casos.
- `tests/browser-qa.mjs`: capturas 1440/768/390 de la portada y 1440/390 de cinco casos, navegación, filtros, evidencias y marca.
- `scripts/design-preflight.mjs`: contrato de jerarquía, imagen protagonista, 21 casos y paleta oficial.

Los archivos históricos `app.js`, `brand/work-first-v8.css` y anteriores permanecen en Git para una reversión sin riesgo, pero **no se cargan en la nueva portada**. El historial de Git permite revertir el PR entero.

## Gates

1. `npm run check`: catálogo, branding, scripts, copies y densidad.
2. Playwright escritorio 1440 × 900, tablet 768 × 950, móvil 390 × 844.
3. Verificar primera escena realmente a `y≈0`, altura ≥ 96% de viewport, CTA visible, sin overflow lateral.
4. Verificar páginas dedicadas `archivo`, `deep-geo`, `praxios-os`, `visual-art-ai` y `conv-os`, con escena completa, decisiones, pruebas y enlaces.
5. Revisar screenshots reales y reparar sobreposiciones, imágenes fallidas o problemas de legibilidad.
6. Confirmar destinos públicos auditados y capturas generadas; publicar únicamente tras QA satisfactorio.
7. Confirmar nuevo SHA y la publicación efectiva de GitHub Pages.

**No interpretar este rediseño como prueba de conversiones comerciales. Su eficacia debe medirse con navegación real y consultas recibidas.**
