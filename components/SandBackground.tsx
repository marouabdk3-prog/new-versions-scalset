"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SandBackground() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const smokeOverlayRef = useRef<HTMLDivElement>(null);
    // wrapRef    → filter/blur uniquement (scroll)
    // zoomRef    → transform/scale uniquement
    // entranceRef → entrance de-zoom after MercuryIntro portal
    const wrapRef     = useRef<HTMLDivElement>(null);
    const zoomRef     = useRef<HTMLDivElement>(null);
    const entranceRef = useRef<HTMLDivElement>(null);
    const video1Ref   = useRef<HTMLVideoElement>(null); // mp_ (5).mp4
    const v2aRef      = useRef<HTMLVideoElement>(null); // 55.mp4 — instance A
    const v2bRef      = useRef<HTMLVideoElement>(null); // 55.mp4 — instance B (standby)
    const activeV2    = useRef<"a" | "b">("a");

    // Chain: précharge v2a 1s avant la fin de v1 → swap opacity au cut
    useEffect(() => {
        const v1  = video1Ref.current;
        const v2a = v2aRef.current;
        if (!v1 || !v2a) return;

        let preloadStarted = false;

        const onV1TimeUpdate = () => {
            if (!preloadStarted && v1.duration && v1.currentTime >= v1.duration - 1) {
                preloadStarted = true;
                v2a.currentTime = 1;
                v2a.play().catch(() => {});
            }
        };

        const onV1Ended = () => {
            v2a.style.opacity = "1";
            v1.style.opacity  = "0";
        };

        v1.addEventListener("timeupdate", onV1TimeUpdate);
        v1.addEventListener("ended", onV1Ended);
        return () => {
            v1.removeEventListener("timeupdate", onV1TimeUpdate);
            v1.removeEventListener("ended", onV1Ended);
        };
    }, []);

    // Dual-video seamless loop: standby joue déjà depuis t=1 avant le swap → pas de seek = pas de freeze
    useEffect(() => {
        const v2a = v2aRef.current;
        const v2b = v2bRef.current;
        if (!v2a || !v2b) return;

        let rafId: number;
        let standbyStarted = false;

        const tick = () => {
            const active  = activeV2.current === "a" ? v2a : v2b;
            const standby = activeV2.current === "a" ? v2b : v2a;

            if (!active.paused) {
                // 0.7s avant la fin : lance le standby depuis t=1 sans seek
                if (!standbyStarted && active.currentTime >= 6.3) {
                    standbyStarted = true;
                    standby.currentTime = 1;
                    standby.play().catch(() => {});
                }

                // 0.3s avant la fin : swap instantané (pas de transition CSS)
                if (active.currentTime >= 6.7) {
                    active.style.opacity  = "0";
                    standby.style.opacity = "1";
                    activeV2.current      = activeV2.current === "a" ? "b" : "a";
                    standbyStarted        = false;
                }
            }

            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, []);


    // Force smoke/blur state on page change
    useEffect(() => {
        if (!isHome) {
            if (wrapRef.current)  wrapRef.current.style.filter  = "blur(10px)";
            if (smokeOverlayRef.current) smokeOverlayRef.current.style.opacity = "0.55";
        } else {
            if (wrapRef.current)  wrapRef.current.style.filter  = "none";
            if (smokeOverlayRef.current) smokeOverlayRef.current.style.opacity = "0";
        }
    }, [isHome]);

    useEffect(() => {
        if (!isHome) return;

        const onPortalEntry = () => {
            const el = entranceRef.current;
            if (!el) return;
            el.style.transition = "none";
            el.style.transform = "scale(1.30)";
            el.style.filter = "brightness(1.06) contrast(0.97)";
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    el.style.transition = "transform 2.4s cubic-bezier(0.16, 1, 0.3, 1), filter 1.8s ease";
                    el.style.transform = "scale(1.00)";
                    el.style.filter = "none";
                });
            });
        };

        window.addEventListener("site-portal-entry", onPortalEntry);
        return () => window.removeEventListener("site-portal-entry", onPortalEntry);
    }, [isHome]);

    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY;
            const heroH = window.innerHeight;
            if (!isHome) return;

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
        objectFit: "cover",
        objectPosition: "center center",
        transition: "opacity 0.001s ease",
    };

    return (
        <div
            aria-hidden="true"
            style={{
                position: "fixed", top: 0, left: 0,
                width: "100%", height: "100%",
                zIndex: 0, background: "#000",
                overflow: "hidden", pointerEvents: "none",
            }}
        >
            {/* Couche entrance — de-zoom portal after MercuryIntro */}
            <div
                ref={entranceRef}
                style={{
                    position: "absolute", inset: 0,
                    willChange: "transform, filter",
                    transformOrigin: "50% 70%",
                }}
            >
                {/* Couche filter — blur du scroll uniquement */}
                <div
                    ref={wrapRef}
                    style={{
                        position: "absolute",
                        top: "-10%", left: "-10%",
                        width: "120%", height: "120%",
                        willChange: "filter",
                        filter: isHome ? "none" : "blur(10px)",
                        transition: "filter 0.6s ease",
                    }}
                >
                    {/* Couche zoom — transform uniquement */}
                    <div
                        ref={zoomRef}
                        style={{
                            position: "absolute", inset: 0,
                            willChange: "transform",
                            transformOrigin: "center center",
                        }}
                    >
                        {/* Video 1 — joue en premier */}
                        <video
                            ref={video1Ref}
                            autoPlay
                            muted
                            playsInline
                            style={{ ...videoStyle, opacity: 1 }}
                        >
                            <source src="/videos/mp_ (5).mp4" type="video/mp4" />
                        </video>

                        {/* Video 2A — instance active, boucle duale sans seek */}
                        <video
                            ref={v2aRef}
                            muted
                            playsInline
                            preload="auto"
                            style={{ ...videoStyle, opacity: 0 }}
                        >
                            <source src="/videos/55.mp4" type="video/mp4" />
                        </video>

                        {/* Video 2B — instance standby, prête avant chaque swap */}
                        <video
                            ref={v2bRef}
                            muted
                            playsInline
                            preload="auto"
                            style={{ ...videoStyle, opacity: 0 }}
                        >
                            <source src="/videos/55.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>

            {/* Overlay sombre cinématique */}
            <div style={{
                position: "absolute", inset: 0,
                background: "rgba(0,0,0,0.40)",
                pointerEvents: "none",
            }} />

            {/* Smoke overlay au scroll */}
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
