# Plan maestro de rediseño de AR Estudio
## Estrategia comercial, dirección de arte, criterio creativo, comunicación, marketing digital, ingeniería y dirección de IA

**Fecha:** 2026-11-08  
**Versión:** 1.1 — auditoría de paleta real y corrección de roles cromáticos  
**Estado:** DOCUMENTADO / IMPLEMENTACIÓN NO INICIADA  
**Repositorio:** https://github.com/deepanalytica/arestudio  
**Sitio existente:** https://deepanalytica.github.io/arestudio/  
**Perfil existente:** https://deepanalytica.github.io/arestudio/perfil/  
**Responsable del contenido y decisiones:** titular de AR Estudio  
**Propósito de este archivo:** permitir que otro agente comprenda el porqué, el qué, el orden, los límites y las pruebas de aceptación del rediseño sin repetir la investigación inicial.

> **INSTRUCCIÓN PRIORITARIA DEL TITULAR — CONSERVAR EL SISTEMA DE DISEÑO REAL DEL PORTAFOLIO.**
> El **Design System Lab** muestra exactamente **siete colores editoriales de identidad**: Electric `#245BFF`, Violet `#6236FF`, Magenta `#F12BBE`, Orange `#FF652F`, Acid (verde lima) `#EFFF38`, Glacier `#F5FAFF` e Ink `#101729`. No retirar, sustituir ni inventar tonos como si fueran colores de identidad. Los tokens funcionales y los colores particulares de cada proyecto se conservan en sus funciones, **pero no se suman a la paleta editorial**. No rediseñar logo AR/ ni alterar variables cromáticas sin autorización explícita.

---

## 0. Instrucciones de arranque para el siguiente agente

1. Leer **AGENTS.md**, **este documento**, **.agents/skills/brandkit/SKILL.md**, **brand/BRANDKIT_WORKFLOW.md**, **brand/PORTFOLIO_ART_DIRECTION.md**, **brand/COMUNICACION.md**, **brand/MANUAL_DE_MARCA.md**, **brand/tokens.json** y **brand/lab/index.html** (las siete muestras oficiales de la paleta).
2. Confirmar el estado actual de **main**. Este plan describe la versión observada el **2026-11-08**; los archivos pueden haber evolucionado. No asumir que los selectores ni la estructura siguen iguales.
3. Revisar visualmente la versión publicada y la de trabajo a **1440 × 900**, **768 × 950** y **390 × 844**. No inferir el diseño únicamente del HTML.
4. Mantener este documento como especificación de trabajo. Crear una rama de implementación independiente, producir una propuesta visual/UX verificable y **no fusionar a producción antes de pasar los gates** descritos aquí.
5. Usar exclusivamente evidencias verificadas del repositorio y páginas públicas. No mostrar capturas de productos internos que no existan ni atribuir clientes, campañas, ventas o conversiones no acreditadas.
6. El presente cambio documental **no autoriza a modificar código, colores, imágenes maestras o la web publicada**. La ejecución del rediseño es otra etapa.

### Orden de precedencia en caso de conflicto

1. Solicitudes explícitas y recientes del titular, especialmente **conservar la paleta vigente con verde y todos los colores**.
2. Estado real del código, tokens y archivos maestros existentes en main.
3. Reglas de identidad, accesibilidad, privacidad y evidencia del repositorio.
4. Este plan como especificación del rediseño.
5. Documentos antiguos de exploración; no reemplazan los tokens actuales si describen paletas pasadas.

**Atención sobre la deuda de CSS:** `styles.css` y `art-direction.css` conservan antiguas variables `--forest` y `--pine` con verdes oscuros. La portada actual las sobrescribe en `brand/site-theme.css` y capas posteriores con roles de la identidad Electric Editorial. **Esos hexadecimales antiguos no constituyen colores oficiales adicionales** ni justifican un regreso a la antigua paleta bosque. Deep Geo y otros casos también usan verdes propios de su dirección de arte: deben preservarse **dentro de cada proyecto**, no incorporarse como primarios de AR Estudio.

---

## 1. Decisión estratégica

### Tesis

**AR Estudio no debe parecer una lista de habilidades, un catálogo de herramientas de IA ni una landing agresiva de marketing.**

Debe demostrar que una misma dirección profesional puede **investigar problemas, encontrar relaciones en los datos, explorar soluciones originales, aplicar criterio, desarrollar conceptos, dirigir arte y comunicación, estructurar una estrategia de marketing digital, coordinar IA y construir sistemas o experiencias utilizables**.

La ventaja diferencial no es dominar muchas herramientas individualmente. Es **integrar investigación, criterio, creatividad y ejecución** para escoger y producir una solución adecuada al contexto.

### Objetivos de la web

- **Comprensión en segundos:** qué tipo de problemas resuelve y cómo interviene AR Estudio.
- **Prueba visible:** permitir abrir proyectos, materiales originales, prototipos y código sin navegar por un texto excesivo.
- **Expresión creativa:** demostrar dirección de arte con ideas visuales distintas para cada proyecto, no plantillas genéricas.
- **Confianza:** decisiones explicadas, alcances concretos, estado verdadero de cada sistema y fuentes reales.
- **Contacto cualificado:** facilitar conversaciones sobre encargos y colaboraciones pertinentes.
- **Doble utilidad:** funcionar tanto para posibles clientes como para equipos que evalúan experiencia profesional para una contratación.

