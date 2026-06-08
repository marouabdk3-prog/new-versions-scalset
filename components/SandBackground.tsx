"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SandBackground() {
    const pathname = usePathname();
    const isHome   = pathname === "/";

    const wrapRef         = useRef<HTMLDivElement>(null);
    const zoomRef         = useRef<HTMLDivElement>(null);
    const smokeOverlayRef = useRef<HTMLDivElement>(null);
    const videoRef        = useRef<HTMLVideoElement>(null);

    // ── Démarrage immédiat : zoom cinématique + lecture ──
    useEffect(() => {
        const video = videoRef.current;
        const zoom  = zoomRef.current;
        if (!video || !zoom) return;

        const t = setTimeout(() => {
            zoom.style.transition = "transform 3s cubic-bezier(0.16, 1, 0.3, 1)";
            zoom.style.transform  = "scale(1.08)";
            video.play().catch(() => {});
        }, 80);

        return () => clearTimeout(t);
    }, []);

    // ── Blur + smoke pages internes ──
    useEffect(() => {
        if (!isHome) {
            if (wrapRef.current)         wrapRef.current.style.filter         = "blur(10px)";
            if (smokeOverlayRef.current) smokeOverlayRef.current.style.opacity = "0.55";
        } else {
            if (wrapRef.current)         wrapRef.current.style.filter         = "none";
            if (smokeOverlayRef.current) smokeOverlayRef.current.style.opacity = "0";
        }
    }, [isHome]);

    // ── Blur au scroll (home) ──
    useEffect(() => {
        const onScroll = () => {
            if (!isHome) return;
            const scrollY = window.scrollY;
            const heroH   = window.innerHeight;

            const p1Start = heroH * 0.15;
            const p1End   = heroH * 0.80;
            const p1 = scrollY <= p1Start ? 0 : Math.min((scrollY - p1Start) / (p1End - p1Start), 1);

            const p2Start = heroH * 0.85;
            const p2End   = heroH * 1.4;
            const p2 = scrollY <= p2Start ? 0 : Math.min((scrollY - p2Start) / (p2End - p2Start), 1);

            const blur  = p1 * 3 + p2 * 7;
            const smoke = p1 * 0.15 + p2 * 0.40;

            if (wrapRef.current)
                wrapRef.current.style.filter = blur > 0 ? `blur(${blur}px)` : "none";
            if (smokeOverlayRef.current)
                smokeOverlayRef.current.style.opacity = String(smoke);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, [isHome]);

    const videoStyle: React.CSSProperties = {
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        objectFit: "cover", objectPosition: "center center",
    };

    return (
        <div aria-hidden="true" style={{
            position: "fixed", top: 0, left: 0,
            width: "100%", height: "100%",
            zIndex: 0, background: "#000",
            overflow: "hidden", pointerEvents: "none",
        }}>
            {/* Blur layer */}
            <div ref={wrapRef} style={{
                position: "absolute", top: "-10%", left: "-10%",
                width: "120%", height: "120%",
                willChange: "filter",
                filter: isHome ? "none" : "blur(10px)",
                transition: "filter 0.6s ease",
            }}>
                {/* Zoom layer — cinematic push */}
                <div ref={zoomRef} style={{
                    position: "absolute", inset: 0,
                    willChange: "transform",
                    transformOrigin: "50% 50%",
                    transform: "scale(1)",
                }}>
                    <video
                        ref={videoRef}
                        muted
                        playsInline
                        autoPlay
                        loop
                        preload="auto"
                        style={videoStyle}
                    >
                        <source src="/videos/19.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>

            {/* Overlay sombre */}
            <div style={{
                position: "absolute", inset: 0,
                background: "rgba(0,0,0,0.38)", pointerEvents: "none",
            }} />

            {/* Smoke scroll */}
            <div ref={smokeOverlayRef} style={{
                position: "absolute", inset: 0, background: "black",
                opacity: isHome ? 0 : 0.55, pointerEvents: "none",
                transition: "opacity 0.6s ease",
            }} />

            {/* Vignette */}
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.50) 100%)",
            }} />

            {/* Fondu haut */}
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "15%",
                background: "linear-gradient(to bottom, rgba(0,0,0,0.70) 0%, transparent 100%)",
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
