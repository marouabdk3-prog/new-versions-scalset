"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp, Rocket, Headset, Briefcase } from "lucide-react";

const services = [
    { icon: <TrendingUp size={24} strokeWidth={1.5} />, title: "Vente & opérations" },
    { icon: <Rocket size={24} strokeWidth={1.5} />, title: "Marketing & croissance" },
    { icon: <Headset size={24} strokeWidth={1.5} />, title: "Support client" },
    { icon: <Briefcase size={24} strokeWidth={1.5} />, title: "Administratif & organisation" }
];

export default function ServicesOverview() {
    return (
        <section className="py-32 px-6 md:px-12 lg:px-20 relative z-10 border-t border-white/5 max-[768px]:py-24 max-[480px]:py-16 max-[480px]:px-4">
            <div className="max-w-7xl mx-auto flex flex-col gap-16">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-4 max-w-2xl"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-[1.1] max-[768px]:text-4xl max-[480px]:text-[1.75rem] max-[480px]:leading-snug">
                            Les équipes que nous <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E2E8F0] to-[#94A3B8] italic pr-2">mettons en place pour vous.</span>
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed max-[768px]:text-base max-[480px]:text-sm">
                            Des équipes directement à votre disposition, pilotées par vous via WhatsApp, email ou vos outils.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="shrink-0"
                    >
                        <Link href="/services" className="group hidden md:inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-colors">
                            Voir tous nos services
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-[480px]:gap-3">
                    {services.map((service, i) => (
                        <Link href="/services" key={i}>
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                className="glass-panel group p-5 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden"
                            >
                                {/* Diagonal hover light sweep */}
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1s_forwards] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E1E28] to-[#0D0D14] border border-white/5 shadow-inner flex items-center justify-center text-slate-300 group-hover:text-white group-hover:scale-110 transition-all duration-300 shrink-0 z-10">
                                    {service.icon}
                                </div>
                                <h3 className="text-[1.05rem] font-semibold text-slate-200 group-hover:text-white transition-colors tracking-tight flex-1 z-10">
                                    {service.title}
                                </h3>
                                <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-[#E2E8F0] group-hover:-rotate-45 transition-all duration-300 z-10 shrink-0" />
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Personalized Team Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative rounded-3xl bg-[#0d0d14] border border-white/5 p-8 md:p-12 overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.3)] mt-8 max-[768px]:p-8 max-[480px]:p-6 max-[480px]:mt-4"
                >
                    {/* Subtle glow in background */}
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-slate-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-slate-400/10 transition-colors duration-700" />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
                        <div className="flex flex-col gap-3 text-center md:text-left">
                            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight italic max-[768px]:text-2xl max-[480px]:text-xl">
                                Besoin d’une équipe personnalisée ?
                            </h3>
                            <p className="text-slate-400 text-lg max-w-xl max-[768px]:text-base max-[480px]:text-sm">
                                Nous mettons en place des profils sur mesure selon vos besoins.
                            </p>
                        </div>

                        <motion.a
                            href="/contact"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="btn-shiny px-10 py-5 text-base rounded-2xl flex items-center gap-3 w-full md:w-auto justify-center max-[480px]:py-3 max-[480px]:px-6 max-[480px]:text-sm"
                        >
                            En discuter sur WhatsApp
                            <ArrowRight className="w-5 h-5 group-hover:text-[#E2E8F0] group-hover:-rotate-45 transition-all duration-300" />
                        </motion.a>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
