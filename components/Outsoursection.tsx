"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Outsoursection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        containerRef.current.style.setProperty('--mouse-x', `${x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <section
            id="outsourcing"
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
        >
            <div className="w-full max-w-[1400px] px-8 lg:px-16 flex items-center justify-between h-full">
                
                {/* LEFT COLUMN: Metadata / Stats (Lunchlab style) */}
                <div className="w-[25%] flex flex-col gap-10 text-left">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <div className="border border-[#eaddc5] bg-[#0a0a0a] rounded-full px-6 py-2 inline-flex items-center uppercase font-sans tracking-[0.3em] text-[0.65rem]">
                            <span style={{
                                color: "#e0e0e0" // Light silver color matching the image
                            }}>
                                Outsourcing - Performance
                            </span>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-8"
                    >
                        {/* Stat 1 */}
                        <div className="flex flex-col gap-2">
                            <span className="text-[0.65rem] tracking-[0.25em] text-white/50 uppercase font-sans">
                                Indicateur
                            </span>
                            <span className="text-[0.75rem] tracking-[0.15em] text-white uppercase font-sans">
                                Taux de satisfaction — 98%
                            </span>
                        </div>

                        {/* Stat 2 */}
                        <div className="flex flex-col gap-2">
                            <span className="text-[0.65rem] tracking-[0.25em] text-white/50 uppercase font-sans">
                                Rentabilité
                            </span>
                            <span className="text-[0.75rem] tracking-[0.15em] text-white uppercase font-sans">
                                Gain productivité — 50%
                            </span>
                        </div>

                        {/* Lieu */}
                        <div className="flex flex-col gap-2">
                            <span className="text-[0.65rem] tracking-[0.25em] text-white/50 uppercase font-sans">
                                Cadre
                            </span>
                            <span className="text-[0.75rem] tracking-[0.15em] text-white uppercase font-sans">
                                Scalset HQ — Opérations
                            </span>
                        </div>

                        {/* Méthode */}
                        <div className="flex flex-col gap-2">
                            <span className="text-[0.65rem] tracking-[0.25em] text-white/50 uppercase font-sans">
                                Approche
                            </span>
                            <span className="text-[0.75rem] tracking-[0.15em] text-white uppercase font-sans">
                                Recrutement & Supervision
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* CENTER COLUMN: Main Image (Lunchlab style) */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="w-[45%] flex justify-center items-center"
                >
                    <div className="relative w-full max-w-[480px] aspect-square lg:aspect-[4/5] p-3">
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#eaddc5]/60" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#eaddc5]/60" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#eaddc5]/60" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#eaddc5]/60" />
                        
                        {/* Image Container with Spotlight Effect */}
                        <div 
                            ref={containerRef}
                            onMouseMove={handleMouseMove}
                            className="relative w-full h-full overflow-hidden bg-[#050505] group"
                            style={{
                                '--mouse-x': '50%',
                                '--mouse-y': '50%'
                            } as React.CSSProperties}
                        >
                            {/* Layer 1: Base Dark Image */}
                            <Image
                                src="/talking.jpg"
                                alt="Équipe SCALSET en action"
                                fill
                                sizes="(min-width: 1024px) 35vw, 50vw"
                                className="object-cover opacity-20 grayscale transition-all duration-1000 ease-out group-hover:scale-105"
                            />

                            {/* Layer 2: Spotlight Reveal */}
                            <div 
                                className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                style={{
                                    maskImage: "radial-gradient(circle 200px at var(--mouse-x) var(--mouse-y), black 20%, transparent 100%)",
                                    WebkitMaskImage: "radial-gradient(circle 200px at var(--mouse-x) var(--mouse-y), black 20%, transparent 100%)",
                                }}
                            >
                                <Image
                                    src="/talking.jpg"
                                    alt="Équipe SCALSET en action (Highlight)"
                                    fill
                                    sizes="(min-width: 1024px) 35vw, 50vw"
                                    className="object-cover transition-all duration-1000 ease-out group-hover:scale-105"
                                    style={{ filter: "contrast(1.1) brightness(1.05)" }}
                                />
                            </div>

                            {/* Inner vignette always on top */}
                            <div className="absolute inset-0 z-20 shadow-[inset_0_0_80px_rgba(0,0,0,0.9)] pointer-events-none" />
                        </div>
                        
                        {/* Bottom Text inside image area */}
                        <div className="absolute -bottom-10 left-0 right-0 text-center">
                            <p className="text-[#eaddc5]/50 italic font-serif text-xs">
                                Scalset — L'excellence opérationnelle
                            </p>
                            <p className="text-white/30 text-[0.55rem] tracking-[0.3em] uppercase mt-3">
                                Découvrez nos talents
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* RIGHT COLUMN: Typography (Lunchlab style) */}
                <div className="w-[30%] flex flex-col justify-center text-left pl-8">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-4xl lg:text-5xl font-serif text-[#eaddc5] mb-10 leading-[1.1] tracking-wide"
                    >
                        Vous pouvez faire<br/>plus <span className="italic font-light">sans dépenser<br/>plus.</span>
                    </motion.h2>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-6"
                    >
                        <p className="text-[#eaddc5]/80 font-serif italic text-lg leading-relaxed max-w-[90%]">
                            Ce qui freine votre croissance aujourd'hui, ce n'est pas votre business, mais le coût de vos équipes.
                        </p>
                        <p className="text-[#eaddc5]/80 font-serif italic text-lg leading-relaxed max-w-[90%]">
                            Reprenez le contrôle de votre organisation et améliorez vos résultats en réduisant vos dépenses.
                        </p>

                        {/* Section indicator removed at user's request */}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
