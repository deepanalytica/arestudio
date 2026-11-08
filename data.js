// AR/ · Catálogo editorial. Todos los estados y enlaces deben verificarse antes de cambiarlos.
export const SITE = {
  repository: 'https://github.com/deepanalytica/arestudio',
  portfolioLegacy: 'https://deepanalytica.github.io/archivo-tienda/portafolio/',
  email: 'asaave9@gmail.com',
  whatsapp: 'https://wa.me/56958039450?text=Hola%2C%20vi%20tu%20portafolio%20AR%2F%20y%20me%20gustar%C3%ADa%20conversar.'
};
const ROOT='https://deepanalytica.github.io/archivo-tienda/portafolio/';
const detail=(id)=>`${ROOT}proyectos/detalle/?id=${encodeURIComponent(id)}`;
export const projects = [
 {id:'archivo',name:'ARCHIVO',area:'Diseño',type:'Ecommerce / Dirección de arte',status:'Proyecto publicado',featured:true,cover:'assets/archivo.svg',concept:true,summary:'Tienda online que reúne 12 marcas y sus colecciones en una experiencia de compra clara.',problem:'Conectar múltiples colecciones comerciales con una presentación visual consistente y fácil de explorar.',solution:'Organización de catálogo, sistemas de identidad, piezas de campaña y una tienda navegable.',deliverables:['Tienda web','Dirección de arte','Sistema de catálogo','Piezas editoriales'],url:'https://deepanalytica.github.io/archivo-tienda/',evidence:'Tienda y recursos públicos del proyecto.',media:[{src:'https://deepanalytica.github.io/archivo-tienda/assets/brands/ownform-editorial.webp',alt:'Pieza editorial de la colección Ownform',caption:'OWNFORM / EDITORIAL'},{src:'https://deepanalytica.github.io/archivo-tienda/assets/brands/alto-campaign.webp',alt:'Pieza de campaña ALTO',caption:'ALTO / CAMPAÑA'},{src:'https://deepanalytica.github.io/archivo-tienda/assets/brands/imago-editorial.webp',alt:'Fotografía de la colección Imago',caption:'IMAGO / EDITORIAL'}]},
 {id:'deep-geo',name:'Deep Geo',area:'Datos',type:'Inteligencia territorial / Geoespacial',status:'Investigación y plataforma',featured:true,cover:'assets/deep-geo.svg',concept:true,summary:'Cruce de mapas y datos territoriales para estudiar riesgos y apoyar decisiones.',problem:'Interpretar grandes volúmenes de datos espaciales dispersos, con evidencia y contexto.',solution:'Exploración geoespacial 2D/3D, cruce de capas y fichas que separan observaciones de hipótesis.',deliverables:['Exploración de mapas','Visualización 2D/3D','Análisis territorial','Registro de evidencias'],url:detail('deep-geo'),evidence:'Ficha pública de investigación; la portada es una ilustración conceptual.'},
 {id:'praxios-os',name:'Praxios OS',area:'Tecnología',type:'Arquitectura de agentes / Producto',status:'Demostración e I+D',featured:true,cover:'assets/praxios.svg',concept:true,summary:'Permite revisar qué hacen los agentes de IA y qué evidencias respaldan sus tareas.',problem:'Mantener trazabilidad cuando un trabajo pasa por agentes, herramientas y múltiples sesiones.',solution:'Diseño de contratos, estados, revisión humana e interfaces para examinar lo ejecutado.',deliverables:['Arquitectura técnica','Interfaces de control','Protocolos de verificación','Prototipos'],url:detail('praxios-os'),evidence:'Documentación y demostraciones; no es una plataforma comercial completamente desplegada.'},
 {id:'visual-art-ai',name:'Visual Art AI',area:'Comunicación',type:'Marca / Growth / Experiencia web',status:'Servicio publicado',featured:true,cover:'assets/visual.svg',concept:true,summary:'Sitio y estrategia para explicar mejor servicios y facilitar el contacto de posibles clientes.',problem:'Que una oferta resulte comprensible, encontrable y convincente para clientes potenciales.',solution:'Diagnóstico, arquitectura de contenido, campañas, diseño web y optimización de presencia digital.',deliverables:['Sitio publicado','Comunicación visual','Estrategia digital','Diagnóstico'],url:'https://visualartai.cl/',evidence:'Sitio de servicio público.'},
 {id:'conv-os',name:'Conv OS',area:'Tecnología',type:'Growth / Operación',status:'Demo con datos ficticios',cover:'assets/cover-conv-os.svg',summary:'Interfaz para organizar conversaciones, pedidos y tareas en un mismo lugar.',problem:'Reducir pérdida de contexto entre contactos y procesos.',solution:'Pantallas de seguimiento y flujos de consulta.',deliverables:['Prototipo','Estructura de flujos'],url:detail('conv-os')},
 {id:'msj',name:'MSJ',area:'Comunicación',type:'Conversaciones / Canales',status:'Arquitectura documentada',cover:'assets/cover-msj.svg',summary:'Arquitectura para reunir conversaciones entre distintos canales sin perder contexto.',problem:'Unificar puntos de contacto sin perder contexto.',solution:'Modelo de conversación, enrutamiento e intervención humana.',deliverables:['Arquitectura','Diseño de flujos'],url:detail('msj')},
 {id:'radar-conv-os',name:'Radar Conv OS',area:'Datos',type:'Evaluación / Ecommerce',status:'Demo sin ventas reales',cover:'assets/cover-radar-conv-os.svg',summary:'Compara productos y costos para decidir qué oportunidades merece la pena probar.',problem:'Evitar confundir interés estimado con rendimiento demostrado.',solution:'Scoring con penalización por evidencia y simulación de economía unitaria.',deliverables:['Ranking','Simulador','Vista de evidencias'],url:detail('radar-conv-os')},
 {id:'deep-living',name:'Deep Living',area:'Datos',type:'Segmentación / Contexto',status:'Investigación interna',cover:'assets/cover-deep-living.svg',summary:'Investigación sobre necesidades y decisiones en distintas etapas de la vida.',problem:'Interpretar necesidades en contextos diversos.',solution:'Modelos de segmentación y escenarios hipotéticos.',deliverables:['Investigación','Exploraciones'],url:detail('deep-living')},
 {id:'meta-harness',name:'Meta Harness',area:'Tecnología',type:'Arquitectura / Verificación',status:'Ficha conceptual pública',cover:'assets/cover-meta-harness.svg',summary:'Diseño de controles para verificar qué hacen los agentes y qué queda por revisar.',problem:'Controlar qué se afirma, ejecuta y verifica.',solution:'Contratos de ejecución, estados y revisión de evidencia.',deliverables:['Diseño de arquitectura','Método'],url:detail('meta-harness')},
 {id:'atalaya',name:'Atalaya',area:'Tecnología',type:'Observabilidad / UX',status:'Componente interno',cover:'assets/cover-atalaya.svg',summary:'Panel de observabilidad para ver tareas, estados y errores de agentes de IA.',problem:'Hacer visible qué pasó y qué falta.',solution:'Paneles de control, trazas y alertas.',deliverables:['Prototipo UX','Interfaz'],url:detail('atalaya')},
 {id:'eureka',name:'EUREKA',area:'Investigación',type:'Memoria / Conocimiento',status:'Investigación interna',cover:'assets/cover-eureka.svg',summary:'Sistema de registro de hallazgos que conserva sus fuentes y su contexto.',problem:'No perder aprendizajes relevantes entre iteraciones.',solution:'Registro de hallazgos y contexto de validación.',deliverables:['Método','Exploración'],url:detail('eureka')},
 {id:'el-tiburon',name:'El Tiburón',area:'Investigación',type:'Evaluación adversarial',status:'Método interno',cover:'assets/cover-el-tiburon.svg',summary:'Método para cuestionar propuestas y detectar errores antes de tomar decisiones.',problem:'Reducir falsas certezas y conclusiones débiles.',solution:'Preguntas adversariales, pruebas y revisión humana.',deliverables:['Protocolo','Guía'],url:detail('el-tiburon')},
 {id:'la-escalera',name:'La Escalera',area:'Tecnología',type:'Continuidad / Agentes',status:'Protocolo interno',cover:'assets/cover-la-escalera.svg',summary:'Transferencia ordenada de decisiones entre sesiones.',problem:'Evitar pérdida de contexto y repetición de trabajo.',solution:'Contratos de relevo y estado de tareas.',deliverables:['Protocolo','Workflow'],url:detail('la-escalera')},
 {id:'super-prompt-euler',name:'Super Prompt Euler',area:'Tecnología',type:'Intención / Especificación',status:'Método interno',cover:'assets/cover-super-prompt-euler.svg',summary:'Convertir encargos ambiguos en especificaciones comprobables.',problem:'Reducir malentendidos entre objetivos y ejecución.',solution:'Descomposición de intención en requisitos y verificaciones.',deliverables:['Método','Plantillas'],url:detail('super-prompt-euler')},
 {id:'geoanalytica',name:'GeoAnalytica',area:'Datos',type:'Antecedentes GIS',status:'Repositorio público histórico',cover:'assets/cover-geoanalytica.svg',summary:'Exploración y representación de relaciones geográficas.',problem:'Hacer consultas espaciales más accesibles.',solution:'Visualización e integración de datos cartográficos.',deliverables:['Repositorio','Exploración'],url:detail('geoanalytica')},
 {id:'inverse-reality-lab',name:'Inverse Reality Lab',area:'Investigación',type:'Escenarios / Hipótesis',status:'Laboratorio público',cover:'assets/cover-inverse-reality-lab.svg',summary:'Contrastar escenarios, límites e hipótesis.',problem:'Separar posibilidades de hechos comprobados.',solution:'Diseños de experimentos y contraejemplos.',deliverables:['Prototipos','Documentación'],url:detail('inverse-reality-lab')},
 {id:'deep-licita',name:'Deep Licita',area:'Datos',type:'Oportunidades / Inteligencia',status:'Proyecto interno',cover:'assets/cover-deep-licita.svg',summary:'Organizar oportunidades y sus requisitos.',problem:'Leer y comparar documentos extensos con trazabilidad.',solution:'Estructuras de extracción, filtros y revisión humana.',deliverables:['Concepto','Análisis'],url:detail('deep-licita')},
 {id:'sin-humo',name:'Sin Humo',area:'Investigación',type:'Libro / Pensamiento crítico',status:'Publicación en desarrollo',cover:'assets/cover-sin-humo.svg',summary:'Una exploración de decisiones, límites y evidencia.',problem:'Clarificar qué puede sostenerse con datos y razonamiento.',solution:'Investigación, escritura y revisión crítica.',deliverables:['Manuscrito','Modelos'],url:detail('sin-humo')},
 {id:'el-puente',name:'El Puente',area:'Investigación',type:'Lectura / Publicación',status:'Publicación pública',cover:'assets/cover-el-puente.svg',summary:'Hacer navegables ideas técnicas extensas.',problem:'Facilitar comprensión de contenidos complejos.',solution:'Arquitectura de lectura y navegación.',deliverables:['Publicación','Interfaz'],url:detail('el-puente')},
 {id:'deep-audio',name:'Deep Audio',area:'Comunicación',type:'Producción / Audio',status:'Prototipo en desarrollo',cover:'assets/cover-deep-audio.svg',summary:'Exploración de experiencias de audio y producción.',problem:'Reducir fricción en tareas de producción.',solution:'Diseño de interfaz y flujo experimental.',deliverables:['Prototipo','Exploración'],url:detail('deep-audio')},
 {id:'wal',name:'WAL',area:'Diseño',type:'Marca / Comercio',status:'Proyecto comercial',cover:'assets/cover-wal.svg',summary:'Identidad y campañas para productos, servicios y comercio.',problem:'Comunicar líneas comerciales distintas con consistencia.',solution:'Sistema visual y piezas digitales.',deliverables:['Campañas','Diseño visual'],url:`${ROOT}casos/wal/`}
];
export const featured = projects.filter(p=>p.featured);
export const categories = ['Todos','Diseño','Datos','Tecnología','Comunicación','Investigación'];

