import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

const W = 1920;
const H = 1080;
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const sceneOpacity = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, start + 18, end - 18, end], [0, 1, 1, 0], clamp);

const panel: React.CSSProperties = {
  color: '#f7fbff',
  fontFamily: 'Arial, sans-serif',
  textShadow: '0 5px 24px rgba(0,0,0,.55)',
};

const Eyebrow: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{fontSize: 23, letterSpacing: 7, fontWeight: 700, opacity: .82}}>{children}</div>
);

const Snow: React.FC<{frame: number; amount?: number}> = ({frame, amount = 95}) => (
  <AbsoluteFill style={{pointerEvents: 'none', overflow: 'hidden'}}>
    {Array.from({length: amount}).map((_, i) => {
      const size = 2 + (i % 5);
      const x = (i * 193 + (i % 7) * 41) % W;
      const y = (i * 127 + frame * (2.2 + (i % 5) * .55)) % (H + 80) - 40;
      const drift = Math.sin(frame / 28 + i) * 22;
      return <div key={i} style={{
        position: 'absolute', left: x + drift, top: y, width: size, height: size,
        borderRadius: '50%', background: '#fff', opacity: .35 + (i % 5) * .12,
        boxShadow: '0 0 10px rgba(255,255,255,.5)',
      }} />;
    })}
  </AbsoluteFill>
);

const Label: React.FC<{top?: number; left?: number; right?: number; children: React.ReactNode}> = ({top = 70, left, right, children}) => (
  <div style={{...panel, position: 'absolute', top, left, right, zIndex: 20}}>{children}</div>
);

const BedroomScene: React.FC<{frame: number}> = ({frame}) => {
  const t = frame / 30;
  const push = interpolate(frame, [0, 270], [1.08, 1.22], clamp);
  return <AbsoluteFill style={{opacity: sceneOpacity(frame, 0, 285), background: 'linear-gradient(115deg,#101d2c 0%,#26394b 52%,#526a78 100%)', overflow: 'hidden'}}>
    <div style={{position:'absolute',inset:'0 0 0 0',background:'radial-gradient(ellipse at 70% 35%,rgba(125,178,206,.3),transparent 45%)'}}/>
    <div style={{position:'absolute',left:'-8%',bottom:'-10%',width:'120%',height:'42%',background:'linear-gradient(160deg,#4d5960,#202b34)',transform:'perspective(900px) rotateX(62deg)',transformOrigin:'bottom'}}/>
    <div style={{position:'absolute',right:190,top:110,width:560,height:510,background:'#111e2b',border:'18px solid #667b87',boxShadow:'0 0 0 8px #263b49, 0 30px 80px #08121c',transform:'perspective(1000px) rotateY(-9deg)'}}>
      <div style={{position:'absolute',inset:12,background:'linear-gradient(#263f55,#9bb9c8 70%,#d8e5e9)',overflow:'hidden'}}>
        <div style={{position:'absolute',bottom:0,width:'100%',height:'34%',background:'#e8f0f2'}}/>
        <div style={{position:'absolute',left:'48%',top:0,bottom:0,width:10,background:'#526875'}}/>
        <div style={{position:'absolute',left:0,right:0,top:'52%',height:9,background:'#526875'}}/>
        <Snow frame={frame} amount={36}/>
      </div>
    </div>
    <div style={{position:'absolute',left:160,bottom:140,width:760,height:260,background:'linear-gradient(160deg,#41505c,#202c37)',borderRadius:'45% 45% 12px 12px',transform:'perspective(700px) rotateX(8deg)',boxShadow:'0 45px 80px rgba(0,0,0,.4)'}}/>
    <div style={{position:'absolute',left:470,bottom:350,width:150,height:175,borderRadius:'48% 48% 42% 42%',background:'#c9a17e',boxShadow:'inset -18px -12px 0 rgba(60,42,35,.18)',transform:`translateY(${Math.sin(t*1.5)*5}px)`}}/>
    <div style={{position:'absolute',left:430,bottom:250,width:240,height:155,borderRadius:'45% 45% 12px 12px',background:'#293c4b',transform:'rotate(-8deg)'}}/>
    <div style={{position:'absolute',left:80,bottom:80,width:830,height:360,borderRadius:24,background:'linear-gradient(135deg,#71818a,#303e49)',transform:'perspective(700px) rotateX(4deg) rotateY(5deg)',boxShadow:'0 35px 80px rgba(0,0,0,.5)'}}/>
    <div style={{position:'absolute',left:112,bottom:390,width:300,height:42,background:'#b6c4c9',borderRadius:8,opacity:.5}}/>
    <div style={{position:'absolute',right:90,bottom:100,width:300,height:170,borderRadius:22,background:'linear-gradient(145deg,#263e50,#101c29)',border:'5px solid #78909d',boxShadow:'0 15px 45px #07111a',padding:20,boxSizing:'border-box',color:'#b8efff',fontFamily:'monospace',fontSize:24}}>
      06:00 AM<div style={{fontSize:52,color:'#fff',marginTop:12}}>WAKE UP</div>
    </div>
    <div style={{position:'absolute',inset:0,transform:`scale(${push})`,transformOrigin:'50% 55%',pointerEvents:'none'}}/>
    <Label left={105} top={72}><Eyebrow>DAY 01 · THE IMPOSSIBLE MORNING</Eyebrow><div style={{fontSize:64,fontWeight:900,marginTop:18}}>Something is wrong.</div></Label>
  </AbsoluteFill>;
};

