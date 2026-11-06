# AR ESTUDIO — Manual de identidad 2.2

## Idea rectora
**Electric Editorial**: expresivo en portada y preciso en ejecución. La marca no se reduce a un degradado. La diagonal del signo AR/ es un elemento compositivo repetible para cortes, transiciones, folios y motion.

## Arquitectura
- Marca madre: AR ESTUDIO.
- Firma compacta: AR/.
- Áreas descriptivas: Dirección de Arte · Experiencias Digitales · Sistemas y Datos · Comunicación.
- Los proyectos conservan identidad y evidencia propias. No atribuirlos como productos comerciales finalizados sin respaldo.

## Firma
Maestros: `assets/mark.svg` y `assets/mark-mono.svg`. SVG para escalado; no rasterizar para impresión sin requerimiento. Mantener zona libre alrededor y evitar deformaciones. La barra slash es parte del sistema, no un recurso decorativo aislado. Para contraste adverso usar monocromo, fondo alternativo o combinación validada.

## Color
Primarios: eléctrico #245BFF, glaciar #F5FAFF, tinta #101729. Intensificadores: violeta #6236FF, magenta #F12BBE, naranja #FF652F, lima #EFFF38.
Recomendación de distribución: fondos claros dominantes, azul como señal, acentos expresivos ocasionales. No aplicar los 7 colores a todos los componentes. Validar WCAG AA 4.5:1 para texto normal, 3:1 para texto grande y componentes donde corresponde; el laboratorio incluye calculadora interactiva.

## Tipografía
**Casting tipográfico**: Syne ExtraBold 800 para grandes titulares de impacto; Instrument Serif Italic 400 para interjecciones, palabras expresivas o contrapuntos editoriales; Syne Bold 700 para encabezados de sección; DM Sans 400/500/700 para párrafos, botones y controles; IBM Plex Mono 400/500 para folios, datos y etiquetas.

**Composición**: dos familias protagonistas como máximo por pieza (Syne + Instrument Serif); DM Sans e IBM Plex Mono son auxiliares. La serif nunca sustituye al cuerpo de lectura, y no se debe simular italic sobre Syne. El énfasis proviene del contraste entre forma, tamaño y ritmo, no de usar más efectos. Títulos grandes, tracking entre -0.04em y -0.08em según ancho de palabra. Antes de publicar se revisa desbordamiento a 320, 390, 768 y 1440 px. Tokens canónicos en `tokens.json`.

## Espaciado
Base 4 px. `space-1=4px`, `space-2=8px`, `space-3=12px`, `space-4=16px`, `space-6=24px`, `space-12=48px`. La vista del laboratorio deriva los espacios del mismo JSON.

## Composición
Alternar editorial de gran formato, fondo sólido, retícula técnica y aire visual. Evitar series largas de tarjetas idénticas. Bordes y sombras se reservan para superficies funcionales; la identidad debe sostenerse por la forma y la composición.

## Componentes
Acciones con hover, pressed, focus visible, disabled y loading. Formularios con error/success mediante texto explícito, sin depender solo del color. Controles táctiles con área adecuada. Accesibilidad y teclado son requisitos, no complementos.

## Motion
120 ms feedback; 220 ms hover; 420 ms transiciones; 740 ms gesto editorial. Priorizar transform y opacity. GSAP progresivo y fallback nativo. Respetar preferencia de movimiento reducido. Three.js opcional en portada, render controlado por visibilidad, DPR limitado y cleanup.

## Aplicaciones
Portada, social y póster siguen composiciones distintas para mostrar amplitud. Son ejemplos conceptuales, no trabajos encargados ni resultados de clientes. Antes del registro o difusión comercial final, realizar búsqueda de similitud marcaria.
