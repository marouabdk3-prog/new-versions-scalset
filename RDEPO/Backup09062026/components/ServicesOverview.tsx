"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp, Rocket, Headset, Briefcase } from "lucide-react";
import React from "react";

const services = [
    { icon: <TrendingUp size={24} strokeWidth={1} />, title: "Vente & opérations" },
    { icon: <Rocket size={24} strokeWidth={1} />, title: "Marketing & croissance" },
    { icon: <Headset size={24} strokeWidth={1} />, title: "Support client" },
    { icon: <Briefcase size={24} strokeWidth={1} />, title: "Administratif & organisation" }
];

export default function ServicesOverview() {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    return (
        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative z-10 w-full flex items-center justify-center overflow-hidden bg-[#020202]">
            
            {/* --- Premium Background Effects --- */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(40,40,35,0.15)_0%,_#020202_80%)]" />
            </div>

            <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
                <div className="absolute top-[30%] right-[15%] w-1 h-1 bg-[#d4af37] rounded-full blur-[2px]" />
                <div className="absolute bottom-[20%] left-[20%] w-1.5 h-1.5 bg-[#eaddc5] rounded-full blur-[3px]" />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 0.03, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 select-none"
                style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "clamp(30rem, 60vw, 50rem)",
                    lineHeight: 0.8,
                    color: "#ffffff",
                }}
            >
                III
            </motion.div>

            {/* --- Main Content --- */}
            <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-16 lg:gap-24">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="flex flex-col gap-6 max-w-2xl"
                    >
                        <h2 
                            className="font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] to-[#a3a3a3]"
                            style={{
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                                lineHeight: 1.1,
                            }}
                        >
                            Les équipes que nous <br />
                            <em style={{ 
                                fontStyle: "italic",
                                background: "linear-gradient(180deg, #ffffff 0%, #eaddc5 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}>mettons en place pour vous.</em>
                        </h2>
                        <p className="text-[rgba(255,255,255,0.6)] text-[15px] leading-relaxed font-sans mt-2">
                            Des équipes directement à votre disposition, pilotées par vous via WhatsApp, email ou vos outils.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                        className="shrink-0"
                    >
                        <Link href="/services" className="group hidden md:inline-flex items-center gap-3 text-[#d4af37] hover:text-[#eaddc5] transition-colors duration-500 font-light tracking-wide">
                            Voir tous nos services
                            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: "1000px" }}>
                    {services.map((service, i) => (
                        <Link href="/services" key={i} className="block" style={{ perspective: "1000px" }}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 1, ease: "easeOut", delay: i * 0.15 }}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                className="group p-6 rounded-2xl flex items-center gap-5 transition-all duration-300 bg-[rgba(10,10,10,0.6)] backdrop-blur-[20px] border border-[rgba(212,175,55,0.15)] shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(212,175,55,0.1)] hover:border-[rgba(212,175,55,0.4)]"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <div className="text-[#d4af37] group-hover:text-[#eaddc5] transition-colors duration-700 relative shrink-0">
                                    <div className="absolute inset-0 bg-[#d4af37] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700 rounded-full scale-150" />
                                    <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
                                        {service.icon}
                                    </div>
                                </div>
                                <h3 
                                    className="text-lg font-bold text-[#f4f4f4] group-hover:text-white transition-colors duration-500 tracking-wide flex-1"
                                    style={{ fontFamily: "var(--font-montserrat)", transform: "translateZ(20px)" }}
                                >
                                    {service.title}
                                </h3>
                                <ArrowRight className="w-5 h-5 text-[#d4af37] opacity-0 group-hover:opacity-100 transition-all duration-500 shrink-0" style={{ transform: "translateZ(20px)" }} />
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Personalized Team Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                    className="relative rounded-2xl border border-[rgba(212,175,55,0.15)] p-10 md:p-14 overflow-hidden group hover:border-[rgba(212,175,55,0.4)] hover:bg-[#d4af37]/[0.02] bg-[rgba(10,10,10,0.6)] backdrop-blur-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-700 mt-8"
                >
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#d4af37] opacity-0 group-hover:opacity-[0.05] rounded-full blur-[100px] pointer-events-none transition-opacity duration-1000" />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
                        <div className="flex flex-col gap-4 text-center md:text-left">
                            <h3 
                                className="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] to-[#a3a3a3]"
                                style={{ fontFamily: "var(--font-montserrat)" }}
                            >
                                Besoin d’une équipe <em style={{ 
                                    fontStyle: "italic",
                                    background: "linear-gradient(180deg, #ffffff 0%, #eaddc5 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent"
                                }}>personnalisée ?</em>
                            </h3>
                            <p className="text-[rgba(255,255,255,0.6)] text-[15px] font-sans max-w-xl">
                                Nous mettons en place des profils sur mesure selon vos besoins.
                            </p>
                        </div>

                        <Link
                            href="/contact"
                            className="btn-shiny px-8 py-4 rounded-full flex items-center gap-3 w-full md:w-auto justify-center transition-all duration-500"
                        >
                            <span className="text-slate-200 font-bold tracking-wide group-hover/btn:text-white transition-colors relative z-10" style={{ fontFamily: "var(--font-sans)" }}>
                                En discuter sur WhatsApp
                            </span>
                            <ArrowRight className="w-5 h-5 text-white transition-colors relative z-10" />
                        </Link>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
