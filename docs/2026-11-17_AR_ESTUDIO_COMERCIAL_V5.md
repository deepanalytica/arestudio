# AR Estudio V5 — Plataforma comercial y activos de captación

Fecha: 17 de noviembre de 2026. Base: conversación sobre el sitio AR Estudio y la diferencia entre portafolio y web comercial.

## Decisión de producto

AR Estudio es **un negocio que vende servicios y productos digitales**, no una galería de trabajos. El visitante principal llega desde el enlace de Instagram, desde Google o desde un artículo. El recorrido principal debe ser comprensible sin vocabulario especializado.

**Promesa concreta:** ayudar a pequeños negocios de Chile a ser encontrados, comprendidos, elegidos y contactados. La publicidad, la identidad visual y las páginas web son medios, no el mensaje principal.

**Públicos iniciales:** (1) local que abre y necesita visitas; (2) profesionales independientes que necesitan consultas legítimas; (3) comerciantes con tienda y fricción de compra; (4) operadores que repiten tareas y requieren automatización con control humano.

## Oferta y catálogo

- **Kit Apertura Local:** identidad inicial, presencia local, contenido de inauguración y página de ubicación/contacto. No incluye promesa de visitas.
- **Kit Más Consultas:** posicionamiento, página profesional, buscadores y flujo de contacto/reserva. No garantiza un número de clientes.
- **Kit Tienda que Convierte:** diagnóstico y mejoras de ficha/producto, oferta, confianza, preguntas frecuentes y medición básica. No garantiza ventas.
- **Servicios a medida:** diseño gráfico, contenido audiovisual, anuncios, redes, web, tienda, automatización y WhatsApp; se cotizan por alcance.

No se publican precios de servicios sin aprobación comercial, ni descuentos ficticios. La **oferta de valor gratuito es real**: PDF de seis páginas, CSV editable de 30 días, plantilla TXT y checklist de conversión en PDF, además de dos miniherramientas interactivas. No se solicita correo para usarlos. Estas herramientas pueden servir como muestra del tipo de trabajo entregado y como primer contacto.

## Embudo de conversión del sitio

1. **Primeros 3 segundos:** «Tu negocio necesita clientes. No más vueltas» + lista de servicios sin jerga + CTA principal «Encontrar una solución».
2. **Reconocimiento de la situación:** cuatro botones que muestran orientación inmediata y vinculan al kit pertinente.
3. **Oferta concreta:** tres kits con entregables y bonificaciones descargables; contacto contextualizado por WhatsApp.
4. **Valor antes de pedir datos:** recursos gratuitos y herramientas que funcionan sin formulario.
5. **Evidencia honesta:** ARCHIVO, Visual Art AI y Fortia con enlaces públicos; no presentar demos o campañas editoriales como casos medidos.
6. **Autoridad ganada:** tres artículos originales y útiles vinculados a la oferta y recursos.
7. **Cierre sin fricción:** formulario de nombre, rubro, necesidad y descripción opcional; solo prepara WhatsApp (la persona envía manualmente).

## Niveles de conciencia (modelo para redactar campañas)

- Desconoce problema: «Tu cafetería no recibe visitas porque el barrio aún no sabe que abrió» → artículo práctico.
- Reconoce problema: «Tengo consultas insuficientes» → diagnóstico gratuito.
- Reconoce solución: «Necesito una web y un perfil profesional» → guía y kit.
- Reconoce oferta: «Ya sé qué necesito; quiero saber qué incluye» → tarjeta de kit.
- Listo para contratar: «Quiero cotización» → WhatsApp contextualizado.

No amontonar todos estos mensajes en el hero. La portada distribuye el recorrido según intención del visitante.

## Visibilidad en buscadores y asistentes de IA

- Rutas estáticas, HTML semántico y legible sin JavaScript; H1 concreto, enlaces internos, textos originales, páginas autocontenidas.
- `sitemap.xml` con homepage comercial, herramientas y tres artículos; `robots.txt` público; `llms.txt` como índice voluntario adicional (no es estándar obligatorio ni garantiza citación).
- JSON-LD: `Organization`, `ProfessionalService` y catálogo sin precios inventados, `BlogPosting` y `BreadcrumbList` para cada artículo, `SoftwareApplication` con costo cero real para herramientas gratis.
- Canonical, títulos y descripciones por ruta. Sin `noindex` en las páginas públicas.
- Google Search Central confirma que la indexación clásica y el contenido útil son las bases de visibilidad en experiencias con IA; no hay schema mágico ni garantía de ser incluido: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- OpenAI diferencia OAI-SearchBot para búsqueda de GPTBot para entrenamiento; se permite el acceso de búsqueda: https://developers.openai.com/api/docs/bots
- **Pendiente operativo:** registrar dominio y verificar propiedad en Search Console, enviar sitemap, comprobar rastreo, resultados y tráfico de referencia. Crear contenido no genera indexación automática.

## Métricas y test de conversión

No existe una línea de base verificada de ventas atribuibles. Antes de prometer resultados, configurar con permiso y privacidad: clic a WhatsApp, interacción con selector, consultas recibidas, tasa de contacto, descarga de recursos, uso de herramientas y pedidos realmente pagados si hay ecommerce. Capturar UTMs al crear el mensaje WhatsApp, sin afirmar que el mensaje fue enviado ni que se registró una conversión en servidor.

**QA técnica:** HTML y JSON-LD válidos; rutas descargables HTTP 200; descarga real de PDF/CSV/TXT; miniherramientas con resultados deterministas y casos extremos; navegación y FAQ por teclado; responsividad 1440/1024/820/390/320; sin imágenes rotas, overflow ni errores JS.

## Lo que no está terminado

- No hay pasarela de pagos configurada para comercializar productos digitales de pago. Los descargables publicados son realmente gratuitos.
- No se publicaron cifras de clientes, tasa de conversión ni testimonios sin evidencia.
- Los kits de servicio se solicitan por WhatsApp; no tienen checkout ni precio fijo. Su alcance final requiere aprobación antes de contratar.
- El diseño no reemplaza una prueba con dueños de negocio, una investigación de demanda ni validación de ingresos.