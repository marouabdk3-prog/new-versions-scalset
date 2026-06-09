"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  
  const childrenArray = React.Children.toArray(children);
  const numSections = childrenArray.length;

  useEffect(() => {
    if (!containerRef.current || !pinRef.current || numSections <= 1) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${numSections * 100}%`,
          scrub: 1,
          pin: pinRef.current,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (numSections - 1),
            duration: 0.5,
            ease: "power2.inOut"
          }
        },
      });

      // Initialize layout safely via GSAP.
      for (let i = 1; i < numSections; i++) {
        gsap.set(`.section-content-${i}`, { 
            yPercent: 100, // Position off-screen to the bottom
            opacity: 1,
            visibility: "visible"
        });
      }
      gsap.set(`.section-content-0`, { yPercent: 0, opacity: 1, visibility: "visible" });

      for (let i = 1; i < numSections; i++) {
        const prevSection = `.section-content-${i - 1}`;
        const currSection = `.section-content-${i}`;

        const label = `transition-${i}`;
        tl.addLabel(label);

        // Slide out previous section to the top
        tl.set(prevSection, { pointerEvents: "none" }, label);
        tl.fromTo(prevSection, { yPercent: 0 }, { yPercent: -100, duration: 1, ease: "none" }, label);
        
        // Slide in current section from the bottom
        tl.set(currSection, { pointerEvents: "auto" }, label);
        tl.fromTo(currSection, { yPercent: 100 }, { yPercent: 0, duration: 1, ease: "none" }, label);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [numSections]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#050505] text-white" style={{ height: `${numSections * 100}vh` }}>
      <div ref={pinRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Background Smoky effect */}
        <div className="absolute inset-0 pointer-events-none z-0 bg-[#050505]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(30,30,25,0.4)_0%,_#050505_70%)] opacity-90" />
        </div>

        {/* Content Layers */}
        <div className="relative z-10 w-full h-full pointer-events-none overflow-hidden">
          {childrenArray.map((child, index) => (
            <div 
              key={`section-${index}`}
              className={`section-content-${index} absolute inset-0 w-full h-full`}
              style={{ 
                opacity: index === 0 ? 1 : 0, 
                visibility: index === 0 ? 'visible' : 'hidden',
                pointerEvents: index === 0 ? 'auto' : 'none' 
              }}
            >
               <div className="w-full h-full overflow-hidden">
                  {child}
               </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
