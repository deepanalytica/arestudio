from pathlib import Path
from math import sin,cos,exp,pi
import random
A=Path(__file__).parent/'assets';A.mkdir(exist_ok=True)

def write(name,s): (A/name).write_text(s,encoding='utf-8')
def start(title,defs=''):
 return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="{title}"><defs>{defs}</defs>'

def end():return '</svg>'
write('favicon.svg','''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="20" fill="#0e3c34"/><text x="8" y="52" font-size="38" font-weight="800" font-family="Arial" fill="#fff">AR</text><path d="M62 17L45 64" stroke="#b9f36c" stroke-width="8"/></svg>''')
# Hero high fidelity height map woven into layered ribbons, bright pearl gradient
random.seed(3)
s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 600" aria-hidden="true"><defs><linearGradient id="l" x1="0" y1="0" x2="1" y2=".2"><stop stop-color="#d7e1ff" stop-opacity=".4"/><stop offset=".33" stop-color="#a9dcba" stop-opacity=".65"/><stop offset=".7" stop-color="#80e0bb" stop-opacity=".85"/><stop offset="1" stop-color="#d0ec73" stop-opacity=".75"/></linearGradient><linearGradient id="shade" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#8bd1bb" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><radialGradient id="v"><stop stop-color="#f1ffd3" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs><ellipse cx="620" cy="355" rx="400" ry="200" fill="url(#v)"/>'
for layer in range(31):
 t=layer/30;pts=[]
 for i in range(110):
  x=12+i*8.8
  p1=170*exp(-((x-780)/270)**2)
  p2=90*exp(-((x-440)/210)**2)
  wave=22*sin(x*.012+layer*.09)+11*cos(x*.025-layer*.16)
  y=410+t*145 - p1*(.34+(.64*t)) - p2*(.3+.34*t)+wave*(.35+t*.5)
  pts.append((x,y))
 path='M '+' '.join(f'{x:.1f},{y:.1f}' if i==0 else f'L{x:.1f},{y:.1f}' for i,(x,y) in enumerate(pts))
 s+=f'<path d="{path}" stroke="url(#l)" fill="none" stroke-width="{1.2 if layer%4 else 1.8}" opacity="{.32+.6*t:.2f}"/>'
for j in range(0,108,5):
 s+='<path d="'+ ' '.join(('M' if k==0 else 'L')+ f'{12+j*8.8 + 1.5*sin(k*.2):.1f},{410+(k/30)*145-170*exp(-((12+j*8.8-780)/270)**2)*(.34+.64*k/30)-90*exp(-((12+j*8.8-440)/210)**2)*(.3+.34*k/30)+(22*sin((12+j*8.8)*.012+k*.09)+11*cos((12+j*8.8)*.025-k*.16))*(.35+k/30*.5):.1f}' for k in range(31)) + '" stroke="#83bcac" stroke-opacity=".22" stroke-width="1" fill="none"/>'
s+='</svg>';write('hero-mesh.svg',s)
# Archivo art: textured orange editorial forms
s=start('AR archivo, composición editorial en naranja','''<linearGradient id="bg" x2="1" y2="1"><stop stop-color="#ffc494"/><stop offset=".55" stop-color="#e7693d"/><stop offset="1" stop-color="#b43b25"/></linearGradient><linearGradient id="paper" x2="1" y2="1"><stop stop-color="#fff8e8"/><stop offset="1" stop-color="#e5cdbc"/></linearGradient><filter id="sh"><feDropShadow dx="3" dy="15" stdDeviation="14" flood-color="#5b1c0d" flood-opacity=".25"/></filter>''')
s+='<rect width="800" height="600" fill="url(#bg)"/><circle cx="745" cy="40" r="260" fill="#ffddbe" opacity=".24"/>'
for i in range(18):
 x=i*62-200;s+=f'<path d="M{x} -60L{x+320} 660" stroke="#ffdfce" opacity=".10" stroke-width="5"/>'
s+='<text x="26" y="553" fill="#ffd1b6" font-size="470" font-family="Arial,sans-serif" font-weight="900" opacity=".19">A</text>'
for i,(x,y,deg) in enumerate([(153,94,-13),(205,76,-5),(249,103,6)]):
 s+=f'<g transform="translate({x} {y}) rotate({deg} 155 200)" filter="url(#sh)"><rect x="0" y="0" width="338" height="420" rx="12" fill="url(#paper)" stroke="#fff" stroke-opacity=".5"/><path d="M24 68H308M24 345H308" stroke="#d0a89b" stroke-width="2"/><text x="25" y="146" font-family="Georgia,serif" font-size="57" font-style="italic" fill="#4c342d">Archivo</text><text x="26" y="178" font-family="Arial" font-size="13" letter-spacing="5" fill="#81574c">EDICIÓN 00{i+1}</text><rect x="25" y="205" width="287" height="106" rx="2" fill="{["#a64d35","#e8a773","#bd7159"][i]}"/><circle cx="186" cy="256" r="49" fill="#f4d0af" opacity=".6"/><path d="M25 365h200" stroke="#8d7067" stroke-width="7" stroke-opacity=".22"/></g>'
