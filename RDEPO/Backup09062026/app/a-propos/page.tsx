"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const cards = [
    {
        title: "Payez moins, gagnez plus",
        content: "Un coût d’exécution réduit avec de meilleures performances. Vous gardccez un haut niveau d’efficacité sans supporter les charges locales.",
        points: ["Coûts maîtrisés", "Rentabilité", "Scalabilité"]
    },
    {
        title: "Du concret, pas des promesses",
        content: "Un travail sérieux, structuré et suivi au quotidien. Des équipes encadrées qui exécutent proprement, sans erreur.",
        points: ["Rigueur", "Suivi", "Fiabilité"]
    },
    {
        title: "Collaborer en toute confiance",
        content: "Aucune fuite, aucune exposition : votre activité reste sécurisée. Vos données, vos process et votre organisation restent totalement protégés.",
        points: ["Confidentialité", "Sécurité", "Discrétion"]
    }
];

import OrganizationChart from "@/components/OrganizationChart";

const missionPhotos = ["/01.jpeg", "/02.jpeg", "/03.jpeg"];

function MissionCard() {
    const [revealed, setRevealed] = useState(false);

    return (
        <section className="py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

                {/* LEFT: Text Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:w-1/2 w-full relative rounded-3xl p-8 md:p-12 flex flex-col gap-7 overflow-hidden"
                    style={{
                        background: "rgba(6,6,12,0.75)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        border: "1px solid rgba(212,175,55,0.18)",
                        boxShadow: "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.12)",
                    }}
                >
                    {/* Gold top highlight */}
                    <div className="absolute inset-x-0 top-0 h-px pointer-events-none"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)" }} />

                    <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "#d4af37" }}>
                        Notre Mission
                    </span>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight">
                        L&apos;ambition<br />qui nous{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500 italic pr-1">
                            définit.
                        </span>
                    </h2>

                    <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-md">
                        Chez SCALSET, notre ambition est simple : vous permettre de réussir avec les bons outils et les bonnes personnes. Nous veillons à offrir à nos équipes des conditions de travail sérieuses et valorisantes, pour vous apporter une vraie stabilité sur le long terme.
                    </p>

                    <div className="w-12 h-px" style={{ background: "rgba(212,175,55,0.4)" }} />

                    <div className="flex gap-10">
                        {[["100%", "Dédiés"], ["24/7", "Disponibles"], ["0%", "Compromis"]].map(([val, label]) => (
                            <div key={label}>
                                <p className="text-2xl font-black text-white">{val}</p>
                                <p className="text-xs uppercase tracking-widest text-slate-500 mt-1">{label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* RIGHT: Floating Photos */}
                <div
                    className="lg:w-1/2 w-full"
                    onMouseEnter={() => setRevealed(true)}
                    onMouseLeave={() => setRevealed(false)}
                    onTouchStart={() => setRevealed(true)}
                >
                    {/* Mobile: simple grid */}
                    <div className="grid grid-cols-3 gap-3 lg:hidden">
                        {missionPhotos.map((src, i) => (
                            <motion.div
                                key={i}
                                animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                                transition={{ delay: revealed ? i * 0.18 : (2 - i) * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                                className="relative rounded-xl overflow-hidden aspect-[3/4]"
                                style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)" }}
                            >
                                <Image src={src} alt={`ScalSet ${i + 1}`} fill className="object-cover" sizes="30vw" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Desktop: cascading stacked cards */}
                    <div className="hidden lg:block relative" style={{ height: 420 }}>
                        {missionPhotos.map((src, i) => {
                            const configs = [
                                { top: 0,   left: "0%",  width: "68%", rotate: "-3deg", zIndex: 3 },
                                { top: 50,  left: "16%", width: "68%", rotate: "0deg",  zIndex: 2 },
                                { top: 100, left: "32%", width: "68%", rotate: "3deg",  zIndex: 1 },
                            ];
                            const c = configs[i];
                            return (
                                <motion.div
                                    key={i}
                                    animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                                    transition={{ delay: revealed ? i * 0.2 : (2 - i) * 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute rounded-2xl overflow-hidden"
                                    style={{
                                        top: c.top,
                                        left: c.left,
                                        width: c.width,
                                        aspectRatio: "4/3",
                                        transform: `rotate(${c.rotate})`,
                                        zIndex: c.zIndex,
                                        boxShadow: "0 24px 60px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.07)",
                                    }}
                                >
                                    <Image src={src} alt={`ScalSet ${i + 1}`} fill className="object-cover" sizes="40vw" />
                                    <div className="absolute inset-0 pointer-events-none"
                                        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%, rgba(0,0,0,0.18) 100%)" }} />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}

function ElevatedConclusion() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        setMousePosition({ x: e.clientX - left, y: e.clientY - top });
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative mt-12 sm:mt-20 min-h-[40vh] flex flex-col items-center justify-center text-center px-4 rounded-4xl sm:rounded-[3rem] border-2 border-slate-200/30 shadow-[0_0_40px_rgba(226,232,240,0.08)] overflow-hidden group"
        >
            <div className="absolute inset-0 bg-[#0d0d14]" />

            {/* Base static glow from bottom */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_150%,rgba(148,163,184,0.15)_0%,transparent_60%)] group-hover:opacity-0 transition-opacity duration-1000" />

            {/* Hover cursor glow effect */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out"
                style={{
                    background: `radial-gradient(circle 140px at ${mousePosition.x}px ${mousePosition.y}px, rgba(226,232,240,0.15), transparent 40%)`,
                    opacity: isHovered ? 1 : 0
                }}
            
            />

            <div className="relative z-10 flex flex-col items-center gap-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
                    Arrêtez de payer trop cher<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 italic pr-2">
                        pour exécuter
                    </span>
                </h2>
                <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-shiny px-10 py-5 text-lg rounded-2xl"
                >
                    Démarrer la collaboration
                </motion.a>
            </div>
        </section>
    );
}

export default function APropos() {
    return (
        <main className="min-h-screen relative overflow-clip selection:bg-slate-300/20">
            {/* Ambient Background Glows tailored for this page */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-slate-400/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <div className="absolute top-[40%] left-0 w-[40vw] h-[40vw] bg-slate-200/5 blur-[150px] rounded-full pointer-events-none -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-24">

                {/* 1. HERO */}
                <section className="relative h-[90vh] flex flex-col items-center justify-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50, filter: "blur(20px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center gap-8"
                    >
                        <div className="relative inline-flex items-center justify-center">
                            <div className="absolute inset-0 rounded-[999px] bg-[#d4af37]/30 blur-xl pointer-events-none" />
                            <div
                                className="relative rounded-[999px] p-[2px] shadow-[0_10px_30px_rgba(212,175,55,0.4)]"
                                style={{ background: "linear-gradient(180deg, #ffffff 0%, #a3a3a3 20%, #4d4d4d 50%, #d4af37 80%, #ffdf73 100%)" }}
                            >
                                <div className="relative px-6 py-2.5 flex items-center justify-center rounded-[999px] bg-gradient-to-b from-black/80 to-[#1a1a1a] backdrop-blur-md">
                                    <div className="absolute inset-0 rounded-[999px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),inset_0_-1px_3px_rgba(212,175,55,0.3)] pointer-events-none" />
                                    <span
                                        className="relative z-10 text-xs lg:text-sm font-bold tracking-[0.2em] uppercase"
                                        style={{
                                            background: "linear-gradient(180deg, #ffffff 0%, #a3a3a3 25%, #4d4d4d 45%, #2b2b2b 50%, #8c8c8c 55%, #e6e6e6 80%, #d4af37 100%)",
                                            WebkitBackgroundClip: "text",
                                            backgroundClip: "text",
                                            color: "transparent",
                                        }}
                                    >
                                        ScalSet Identity
                                    </span>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[8.5rem] font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-[#F8FAFC] via-[#E2E8F0] to-[#64748B] leading-[0.9] pb-4 drop-shadow-2xl">
                            L&apos;Exécution<br />Comme Art.
                        </h1>
                        <p className="text-[#d8d8d8] text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl font-bold leading-relaxed">
                            Notre expertise en outsourcing nous permet de fournir à des structures la possibilité d’être parmi
                            les plus compétitives et les plus efficaces sur le marché mondial.
                        </p>
                    </motion.div>


                </section>

                {/* 2. MISSION BLOG CARD */}
                <MissionCard />


                {/* 3. STICKY STACKING CARDS (THE METHODOLOGY) */}
                <section className="py-24 relative lg:min-h-[150vh]">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-start relative">
                        {/* Sticky Text Side */}
                        <div className="lg:w-5/12 lg:sticky lg:top-32 flex flex-col gap-8 z-10">
                            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-none">
                                Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-600 font-black italic pr-4">ADN</span>
                            </h2>
                            <p className="text-lg lg:text-xl text-slate-400 leading-relaxed max-w-md">
                                Notre ADN chez ScalSet repose sur trois piliers. Cela nous permet de nous démarquer sur le
                                marché et d&apos;accompagner efficacement les entreprises qui veulent aller plus loin, se structurer et
                                développer une activité solide.
                            </p>
                            {/* Invisible spacer to synchronize unsticking with the right cards (matches sticky bottom bounds) */}
                            <div className="hidden lg:block h-[260px] pointer-events-none" />
                        </div>

                        {/* Stacking Cards Side */}
                        <div className="lg:w-7/12 relative flex flex-col gap-8 w-full mt-12 lg:mt-0 lg:pb-12">
                            {cards.map((card, index) => (
                                <div
                                    key={index}
                                    className="lg:sticky w-full transition-all duration-500"
                                    style={{
                                        top: `${140 + (index * 50)}px`,   // Each card stops 130px lower than the previous one
                                        zIndex: 20 + index
                                    }}
                                >
                                    <div className="bg-[#11111B]/90 backdrop-blur-2xl border-2 border-slate-200/30 rounded-[2rem] p-8 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.6)] flex flex-col gap-8 origin-top group hover:border-slate-200/50 hover:shadow-[0_0_30px_rgba(226,232,240,0.1)] transition-all duration-500 glass-panel">
                                        <div className="flex items-center gap-6">
                                            <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 select-none">
                                                0{index + 1}
                                            </span>
                                            <h3 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
                                                {card.title}
                                            </h3>
                                        </div>
                                        <p className="text-slate-400 leading-relaxed text-lg">
                                            {card.content}
                                        </p>
                                        <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
                                            {card.points.map((pt, i) => (
                                                <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-slate-300/10 text-[13px] font-medium text-slate-300 group-hover:bg-white/10 group-hover:text-white transition-all duration-300">
                                                    {pt}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <OrganizationChart />

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-24">
                {/* 5. ELEVATED CONCLUSION */}
                <ElevatedConclusion />

            </div>
        </main>
    );
}
