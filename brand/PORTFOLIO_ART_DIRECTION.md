# AR Estudio — Portafolio 3.0 / Electric Editorial

Implementado siguiendo el skill `.agents/skills/brandkit/SKILL.md` y el brief `brand/BRANDKIT_WORKFLOW.md`. No se inventó ni rediseñó el logo: se usan exclusivamente trazados existentes `brand/logo-kit/svg/`.

## Jerarquía y narrativa

1. Portada: declaración clara + símbolo AR/ verdadero; densidad cromática concentrada en el arte de la derecha.
2. Selección: cuatro lenguajes visuales autónomos, sin imponer el branding madre sobre las marcas de los proyectos.
3. Interludio: análisis y criterio, no solo estética.
4. Archivo: catálogo filtrable de 21 proyectos, estados y evidencias sin inventar.
5. Método, perfil y contacto: lectura calmada y cierre cromático.

## Tokens

Fuente: `brand/tokens.css` importada por `brand/site-theme.css`. Capa final: `brand/portfolio-v3.css`, sin duplicar la fuente canónica. Archivo Black/Regular en titulares, DM Sans en lectura, IBM Plex Mono en rótulos. Color azul #245BFF, tinta #101729, fondo glaciar #F5FAFF, magenta #F12BBE y lima #EFFF38.

## QA

Los proyectos siguen estando en `data.js`; no se cambia su estado ni enlaces. Los medios editoriales existentes son conceptuales salvo indicación explícita. Mantener accesibilidad, foco visible, movimiento reducido, respuesta 390/768/1440 y primera pantalla con proyectos visibles. Se evita animación basada en fondos invasivos; GSAP se mantiene como mejora progresiva.
