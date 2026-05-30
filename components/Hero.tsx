"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import ParticleLogo from "./ParticleLogo";
import ParticleText from "./ParticleText";
import SandButton from "./SandButton";

export default function Hero() {
    const [shouldExplode, setShouldExplode] = useState(false);
    const [exitLeft, setExitLeft] = useState(false);
    const [sandExited, setSandExited] = useState(true);

    const [isMobile, setIsMobile] = useState(false);
    const [offsets, setOffsets] = useState({ text: 230, logo: -30, sec2Text: -50 });
    const [sandLogoSize, setSandLogoSize] = useState(280);

    useEffect(() => {
        const updateLayout = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            setIsMobile(w < 768);

            const isPortraitMobile = w < 768 && h > w;
            const aspect = w / h;
            const isSquareish = aspect < 1.1;

            if (w > 1024 && !isSquareish) {
                setOffsets({ text: Math.round(h * 0.30), logo: -Math.round(h * 0.18), sec2Text: -150 });
            } else if (w >= 768 || (w > 1024 && isSquareish)) {
                setOffsets({ text: h * 0.28, logo: -h * 0.20, sec2Text: -120 });
            } else if (isPortraitMobile) {
                setOffsets({ text: h * 0.20, logo: -h * 0.14, sec2Text: -h * 0.28 });
            } else {
                setOffsets({ text: h * 0.18, logo: -h * 0.20, sec2Text: -h * 0.25 });
            }

            const isLandscapeMobile = h < 500;
            let mobileScale = 0.58;
            if (w <= 1024 || isSquareish) {
                const baseScale = isPortraitMobile ? 0.46 : (isLandscapeMobile ? 0.34 : 0.50);
                mobileScale = Math.min(baseScale, aspect * 0.70);
            }
            setSandLogoSize(Math.min(w, h) * mobileScale);
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


    return (
        <>
            {/* HERO */}
            <section className="relative overflow-hidden bg-transparent" style={{ height: '100dvh', minHeight: 500 }}>

                {/* PARTICLE TEXT (SAND) — fond en sortant quand le logo sable part */}
                {!sandExited && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: exitLeft ? 0 : 1 }}
                        transition={exitLeft
                            ? { duration: 0.5, ease: "easeIn" }
                            : { duration: 1.5, ease: "easeOut", delay: 0.2 }
                        }
                        className="absolute inset-0"
                    >
                        <ParticleText
                            lines={["SCALSET"]}
                            ariaLabel="Scalset"
                            className="text-[clamp(1.8rem,10vw,5.2rem)] font-bold tracking-[0.2em] md:tracking-[0.75em] uppercase font-(family-name:--font-syncopate)"
                            yOffset={offsets.text}
                            explode={shouldExplode}
                        />
                    </motion.div>
                )}

                {/* SCALSET texte statique — même couleur que 100.svg, apparaît avec le logo */}
                {sandExited && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            pointerEvents: "none",
                            transform: `translateY(${offsets.text}px)`,
                        }}
                    >
                        {/* wrapper drop-shadow = arêtes champagne, comme stroke du SVG */}
                        <div className="flex flex-col items-center gap-20">
                            <div className="animate-metalGlow" style={{
                                filter: "drop-shadow(0 0 0.4px rgba(214,179,106,0.65)) drop-shadow(0 0 1px rgba(214,179,106,0.25))",
                            }}>
                                <span className="metal-shine-text" style={{
                                    fontFamily: "var(--font-syncopate)",
                                    fontSize: "clamp(1.4rem, 7.5vw, 4.2rem)",
                                    fontWeight: 700,
                                    letterSpacing: "0.25em",
                                    textTransform: "uppercase",
                                    whiteSpace: "nowrap",
                                }}>
                                    SCALSET
                                </span>
                            </div>
                            <div className="animate-metalGlow" style={{
                                filter: "drop-shadow(0 0 0.4px rgba(214,179,106,0.4)) drop-shadow(0 0 1px rgba(214,179,106,0.15))",
                            }}>
                                <span className="metal-shine-text" style={{
                                    fontFamily: "var(--font-syncopate)",
                                    fontSize: "clamp(0.55rem, 2.2vw, 1.45rem)",
                                    fontWeight: 600,
                                    letterSpacing: "0.18em",
                                    textTransform: "uppercase",
                                    textAlign: "center",
                                    display: "block",
                                    lineHeight: 1.6,
                                    padding: "0 1rem",
                                }}>
                                    Pendant que vous dirigez la vision,<br />
                                    Scalset exécute le reste.
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* LOGO métallique 100.svg */}
                {sandExited && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-0 pointer-events-none select-none"
                    >
                        <div style={{
                            position: "absolute",
                            width: sandLogoSize,
                            height: sandLogoSize,
                            top: "50%",
                            left: "50%",
                            transform: `translate(-50%, calc(-50% + ${offsets.logo}px + 20px))`,
                        }}>
                            <Image src="/100.svg" alt="Scalset Logo" fill draggable={false} className="animate-metalGlow" style={{ objectFit: "contain" }} />
                        </div>
                    </motion.div>
                )}

                {/* PARTICLE LOGO (sable) */}
                {!sandExited && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0"
                    >
                        <ParticleLogo
                            src="/logo-scalset.svg"
                            alt="Scalset Logo"
                            className="w-full h-full"
                            exitLeft={exitLeft}
                            onExitLeftComplete={() => setSandExited(true)}
                            yOffset={offsets.logo + 50}
                        />
                    </motion.div>
                )}

                {/* OVERLAY — déclenche la sortie gauche au clic/tap sur le logo ou l'écriture */}
                {!exitLeft && !sandExited && (
                    <div
                        className="absolute inset-0 z-20 cursor-pointer"
                        onMouseEnter={() => setExitLeft(true)}
                        onTouchStart={() => setExitLeft(true)}
                    />
                )}

                {/* LOGO 100.svg — apparaît fixe après la sortie du sable */}




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
                    className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom,1.5rem))] left-8 flex flex-col items-center gap-2 md:gap-3"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-medium">
                        Scroll
                    </span>

                    <div className="relative w-0.5 h-12 bg-white/10 overflow-hidden rounded-full">

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
                            className="absolute inset-0 w-full h-1/2 bg-linear-to-b from-transparent via-white/80 to-transparent"
                        />

                    </div>
                </motion.div>

            </section>

            {/* SECTION 2 */}
            <section className="relative overflow-hidden -mt-10 md:-mt-20" style={{ minHeight: 'max(100dvh, 600px)' }}>

                <div className="absolute inset-0">
                    <ParticleText
                        lines={["On s'occupe de votre équipe.", "Vous développez votre business."]}
                        ariaLabel="On s'occupe de votre équipe. Vous développez votre business."
                        className="mx-auto text-[clamp(1.1rem,3.8vw,5.2rem)] font-bold tracking-tighter leading-[1.15] py-2 md:py-4 px-4"
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
                    className="absolute bottom-8 sm:bottom-14 md:bottom-20 lg:bottom-24 inset-x-0 flex flex-col items-center gap-4 md:gap-8 px-4 sm:px-6 text-center"
                >
                    {/* Volumetric Golden Light behind text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-full max-w-4xl h-75 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.35)_0%,transparent_60%)] blur-[30px] pointer-events-none" />

                    <h3
                        className="relative z-10 max-w-3xl text-[0.85rem] sm:text-[1.05rem] md:text-[1.5rem] lg:text-[2.1rem] font-bold leading-[1.4] tracking-wide px-2 metal-shine-text"
                        style={{
                            filter: "drop-shadow(0px 1px 1px rgba(255,255,255,0.3)) drop-shadow(0px 4px 3px rgba(0,0,0,0.8)) drop-shadow(0px 8px 15px rgba(0,0,0,0.9))"
                        }}
                    >
                        Nous recrutons, formons et supervisons<br/>
                        votre équipe dans nos locaux, tout en<br/>
                        restant pilotée par vous.
                    </h3>

                    <SandButton href="/contact">
                        Nous Contacter
                    </SandButton>
                </motion.div>

            </section>
        </>
    );
}