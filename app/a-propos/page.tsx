"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

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

// Custom Scroll Reveal Text Component
function ScrollRevealWord({
    word,
    index,
    total,
    progress,
}: {
    word: string;
    index: number;
    total: number;
    progress: MotionValue<number>;
}) {
    const start = index / total;
    const end = start + (1 / total);
    const opacity = useTransform(progress, [start, end], [0.1, 1]);
    const filter = useTransform(progress, [start, end], ["blur(10px)", "blur(0px)"]);

    return (
        <motion.span
            style={{ opacity, filter }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-300"
        >
            {word}
        </motion.span>
    );
}

function ScrollRevealText({ text }: { text: string }) {
    // ... remaining imports left out, just adding the component ...

    const textRef = useRef<HTMLHeadingElement>(null);
    const { scrollYProgress } = useScroll({
        target: textRef,
        offset: ["start 80%", "end 50%"]
    });

    const words = text.split(" ");

    return (
        <h2 ref={textRef} className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white/10 leading-[1.4] flex flex-wrap gap-x-3 md:gap-x-4 gap-y-2">
            {words.map((word, i) => (
                <ScrollRevealWord
                    key={`${word}-${i}`}
                    word={word}
                    index={i}
                    total={words.length}
                    progress={scrollYProgress}
                />
            ))}
        </h2>
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
            className="relative mt-20 h-[40vh] flex flex-col items-center justify-center text-center px-4 rounded-[3rem] border-2 border-slate-200/30 shadow-[0_0_40px_rgba(226,232,240,0.08)] overflow-hidden group"
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
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
                    Arrêtez de payer trop cher<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 italic pr-2">
                        pour exécuter
                    </span>
                </h2>
                <motion.a
                    href="#contact"
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
                        <div className="px-6 py-2 rounded-full border-2 border-slate-200/30 bg-white/[0.03] backdrop-blur-md shadow-[0_0_20px_rgba(226,232,240,0.05)]">
                            <span className="text-xs lg:text-sm font-semibold tracking-[0.2em] uppercase text-slate-400">ScalSet Identity</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl lg:text-[8.5rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#F8FAFC] via-[#E2E8F0] to-[#64748B] leading-[0.9] pb-4 drop-shadow-2xl">
                            L&apos;Exécution<br />Comme Art.
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl lg:text-2xl max-w-3xl font-light leading-relaxed">
                            Notre expertise en outsourcing nous permet de fournir à des structures la possibilité d’être parmi
                            les plus compétitives et les plus efficaces sur le marché mondial.
                        </p>
                    </motion.div>


                </section>

                {/* 2. KINETIC TYPOGRAPHY MISSION */}
                <section className="min-h-[80vh] flex items-center py-32 lg:py-48">
                    <ScrollRevealText text="Chez SCALSET, notre ambition est simple: vous permettre de réussir avec les bons outils et les bonnes personnes. En parallèle, nous veillons à offrir à nos équipes des conditions de travail sérieuses et valorisantes, pour qu’elles puissent évoluer et vous apporter une vraie stabilité pour performer et construire sur le long terme." />
                </section>


                {/* 3. STICKY STACKING CARDS (THE METHODOLOGY) */}
                <section className="py-24 relative lg:min-h-[150vh]">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-start relative">
                        {/* Sticky Text Side */}
                        <div className="lg:w-5/12 lg:sticky lg:top-32 flex flex-col gap-8 z-10">
                            <h2 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-none">
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
