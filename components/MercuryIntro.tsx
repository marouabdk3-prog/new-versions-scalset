"use client";

import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";

// Centre du visage du monsieur dans 202.png
const ZOOM_CX = 50;
const ZOOM_CY = 43;

// Zone nette centrée sur le visage
const SCR_X  = 35;   // bord gauche de la zone nette
const SCR_Y  = 26;   // bord haut de la zone nette
const SCR_W  = 30;   // largeur
const SCR_H  = 34;   // hauteur
const SCR_RX = 4;

export default function MercuryIntro() {
  const pathname = usePathname();
  const isHome   = pathname === "/";
  const [done, setDone] = useState(false);
  const doneRef         = useRef(false);
  const progressRef     = useRef(0);

  const imgWrapRef    = useRef<HTMLDivElement>(null);
  const blurLayerRef  = useRef<HTMLDivElement>(null);
  const smokeRef      = useRef<HTMLDivElement>(null);
  const hintRef       = useRef<HTMLDivElement>(null);
  const portalFiredRef = useRef(false);

  useEffect(() => {
    if (!isHome || done) return;

    document.body.style.overflow = "hidden";
    document.body.classList.add("intro-active");
    document.body.classList.add("intro-no-events");

    const tl = gsap.timeline({ paused: true });

    // Hint
    tl.to(hintRef.current, { opacity: 0, ease: "none", duration: 0.08 }, 0);

    // ── Zoom vers le centre de l'écran laptop ──
    // transform-origin verrouillé sur ZOOM_CX/ZOOM_CY → le laptop screen reste centré
    tl.fromTo(imgWrapRef.current,
      { scale: 1 },
      { scale: 2.2, ease: "none", duration: 1 },
      0
    );

    // ── Fade out de l'image (site déjà visible derrière depuis 40%) ──
    tl.to(imgWrapRef.current, { opacity: 0, ease: "power1.in", duration: 0.30 }, 0.62);

    const advance = (delta: number) => {
      if (doneRef.current) return;
      progressRef.current = Math.min(1, Math.max(0, progressRef.current + delta / 1200));

      gsap.to(tl, {
        progress: progressRef.current,
        duration: 0.75,
        ease: "power2.out",
        overwrite: true,
      });

      // ── Noir progressif autour du visage dès le premier scroll ──
      if (blurLayerRef.current) {
        const p = progressRef.current;
        blurLayerRef.current.style.opacity = Math.min(1, p * 1.6).toFixed(3);
      }

      // ── Fumée noire progressive dès le début du zoom ──
      if (smokeRef.current) {
        const smokeOpacity = Math.min(1, progressRef.current * 1.2).toFixed(3);
        smokeRef.current.style.opacity = smokeOpacity;
      }


      // ── Fire portal-entry at 65% so background de-zoom starts as overlay fades ──
      if (progressRef.current >= 0.65 && !portalFiredRef.current) {
        portalFiredRef.current = true;
        window.dispatchEvent(new CustomEvent("site-portal-entry"));
      }

      // ── Reveal site à 40% : largement avant fade image (62%) → pas de noir ──
      if (progressRef.current >= 0.40) {
        document.body.classList.remove("intro-active");
      } else {
        document.body.classList.add("intro-active");
      }

      if (progressRef.current >= 1 && !doneRef.current) {
        doneRef.current = true;
        document.body.style.overflow = "";
        document.body.classList.remove("intro-no-events");
        setTimeout(() => setDone(true), 400);
      }
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
      tl.kill();
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
      document.body.style.overflow = "";
      document.body.classList.remove("intro-active");
      document.body.classList.remove("intro-no-events");
      portalFiredRef.current = false;
    };
  }, [isHome, done]);

  if (!isHome || done) return null;

  // Masque SVG rectangulaire arrondi :
  // fond blanc = blur layer visible (bords flous)
  // rect noir  = blur layer masqué → image nette dessous (écran laptop)
  // feGaussianBlur = transition douce sur les bords du rectangle
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
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "transparent", pointerEvents: "none" }}>

      {/* ── Wrapper principal : zoom vers l'écran laptop ── */}
      <div
        ref={imgWrapRef}
        style={{
          position: "absolute", inset: 0,
          transformOrigin: `${ZOOM_CX}% ${ZOOM_CY}%`,
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {/* Layer 1 : image nette — toujours sharp, jamais de blur */}
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

        {/* Layer 2 : même image floutée, masquée pour ne montrer que les bords.
            Le centre (laptop screen) laisse transparaître le layer 1 net en dessous.
            filter: blur() animé par JS dans advance() → 0 → 14px selon le scroll. */}
        <div
          ref={blurLayerRef}
          style={{
            position: "absolute", inset: 0,
            background: "black",
            opacity: 0,
            filter: "blur(0px)",
            WebkitMaskImage: mask,
            maskImage: mask,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            maskMode: "luminance",
            pointerEvents: "none",
          }}
        />

        {/* Fumée noire autour du visage — s'intensifie avec le zoom */}
        <div ref={smokeRef} style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "rgba(0,0,0,0.78)",
          opacity: 0,
          WebkitMaskImage: mask,
          maskImage: mask,
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          maskMode: "luminance",
        }} />

        {/* Vignette cinématique — zone centrale large pour ne pas toucher le visage */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse at ${ZOOM_CX}% ${ZOOM_CY}%, transparent 32%, rgba(0,0,0,0.60) 58%, rgba(0,0,0,0.95) 100%)`,
        }} />

      </div>

      {/* Scroll hint */}
      <div
        ref={hintRef}
        style={{
          position: "absolute", bottom: 44, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          pointerEvents: "none",
        }}
      >
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
