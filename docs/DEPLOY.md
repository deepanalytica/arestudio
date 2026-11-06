# Publicación de AR Studio en GitHub Pages

Repositorio: https://github.com/deepanalytica/arestudio
URL de producción prevista: https://deepanalytica.github.io/arestudio/

## Activación una sola vez (requiere permisos de administrador)

1. Abrir el repositorio, luego `Settings` → `Pages`.
2. En `Build and deployment` → `Source`, seleccionar **GitHub Actions**.
3. Entrar en `Actions` → `Deploy AR Studio to GitHub Pages` → `Run workflow` → rama `main`.
4. Verificar que el job termina con estado `success` y abrir la URL de producción.

Una vez habilitado, los próximos pushes a `main` ejecutan las pruebas y actualizan el sitio automáticamente.

## QA antes de enviar a clientes

- Visitar inicio en desktop y móvil, asegurando que las tarjetas están a la vista.
- Buscar `Deep Geo`, filtrar `Datos`, volver a `Todos` y alternar entre vistas.
- Abrir fichas de proyectos, pulsar `Esc` y probar la URL `?proyecto=deep-geo`.
- Revisar que los enlaces externos abren una fuente válida.
- Verificar los botones de correo y WhatsApp.
- Confirmar que ningún texto promete resultados no acreditados.
- Si el entorno requiere pantalla compartida o captura automática, realizar una auditoría visual posterior; un build exitoso no demuestra accesibilidad ni QA en navegador.