### Lo que NO buscamos

- Convertir la portada en una carta de venta interminable.
- Dar apariencia de agencia con equipos, clientes o resultados que no están acreditados.
- Presentar imágenes conceptuales como capturas de producto.
- Confundir un demo, un dossier, una investigación, un prototipo privado y un producto operativo.
- Reducir el perfil a «software + datos» y ocultar creatividad, comunicación o dirección de IA.
- Recargar la web con animaciones, módulos decorativos, modales innecesarios o copy grandilocuente.
- Sustituir la identidad visual existente por otra nueva.

---

## 2. Conocimiento aplicado de copywriting y marketing

La investigación previa examinó **Scientific Advertising** (Claude C. Hopkins), **The Robert Collier Letter Book** (Robert Collier), **Tested Advertising Methods** (John Caples), **How to Write a Good Advertisement** (Victor O. Schwab), **The Boron Letters** (Gary Halbert), **The Lazy Man's Way to Riches** (Joe Karbo), **Breakthrough Advertising** (Eugene Schwartz), **7 Steps to Freedom** (Ben Suarez) y el archivo **The Gary Halbert Letter**. Como referencias complementarias se revisaron **The First Hundred Million** (E. Haldeman-Julius) y **My Life in Advertising** (Hopkins).

**Precisión de fuentes:** la carta original examinada de Halbert no demuestra una lista exacta de «once libros». Además, no se ha afirmado la lectura íntegra de todas las ediciones. Estos principios son una síntesis de obras, materiales y referencias consultadas; **no constituyen garantías de conversión**.

| Autor o enfoque | Principio aplicable | Traducción a AR Estudio |
|---|---|---|
| Gary Halbert | Comprender mercados y deseos reales antes de escribir | Empezar por el problema del visitante y por ejemplos verificables |
| Eugene Schwartz | Diferentes niveles de conciencia y sofisticación del mercado | Crear accesos para quien llega con un problema y para quien compara profesionales |
| Robert Collier | Partir de preocupaciones y motivaciones del lector | Hablar de tareas, consecuencias y decisiones, no solo de disciplinas |
| Victor Schwab | Atención → beneficio → demostración → acción | Titular claro, caso visible, evidencia y CTA explícito |
| Claude Hopkins | Prueba comercial y medición | Medir señales de exploración y consultas de calidad; no confundir visitas con negocios |
| John Caples | Probar mensajes y titulares | Diseñar alternativas de copy para testear, no declarar un «ganador» sin datos |
| Joe Karbo | Validación de oferta antes de gran inversión | Probar la comprensión de la propuesta profesional antes de implementar todo |
| Ben Suarez | Coherencia mercado, medio y mensaje | Diferenciar visitantes según necesidad sin fragmentar toda la identidad |
| E. Haldeman-Julius | El nombre y la presentación construyen expectativas | Titular cada caso con su utilidad concreta y cumplir lo prometido |

### Principios editoriales operativos

- **Problema antes que herramientas.**
- **Resultado observable antes que proceso técnico extenso.**
- **Pruebas antes que afirmaciones de autoridad.**
- **Selección antes que acumulación de contenido.**
- **Un CTA comprensible antes que cinco rutas equivalentes.**
- **Persuasión informativa, sin miedo exagerado, falsa escasez ni testimonios inventados.**

No escribir mensajes como «revoluciono negocios con IA» o «multiplico ventas» sin soporte. Preferir expresiones precisas, naturales y seguras.

---

## 3. Posicionamiento y arquitectura de valor

### Posicionamiento propuesto

**AR Estudio — Dirección creativa, inteligencia y tecnología.**

**Descripción extendida:**

> Integro análisis de datos, investigación, dirección de arte, comunicación y marketing digital con arquitectura de software y dirección de inteligencia artificial. Exploro alternativas, tomo decisiones con criterio y construyo soluciones que se puedan entender, utilizar y verificar.

Es una propuesta de texto, **no una promesa de resultados ni un copy definitivamente aprobado**. Debe contrastarse con usuarios y comprobar que su lectura es directa.

### Seis capacidades que deben permanecer visibles

| Capacidad | Qué aporta | Ejemplos de evidencia o caso |
|---|---|---|
| **1. Dirección de arte y creatividad** | Conceptualización, exploración visual, identidad, tipografía, narrativa, composición, campañas y producción audiovisual | ARCHIVO, WAL, Visual Art AI |
| **2. Criterio, investigación y exploración de soluciones** | Problema, contexto, fuentes, hipótesis, comparaciones, alternativas y justificación de decisiones | Deep Geo, Radar Conv OS, Inverse Reality Lab |
| **3. Comunicación y marketing digital** | Investigación de audiencias, posicionamiento, copywriting, contenidos, creatividad publicitaria, rutas de contacto y experimentos | Visual Art AI, WAL, ARCHIVO, Conv OS/Radar |
| **4. Datos e inteligencia estratégica** | Cruce de fuentes, análisis geoespacial, visualizaciones, patrones, evidencia y apoyo a decisiones | Deep Geo, GeoAnalytica, Radar Conv OS |
| **5. Diseño de producto e ingeniería** | UI/UX, arquitectura de software, interfaces, automatización, pruebas y sistemas operativos | Conv OS, Praxios, MSJ, Atalaya |
| **6. Dirección de inteligencia artificial** | Selección y coordinación de modelos/agentes, objetivos y restricciones, revisión de outputs, verificación y gobernanza | Praxios OS, Meta Harness, Atalaya, Euler |

