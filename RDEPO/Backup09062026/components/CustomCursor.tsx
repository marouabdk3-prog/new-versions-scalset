"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current || !glowRef.current) return;

    // Center the custom cursor
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
    gsap.set(glowRef.current, { xPercent: -50, yPercent: -50 });

    const xToCursor = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
    const yToCursor = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });
    
    const xToGlow = gsap.quickTo(glowRef.current, "x", { duration: 0.4, ease: "power3" });
    const yToGlow = gsap.quickTo(glowRef.current, "y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToGlow(e.clientX);
      yToGlow(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Small dot cursor */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      {/* Large luminous glow behind cursor */}
      <div 
        ref={glowRef} 
        className="fixed top-0 left-0 w-64 h-64 bg-amber-100/10 rounded-full pointer-events-none z-[9998]"
        style={{ filter: "blur(60px)" }}
      />
    </>
  );
}
