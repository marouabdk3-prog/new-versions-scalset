"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Search, Users, GraduationCap, Rocket } from "lucide-react";
import Image from "next/image";

const steps = [
    {
        number: "01",
        title: "Analyse de votre besoin",
        description: "Définition précise de vos attentes et des compétences requises. Nous étudions votre organisation en profondeur.",
        icon: Search,
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    },
    {
        number: "02",
        title: "Recrutement sur-mesure",
        description: "Sélection rigoureuse des meilleurs talents. Nous trions, testons et validons les profils parfaitement adaptés à votre ADN.",
        icon: Users,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    },
    {
        number: "03",
        title: "Formation & encadrement",
        description: "Vos équipes intègrent nos locaux premium. Nous gérons la formation continue, le matériel et le management de proximité.",
        icon: GraduationCap,
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
    },
    {
        number: "04",
        title: "Pilotage & accélération",
        description: "Lancement opérationnel immédiat. Vous pilotez votre nouvelle équipe directement via vos outils habituels.",
        icon: Rocket,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    },
];

export default function HowItWorks() {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <section className="py-24 md:py-32 relative w-full overflow-hidden bg-[#020202]">
            
            {/* --- Premium Background Effects --- */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(40,40,35,0.15)_0%,_#020202_80%)]" />
            </div>

            <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
                <div className="absolute top-[40%] right-[10%] w-1 h-1 bg-[#b5b5b5] rounded-full blur-[2px]" />
                <div className="absolute bottom-[20%] left-[10%] w-1.5 h-1.5 bg-[#eaddc5] rounded-full blur-[3px]" />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 0.03, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 select-none"
                style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(30rem, 60vw, 50rem)",
                    lineHeight: 0.8,
                    color: "#ffffff",
                }}
            >
                V
            </motion.div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-center mb-20 md:mb-32"
                >
                    <p className="text-[#a3a3a3] uppercase tracking-[0.3em] text-xs font-light mb-6">
                        PROCESSUS
                    </p>
                    <h2 
                        className="font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] to-[#a3a3a3]"
                        style={{
                            fontFamily: "var(--font-cormorant)",
                            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                            lineHeight: 1.1,
                        }}
                    >
                        Comment <em style={{ 
                            fontStyle: "italic",
                            background: "linear-gradient(180deg, #ffffff 0%, #eaddc5 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>ça fonctionne</em>
                    </h2>
                </motion.div>

                {/* Dynamic Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start relative">
                    
                    {/* Left: Sticky Dynamic Photo */}
                    <div className="hidden lg:block sticky top-32 h-[600px] w-full rounded-2xl overflow-hidden border border-white/[0.05]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <Image
                                    src={steps[activeStep].image}
                                    alt={steps[activeStep].title}
                                    fill
                                    className="object-cover grayscale-[30%] opacity-80"
                                />
                                {/* Luxurious Dark Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/40 to-[#020202]/10 mix-blend-multiply" />
                                <div className="absolute inset-0 bg-[#b5b5b5]/[0.03] mix-blend-overlay" />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right: Scrolling Steps List */}
                    <div className="flex flex-col gap-12 lg:gap-32 py-10 lg:py-48">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = activeStep === index;
                            
                            return (
                                <motion.div
                                    key={index}
                                    onViewportEnter={() => setActiveStep(index)}
                                    viewport={{ margin: "-40% 0px -40% 0px" }}
                                    className="relative flex gap-8 md:gap-12 group cursor-default"
                                >
                                    {/* Number / Line Indicator */}
                                    <div className="flex flex-col items-center shrink-0">
                                        <span 
                                            className="text-2xl md:text-3xl font-light transition-colors duration-700"
                                            style={{ 
                                                fontFamily: "var(--font-cormorant)",
                                                color: isActive ? "#b5b5b5" : "#333333" 
                                            }}
                                        >
                                            {step.number}
                                        </span>
                                        {/* Vertical line connecting steps (hidden on last step) */}
                                        {index !== steps.length - 1 && (
                                            <div className="w-px h-full mt-6 bg-gradient-to-b from-white/10 to-transparent lg:hidden" />
                                        )}
                                    </div>

                                    {/* Step Content */}
                                    <div className="flex flex-col gap-5 pb-12 lg:pb-0">
                                        <div className="flex items-center gap-4">
                                            <div 
                                                className="transition-colors duration-700"
                                                style={{ color: isActive ? "#b5b5b5" : "#333333" }}
                                            >
                                                <Icon size={28} strokeWidth={1} />
                                            </div>
                                            <h3 
                                                className="text-2xl md:text-3xl font-medium tracking-wide transition-colors duration-700"
                                                style={{ 
                                                    fontFamily: "var(--font-cormorant)",
                                                    color: isActive ? "#ffffff" : "#666666"
                                                }}
                                            >
                                                {step.title}
                                            </h3>
                                        </div>
                                        <p 
                                            className="text-[15px] leading-relaxed transition-colors duration-700 max-w-md"
                                            style={{ 
                                                color: isActive ? "#a3a3a3" : "#444444" 
                                            }}
                                        >
                                            {step.description}
                                        </p>

                                        {/* Mobile Photo (Visible only on mobile/tablet) */}
                                        <div className="lg:hidden w-full h-64 mt-6 rounded-2xl overflow-hidden relative border border-white/[0.05]">
                                            <Image
                                                src={step.image}
                                                alt={step.title}
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

                </div>
            </div>
        </section>
    );
}
