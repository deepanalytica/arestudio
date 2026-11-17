# AR Estudio · Web comercial para pymes (2026)

**Sitio publicado:** https://deepanalytica.github.io/arestudio/comercial/  
**Repositorio:** https://github.com/deepanalytica/arestudio/tree/main/comercial  
**Portafolio técnico preservado:** https://deepanalytica.github.io/arestudio/

## Objetivo y promesa

Explicar en segundos qué puede contratar una pyme, demostrar capacidad mediante trabajos públicos, ayudar a elegir una solución ajustada al problema y facilitar una conversación comercial por WhatsApp. No se atribuyen cifras de ventas ni testimonios no respaldados. El laboratorio de formatos usa números ficticios identificados expresamente como DEMO.

## Sistema de diseño

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `#F5F7FE` | superficies glaciar |
| `--ink` | `#101729` | texto y contraste |
| `--blue` | `#245BFF` | foco, enlaces y CTA |
| `--lime` | `#DCF86B` | acento limitado |
| `--glacier` | `#EEF4FF` | fondos secundarios |
| `--glass` | `rgba(255,255,255,.74)` | tarjetas translúcidas |
| `--shadow-soft` | `0 12px 40px rgba(42,60,111,.085)` | elevación regular |
| `--shadow-lg` | `0 28px 90px rgba(24,41,105,.14)` | elementos destacados |
| `--r-md` | `24px` | radios de tarjetas |

Tipografía: **Manrope** en titulares y **DM Sans** en UI / texto. Escala responsive con `clamp()`, bordes de 1 px, luces radiales y ruido casi imperceptible. El sistema visual prioriza contraste y legibilidad sobre efecto decorativo.

## Arquitectura

- `index.html`: contenido, SEO, enlaces a pruebas verificables, datos estructurados y formulario.
- `styles.css`: estilos base y layout responsivo.
- `premium.css`: tokens y capa visual premium, degradados, superficies, sombras, laboratorio de formatos y breakpoints.
- `app.js`: navegación móvil, filtros, selector de necesidades, preselección de servicios y formulario WhatsApp. Incluye atributos UTM en el mensaje si el tráfico llega desde una campaña.
- `motion.js`: progresivo. GSAP/ScrollTrigger si carga la CDN; Three.js como efecto decorativo solo en equipos compatibles. Evita WebGL en móvil táctil, respeta `prefers-reduced-motion`, limita la densidad de partículas y permite usar el sitio sin esas librerías.

**No se instala React**: React Bits aporta patrones visuales que se reproducen en Vanilla JS/CSS sin introducir hidratación o bundles pesados. **Remotion** corresponde a la producción de videos exportables, no es una dependencia runtime de una web estática. Ningún video Remotion se afirma como producido aquí. **Kiyowalski** no se añadió porque no se identificó una biblioteca verificable con ese nombre.

## Flujo del visitante

1. Entiende la oferta de valor al ingresar.
2. Ve soluciones agrupadas por dolores reales.
3. Puede abrir sitios reales y evaluar el trabajo visual. Se distinguen sitios publicados, I+D y ejemplos ilustrativos.
4. Selecciona una necesidad o servicio, revisa la propuesta y hace contacto.
5. El formulario solo genera un mensaje de WhatsApp para que el visitante lo confirme. No hay base de datos, cobro ni envío automático desde esta web.

## Control de calidad

- JavaScript validado con `node --check`.
- Comprobados enlaces internos, selectores, tarjetas y desbordes horizontales en 390, 768 y 1440 px con Chromium local usando recursos visuales sustitutos. Se probaron filtros, selector y menú móvil.
- El workflow de GitHub Pages ahora comprueba después de desplegar que la ruta comercial sirve HTML, CSS premium y JS de animación.
- Todo se despliega mediante el workflow ya existente, activado en cada push a `main`.

## Pendientes conscientes

- Reemplazar algunas maquetas ilustrativas por campañas, posts e imágenes reales autorizadas, con capturas alojadas en el repositorio.
- Validar los enlaces de sitios externos y el flujo final de WhatsApp en iOS/Android con conexión real.
- Incorporar políticas de privacidad / aviso según cómo se habilite analítica y qué datos se recojan, antes de agregar Meta Pixel o GA4.
- Configurar dominio comercial definitivo, Google Search Console y medición de conversiones cuando estén disponibles las cuentas y accesos.
- Construir con Remotion un reel de presentación **solo cuando exista un guion y assets finales**; exportar MP4/WebM optimizados y mostrar poster/preload controlado, evitando reproducir un motor de render en el navegador del usuario.

## Desarrollo local

```bash
python -m http.server 8000
# Abrir http://localhost:8000/
```

Este directorio es independiente del portafolio original; no requiere scripts de compilación para servir el sitio.