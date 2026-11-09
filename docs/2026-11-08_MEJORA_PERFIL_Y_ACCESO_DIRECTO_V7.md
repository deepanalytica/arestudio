# AR Estudio · V7 — Perfil claro y acceso directo a proyectos

**Fecha:** 2026-11-08  
**Motivación:** auditoría visual de captura móvil del perfil y solicitud explícita del titular.  
**Alcance:** microcopy profesional, arquitectura de información, tarjetas de perfil y UI inicial del portafolio.

## Problema observado

La sección de formación mostraba «Estudios en desarrollo, no título obtenido» debajo de «Ingeniería en Data Science». Aunque buscaba precisión, introduce una negación innecesaria y desfavorable. La misma estructura se repetía al aclarar NVIDIA Inception. El estado real puede comunicarse sin añadir valoraciones: «Ingeniería en Data Science / En curso» y «Deep Geo · NVIDIA Inception / Participación en el programa».

La captura también revela un perfil largo: tres credenciales verticales, un enorme titular de trayectoria y tres tarjetas casi idénticas antes de llegar a trabajos visibles. Además, la portada podía ahorrar navegación proporcionando accesos a tres proyectos reales desde el hero.

## Decisión

**Primero muestra lo que has construido. Después cuenta cómo llegaste ahí.**

1. **Portada:** conserva «Las buenas ideas se trabajan» pero reduce el subtítulo a una explicación concreta. Una CTA principal lleva al trabajo; tres rutas específicas (arte, datos, sistemas) abren casos existentes.
2. **Desktop:** mosaico interactivo con piezas existentes de ARCHIVO, Deep Geo y Praxios. Usa fotografías publicadas cuando existen, ilustraciones conceptuales declaradas cuando no. No es un fondo falso de interfaz.
3. **Móvil:** el mosaico grande se sustituye por tres accesos compactos de al menos 40 px, para que el primer proyecto destacado siga visible antes de abandonar el viewport.
4. **Perfil:** formación en tres bloques escaneables; el texto se limita a estado y alcance real. Las certificaciones y la participación en NVIDIA Inception no se reetiquetan como títulos.
5. **Casos del perfil:** cuatro tarjetas con material público o conceptual identificado, antepuestas a la trayectoria y ocho áreas profesionales.
6. **Trayectoria:** formato timeline con frases breves y fechas visibles; se conservan los tres períodos documentados.
7. **Áreas:** se mantienen ocho capacidades y sus enlaces, sin inventar experiencias ni resultados.

## Qué se preserva

- Siete colores de marca: Electric #245BFF, Violet #6236FF, Magenta #F12BBE, Orange #FF652F, Acid #EFFF38, Glacier #F5FAFF, Ink #101729.
- SVG oficiales, historia del profesional, 21 proyectos, datos verificables, estados reales y enlaces.
- CSS como capas nuevas, sin alterar tokens ni sustituir la marca.
- Modal de casos, acceso por URL, GSAP progresivo y accesibilidad.
- Remotion como herramienta offline; en portada se prioriza navegación rápida sin vídeo autoplay.

## QA obligatorio

- npm run check incluyendo validación de densidad de portada y microcopy de formación.
- Browser QA 1440 × 900, 768 × 950, 390 × 844 y perfil en escritorio/móvil.
- Primer destacado visible en el viewport, sin overflow; menú y foco correctos.
- Tres accesos de entrada con ID real, 21 casos, 8 áreas, 3 períodos laborales y 4 obras del perfil.
- Ningún «no título obtenido», «estudios en desarrollo» ni «no certificación del producto» en el bloque de credenciales.
- PR con capturas revisadas antes de fusionar; publicación Pages verificada al final.

**No atribuir resultados comerciales a mejoras editoriales sin medición.**
