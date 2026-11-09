# AR Estudio V5 — Decisión de diseño, implementación y verificación
**Fecha:** 2026-11-08
**Origen:** Plan maestro (2026-11-08_PLAN_REDISENO_AR_ESTUDIO.md), v1.1
**Estado inicial:** implementación en rama, sujeta a QA y revisión visual
**Regla:** identidad actual intacta; siete swatches oficiales en brand/lab/index.html.

## 1. Conceptos editoriales comparados

Se plantearon tres direcciones de arquitectura y composición. Estas alternativas son conceptuales; no son mockups históricos ni pruebas A/B realizadas.

| Dirección | Ventaja | Riesgo | Decisión |
|---|---|---|---|
| A. Landing comercial, primero el problema | Mensaje y rutas útiles para clientes sin contexto | Retrasa galería; parece página de venta; oculta arte y criterio | Descartada como portada; se incorporan tres rutas después de casos |
| B. Electric Editorial, trabajo visible | Obra real primero, carácter de autor, exploración y propuesta clara | Exige cuidar espacio del hero y lectura móvil | **Elegida** |
| C. Laboratorio inmersivo de herramientas e IA | Expresa exploración técnica y motion experimental | Rendimiento, navegación y posible confusión de capacidades operativas | Reservada al laboratorio |

Se conserva logo y dirección Electric Editorial; trabajos visibles, colores propios por caso y progresión desde obras hasta método, archivo, perfil y contacto.

## 2. Cambios implementados

- **Portada**: investigación, exploración, dirección y construcción; comunicación, marketing, dirección de arte, datos, software y dirección de IA aparecen en la primera explicación.
- **Navegación**: Proyectos / Qué resuelvo / Cómo trabajo / Perfil / Contactar.
- **Cuatro destacados**: ARCHIVO, Deep Geo, Praxios OS y Visual Art AI; se mantienen enlaces, evidencias y estados.
- **Tres rutas**: inteligencia y decisiones; producto y sistemas; arte y comunicación; enlazan a casos del catálogo.
- **Dirección de arte**: material publicado Ownform y ALTO dentro de un caso editorial que explica criterio; no se atribuyen bocetos históricos ni conversiones.
- **Seis capacidades**: arte/creatividad, criterio/investigación, comunicación/marketing, datos, producto/ingeniería y dirección/verificación de IA.
- **Método**: investigar, explorar, decidir, dirigir, construir, verificar.
- **Dirección de IA**: diferencia ejecución de modelos de dirección humana; diagrama conceptual rotulado como tal.
- **Casos en modal**: decisiones creativas/técnicas antes que entregables; límites y evidencia continúan.
- **Perfil**: creatividad, marketing y dirección de IA explícitos sin alterar credenciales.
- **Contacto**: invitación a plantear un problema concreto.
- **QA**: nuevas aserciones para rutas, capacidades, paleta y primer viewport.

## 3. Siete colores editoriales invariables

Electric #245BFF, Violet #6236FF, Magenta #F12BBE, Orange #FF652F, Acid/verde lima #EFFF38, Glacier #F5FAFF, Ink #101729.

Los componentes consumen tokens existentes; no se propone una paleta adicional. Los otros tokens (hover, éxito, error, borde y superficie) son funcionales. Las cromáticas particulares de Deep Geo y ARCHIVO pertenecen a esos proyectos.

## 4. Procedencia y límites

- Los 21 casos conservan metadatos, estados y enlaces; el módulo editorial utiliza medios públicos presentes en data.js.
- Si un recurso de campaña externo falla, la imagen se oculta; no se sustituye por fotografía inventada.
- El diagrama de IA es explicativo, no una consola operativa ni una captura real.
- Las hipótesis de copy no son experimentos comerciales ganadores. No se instala analítica, cookies ni píxeles.
- Los sistemas internos no se anuncian como demostraciones públicas.
- Las imágenes y evidencias actuales siguen sujetas a validación de procedencia.

## 5. Contratos que deben mantenerse

- HTML/CSS/JS progresivos, sin migración React.
- Símbolo AR/ original, kit SVG y siete muestras de color del Lab intactos.
- Catálogo de 21 fichas, búsqueda, filtros, vista lista, modal, deep links con ?proyecto=ID, teclado y menú móvil.
- Capturas públicas del pipeline cuando están disponibles y fallback conceptual rotulado.
- Motion responsable, prefers-reduced-motion, GSAP opcional, sin scroll horizontal.

## 6. Gates antes de publicación

1. npm run check y auditoría de URLs públicas.
2. QA en navegador y capturas desktop 1440, tablet 768, móvil 390.
3. Primer proyecto destacado antes de 655 px en escritorio y 700 px en móvil, o revisión explícita del criterio si se justifica una variación.
4. Tres rutas, seis capacidades, seis pasos, dirección de arte demostrada, representación de IA rotulada.
5. Veintiún casos, siete swatches y veintiséis variantes de logo; sin errores JS ni regresiones en perfil, modal y búsqueda.
6. Inspección de capturas: legibilidad, contraste, jerarquía, desbordamiento, interacciones y accesibilidad.
7. Fusionar PR solamente tras gates y verificar GitHub Pages en main.
8. Si falla producción, revertir el squash; nunca sobrescribir archivos públicos manualmente.

**Impacto comercial no medido:** no atribuir cambios de conversión ni adquisición hasta disponer de instrumentación autorizada y tráfico real.
