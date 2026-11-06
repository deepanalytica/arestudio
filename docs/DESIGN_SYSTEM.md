# AR/ Design System · Especificación v1

## Principios

1. **Trabajo visible antes del primer desplazamiento.** El visitante ve los cuatro proyectos principales desde la portada.
2. **Calma como valor.** Espacio en blanco, jerarquías claras, contraste y densidad bajo control.
3. **Identidad a través del trabajo.** Archivo es editorial-naranja, Deep Geo petróleo-turquesa, Praxios violeta estructural, Visual Art AI rosa/coral.
4. **Interacciones útiles.** Transiciones puntuales, estados comunicativos y navegación predecible.
5. **Evidencia honesta.** Distinguir demostraciones, sistemas internos y proyectos publicados.

## Tokens

| Rol | Token | Valor |
|---|---|---|
| Fondo | `--pearl` | `#f8f9f6` |
| Superficie | `--surface` | `#ffffff` |
| Superficie secundaria | `--mist` | `#f1f3ef` |
| Texto principal | `--ink` | `#142421` |
| Marca | `--forest` | `#0e3c34` |
| Marca profundo | `--pine` | `#092c27` |
| Texto secundario | `--muted` | `#65726c` |
| Acento | `--lime` | `#c5f779` |
| Acento luminoso | `--signal` | `#50d977` |
| Acentos de casos | `--lavender`, `--orange`, `--pink` | `#ddd4fa`, `#ff8b57`, `#f79ac2` |

Tipografías: DM Sans 400–800 para interfaz y titulares; DM Mono para etiquetas, categorías y metadatos.

Espaciado: progresión 4, 8, 12, 16, 24, 32, 48, 64, 96. Contenedor máximo 1480 px; ancho móvil con márgenes de 18 px. Radios 8/12/18/26/34. Sombras bajas y sin contaminación gris excesiva.

## Componentes funcionales

- Navegación fija con menú móvil, foco visible y saltar al contenido.
- Hero compacto para mostrar proyectos enseguida.
- Cards destacadas con área, título, estado y flecha.
- Índice con filtros de disciplinas, búsqueda normalizada y alternancia tarjetas/lista.
- Ficha de proyecto con `dialog` nativo, escape/cierre, URL compartible y evidencia.
- Enlaces directos a trabajos verificables y contacto.
- Espacio aparte `sistema/` para experimentos y catálogo visual.

## Motion

Revelados GSAP opcionales. Transformaciones breves 200–450 ms con easing suave; no retrasar el primer render, los proyectos ni el acceso al contacto. WebGL Three.js como capa decorativa opcional sobre arte SVG de fallback, sin afectar la información. Deshabilitar movimiento cuando el usuario active preferencias de reducción.

## Checklist para ampliar

- Reemplazar artes conceptuales por capturas autorizadas y actuales de cada producto.
- Añadir casos con resultados medidos cuando existan fuentes confiables.
- Verificar navegación teclado, contraste WCAG, rendimiento móvil y funcionamiento sin CDN.
- Crear versiones de video con Remotion solamente para casos que lo justifiquen; exportar vídeo a archivo en vez de cargar un motor pesado en cada card.
- Integrar componentes React Bits en una eventual migración React con pruebas y control del peso de página.
- Usar GStack como proceso de planificación, revisión de diseño y pruebas, no como capa visual obligatoria.