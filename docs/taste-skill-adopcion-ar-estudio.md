# Taste Skill × AR Estudio · Evaluación y adopción controlada

**Fecha:** 2026-11-17  
**Fuente:** https://github.com/Leonxlnx/taste-skill (README y `skills/taste-skill/SKILL.md`, versión documentada: 2.5.1; licencia MIT)  
**Ámbito:** https://deepanalytica.github.io/arestudio/comercial/  
**Estado:** propuesta. **No se instaló ni ejecutó código de Taste Skill**, ni se alteró la versión publicada.

## Decisión: adoptar criterios, no sustituir el sistema de diseño

Taste Skill clasifica una agencia/estudio creativo como **service**. Sus reglas privilegian imágenes auténticas, mensajes concretos, una acción por pantalla, alineación, microinteracciones contenidas y controles de calidad con Chromium. Esto complementa el objetivo comercial de AR Estudio: que pymes entiendan qué servicios se ofrecen y vean pruebas de trabajo.

Sin embargo, algunas reglas del repositorio son *convenciones de Taste Skill, no estándares universales*: veta el violeta y los degradados, limita efectos en sitios de servicios, propone datos de contacto de ejemplo y desaconseja ciertas interfaces. No deben prevalecer sobre la marca de AR, sus datos reales, el brief comercial ni la petición del usuario de una visión de servicios en un solo vistazo.

## Línea de base comprobada en el código

- Identidad propia: `brand/tokens.css`, Archivo + DM Sans + IBM Plex Mono, azul eléctrico `#245BFF`, tinta `#101729` y acentos.
- Página: `comercial/index.html`; 8 categorías visibles en el selector; sección `#trabajos` con 20 tarjetas; consulta por WhatsApp.
- Interacciones: `comercial/experience.js` y `comercial/showroom.js` (GSAP, filtros, vista ampliada, respetar `prefers-reduced-motion`).
- Capturas: `scripts/capture-public-evidence.mjs` recoge evidencia pública; proyectos experimentales se distinguen de proyectos publicados.
- QA existente: `scripts/qa-commercial.mjs` prueba cinco anchos: 1440, 1280, 820, 390 y 320 px; verifica filtros, modal y consola.
- Estos hechos describen el código; **no equivalen a una auditoría visual, accesible ni de rendimiento completa de la URL en producción**.

## Prioridad 1 · Calidad visual comercial

1. Mantener los **8 servicios como índice de entrada**, sin convertir la portada en ocho pantallas dispersas.
2. Mostrar **trabajo verdadero** antes de insistir en conceptos abstractos: capturas de sitios publicados, piezas comerciales y mockups de apps. Identificar como «demo», «concepto» o «sitio publicado» cuando corresponda.
3. Reducir textos secundarios y evitar títulos que dependan de una animación para comprenderse. Titulares orientados a la pyme: «Tu tienda con carrito y pagos», «Gráficas para vender», «Atiende consultas de WhatsApp».
4. Conservar una jerarquía consistente de bordes, elevación, radios, tipografía y espaciado desde los tokens AR. Evitar agregar una segunda paleta o más estilos de botón.
5. Dar a cada servicio un ejemplo visual distinto, no reutilizar un dashboard genérico. En móvil, priorizar una captura legible con acceso visible a «Ver trabajo» y «Cotizar».

**Criterios de aceptación:** cualquier servicio relevante identificable desde la portada; un proyecto o muestra accesible sin confusión; enlace directo al contacto en cada camino principal; ninguna prueba visual etiquetada como resultado comercial si no hay evidencia.

## Prioridad 2 · Navegación, accesibilidad y movimiento

1. Probar recorrido solo con teclado: encabezado → 8 servicios → filtros → modal → enlace → contacto, con foco visible y retorno correcto tras cerrar el diálogo.
2. Ampliar QA responsive a **1024 y 768 px** (mantener 1440, 1280, 820, 390, 320), verificar superposiciones, texto recortado y objetivos táctiles.
3. Confirmar que cada imagen tiene `alt` útil o se declara decorativa y que los estados de filtro/selección son explícitos para lectores de pantalla.
4. Mantener movimiento expresivo solo donde explica algo: entrada hero, selección de servicio y una transición narrativa. Sin animaciones obligatorias para descubrir contenido.
5. Garantizar modo `prefers-reduced-motion`, fondos estáticos si no hay WebGL y contenido completo si GSAP o fuentes remotas fallan.

**Criterios de aceptación:** QA automatizada pasa en los siete anchos; cero errores JS no controlados; filtro, modal y formulario funcionan por teclado y tacto; no hay desplazamiento horizontal a 320 px.

## Prioridad 3 · Evidencia, velocidad y captación

1. Mantener evidencia de origen (URL, tipo publicado/demo, fecha de captura y archivo) para cada imagen del showroom.
2. Optimizar capturas: tamaños derivados apropiados, `loading="lazy"` fuera del primer viewport, `width`/`height` o proporción fija; evitar duplicar archivos pesados.
3. Medir en URL servida por HTTP: LCP, CLS y estabilidad en red móvil limitada; acordar presupuesto para las imágenes del hero y el showroom antes de añadir más.
4. Comprobar enlaces de los proyectos, ruta a WhatsApp y que los parámetros UTM conservan su significado. No fingir un envío de datos cuando se prepara un mensaje.
5. Mantener una propuesta comercial verificable y sin cifras, reseñas, certificaciones o clientes inventados.

**Metas para contrastar (no resultados medidos):** LCP ≤ 2,5 s y CLS ≤ 0,1 en pruebas de campo donde sea posible; ninguna imagen roto o marcador vacío; contacto identificable en menos de 2 interacciones después de seleccionar servicio.

## Procedimiento propuesto de adopción

- **Fase A (este PR):** documentar la adaptación crítica y la línea de base sin cambiar producción.
- **Fase B:** abrir rama experimental con los cambios de copy, jerarquía y sistema de imágenes, y hacer capturas comparables antes/después.
- **Fase C:** aprovechar selectivamente las comprobaciones de Taste Skill en un **entorno aislado** con Node 22+ y Chrome/Chromium. Leer scripts y hooks antes de ejecutar código de terceros. El comando oficial de instalación es `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"`; **no se ha ejecutado**.
- **Fase D:** contrastar con las pruebas de AR, preservar el sistema de diseño propio y publicar solo si no hay regresiones funcionales o de conversión.

## Conflictos explícitos que NO se aplican de forma automática

- El veto a violeta/degradados: **no se aplica** a la identidad AR.
- La sustitución de teléfono y correo por datos `.example`: **no se aplica** al negocio publicado.
- La regla universal «una sección por pantalla»: **no se impone** a la portada de ocho servicios solicitada.
- Prohibiciones absolutas de 3D, fondos o componentes: **se evalúan por utilidad, accesibilidad y rendimiento**; no por estética dogmática.
- La exigencia de que el `gate.mjs` de terceros controle cada cierre de agente: **no se activa** sin revisión del código y una prueba aislada.

## Verificación y reversibilidad

Esta propuesta es solo documentación en rama; no altera los activos servidos en GitHub Pages. Cualquier prueba de código posterior debe ejecutarse en una rama aparte, con capturas de escritorio/móvil, resultados de CI y posibilidad de revertir sin modificar el portafolio original.
