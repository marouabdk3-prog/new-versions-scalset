"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SandButton from "./SandButton";

export default function Hero() {
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <>
            {/* ═══ SECTION 1 — HERO ═══ */}
            <section
                className="relative overflow-hidden bg-black"
                style={{ height: "100dvh", minHeight: 560 }}
            >
                {/* ── BACKGROUND IMAGE ── */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                        src="/images/hero-bg2.png"
                        alt="Hero background"
                        fill
                        priority
                        className="object-cover object-center"
                    />

                    {/* Film grain */}
                    <div className="film-grain-overlay" />

                    {/* Cadre fumée noire */}
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "radial-gradient(ellipse at 50% 50%, transparent 28%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.80) 78%, rgba(0,0,0,0.97) 100%)",
                    }} />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.26)" }} />
                    <div style={{
                        position: "absolute", top: 0, left: 0, right: 0, height: "18%",
                        background: "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 100%)",
                    }} />
                    <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0, height: "28%",
                        background: "linear-gradient(to top, #000 0%, transparent 100%)",
                    }} />
                </div>

                {/* ── HERO CONTENT ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0 z-10 w-full h-full"
                >
                    {/* Logo métallique et Texte - On the Wall */}
                    <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 animate-metalGlow opacity-90" style={{
                        filter: "drop-shadow(0 0 30px rgba(212,175,55,0.4))"
                    }}>
                        <div className="relative" style={{
                            width: "clamp(100px, 15vw, 180px)",
                            height: "clamp(100px, 15vw, 180px)",
                        }}>
                            <Image src="/100.svg" alt="Scalset Logo" fill style={{ objectFit: "contain" }} />
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

                    {/* Left aligned content block */}
                    <div className="flex flex-col justify-center h-full w-full max-w-[45%] px-6 sm:px-10 lg:px-20 text-left">
                        {/* Top tagline retiré à la demande de l'utilisateur */}

                        {/* Grand titre retiré à la demande de l'utilisateur */}

                        {/* Nouveau Titre Elegant Serif */}
                        <h1 style={{
                            fontFamily: "var(--font-cormorant)",
                            fontWeight: 300,
                            fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
                            lineHeight: 1.1,
                            color: "#eaddc5",
                            letterSpacing: "-0.02em",
                            filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.6))"
                        }}>
                            Construisez plus grand.<br />
                            <em style={{ fontStyle: "italic" }}>Exécutez plus vite.</em>
                        </h1>

                        {/* Sous-titre italic */}
                        <p style={{
                            fontFamily: "var(--font-cormorant)",
                            fontStyle: "italic",
                            fontSize: "clamp(1rem, 2.2vw, 1.45rem)",
                            color: "rgba(255,255,255,0.58)",
                            maxWidth: "44rem",
                            lineHeight: 1.75,
                        }} className="mt-5 sm:mt-7">
                            Nous recrutons, formons et supervisons votre équipe dans nos locaux,
                            tout en restant pilotée par vous.
                        </p>

                        {/* CTA Button */}
                        <div className="mt-8 sm:mt-12 flex flex-col gap-4">
                            <Link href="/contact" className="group relative px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-500 bg-black flex items-center justify-center overflow-hidden w-fit" style={{
                                border: "1px solid rgba(234, 221, 197, 0.7)",
                                boxShadow: "0 0 15px rgba(234, 221, 197, 0.2)",
                            }}>
                                <div className="absolute inset-0 bg-[#eaddc5]/0 group-hover:bg-[#eaddc5]/10 transition-colors duration-500" />
                                <span className="relative font-sans font-bold text-xs sm:text-sm tracking-wide" style={{
                                    background: "linear-gradient(180deg, #ffffff 0%, #eaddc5 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    filter: "drop-shadow(0px 3px 5px rgba(0,0,0,0.9))"
                                }}>
                                    Nous Contacter
                                </span>
                            </Link>
                            <p style={{
                                fontFamily: "var(--font-space-grotesk)",
                                fontSize: "0.6rem",
                                letterSpacing: "0.38em",
                                color: "rgba(255,255,255,0.28)",
                            }} className="uppercase">
                                Scalset exécute le reste
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom,1.5rem))] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
                >
                    <div className="relative w-px h-10 overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                        <motion.div
                            animate={{ y: ["-100%", "100%"], opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-1/2"
                            style={{ background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.7), transparent)" }}
                        />
                    </div>
                </motion.div>
            </section>

        </>
    );
}