s+='<text x="46" y="72" font-family="Arial" font-size="12" font-weight="700" letter-spacing="8" fill="#fff4e8">AR / EDITORIAL SYSTEM</text>'+end();write('archivo.svg',s)
# Geo art: procedural luminescent contour field
s=start('Deep Geo, topografía de líneas turquesas sobre fondo petróleo','''<linearGradient id="b" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#092f38"/><stop offset=".53" stop-color="#006366"/><stop offset="1" stop-color="#072a3b"/></linearGradient><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#0e9fba"/><stop offset=".52" stop-color="#58efb7"/><stop offset=".81" stop-color="#ddfa69"/><stop offset="1" stop-color="#4cdbb3"/></linearGradient><radialGradient id="gl"><stop stop-color="#44eea2" stop-opacity=".52"/><stop offset="1" stop-color="#0c4d57" stop-opacity="0"/></radialGradient>''')
s+='<rect width="800" height="600" fill="url(#b)"/><ellipse cx="540" cy="270" rx="360" ry="230" fill="url(#gl)"/>'
for t in range(48):
 coords=[]
 for j in range(90):
  x=j*9-10;p=1.5*exp(-((x-540)/240)**2)+.7*exp(-((x-250)/170)**2)
  y=490+t*3.4 - p*(65+ t*.96)+18*sin(x*.025+t*.058)+11*cos(x*.013-t*.09)
  coords.append((x,y))
 path='M '+' '.join((f'{x:.1f},{y:.1f}' if j==0 else f'L{x:.1f},{y:.1f}') for j,(x,y) in enumerate(coords))
 s+=f'<path d="{path}" fill="none" stroke="url(#g)" stroke-width="{1.3 if t%4 else 1.8}" opacity="{.40+(t/48)*.49:.2f}"/>'
for x in range(70,810,80):s+=f'<path d="M{x} 100V565" stroke="#b1f8ec" opacity=".12"/>'
for y in range(110,590,80):s+=f'<path d="M25 {y}H785" stroke="#b1f8ec" opacity=".12"/>'
s+='<path d="M55 95h32m-32 0v32 M700 480h40m0 0v-40" stroke="#9bf4d6" stroke-width="3" fill="none"/><circle cx="515" cy="298" r="9" fill="#d3ff8e" stroke="#fff"/><circle cx="515" cy="298" r="32" fill="none" stroke="#d3ff8e" opacity=".6"/><text x="44" y="64" fill="#bdfded" font-size="15" font-family="monospace" letter-spacing="4">SPATIAL INTELLIGENCE / 02</text>'+end();write('deep-geo.svg',s)
# Praxios art: translucent layered architecture violet
s=start('Praxios, capas de interfaces lilas flotantes','''<linearGradient id="bg" x2="1" y2="1"><stop stop-color="#f1d7fb"/><stop offset=".5" stop-color="#aa92f0"/><stop offset="1" stop-color="#6e61c7"/></linearGradient><linearGradient id="pane" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".75"/><stop offset=".6" stop-color="#e4dcff" stop-opacity=".5"/><stop offset="1" stop-color="#8988ec" stop-opacity=".36"/></linearGradient><filter id="shadow"><feDropShadow dx="8" dy="21" stdDeviation="20" flood-color="#464594" flood-opacity=".25"/></filter>''')
s+='<rect width="800" height="600" fill="url(#bg)"/><circle cx="685" cy="80" r="260" fill="#eddcff" opacity=".38"/><path d="M0 530Q280 260 800 400V600H0Z" fill="#9d87d8" opacity=".28"/>'
for i in range(4):
 x=170+i*60;y=145-i*36
 s+=f'<g transform="translate({x} {y}) skewY(-7)" filter="url(#shadow)"><rect width="350" height="350" rx="26" fill="url(#pane)" stroke="#fff" stroke-width="3" opacity="{.65+i*.08}"/><rect x="25" y="29" width="115" height="10" rx="5" fill="#fff" opacity=".7"/><rect x="25" y="55" width="205" height="6" rx="3" fill="#fff" opacity=".4"/><circle cx="312" cy="34" r="9" fill="#fff" opacity=".9"/></g>'
