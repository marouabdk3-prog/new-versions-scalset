"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SandBackground() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const videoRef = useRef<HTMLVideoElement>(null);
    const smokeOverlayRef = useRef<HTMLDivElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);

    // Force smoke/blur state on page change
    useEffect(() => {
        if (!isHome) {
            if (wrapRef.current) {
                wrapRef.current.style.filter = "blur(10px)";
                wrapRef.current.style.transform = "scale(1)";
            }
            if (smokeOverlayRef.current) {
                smokeOverlayRef.current.style.opacity = "0.55";
            }
        } else {
            if (wrapRef.current) {
                wrapRef.current.style.filter = "none";
                wrapRef.current.style.transform = "scale(1)";
            }
            if (smokeOverlayRef.current) {
                smokeOverlayRef.current.style.opacity = "0";
            }
        }
    }, [isHome]);

    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY;
            const heroH = window.innerHeight;

            if (!isHome) return;

            // Phase 1: hero scroll (0 → heroH*0.8) — subtle blur
            const p1Start = heroH * 0.15;
            const p1End = heroH * 0.80;
            const p1 = scrollY <= p1Start ? 0 : Math.min((scrollY - p1Start) / (p1End - p1Start), 1);

            // Phase 2: second section and beyond (heroH → heroH*1.4) — full smoke like other pages
            const p2Start = heroH * 0.85;
            const p2End = heroH * 1.4;
            const p2 = scrollY <= p2Start ? 0 : Math.min((scrollY - p2Start) / (p2End - p2Start), 1);

            const blur = p1 * 3 + p2 * 7;        // 0 → 3px → 10px
            const smoke = p1 * 0.15 + p2 * 0.40; // 0 → 0.15 → 0.55

            if (wrapRef.current) {
                wrapRef.current.style.filter = blur > 0 ? `blur(${blur}px)` : "none";
                wrapRef.current.style.transform = `scale(${1 + p1 * 0.02})`;
            }
            if (smokeOverlayRef.current) {
                smokeOverlayRef.current.style.opacity = String(smoke);
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, [isHome]);

    return (
        <div
            aria-hidden="true"
            style={{
                position: "fixed",
                top: 0, left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                background: "#000",
                overflow: "hidden",
                pointerEvents: "none",
            }}
        >
            {/* Vidéo — object-fit cover pur */}
            <div
                ref={wrapRef}
                style={{
                    position: "absolute",
                    top: "-10%", left: "-10%",
                    width: "120%",
                    height: "120%",
                    willChange: "filter, transform",
                    transformOrigin: "center center",
                    filter: isHome ? "none" : "blur(10px)",
                    transition: "filter 0.6s ease",
                }}
            >
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center center",
                    }}
                >
                    <source src="/videos/bg-video.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Overlay sombre cinématique */}
            <div style={{
                position: "absolute", inset: 0,
                background: "rgba(0,0,0,0.40)",
                pointerEvents: "none",
            }} />

            {/* Smoke overlay au scroll (home) ou assombrissement léger (autres pages) */}
            <div ref={smokeOverlayRef} style={{
                position: "absolute", inset: 0,
                background: "black",
                opacity: isHome ? 0 : 0.55,
                pointerEvents: "none",
                transition: "opacity 0.6s ease",
            }} />

            {/* Vignette */}
            <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)",
                pointerEvents: "none",
            }} />

            {/* Fondu haut */}
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "18%",
                background: "linear-gradient(to bottom, rgba(0,0,0,0.80) 0%, transparent 100%)",
                pointerEvents: "none",
            }} />

            {/* Fondu bas */}
            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "12%",
                background: "linear-gradient(to top, rgba(0,0,0,0.70) 0%, transparent 100%)",
                pointerEvents: "none",
            }} />
        </div>
    );
}
