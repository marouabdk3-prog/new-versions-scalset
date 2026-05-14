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

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
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
                        className="text-[clamp(2.0rem,6vw,5.2rem)] font-bold tracking-[0.3em] md:tracking-[0.75em] uppercase font-[family-name:var(--font-syncopate)]"
                        yOffset={isMobile ? 80 : 230}
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
                        yOffset={isMobile ? -60 : -30}
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
            <section className="relative min-h-[100dvh] md:min-h-screen overflow-hidden -mt-10 md:-mt-20">

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{
                        once: true,
                        amount: 0.15,
                    }}
                    transition={{
                        duration: 1,
                        ease: "easeOut",
                    }}
                    className="absolute inset-0"
                >
                    <ParticleText
                        lines={
                            isMobile
                                ? [
                                    "On s'occupe",
                                    "de votre équipe.",
                                    "Vous développez",
                                    "votre business.",
                                ]
                                : [
                                    "On s'occupe de votre équipe.",
                                    "Vous développez votre business.",
                                ]
                        }
                        ariaLabel="On s'occupe de votre équipe. Vous développez votre business."
                        className="mx-auto whitespace-nowrap text-[clamp(1.5rem,4.5vw,5.2rem)] font-bold tracking-tighter leading-[1.1] md:leading-[0.98] py-4"
                        yOffset={isMobile ? -80 : -50}
                    />
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                    transition={{
                        duration: 1,
                        ease: "easeOut",
                        delay: 0.35,
                    }}
                    className="absolute bottom-24 md:bottom-28 inset-x-0 flex flex-col items-center gap-6 px-6 text-center"
                >
                    <p className="max-w-4xl text-lg md:text-xl lg:text-2xl leading-[1.2] text-transparent bg-clip-text bg-gradient-to-r from-[#E2E8F0] to-[#94A3B8] max-[480px]:text-[0.95rem]">
                        Nous recrutons, formons et supervisons votre équipe
                        dans nos locaux, tout en restant pilotée par vous.
                    </p>

                    <SandButton href="#contact">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        Nous Contacter
                    </SandButton>
                </motion.div>

            </section>
        </>
    );
}