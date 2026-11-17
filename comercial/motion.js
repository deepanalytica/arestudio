/* AR/ Commercial motion layer: progressive enhancement. Never gates content. */
(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobilePointer = window.matchMedia('(pointer: coarse)').matches;
  const qs = (selector) => [...document.querySelectorAll(selector)];
  const gsap = window.gsap;
  const st = window.ScrollTrigger;

  // Motion language: short entrances, depth, scroll cadence. The content exists without motion.
  if (gsap && st && !reduceMotion) {
    gsap.registerPlugin(st);
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.hero-eyebrow', { y: 16, autoAlpha: 0, duration: .58 })
      .from('#hero-title', { y: 28, autoAlpha: 0, duration: .85 }, '-=.26')
      .from('.hero-desc', { y: 18, autoAlpha: 0, duration: .7 }, '-=.50')
      .from('.hero-actions > *', { y: 16, autoAlpha: 0, duration: .55, stagger: .10 }, '-=.40')
      .from('.hero-foot', { y: 15, autoAlpha: 0, duration: .55 }, '-=.25')
      .from('.showcase-browser', { y: 36, autoAlpha: 0, duration: .85 }, '-=.78')
      .from('.showcase-social', { x: -25, y: 45, autoAlpha: 0, duration: .85 }, '-=.58')
      .from('.showcase-notice', { x: 25, y: 20, autoAlpha: 0, duration: .68 }, '-=.60');

    const sections = qs('.section-heading, .format-header, .faq-grid > div:first-child, .contact-copy, .about-copy');
    sections.forEach(node => {
      gsap.from(node, { scrollTrigger: { trigger: node, start: 'top 90%', once: true }, y: 32, autoAlpha: 0, duration: .78, ease: 'power2.out', clearProps:'all' });
    });
    qs('.need-card, .service-card, .project, .format-card, .steps article, .offers-grid article').forEach((node,i) => {
      gsap.from(node, { scrollTrigger:{trigger:node,start:'top 95%',once:true}, y:23, autoAlpha:0, duration:.65, delay:(i%3)*.07, ease:'power2.out', clearProps:'all' });
    });
    gsap.to('.showcase-browser', { y: -21, ease:'none', scrollTrigger: { trigger:'.hero', start:'top top', end:'bottom top', scrub:1.6 } });
    gsap.to('.showcase-social', { y:22, ease:'none', scrollTrigger: { trigger:'.hero', start:'top top', end:'bottom top', scrub:1.6 } });
  }

  // Spotlight follows the pointer; cards remain fully readable without it.
  if (!mobilePointer && !reduceMotion) {
    qs('.need-card, .service-card, .format-card, .project').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--px', `${event.clientX - rect.left}px`);
        card.style.setProperty('--py', `${event.clientY - rect.top}px`);
      }, { passive: true });
    });
  }

  // Small navigation progress rail.
  const rail = document.createElement('div');
  rail.className = 'page-rail';
  rail.setAttribute('aria-hidden', 'true');
  document.body.appendChild(rail);
  let raf = 0;
  const measure = () => {
    raf = 0;
    const max = Math.max(1,document.documentElement.scrollHeight - window.innerHeight);
    rail.style.transform = `scaleX(${Math.min(1, Math.max(0, window.scrollY/max))})`;
  };
  window.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(measure); }, { passive:true });
  window.addEventListener('resize', measure, { passive:true });
  measure();

  // Decorative 3D accents. Dynamically imported, GPU-limited, no effect on usability.
  const canvas = document.getElementById('hero-three');
  if (!canvas || reduceMotion || mobilePointer || window.innerWidth < 1024) return;
  const testCanvas = document.createElement('canvas');
  let gl = null;
  try { gl = testCanvas.getContext('webgl2', { failIfMajorPerformanceCaveat:true }) || testCanvas.getContext('webgl', { failIfMajorPerformanceCaveat:true }); } catch (_) { /* fallback to CSS */ }
  if (!gl) return;

  import('https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js').then(THREE => {
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true, powerPreference:'low-power' }); }
    catch (_) { canvas.style.display='none'; return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1,1.5));
    renderer.setClearColor(0x000000,0);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42,1,.1,100);
    camera.position.set(0,0,12.5);
    const group = new THREE.Group();
    scene.add(group);
    const ringA = new THREE.Mesh(new THREE.TorusGeometry(3.65,.012,6,140), new THREE.MeshBasicMaterial({color:0x5383ff,transparent:true,opacity:.45}));
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(2.90,.009,6,140), new THREE.MeshBasicMaterial({color:0x6798e9,transparent:true,opacity:.32}));
    ringB.rotation.x=.53;
    ringA.rotation.y=.43;
    group.add(ringA,ringB);
    const geometry = new THREE.BufferGeometry();
    const coords = new Float32Array(84*3);
    for(let i=0;i<84;i++){
      const theta=(i*2.399963)% (Math.PI*2);
      const radius=1.7+((i*31)%100)/100*2.9;
      coords[i*3]=Math.cos(theta)*radius;
      coords[i*3+1]=Math.sin(theta)*radius;
      coords[i*3+2]=((i*19)%90)/90-0.5;
    }
    geometry.setAttribute('position',new THREE.BufferAttribute(coords,3));
    const points = new THREE.Points(geometry, new THREE.PointsMaterial({color:0x4e7cde,size:.041,transparent:true,opacity:.62}));
    group.add(points);
    let visible=true, active=true, prev=0, pointerX=0, pointerY=0;
    const resize = () => {
      const rect=canvas.getBoundingClientRect();
      const w=Math.max(1,Math.floor(rect.width)), h=Math.max(1,Math.floor(rect.height));
      renderer.setSize(w,h,false); camera.aspect=w/h;camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize',resize,{passive:true});
    const observer = new IntersectionObserver(entries => { visible=entries[0].isIntersecting; }, {threshold:.01});
    observer.observe(canvas);
    document.addEventListener('visibilitychange',() => {active=!document.hidden;});
    const showcase=canvas.closest('.hero-showcase');
    showcase.addEventListener('pointermove',event=>{
      const rect=showcase.getBoundingClientRect();
      pointerX=(event.clientX-rect.left)/rect.width-.5;
      pointerY=(event.clientY-rect.top)/rect.height-.5;
    },{passive:true});
    let disposed=false;
    canvas.addEventListener('webglcontextlost',(event)=>{event.preventDefault();disposed=true;canvas.style.display='none';},{once:true});
    const animate=(ts)=>{
      if(disposed)return;
      requestAnimationFrame(animate);
      if(!visible || !active || ts-prev < 32)return; // <= 30 FPS
      prev=ts;
      group.rotation.z += .0014;
      group.rotation.y += (pointerX*.16-group.rotation.y)*.035;
      group.rotation.x += (pointerY*.11-group.rotation.x)*.035;
      renderer.render(scene,camera);
    };
    requestAnimationFrame(animate);
  }).catch(() => { canvas.style.display='none'; });
})();