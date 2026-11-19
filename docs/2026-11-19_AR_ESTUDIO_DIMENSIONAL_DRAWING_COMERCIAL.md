# AR Estudio · Dimensional Drawing en versión comercial V4

Fecha: 2026-11-19
Estado: implementación en branch strategy/comercial-necesidades-v4 (PR #13); no supone publicación en main.

## Resultado
Se añadió una demostración opcional en comercial-v4/plano/, enlazada después de la explicación del método. Mide una tarjeta existente del selector de situaciones usando el documento real en un iframe del mismo origen y getBoundingClientRect / getComputedStyle. Ofrece anchos de 390, 768 y 1440 px.

La página del plano muestra una hoja técnica en escala de grises: vista en planta, estructura por capas, slots, variables y una tabla con el ancho, alto, padding, separación, radio y borde realmente calculados por el navegador. Las variables no verificables quedan TBD.

## Alcance y riesgos controlados
- Se mantienen la jerarquía comercial, las pruebas de proyectos reales y el CTA a WhatsApp.
- La demostración no se carga en la página comercial principal: solo a través del enlace.
- No se atribuyen ventas, mejoras de conversión ni clientes ficticios a la geometría.
- El plano usa CSS/JS nativo; no descarga librerías de animación ni altera la marca AR/.
- El esquema de capas es ilustrativo, no una medición 3D; las cotas sí provienen de la interfaz renderizada.

## Inspiración técnica
Enes Ozturk, dimensional-drawing, licencia MIT: https://github.com/enesozturk/dimensional-drawing
Se añadió un wrapper de proyecto en .agents/skills/arestudio-dimensional-spec/SKILL.md. Para disponer de las plantillas y el renderer de upstream, instalar la skill original con:

    npx skills add enesozturk/dimensional-drawing

No se ha integrado el pipeline de video original y no debe describirse como ejecutado.

## Gates
1. npm run check.
2. npm install --no-save playwright && npx playwright install --with-deps chromium.
3. npm run qa:comercial-v4.
4. Revisar capturas en artifact del workflow comercial-v4-preview.yml y comprobar que no existe scroll horizontal global en 320 px, accesibilidad de control, ni errores JS.
5. Revisar copy y conversión antes de fusionar PR #13; mantener /comercial/ de main intacto hasta esa decisión.