**No reducir estas seis capacidades a tres.** Puede haber tres rutas comerciales de entrada para simplificar navegación, pero la sección profesional, el perfil y los casos deben mostrar el conjunto completo. La investigación y el criterio son **transversales**, no una cuarta herramienta.

### Distinción crítica: «dirección de IA»

No equiparar la dirección de IA con escribir prompts. Mostrar el proceso profesional: definir objetivos, seleccionar herramientas, establecer contexto y referencias, construir flujos y controles, comparar resultados y validar con criterio humano. En creatividad, dirección visual y consistencia; en sistemas, trazabilidad, contratos, permisos y pruebas. No proclamar autonomía operativa de sistemas internos sin evidencia.

---

## 4. Públicos, motivaciones y arquitectura de entrada

### Dos grupos que deben reconocer su lugar

**A. Cliente potencial**
- Quiere entender si AR Estudio puede ayudar con un problema.
- Necesita casos pertinentes, alcance concreto y contacto fácil.
- No tiene por qué conocer términos como GIS, harness, LLM o estados de agentes.

**B. Evaluador de talento / colaborador**
- Quiere ver qué hace la persona, trayectoria, responsabilidades, calidad de criterio y autonomía.
- Necesita profundizar en proceso, decisiones de arquitectura, dirección creativa y fuentes.
- Requiere un perfil profesional claro sin desplazar los proyectos de la portada.

Ambos navegan el mismo sitio. No construir dos sitios ni dos sistemas de marca independientes en esta fase.

### Tres rutas por problema, no como sustituto de las seis capacidades

1. **Necesito entender información y tomar mejores decisiones.** Datos, investigación, mapas, visualizaciones. Casos: Deep Geo, Radar.
2. **Necesito ordenar procesos o construir un producto.** Software, interfaces, sistemas y agentes dirigidos. Casos: Conv OS, Praxios, MSJ.
3. **Necesito que mi marca, producto o servicio comunique mejor.** Creatividad, dirección de arte, contenidos y marketing. Casos: ARCHIVO, Visual Art AI, WAL.

Cada ruta debe responder en lenguaje cotidiano: **problema → intervención → caso verificable**. Los nombres de herramientas aparecen en el detalle, no en los titulares de entrada.

---

## 5. Arquitectura de información propuesta

**Orden editorial recomendado en la portada:**

1. **Hero de posicionamiento** con nombre/identidad reconocibles, propuesta de valor breve y proyectos a un clic.
2. **Selección de trabajos destacados** en el primer recorrido visual; no esconder la galería detrás de explicaciones largas.
3. **Tres problemas que abordo** con acceso directo a los casos pertinentes.
4. **Muestras de proceso y exploración creativa**: del encargo a distintas opciones, decisión y resultado. Solo con material real.
5. **Seis capacidades conectadas**, presentadas con criterio editorial breve; ampliar al pulsar.
6. **Método y dirección de IA**, incluyendo decisión y verificación, en formato visual comprensible.
7. **Catálogo completo de 21 proyectos** con búsqueda, filtros, estados y accesos.
8. **Trayectoria / perfil** con enlace al perfil profesional detallado, sin repetirlo íntegro.
9. **Contacto** con un siguiente paso claro, correo y WhatsApp funcionales.

**Excepción importante:** conservar proyectos destacados visibles desde el primer viewport, como exige el diseño actual. Si el hero y las rutas quedan demasiado altos, reordenar o compactar; **no sacrificar la visibilidad del trabajo** para exponer todo el manifiesto. La propuesta definitiva debe probarse en móvil y escritorio antes de codificarse.

### Navegación primaria recomendada

**Proyectos · Qué resuelvo · Cómo trabajo · Perfil · Contactar.**

El catálogo completo puede estar dentro de Proyectos; no es necesario duplicar «Proyectos» y «Todos los casos» como opciones equivalentes de primer nivel si existe una navegación interna clara.

### Diseño de la primera pantalla

**Principio:** una idea central, identidad visual reconocible, dos llamadas a la acción realmente diferentes y un adelanto visible del trabajo.

**Opción A (centrada en capacidad; propuesta preferida para prototipar):**
- H1: **«Cruzo datos. Exploro ideas. Construyo soluciones.»**
- Descripción: «Investigo problemas, dirijo procesos creativos y tecnológicos, y desarrollo experiencias, comunicación y herramientas digitales que se pueden evaluar.»
- CTA principal: **«Ver proyectos»**
- CTA secundaria: **«Conversemos»**
- Firma/descriptor compacto: **«AR Estudio · Dirección creativa, inteligencia y tecnología»**.

**Opción B (centrada en intervención profesional):**
- H1: **«Investigación, dirección creativa y tecnología, conectadas.»**
- Descripción: «Desde estrategia de comunicación y dirección de arte hasta análisis de datos, software y sistemas dirigidos con IA. El punto de partida es el problema, no la herramienta.»
- CTA principal: **«Explorar casos»**
- CTA secundaria: **«Ver perfil»**.

No introducir «Soy Alexis Reyes» como H1 de la portada; el nombre pertenece a la firma y al perfil. No elegir la versión ganadora únicamente por intuición o preferencia del agente: comparar claridad y utilidad en revisión visual y, más adelante, en experimentos con tráfico real si corresponde.

