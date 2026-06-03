"use client";

import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const ZOOM_CX = 50;
const ZOOM_CY = 43;

const SCR_X  = 35;
const SCR_Y  = 26;
const SCR_W  = 30;
const SCR_H  = 34;
const SCR_RX = 4;

export default function MercuryIntro() {
  const pathname = usePathname();
  const isHome   = pathname === "/";
  const [done, setDone] = useState(false);
  const doneRef         = useRef(false);
  const progressRef     = useRef(0);

  const imgWrapRef     = useRef<HTMLDivElement>(null);
  const blurLayerRef   = useRef<HTMLDivElement>(null);
  const smokeRef       = useRef<HTMLDivElement>(null);
  const hintRef        = useRef<HTMLDivElement>(null);
  const portalFiredRef = useRef(false);

  useEffect(() => {
    if (!isHome || done) return;

    document.body.style.overflow = "hidden";
    document.body.classList.add("intro-active");
    document.body.classList.add("intro-no-events");

    const apply = (p: number) => {
      // ── Zoom direct ──
      if (imgWrapRef.current) {
        const scale   = 1 + p * 1.4;
        const opacity = p >= 0.62 ? Math.max(0, 1 - (p - 0.62) / 0.30) : 1;
        imgWrapRef.current.style.transform = `scale(${scale.toFixed(4)})`;
        imgWrapRef.current.style.opacity   = opacity.toFixed(4);
      }
      // ── Hint ──
      if (hintRef.current) {
        hintRef.current.style.opacity = String(Math.max(0, 1 - p * 15));
      }
      // ── Fumée noire autour du visage ──
      if (blurLayerRef.current) {
        blurLayerRef.current.style.opacity = Math.min(1, p * 1.8).toFixed(3);
      }
      if (smokeRef.current) {
        smokeRef.current.style.opacity = Math.min(1, p * 1.4).toFixed(3);
      }
      // ── Portal à 65% ──
      if (p >= 0.65 && !portalFiredRef.current) {
        portalFiredRef.current = true;
        window.dispatchEvent(new CustomEvent("site-portal-entry"));
      }
      // ── Révèle site à 40% ──
      if (p >= 0.40) {
        document.body.classList.remove("intro-active");
      } else {
        document.body.classList.add("intro-active");
      }
      // ── Fin ──
      if (p >= 1 && !doneRef.current) {
        doneRef.current = true;
        document.body.style.overflow = "";
        document.body.classList.remove("intro-no-events");
        setTimeout(() => setDone(true), 400);
      }
    };

    const advance = (delta: number) => {
      if (doneRef.current) return;
      progressRef.current = Math.min(1, Math.max(0, progressRef.current + delta / 1200));
      apply(progressRef.current);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      advance(e.deltaY);
    };

    let ty = 0;
    const onTouchStart = (e: TouchEvent) => { ty = e.touches[0].clientY; };
    const onTouchMove  = (e: TouchEvent) => {
      e.preventDefault();
      const d = ty - e.touches[0].clientY;
      ty = e.touches[0].clientY;
      advance(d * 3);
    };

    window.addEventListener("wheel",      onWheel,      { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove",  onTouchMove,  { passive: false });

    return () => {
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
      document.body.style.overflow = "";
      document.body.classList.remove("intro-active");
      document.body.classList.remove("intro-no-events");
      portalFiredRef.current = false;
    };
  }, [isHome, done]);

  return null;
  if (!isHome || done) return null;

  const svgMask = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">` +
    `<defs><filter id="f" x="-50%" y="-50%" width="200%" height="200%">` +
    `<feGaussianBlur stdDeviation="8"/></filter></defs>` +
    `<rect fill="white" width="100" height="100"/>` +
    `<rect fill="black" x="${SCR_X}" y="${SCR_Y}" width="${SCR_W}" height="${SCR_H}" rx="${SCR_RX}" filter="url(#f)"/>` +
    `</svg>`
  );
  const mask = `url("data:image/svg+xml,${svgMask}")`;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      overflow: "hidden", pointerEvents: "none",
    }}>

      {/* Wrapper zoomable — centré sur le visage */}
      <div
        ref={imgWrapRef}
        style={{
          position: "absolute", inset: 0,
          transformOrigin: `${ZOOM_CX}% ${ZOOM_CY}%`,
          transform: "scale(1)",
          transition: "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
          willChange: "transform, opacity",
        }}
      >
        <Image
          src="/202.png"
          alt=""
          fill
          priority
          quality={100}
          unoptimized
          style={{ objectFit: "cover", objectPosition: "center center" }}
          sizes="100vw"
        />

        {/* Noir autour du visage */}
        <div
          ref={blurLayerRef}
          style={{
            position: "absolute", inset: 0,
            background: "black", opacity: 0,
            WebkitMaskImage: mask, maskImage: mask,
            WebkitMaskSize: "100% 100%", maskSize: "100% 100%",
            maskMode: "luminance", pointerEvents: "none",
          }}
        />

        {/* Fumée noire */}
        <div ref={smokeRef} style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "rgba(0,0,0,0.85)", opacity: 0,
          WebkitMaskImage: mask, maskImage: mask,
          WebkitMaskSize: "100% 100%", maskSize: "100% 100%",
          maskMode: "luminance",
        }} />

        {/* Vignette */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse at ${ZOOM_CX}% ${ZOOM_CY}%, transparent 28%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.97) 100%)`,
        }} />
      </div>

      {/* Scroll hint */}
      <div ref={hintRef} style={{
        position: "absolute", bottom: 44, left: "50%",
        transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        pointerEvents: "none",
      }}>
        <span style={{
          color: "rgba(255,255,255,0.45)", fontSize: 9,
          letterSpacing: "0.32em", textTransform: "uppercase",
          fontFamily: "var(--font-space-grotesk)",
        }}>
          Scroll to enter
        </span>
        <div style={{
          width: 1, height: 40,
          background: "linear-gradient(to bottom, rgba(200,170,80,0.65), transparent)",
        }} />
      </div>

    </div>
  );
}
