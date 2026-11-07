# Brandkit para AR Estudio

## Estado
- Skill original: .agents/skills/brandkit/SKILL.md
- Procedencia: https://github.com/Leonxlnx/imagegen-skills/tree/main/skills/brandkit
- Licencia: MIT, archivo .agents/skills/brandkit/LICENSE.
- Copia versionada en el proyecto, no actualizada automáticamente.

## Instalación local opcional
Desde la carpeta del proyecto, para Codex:
    npx skills add https://github.com/Leonxlnx/imagegen-skills --skill brandkit -a codex -y
Para Claude Code, sustituye -a codex por -a claude-code. Requiere Node 22.20+ según la CLI actual. Reiniciar la sesión del agente después.
La instalación en GitHub NO equivale a instalar en el equipo local ni activa un generador de imágenes por sí misma.

## Brief permanente de marca
- Trabajar en modo EXTENDER IDENTIDAD EXISTENTE, nunca crear marca desde cero salvo instrucción explícita.
- Marca: AR Estudio. Monograma: AR y barra diagonal slash separada. No reinventar sus formas.
- Fuente de verdad: brand/assets/mark.svg; brand/logo-kit/manifest.json; brand/logo-kit/svg/; brand/tokens.json; brand/MANUAL_DE_MARCA.md.
- Paleta: azul eléctrico #245BFF, blanco glaciar #F5FAFF, tinta #101729, violeta #6236FF, magenta #F12BBE, lima #EFFF38, naranja #FF652F.
- Dirección visual: Electric Editorial; alta tensión tipográfica, geometría precisa, fondos cuidados y composiciones memorables.
- Prohibido alterar los trazados de AR, esconder R detrás de A, deformar o cambiar slash sin solicitud de rediseño.
- Reutilizar los SVG originales sobre cualquier mockup. No pedir a un modelo de imagen que redibuje aproximadamente el símbolo.
- Producir aplicaciones individuales, no solamente una lámina de presentación. No recortar la lámina para fingir entregables independientes.
- Distinguir imagen conceptual de vector maestro. Exportar assets editables SVG, PNG/WebP cuando corresponda.
- Validar legibilidad, contrastes, proporciones, ortografía, tamaños mínimos y consistencia de color.

## Flujo
1. Leer SKILL.md, este brief y los SVG/tokens reales.
2. Diseñar tablero de dirección de arte conservando la identidad existente.
3. Generar cada aplicación seleccionada como pieza separada.
4. Integrar archivos en brand/ y registrar variantes en el Design System Lab.
5. Validar visualmente y documentar límites.