s+='<g transform="translate(382 280)"><path d="M0 -75L22 -22L76 0L22 21L0 75L-21 21L-75 0L-21 -22Z" fill="#fff" opacity=".8"/><circle r="22" fill="#b2a1ef"/></g><text x="44" y="66" fill="#453c8f" font-size="14" font-family="monospace" letter-spacing="4">SYSTEMS / VERIFIED WORKFLOWS</text>'+end();write('praxios.svg',s)
# Visual marketing art: artistic silhouette as shapes not real photo
s=start('Visual Art AI, composición abstracta rosa y magenta de comunicación','''<linearGradient id="bg" x2="1" y2="1"><stop stop-color="#ffb77f"/><stop offset=".5" stop-color="#ea78b8"/><stop offset="1" stop-color="#9459c8"/></linearGradient><radialGradient id="pink"><stop stop-color="#ffe1a4"/><stop offset="1" stop-color="#f35b99" stop-opacity="0"/></radialGradient><filter id="blur"><feGaussianBlur stdDeviation="24"/></filter>''')
s+='<rect width="800" height="600" fill="url(#bg)"/><circle cx="310" cy="330" r="250" fill="url(#pink)"/><path d="M760 0C650 280 520 180 220 580" stroke="#fff" stroke-width="140" opacity=".15" fill="none"/><path d="M760 0C650 280 520 180 220 580" stroke="#ffe3ed" stroke-width="25" opacity=".48" fill="none"/>'
for i in range(44):
 cx=440+195*sin(i*.28);cy=260+130*cos(i*.33);r=23+10*sin(i*.4)
 s+=f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{r:.1f}" fill="none" stroke="{["#fff2ec","#ffcae8","#eae3ff"][i%3]}" stroke-width="1.8" opacity="{.21+(i%8)*.065:.2f}"/>'
s+='<path d="M210 200h95M210 200v95 M620 395h-95M620 395v-95" stroke="#fff" stroke-width="4" opacity=".85"/><circle cx="412" cy="306" r="92" fill="#ec7cb7" opacity=".75"/><circle cx="409" cy="302" r="67" fill="#ffc7d8" opacity=".38"/><text x="46" y="62" font-family="monospace" font-size="15" fill="#fff" letter-spacing="4">STORY / GROWTH / VISIBILITY</text>'+end();write('visual.svg',s)
# small category visual art 4 variants
for kind, palette in [('systems',('#1c3d42','#75cab2','#b2eb9a')),('data',('#0f4859','#4efab1','#b9ff6d')),('research',('#e3d8c4','#bc764c','#f8f1e3')),('communication',('#6f3b93','#f496c8','#f7d5a4')),('design',('#e9c5aa','#f37c4c','#fff4cd'))]:
 bg,a,b=palette;s=start(f'Abstracción para {kind}',f'<linearGradient id="g" x2="1" y2="1"><stop stop-color="{bg}"/><stop offset="1" stop-color="{a}"/></linearGradient>')
 s+='<rect width="800" height="600" fill="url(#g)"/>'
 for i in range(15):
  x=45+i*65; y=310+100*sin(i*.6)
  s+=f'<path d="M{x-300} 660 Q{x+60} {y-210} {x+430} -50" fill="none" stroke="{b}" stroke-opacity="{.17+i*.03:.2f}" stroke-width="{2+i*.25:.1f}"/>'
 s+='<circle cx="600" cy="130" r="130" fill="'+b+'" opacity=".16"/>'+end();write('mini-'+kind+'.svg',s)
# social cover
write('og.svg','''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><defs><linearGradient id="b" x2="1" y2="1"><stop stop-color="#f8f9f6"/><stop offset="1" stop-color="#e3f2e8"/></linearGradient></defs><rect width="1200" height="630" fill="url(#b)"/><path d="M700 500Q850 150 1200 260V650H700Z" fill="#b4e8bd" opacity=".32"/><text x="80" y="140" font-family="Arial" font-size="65" font-weight="900" fill="#0e3c34">AR<tspan fill="#53d475">/</tspan></text><text x="80" y="322" font-family="Arial" font-size="96" font-weight="900" fill="#132f28">Ideas que</text><text x="80" y="423" font-family="Arial" font-size="96" font-weight="900" fill="#132f28">funcionan<tspan fill="#53d475">.</tspan></text><text x="82" y="510" font-family="Arial" font-size="30" fill="#627a6a">Diseño · Datos · Tecnología · Comunicación</text></svg>''')
try:
 import cairosvg
 cairosvg.svg2png(bytestring=(A/'og.svg').read_bytes(),write_to=str(A/'og.png'))
except Exception as e: print('og conversion failed',e)
print('generated SVGs',[(p.name,p.stat().st_size) for p in A.iterdir()])