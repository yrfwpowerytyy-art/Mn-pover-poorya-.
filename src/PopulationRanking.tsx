import React from 'react';
import {AbsoluteFill, Audio, Video, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';

const FPS = 30;
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const ranks = [
  {start:12.79,end:30.73,rank:'۰۵',country:'ایتالیا',age:'۴۸٫۵ سال'},
  {start:30.73,end:46.19,rank:'۰۴',country:'سن‌مارینو',age:'حدود ۴۹ سال'},
  {start:46.19,end:69.31,rank:'۰۳',country:'ژاپن',age:'حدود ۵۰ سال'},
  {start:69.31,end:91.31,rank:'۰۲',country:'موناکو',age:'حدود ۵۳ سال'},
  {start:91.31,end:113.55,rank:'۰۱',country:'واتیکان',age:'حدود ۵۶ سال'},
];
const changes = [12.79,30.73,46.19,69.31,91.31];
const Glass: React.FC<{children:React.ReactNode; style?:React.CSSProperties}> = ({children,style}) => (
  <div style={{
    background:'linear-gradient(120deg,rgba(225,240,239,.34),rgba(115,174,181,.20) 48%,rgba(230,244,238,.28))',
    border:'1.5px solid rgba(255,255,255,.78)',
    boxShadow:'0 12px 38px rgba(0,15,25,.22), inset 0 1px 0 rgba(255,255,255,.58), 0 0 22px rgba(55,235,214,.12)',
    backdropFilter:'blur(18px)', WebkitBackdropFilter:'blur(18px)',
    borderRadius:26, ...style
  }}>{children}</div>
);
const TopHeader: React.FC = () => (
  <div style={{position:'absolute',top:34,left:26,right:26}}>
    <Glass style={{height:72,padding:'0 22px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <div style={{display:'flex',alignItems:'center',gap:10,direction:'ltr'}}>
        <div style={{width:12,height:12,borderRadius:20,background:'#55f0d1',boxShadow:'0 0 16px #55f0d1'}}/>
        <span style={{fontFamily:'Arial,sans-serif',fontSize:11,fontWeight:800,letterSpacing:2,color:'#eafffb'}}>GLOBAL AGE INDEX</span>
      </div>
      <div dir="rtl" style={{fontSize:24,fontWeight:900,color:'#fff',textShadow:'0 2px 10px rgba(0,20,30,.6)'}}>بزرگترین جمعیت جهان</div>
    </Glass>
  </div>
);
const IntroCard: React.FC<{opacity:number; y:number}> = ({opacity,y}) => (
  <div style={{position:'absolute',top:126,left:28,right:28,opacity,transform:`translateY(${y}px)`}}>
    <Glass style={{padding:'22px 26px 24px',textAlign:'right'}}>
      <div dir="rtl" style={{fontSize:30,fontWeight:900,color:'#fff',textShadow:'0 2px 10px rgba(0,20,30,.5)'}}>پنج کشور با پیرترین جمعیت</div>
      <div dir="rtl" style={{fontSize:19,fontWeight:700,color:'#e9fffa',marginTop:8,textShadow:'0 2px 8px rgba(0,20,30,.5)'}}>کدام کشورها میانگین سنی بالاتری دارند؟</div>
      <div style={{height:4,width:150,marginTop:17,marginLeft:'auto',borderRadius:10,background:'linear-gradient(90deg,#48dfff,#4ff0b5,#b8f7a6)'}}/>
    </Glass>
  </div>
);
const RankCard: React.FC<{rank:typeof ranks[number]; opacity:number; y:number}> = ({rank,opacity,y}) => (
  <div style={{position:'absolute',top:126,left:28,right:28,opacity,transform:`translateY(${y}px)`}}>
    <Glass style={{padding:'18px 22px 19px',display:'flex',alignItems:'center',gap:18}}>
      <div style={{width:82,height:82,flexShrink:0,borderRadius:60,border:'2px solid rgba(86,246,219,.95)',boxShadow:'0 0 22px rgba(55,235,214,.25),inset 0 0 16px rgba(255,255,255,.20)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:37,fontWeight:900,color:'#fff',textShadow:'0 2px 8px rgba(0,20,30,.5)'}}>{rank.rank}</div>
      <div style={{flex:1,textAlign:'right'}} dir="rtl">
        <div style={{fontSize:13,fontWeight:800,color:'#d8fff4',letterSpacing:1}}>رتبه در فهرست</div>
        <div style={{fontSize:32,fontWeight:900,color:'#fff',lineHeight:1.35,textShadow:'0 2px 10px rgba(0,20,30,.55)'}}>{rank.country}</div>
        <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',gap:8,marginTop:4}}>
          <span style={{fontSize:17,fontWeight:800,color:'#dffff2'}}>میانگین سنی:</span>
          <span style={{fontSize:20,fontWeight:900,color:'#baffad'}}>{rank.age}</span>
        </div>
      </div>
    </Glass>
  </div>
);
const SummaryCard: React.FC<{opacity:number;y:number}> = ({opacity,y}) => {
 const rows=[['۰۱','واتیکان','حدود ۵۶ سال'],['۰۲','موناکو','حدود ۵۳ سال'],['۰۳','ژاپن','حدود ۵۰ سال'],['۰۴','سن‌مارینو','حدود ۴۹ سال'],['۰۵','ایتالیا','حدود ۴۸٫۵ سال']];
 return <div style={{position:'absolute',top:126,left:28,right:28,opacity,transform:`translateY(${y}px)`}}>
  <Glass style={{padding:'18px 20px 20px'}}>
   <div dir="rtl" style={{fontSize:27,fontWeight:900,color:'#fff',textAlign:'right',marginBottom:14,textShadow:'0 2px 10px rgba(0,20,30,.5)'}}>پنج کشور با پیرترین جمعیت</div>
   {rows.map((r,i)=><div key={r[0]} style={{height:57,marginTop:7,padding:'0 13px',borderRadius:17,display:'flex',alignItems:'center',gap:12,background:'rgba(16,49,55,.30)',border:'1px solid rgba(225,255,247,.42)'}}>
    <div style={{width:34,height:34,borderRadius:30,border:'1.5px solid #62f0d3',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:900,color:'#fff'}}>{r[0]}</div>
    <div dir="rtl" style={{flex:1,textAlign:'right',fontSize:21,fontWeight:900,color:'#fff'}}>{r[1]}</div>
    <div dir="rtl" style={{fontSize:17,fontWeight:800,color:'#c8ffb4'}}>{r[2]}</div>
   </div>)}
  </Glass>
 </div>;
};
export const PopulationRanking: React.FC = () => {
 const frame=useCurrentFrame(), sec=frame/FPS;
 const introOpacity=interpolate(sec,[0,.45,10.8,12.6],[0,1,1,0],clamp);
 const rank=ranks.find(r=>sec>=r.start&&sec<r.end);
 const rankOpacity=rank?interpolate(sec,[rank.start,rank.start+.42,rank.end-.38,rank.end],[0,1,1,0],clamp):0;
 const summaryOpacity=interpolate(sec,[113.35,113.9,128.1,128.7],[0,1,1,0],clamp);
 const rise=(o:number)=>interpolate(o,[0,1],[22,0],clamp);
 return <AbsoluteFill style={{background:'#020b12',fontFamily:'Noto Sans Arabic,Arial,sans-serif',color:'#fff',overflow:'hidden'}}>
  <Video src={staticFile('population-source-v2.mp4')} style={{width:'100%',height:'100%',objectFit:'cover'}} />
  <AbsoluteFill style={{pointerEvents:'none',background:'linear-gradient(180deg,rgba(0,10,18,.28),transparent 30%,transparent 78%,rgba(0,12,20,.18))'}}/>
  <TopHeader/>
  <IntroCard opacity={introOpacity} y={rise(introOpacity)}/>
  {rank&&<RankCard rank={rank} opacity={rankOpacity} y={rise(rankOpacity)}/>}
  <SummaryCard opacity={summaryOpacity} y={rise(summaryOpacity)}/>
  {changes.map((s,i)=><Sequence key={'wind'+i} from={Math.round(s*FPS)} durationInFrames={42}>
    <Audio src={staticFile('wind-swoosh.mp3')} volume={0.42}/>
  </Sequence>)}
  {[5.2,12.79,30.73,46.19,69.31,91.31,113.55].map((s,i)=><Sequence key={'ding'+i} from={Math.round(s*FPS)} durationInFrames={24}>
    <Audio src={staticFile('soft-ding.mp3')} volume={0.20}/>
  </Sequence>)}
 </AbsoluteFill>;
};
