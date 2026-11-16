import React from 'react';
import {AbsoluteFill, Audio, Video, interpolate, staticFile, useCurrentFrame} from 'remotion';

const FPS = 30;
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
type Cue = {s:number; e:number; t:string};
const cues: Cue[] = [
{s:.17,e:5.83,t:'فکر می‌کنی پیرترین جمعیت جهان\nدر کدام کشور زندگی می‌کنند؟ شاید اولین'},
{s:5.87,e:8.09,t:'چیزی که به ذهنت می‌رسه ژاپن باشه.'},
{s:8.57,e:12.37,t:'اما جالبه بدونی حتی ژاپن\nهم رتبه اول رو نداره.'},
{s:12.79,e:14.83,t:'رتبه پنجم، ایتالیا.'},
{s:15.35,e:19.41,t:'میانگین سنی جمعیت ایتالیا\nحدود چهل و هشت سال و نیمه.'},
{s:19.91,e:24.35,t:'این کشور با کاهش نرخ تولد\nو افزایش طول عمر مواجه شده.'},
{s:24.79,e:30.13,t:'به همین دلیل جمعیت سالمندان در ایتالیا\nبخش بزرگی از جامعه رو تشکیل میده.'},
{s:30.73,e:32.97,t:'رتبه چهارم، سن مارینو.'},
{s:33.51,e:38.51,t:'کشوری بسیار کوچک که کاملاً درون\nخاک ایتالیا قرار گرفته و فقط'},
{s:38.55,e:40.93,t:'حدود سی و سه هزار نفر جمعیت داره.'},
{s:41.43,e:45.31,t:'با این حال، میانگین سنی\nمردمش نزدیک به چهل و نه ساله.'},
{s:46.19,e:48.23,t:'رتبه سوم، ژاپن.'},
{s:48.73,e:52.17,t:'میانگین سنی جمعیت ژاپن حدود پنجاه ساله.'},
{s:52.63,e:59.03,t:'این کشور به دلیل امید به زندگی بالا و\nنرخ تولد بسیار پایین با یکی از شدیدترین'},
{s:59.07,e:61.65,t:'روند‌های پیر شدن جمعیت روبه‌رو شده.'},
{s:62.19,e:68.69,t:'جالبه بدونی ژاپن حتی با کمبود نیروی کار و\nافزایش نیاز به مراقبت از سالمندان مواجهه.'},
{s:69.31,e:71.37,t:'رتبه دوم، موناکو.'},
{s:71.83,e:78.31,t:'کشوری کوچک در ساحل مدیترانه که میانگین سنی\nجمعیتش به بیش از پنجاه و سه سال می‌رسه.'},
{s:78.81,e:84.95,t:'موناکو به خاطر جمعیت کم و ترکیب سنی\nخاصش، یکی از پیرترین کشورهای جهانه.'},
{s:85.45,e:90.63,t:'یعنی در این کشور افراد مسن سهم\nبسیار بزرگی از جمعیت رو تشکیل میدن.'},
{s:91.31,e:94.27,t:'اما رتبه اول، واتیکان.'},
{s:94.71,e:99.65,t:'کوچک‌ترین کشور جهان از نظر\nمساحت با جمعیتی بسیار محدود.'},
{s:100.09,e:105.21,t:'میانگین سنی ساکنانش در برخی برآوردها\nبه بیش از پنجاه و شش سال می‌رسه.'},
{s:105.71,e:110.37,t:'البته ترکیب خاص جمعیت واتیکان\nباعث میشه این آمار با کشورهای'},
{s:110.45,e:113.01,t:'معمولی کاملاً قابل مقایسه نباشه.'},
{s:113.55,e:118.25,t:'جالبه بدونی میانگین سنی جمعیت\nکل جهان حدود سی و یک ساله.'},
{s:118.63,e:121.53,t:'یعنی فاصله بسیار زیادی با این کشورها داره.'},
{s:122.03,e:127.73,t:'حالا به نظرت چرا بعضی کشورها جمعیت\nبسیار پیرتری نسبت به بقیه دارن؟'}
];
const ranks = [
{start:12.79,end:30.73,rank:'۰۵',country:'ایتالیا'},
{start:30.73,end:46.19,rank:'۰۴',country:'سن مارینو'},
{start:46.19,end:69.31,rank:'۰۳',country:'ژاپن'},
{start:69.31,end:91.31,rank:'۰۲',country:'موناکو'},
{start:91.31,end:113.55,rank:'۰۱',country:'واتیکان'}
];
const sectionStarts = [12.79,30.73,46.19,69.31,91.31];
const Glass: React.FC<{children:React.ReactNode; style?:React.CSSProperties}> = ({children,style}) =>
<div style={{background:'linear-gradient(135deg,rgba(9,28,42,.74),rgba(10,45,53,.48))',border:'1px solid rgba(120,255,220,.42)',boxShadow:'0 0 30px rgba(0,255,190,.10), inset 0 0 24px rgba(100,220,255,.07)',backdropFilter:'blur(14px)',borderRadius:24,...style}}>{children}</div>;