---

## 6. Dirección de arte: identidad existente, exploración nueva

### Restricción innegociable: sistema cromático vigente

**Corrección de auditoría (2026-11-08):** La versión 1.0 cometía un error al presentar colores funcionales (`color-blue-dark`, `color-success`, etc.) en la misma tabla que los colores de la identidad, dando a entender que todos formaban la paleta de marca. **No es correcto.**

**Tres fuentes de verdad, verificadas en `main`:**

1. **Paleta editorial visible en `brand/lab/index.html`**: lista de siete botones `.swatch[data-color]`, etiquetados Electric, Violet, Magenta, Orange, Acid, Glacier e Ink.
2. **`brand/MANUAL_DE_MARCA.md`, sección Color:** primarios Electric/Glacier/Ink y cuatro intensificadores (Violet/Magenta/Orange/Acid). Establece que *no deben aparecer los siete al mismo tiempo en todos los componentes*.
3. **`brand/tokens.json`**: contiene los siete colores **más** variantes de interacción, colores utilitarios y tokens semánticos. **Un token existente no equivale a un color editorial principal.**

#### A. Los siete colores **oficiales de la paleta editorial**

| Nombre oficial en el Lab | Token canónico | Hexadecimal | Rol de marca |
|---|---|---|---|
| **Electric** | `color-blue` | **`#245BFF`** | Azul eléctrico; señal/acción dominante |
| **Violet** | `color-violet` | **`#6236FF`** | Intensificador; profundidad y contraste |
| **Magenta** | `color-magenta` | **`#F12BBE`** | Intensificador; energía editorial |
| **Orange** | `color-orange` | **`#FF652F`** | Intensificador; campañas y contraste |
| **Acid** | `color-lime` | **`#EFFF38`** | **Verde lima que exige conservar el titular**; acento expresivo |
| **Glacier** | `color-glacier` | **`#F5FAFF`** | Fondo claro principal |
| **Ink** | `color-ink` | **`#101729`** | Texto, contraste y fondos oscuros |

**Esta es la paleta de marca, no ocho colores ni una colección de todos los hexadecimales del CSS.** Los siete se conservan tal cual, sin inventar variantes de marca ni adoptar paletas anteriores.

#### B. Otros tokens existentes que **no son muestras principales de identidad**

| Token | Valor actual | Uso correcto |
|---|---|---|
| `color-blue-dark` | `#173EC9` | Hover/estado de interacción del azul, **no octavo color de marca** |
| `color-success` | `#146C52` | **Verde semántico para éxito**, **no verde principal de la identidad** |
| `color-danger` | `#B02B4D` | Estados de error |
| `color-warning` | `#805300` | Estados de advertencia |
| `color-paper` | `#FFFFFF` | Superficies blancas |
| `color-ice` | `#EAF0FF` | Superficies secundarias |
| `color-muted` | `#43516C` | Texto secundario |
| `color-border` | `#DCE5F7` | Bordes y divisiones |

**Conservar** todos los tokens técnicos en el CSS/JSON vigente; **no** usarlos indiscriminadamente como colores de decoración ni añadirlos a los siete swatches oficiales.

#### C. Colores de las obras y capas CSS heredadas

La página carga, en este orden, `styles.css`, `art-direction.css`, `brand/site-theme.css`, `brand/portfolio-v3.css`, `brand/case-studies.css`, `brand/portfolio-ux-v4.css` y `brand/profile-spotlight.css`. Los primeros contienen parte de la antigua paleta bosque, mientras que las capas posteriores implementan la identidad eléctrica actual. **No elegir colores por encontrar una declaración antigua sin comprobar su precedencia y si afecta realmente a un elemento.**

Las portadas de **Deep Geo, ARCHIVO, Praxios y Visual Art AI** poseen cromáticas propias; por ejemplo, Deep Geo usa verdes oscuros y verde claro en su composición. Son **colores de proyecto**, no nuevas muestras de AR Estudio. Respetar cada universo.

#### D. Regla de aplicación

- Mantener los **siete** tonos editoriales y la misma jerarquía visual, con **Acid/verde lima visible en aplicaciones justificadas**.
- No convertir el sitio en un monocromo azul y glaciar ni saturarlo con los siete colores a la vez.
- Mantener las funciones de los tokens semánticos y la identidad de cada caso.
- Mantener marca, logo y barra slash del kit oficial.
- Antes de cambiar estilos, comprobar **computed styles** de los elementos clave con navegador real y contrastar con capturas actuales, porque el CSS está estratificado.
- No actualizar `brand/tokens.json`, `brand/tokens.css` ni la galería de swatches sin una solicitud explícita de rebranding.
- No interpretar `#146C52` como «el verde de la marca»: el verde editorial oficial es **`#EFFF38`**.

### Lenguaje visual

