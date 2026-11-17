# Ejecución verificada de Taste Skill — AR Estudio
**Fecha:** 17 de noviembre de 2026  
**Repositorio fuente:** [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)  
**Versión ejecutada:** 2.5.1, fijada al commit `f6b76575f949707b4e3c37cd86cb44b0b98643e8`.  
**Destino:** `comercial/index.html`, tipo `service`; identidad AR `brand/tokens.css`.

## Ejecución
La instalación **sí se ejecutó** en GitHub Actions, mediante `npx skills add … --skill design-taste-frontend -a codex --copy --yes`. El propio log confirma la carpeta `.agents/skills/design-taste-frontend` y la versión 2.5.1.

- [Primera ejecución: instalación y auditoría](https://github.com/deepanalytica/arestudio/actions/runs/44020403893); [artefactos](https://github.com/deepanalytica/arestudio/actions/runs/44020403893/artifacts/14301027237).
- [Segunda ejecución: auditoría de mejoras visuales](https://github.com/deepanalytica/arestudio/actions/runs/44021479696); [artefactos](https://github.com/deepanalytica/arestudio/actions/runs/44021479696/artifacts/14302105108).
- [Prueba de navegador del nuevo showroom comercial y servicios](https://github.com/deepanalytica/arestudio/actions/runs/44022057750): **success**, pruebas existentes y `scripts/qa-commercial.mjs` a 1440/1280/820/390/320 px. Se comprueba la decodificación de las capturas reales de la tienda, filtros, diálogos, navegación e integridad JavaScript.

## Resultados sin maquillar
| Comprobación | Resultado | Interpretación |
| --- | --- | --- |
| Instalación para Codex en runner | **PASS** | 2.5.1 confirmada. Es instalación por ejecución, **no en PC local**. |
| `copy-lint` | **PASS** | Sin FAIL; 1 WARN por numeraciones en pasos. |
| `consistency` completo | **TIMEOUT** (ambas ejecuciones) | No está validado: requiere segmentar la auditoría. |
| `perf` | **FAIL** | Imágenes sobredimensionadas/sin dimensiones y rutas de `assets/proof` ausentes en el runner de Taste. La auditoría inicial no generaba capturas; corregimos la preparación en el workflow para ejecuciones futuras. |
| `gate --quick` | **68 hallazgos FAIL** en segunda ejecución | No pasó el gate. Incluye reglas estéticas de Taste no aplicables como veto al tilt/variantes de tarjeta y hallazgos útiles: contraste, jerarquía, encuadres, CTA móvil. |
| QA propia en navegador (rama) | **PASS** | Verificación a cinco tamaños y prueba de imágenes locales de ejemplo. No sustituye una auditoría WCAG o datos de rendimiento real. |

*Algunas pruebas de rendimiento reportaron LCP/FCP bajos en Chrome virtual; no son métricas reales de usuarios y no deben usarse comercialmente.*

## Correcciones ya implementadas en rama
- Cambié el titular por una oferta más explícita: «Diseño, marketing y tecnología para tu negocio».
- Reemplacé vistas genéricas de los ocho servicios por fotografías, piezas y capturas auténticas de trabajos propios; las demos siguen etiquetadas.
- Incorporé una CTA de cotización en la primera vista móvil (antes se ocultaba junto a la columna derecha).
- Oculté el canvas Three.js hasta que el motor pueda dibujarlo, con fallback estable y sin mostrar un lienzo vacío.
- Amplié `visual-qa.yml` con prueba específica para la página comercial, las imágenes y sus interacciones.

## Límites y siguiente ciclo
La metodología de Taste Skill es una **referencia de calidad, no una receta estética a aplicar de forma dogmática**. Se conservaron los tokens, el azul eléctrico, los acentos existentes y la composición distintiva de AR. Lo siguiente a priorizar en una rama separada: mejorar contraste de textos, definir `width`/`height` para campañas y generar versiones ligeras para previews, comprobar navegación y foco con teclado, y volver a revisar desbordes de mockups de teléfono. No alterar ni inventar reseñas, métricas, ventas o resultados de clientes.

## Uso reproducible
Desde una copia local de este repositorio con Node 22+ y Chrome:

```bash
npm run taste:install
npm run taste:audit
```

La auditoría en GitHub Actions también puede ejecutarse manualmente desde **Actions → Taste Skill · Auditoría AR Estudio → Run workflow**. Su runner es de solo lectura y no despliega el sitio. La instalación en el equipo Windows del propietario requiere ejecutar los comandos allí; no se hizo a distancia.