export const PopulationRanking: React.FC = () => {
 const frame=useCurrentFrame(); const sec=frame/FPS;
 const cue=cues.find(c=>sec>=c.s && sec<c.e);
 const fade=cue?interpolate(sec,[cue.s,cue.s+.16,cue.e-.18,cue.e],[0,1,1,0],clamp):0;
 const rank=ranks.find(r=>sec>=r.start && sec<r.end);
 const rankIn=rank?interpolate(sec,[rank.start,rank.start+.35],[0,1],clamp):0;
 const intro=interpolate(frame,[0,18,210,245],[0,1,1,0],clamp);
 const orbPulse=1+Math.sin(frame/22)*.025;
 return <AbsoluteFill style={{background:'#020b12',fontFamily:'Noto Sans Arabic, Arial, sans-serif',color:'#efffff',overflow:'hidden'}}>
  <Video src={staticFile('population-source.mp4')} style={{width:'100%',height:'100%',objectFit:'cover'}} />
  <AbsoluteFill style={{pointerEvents:'none',background:'linear-gradient(180deg,rgba(0,10,18,.46),transparent 22%,transparent 58%,rgba(0,12,20,.42) 100%)'}}/>
  <AbsoluteFill style={{pointerEvents:'none',opacity:.23,backgroundImage:'linear-gradient(rgba(80,255,210,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(80,255,210,.12) 1px,transparent 1px)',backgroundSize:'70px 70px',maskImage:'linear-gradient(to bottom,black,transparent 70%)'}}/>
  <div style={{position:'absolute',top:34,left:26,right:26,display:'flex',justifyContent:'space-between',alignItems:'center',direction:'ltr'}}>
   <Glass style={{padding:'12px 16px',borderRadius:16,fontSize:14,letterSpacing:2,color:'#8effd9',fontWeight:800}}>EARTH • DEMOGRAPHICS</Glass>
   <div style={{width:64,height:64,borderRadius:'50%',border:'1px solid rgba(88,255,213,.7)',boxShadow:'0 0 25px rgba(0,255,200,.25)',transform: `scale(${orbPulse})`,background:'radial-gradient(circle at 32% 30%,rgba(120,255,230,.5),rgba(0,120,160,.12) 55%,transparent 70%)'}}/>
  </div>
  <div style={{position:'absolute',top:110,left:28,right:28,opacity:intro,transform:`translateY(${interpolate(intro,[0,1],[18,0])}px)`}}>
   <Glass style={{padding:'20px 22px',textAlign:'center'}}>
    <div style={{fontSize:16,color:'#7dffe1',fontWeight:800,letterSpacing:1.2}}>ترتیب کشورهای جهان</div>
    <div style={{fontSize:34,fontWeight:900,lineHeight:1.4,textShadow:'0 0 18px rgba(0,255,210,.32)'}}>با پیرترین جمعیت</div>
    <div style={{height:3,width:90,margin:'10px auto 0',borderRadius:9,background:'linear-gradient(90deg,#20e6a7,#55d8ff)'}}/>
   </Glass>
  </div>
  {rank && <div style={{position:'absolute',top:220,left:28,opacity:rankIn,transform:`translateX(${interpolate(rankIn,[0,1],[-35,0])}px)`}}>
   <Glass style={{padding:'12px 18px',display:'flex',alignItems:'center',gap:12,borderRadius:18}}>
    <div style={{fontSize:38,fontWeight:900,color:'#8effd9',textShadow:'0 0 20px rgba(40,255,190,.45)',direction:'rtl'}}>{rank.rank}</div>
    <div style={{borderLeft:'1px solid rgba(130,255,225,.4)',paddingLeft:12}}>
     <div style={{fontSize:12,color:'#83ffe0',letterSpacing:1}}>RANK</div>
     <div style={{fontSize:24,fontWeight:800}}>{rank.country}</div>
    </div>
   </Glass>
  </div>}
  {cue && <div style={{position:'absolute',left:24,right:24,bottom:72,opacity:fade,transform:`translateY(${interpolate(fade,[0,1],[18,0])}px)`}}>
   <Glass style={{padding:'18px 22px 20px',borderRadius:22}}>
    <div style={{display:'flex',justifyContent:'flex-end',marginBottom:8}}>
     <div style={{height:4,width:54,borderRadius:8,background:'linear-gradient(90deg,#2de7ad,#58d8ff)',boxShadow:'0 0 14px rgba(60,255,210,.45)'}}/>
    </div>
    <div dir="rtl" style={{fontSize:27,fontWeight:800,lineHeight:1.65,textAlign:'center',whiteSpace:'pre-line',color:'#f3ffff',textShadow:'0 1px 12px rgba(0,255,220,.22)'}}>{cue.t}</div>
   </Glass>
  </div>}
  {sectionStarts.map((s,i)=><Audio key={i} src={staticFile('wind-swoosh.mp3')} startFrom={0} volume={.26} startAt={0} endAt={42} />)}
  <div style={{position:'absolute',bottom:24,left:28,right:28,display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:11,color:'rgba(160,255,230,.68)',letterSpacing:2,direction:'ltr'}}>
   <span>GLOBAL AGE • INDEX</span><span>01 — 05</span>
  </div>
 </AbsoluteFill>;
};