- Dirección **Electric Editorial**: tipografía Archivo en pesos 400/700/900 con jerarquía deliberada; DM Sans para lectura; IBM Plex Mono solo para detalles y datos.
- **Composición de autor**, no diseño SaaS genérico: alternar silencios visuales, imágenes reales contundentes, escalas tipográficas, retículas modulares, intervenciones experimentales y bloques de información.
- **Una idea visual por pieza o caso**; conservar el lenguaje propio de ARCHIVO, Deep Geo, Praxios, Visual Art AI, WAL y demás proyectos.
- Mostrar el trabajo como **artefactos**: campañas completas, interfaces capturadas, fichas de decisiones, secuencias de exploración, mapas, microvideos o diagramas pertinentes.
- La animación se justifica si ayuda a **comprender relaciones, explorar alternativas o leer estados**. Hover, foco, cambios de vista, revelados y scrolling deben ser funcionales.
- No construir una intro que dificulte entrar. No usar efectos CRT si perjudican nitidez; son una dirección experimental opcional, no el estilo obligatorio.
- Mantener logo y slash SVG originales. No redibujar con IA ni modificar proporciones.

### Cómo mostrar creatividad y criterio sin inventar proceso

Para los casos con evidencia, crear un módulo editorial **«Exploración → decisión → ejecución»**:

- **Problema o encargo:** qué había que resolver.
- **Referencias / investigación:** qué señales y materiales realmente se revisaron.
- **Alternativas consideradas:** mostrar solo exploraciones documentadas; si aún no existen, no falsificar «bocetos históricos».
- **Decisión y motivo:** por qué se eligió ese enfoque, qué se descartó y bajo qué restricciones, si está acreditado.
- **Resultado visible:** obra, web, interfaz, campaña, demo o sistema publicado.
- **Evidencia y límites:** qué puede comprobar el visitante y qué sigue siendo experimental.

Se permite generar **nuevas exploraciones de dirección de arte como propuesta futura**, siempre rotuladas como **exploración nueva 2026** y nunca como parte histórica del proyecto.

---

## 7. Fichas de proyectos: sistema editorial de evidencia

Estado al 2026-11-08, verificado en repositorio:
- **21 proyectos** en data.js y **21 caseStudies** con problema, contribución, decisiones, entregables y límites.
- **9 proyectos** con capturas públicas generadas por scripts/capture-public-evidence.mjs.
- Auditoría previa de **18/18 destinos públicos accesibles** en el workflow de esa fecha. Revalidar en cada nueva ejecución; es una constatación histórica, no promesa de disponibilidad perpetua.
- Modal con URL compartible **?proyecto=ID**, acceso desde tarjetas, cierre con teclado y enlaces verificados según el caso.

### Plantilla de una ficha rediseñada

1. **Obra / demo / captura real visible**; estado inequívoco.
2. **Frase de utilidad concreta:** qué tarea permite hacer, comprender o comunicar.
3. **Contexto y problema**, en lenguaje no técnico.
4. **Qué hice personalmente**, sin apropiarse de resultados de otros.
5. **Exploración y dirección de arte**: alternativas, ángulos, creatividad y criterios disponibles.
6. **Decisiones clave**: por qué ese mensaje, interfaz, método o tecnología.
7. **Qué se construyó y evidencia**: material verificable, sin adornos ni métricas ficticias.
8. **Límites y siguiente paso**: abrir demo real, examinar fuente, conversar.

### Casos priorizados para rediseño profundo

- **ARCHIVO:** identidades para 12 marcas, dirección de arte de colecciones, sistema editorial y tienda; mostrar arte real y navegabilidad.
- **Visual Art AI:** investigación de oferta, posicionamiento, estructura de mensaje, UX y ruta de contacto; evitar claims de rankings o conversiones sin datos.
- **WAL:** campañas por ocasiones, copy y piezas visuales; mostrar diferentes conceptos y formatos efectivamente existentes.
- **Deep Geo:** cruce de datos y territorios, visualización GIS, hipótesis y criterio de priorización; no simular un GIS operativo público.
- **Praxios / Meta Harness:** dirección de agentes, arquitectura de control, estados y evidencias; distinguir dossier de consola privada.
- **Conv OS / Radar:** producto, flujos y evaluación comercial; demos con datos ficticios y sin ventas atribuidas.

El resto de los 21 casos debe conservarse y mantenerse accesible. No borrar proyectos ni sustituir las fichas individualizadas por textos genéricos.

### Política de medios

- Capturas públicas existentes: assets/proof/ + manifiesto con procedencia.
- Piezas originales de campañas: fuentes del proyecto, con texto alternativo y descripción.
- Arte conceptual: etiqueta **«Representación conceptual»**.
- I+D sin interfaz pública: diagramas o fichas de investigación, **nunca capturas falsas**.
- Material interno o sensible: no publicar sin permiso explícito.

---

## 8. Experiencia de usuario, microinteracciones y estados

### Navegación y descubrimiento

- Máximo dos CTA en el hero, con destinos distintos y verificables.
- Todos los proyectos destacados deben abrir una ficha con un clic; las demos verificadas deben tener su propio enlace.
- En móvil, evitar carruseles que oculten casos sin indicar navegación. Si hay un carrusel, mostrar posición, controles accesibles y alternativa.
- Búsqueda, filtros y vistas conservan estado y foco. Exponer resultados y opción de limpiar filtros.
- Navegación principal con estado de sección actual donde corresponda y nombres claros.

### Estados obligatorios

