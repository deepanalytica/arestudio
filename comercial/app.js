(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const form = $('#lead-form');
  const service = $('#lead-service');
  const needs = {
    presencia: { title: 'Ordenemos cómo se presenta tu marca.', text: 'Podemos revisar tu identidad, tus publicaciones y las piezas que ven tus clientes para construir una dirección visual coherente y reconocible.', service: 'Marca y diseño' },
    clientes: { title: 'Construyamos un recorrido para captar consultas.', text: 'Combinamos un mensaje claro, anuncios y una página de destino o WhatsApp. Después revisamos qué consultas genera realmente.', service: 'Publicidad y captación de clientes' },
    web: { title: 'Una página que explique lo que vendes y facilite el contacto.', text: 'Pensamos primero en el visitante: qué necesita saber, qué le da confianza y cómo puede pedir información o comprar.', service: 'Página web o tienda' },
    orden: { title: 'Identifiquemos dónde se pierden tiempo y oportunidades.', text: 'Revisamos el recorrido de datos, mensajes y tareas para automatizar solo aquello que sea útil y verificable.', service: 'Automatización e inteligencia artificial' }
  };
  function preselect(value) {
    if (!service) return;
    service.value = value;
    $('#contacto')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    setTimeout(() => { const el = $('#lead-name'); if (el && !el.value) el.focus({ preventScroll: true }); }, 450);
  }
  $$('.need-card').forEach(btn => btn.addEventListener('click', () => {
    $$('.need-card').forEach(b => { b.classList.toggle('is-active', b === btn); b.setAttribute('aria-pressed', String(b === btn)); });
    const selected = needs[btn.dataset.need];
    $('#need-result-title').textContent = selected.title;
    $('#need-result-copy').textContent = selected.text;
    $('#need-action').dataset.service = selected.service;
  }));
  $('#need-action')?.addEventListener('click', e => preselect(e.currentTarget.dataset.service || needs.presencia.service));
  $$('.service-cta, .offer-button').forEach(btn => btn.addEventListener('click', () => preselect(btn.dataset.service)));
  $$('.filter').forEach(btn => btn.addEventListener('click', () => {
    const current = btn.dataset.filter;
    $$('.filter').forEach(b => { b.classList.toggle('is-active', b === btn); b.setAttribute('aria-pressed', String(b === btn)); });
    $$('.project').forEach(card => { const show = current === 'todos' || (card.dataset.category || '').split(' ').includes(current); card.hidden = !show; });
  }));
  const menuButton = $('#menu-button'), mobileNav = $('#mobile-nav');
  function setMenu(open) { menuButton?.setAttribute('aria-expanded', String(open)); menuButton?.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú'); if (mobileNav) mobileNav.hidden = !open; document.body.classList.toggle('menu-open', open); }
  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  $$('.mobile-nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 820) setMenu(false); });
  const year = $('#year'); if (year) year.textContent = String(new Date().getFullYear());
  form?.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const v = id => ($(id)?.value || '').trim();
    const message = [
      'Hola, vi AR Estudio y quiero conversar sobre mi negocio.',
      '',
      `Mi nombre: ${v('#lead-name')}`,
      v('#lead-business') && `Negocio: ${v('#lead-business')}`,
      `Necesito ayuda con: ${v('#lead-service')}`,
      `Mi proyecto: ${v('#lead-goal')}`,
      v('#lead-budget') && `Presupuesto estimado: ${v('#lead-budget')}`,
      v('#lead-location') && `Ciudad: ${v('#lead-location')}`,
      ...(() => {
        // Mantener atribución básica de campañas sin cookies ni almacenamiento.
        const query = new URLSearchParams(window.location.search);
        return ['utm_source','utm_medium','utm_campaign','utm_content']
          .map(key => {
            const raw = query.get(key);
            const clean = raw?.replace(/[\r\n\t]/g, ' ').trim().slice(0, 72);
            return clean ? `${key}: ${clean}` : null;
          }).filter(Boolean);
      })()
    ].filter(Boolean).join('\n');
    // Navegación directa para evitar bloqueos de ventanas emergentes. El usuario confirma el envío en WhatsApp.
    window.location.href = 'https://wa.me/56958039450?text=' + encodeURIComponent(message);
  });
})();