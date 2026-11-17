# AR Estudio / Immersive Commercial v6 — 17.11.2026

## Objetivo
Hacer que la propia página demuestre dirección de arte y producción de imágenes, mientras explica a dueños de negocios por qué contratar AR Estudio. **No es una portada de portafolio:** conserva tres kits cotizables, dos herramientas gratuitas, descargas, artículos y contacto.

## Dirección creativa
**Electric Editorial**, identidad oficial AR/ (no redibujada). Primer contacto: tipografía Archivo Black de gran escala y una campaña original colorida, con una propuesta concisa: «QUE TE ENCUENTREN. QUE TE ELIJAN.». Ritmo de scroll: acción comercial → problema del negocio → prueba real a gran escala → marca → identidades → kits → campañas → canales → recursos → prueba ecommerce → guías → contacto.

La composición rompe simetría mediante solapes controlados, pantallas en perspectiva, folios que atraviesan los bordes y planos fotográficos de distinto tamaño. El texto sobre cada muestra explica una decisión de negocio, no enumera tecnología.

## Origen de las imágenes y logotipos
- `comercial/art/brands/*.webp`: 12 piezas originales preservadas desde `deepanalytica/archivo-tienda/assets/brands/`, proyecto ARCHIVO. Son **creaciones visuales originales para ARCHIVO**, no resultados medidos de campañas de clientes.
- `comercial/art/products/*.webp`: tres fotografías/mockups comerciales del mismo repositorio ARCHIVO (colección de materiales para futuros capítulos).
- `comercial/art/logos/*.svg`: **12 wordmarks vectoriales originales** en `deepanalytica/archivo-tienda/assets/identities/`. SVG conservado, sin redibujarlo. En la web se etiquetan como identidades del universo ARCHIVO, no doce clientes reales.
- `comercial/art/channels/*.svg`: iconos públicos vectoriales de **Simple Icons** (`simple-icons/simple-icons`), para Google Maps, Google Gemini, Instagram, Facebook y WhatsApp. Se muestran solo para ilustrar canales/herramientas; **no existe patrocinio, representación ni alianza con esas marcas**.
- `../brand/assets/mark.svg`: marca matriz oficial AR/, conservando sus trazados.
- `../assets/proof/*.jpg`: **capturas de sitios publicados** tomadas en CI por `scripts/capture-public-evidence.mjs` antes del QA; no se inventan dashboards, ventas, CTR, clientes ni testimonios.

## Escenas
1. **Portada tipográfica a pantalla completa** con BRAVA y AR/.
2. **Decisión comercial**: cuatro situaciones originales que conducen a kits/contacto sin jerga.
3. **ARCHIVO**: navegador escritorio + móvil en perspectiva a casi pantalla completa, con enlace verificable.
4. **Tipografía-argumento** en lima ácido, no un bloque genérico de beneficios.
5. **Doce logotipos originales** con una composición de ritmos cromáticos diferenciados.
6. **Campañas**: seis imágenes grandes y asimétricas.
7. **Canales**: cinco logos reales que flotan y caen con desplazamiento vertical cuadrático/potenciado, calculado con avance de scroll.
8. **FORTIA**: página de producto publicada en gran escala de escritorio y móvil; sin atribuir conversiones.
9. **Riel a sangre** de cinco campañas originales.

## Motion y accesibilidad
- `immersive.js`: `IntersectionObserver` para revelaciones; transformaciones 3D en `requestAnimationFrame` y scroll pasivo; aceleración vertical `p^2.4` para las cinco plataformas y velocidades individuales; parallax fotográfico con límites por escena.
- GSAP + ScrollTrigger **opcional**: pequeño pinning de la escena de ARCHIVO solo en escritorio grande. Sin CDNs, se mantienen las imágenes, copys, botones y scroll nativo.
- `prefers-reduced-motion: reduce`: sin caída, sin pinning, sin revelaciones que oculten contenido. Todo legible si JS falla.
- Los logotipos flotantes son decorativos (`aria-hidden`), con una leyenda clara para evitar insinuar alianzas comerciales.
- Imágenes fuera de portada usan `loading=lazy`; la primera imagen de campaña recibe prioridad de carga.
- No hay scroll-jacking, loops infinitos ni parpadeos.

## Aceptación técnica
- `npm run check` (catálogo, marca, diseño).
- `node scripts/qa-commercial-v5.mjs`: 1440,1024,820,390 y 320, sin overflow; 8 escenas; 12 logos; 6 fotos de campaña; cinco marcas de plataforma; prueba de scroll de aceleración, HTML de artículos, PDF/CSV/TXT, dos herramientas y formulario que prepara WhatsApp.
- Capturas por etapa: `qa-output/comercial-v5/{desktop,mobile}-{hero,mockup-archivo,identidades,campanas,canales,mockup-fortia,kits,recursos,articulos}.png`.
- Publicación solo después de revisar capturas de CI y QA aprobada. Verificación en GitHub Pages exige que la web y los recursos sigan accesibles.

## Riesgos
- Las capturas de terceros pueden fallar o cambiar; la CI registra disponibilidad y no simula evidencia. Revisar manifest si una pantalla quedara en blanco.
- Distintos dispositivos tienen distinta potencia gráfica; no montar WebGL en esta experiencia, limitar efectos a transform/opacity.
- Bloques inmersivos nunca deben desplazar fuera de vista la CTA o hacer ilegible el contenido. Revisar especialmente 320/390 px.
- No publicar testimonios, métricas, descuentos, proveedores o resultados no comprobados.
