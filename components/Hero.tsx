"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import ParticleLogo from "./ParticleLogo";
import ParticleText from "./ParticleText";

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
                        className="text-[clamp(2.4rem,8vw,5.2rem)] font-bold tracking-[0.45em] md:tracking-[0.75em] uppercase font-[family-name:var(--font-syncopate)]"
                        yOffset={230}
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
                        yOffset={-30}
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
            <section className="relative min-h-screen overflow-hidden">

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
                        className="mx-auto max-w-[94vw] text-[clamp(2.1rem,7vw,5.2rem)] font-bold tracking-tighter leading-[1.1] md:leading-[0.98] py-4"
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
                    className="absolute bottom-14 md:bottom-16 inset-x-0 flex flex-col items-center gap-6 px-6 text-center"
                >
                    <p className="max-w-4xl text-lg md:text-xl lg:text-2xl leading-[1.2] text-transparent bg-clip-text bg-gradient-to-r from-[#E2E8F0] to-[#94A3B8] max-[480px]:text-[0.95rem]">
                        Nous recrutons, formons et supervisons votre équipe
                        dans nos locaux, tout en restant pilotée par vous.
                    </p>

                    <Link
                        href="#contact"
                        className="inline-flex btn-shiny transition-all text-lg min-h-[44px] px-6 items-center justify-center"
                    >
                        Nous Contacter
                    </Link>
                </motion.div>

            </section>
        </>
    );
}