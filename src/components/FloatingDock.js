import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { IconAddressBook, IconBriefcase2, IconCode, IconHome, IconLayoutNavbarCollapse, IconUser } from '@tabler/icons-react';
import './PortfolioComponents.css';

export default function FloatingDock({ items }) {
  const links = items || [{title:'Home',href:'#top',icon:<IconHome/>},{title:'About',href:'#about',icon:<IconUser/>},{title:'Projects',href:'#work',icon:<IconBriefcase2/>},{title:'Playground',href:'#playground',icon:<IconCode/>},{title:'Contact',href:'#contact',icon:<IconAddressBook/>}];
  const [open,setOpen]=useState(false); const mouseX=useMotionValue(Infinity);
  return <><motion.nav className="floating-dock" aria-label="Page sections" onMouseMove={e=>mouseX.set(e.pageX)} onMouseLeave={()=>mouseX.set(Infinity)}>{links.map(item=><DockIcon key={item.title} item={item} mouseX={mouseX}/>)}</motion.nav><div className="floating-dock-mobile"><button onClick={()=>setOpen(v=>!v)} aria-label="Toggle section navigation"><IconLayoutNavbarCollapse/></button><AnimatePresence>{open&&<motion.nav initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:12}}>{links.map(item=><a key={item.title} href={item.href} aria-label={item.title} onClick={()=>setOpen(false)}>{item.icon}</a>)}</motion.nav>}</AnimatePresence></div></>;
}
export { FloatingDock };
function DockIcon({item,mouseX}) { const ref=useRef(null);const distance=useTransform(mouseX,val=>{const box=ref.current?.getBoundingClientRect()||{x:0,width:0};return val-box.x-box.width/2});const size=useSpring(useTransform(distance,[-150,0,150],[42,68,42]),{mass:.1,stiffness:150,damping:12});const iconSize=useSpring(useTransform(distance,[-150,0,150],[19,30,19]),{mass:.1,stiffness:150,damping:12});const [hover,setHover]=useState(false);return <a href={item.href} aria-label={item.title}><motion.span ref={ref} style={{width:size,height:size}} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>{hover&&<motion.small initial={{opacity:0,y:8,x:'-50%'}} animate={{opacity:1,y:0,x:'-50%'}} exit={{opacity:0}}>{item.title}</motion.small>}<motion.i style={{width:iconSize,height:iconSize}}>{item.icon}</motion.i></motion.span></a>; }
