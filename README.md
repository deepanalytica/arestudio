# AR/ — Ideas que funcionan.

**Portafolio profesional de Alexis Reyes: diseño, datos, tecnología y comunicación.**

> Producción: https://deepanalytica.github.io/arestudio/ (disponible una vez habilitado GitHub Pages en Settings → Pages → Source: GitHub Actions y completado el workflow).

## Qué contiene

- `index.html`: portada, cuatro proyectos destacados, catálogo, método, perfil y contacto.
- `styles.css`: tokens, tipografía, retícula, sombras, componentes y layouts responsive.
- `data.js`: catálogo versionado, 21 entradas y sus estados.
- `app.js`: filtros, búsqueda, vistas de cuadrícula/lista, ficha modal, enlaces compartibles (`?proyecto=deep-geo`), accesos por teclado y animación progresiva.
- `assets/*.svg`: ilustraciones originales creadas para esta interfaz, no capturas reales de productos. `assets/og.png`: imagen social.
- `sistema/index.html`: biblioteca visual interactiva del sistema de diseño.
- `docs`: superprompt, documentación visual, estrategia de contenido y despliegue.
- `.github/workflows/pages.yml`: pruebas + publicación de GitHub Pages al hacer push a `main`.
- `tests/catalog.test.js`: pruebas de integridad del catálogo.

## Desarrollo

No requiere build ni Node para visualizarse. Para desarrollar en local:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

Para ejecutar pruebas:

```bash
npm run check
```

## Diseño y rendimiento

Sistema basado en DM Sans, DM Mono, fondo perla, blanco, verde bosque, acento lima y portadas cromáticas. GSAP y Three.js se cargan como **mejoras progresivas**; el sitio funciona sin ellos y respeta `prefers-reduced-motion`. La librería React Bits y Remotion se reservan para ampliaciones de producción y vídeos, no se presentan como dependencias activas de la versión estática. GStack es una disciplina de desarrollo, no una dependencia del navegador.

## No inventar evidencia

Las ilustraciones de proyectos son conceptuales, rotuladas como tales. Los estados son conservadores y no se publican métricas de conversión, ventas, clientes, testimonios o resultados no documentados. Para actualizar un proyecto edita `data.js`, enlaza evidencia real y revisa su estado. Para contenidos específicos, solicita permiso antes de publicar información de clientes no autorizada.

## Enlaces principales

- Código: https://github.com/deepanalytica/arestudio
- Portafolio anterior / fuentes: https://deepanalytica.github.io/archivo-tienda/portafolio/
- Sistema de diseño: https://deepanalytica.github.io/arestudio/sistema/

## Publicación

**Importante:** crear el workflow no activa automáticamente Pages en un repositorio nuevo. Se debe ir a `Settings → Pages` y seleccionar **GitHub Actions** como fuente, una única vez. En Actions se puede ejecutar manualmente "Deploy AR Studio to GitHub Pages". Verifica que la URL devuelva el sitio real antes de compartirla con clientes.