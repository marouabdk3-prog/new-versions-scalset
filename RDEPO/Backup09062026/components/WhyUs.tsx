"use client";

import { TrendingDown, Users, Settings, Zap, ShieldCheck, Globe } from "lucide-react";
import { motion } from "framer-motion";

// Passed standard sizes and colors to icons to control them via wrapper class
const features = [
    {
        icon: <TrendingDown size={32} strokeWidth={1} />,
        title: "Réduisez vos coûts sans perdre en performance",
        description: "Bénéficiez d’une équipe performante à un coût bien inférieur au marché local."
    },
    {
        icon: <Users size={32} strokeWidth={1} />,
        title: "Des équipes encadrées, pas des freelances isolés",
        description: "Vos équipes travaillent dans nos locaux, supervisées par nos managers au quotidien."
    },
    {
        icon: <Settings size={32} strokeWidth={1} />,
        title: "On s’occupe de tout, vous restez concentré",
        description: "Recrutement, formation et management : nous gérons l’ensemble pour vous."
    },
    {
        icon: <Zap size={32} strokeWidth={1} />,
        title: "Moins de coûts, plus de résultats",
        description: "Améliorez votre rentabilité tout en maintenant un haut niveau de performance."
    },
    {
        icon: <ShieldCheck size={32} strokeWidth={1} />,
        title: "Aucune contrainte RH ni charges administratives",
        description: "Aucune gestion RH, aucune cotisation, aucune contrainte administrative de votre côté."
    },
    {
        icon: <Globe size={32} strokeWidth={1} />,
        title: "Couverture multilingue",
        description: "Nous mettons en place des équipes capables d’intervenir en français, anglais et dans d’autres langues selon vos besoins."
    }
];

export default function WhyUs() {
    return (
        <section className="py-24 px-6 md:px-12 lg:px-20 relative z-10 w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#020202]">
            
            {/* --- Premium Background Effects --- */}
            {/* Smoky Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(40,40,35,0.15)_0%,_#020202_80%)]" />
            </div>

            {/* Subtle Luminous Dots */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
                <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-[#b5b5b5] rounded-full blur-[2px]" />
                <div className="absolute top-[60%] right-[20%] w-1.5 h-1.5 bg-[#eaddc5] rounded-full blur-[3px]" />
                <div className="absolute bottom-[10%] left-[30%] w-0.5 h-0.5 bg-white rounded-full blur-[1px]" />
            </div>

            {/* Giant Roman Numeral Background */}
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
                II
            </motion.div>

            {/* --- Main Content --- */}
            <div className="max-w-7xl mx-auto w-full relative z-10">
                
                {/* Elegant Editorial Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-center mb-24 lg:mb-32"
                >
                    <h2 
                        className="font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] to-[#a3a3a3]"
                        style={{
                            fontFamily: "var(--font-montserrat)",
                            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                            lineHeight: 1.1,
                        }}
                    >
                        Pourquoi les entreprises <br />
                        <em style={{ 
                            fontStyle: "italic",
                            background: "linear-gradient(180deg, #ffffff 0%, #eaddc5 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>choisissent ScalSet</em>
                    </h2>
                </motion.div>

                {/* Refined Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 lg:gap-y-20 max-[480px]:gap-y-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 1, ease: "easeOut", delay: index * 0.15 }}
                            className="group relative p-8 md:p-10 rounded-2xl transition-all duration-700 hover:bg-white/[0.02] border border-transparent hover:border-[#eaddc5]/30 overflow-hidden"
                        >
                            {/* Minimalist Icon without heavy box */}
                            <div className="mb-8 text-[#a3a3a3] group-hover:text-[#b5b5b5] transition-all duration-700 relative">
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 bg-[#b5b5b5] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700 rounded-full scale-150" />
                                <div className="relative z-10">
                                    {feature.icon}
                                </div>
                            </div>

                            {/* Elegant Typography for Text */}
                            <h3 
                                className="text-xl font-medium text-slate-200 mb-4 tracking-wide group-hover:text-white transition-colors duration-500"
                                style={{ fontFamily: "var(--font-montserrat)" }}
                            >
                                {feature.title}
                            </h3>
                            <p 
                                className="text-[#888888] text-[15px] leading-relaxed font-light group-hover:text-[#a3a3a3] transition-colors duration-500"
                            >
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
