"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const faqs = [
    {
        question: "Est-ce que c’est vraiment moins cher que recruter en interne ?",
        answer: "Oui. Vous bénéficiez d’une équipe performante à un coût bien inférieur au marché local, tout en maintenant un haut niveau d'exigence.",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2036&auto=format&fit=crop"
    },
    {
        question: "Est-ce que je garde le contrôle sur mon équipe ?",
        answer: "Absolument. Votre équipe travaille depuis nos locaux, encadrée et supervisée, mais reste entièrement pilotée par vous au quotidien via vos outils habituels.",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
    },
    {
        question: "Est-ce que vous gérez tout le recrutement et le management ?",
        answer: "Oui. Nous recrutons, formons et encadrons les profils pour vous. Vous n’avez aucune gestion opérationnelle ou administrative à faire.",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop"
    },
    {
        question: "Est-ce que ce sont des freelances ?",
        answer: "Non. Ce sont des collaborateurs dédiés qui travaillent physiquement dans nos locaux, encadrés, supervisés et sous contrat de travail garantissant stabilité et confidentialité.",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
    },
    {
        question: "Est-ce que je dois gérer des charges ou des contraintes RH ?",
        answer: "Non. Vous travaillez en simple prestation de service B2B. Sans aucune gestion RH locale, sans cotisations patronales ni contraintes administratives liées au droit du travail.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
    },
    {
        question: "Est-ce que ça peut s’adapter à mon activité ?",
        answer: "Oui. Si une tâche peut être réalisée derrière un ordinateur, nous pouvons mettre en place les profils parfaitement adaptés aux spécificités de votre métier.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
    }
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState<number>(0);

    return (
        <section className="py-24 md:py-32 relative w-full overflow-hidden bg-[#020202]">
            
            {/* --- Premium Background Effects --- */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(40,40,35,0.15)_0%,_#020202_80%)]" />
            </div>

            <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
                <div className="absolute top-[20%] right-[30%] w-1.5 h-1.5 bg-[#d4af37] rounded-full blur-[3px]" />
                <div className="absolute bottom-[30%] left-[10%] w-1 h-1 bg-[#eaddc5] rounded-full blur-[2px]" />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 0.03, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute right-[10%] top-1/2 -translate-y-1/2 pointer-events-none z-0 select-none"
                style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "clamp(30rem, 60vw, 50rem)",
                    lineHeight: 0.8,
                    color: "#ffffff",
                }}
            >
                VII
            </motion.div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-center mb-20 md:mb-24"
                >
                    <p className="text-[#d4af37] uppercase tracking-[0.3em] text-xs font-bold mb-6">
                        FAQ
                    </p>
                    <h2 
                        className="font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] to-[#a3a3a3]"
                        style={{
                            fontFamily: "var(--font-montserrat)",
                            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                            lineHeight: 1.1,
                        }}
                    >
                        Questions <em style={{ 
                            fontStyle: "italic",
                            background: "linear-gradient(180deg, #ffffff 0%, #eaddc5 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>fréquentes</em>
                    </h2>
                </motion.div>

                {/* Dynamic Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
                    
                    {/* Left: FAQ Accordion */}
                    <div className="flex flex-col gap-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className={`overflow-hidden transition-all duration-500 rounded-2xl ${isOpen ? 'bg-[rgba(10,10,10,0.6)] backdrop-blur-[20px] border border-[rgba(212,175,55,0.15)] shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(212,175,55,0.1)] px-6 py-2' : 'border border-white/5 hover:border-[rgba(212,175,55,0.2)] px-6 py-2 bg-transparent'}`}
                                >
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                        className="w-full text-left py-4 flex items-center justify-between focus:outline-none transition-all duration-500"
                                    >
                                        <span 
                                            className="text-lg md:text-xl font-light tracking-wide transition-colors duration-500 pr-8"
                                            style={{ 
                                                fontFamily: "var(--font-montserrat)",
                                                color: isOpen ? "#eaddc5" : "#a3a3a3"
                                            }}
                                        >
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 transition-all duration-500 shrink-0 ${isOpen ? "rotate-180 text-[#eaddc5]" : "text-[#444444] group-hover:text-[#a3a3a3]"}`}
                                            strokeWidth={1.5}
                                        />
                                    </button>

                                    <div
                                        className={`transition-all duration-500 ease-in-out ${isOpen ? "max-h-64 opacity-100 pb-6" : "max-h-0 opacity-0 pb-0"}`}
                                    >
                                        <p className="text-[rgba(255,255,255,0.6)] text-[15px] leading-relaxed font-sans mt-2">
                                            {faq.answer}
                                        </p>
                                        
                                        {/* Mobile Photo (Visible only on mobile/tablet) */}
                                        <div className={`lg:hidden w-full h-48 mt-6 rounded-2xl overflow-hidden relative border border-white/[0.05] transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}>
                                            <Image
                                                src={faq.image}
                                                alt="FAQ Illustration"
                                                fill
                                                className="object-cover grayscale-[30%] opacity-80"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/40 to-transparent" />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right: Dynamic Sticky Photo */}
                    <div className="hidden lg:block sticky top-32 h-[550px] w-full rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(212,175,55,0.15)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={openIndex}
                                initial={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
                                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                                exit={{ opacity: 0, filter: "blur(10px)" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <Image
                                    src={openIndex !== -1 ? faqs[openIndex].image : faqs[0].image}
                                    alt="FAQ Illustration"
                                    fill
                                    className="object-cover grayscale-[60%] opacity-60 mix-blend-overlay"
                                />
                                {/* Luxurious Dark Overlay */}
                                <div className="absolute inset-0 bg-[#0d0d0d]/40 mix-blend-multiply" />
                                <div className="absolute inset-0 bg-[#d4af37]/[0.05] mix-blend-overlay" />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