| Componente | Estados y comportamiento a verificar |
|---|---|
| Enlaces / CTA | Default, hover, focus-visible, active, visited cuando corresponda; href real |
| Botones | Default, hover, focus-visible, active; disabled y busy solo si existen acciones asíncronas |
| Menú móvil | Abierto/cerrado, aria-expanded, Escape, devolución del foco y cierre al elegir |
| Filtros | Activo/inactivo, aria-pressed, foco conservado al renderizar |
| Búsqueda | Vacío, texto, sin resultados, limpieza, retorno a catálogo |
| Ficha dialog | Apertura, scroll, foco inicial, trap nativo, Escape, cierre, restauración de foco y deep-link |
| Compartir | Disponible, cargando, éxito o error honesto; nunca afirmar copia sin confirmación |
| Capturas | Cargada con etiqueta correcta o fallback conceptual identificado |
| Enlaces externos | Etiqueta que indique demo, fuente, dossier, publicación o repositorio |
| Motion | Reducido, ausencia de dependencias CDN y degradación progresiva |

### Auditoría técnica concreta de la versión actual

- **Corregir la incongruencia de destino del CTA «Ver trayectoria»** si sigue apuntando a #que-hago en lugar de /perfil/.
- Revisar selectores y capas CSS, para evitar acumulación de overrides.
- No introducir JS que asuma que querySelector devuelve listas: utilizar correctamente los helpers de la base.
- Verificar navegación y modales con teclado y lector de pantalla.
- Mantener un primer viewport con proyectos reconocibles, aun después de mejorar el copy.
- Revisar enlaces internos desde /perfil/, filtros, URL con ?proyecto= y botones de contacto.
- No confundir estilo de la marca madre con el estilo del proyecto mostrado.

---

## 9. Perfil, trayectoria y credenciales

