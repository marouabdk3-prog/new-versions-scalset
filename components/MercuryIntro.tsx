"use client";

import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";

// Centre exact de l'écran du laptop dans zz.png
const ZOOM_CX = 52;
const ZOOM_CY = 77;

// Zone nette = laptop exact (outline bleue dans le screenshot)
const SCR_X  = 33;   // bord gauche du laptop
const SCR_Y  = 40;   // bord haut de l'écran (descendu avec le zoom)
const SCR_W  = 37;   // largeur du laptop
const SCR_H  = 40;   // hauteur écran + clavier
const SCR_RX = 4;

export default function MercuryIntro() {
  const pathname = usePathname();
  const isHome   = pathname === "/";
  const [done, setDone] = useState(false);
  const doneRef         = useRef(false);
  const progressRef     = useRef(0);

  const imgWrapRef  = useRef<HTMLDivElement>(null);  // zoom + fade
  const blurLayerRef = useRef<HTMLDivElement>(null); // blur edges only
  const hintRef     = useRef<HTMLDivElement>(null);
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

      // ── Depth-of-field : blur progressif sur les bords, centre toujours net ──
      // Commence à 10% de scroll, atteint 14px à 65%
      if (blurLayerRef.current) {
        const blurP  = Math.min(1, Math.max(0, (progressRef.current - 0.10) / 0.55));
        const blurPx = (blurP * 32).toFixed(1);
        blurLayerRef.current.style.filter = `blur(${blurPx}px)`;
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
          src="/zz.png"
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
            backgroundImage: "url(/zz.png)",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            filter: "blur(0px)",
            WebkitMaskImage: mask,
            maskImage: mask,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            maskMode: "luminance",
            pointerEvents: "none",
          }}
        />

        {/* Vignette cinématique */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse at ${ZOOM_CX}% ${ZOOM_CY}%, transparent 18%, rgba(0,0,0,0.38) 52%, rgba(0,0,0,0.82) 100%)`,
        }} />

        {/* ── Coffee steam — vapeur cinématique au-dessus de la tasse ── */}
        <div style={{
          position: "absolute",
          left: "73%",
          top: "64%",
          width: 40,
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}>
          {/* Wisp 1 — central */}
          <div style={{
            position: "absolute", bottom: 0, left: "30%",
            width: 14, height: 70,
            background: "rgba(255,255,255,0.9)",
            borderRadius: "50%",
            filter: "blur(12px)",
            mixBlendMode: "screen",
            opacity: 0.18,
            animation: "steamFloat 6s ease-in-out infinite",
            transformOrigin: "bottom center",
          }} />
          {/* Wisp 2 — droite */}
          <div style={{
            position: "absolute", bottom: 0, left: "55%",
            width: 12, height: 60,
            background: "rgba(255,255,255,0.9)",
            borderRadius: "50%",
            filter: "blur(12px)",
            mixBlendMode: "screen",
            opacity: 0.18,
            animation: "steamFloatB 6s ease-in-out infinite",
            animationDelay: "2s",
            transformOrigin: "bottom center",
          }} />
          {/* Wisp 3 — gauche */}
          <div style={{
            position: "absolute", bottom: 0, left: "8%",
            width: 12, height: 65,
            background: "rgba(255,255,255,0.9)",
            borderRadius: "50%",
            filter: "blur(12px)",
            mixBlendMode: "screen",
            opacity: 0.18,
            animation: "steamFloatC 6s ease-in-out infinite",
            animationDelay: "1s",
            transformOrigin: "bottom center",
          }} />
        </div>
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
