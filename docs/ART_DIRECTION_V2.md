# AR/ Studio — Dirección de Arte 2.0

**Propósito:** Una galería profesional, serena y editorial. Los proyectos deben verse inmediatamente. La personalidad de cada obra debe diferenciarse sin romper un diseño madre coherente.

## Principios

1. **Sistema madre tranquilo:** fondo blanco perla `#FAF9F6`; tinta `#172521`; bosque `#102E28`; señal `#62DD7F`. Los acentos de proyectos no contaminan los controles globales.
2. **Arte por caso:** Archivo usa editorial naranja y tipografía serif de escala; Deep Geo usa topografía verde-azulada y datos discretos; Praxios OS usa paneles translúcidos violeta; Visual Art AI usa coral y lenguaje de campaña. En el catálogo se conservan 17 portadas conceptuales adicionales específicas.
3. **Una idea por viewport:** titular directo, proyectos visibles y categorías accesibles. No abrir con una animación larga.
4. **Foto real identificada, no evidencia falsa:** las imágenes Ownform, ALTO e Imago referencian recursos publicados de Archivo. Todas las portadas abstractas se describen como composiciones editoriales. Ningún gráfico es presentado como resultado medido.
5. **Tipografía y movimiento subordinados a lectura:** la tipografía grande es protagonista solo en las portadas. En textos de interfaz, DM Sans, peso moderado y líneas legibles; datos secundarios DM Mono.
6. **Microinteracción con causa:** halo puntual al hover, elevación 7 px, ligera escala de imagen, respuesta de panel interno Praxios. No animaciones invasivas en la navegación.

## Escala y ritmo

- Retícula máxima: 1480 px; 4 columnas en escritorio, 2 en tablet, 1 en móvil.
- Escala de 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px.
- Tarjetas: radio 22 px, bordes difusos y dos sombras de baja opacidad.
- Titulares: tracking negativo y líneas compactas. Mono solo en datos, etiquetas y sistemas.
- Entradas GSAP ligeras (260–450 ms) con `clearProps`; `prefers-reduced-motion` elimina transiciones y animaciones de decoración.

## Diseño para cada proyecto

| Caso | Paleta | Lenguaje gráfico | Evidencia |
|---|---|---|---|
| ARCHIVO | naranja quemado, crema | collage editorial, serif grande, fotografía real de campaña | tienda y publicaciones públicas |
| Deep Geo | azul petróleo, verde menta | relieve, líneas GIS, coordenadas y foco visual | ficha de investigación; portada conceptual |
| Praxios OS | lavanda, violeta | ventanas, sistemas, estados y geometría translúcida | investigación; interfaz conceptual |
| Visual Art AI | coral, rosa y vino | mensajes visuales, estrella, formas y contrastes tipográficos | sitio público de servicio |
| Índice completo | gamas propias por módulo | portadas individuales y etiquetas de estado | ficha y enlace de cada proyecto |

## Validación obligatoria

- QA a 1440, 768 y 390 px.
- Los 4 destacados aparecen sin desplazamiento inicial en escritorio y con inicio visible en móvil.
- 21 tarjetas, 21 portadas distintas, filtros, búsqueda, acceso por teclado y cierre de modales.
- Sin métricas ni resultados inventados; respetar status como I+D, demo, interno o público.
- CSS y JS verificados en CI; comparar capturas antes de comunicar que está listo.

## Stack en producción

HTML semántico, CSS con tokens y JS nativo; GSAP como mejora progresiva. Three.js opcional en héroe (fallback SVG). Remotion y React/React Bits permanecen en `react-lab/` como recursos de laboratorio, no dependencias de la web publicada. GStack describe el flujo de revisión y no una biblioteca de UI.