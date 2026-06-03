"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
};

const fadeLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
};

const fadeRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
};

const VIEWPORT = { once: true, amount: 0.2, margin: "0px 0px -80px 0px" };

const stats = [
    { value: "98%", label: "Taux de satisfaction" },
    { value: "50%", label: "Gain en productivité" },
];

export default function Outsoursection() {
    return (
        <section
            id="outsourcing"
            className="relative py-20 px-6 md:px-12 lg:px-20"
        >

            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.4fr_1fr] gap-6 items-start">

                {/* LEFT COLUMN: tall image + stats */}
                <div className="flex flex-col gap-6">
                    <motion.div
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                        variants={fadeLeft}
                        className="hidden lg:block relative w-full aspect-[3/4] rounded-2xl overflow-hidden ring-1 ring-white/10"
                    >
                        <Image
                            src="/talking.jpg"
                            alt="Équipe SCALSET en action"
                            fill
                            sizes="(min-width: 1024px) 25vw, 0px"
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Stat cards */}
                    <div className="grid grid-cols-2 gap-6">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                custom={i + 1}
                                initial="hidden"
                                whileInView="visible"
                                viewport={VIEWPORT}
                                variants={fadeLeft}
                                className="relative flex flex-col gap-1 p-4 rounded-2xl btn-shiny overflow-hidden"
                            >
                                {/* bottom silver glow on card */}
                                <div className="absolute bottom-0 left-0 right-0 h-1/2" />
                                <span className="text-3xl font-semibold text-slate-100 tracking-tight">
                                    {stat.value}
                                </span>
                                <span className="text-xs text-slate-400 leading-snug">
                                    {stat.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CENTRE COLUMN: heading, text, button, landscape image */}
                <div className="flex flex-col gap-6 pt-4">
                    <motion.h2
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                        variants={fadeUp}
                        className="text-3xl lg:text-4xl font-semibold leading-tight py-1"
                    >
                        <span className="text-slate-100">Vous pouvez faire plus</span>{" "}
                        <span className="text-slate-300">sans dépenser plus</span>
                    </motion.h2>

                    <motion.p
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                        variants={fadeUp}
                        className="text-slate-400 text-base font-bold leading-relaxed max-w-md"
                    >
                        Ce qui freine votre croissance aujourd&apos;hui, ce n&apos;est pas votre business, mais le coût de vos
                        équipes. Reprenez le contrôle de votre organisation et améliorez vos résultats en réduisant vos
                        dépenses.
                    </motion.p>

                    <motion.div
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                        variants={fadeUp}
                    >
                        <motion.a
                            href="/contact"
                            whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(226,232,240,0.15)" }}
                            whileTap={{ scale: 0.97 }}
                            className="btn-shiny transition-all text-lg"
                        >
                            Nous contacter
                        </motion.a>
                    </motion.div>

                    <motion.div
                        custom={3}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                        variants={fadeUp}
                        className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden ring-1 ring-white/10"
                    >
                        <Image
                            src="/offices.png"
                            alt="Équipe en collaboration"
                            fill
                            sizes="(min-width: 1024px) 35vw, 100vw"
                            className="object-cover"
                        />
                    </motion.div>
                </div>

                {/* RIGHT COLUMN: tall image */}
                <motion.div
                    custom={0}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT}
                    variants={fadeRight}
                    className="hidden lg:block relative w-full aspect-[3/4] rounded-2xl overflow-hidden ring-1 ring-white/10 lg:mt-24"
                >
                    <Image
                        src="/hero-img3.png"
                        alt="Professionnels SCALSET"
                        fill
                        sizes="(min-width: 1024px) 25vw, 0px"
                        className="object-cover"
                    />
                </motion.div>
            </div>
        </section>
    );
}
