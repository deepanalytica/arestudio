# AR Estudio V8 — Proyectos primero

**Fecha de decisión:** 2026-11-08  
**Fuente:** cinco referencias visuales aportadas por el titular, una captura móvil previa y código vigente del portafolio.  
**Objetivo:** que el visitante vea y pueda abrir obra real en el primer vistazo, sin tener que atravesar un hero autorreferencial, un mosaico redundante y varias secciones conceptuales.

## Lo que enseñan las cinco referencias

| Referencia visual aportada | Principio de composición | Traducción a AR Estudio |
|---|---|---|
| App financiera: tres vistas móviles, métricas y degradado lila | La interfaz es el protagonista; el entorno le da aire, escala y profundidad | Mostrar interfaces reales cuando existen; composición con imágenes y respiro, no cajas oscuras uniformes |
| Entorno técnico isométrico con paneles superpuestos | Contexto + capas: una visualización principal con indicadores flotantes explica el tipo de producto sin un párrafo | Para Deep Geo usar visualizaciones geográficas conceptuales o verificadas, claramente rotuladas; no fingir módulos funcionales |
| Asistente de IA en dos pantallas móviles | Una única tarea por pantalla y estados evidentes; iconografía contenida | Praxios y los agentes deben presentarse como problemas de supervisión/evidencia, no como inventario de tecnologías |
| Landing financiera con ilustración central y paneles detrás | Una imagen memorable funciona como narrativa; el copy acompaña, no ocupa el lugar de la obra | ARCHIVO tiene material editorial propio, se compone con la captura pública real de su tienda |
| Investigación de IA con visual central y superficie ligera | Mucho espacio negativo, atención en una interacción específica y fondos luminosos | Encabezado muy breve, galería inmediata, colores AR/ existentes con gradientes tenues |

**No reproducir logos, personajes, ilustraciones ni pantallas ajenas.** Los ejemplos inspiran jerarquía, disposición, luz y tratamiento de escenas; la evidencia visual publicada debe corresponder a las obras del usuario.

## Problemas detectados en V7

1. La portada decía «Las buenas ideas se trabajan» y obligaba a leer varias líneas antes de mostrar un trabajo.
2. Había tres accesos visuales de ARCHIVO/Deep Geo/Praxios **y después otra galería con las mismas obras**.
3. La portada móvil ocultaba ese primer mosaico, mostrando los proyectos solo después de todo el bloque introductorio.
4. Las fichas oscuras tenían demasiado peso tipográfico, demasiadas etiquetas sobre imágenes y un bloque descriptivo largo.
5. Después de los cuatro seleccionados venían varias secciones conceptuales, y el archivo de 21 casos quedaba muy abajo.

## Decisión V8

1. **El hero se convierte en pie editorial**: «Mira lo que construí». Un párrafo de dos frases explica que se pueden abrir los proyectos. No hay botón que obligue a hacer clic para llegar a lo que ya está debajo.
2. **Primer panel protagonista**: ARCHIVO ocupa ocho de doce columnas en escritorio. Deep Geo ocupa cuatro; debajo Praxios y Visual Art AI cambian proporciones. En móvil: una obra grande por fila.
3. **Captura dentro de la fotografía editorial**: ARCHIVO incorpora como pequeño panel flotante la captura de su catálogo publicada por el propio proyecto. Si la captura no está disponible, no se inventa otra.
4. **Presentación ligera**: tarjetas sin marcos negros cerrados; imágenes con aire, texto oscuro sobre blanco glaciar y una descripción concreta. La etiqueta comercial o de evidencia se conserva fuera del foco visual.
5. **Archivo de 21 proyectos después de los cuatro**: permite buscar, filtrar y abrirlos inmediatamente antes de las secciones de método, marketing, dirección de IA y trayectoria.
6. **Movimiento deliberado**: GSAP/ScrollTrigger existente y un solo hover de imagen/ventana sin introducir librerías; se respeta prefers-reduced-motion.

## Lo que NO cambia

- Los siete colores oficiales: Electric #245BFF, Violet #6236FF, Magenta #F12BBE, Orange #FF652F, Acid #EFFF38, Glacier #F5FAFF, Ink #101729.
- Logo AR/ y slash del brandkit, Archivo como tipografía display, GSAP progresivo, no React en el sitio publicado.
- Veintiún casos, referencias de fuentes, estados I+D, dossier, demo con datos ficticios o producto publicado.
- Fichas con decisiones y detalles verificables, filtros, búsqueda, accesibilidad, teclado y navegación.
- El perfil actualizado con formación «Ingeniería en Data Science — En curso».

## QA y aprobación

- Test de diseño: portada sin botones redundantes, cuatro casos, captura de ARCHIVO, archivo completo después de seleccionados.
- Playwright 390, 768 y 1440 px: comprobar visualmente primer panel, imagen sin cortes, caption, foco, scroll horizontal, menú y casos.
- El primer proyecto debe comenzar antes de los 390 px desde arriba en móvil y 430 px en escritorio; preferible todavía más arriba.
- Verificar enlaces públicos, arte conceptual etiquetado y siete tokens intactos.
- **No publicar** antes de revisar las capturas reales y aprobar el workflow; revertir si hay regresiones.

## Evaluación responsable

Las referencias son trabajos de terceros. Este ejercicio traslada principios generales de UX y dirección de arte, no copia pantallas ni reivindica sus composiciones como propias. El cambio de presentación tampoco permite afirmar más visitas o conversiones sin analítica.
