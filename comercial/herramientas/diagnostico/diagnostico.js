(() => {
  'use strict';
  const form=document.querySelector('#diagnostic'),box=document.querySelector('#diagnostic-result');
  if(!form||!box)return;
  const recipes={
    discover:{heading:'Prioridad: hacer que te encuentren',steps:['Completa tu perfil de Google con ubicación, servicios, horarios y fotos verificables si corresponde.','Explica tu oferta en una frase y prepara fotos y publicaciones que respondan dudas reales.','Prueba un canal local antes de gastar en campañas grandes.'],kit:'Kit Apertura Local'},
    trust:{heading:'Prioridad: facilitar las consultas',steps:['Explica a quién atiendes, para qué y cuáles son los pasos para consultar.','Crea una página clara de servicios, credenciales pertinentes y contacto visible.','Revisa cuántas consultas reales llegan y desde qué canal.'],kit:'Kit Más Consultas'},
    convert:{heading:'Prioridad: revisar antes de pagar más anuncios',steps:['Calcula tu margen por pedido y comprueba que el precio y la oferta se entienden.','Revisa fotos, envíos, pagos, preguntas frecuentes y prueba la compra desde el móvil.','Identifica en qué paso se pierden visitantes antes de aumentar el tráfico.'],kit:'Kit Tienda que Convierte'},
    time:{heading:'Prioridad: automatizar algo pequeño y repetible',steps:['Haz una lista de consultas y tareas que repites; cuenta su frecuencia.','Escoge una tarea de bajo riesgo con datos claros y supervisión humana.','Prueba el flujo y documenta cuándo debe intervenir una persona.'],kit:'Automatización a medida'}
  };
  const el=(tag,text)=>{const n=document.createElement(tag);n.textContent=text;return n};
  form.addEventListener('submit',event=>{
    event.preventDefault();if(!form.reportValidity())return;
    const data=new FormData(form);let key=data.get('pain');
    // El motivo declarado prevalece; el sector matiza la recomendación sin inferir resultados.
    if(key==='discover'&&data.get('sector')==='professional')key='trust';
    if(key==='trust'&&data.get('sector')==='store'&&data.get('presence')==='site')key='convert';
    const chosen=recipes[key];if(!chosen)return;
    const intro=el('div','TU PLAN INICIAL');intro.className='eyebrow';
    const title=el('h2',chosen.heading),text=el('p',data.get('capacity')==='time'?'Empieza con estos pasos que puedes revisar tú mismo:':'Estos son los puntos que conviene revisar antes de contratar:'),list=document.createElement('ol');
    chosen.steps.forEach(s=>list.append(el('li',s)));
    const kit=el('p',`Kit relacionado: ${chosen.kit}. El alcance y el precio se acuerdan antes de trabajar.`);
    const link=document.createElement('a');link.className='button button-light';link.textContent='Conversar con AR Estudio ↗';link.href='../../#contacto';
    const note=el('p','Es una orientación general basada en tus respuestas, no un análisis de tu negocio ni una garantía de ventas.');note.className='tool-disclaimer';
    box.replaceChildren(intro,title,text,list,kit,link,note);
    box.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  });
  form.addEventListener('reset',()=>{
    const intro=el('div','TU PLAN INICIAL');intro.className='eyebrow';box.replaceChildren(intro,el('h2','Primero entendamos el problema.'),el('p','Responde cuatro preguntas para recibir tres acciones prioritarias. No te pedimos datos personales.'));
  });
})();