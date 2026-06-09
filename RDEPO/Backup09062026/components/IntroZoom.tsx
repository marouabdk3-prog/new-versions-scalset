"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

// ── Laptop screen bounds in 56.jpg (% of viewport) ──
// Screen only = the actual display panel (dark rectangle above the keyboard), NOT the keyboard/base/borders
const S = {
    top:    51,     // screen top edge    (lifted from 59 → panel is higher than keyboard)
    right:  42,     // distance from right  (100 - 42 - 42 = 16% wide — dal only, not full laptop)
    bottom: 41,     // distance from bottom (height = 100 - 51 - 41 = 8% — panel is thin)
    left:   42,     // screen left edge
};
// Screen center — transform-origin for scale animation
const SCX = 50;     // % horizontal center
const SCY = 55;     // % vertical center  (51 + 8/2 = 55)
// How small the homepage starts (≈ screen width / viewport width = 16%)
const START_SCALE = 0.16;
// Realistic screen corner radius (matches the laptop bezel)
const SCREEN_RX   = 4;   // px

export default function IntroZoom() {
    const pathname = usePathname();
    const isHome   = pathname === "/";
    const [hidden, setHidden] = useState(false);

    // Never render inside the iframe itself
    if (typeof window !== "undefined" && window.self !== window.top) return null;

    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef        = useRef<HTMLDivElement>(null);    // boardroom (fades, never zooms)
    const clipRef      = useRef<HTMLDivElement>(null);    // inset clip: screen → fullscreen
    const scaleRef     = useRef<HTMLDivElement>(null);    // scale: START_SCALE → 1.0
    const hintRef      = useRef<HTMLDivElement>(null);
    const lbTopRef     = useRef<HTMLDivElement>(null);
    const lbBotRef     = useRef<HTMLDivElement>(null);
    const targetRef    = useRef(0);
    const currentRef   = useRef(0);
    const doneRef      = useRef(false);
    const rafRef       = useRef(0);

    useEffect(() => {
        if (!isHome || hidden) return;
        document.body.style.overflow = "hidden";
        // Hide MainSiteLayer while IntroLayer is active
        document.body.classList.add("intro-active");

        const apply = (p: number) => {
            const bg  = bgRef.current;
            const cl  = clipRef.current;
            const sc  = scaleRef.current;
            const c   = containerRef.current;
            if (!bg || !cl || !sc || !c) return;

            // ── Letterbox bars ──
            const lbIn  = Math.min(p / 0.06, 1);
            const lbOut = p > 0.60 ? Math.max(0, 1 - (p - 0.60) / 0.26) : 1;
            const barH  = lbIn * lbOut * 5;
            if (lbTopRef.current) lbTopRef.current.style.height = `${barH}vh`;
            if (lbBotRef.current) lbBotRef.current.style.height = `${barH}vh`;

            // ── Background boardroom: FADE ONLY — never moves ──
            const bgFade = Math.max(0, Math.min((p - 0.10) / 0.58, 1));
            bg.style.opacity = String(1 - bgFade);

            // ── Shared easing for clip + scale ──
            const cP   = Math.min(p / 0.80, 1);
            const ease = 1 - Math.pow(1 - cP, 3);   // cubic ease-out

            // ── laptopScreen scale: miniature → fullscreen ──
            // Content starts tiny (homepage visible in the laptop screen),
            // grows to 1.0 (real fullscreen homepage)
            sc.style.transform = `scale(${START_SCALE + (1 - START_SCALE) * ease})`;

            // ── laptopScreen clip: screen bounds → fullscreen ──
            // inset(top right bottom left round radius)
            const iT  = S.top    * (1 - ease);
            const iR  = S.right  * (1 - ease);
            const iB  = S.bottom * (1 - ease);
            const iL  = S.left   * (1 - ease);
            const rx  = SCREEN_RX * (1 - ease);      // corner radius fades to 0
            cl.style.clipPath = `inset(${iT.toFixed(2)}% ${iR.toFixed(2)}% ${iB.toFixed(2)}% ${iL.toFixed(2)}% round ${rx.toFixed(1)}px)`;

            // ── Final fade-out (0.88 → 1.0) ──
            c.style.opacity = String(1 - Math.max(0, Math.min((p - 0.88) / 0.12, 1)));

            // ── Scroll hint ──
            if (hintRef.current)
                hintRef.current.style.opacity = p < 0.07 ? String(1 - p / 0.07) : "0";

            // ── Done: reveal MainSiteLayer, then remove IntroLayer ──
            if (p >= 1 && !doneRef.current) {
                doneRef.current = true;
                document.body.style.overflow = "";
                // Removing the class triggers the CSS transition on #main-site
                document.body.classList.remove("intro-active");
                // Wait for the MainSiteLayer fade-in (700ms) before unmounting
                setTimeout(() => setHidden(true), 700);
            }
        };

        const loop = () => {
            currentRef.current += (targetRef.current - currentRef.current) * 0.09;
            apply(currentRef.current);
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);

        const onWheel = (e: WheelEvent) => {
            if (doneRef.current) return;
            e.preventDefault();
            targetRef.current = Math.max(0, Math.min(1, targetRef.current + e.deltaY / 145));
        };
        let ty = 0;
        const onTouchStart = (e: TouchEvent) => { ty = e.touches[0].clientY; };
        const onTouchMove  = (e: TouchEvent) => {
            if (doneRef.current) return;
            e.preventDefault();
            const d = ty - e.touches[0].clientY;
            ty = e.touches[0].clientY;
            targetRef.current = Math.max(0, Math.min(1, targetRef.current + d / 230));
        };

        window.addEventListener("wheel",      onWheel,      { passive: false });
        window.addEventListener("touchstart", onTouchStart, { passive: false });
        window.addEventListener("touchmove",  onTouchMove,  { passive: false });
        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("wheel",      onWheel);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove",  onTouchMove);
            document.body.style.overflow = "";
            document.body.classList.remove("intro-active");
        };
    }, [isHome, hidden]);

    if (!isHome || hidden) return null;

    // Initial clip state — exactly the laptop screen in 56.jpg
    const initClip = `inset(${S.top}% ${S.right}% ${S.bottom}% ${S.left}% round ${SCREEN_RX}px)`;

    return (
        <div
            ref={containerRef}
            style={{ position: "fixed", inset: 0, zIndex: 2000, background: "#000" }}
        >
            {/* ── Cinema letterbox bars ── */}
            <div ref={lbTopRef} style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 0,
                background: "#000", zIndex: 30, pointerEvents: "none",
            }} />
            <div ref={lbBotRef} style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 0,
                background: "#000", zIndex: 30, pointerEvents: "none",
            }} />

            {/* ── Boardroom background — STATIC, only fades ──
                56.jpg: boardroom Dubai, CEO, laptop on table perfectly centered.
                This layer never moves. Only its opacity decreases as laptopScreen grows. ── */}
            <div ref={bgRef} style={{ position: "absolute", inset: 0, willChange: "opacity" }}>
                <Image
                    src="/56.jpg"
                    alt="" fill priority quality={100}
                    style={{ objectFit: "cover", objectPosition: "center center" }}
                    sizes="100vw"
                />
                {/* Cinematic vignette */}
                <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    background: "radial-gradient(ellipse at 50% 55%, transparent 16%, rgba(0,0,0,0.42) 55%, rgba(0,0,0,0.88) 100%)",
                }} />
                {/* Top gradient */}
                <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "20%",
                    pointerEvents: "none",
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.65), transparent)",
                }} />
                {/* Bottom gradient */}
                <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: "12%",
                    pointerEvents: "none",
                    background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
                }} />
            </div>

            {/* ── laptopScreen — the only thing that animates ──
                clipRef  → inset() clips to exact screen bounds (with rounded corners).
                           Expands smoothly to fullscreen on scroll.
                scaleRef → starts at START_SCALE: homepage is a miniature inside the screen.
                           Grows to scale(1): becomes the real fullscreen site.
                Both animations share the same easing → perfectly synchronized. ── */}
            <div
                ref={clipRef}
                style={{
                    position: "absolute", inset: 0,
                    clipPath: initClip,
                    willChange: "clip-path",
                    zIndex: 1,
                }}
            >
                <div
                    ref={scaleRef}
                    style={{
                        position: "absolute", inset: 0,
                        transform: `scale(${START_SCALE})`,
                        transformOrigin: `${SCX}% ${SCY}%`,
                        willChange: "transform",
                        // Subtle glow to make the screen feel lit
                        filter: "brightness(1.05)",
                    }}
                >
                    {/* Real ScalSet homepage in an iframe.
                        IntroZoom returns null inside the iframe (window.self !== window.top)
                        so no recursion. pointer-events disabled during animation. */}
                    <iframe
                        src="/"
                        title="ScalSet"
                        style={{
                            position: "absolute", inset: 0,
                            border: "none",
                            width: "100%",
                            height: "100%",
                            pointerEvents: "none",
                            borderRadius: SCREEN_RX,
                        }}
                    />

                    {/* Glass reflection on screen surface */}
                    <div style={{
                        position: "absolute", inset: 0,
                        pointerEvents: "none", zIndex: 2,
                        background:
                            "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, transparent 38%)",
                        borderRadius: SCREEN_RX,
                    }} />
                </div>
            </div>

            {/* ── Scroll hint ── */}
            <div ref={hintRef} style={{
                position: "absolute", bottom: 44, left: "50%",
                transform: "translateX(-50%)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                pointerEvents: "none", zIndex: 10,
            }}>
                <span style={{
                    color: "rgba(255,255,255,0.45)", fontSize: 9,
                    letterSpacing: "0.32em", textTransform: "uppercase",
                    fontFamily: "var(--font-montserrat)",
                }}>Scroll to enter</span>
                <div style={{
                    width: 1, height: 40,
                    background:
                        "linear-gradient(to bottom, rgba(200,170,80,0.65), transparent)",
                }} />
            </div>
        </div>
    );
}
