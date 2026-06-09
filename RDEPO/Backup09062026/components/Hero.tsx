"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SandButton from "./SandButton";

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (!heroRef.current) return;

        let ctx = gsap.context(() => {
            // Hero Scroll Sequence
            const heroTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".hero-pin-container",
                    start: "top top",
                    end: "+=1500", // slightly shorter scroll distance
                    scrub: 1,
                    pin: true,
                }
            });

            heroTl
            // 1. Reveal the main text block faster
            .fromTo(".hero-text-block", {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                duration: 1
            })
            // 2. Reveal the CTA button
            .fromTo(".hero-cta-block", {
                opacity: 0,
                y: 30
            }, {
                opacity: 1,
                y: 0,
                duration: 0.5
            }, "+=0.1")
            // 3. Add padding at the end so it stays visible before unpinning
            .to({}, { duration: 0.5 });
        }, heroRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section className="hero-pin-container relative w-full h-screen bg-transparent overflow-hidden isolate" ref={heroRef} id="hero-section">
            {/* Background Image / Overlay */}
            <div className="absolute inset-0 z-[-1]">
                <div 
                    className="absolute inset-0 z-0 overflow-hidden"
                    style={{
                        WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                        maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)"
                    }}
                >
                    <Image
                        src="/images/hero-bg2.png"
                        alt="Hero background"
                        fill
                        priority
                        className="object-cover object-center"
                    />
                </div>
            </div>

            {/* PERMANENT LOGO ON THE WALL */}
            <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute left-1/2 top-[32%] -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center pointer-events-auto">
                    <Image 
                        src="/100.svg" 
                        alt="Scalset Symbol" 
                        width={400} 
                        height={400} 
                        className="w-[7rem] md:w-[10rem] lg:w-[12rem] object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] mb-4 md:mb-5"
                        priority
                    />
                    <span className="font-sans tracking-[0.5em] uppercase text-xl md:text-2xl lg:text-3xl font-light whitespace-nowrap" style={{
                        background: "linear-gradient(180deg, #ffffff 0%, #a0a0a0 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        filter: "drop-shadow(0px 8px 15px rgba(0,0,0,0.9))"
                    }}>
                        Scalset
                    </span>
                </div>
            </div>

            {/* SCROLL REVEAL CONTENT */}
            <div className="absolute inset-0 flex items-center justify-start pointer-events-none z-20 px-6 md:px-12 lg:px-24">
                <div className="relative z-10 flex flex-col items-start text-left max-w-xl xl:max-w-2xl mt-24">
                    
                    {/* Step 1: Text Block */}
                    <div className="hero-text-block opacity-0 flex flex-col items-start pointer-events-auto">
                        <h1 style={{
                            fontFamily: "var(--font-montserrat)",
                            fontWeight: 300,
                            fontSize: "clamp(2.5rem, 4.5vw, 4rem)",
                            lineHeight: 1.15,
                            color: "#eaddc5",
                            letterSpacing: "-0.03em",
                            filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.6))"
                        }}>
                            Construisez<br/>
                            plus grand.<br />
                            <span style={{ fontWeight: 500, color: "#ffffff" }}>Exécutez plus<br/>vite.</span>
                        </h1>

                        <p style={{
                            fontFamily: "var(--font-montserrat)",
                            fontWeight: 300,
                            fontSize: "clamp(1rem, 1.2vw, 1.15rem)",
                            color: "rgba(255,255,255,0.65)",
                            lineHeight: 1.6,
                            letterSpacing: "0.02em",
                        }} className="mt-5 sm:mt-7">
                            Nous recrutons, formons et supervisons votre équipe dans nos locaux, tout en restant pilotée par vous.
                        </p>
                    </div>

                    {/* Step 2: CTA Block */}
                    <div className="hero-cta-block opacity-0 mt-10 flex flex-col items-start gap-3 pointer-events-auto">
                        <SandButton href="/contact">Nous Contacter</SandButton>
                        <p style={{
                            fontFamily: "var(--font-montserrat)",
                            fontSize: "0.6rem",
                            letterSpacing: "0.38em",
                            color: "rgba(255,255,255,0.28)",
                        }} className="uppercase ml-2 font-semibold">
                            Scalset exécute le reste
                        </p>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom,1.5rem))] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 pointer-events-none">
                <div className="relative w-px h-10 overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div className="absolute top-0 left-0 w-full h-[15px] bg-[#d4af37] animate-scroll-drop" />
                </div>
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-white/30 font-sans">
                    Scroll
                </span>
            </div>
        </section>
    );
}
