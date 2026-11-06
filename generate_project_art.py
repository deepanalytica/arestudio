#!/usr/bin/env python3
"""AR/ Studio: reproducible illustrative project covers (conceptual, not product screenshots)."""
from pathlib import Path
from math import sin,cos,pi,exp
from random import Random
from html import escape

OUT=Path(__file__).resolve().parent/'assets'
DATA={
'conv-os':('Conversation Ops','messages','#112F38','#68D8C5','#D9F875','messages'),
'msj':('MSJ','connections','#34234F','#F7A8CB','#FFDAB9','messages'),
'radar-conv-os':('Radar Conv OS','market signals','#053F43','#6FE0D4','#E7F878','radar'),
'deep-living':('Deep Living','life stages','#EADCD6','#FF754F','#603D77','waves'),
'meta-harness':('Meta Harness','orchestration','#102F32','#82F1B3','#A8A2FF','nodes'),
'atalaya':('Atalaya','observability','#242B4C','#F7CB66','#79C7FF','radar'),
'eureka':('EUREKA','knowledge','#32213C','#FFB778','#FF6B81','orbit'),
'el-tiburon':('El Tiburón','adversarial thinking','#152D43','#89C4D0','#F5D882','sharks'),
'la-escalera':('La Escalera','continuity','#ECE8FB','#7957CA','#FC9277','stairs'),
'super-prompt-euler':('Euler','specification','#F0EBD7','#CB6143','#4D435C','orbit'),
'geoanalytica':('GeoAnalytica','spatial analysis','#144E4B','#91E4CF','#D3F578','terrain'),
'inverse-reality-lab':('Inverse Reality','hypotheses','#242444','#B69EFF','#FCA899','mirror'),
'deep-licita':('Deep Licita','document intelligence','#F1E6D4','#277E78','#F49B6B','paper'),
'sin-humo':('Sin Humo','critical inquiry','#E9E3D9','#1B2A2A','#F16D43','type'),
'el-puente':('El Puente','bridge building','#DCEBF1','#14404C','#EE835B','bridge'),
'deep-audio':('Deep Audio','sound design','#291B3C','#F89DB6','#A4C8FF','audio'),
'wal':('WAL','visual commerce','#F9E6D0','#EB6538','#123E35','commerce'),
}

def svg_head(key,title,subtitle,bg,main,accent):
 return [f'<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540" role="img" aria-labelledby="t d">',
 f'<title id="t">{escape(title)} — ilustración editorial AR/</title><desc id="d">Composición abstracta de {escape(subtitle)}; no es una captura de producto.</desc>',
 f'<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="{bg}"/><stop offset="1" stop-color="{main}" stop-opacity=".22"/></linearGradient><linearGradient id="line" x1="0" y1="0" x2="1" y2="0"><stop stop-color="{main}"/><stop offset="1" stop-color="{accent}"/></linearGradient></defs>',
 f'<rect width="960" height="540" fill="{bg}"/><rect width="960" height="540" fill="url(#bg)" opacity=".42"/>',
 '<path d="M44 38h45 M44 38v45 M916 38h-45 M916 38v45 M44 502h45 M44 502v-45 M916 502h-45 M916 502v-45" fill="none" stroke="'+main+'" opacity=".27" stroke-width="2"/>',
 f'<text x="56" y="76" fill="{main}" font-family="ui-monospace,monospace" letter-spacing="4" font-size="17" opacity=".8">AR/ — {escape(subtitle.upper())}</text>']

def wavepath(seed,idx,start=210,amp=45):
 return ' '.join(('M' if i==0 else 'L')+f'{int(i*12)} {int(start+idx*5+amp*sin(i*.135+idx*.18+seed)*cos(i*.04+seed))}' for i in range(82))