El perfil independiente **/perfil/** ya existe. Debe ser la fuente preferente para la biografía y antecedentes.

La portada **no** repite un CV largo, pero mantiene acceso inmediato al perfil.

Conservar:
- Identidad profesional con nombre completo en la sección de perfil.
- Trayectoria en comunicación institucional y editorial, según evidencias actuales.
- Formación en Data Science identificada como **en curso**, no como título terminado.
- Certificaciones Anthropic solo con formulación comprobable.
- Participación de Deep Geo en NVIDIA Inception sin presentarla como certificación de calidad del producto.
- Accesos a trabajos, demostraciones, fuentes y contacto.

En el perfil, hacer visibles creatividad, dirección de arte, investigación comercial, estrategia y comunicación, marketing digital y dirección de IA, no solo especialidades de ingeniería.

No agregar remuneración, disponibilidad ni afirmaciones de desempeño laboral sin autorización y evidencia.

---

## 10. Marketing digital y medición

### Objetivo de conversión principal

**Consulta cualificada** que describa un problema, proyecto o colaboración pertinente.

### Señales para instrumentación futura

- Apertura de un caso y profundidad de exploración (eventos agregados, si se habilita analítica).
- Apertura de demo o fuente.
- Clic de correo y WhatsApp.
- Interacción con rutas por problema.
- Consultas entrantes cualificadas y su procedencia declarada.
- Propuestas o reuniones realmente originadas en la web, cuando puedan atribuirse de forma legítima.

**No** tomar clics como ventas, formularios como clientes ni CTR como rentabilidad. No inventar baseline ni porcentajes de mejora.

### Hipótesis a comprobar

- H1: un titular que describe capacidades **y problemas** mejora la comprensión frente a un inventario de disciplinas.
- H2: casos con obra visible y decisión argumentada generan más exploración cualificada.
- H3: tres rutas por problema reducen la incertidumbre de quien no domina el vocabulario técnico.
- H4: una explicación específica de dirección de IA diferencia el servicio sin exagerar automatización.

Son hipótesis, no resultados. Validar primero en pruebas de comprensión y usabilidad, después con métricas si existe tráfico suficiente.

### Privacidad

No instalar píxeles de anuncios, cookies analíticas, automatizaciones, formularios que almacenen datos o conectores externos nuevos sin aprobación. Si se implementan, definir consentimiento, minimización de datos, seguridad, accesibilidad y documentación.

---

## 11. Archivos relevantes para implementación

| Fuente | Función y riesgo |
|---|---|
| AGENTS.md | Instrucciones para agentes; debe señalar este plan |
| brand/tokens.json y brand/tokens.css | **Fuente de verdad de la paleta y tipos. No alterar sin aprobación** |
| brand/assets/mark.svg y brand/logo-kit/manifest.json | Identidad y variantes maestras: no redibujar |
| brand/BRANDKIT_WORKFLOW.md | Normas de extensión, no rebranding |
| brand/COMUNICACION.md | Voz, narrativa y límites |
| brand/PORTFOLIO_ART_DIRECTION.md | Dirección Electric Editorial existente |
| index.html | Portada, secciones, CTAs y proyectos destacados |
| data.js | 21 proyectos y caseStudies con evidencia |
| app.js | Catálogo, modal, filtros, deep-links, interacciones |
| perfil/index.html y perfil/perfil.css | Trayectoria y perfil |
| styles.css, art-direction.css | Bases actuales de presentación |
| brand/site-theme.css, brand/portfolio-v3.css, brand/portfolio-ux-v4.css, brand/profile-spotlight.css | Capas de identidad/UX; evitar contradicciones y overrides innecesarios |
| brand/case-studies.css | Diseño de fichas y pruebas |
| assets/proof/ y scripts/capture-public-evidence.mjs | Capturas reales con procedencia y fallback |
| scripts/audit-public-links.mjs | Auditoría de destinos públicos |
| tests/catalog.test.js y tests/browser-qa.mjs | Contratos de catálogo, navegación y responsive |
| .github/workflows/visual-qa.yml y .github/workflows/pages.yml | Gates y despliegue |
| docs/ART_DIRECTION_V2.md, docs/DESIGN_SYSTEM.md | **Históricos**: comprobar desactualización cromática frente a tokens reales |

**Advertencia:** el repositorio usa HTML, CSS y JS sin framework en producción; GSAP como mejora progresiva y demos visuales selectivas. React Bits y Remotion no son necesarios para esta fase. No migrar a React sin justificación comprobable, presupuesto de peso y pruebas de build/Pages.

---

## 12. Plan de ejecución por fases — pendiente de autorización

### Fase 0 — Inventario y línea base

**Trabajo:** capturar estado actual, enlaces, métricas técnicas reproducibles y componentes. Mapear qué puede reutilizarse. Revisar contraste con la paleta conservada.

**Entregables:** auditoría de UX y dirección de arte; mapa de rutas; inventario de materiales reales; capturas de 3 viewports; lista de riesgos.

**Gate:** contenido, accesibilidad y evidencia inventariados. Ninguna modificación visual en producción.

### Fase 1 — Concepto y dirección de arte

**Trabajo:** desarrollar **2–3 direcciones compositivas** usando el logo, la paleta completa y las tipografías existentes. Explorar variantes de primera pantalla, ritmos editoriales, composición de imágenes, copy y navegación. No hacer tres paletas nuevas.

**Entregables:** comparativa de propuestas con razón editorial, wireframe móvil/escritorio, jerarquía visual, decisiones y descarte documentado.

**Gate:** dirección seleccionada con justificación, incluida la visibilidad del trabajo en el primer viewport.

### Fase 2 — Narrativa, copy y arquitectura

**Trabajo:** definir titular, subtexto, rutas por problema, microcopy, CTA y capacidades. Reescribir casos clave desde problema, exploración, decisión y evidencia.

**Entregables:** mapa de contenido de portada y perfil; copys listos; matriz de pruebas por afirmación; especificación de casos.

**Gate:** lectura natural y directa, sin grandilocuencia ni claims falsos. Las seis capacidades siguen visibles.

### Fase 3 — Prototipo funcional aislado

**Trabajo:** implementar en rama independiente la nueva estructura y componentes, con estilos derivados de tokens existentes. No modificar rutas vivas ni eliminar funcionalidades.

**Entregables:** home, navegación, rutas de problema, casos prioritarios, catálogo y perfil integrados; estados funcionales; fallback visual.

**Gate:** accesibilidad, navegación, revisión de textos y estados aprobados. Ninguna pérdida del catálogo ni de demos.

### Fase 4 — QA multidimensional y revisión

**Trabajo:** pruebas visuales, semánticas, enlaces, interacción, rendimiento y evidencia. Comparar frente a línea base.

**Entregables:** reportes, capturas, diferencias y lista de issues resueltos.

**Gate:** cumplir todos los criterios de aceptación de la sección 13. No fusionar a main si falla un gate crítico.

### Fase 5 — Publicación reversible

**Trabajo:** PR pequeño o secuencia de PRs con revisión, fusionar a main solo con autorización del flujo y QA completo. GitHub Pages existente ejecuta despliegue en push.

**Entregables:** commit rastreable, reporte de CI, verificación de URL pública y plan de rollback.

**Gate:** confirmar estado success de Pages y QA en el SHA publicado. Si falla, revertir commit mediante flujo GitHub verificable; no hacer cambios manuales opacos sobre producción.

---

## 13. Criterios de aceptación verificables

### Identidad y arte

- [ ] **Siete swatches reales del Design System Lab** intactos y correctamente clasificados: `#245BFF`, `#6236FF`, `#F12BBE`, `#FF652F`, `#EFFF38`, `#F5FAFF`, `#101729`.
- [ ] `brand/tokens.json` y variables derivadas sin cambios de valores salvo aprobación explícita.
- [ ] **Acid/verde lima #EFFF38** conservado como acento visual de marca; **#146C52** conservado solo como token semántico de éxito, no incorporado a la paleta editorial.
- [ ] Los colores particulares de casos (p. ej. verdes de Deep Geo) permanecen en cada universo visual; ningún color legado de `styles.css` se confunde con paleta activa.
- [ ] No se redibuja el logo ni se deforma el slash; se usan SVG oficiales.
- [ ] Mínimo dos direcciones creativas exploradas y comparadas antes de escoger una.
- [ ] Cada caso destacado posee imagen, composición y narrativa reconocibles, no un mockup genérico.

### Comunicación y estrategia

- [ ] Hero comunica función profesional y diferencia sin «Soy Alexis...» como H1.
- [ ] Dirección de arte, creatividad, exploración, criterio, comunicación, marketing digital y dirección de IA tienen visibilidad real.
- [ ] Tres rutas por problema conducen a casos pertinentes y no sustituyen las seis capacidades.
- [ ] Copy natural, seguro y específico, sin resultados inventados.
- [ ] Perfil y trayectoria accesibles desde portada y navegación.

### Proyectos y evidencia

- [ ] Se mantienen **21 proyectos y 21 fichas**; no se pierden filtros, búsqueda ni deep-links.
- [ ] Cuatro casos principales siguen accesibles de inmediato; los demás mantienen un índice visible.
- [ ] Capturas reales con procedencia y fallbacks cuando corresponda.
- [ ] Distinción clara entre producción, demo, dossier, investigación e interno.
- [ ] No se generan cifras, clientes, pruebas sociales ni comparativas ficticias.

### UX y robustez

- [ ] QA responsive en **1440 × 900, 768 × 950, 390 × 844**.
- [ ] Primer bloque de proyectos visible en la primera pantalla en desktop y móvil, usando el límite vigente como baseline (en última QA previa: aprox. 648 px desktop y 621 px móvil). Si se cambia, justificar mejora y comprobar que el visitante todavía reconoce trabajo relevante sin desplazamiento significativo.
- [ ] Sin scroll horizontal.
- [ ] Enlaces y botones con nombres accesibles, estados hover/focus/active, acción real y destino correcto.
- [ ] Menú móvil, filtros, búsqueda, vistas y diálogos con teclado/Escape y foco controlados.
- [ ] prefers-reduced-motion respetado; interacción esencial funciona sin GSAP.
- [ ] Sin errores JS ni enlaces rotos detectados por QA.
- [ ] Rendimiento móvil no empeora de forma importante por decoraciones, imágenes o librerías; medir antes y después.

### Publicación

- [ ] npm run check aprobado.
- [ ] Browser QA y auditoría de enlaces aprobadas.
- [ ] Revisión editorial y visual aprobada.
- [ ] PR rastreable; despliegue de Pages exitoso y web pública verificada.
- [ ] Riesgos, cambios y plan de reversión documentados.

---

## 14. Riesgos y decisiones preventivas

| Riesgo | Consecuencia | Prevención |
|---|---|---|
| Exceso de contenido en la portada | Proyectos invisibles, abandono temprano | Hero corto, casos visibles y contenido por expansión |
| Simplificación excesiva a «datos/software» | Se pierde diferenciación creativa y de marketing | Seis capacidades + dirección de arte integrada |
| Convertir el portafolio en una carta de venta | Pérdida de credibilidad profesional | Persuasión basada en casos y evidencia, sin presión artificial |
| Confundir color de marca, color de estado o CSS heredado | Dirección de arte incoherente y swatches falsos | Partir de los siete swatches del Lab, conservar tokens semánticos en su función y revisar cascada CSS |
| Mostrar exploraciones inventadas como trabajo realizado | Riesgo reputacional | Proveniencia, fechas y etiquetas explícitas |
| Atribuir a IA trabajo que fue dirección humana, o viceversa | Confusión de responsabilidades | Explicar roles, dirección y validación sin sobreprometer |
| Demasiadas animaciones | UX lenta o inaccesible | Motion con causa, reduced motion y fallback |
| Fuentes o assets privados expuestos | Privacidad y propiedad intelectual | Inventario de fuentes y revisión previa |
| Cambios que rompen catálogo o enlaces | Pérdida de material y acceso a clientes | Pruebas, branch/PR y rollback |
| Instrumentación sin consentimiento | Riesgo de privacidad | Gate explícito antes de añadir tracking |

---

## 15. Definición de terminado y mandato final

El rediseño estará terminado **solo cuando** alguien sin conocimientos técnicos pueda responder, después de explorar el sitio:

1. ¿Qué tipo de problemas puede abordar AR Estudio?
2. ¿Qué aporta su investigación, criterio, creatividad y dirección de arte?
3. ¿Cómo integra comunicación, marketing, datos, software e IA?
4. ¿Qué soluciones ha construido y cuáles se pueden ver o probar?
5. ¿Qué evidencia respalda cada caso y cuáles son sus límites?
6. ¿Cómo iniciar una conversación pertinente sin fricción?

Y cuando, adicionalmente, un evaluador técnico o creativo encuentre **las decisiones, las alternativas y las fuentes** necesarias para juzgar el trabajo.

**Mandato para el próximo agente:** no empezar por cambiar colores, añadir efectos ni rehacer el logo. Empezar por investigar la necesidad del visitante, auditar la experiencia actual, explorar varias direcciones creativas, justificar una propuesta y construirla dentro del sistema de marca existente. **Conservar exactamente los siete colores oficiales del Design System Lab, incluido Acid/verde lima #EFFF38; no confundir variantes, colores de estados ni colores propios de cada proyecto con la paleta de identidad.** Ningún cambio de frontend se ha autorizado ni ejecutado mediante este documento.

---

## 16. Fuentes internas y trazabilidad

- Carta de Halbert examinada: https://www.thegaryhalbertletter.com/newsletters/zfkj_hands_on_experience.htm
- Principios de respuesta directa sintetizados del análisis previo; no se reproducen obras protegidas.
- Fuentes de verdad cromática: **brand/lab/index.html (siete swatches)**, brand/MANUAL_DE_MARCA.md (jerarquía) y brand/tokens.json (primitivos y semánticos). Fuente de verdad de logo: brand/assets/mark.svg y brand/logo-kit/manifest.json.
- Dirección: brand/PORTFOLIO_ART_DIRECTION.md, brand/COMUNICACION.md, brand/BRANDKIT_WORKFLOW.md.
- Contenido: index.html, data.js, app.js, perfil/index.html.
- Evidencias y QA: assets/proof/, scripts/capture-public-evidence.mjs, scripts/audit-public-links.mjs, tests/browser-qa.mjs, tests/catalog.test.js.
- Última versión auditada: rama main disponible el **2026-11-08**.

**Fin del brief — implementación pendiente.**
