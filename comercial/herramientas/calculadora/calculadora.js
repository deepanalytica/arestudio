(() => {
 'use strict';const form=document.querySelector('#calc-form'),result=document.querySelector('#calc-result');if(!form||!result)return;
 const pesos=new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0});
 const el=(t,txt,cls)=>{const n=document.createElement(t);if(txt!==undefined)n.textContent=txt;if(cls)n.className=cls;return n};
 form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;
  const n=id=>Number(document.getElementById(id).value);
  const price=n('price'),cost=n('cost'),delivery=n('delivery'),fee=n('fee'),budget=n('budget');
  if([price,cost,delivery,fee,budget].some(v=>!Number.isFinite(v)||v<0)||price<=0)return;
  const margin=price-cost-delivery-fee,breakEven=margin>0?Math.ceil(budget/margin):null;
  const header=el('div','TU CÁLCULO · CLP','eyebrow'),title=el('h2',margin>0?'Este es tu punto de equilibrio':'La operación todavía no deja margen.');
  const metrics=el('div',undefined,'metric-row');
  for(const [label,value] of [['Margen antes de anuncios',pesos.format(margin)],['Ventas para cubrir anuncios',breakEven===null?'No alcanzable':String(breakEven)]]){
    const node=el('div',undefined,'metric');node.append(el('span',label),el('strong',value));metrics.append(node);
  }
  const percent=(margin/price*100).toFixed(1);
  const explain=el('p',margin>0?`Cada pedido deja ${pesos.format(margin)} antes de publicidad y costos fijos (${percent}% del precio). Con ${breakEven} pedidos efectivamente pagados cubrirías ${pesos.format(budget)} de anuncios, suponiendo costos constantes.`:`Cada pedido tiene un margen de ${pesos.format(margin)} antes de publicidad. Mejorar el precio o reducir costos es prioritario: comprar anuncios agravaría la pérdida por pedido.`);
  const important=el('p','No incluye arriendos, sueldos, impuestos, devoluciones, cancelaciones ni costos de capital. En contra entrega, incorpora el costo de pedidos fallidos antes de decidir. Los pedidos calculados no son una previsión de ventas.','tool-disclaimer');
  const cta=el('a','Revisar mi tienda con AR Estudio ↗','button button-light');cta.href='../../#contacto';
  result.replaceChildren(header,title,metrics,explain,important,cta);
 });
})();