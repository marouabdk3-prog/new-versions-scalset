"use client";

import { Building2, Rocket, ShoppingCart, Briefcase, Lightbulb, FileText } from "lucide-react";
import { motion } from "framer-motion";

const targets = [
    {
        title: "Grandes entreprises",
        description: "Nous pouvons structurer une organisation complète sans limite de personnel pour gérer toute votre exécution à grande échelle.",
        icon: Building2,
    },
    {
        title: "E-commerce",
        description: "Pour soutenir vos ventes, votre support client et votre gestion opérationnelle.",
        icon: ShoppingCart,
    },
    {
        title: "Agences",
        description: "Pour exécuter davantage et mieux servir vos clients.",
        icon: Briefcase,
    },
    {
        title: "Startups",
        description: "Pour construire une équipe adaptée à votre croissance.",
        icon: Rocket,
    },
    {
        title: "Entrepreneurs",
        description: "Pour vous libérer de l’opérationnel et vous concentrer sur le développement.",
        icon: Lightbulb,
    },
    {
        title: "Cabinets & services",
        description: "Pour gagner en organisation et en qualité d’exécution.",
        icon: FileText,
    },
];

// Duplicate for seamless scroll
const scrollingTargets = [...targets, ...targets, ...targets];

export default function TargetAudience() {
    return (
        <section className="py-24 md:py-32 relative w-full flex items-center justify-center overflow-hidden bg-[#020202]">
            
            {/* --- Premium Background Effects --- */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(40,40,35,0.15)_0%,_#020202_80%)]" />
            </div>

            <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
                <div className="absolute top-[20%] left-[20%] w-1 h-1 bg-[#b5b5b5] rounded-full blur-[2px]" />
                <div className="absolute bottom-[30%] right-[15%] w-1.5 h-1.5 bg-[#eaddc5] rounded-full blur-[3px]" />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 0.03, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 select-none"
                style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(30rem, 60vw, 50rem)",
                    lineHeight: 0.8,
                    color: "#ffffff",
                }}
            >
                IV
            </motion.div>

            <div className="flex flex-col items-center gap-16 md:gap-24 w-full relative z-10">
                {/* Elegant Editorial Titles */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-center"
                >
                    <p className="text-[#a3a3a3] uppercase tracking-[0.3em] text-xs font-light mb-6">
                        SCALSET
                    </p>
                    <h2 
                        className="font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] to-[#a3a3a3]"
                        style={{
                            fontFamily: "var(--font-cormorant)",
                            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                            lineHeight: 1.1,
                        }}
                    >
                        Who <em style={{ 
                            fontStyle: "italic",
                            background: "linear-gradient(180deg, #ffffff 0%, #eaddc5 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>needs us</em>
                    </h2>
                </motion.div>

                {/* Marquee Container (Movement kept exactly the same) */}
                <div className="relative w-full overflow-hidden">
                    {/* Edge Fades for smooth entry/exit of cards */}
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none" />

                    {/* Scrolling Content */}
                    <div className="flex gap-6 w-max px-6 animate-marquee-ltr">
                        {scrollingTargets.map((target, i) => {
                            const Icon = target.icon;
                            return (
                                <div
                                    key={`${target.title}-${i}`}
                                    className="w-[85vw] max-w-[300px] md:w-[350px] md:max-w-none rounded-2xl p-8 flex flex-col items-center text-center gap-6 cursor-default group transition-all duration-700 hover:bg-white/[0.02] border border-transparent hover:border-[#eaddc5]/30"
                                >
                                    <div className="text-[#a3a3a3] group-hover:text-[#b5b5b5] transition-all duration-700 relative shrink-0">
                                        <div className="absolute inset-0 bg-[#b5b5b5] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700 rounded-full scale-150" />
                                        <div className="relative z-10">
                                            <Icon size={32} strokeWidth={1} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 
                                            className="text-xl font-medium text-slate-200 mb-3 tracking-wide group-hover:text-white transition-colors duration-500"
                                            style={{ fontFamily: "var(--font-cormorant)" }}
                                        >
                                            {target.title}
                                        </h3>
                                        <p className="text-[#888888] text-[15px] leading-relaxed font-light group-hover:text-[#a3a3a3] transition-colors duration-500">
                                            {target.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
