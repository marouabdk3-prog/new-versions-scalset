"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SandButton from "./SandButton";

export default function Hero() {
    const [scrollPct, setScrollPct] = useState(0); // 0 → 1
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY;
            // The sticky section has 100vh of scrollable space (200vh total - 100vh sticky)
            const SCROLL_DISTANCE = window.innerHeight * 1.2; 
            const pct = Math.min(1, scrollY / SCROLL_DISTANCE);
            setScrollPct(pct);
        };

        // Run once on mount to get correct height
        onScroll();

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Scroll Mappings (0 to 1)
    
    // Smoke: Darkens the background quickly on scroll
    const smokeOpacity = Math.min(1, scrollPct * 3);

    // Main Content (Title + Paragraph + CTA): Fades in together
    let contentOpacity = 0;
    if (scrollPct >= 0.15 && scrollPct < 0.4) {
        contentOpacity = (scrollPct - 0.15) / 0.25;
    } else if (scrollPct >= 0.4) {
        contentOpacity = 1;
    }

    const contentY = scrollPct < 0.4 ? 40 * (1 - contentOpacity) : 0;

    // No master opacity fade — the hero stays visible as it scrolls up
    
    return (
        <>
            {/* Sticky container — 200vh for a tight, punchy scroll */}
            <div
                ref={containerRef}
                style={{ height: "200vh", position: "relative", zIndex: 3 }}
                id="hero-section"
            >
                <div style={{
                    position: "sticky",
                    top: 0,
                    width: "100%",
                    height: "100vh",
                    overflow: "hidden",
                    background: "#000",
                }}>

                    {/* ── BACKGROUND IMAGE ── */}
                    <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                        <Image
                            src="/images/hero-bg2.png"
                            alt="Hero background"
                            fill
                            priority
                            style={{ objectFit: "cover", objectPosition: "center" }}
                        />
                    </div>

                    {/* ── BOTTOM FADE on image ── */}
                    <div style={{
                        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
                        background: "linear-gradient(to bottom, transparent 70%, black 100%)"
                    }} />

                    {/* ── SMOKE OVERLAY ── */}
                    <div style={{
                        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
                        opacity: smokeOpacity,
                        background: "radial-gradient(ellipse at 25% 55%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.05) 100%)",
                        transition: "opacity 0.1s linear",
                    }} />

                    {/* ── LOGO ON THE WALL ── */}
                    <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 animate-metalGlow" style={{
                        top: "12%",
                        zIndex: 3, 
                        pointerEvents: "none",
                        opacity: Math.max(0, 0.9 - scrollPct * 6),
                        filter: "drop-shadow(0 0 30px rgba(212,175,55,0.4))"
                    }}>
                        <div className="relative" style={{
                            width: "clamp(100px, 15vw, 180px)",
                            height: "clamp(100px, 15vw, 180px)",
                        }}>
                            <Image src="/100.svg" alt="Scalset Logo" fill style={{ objectFit: "contain" }} priority />
                        </div>
                        <span className="font-sans tracking-[0.6em] uppercase text-2xl md:text-3xl lg:text-4xl font-light" style={{
                            background: "linear-gradient(180deg, #ffffff 0%, #eaddc5 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.8))"
                        }}>
                            Scalset
                        </span>
                    </div>

                    {/* ── PHASED CONTENT CONTAINER (All Text Together) ── */}
                    <div style={{
                        position: "absolute", inset: 0, zIndex: 4,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        padding: "0 clamp(20px, 5vw, 40px)",
                        pointerEvents: contentOpacity > 0.5 ? "auto" : "none",
                    }}>
                        
                        <div style={{
                            position: "relative",
                            width: "100%",
                            maxWidth: 700,
                            opacity: contentOpacity,
                            transform: `translateY(${contentY}px)`,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            gap: 36,
                        }}>
                            
                            {/* TITLE */}
                            <h1 style={{
                                fontFamily: "var(--font-montserrat), sans-serif",
                                fontWeight: 300,
                                fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                                lineHeight: 1.15,
                                color: "#eaddc5",
                                letterSpacing: "-0.03em",
                                margin: 0,
                                filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.8))",
                            }}>
                                Construisez plus grand.<br />
                                <span style={{ fontWeight: 500, color: "#fff" }}>Exécutez plus vite.</span>
                            </h1>

                            {/* PARAGRAPH & CTA */}
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 32,
                            }}>
                                <p style={{
                                    fontFamily: "var(--font-montserrat), sans-serif",
                                    fontWeight: 300,
                                    fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)",
                                    color: "rgba(255,255,255,0.85)",
                                    lineHeight: 1.6,
                                    margin: 0,
                                }}>
                                    Nous recrutons, formons et supervisons votre équipe dans nos locaux, tout en restant pilotée par vous.
                                </p>

                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                                    <SandButton href="/contact">Nous Contacter</SandButton>
                                    <span style={{
                                        fontFamily: "var(--font-montserrat), sans-serif",
                                        fontSize: "0.6rem",
                                        letterSpacing: "0.38em",
                                        color: "rgba(255,255,255,0.28)",
                                        textTransform: "uppercase",
                                    }}>
                                        Scalset exécute le reste
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* ── SCROLL INDICATOR (visible only at start) ── */}
                    <div style={{
                        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                        zIndex: 5, pointerEvents: "none",
                        opacity: Math.max(0, 1 - scrollPct * 5),
                        transition: "opacity 0.1s linear",
                    }}>
                        <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.08)", position: "relative", overflow: "hidden", borderRadius: 4 }}>
                            <div className="animate-scroll-drop" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 15, background: "#d4af37" }} />
                        </div>
                        <span style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-montserrat), sans-serif" }}>
                            Scroll
                        </span>
                    </div>

                </div>
            </div>
        </>
    );
}