// Casos con decisiones trazables y acceso a evidencia. No implica métricas ni demos no acreditadas.
export const caseStudies = {
  'archivo': {
    role: 'Dirección de arte, sistema de marcas y experiencia ecommerce',
    contribution: 'Diseñé la estructura editorial del catálogo, la identidad visual de las colecciones y su presentación en una tienda navegable.',
    decisions: [
      {title:'Marcas reconocibles, tienda coherente',detail:'Mantener un universo gráfico por marca y reunirlos bajo una arquitectura comercial compartida.'},
      {title:'Exploración antes que listado infinito',detail:'Usar navegación por marcas, colecciones y filtros para ayudar a encontrar productos sin perder el relato visual.'},
      {title:'Campaña conectada al producto',detail:'Vincular las piezas editoriales y la fotografía a sus colecciones y fichas, en lugar de utilizarlas como decoración aislada.'}
    ],
    built:['Tienda y explorador de catálogo','Identidades y campañas por colección','Diseño de fichas, navegación y bolsa'],
    links:[
      {label:'Abrir tienda publicada',url:'https://deepanalytica.github.io/archivo-tienda/',kind:'demo'},
      {label:'Examinar código público',url:'https://github.com/deepanalytica/archivo-tienda',kind:'source'}
    ],
    proofNote:'El proyecto publicado permite recorrer las colecciones y la tienda. Las portadas del portafolio son piezas editoriales; los materiales fotográficos identificados aparecen más abajo.'
  },
  'deep-geo': {
    role:'Investigación geoespacial, visualización y arquitectura de análisis',
    contribution:'Diseñé flujos para explorar información territorial, cruzar capas y distinguir observaciones verificables de hipótesis.',
    decisions:[
      {title:'Explorar antes de concluir',detail:'Separar capas, hallazgos e hipótesis para no presentar una interpretación como hecho medido.'},
      {title:'2D y 3D con objetivos distintos',detail:'Utilizar cartografía 2D para comparar información y visualización 3D para examinar contexto espacial y relieve.'},
      {title:'Evidencia útil para decidir',detail:'Vincular la lectura de mapas con registros y fichas que apoyen la priorización de inspecciones y análisis.'}
    ],
    built:['Diseño de flujos de exploración territorial','Visualización de capas y escenarios 2D/3D','Estructura de hallazgos y evidencias'],
    links:[
      {label:'Ver ficha de investigación',url:'https://deepanalytica.github.io/archivo-tienda/portafolio/proyectos/detalle/?id=deep-geo',kind:'source'}
    ],
    proofNote:'Investigación y plataforma en desarrollo. El proyecto no cuenta aquí con una demo pública operativa verificada; no se presenta la ilustración como captura del GIS.'
  },
  'praxios-os': {
    role:'Arquitectura de agentes, trazabilidad y diseño de producto',
    contribution:'Trabajé en la representación de decisiones, tareas, estados y evidencias de procesos asistidos por IA.',
    decisions:[
      {title:'Trazabilidad sobre automatización opaca',detail:'Hacer explícitos estados y evidencias para que cada ejecución pueda revisarse.'},
      {title:'Revisión humana en los puntos críticos',detail:'Diferenciar lo solicitado, lo ejecutado y lo verificado antes de describir una tarea como completada.'},
      {title:'Interfaz para inspeccionar el sistema',detail:'Usar componentes de observabilidad para exponer actividad y relaciones entre procesos, no solo resultados finales.'}
    ],
    built:['Diseño de contratos y estados','Prototipos de paneles de observabilidad','Dossier público de la visión del producto'],
    links:[
      {label:'Ver dossier público',url:'https://deepanalytica.github.io/praxios/',kind:'source'},
      {label:'Examinar repositorio público',url:'https://github.com/deepanalytica/praxios',kind:'source'}
    ],
    proofNote:'El enlace público muestra un dossier del proyecto, no una consola de agentes en producción. Componentes operativos internos no se exponen como demo pública.'
  },
  'visual-art-ai': {
    role:'Estrategia digital, identidad, diseño web y comunicación',
    contribution:'Desarrollé la presentación digital del servicio, su estructura de información y el recorrido desde el diagnóstico hasta el contacto.',
    decisions:[
      {title:'Explicar la oferta antes que la tecnología',detail:'Organizar el sitio alrededor de necesidades de negocio y resultados esperados, no de un catálogo de herramientas.'},
      {title:'Diagnóstico como primera interacción',detail:'Dar al visitante una forma de iniciar una conversación concreta antes de pedirle una contratación.'},
      {title:'Una ruta de contacto visible',detail:'Conservar llamados a la acción claros entre mensaje, servicios y contacto.'}
    ],
    built:['Sitio de servicio publicado','Arquitectura de contenido y oferta','Identidad visual y recorrido de conversión'],
    links:[{label:'Abrir sitio publicado',url:'https://visualartai.cl/',kind:'demo'}],
    proofNote:'El sitio permite verificar el diseño y la comunicación del servicio. No se atribuyen cifras de captación ni conversiones sin medición pública.'
  },
  'conv-os': {
    role:'Arquitectura de producto, experiencia operativa y prototipado',
    contribution:'Desarrollé un MVP experimental con interfaz de conversaciones, estados operativos y una demostración de flujos con datos simulados.',
    decisions:[
      {title:'Demostración segura y honesta',detail:'Separar la UI pública con datos ficticios del backend y de las integraciones que todavía requieren controles de producción.'},
      {title:'Estados explícitos',detail:'Modelar operaciones, pedidos y cambios de estado, sin permitir afirmar pagos reales desde un texto arbitrario.'},
      {title:'Producto transversal',detail:'Diseñar un flujo configurable para distintos servicios y comercios, evitando acoplarlo a un solo tipo de negocio.'}
    ],
    built:['Panel de demostración e inbox simulado','Máquina de estados y catálogo de operaciones','API experimental Node y SQLite'],
    links:[
      {label:'Abrir demo interactiva',url:'https://deepanalytica.github.io/conv-os/',kind:'demo'},
      {label:'Ver repositorio y límites',url:'https://github.com/deepanalytica/conv-os',kind:'source'}
    ],
    proofNote:'MVP experimental. La demo usa datos ficticios y no procesa conversaciones reales, pagos ni integraciones activas de WhatsApp.'
  },
  'radar-conv-os': {
    role:'Análisis comparativo y diseño de herramientas de decisión',
    contribution:'Construí un enfoque de evaluación de oportunidades que combina señales observables, penalización por falta de evidencia y simulación de costos.',
    decisions:[
      {title:'Penalizar evidencia insuficiente',detail:'Evitar que una señal atractiva por sí sola se interprete como oportunidad comercial comprobada.'},
      {title:'Economía unitaria antes de invertir',detail:'Cruzar precio, costos y supuestos en un simulador para comparar escenarios.'}
    ],
    built:['Criterios de ranking y penalización','Simulación de economía unitaria','Interfaz de exploración de oportunidades'],
    links:[{label:'Consultar código del ecosistema',url:'https://github.com/deepanalytica/conv-os',kind:'source'}],
    proofNote:'Evaluación experimental; los resultados de la demo no constituyen ventas verificadas.'
  }
};
