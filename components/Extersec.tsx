"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Extersec() {
    return (
        <section className="py-24 px-6 md:px-12 lg:px-20 max-[768px]:py-20 max-[480px]:py-16 max-[480px]:px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-[768px]:gap-10 max-[480px]:gap-8">
                <div className="flex flex-col items-start gap-8 order-2 lg:order-1">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#F8FAFC] to-[#94A3B8] leading-[1.2] text-left py-1 max-[768px]:text-4xl max-[480px]:text-[1.75rem] max-[480px]:leading-snug"
                    >
                        Prêt à développer <br />
                        <span className="text-[#F8FAFC]">votre équipe ?</span>
                    </motion.h2>

                    <div className="flex flex-col gap-6">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                            className="text-slate-400 leading-relaxed text-lg max-w-xl italic pr-2 max-[768px]:text-base max-[480px]:text-sm"
                        >
                            Nous mettons en place votre équipe pour vous aider à avancer plus vite et à moindre coût.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="max-[480px]:w-full"
                    >
                        <Link href="/contact" className="btn-shiny text-xl px-12 max-[480px]:text-base max-[480px]:px-8 max-[480px]:py-3 max-[480px]:w-full max-[480px]:flex max-[480px]:justify-center">
                            Nous contacter
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[5/4] rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl order-1 lg:order-2"
                >
                    <Image
                        src="/img.webp"
                        alt="Équipe SCALSET en action"
                        fill
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090911]/40 to-transparent pointer-events-none" />
                </motion.div>
            </div>
        </section>
    );
}
