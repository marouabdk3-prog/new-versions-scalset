"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SandBackground() {
    const pathname = usePathname();
    const isHome = pathname === "/";

    const wrapRef          = useRef<HTMLDivElement>(null);
    const zoomRef          = useRef<HTMLDivElement>(null);
    const smokeOverlayRef  = useRef<HTMLDivElement>(null);
    const blackOverlayRef  = useRef<HTMLDivElement>(null);
    const introVigRef      = useRef<HTMLDivElement>(null);  // vignette radiale fond
    const introSmokeRef    = useRef<HTMLDivElement>(null);  // fumée noire masquée SVG
    const hintRef          = useRef<HTMLDivElement>(null);  // "scroll to enter"
    const v1Ref            = useRef<HTMLVideoElement>(null);
    const v2Ref            = useRef<HTMLVideoElement>(null);

    const switchedRef      = useRef(false);
    const introDoneRef     = useRef(false);
    const introProgressRef = useRef(0);
    const portalFiredRef   = useRef(false);

    // ── Preload v2 silently ──
    useEffect(() => {
        const v2 = v2Ref.current;
        if (!v2) return;
        v2.load();
        v2.currentTime = 0;
    }, []);

    // ── v1 → v2 : transition noire ──
    useEffect(() => {
        const v1      = v1Ref.current;
        const v2      = v2Ref.current;
        const overlay = blackOverlayRef.current;
        if (!v1 || !v2 || !overlay) return;

        const onTimeUpdate = () => {
            if (switchedRef.current) return;
            if (!v1.duration) return;
            if (v1.currentTime >= v1.duration - 0.35) {
                switchedRef.current = true;
                overlay.style.transition = "opacity 0.3s ease";
                overlay.style.opacity    = "1";
                setTimeout(() => {
                    v2.currentTime   = 0;
                    v2.play().catch(() => {});
                    v1.style.opacity = "0";
                    v2.style.opacity = "1";
                    requestAnimationFrame(() => {
                        overlay.style.transition = "opacity 0.35s ease";
                        overlay.style.opacity    = "0";
                    });
                }, 300);
            }
        };

        v1.addEventListener("timeupdate", onTimeUpdate);
        return () => v1.removeEventListener("timeupdate", onTimeUpdate);
    }, []);

    // ── Intro scroll (home) : vidéo gelée → scroll zoom + noir → lecture ──
    useEffect(() => {
        if (!isHome) return;
        const v1   = v1Ref.current;
        const zoom = zoomRef.current;
        if (!v1 || !zoom) return;

        v1.currentTime = 0;
        v1.pause();

        document.body.style.overflow = "hidden";
        document.body.classList.add("intro-active");
        document.body.classList.add("intro-no-events");

        const apply = (p: number) => {
            // Zoom progressif sur le sujet
            const scale = 1 + p * 0.85;
            zoom.style.transition = "transform 0.45s cubic-bezier(0.16,1,0.3,1)";
            zoom.style.transform  = `scale(${scale.toFixed(4)})`;

            // Zone transparente qui rétrécit vers le visage
            const clearW = Math.max(10, 52 - p * 44);   // 52% → 8%
            const clearH = Math.max(14, 68 - p * 56);   // 68% → 12%
            const dark1  = (p * 0.72).toFixed(2);
            const dark2  = Math.min(1, p * 1.05).toFixed(2);
            if (introVigRef.current) {
                introVigRef.current.style.background =
                    `radial-gradient(ellipse ${clearW.toFixed(1)}% ${clearH.toFixed(1)}% at 50% 40%, ` +
                    `transparent 60%, rgba(0,0,0,${dark1}) 78%, rgba(0,0,0,${dark2}) 100%)`;
                introVigRef.current.style.opacity = Math.min(1, p * 1.1).toFixed(3);
            }
            // Fumée noire avec blur SVG — s'intensifie autour du visage
            if (introSmokeRef.current) {
                introSmokeRef.current.style.opacity = Math.min(1, p * 1.3).toFixed(3);
            }

            // Hint disparaît dès 1er scroll
            if (hintRef.current) {
                hintRef.current.style.opacity = String(Math.max(0, 1 - p * 14));
            }

            // À 65% : démarre la vidéo
            if (p >= 0.65 && !portalFiredRef.current) {
                portalFiredRef.current = true;
                v1.play().catch(() => {});
            }

            // Révèle le site à 40%
            if (p >= 0.40) {
                document.body.classList.remove("intro-active");
            } else {
                document.body.classList.add("intro-active");
            }

            // Fin intro
            if (p >= 1 && !introDoneRef.current) {
                introDoneRef.current = true;
                document.body.style.overflow = "";
                document.body.classList.remove("intro-no-events");
                window.dispatchEvent(new CustomEvent("intro-complete"));
                // Fade out vignette + fumée intro
                if (introVigRef.current) {
                    introVigRef.current.style.transition = "opacity 0.9s ease";
                    introVigRef.current.style.opacity    = "0";
                }
                if (introSmokeRef.current) {
                    introSmokeRef.current.style.transition = "opacity 0.9s ease";
                    introSmokeRef.current.style.opacity    = "0";
                }
                // Règle le zoom à 1.05 (position normale)
                zoom.style.transition = "transform 1.4s cubic-bezier(0.16,1,0.3,1)";
                zoom.style.transform  = "scale(1.05)";
                // Cache le hint
                if (hintRef.current) hintRef.current.style.display = "none";
            }
        };

        const advance = (delta: number) => {
            if (introDoneRef.current) return;
            introProgressRef.current = Math.min(1, Math.max(0, introProgressRef.current + delta / 1200));
            apply(introProgressRef.current);
        };

        const onWheel = (e: WheelEvent) => { e.preventDefault(); advance(e.deltaY); };
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
        };
    }, [isHome]);

    // ── Non-home : démarre vidéo immédiatement ──
    useEffect(() => {
        if (isHome) return;
        const v1   = v1Ref.current;
        const zoom = zoomRef.current;
        if (!v1 || !zoom) return;
        const t = setTimeout(() => {
            zoom.style.transition = "transform 2.5s cubic-bezier(0.16,1,0.3,1)";
            zoom.style.transform  = "scale(1.05)";
            v1.play().catch(() => {});
        }, 60);
        return () => clearTimeout(t);
    }, [isHome]);

    // ── Force smoke/blur sur pages internes ──
    useEffect(() => {
        if (!isHome) {
            if (wrapRef.current)         wrapRef.current.style.filter         = "blur(10px)";
            if (smokeOverlayRef.current) smokeOverlayRef.current.style.opacity = "0.55";
        } else {
            if (wrapRef.current)         wrapRef.current.style.filter         = "none";
            if (smokeOverlayRef.current) smokeOverlayRef.current.style.opacity = "0";
        }
    }, [isHome]);

    // ── Blur + smoke au scroll (post-intro) ──
    useEffect(() => {
        const onScroll = () => {
            if (!isHome || !introDoneRef.current) return;
            const scrollY = window.scrollY;
            const heroH   = window.innerHeight;

            const p1Start = heroH * 0.15;
            const p1End   = heroH * 0.80;
            const p1 = scrollY <= p1Start ? 0 : Math.min((scrollY - p1Start) / (p1End - p1Start), 1);

            const p2Start = heroH * 0.85;
            const p2End   = heroH * 1.4;
            const p2 = scrollY <= p2Start ? 0 : Math.min((scrollY - p2Start) / (p2End - p2Start), 1);

            if (wrapRef.current)
                wrapRef.current.style.filter = (p1 * 3 + p2 * 7) > 0 ? `blur(${p1 * 3 + p2 * 7}px)` : "none";
            if (smokeOverlayRef.current)
                smokeOverlayRef.current.style.opacity = String(p1 * 0.15 + p2 * 0.40);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
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
            {/* Blur layer (scroll) */}
            <div ref={wrapRef} style={{
                position: "absolute", top: "-10%", left: "-10%",
                width: "120%", height: "120%",
                willChange: "filter",
                filter: isHome ? "none" : "blur(10px)",
                transition: "filter 0.6s ease",
            }}>
                {/* Zoom layer */}
                <div ref={zoomRef} style={{
                    position: "absolute", inset: 0,
                    willChange: "transform",
                    transformOrigin: "50% 45%",
                    transform: "scale(1)",
                }}>
                    <video ref={v1Ref} muted playsInline preload="auto"
                        style={{ ...videoStyle, opacity: 1 }}>
                        <source src="/videos/13.mp4" type="video/mp4" />
                    </video>
                    <video ref={v2Ref} muted playsInline preload="auto" loop
                        style={{ ...videoStyle, opacity: 0 }}>
                        <source src="/videos/15.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>

            {/* Transition noire v1→v2 */}
            <div ref={blackOverlayRef} style={{
                position: "absolute", inset: 0,
                background: "#000", opacity: 0,
                pointerEvents: "none", zIndex: 2,
            }} />

            {/* Vignette intro — zone transparente qui rétrécit vers le visage */}
            <div ref={introVigRef} style={{
                position: "absolute", inset: 0, opacity: 0,
                pointerEvents: "none", zIndex: 3,
            }} />

            {/* Fumée noire SVG masquée — centrée sur le visage */}
            <div ref={introSmokeRef} style={(() => {
                const svg = encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">` +
                    `<defs><filter id="f" x="-50%" y="-50%" width="200%" height="200%">` +
                    `<feGaussianBlur stdDeviation="10"/></filter></defs>` +
                    `<rect fill="white" width="100" height="100"/>` +
                    `<rect fill="black" x="33" y="24" width="34" height="38" rx="6" filter="url(#f)"/>` +
                    `</svg>`
                );
                const mask = `url("data:image/svg+xml,${svg}")`;
                return {
                    position: "absolute" as const, inset: 0, opacity: 0,
                    pointerEvents: "none" as const, zIndex: 4,
                    background: "rgba(0,0,0,0.88)",
                    WebkitMaskImage: mask, maskImage: mask,
                    WebkitMaskSize: "100% 100%", maskSize: "100% 100%",
                    maskMode: "luminance" as const,
                };
            })()} />

            {/* Overlay sombre cinématique */}
            <div style={{
                position: "absolute", inset: 0,
                background: "rgba(0,0,0,0.38)", pointerEvents: "none",
            }} />

            {/* Smoke overlay scroll */}
            <div ref={smokeOverlayRef} style={{
                position: "absolute", inset: 0, background: "black",
                opacity: isHome ? 0 : 0.55, pointerEvents: "none",
                transition: "opacity 0.6s ease",
            }} />

            {/* Vignette permanente */}
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)",
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

            {/* Scroll hint — home seulement */}
            {isHome && (
                <div ref={hintRef} style={{
                    position: "absolute",
                    bottom: "max(44px, env(safe-area-inset-bottom, 44px))",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                    pointerEvents: "none", zIndex: 10,
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
            )}
        </div>
    );
}
