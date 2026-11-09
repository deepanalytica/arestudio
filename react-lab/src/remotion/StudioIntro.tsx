import {AbsoluteFill,interpolate,useCurrentFrame} from 'remotion';

/** Storyboard exportable. El sitio estático NO ejecuta Remotion.
 * La pieza usa únicamente los colores maestros del Design System Lab.
 * 120 frames a 30 fps, cuatro escenas originales de 1 s.
 * Exportar como MP4 solo después de validar tipografías y calidad.
 */
const frames=[
  {k:'01 / INVESTIGAR',title:'Mirar mejor.',description:'Antes del diseño, las preguntas.',background:'#101729',accent:'#EFFF38',text:'#F5FAFF'},
  {k:'02 / EXPLORAR',title:'Probar caminos.',description:'Una idea siempre admite alternativas.',background:'#245BFF',accent:'#FF652F',text:'#FFFFFF'},
  {k:'03 / DIRIGIR',title:'Elegir con criterio.',description:'Arte, comunicación, datos e IA.',background:'#6236FF',accent:'#F12BBE',text:'#FFFFFF'},
  {k:'04 / CONSTRUIR',title:'Hacerlo real.',description:'Trabajo que puedes abrir y comprobar.',background:'#EFFF38',accent:'#245BFF',text:'#101729'},
] as const;

export const StudioIntro=()=>{
  const frame=useCurrentFrame();
  const index=Math.min(frames.length-1,Math.floor(frame/30));
  const local=frame-index*30;
  const scene=frames[index];
  const opacity=interpolate(local,[0,5,24,30],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const y=interpolate(local,[0,12],[48,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const bar=interpolate(local,[0,29],[0,100],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <AbsoluteFill style={{background:scene.background,color:scene.text,fontFamily:'Archivo,Arial,sans-serif',overflow:'hidden',padding:'72px 86px'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:19,fontWeight:900}}>
      <span>AR<span style={{color:scene.accent}}>/</span> ESTUDIO</span><span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:12,letterSpacing:3}}>{scene.k}</span>
    </div>
    <div style={{position:'absolute',left:'7%',top:'30%',right:'6%',opacity,transform:`translateY(${y}px)`}}>
      <div style={{fontSize:116,letterSpacing:-8,fontWeight:900,lineHeight:1.02}}>{scene.title}</div>
      <div style={{fontSize:28,fontWeight:400,marginTop:32}}>{scene.description}</div>
    </div>
    <div style={{position:'absolute',bottom:70,left:86,right:86,height:4,background:scene.text,opacity:.23}}/>
    <div style={{position:'absolute',bottom:70,left:86,width:`calc((100% - 172px) * ${bar/100})`,height:4,background:scene.accent}}/>
  </AbsoluteFill>
};
