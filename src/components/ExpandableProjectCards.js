import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from 'motion/react';
import './PortfolioComponents.css';

export function useOutsideClick(ref, callback) {
  useEffect(() => {
    const listener = event => { if (!ref.current || ref.current.contains(event.target)) return; callback(event); };
    document.addEventListener('mousedown', listener); document.addEventListener('touchstart', listener);
    return () => { document.removeEventListener('mousedown', listener); document.removeEventListener('touchstart', listener); };
  }, [ref, callback]);
}
export function CloseIcon() { return <span className="expand-close-icon" aria-hidden="true">×</span>; }
export default function ExpandableCardDemo({ cards = [] }) {
  const [active, setActive] = useState(null); const [hovered, setHovered] = useState(null); const ref = useRef(null); const pointerX=useMotionValue(-400); const pointerY=useMotionValue(-400); const smoothX=useSpring(pointerX,{stiffness:130,damping:18,mass:.5}); const smoothY=useSpring(pointerY,{stiffness:130,damping:18,mass:.5}); const speed=useVelocity(pointerX); const tilt=useTransform(speed,[-2500,0,2500],[-12,0,12]);
  useEffect(() => { const key = e => { if (e.key === 'Escape') setActive(null); }; document.body.style.overflow = active ? 'hidden' : 'auto'; window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key); }, [active]);
  useOutsideClick(ref, () => setActive(null));
  const preview = hovered && ({devflow:'/assets/devflow-project.svg',ocean:'/assets/oceanembed-project.svg',arena:'/assets/arenax-project.svg',triage:'/assets/triage-project.svg',finance:'/assets/finance-project.svg',shortener:'/assets/shortener-project.svg',codealpha:'/assets/codealpha-project.svg',nexus:'/assets/nexus-project.svg'}[hovered.kind]);
  return <><AnimatePresence>{preview&&<motion.img className="project-hover-image" src={preview} alt="" initial={{opacity:0,scale:.84}} animate={{opacity:1,scale:1,rotate:tilt}} exit={{opacity:0,scale:.88}} style={{x:smoothX,y:smoothY,rotate:tilt}}/>}</AnimatePresence><AnimatePresence>{active&&<motion.div className="expand-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setActive(null)}/>}</AnimatePresence><AnimatePresence>{active&&<div className="expand-modal-wrap"><motion.article ref={ref} layoutId={`project-${active.id}`} className="expand-modal" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}}><button className="expand-close" onClick={()=>setActive(null)} aria-label="Close project overview"><CloseIcon/></button><div className="expand-visual" style={{'--card-accent':active.color}}><span>{active.num} / {active.label}</span><b>{active.title}</b><small>{active.stack.slice(0,3).join(' · ')}</small></div><div className="expand-copy"><div><h3>{active.title}</h3><p>{active.desc}</p></div><a href={`#project/${active.id}`} onClick={()=>setActive(null)}>OPEN PROJECT ↗</a></div><div className="expand-content"><b>OVERVIEW</b><p>{active.summary}</p><div>{active.stack.map(s=><span key={s}>{s}</span>)}</div><a href={`#project/${active.id}`} onClick={()=>setActive(null)}>Explore the full project story <span>↗</span></a></div></motion.article></div>}</AnimatePresence><div className="expandable-project-list">{cards.map(card=><motion.button type="button" layoutId={`project-${card.id}`} key={card.id} className="expandable-project" onMouseEnter={()=>setHovered(card)} onMouseLeave={()=>setHovered(null)} onMouseMove={e=>{pointerX.set(e.clientX+28);pointerY.set(e.clientY-145)}} onClick={()=>setActive(card)}><span className="expandable-number">{card.num}</span><span className="expandable-info"><b>{card.title}</b><small>{card.desc}</small></span><span className="expandable-cta">OVERVIEW ↗</span></motion.button>)}</div></>;
}
export { ExpandableCardDemo };
