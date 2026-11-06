# AR ESTUDIO — Manual de identidad 2.3

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
Archivo Regular 400 y Archivo Black 900 son los pesos protagonistas. Archivo Bold 700 para encabezados funcionales. Regular da respiración y Black crea impacto. Titulares grandes en caja alta, peso y tamaño como recursos de dirección de arte; no usar serif, cursiva ni inclinaciones decorativas. DM Sans 400 para lectura continua e IBM Plex Mono para folios. Comprobar ancho y contraste en móvil y escritorio.


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
