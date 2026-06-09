"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Extersec() {
    return (
        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative w-full flex items-center justify-center overflow-hidden bg-[#020202]">
            
            {/* --- Premium Background Effects --- */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(40,40,35,0.15)_0%,_#020202_80%)]" />
            </div>

            <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
                <div className="absolute top-[30%] left-[10%] w-1.5 h-1.5 bg-[#b5b5b5] rounded-full blur-[3px]" />
                <div className="absolute bottom-[20%] right-[20%] w-1 h-1 bg-[#eaddc5] rounded-full blur-[2px]" />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 0.03, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute left-[30%] top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 select-none"
                style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "clamp(30rem, 60vw, 50rem)",
                    lineHeight: 0.8,
                    color: "#ffffff",
                }}
            >
                VI
            </motion.div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
                
                {/* Left Content */}
                <div className="flex flex-col items-start gap-10 order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="flex flex-col gap-6"
                    >
                        <p className="text-[#a3a3a3] uppercase tracking-[0.3em] text-xs font-light">
                            VOTRE ÉQUIPE
                        </p>
                        <h2 
                            className="font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] to-[#a3a3a3]"
                            style={{
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                                lineHeight: 1.1,
                            }}
                        >
                            Prêt à développer <br />
                            <em style={{ 
                                fontStyle: "italic",
                                background: "linear-gradient(180deg, #ffffff 0%, #eaddc5 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}>votre équipe ?</em>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                        className="flex flex-col gap-8"
                    >
                        <p className="text-[#888888] text-lg leading-relaxed font-light max-w-lg">
                            Nous mettons en place votre équipe pour vous aider à avancer plus vite et à moindre coût. Reprenez le contrôle de votre croissance.
                        </p>

                        <Link
                            href="/contact"
                            className="group/btn px-8 py-4 rounded-full flex items-center gap-4 w-full md:w-auto justify-center transition-all duration-500 border border-[#d4af37]/40 hover:border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:bg-[#d4af37]/10"
                        >
                            <span className="text-slate-200 font-light tracking-wide group-hover/btn:text-white transition-colors">
                                Nous contacter
                            </span>
                            <ArrowRight className="w-5 h-5 text-slate-400 group-hover/btn:text-[#b5b5b5] group-hover/btn:translate-x-1 transition-all duration-500" />
                        </Link>
                    </motion.div>
                </div>

                {/* Right Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[5/4] rounded-3xl overflow-hidden order-1 lg:order-2 border border-white/[0.05] group"
                >
                    <Image
                        src="/img.webp"
                        alt="Équipe SCALSET en action"
                        fill
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-cover grayscale-[30%] opacity-80 group-hover:scale-105 group-hover:grayscale-[10%] group-hover:opacity-100 transition-all duration-1000"
                    />
                    {/* Luxurious Dark Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/40 to-[#020202]/10 mix-blend-multiply pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#020202]/80 lg:to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-[#b5b5b5]/[0.02] mix-blend-overlay pointer-events-none" />
                </motion.div>

            </div>
        </section>
    );
}
