"use client";

import React, { createContext, useContext, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LaunchData {
  sx: number; // hero logo center X
  sy: number; // hero logo center Y
  sw: number; // hero logo container width
  sh: number; // hero logo container height
  ex: number; // navbar logo center X
  ey: number; // navbar logo center Y
  ew: number; // navbar logo width (for scale target)
}

interface LogoAnimCtx {
  navLogoRef: React.MutableRefObject<HTMLDivElement | null>;
  navLogoVisible: boolean;
  launchHeroLogo: (heroRect: DOMRect) => void;
}

const Ctx = createContext<LogoAnimCtx>({
  navLogoRef: { current: null },
  navLogoVisible: true,
  launchHeroLogo: () => {},
});

export function useLogoAnimation() {
  return useContext(Ctx);
}

const CHROME =
  "linear-gradient(150deg,#FAFBFC 0%,#CED8E2 9%,#94A6B8 22%,#5E7284 36%,#728292 46%,#96AABA 56%,#C0D0DC 66%,#E4EEF4 76%,#F6F8FA 82%,#D0DCE6 90%,#A4B6C4 96%,#BCC8D2 100%)";

// Cinematic easing: sluggish start → explosive acceleration → graceful landing
const ROCKET_EASE: [number, number, number, number] = [0.88, 0.02, 0.06, 1];

function FlyingLogo({
  data,
  onComplete,
}: {
  data: LaunchData;
  onComplete: () => void;
}) {
  // Fixed element at top:0 left:0, translated to match hero logo position
  const startX = data.sx - data.sw / 2;
  const startY = data.sy - data.sh / 2;
  const endX = data.ex - data.sw / 2;
  const endY = data.ey - data.sh / 2;

  // Depth scale: shrinks mid-flight (receding), recovers to navbar logo proportion
  const navScale = Math.max(0.28, Math.min(1.4, data.ew / data.sw));
  // Logo mark ~42% of measured container width
  const logoMarkW = data.sw * 0.42;

  // Trail center offset: half of 3px trail width
  const trailLeft = `calc(50% - 1.5px)`;
  // Bloom center: 40px radius → left offset 40px, top offset 40px from 50%
  const bloomLeft = `calc(50% - 40px)`;

  return (
    <motion.div
      key="flying-logo"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: data.sw,
        height: data.sh,
        zIndex: 9999,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
      }}
      initial={{ x: startX, y: startY, scale: 1, opacity: 1 }}
      animate={{
        // X: hold 5%, then sweep to navbar position
        x: [startX, startX, endX],
        // Y: micro ignition twitch then full rocket ascent
        y: [startY, startY - 22, endY],
        // Scale: ignition puff (1.07) → depth shrink (0.38) → settle to nav proportion
        scale: [1, 1.07, 0.38, navScale],
        // Opacity: stays full until 70%, then cross-fades with navbar logo
        opacity: [1, 1, 1, 0],
      }}
      exit={{ opacity: 0, transition: { duration: 0.08 } }}
      transition={{
        duration: 1.15,
        x: { times: [0, 0.05, 1], ease: ROCKET_EASE },
        y: { times: [0, 0.05, 1], ease: ROCKET_EASE },
        scale: { times: [0, 0.05, 0.7, 1.0], ease: "linear" },
        opacity: { times: [0, 0.7, 0.84, 1.0], ease: "linear" },
      }}
      onAnimationComplete={onComplete}
    >
      {/* ── Glow layer: drop-shadow ramps up during acceleration ── */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
        }}
        animate={{
          filter: [
            "drop-shadow(0 0 8px rgba(175,215,250,0.4))",
            "drop-shadow(0 0 50px rgba(175,215,250,0.99)) drop-shadow(0 0 100px rgba(140,200,255,0.72))",
            "drop-shadow(0 0 70px rgba(175,215,250,0.9)) drop-shadow(0 0 140px rgba(140,200,255,0.58))",
            "drop-shadow(0 0 20px rgba(175,215,250,0.45))",
          ],
        }}
        transition={{
          duration: 1.15,
          times: [0, 0.07, 0.5, 1.0],
          ease: "linear",
        }}
      >
        {/* Chrome logo mark (SVG mask + metallic gradient) */}
        <div style={{ position: "relative", width: logoMarkW, flexShrink: 0 }}>
          <div
            style={{
              aspectRatio: "84 / 81",
              maskImage: "url('/logo-scalset.svg')",
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskImage: "url('/logo-scalset.svg')",
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              background: CHROME,
              width: "100%",
            }}
          />
        </div>

        {/* SCALSET brand text — same chrome gradient */}
        <span
          style={{
            background: CHROME,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: "clamp(2rem, 4vw, 3.75rem)",
            fontWeight: "bold",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          SCALSET
        </span>
      </motion.div>

      {/* ── Rocket trail: luminous streak extending below (opposite to motion) ── */}
      <motion.div
        style={{
          position: "absolute",
          left: trailLeft,
          top: "50%",
          width: "3px",
          borderRadius: "2px",
          transformOrigin: "top center",
          background:
            "linear-gradient(to bottom, rgba(220,245,255,0.98) 0%, rgba(190,225,255,0.82) 10%, rgba(155,200,250,0.5) 42%, rgba(120,175,240,0.2) 68%, transparent 100%)",
        }}
        animate={{
          height: [0, 0, 310, 0],
          opacity: [0, 0, 0.9, 0],
        }}
        transition={{
          duration: 1.15,
          times: [0, 0.04, 0.58, 1.0],
          ease: "easeInOut",
        }}
      />

      {/* ── Soft bloom: diffuse glow halo behind the trail ── */}
      <motion.div
        style={{
          position: "absolute",
          left: bloomLeft,
          top: "calc(50% - 20px)",
          width: "80px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse 40px 60px at 50% 30%, rgba(160,210,255,0.32) 0%, rgba(120,185,250,0.14) 52%, transparent 100%)",
        }}
        animate={{
          height: [40, 40, 180, 0],
          opacity: [0, 0, 0.72, 0],
        }}
        transition={{
          duration: 1.15,
          times: [0, 0.05, 0.56, 1.0],
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

export function LogoAnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navLogoRef = useRef<HTMLDivElement | null>(null);
  const [navLogoVisible, setNavLogoVisible] = useState(true);
  const [launchData, setLaunchData] = useState<LaunchData | null>(null);

  const launchHeroLogo = useCallback((heroRect: DOMRect) => {
    if (!navLogoRef.current) return;
    const navRect = navLogoRef.current.getBoundingClientRect();

    setNavLogoVisible(false);
    setLaunchData({
      sx: heroRect.left + heroRect.width / 2,
      sy: heroRect.top + heroRect.height / 2,
      sw: heroRect.width,
      sh: heroRect.height,
      ex: navRect.left + navRect.width / 2,
      ey: navRect.top + navRect.height / 2,
      ew: navRect.width,
    });

    // Start cross-fade: navbar logo fades in while flying logo is near-invisible
    // Flying logo opacity drops from t=70% (~805ms) — start nav logo a touch earlier
    setTimeout(() => setNavLogoVisible(true), 820);
  }, []);

  const handleComplete = useCallback(() => {
    setLaunchData(null);
  }, []);

  return (
    <Ctx.Provider value={{ navLogoRef, navLogoVisible, launchHeroLogo }}>
      {children}
      <AnimatePresence>
        {launchData && (
          <FlyingLogo key="flying" data={launchData} onComplete={handleComplete} />
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
