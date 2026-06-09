"use client";

import { motion } from "framer-motion";
import SandButton from "./SandButton";

export default function HeroTextSection() {
    return (
        <section className="relative w-full min-h-[70vh] flex flex-col justify-center bg-[#030303] px-6 md:px-12 lg:px-24 py-24 overflow-hidden z-20">
            {/* Subtle top border/glow to separate from Hero smoothly */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent" />
            
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative z-10 flex flex-col items-start text-left max-w-xl xl:max-w-2xl"
            >
                <h2 style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 300,
                    fontSize: "clamp(2.5rem, 4.5vw, 4rem)",
                    lineHeight: 1.15,
                    color: "#eaddc5",
                    letterSpacing: "-0.03em",
                    filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.6))"
                }}>
                    Construisez<br/>
                    plus grand.<br />
                    <span style={{ fontWeight: 500, color: "#ffffff" }}>Exécutez plus<br/>vite.</span>
                </h2>

                <p style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 300,
                    fontSize: "clamp(1rem, 1.2vw, 1.15rem)",
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.6,
                    letterSpacing: "0.02em",
                }} className="mt-5 sm:mt-7">
                    Nous recrutons, formons et supervisons votre équipe dans nos locaux, tout en restant pilotée par vous.
                </p>

                <div className="mt-10 flex flex-col items-start gap-3">
                    <SandButton href="/contact">Nous Contacter</SandButton>
                    <p style={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.38em",
                        color: "rgba(255,255,255,0.28)",
                    }} className="uppercase ml-2">
                        Scalset exécute le reste
                    </p>
                </div>
            </motion.div>
            
            {/* Subtle background decoration (optional) */}
            <div className="absolute -left-[20%] top-1/2 -translate-y-1/2 w-[60%] aspect-square bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}
