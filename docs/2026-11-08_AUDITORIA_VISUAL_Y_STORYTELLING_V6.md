# AR Estudio V6 · Auditoría visual y dirección de arte narrativa

**Fecha:** 2026-11-08
**Referencia:** captura móvil del usuario (versión anterior a V6)
**Alcance:** rediseño de claridad, casos visuales, copy, movimiento y QA sin rebranding
**Ubicación:** index.html, app.js, brand/portfolio-story-v6.css, tests, Remotion lab
**Estado:** implementación en PR #7; validación y publicación sujetas a CI.

## Diagnóstico de la captura móvil

1. El hero ocupaba demasiado espacio con una enumeración profesional y dos párrafos.
2. Dos llamadas a la acción y rótulos extensos hacían competir al contacto con los trabajos.
3. ARCHIVO tenía título en imagen y de nuevo bajo la imagen, restando espacio a la historia.
4. Los cuatro casos se presentaban principalmente como fichas homogéneas, no como obras distintas.
5. El material de Deep Geo tenía rótulos superpuestos a los que ya existían en el arte original.
6. Las explicaciones de estrategia, proceso, ingeniería y marketing aparecían antes de suscitar curiosidad.

## Decisión creativa

**No vender disciplinas. Mostrar una buena decisión.**

Una frase corta y un ejemplo concreto llevan al visitante a la galería. El resto de capacidades sigue disponible, pero no exige leerlo antes de entrar.

**Nuevo hero:** «Las buenas ideas se trabajan.»
**Un párrafo:** «A veces una idea termina siendo una campaña. Otras, un mapa o un sistema. Lo interesante es entender qué hace falta y hacerlo bien.»
**Una CTA:** «Mira lo que hice».
**Primer bloque:** cuatro casos visuales con preguntas, historia y fuentes comprobables.

## Casos: tono cercano y rigor

- ARCHIVO: doce marcas compartiendo tienda, sin pérdida de voz visual.
- Deep Geo: mucha información y preguntas abiertas; portada conceptual rotulada.
- Praxios: trazabilidad y verificación del trabajo con agentes de IA; dossier, no consola.
- Visual Art AI: comunicación de una oferta comprensible y sitio publicado.

Las aperturas de los 21 casos se han redactado como historias cortas. El lector puede desplegar «Te cuento cómo lo pensé y qué puedes comprobar» para acceder a problema, contribución, decisiones técnicas, entregables y límites. Los datos permanecen en data.js; la historia no inventa resultados.

## Lenguaje visual

- **Electric Editorial, no rebranding**: siete swatches oficiales del Design System Lab, sin introducir otros colores de identidad.
- Archivo Regular/Black, DM Sans e IBM Plex Mono.
- Galería asimétrica 7/5 y 5/7 en escritorio; una obra por fila en móvil.
- Fotografías y capturas publicadas cuando existen; recursos conceptuales identificados.
- Bordes y superficies contenidos, sin elementos decorativos competidores.
- Galería antes que problemas y explicación de capacidades.

## Tecnología aplicada sin añadir carga innecesaria

- **Taste:** densidad objetivo 2, una idea por viewport y originalidad editorial.
- **Impeccable:** revisión de jerarquía, estados, excesos, contraste y accesibilidad.
- **Emil Kowalski:** movimiento pequeño, transición intencional, sin bloquear clics.
- **gstack:** secuencia auditar → implementar → revisar capturas → probar → publicar.
- **GSAP + ScrollTrigger:** entrada progresiva de historias; en ausencia del CDN todo el contenido sigue accesible.
- **Remotion:** composición reproducible de 120 frames y cuatro escenas en react-lab; genera archivo MP4 offline. No se inserta un motor React de video en producción ni se presenta el storyboard como una pieza ya publicada en la web.

Fuente operativa para agentes: .agents/skills/portfolio-taste/SKILL.md.

## Contrato de publicación

- npm run check ejecuta design-preflight y tests previos.
- Playwright verifica 1440, 768 y 390 px; estados y errores.
- El primer proyecto debe verse en el viewport inicial.
- 21 casos, 7 colores, 26 variantes del logo, enlaces, menú, búsqueda y foco intactos.
- Render de Remotion validado por Motion Lab QA; MP4 disponible como artifact de CI.
- No atribuir mejoras en conversión antes de medirlas.

## Riesgos pendientes de futuras fases

- Remotion se mantiene como herramienta de exportación, no como video autoplay en la portada: autoplay aumentaría bytes, accesibilidad y coste de red; incorporar solo cuando una pieza final y su poster estén aprobados.
- GSAP via CDN es progresivo, no requisito de lectura. Medir y reducir animaciones si un móvil lento evidencia jank.
- Las imágenes públicas pueden cambiar; el catálogo tiene fallback conceptual, y las piezas externas deben validarse periódicamente.
- El seguimiento comercial y los píxeles requieren autorización y política de privacidad; no se han añadido.

**Prohibido presentar una composición conceptual como evidencia de producto o inventar métricas, empresas clientes y resultados de campañas.**