const ThermometerScene: React.FC<{frame: number}> = ({frame}) => {
  const temp = Math.round(interpolate(frame, [285, 540], [18, -50], clamp));
  const pulse = 1 + Math.sin(frame / 8) * .018;
  return <AbsoluteFill style={{opacity:sceneOpacity(frame,270,555),background:'radial-gradient(ellipse at 50% 45%,#48677a 0%,#172b3d 58%,#091522 100%)',overflow:'hidden'}}>
    <div style={{position:'absolute',inset:0,background:'linear-gradient(110deg,rgba(4,12,22,.2),rgba(160,210,230,.12),rgba(4,12,22,.4))'}}/>
    <div style={{position:'absolute',left:'50%',top:'48%',width:480,height:660,transform:`translate(-50%,-50%) scale(${pulse}) rotateY(-8deg)`,borderRadius:42,background:'linear-gradient(110deg,#d9e5e9,#6d8794 18%,#263c4b 50%,#9fb5bd 82%,#e4eef0)',boxShadow:'0 45px 100px rgba(0,0,0,.65)',padding:18,boxSizing:'border-box'}}>
      <div style={{position:'absolute',inset:18,borderRadius:30,background:'linear-gradient(145deg,#102334,#07111c)',border:'2px solid rgba(255,255,255,.25)'}}/>
      <div style={{position:'absolute',left:'50%',top:85,width:100,height:390,transform:'translateX(-50%)',borderRadius:60,background:'#0a1722',border:'12px solid #9db3bd',boxShadow:'inset 0 0 20px #000'}}>
        <div style={{position:'absolute',bottom:10,left:20,right:20,height:interpolate(frame,[285,540],[65,350],clamp),borderRadius:30,background:'linear-gradient(#b7f5ff,#35a8d1)',boxShadow:'0 0 30px #55d8ff'}}/>
      </div>
      <div style={{position:'absolute',left:'50%',bottom:45,transform:'translateX(-50%)',fontSize:100,fontWeight:900,color:'#f4fbff',fontFamily:'Arial',whiteSpace:'nowrap'}}>{temp}°</div>
      <div style={{position:'absolute',right:50,top:95,color:'#d8f6ff',fontSize:20,letterSpacing:4}}>CELSIUS</div>
    </div>
    <Snow frame={frame} amount={75}/>
    <Label left={110} top={78}><Eyebrow>GLOBAL TEMPERATURE ALERT</Eyebrow><div style={{fontSize:66,fontWeight:900,marginTop:18}}>−50°C OUTSIDE</div><div style={{fontSize:28,marginTop:12,opacity:.85}}>A sudden freeze. No time to waste.</div></Label>
  </AbsoluteFill>;
};