def build(key,title,sub,bg,main,accent,motif):
 rng=Random(sum(ord(c) for c in key)); s=svg_head(key,title,sub,bg,main,accent)
 if motif in ('terrain','waves','audio','sharks'):
  for j in range(65):
   path=wavepath(.9+j*.035,j,start=150 if motif!='audio' else 260,amp=65 if motif=='terrain' else 28 if motif=='audio' else 48)
   s.append(f'<path d="{path}" fill="none" stroke="{main if j%3 else accent}" stroke-width="{.9 if j%3 else 1.4}" opacity="{.20+.6*(j/65):.3f}"/>')
  if motif=='sharks':
   s += [f'<path d="M395 410 L548 108 Q579 55 598 183 L692 410Z" fill="{accent}" opacity=".85"/>','<path d="M430 413L554 171L572 284" stroke="#fff" opacity=".6" stroke-width="3" fill="none"/>']
  if motif=='audio':
   for i in range(52):
    x=170+i*13; h=35+125*(.2+abs(sin(i*.43)*cos(i*.14)))
    s.append(f'<rect x="{x}" y="{260-h}" width="4" height="{2*h}" rx="2" fill="{accent if i%6==0 else main}" opacity=".74"/>')
 if motif in ('radar','orbit'):
  for j in range(7):
   r=52+j*42;s.append(f'<circle cx="600" cy="275" r="{r}" stroke="{main}" fill="none" stroke-width="{1.5 if j%2 else 3}" opacity="{.38+j*.067:.3f}"/>')
  for i in range(27):
   a=i*2.4;r=70+((i*31)%235);x=600+cos(a)*r;y=275+sin(a)*r;s.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{2+(i%3)*2}" fill="{accent}" opacity=".87"/>')
  s += [f'<path d="M600 275L815 120" stroke="{accent}" stroke-width="4"/>',f'<circle cx="600" cy="275" r="10" fill="{accent}"/>']
 if motif=='messages':
  for i in range(7):
   x=180+(i%2)*205+(i%3)*28;y=150+i*44
   w=250 if i%2==0 else 210
   s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{66 if i%2==0 else 52}" rx="21" fill="{accent if i%3==0 else main}" opacity="{.9-i*.07:.2f}"/>')
   for j in range(3):s.append(f'<rect x="{x+21}" y="{y+17+j*11}" width="{w-45-j*23}" height="5" rx="2" fill="{bg}" opacity=".4"/>')
 if motif=='nodes':
  coords=[(160,290),(265,168),(385,352),(489,208),(610,315),(755,128),(825,380),(300,440)]
  for i,(x,y) in enumerate(coords):
   for j in range(i+1,len(coords)):
    if (i+j)%3==0:s.append(f'<path d="M{x} {y}L{coords[j][0]} {coords[j][1]}" stroke="{main}" stroke-width="2" opacity=".38"/>')
  for i,(x,y) in enumerate(coords):
   s+=[f'<circle cx="{x}" cy="{y}" r="{25+i%3*9}" fill="{bg}" stroke="{main}" stroke-width="3"/>',f'<circle cx="{x}" cy="{y}" r="{5+i%2*4}" fill="{accent}"/>']
 if motif=='stairs':
  for i in range(11):
   x=145+i*57;y=425-i*28;w=52;h=80+i*11
   s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="7" fill="{main}" opacity="{.2+(i/11)*.75:.2f}"/>')
   s.append(f'<path d="M{x} {y}l25 -20h52l-25 20" fill="{accent}" opacity="{.3+i*.05:.3f}"/>')
 if motif=='paper':
  for i in range(5):
   x=260+i*65;y=154+i*26
   s.append(f'<g transform="rotate({-13+i*7} {x+90} {y+125})"><rect x="{x}" y="{y}" width="180" height="250" rx="11" fill="{main if i%2 else accent}" opacity=".92"/>')
   for j in range(8):s.append(f'<rect x="{x+18}" y="{y+34+j*21}" width="{132-j*7}" height="5" rx="2" fill="#fff" opacity=".65"/>')
   s.append('</g>')
 if motif=='mirror':
  for i in range(10):
   x=260+i*40
   s.append(f'<path d="M{x} 140l130 130l-130 130l-130 -130Z" fill="none" stroke="{main if i%2 else accent}" opacity="{.12+i*.07:.2f}" stroke-width="{2+i%3}"/>')
 if motif=='bridge':
  s.append(f'<path d="M88 425Q470 -55 865 420" stroke="{main}" stroke-width="24" fill="none" opacity=".95"/>')
  s.append(f'<path d="M88 425Q470 180 865 420" stroke="{accent}" stroke-width="12" fill="none"/>')
  for i in range(21):
   x=104+i*37;s.append(f'<line x1="{x}" y1="{330-125*sin(i/20*pi):.1f}" x2="{x}" y2="435" stroke="{main}" stroke-width="2" opacity=".4"/>')
 if motif=='commerce':
  for i in range(8):
   x=118+i*75;y=141+(i%3)*40
   s.append(f'<g transform="rotate({-14+i*4} {x+65} {y+150})"><rect x="{x}" y="{y}" width="125" height="225" rx="7" fill="{main if i%2==0 else accent}"/>')
   s.append(f'<rect x="{x+15}" y="{y+22}" width="95" height="130" rx="2" fill="{bg}" opacity=".4"/><circle cx="{x+62}" cy="{y+95}" r="34" fill="{accent if i%2==0 else main}" opacity=".7"/></g>')
 if motif=='type':
  s.append(f'<text x="150" y="340" fill="{main}" font-family="Georgia,serif" font-size="205" font-weight="bold" letter-spacing="-17">SIN</text>')
  s.append(f'<text x="245" y="430" fill="{accent}" font-family="ui-sans-serif,sans-serif" font-size="98" font-weight="900" letter-spacing="-7">HUMO.</text>')
 s.append(f'<path d="M55 468H905" stroke="{main}" opacity=".24"/>')
 s.append(f'<text x="60" y="492" fill="{main}" font-size="16" font-family="ui-monospace,monospace" letter-spacing="3">{escape(key.upper().replace("-"," / "))}</text>')
 s.append(f'<text x="899" y="492" text-anchor="end" fill="{main}" opacity=".7" font-size="13" font-family="ui-monospace,monospace">AR / 2026</text>')
 s.append('</svg>')
 return '\n'.join(s)

if __name__=='__main__':
 OUT.mkdir(exist_ok=True)
 for key,args in DATA.items():
  (OUT/f'cover-{key}.svg').write_text(build(key,*args),encoding='utf-8')
 print('Generated',len(DATA),'unique conceptual artwork covers')