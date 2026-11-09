import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { IconBrightnessDown, IconBrightnessUp, IconChevronUp, IconCommand, IconMicrophone, IconMoon, IconPlayerTrackNext, IconPlayerTrackPrev, IconSearch, IconTable, IconVolume, IconWorld } from '@tabler/icons-react';
import './PortfolioComponents.css';

export function MacbookScroll({ src, title, badge, showGradient = false }) {
  const ref = useRef(null);
  const [mobile, setMobile] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  useEffect(() => { const update = () => setMobile(window.innerWidth < 768); update(); window.addEventListener('resize', update); return () => window.removeEventListener('resize', update); }, []);
  const scaleX = useTransform(scrollYProgress, [0, .3], [1.2, mobile ? 1 : 1.5]);
  const scaleY = useTransform(scrollYProgress, [0, .3], [.6, mobile ? 1 : 1.5]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, 1200]);
  const rotate = useTransform(scrollYProgress, [.1, .12, .3], [-28, -28, 0]);
  const opacity = useTransform(scrollYProgress, [0, .2], [1, 0]);
  return <div className="macbook-scroll" ref={ref}><motion.h2 style={{ opacity }}>{title || <>Dwiz Sharma · Software Developer<br/>Building useful things with <em>curiosity.</em></>}</motion.h2><div className="macbook-scene"><div className="macbook-lid"><div className="macbook-rear"/><motion.div className="macbook-moving-screen" style={{ scaleX, scaleY, rotateX: rotate, y: translate, transformOrigin: 'top' }}><div className="macbook-screen"><img src={src || '/assets/dwiz-career-dashboard.svg'} alt="Dwiz Sharma software developer portfolio dashboard"/><span className="camera-dot"/></div></motion.div></div><div className="macbook-base"><div className="hinge"/><div className="keyboard-layout"><SpeakerGrid/><Keypad/><SpeakerGrid/></div><Trackpad/>{badge&&<span className="macbook-badge">{badge}</span>}{showGradient&&<div className="macbook-gradient"/>}</div></div></div>;
}

export function Lid({ src, scaleX, scaleY, rotate, translate }) { return <div className="macbook-lid"><div className="macbook-rear"/><motion.div className="macbook-moving-screen" style={{scaleX,scaleY,rotateX:rotate,y:translate,transformOrigin:'top'}}><div className="macbook-screen">{src&&<img src={src} alt="Laptop screen"/>}<span className="camera-dot"/></div></motion.div></div>; }
export function Trackpad() { return <div className="mac-trackpad"/>; }
export function KBtn({ children, className = '', childrenClassName = '', backlit = true }) { return <div className={`mac-key-wrap ${backlit?'backlit':''}`}><div className={`mac-key ${className}`}><span className={childrenClassName}>{children}</span></div></div>; }
export function OptionKey({ className = '' }) { return <span className={`option-key ${className}`}>⌥</span>; }
export function SpeakerGrid() { return <div className="speaker-grid"/>; }
export function Keypad() { const rows=[[<IconBrightnessDown/>,<IconBrightnessUp/>,<IconTable/>,<IconSearch/>,<IconMicrophone/>,<IconMoon/>,<IconPlayerTrackPrev/>,<IconPlayerTrackNext/>,<IconVolume/>],['~ 1','! 2','@ 3','# 4','$ 5','% 6','^ 7','& 8','* 9','( 0','—','+','delete'],['Q','W','E','R','T','Y','U','I','O','P','{','}','⌫'],['A','S','D','F','G','H','J','K','L',':',';','return'],['Z','X','C','V','B','N','M','<',',','>','.','shift'],[<IconWorld/>,<IconChevronUp/>,<OptionKey/>,<IconCommand/>, 'space',<IconCommand/>,<OptionKey/>]]; return <div className="keyboard-keys">{rows.map((row,i)=><div className="key-row" key={i}>{row.map((key,j)=><KBtn key={j} className={typeof key==='string'&&key.length>2?'wide':''}>{key}</KBtn>)}</div>)}</div>; }