const CityScene: React.FC<{frame: number}> = ({frame}) => {
  const pan = interpolate(frame,[540,810],[0,-110],clamp);
  return <AbsoluteFill style={{opacity:sceneOpacity(frame,540,825),background:'linear-gradient(#182e43 0%,#7896a7 58%,#dce8ed 100%)',overflow:'hidden'}}>
    <div style={{position:'absolute',inset:0,transform:`translateX(${pan}px) scale(1.08)`}}>
      {Array.from({length:10}).map((_,i)=><div key={i} style={{position:'absolute',left:i*220-40,top:190+(i%3)*55,width:150+(i%3)*35,height:520-(i%4)*45,background:`linear-gradient(90deg,#243b4c,#526c7b 55%,#1d3345)`,border:'4px solid rgba(215,235,242,.28)',boxShadow:'18px 20px 35px rgba(0,0,0,.25)',transform:`perspective(700px) rotateY(${i%2?'-8deg':'8deg'})`}}>
        {Array.from({length:5}).map((__,j)=><div key={j} style={{position:'absolute',left:18+(j%2)*55,top:30+j*78,width:34,height:45,background:j%3===0?'#d7e8ee':'#1b2d3a',border:'2px solid #9cb4c0',opacity:.8}}/> )}
      </div>)}
      <div style={{position:'absolute',bottom:0,width:'120%',height:260,background:'linear-gradient(#e4edf0,#fff)'}}/>
      <div style={{position:'absolute',left:250,bottom:170,width:520,height:28,background:'#9eafb6',borderRadius:50,filter:'blur(12px)',opacity:.7}}/>
      <div style={{position:'absolute',left:310,bottom:190,width:420,height:190,background:'linear-gradient(145deg,#263e50,#101e2a)',clipPath:'polygon(8% 20%,90% 20%,100% 75%,0 75%)',boxShadow:'0 20px 35px #172a38'}}/>
      <div style={{position:'absolute',left:430,bottom:250,width:180,height:70,background:'#a9d6e5',border:'6px solid #263e50'}}/>
      <div style={{position:'absolute',left:300,bottom:150,width:500,height:20,background:'#172a38',borderRadius:20}}/>
    </div>
    <Snow frame={frame} amount={140}/>
    <Label left={105} top={75}><Eyebrow>THE CITY IS FREEZING</Eyebrow><div style={{fontSize:62,fontWeight:900,marginTop:16}}>Power could fail.</div><div style={{fontSize:28,marginTop:12}}>Stores are running out of time.</div></Label>
    <div style={{position:'absolute',right:100,bottom:85,...panel,textAlign:'right'}}><div style={{fontSize:20,letterSpacing:4,opacity:.8}}>EMERGENCY STATUS</div><div style={{fontSize:42,fontWeight:900,color:'#ffd28a'}}>CRITICAL</div></div>
  </AbsoluteFill>;
};

const StoreScene: React.FC<{frame: number}> = ({frame}) => {
  const move = interpolate(frame,[810,1080],[50,-40],clamp);
  return <AbsoluteFill style={{opacity:sceneOpacity(frame,810,1095),background:'linear-gradient(130deg,#172838,#526a76 55%,#172635)',overflow:'hidden'}}>
    <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 20%,rgba(255,224,164,.25),transparent 55%)'}}/>
    <div style={{position:'absolute',left:140,top:170,width:1640,height:720,transform:`perspective(1100px) rotateY(-7deg) translateX(${move}px)`,background:'linear-gradient(90deg,#273b47,#647780 50%,#1c303d)',border:'12px solid #182b37',boxShadow:'0 40px 90px rgba(0,0,0,.5)'}}>
      <div style={{position:'absolute',left:0,right:0,top:0,height:100,background:'linear-gradient(#f4c66d,#b87936)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:52,fontWeight:900,letterSpacing:12,color:'#24323b'}}>MARKET · FOOD & SUPPLIES</div>
      {Array.from({length:5}).map((_,i)=><div key={i} style={{position:'absolute',left:70+i*300,top:150,width:230,height:470,background:'linear-gradient(90deg,#182b36,#4b6069,#182b36)',border:'8px solid #9aabb0',boxShadow:'inset 0 0 25px #09131c'}}>
        {[0,1,2,3].map((j)=><div key={j} style={{position:'absolute',left:10,right:10,top:25+j*105,height:80,display:'flex',gap:8,alignItems:'end',justifyContent:'center',borderBottom:'8px solid #b4c1c5'}}>
          {Array.from({length:5}).map((__,k)=><div key={k} style={{width:27+(k%2)*7,height:38+(k%3)*12,background:['#c77c4c','#d6b45d','#6d9d83','#a8bbc0','#bd665c'][(i+j+k)%5],borderRadius:'5px 5px 2px 2px',boxShadow:'inset -5px 0 rgba(0,0,0,.18)'}}/>)}
        </div>)}
      </div>)}
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:115,background:'linear-gradient(#b3c1c5,#52646c)',transform:'perspective(400px) rotateX(8deg)',transformOrigin:'bottom'}}/>
    </div>
    <div style={{position:'absolute',left:770,bottom:115,width:360,height:230,transform:'perspective(600px) rotateY(-12deg)',border:'12px solid #202e36',borderRadius:22,background:'linear-gradient(130deg,#667d88,#273b49)',boxShadow:'0 30px 55px rgba(0,0,0,.5)'}}>
      <div style={{position:'absolute',left:30,right:30,top:20,height:85,background:'#dce8e8',borderRadius:10}}/>
      <div style={{position:'absolute',left:45,bottom:-45,width:55,height:55,borderRadius:'50%',background:'#111b23',border:'8px solid #9aabb0'}}/>
      <div style={{position:'absolute',right:45,bottom:-45,width:55,height:55,borderRadius:'50%',background:'#111b23',border:'8px solid #9aabb0'}}/>
    </div>
    <Snow frame={frame} amount={38}/>
    <Label left={105} top={75}><Eyebrow>FIRST STOP · THE GROCERY STORE</Eyebrow><div style={{fontSize:62,fontWeight:900,marginTop:16}}>Buy what matters.</div><div style={{fontSize:28,marginTop:12}}>The shelves won't stay full for long.</div></Label>
  </AbsoluteFill>;
};

