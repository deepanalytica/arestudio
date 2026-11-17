# AR Estudio · Experiencia comercial 2.0

**Destino público:** https://deepanalytica.github.io/arestudio/comercial/

## Propósito

Permitir a pymes y emprendedores identificar en un solo vistazo qué soluciones puede desarrollar AR Estudio, explorar ejemplos visuales clicables, comprender un recorrido completo de captación y ver proyectos realmente publicados. No se representan como resultados comprobados los esquemas, maquetas ni demostraciones.

## Arquitectura de la interfaz

1. Portada interactiva de una sola pantalla en escritorio: mensaje comercial, ocho servicios con íconos SVG propios y panel dinámico de resultado/entregables. Las vistas del panel son ilustrativas; no son testimonios ni métricas de clientes.
2. Historia en cuatro pasos: atraer → presentar → contactar/comprar → medir y mejorar.
3. Casos verificables: ARCHIVO, WAL y Visual Art AI, con enlaces a sus proyectos públicos. El arte de WAL es una ilustración, no una captura de pantalla.
4. Contacto: formulario de datos mínimos que compone un mensaje por WhatsApp y mantiene los parámetros UTM; no persiste información ni simula CRM.

## Diseño y tecnologías

- Tokens de marca compartidos desde `../brand/tokens.css` (azul eléctrico #245BFF, violeta #6236FF, blanco glaciar #F5FAFF, tinta #101729).
- `experience.css`: diseño responsive, tarjetas translúcidas, luces difusas, tipografía Archivo/DM Sans, estados de foco y breakpoints hasta 320 px.
- `experience.js`: selector accesible de ocho soluciones, visualizaciones CSS/HTML, narración interactiva, envío a WhatsApp y menú.
- GSAP + ScrollTrigger: introducción y revelación de secciones como mejora progresiva, sin ocultar contenido si la librería falla.
- Three.js: órbitas 3D decorativas, cargadas solo en escritorio compatible cuando el navegador está inactivo. Sin dependencia funcional de WebGL.
- No se monta React ni se carga Remotion en la web pública: componentes similares a React Bits se realizan con JavaScript/CSS ligero; Remotion corresponde a la edición y exportación de videos, no al runtime de la página.
- SVG sprite local para íconos, sin dependencias externas de icon fonts.

## Transparencia

- Ningún dato de facturación, ROAS, costo por lead, testimonio o porcentaje de crecimiento se inventa.
- Una tienda con carrito y pasarela de pago se presenta como un servicio configurable, no como una integración predeterminada en esta landing.
- Los mensajes de chat y gráficas de dashboards son ilustraciones, no conversaciones reales ni reportes operativos.
- El formulario no envía datos automáticamente: abre WhatsApp para que la persona decida enviarlos.

## Pruebas

`node scripts/qa-commercial.mjs` desde la raíz del repositorio, después de instalar Playwright y Chromium, ejecuta pruebas de selección, accesibilidad operativa, integridad JavaScript y overflow en 1440, 1280, 820, 390 y 320 píxeles. Se publican capturas como artefactos de GitHub Actions.

## Pendiente para una versión posterior

Material gráfico real adicional para cada servicio, un pequeño paquete de videos profesionales optimizados (producibles con Remotion), medición real de conversiones con consentimiento y una integración de CRM si es requerida por el negocio.