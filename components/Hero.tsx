"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import ParticleLogo from "./ParticleLogo";
import ParticleText from "./ParticleText";
import SandButton from "./SandButton";

export default function Hero() {
    const [shouldExplode, setShouldExplode] = useState(false);
    const [showRealLogo, setShowRealLogo] = useState(false);
    const [logoReady, setLogoReady] = useState(false);
    const [logoLaunched, setLogoLaunched] = useState(false);
    const [snapBack, setSnapBack] = useState(false);

    const logoContainerRef = useRef<HTMLDivElement | null>(null);
    const launchFiredRef = useRef(false);
    const explodeFiredRef = useRef(false);

    const [isMobile, setIsMobile] = useState(false);
    const [offsets, setOffsets] = useState({ text: 230, logo: -30, sec2Text: -50 });

    useEffect(() => {
        const updateLayout = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            setIsMobile(w < 768);

            const isPortraitMobile = w < 768 && h > w;
            const isLandscapeMobile = h < 500;
            const aspect = w / h;
            const isSquareish = aspect < 1.1;
            
            if (w > 1024 && !isSquareish) {
                // Desktop: Dynamic proportional offsets to prevent overlap on short/resizing viewports
                setOffsets({ text: h * 0.25, logo: -h * 0.03, sec2Text: -h * 0.08 });
            } else if (w >= 768 || (w > 1024 && isSquareish)) {
                // Tablet or Square Desktop (proportional so it never overlaps)
                setOffsets({ text: h * 0.30, logo: -h * 0.12, sec2Text: -h * 0.08 });
            } else if (isPortraitMobile) {
                // Mobile Portrait - even closer gap for better composition
                setOffsets({ text: h * 0.24, logo: -h * 0.09, sec2Text: -h * 0.12 });
            } else {
                // Mobile Landscape
                setOffsets({ text: h * 0.28, logo: -h * 0.20, sec2Text: -h * 0.15 });
            }
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 100) {
            setShouldExplode(true);
        } else {
            setShouldExplode(false);
        }
    });

    const triggerExplosion = () => {
        // Disabled explosion to keep the sand logo (logo sable) and remove the transition to metallic logo (metele)
        return;
    };

    // PHASE 2
    useEffect(() => {
        if (!logoReady) return;

        const tryLaunch = () => {
            // RESET quand utilisateur remonte en haut
            if (window.scrollY < 10) {
                setSnapBack(true);
                setLogoLaunched(false);
                launchFiredRef.current = false;
                setTimeout(() => setSnapBack(false), 100);
                return;
            }

            if (launchFiredRef.current) return;

            const container = logoContainerRef.current;

            if (!container) return;

            const rect = container.getBoundingClientRect();

            if (rect.top < -rect.height) return;

            launchFiredRef.current = true;

            setLogoLaunched(true);


        };

        window.addEventListener("scroll", tryLaunch, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", tryLaunch);
        };
    }, [logoReady]);

    return (
        <>
            {/* HERO */}
            <section className="relative h-screen overflow-hidden">

                {/* PARTICLE TEXT (SAND) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 1.5,
                        ease: "easeOut",
                        delay: 0.2,
                    }}
                    className="absolute inset-0"
                >
                    <ParticleText
                        lines={["SCALSET"]}
                        ariaLabel="Scalset"
                        className="text-[clamp(1.8rem,10vw,5.2rem)] font-bold tracking-[0.2em] md:tracking-[0.75em] uppercase font-[family-name:var(--font-syncopate)]"
                        yOffset={offsets.text}
                        explode={shouldExplode}
                    />
                </motion.div>

                {/* PARTICLE LOGO */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 1.5,
                        ease: "easeOut",
                    }}
                    className="absolute inset-0"
                >
                    <ParticleLogo
                        src="/logo-scalset.svg"
                        alt="Scalset Logo"
                        className="w-full h-full"
                        explode={shouldExplode}
                        yOffset={offsets.logo}
                    />
                </motion.div>

                {/* OVERLAY — capte le clic/tap pour déclencher l'explosion */}
                {!shouldExplode && (
                    <div
                        className="absolute inset-0 z-20 cursor-pointer"
                        onMouseEnter={triggerExplosion}
                        onTouchStart={triggerExplosion}
                    />
                )}




                {/* SCROLL */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: shouldExplode ? 0 : 1,
                    }}
                    transition={{
                        delay: 2,
                        duration: 1,
                    }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-medium">
                        Scroll
                    </span>

                    <div className="relative w-[2px] h-12 bg-white/10 overflow-hidden rounded-full">

                        <motion.div
                            animate={{
                                y: ["-100%", "100%"],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute inset-0 w-full h-1/2 bg-gradient-to-b from-transparent via-white/80 to-transparent"
                        />

                    </div>
                </motion.div>

            </section>

            {/* SECTION 2 */}
            <section className="relative min-h-screen overflow-hidden -mt-10 md:-mt-20">

                <div className="absolute inset-0">
                    <ParticleText
                        lines={["On s'occupe de votre équipe.", "Vous développez votre business."]}
                        ariaLabel="On s'occupe de votre équipe. Vous développez votre business."
                        className="mx-auto whitespace-nowrap text-[clamp(1.5rem,4.5vw,5.2rem)] font-bold tracking-tighter md:tracking-tighter leading-[1.1] md:leading-[0.98] py-4"
                        yOffset={offsets.sec2Text}
                    />

                    {/* SCALSET SIGNATURE ON SECOND PAGE */}
                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full h-32 opacity-80 pointer-events-none hidden md:block">
                        <ParticleText
                            lines={["SCALSET"]}
                            ariaLabel="Scalset Signature"
                            className="text-[clamp(1.2rem,2.5vw,2.8rem)] font-bold tracking-[0.3em] uppercase"
                            yOffset={0}
                        />
                    </div>
                </div>

                {/* SUBTITLE & CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.35 }}
                    className="absolute bottom-20 md:bottom-24 inset-x-0 flex flex-col items-center gap-8 px-6 text-center"
                >
                    {/* Volumetric Golden Light behind text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-full max-w-4xl h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.35)_0%,transparent_60%)] blur-[30px] pointer-events-none" />

                    <h3 
                        className="relative z-10 max-w-5xl text-[1.15rem] md:text-[1.6rem] lg:text-[2.1rem] font-bold leading-[1.3] tracking-wide"
                        style={{
                            background: "linear-gradient(180deg, #ffffff 0%, #a3a3a3 25%, #4d4d4d 45%, #2b2b2b 50%, #8c8c8c 55%, #e6e6e6 80%, #d4af37 100%)",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                            filter: "drop-shadow(0px 1px 1px rgba(255,255,255,0.4)) drop-shadow(0px 4px 3px rgba(0,0,0,0.8)) drop-shadow(0px 8px 15px rgba(0,0,0,0.9))"
                        }}
                    >
                        Nous recrutons, formons et supervisons<br/>
                        votre équipe dans nos locaux, tout en<br/>
                        restant pilotée par vous.
                    </h3>

                    <SandButton href="#contact">
                        <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="icon-metallic-strong" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#ffffff" />
                                    <stop offset="30%" stopColor="#a3a3a3" />
                                    <stop offset="50%" stopColor="#4d4d4d" />
                                    <stop offset="70%" stopColor="#b3b3b3" />
                                    <stop offset="100%" stopColor="#ffffff" />
                                </linearGradient>
                            </defs>
                            <path fill="url(#icon-metallic-strong)" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        Nous Contacter
                    </SandButton>
                </motion.div>

            </section>
        </>
    );
}