const SuppliesScene: React.FC<{frame: number}> = ({frame}) => {
  const rise = interpolate(frame,[1095,1350],[90,0],clamp);
  const rotate = interpolate(frame,[1095,1350],[-7,0],clamp);
  const items = [
    {name:'FOOD',color:'#d59a54',x:0,h:170},
    {name:'WATER',color:'#65b7d2',x:210,h:205},
    {name:'BATTERIES',color:'#c7cbd0',x:420,h:145},
    {name:'FLASHLIGHT',color:'#e5c45e',x:630,h:185},
  ];
  return <AbsoluteFill style={{opacity:sceneOpacity(frame,1080,1350),background:'radial-gradient(ellipse at 50% 35%,#536c78,#182b3a 72%)',overflow:'hidden'}}>
    <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(7,18,29,.1),rgba(4,12,20,.65))'}}/>
    <div style={{position:'absolute',left:'50%',top:560,width:1120,height:380,transform:`translateX(-50%) translateY(${rise}px) rotateX(58deg) rotateZ(${rotate}deg)`,background:'linear-gradient(145deg,#647780,#1c303d)',border:'14px solid #9baeb5',borderRadius:55,boxShadow:'0 50px 90px rgba(0,0,0,.6)'}}/>
    <div style={{position:'absolute',left:'50%',top:490,display:'flex',gap:32,transform:`translate(-50%,${rise}px)`}}>
      {items.map((item,i)=><div key={item.name} style={{width:175,height:item.h,position:'relative',alignSelf:'end',background:`linear-gradient(100deg,#182b37,${item.color},#243744)`,border:'7px solid rgba(230,243,245,.65)',borderRadius:i===1?24:12,boxShadow:'0 24px 38px rgba(0,0,0,.45)',transform:`rotateY(${i%2?'-10deg':'8deg'}) translateY(${Math.sin(frame/13+i)*5}px)`}}>
        <div style={{position:'absolute',left:12,right:12,top:'38%',height:52,background:'rgba(244,248,245,.88)',display:'flex',alignItems:'center',justifyContent:'center',color:'#1a2b35',fontSize:17,fontWeight:900,letterSpacing:1}}>{item.name}</div>
      </div>)}
    </div>
    <div style={{position:'absolute',right:100,top:125,width:330,padding:28,boxSizing:'border-box',background:'linear-gradient(145deg,rgba(16,32,45,.92),rgba(48,69,81,.92))',border:'2px solid rgba(255,255,255,.3)',borderRadius:18,...panel}}>
      <div style={{fontSize:18,letterSpacing:4,opacity:.8}}>YOUR BUDGET</div>
      <div style={{fontSize:48,fontWeight:900,marginTop:12}}>10,000,000</div>
      <div style={{fontSize:17,marginTop:10,color:'#f5d38b'}}>Spend carefully</div>
    </div>
    <Label left={105} top={75}><Eyebrow>SMART SHOPPING · LIMITED BUDGET</Eyebrow><div style={{fontSize:58,fontWeight:900,marginTop:16}}>Essentials first.</div></Label>
    <div style={{position:'absolute',left:105,bottom:70,...panel,fontSize:23,letterSpacing:3,opacity:.9}}>FOOD  /  WATER  /  LIGHT  /  POWER</div>
  </AbsoluteFill>;
};

export const ColdEarth: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{background:'#081522',overflow:'hidden'}}>
    <BedroomScene frame={frame}/>
    <ThermometerScene frame={frame}/>
    <CityScene frame={frame}/>
    <StoreScene frame={frame}/>
    <SuppliesScene frame={frame}/>
    <div style={{position:'absolute',left:0,right:0,bottom:0,height:5,background:'rgba(255,255,255,.16)',zIndex:50}}>
      <div style={{height:'100%',width:`${Math.min(100,frame/1350*100)}%`,background:'#8bdcf2',boxShadow:'0 0 18px #8bdcf2'}}/>
    </div>
  </AbsoluteFill>;
};
