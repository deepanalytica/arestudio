# AR ESTUDIO · Arquitectura de marca y dirección de arte 2.0

## Propósito
Estudio independiente que integra dirección de arte, experiencias digitales, software y datos, y comunicación. El valor es hacer comprensibles y útiles problemas complejos sin prometer métricas no verificadas.

## Arquitectura
Marca madre: AR ESTUDIO. Firma corta: AR/. Las áreas Dirección de Arte, Experiencias Digitales, Sistemas y Datos, Comunicación son prácticas descriptivas, NO submarcas. ARCHIVO, Deep Geo, Praxios OS y Visual Art AI conservan identidad original y estado de desarrollo real.

## Electric Editorial
Identidad contemporánea, expresiva y cromática. 70% superficies glaciar y papel, 20% azul eléctrico y violeta, 10% magenta, naranja o lima. Usar el color para jerarquía, no decorar todas las superficies.
Símbolo: AR/ usable en mono y a color; evitar redes neuronales, cerebro, circuitos, estética gamer y efectos decorativos. No declarar originalidad registral sin búsqueda formal.

## Tipografías
Space Grotesk 600/700 para display y títulos; DM Sans 400/500/700 para lectura; IBM Plex Mono 400/500 para datos y folios. Display fluido de 60 a 124px, line height 0.92, tracking -0.07em. H2 de 40 a 88px. Cuerpo 16px y ancho máximo 72ch.

## Espaciado y retícula
Base 4px: 4,8,12,16,20,24,32,48,64,96px. Máximo 1440px con márgenes fluidos 20-80px. Componentes con radios 8,16,28 y píldora. Evitar diseño monótono de tarjetas repetidas.

## Estados y contraste
Texto principal #101729; acciones #245BFF; hover #173EC9; foco #6236FF. Contraste de texto normal al menos 4.5:1, texto grande y controles 3:1. No usar rosa/naranja/lima como texto pequeño en blanco. Estados focus visible, hover, active, disabled, loading, error y success; información no depende exclusivamente de color.

## Motion
120ms feedback, 220ms hover, 420ms transiciones, 740ms gesto hero. Easing cubic-bezier(.22,1,.36,1). Solo transform y opacity cuando sea posible. GSAP progresivo; Three.js opcional con SVG/CSS fallback, DPR limitado, limpieza de renderer y reduced-motion.

## Mockups y contenidos
SVG editables en assets: mark, cover, poster, social. Son composiciones conceptuales, no fotografías de proyectos ni evidencia de clientes. Casos de portafolio deben separar real, demo, I+D, prototipo y concepto.

## Reutilización
Editar brand/tokens.json, ejecutar npm run brand:tokens, importar brand/tokens.css. Revisar con npm run check. No duplicar paletas por cada sección. Componentes y guía interactiva en /brand/.
