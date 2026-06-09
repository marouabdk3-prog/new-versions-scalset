"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { User } from "lucide-react";

const roles = [
    {
        title: "Closer",
        description: "Vente & Conseil",
        image: "/hero-img1.png",
        details: "Expert en conclusion de ventes et accompagnement stratégique client."
    },
    {
        title: "Setter",
        description: "Qualification",
        image: "/hero-img3.png",
        details: "Spécialiste de la qualification de leads et prise de rendez-vous qualifiés."
    },
    {
        title: "Copywriter",
        description: "Rédaction",
        image: "/hero-img2.png",
        details: "Créateur de contenus persuasifs et narratifs pour votre SEO et conversions."
    },
    {
        title: "Com Manager",
        description: "Réseaux Sociaux",
        image: "/img.webp",
        details: "Gestionnaire de votre image sociale et interaction communautaire active."
    },
    {
        title: "Designer",
        description: "Création",
        image: "/hero-img1.png",
        details: "Concepteur visuel d'interfaces modernes et d'identités de marque fortes."
    },
    {
        title: "Assistant(e)",
        description: "Support",
        image: "/hero-img3.png",
        details: "Assistance opérationnelle et support client pour une fluidité totale."
    }
];

export default function OrganizationChart() {
    return (
        <section className="py-24 relative w-full flex flex-col items-center">
            {/* Ambient Background Grid/Particles effect can go here if needed, keeping it simple for now matching the dark aesthetic */}

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 z-10"
            >
                <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold tracking-tight text-white py-2">
                    Une organisation pensée <span className="text-transparent bg-clip-text bg-linear-to-r from-slate-400 to-slate-200">pour performer</span>
                </h2>
            </motion.div>

            <div className="relative w-full max-w-[95vw] mx-auto flex flex-col items-center z-10 px-2">

                {/* Top Level: Client & ScalSET (using custom connecting lines) */}
                <div className="flex flex-col items-center relative mb-[80px]">

                    {/* Left/Right Horizontal Line connecting to ScalSET box */}
                    <div className="absolute top-[80px] left-[-200px] right-[-200px] h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent hidden md:block overflow-hidden">
                        <motion.div
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-y-0 w-48 bg-linear-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                        />
                    </div>



                    {/* Client Node */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center justify-center w-32 h-24 rounded-2xl border border-white/20 bg-[#0d0d14] backdrop-blur-sm z-10 mb-8 shadow-[0_0_30px_rgba(6,182,212,0.1)]"
                    >
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mb-2 border border-slate-600">
                            <User size={20} className="text-slate-200" />
                        </div>
                        <span className="text-sm font-bold tracking-widest text-slate-100 uppercase">Client</span>
                    </motion.div>

                    {/* Vertical connecting line */}
                    <div className="w-px h-8 bg-linear-to-b from-cyan-500/50 to-cyan-500/80 absolute top-[96px] overflow-hidden">
                        <motion.div
                            animate={{ y: ['-100%', '100%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-x-0 h-8 bg-linear-to-b from-transparent via-cyan-300 to-transparent shadow-[0_0_10px_#22d3ee]"
                        />
                    </div>


                    {/* ScalSET Node */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center justify-center px-12 py-5 rounded-xl border border-cyan-500/30 bg-[#11111B] z-10 shadow-[0_0_40px_rgba(6,182,212,0.25)] relative"
                    >
                        <h3 className="text-3xl font-black text-white tracking-tight">SCALSET</h3>
                        {/* Glow points left/right */}
                        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full blur-[2px] shadow-[0_0_15px_#22d3ee]"></div>
                        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full blur-[2px] shadow-[0_0_15px_#22d3ee]"></div>
                    </motion.div>

                    {/* Vertical connecting line down to Manager */}
                    <div className="w-px h-[60px] bg-linear-to-b from-cyan-500 to-cyan-500/30 absolute bottom-[-60px] z-0 overflow-hidden">
                        <motion.div
                            animate={{ y: ['-100%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-x-0 h-12 bg-linear-to-b from-transparent via-cyan-300 to-transparent shadow-[0_0_12px_#22d3ee]"
                        />
                    </div>
                </div>

                {/* Manager Level */}
                <div className="flex flex-col items-center relative mb-12 z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="relative"
                    >
                        {/* Manager Avatar Circular Crop positioned overlapping top */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-2 border-cyan-500 flex items-center justify-center z-20 bg-[#0d0d14] shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:scale-110 transition-transform duration-500">
                            <User size={32} className="text-cyan-400" />
                        </div>

                        {/* Manager Label */}
                        <div className="px-8 pt-8 pb-3 rounded-xl border border-white/10 bg-[#0d0d14]/90 backdrop-blur-md relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                            <span className="text-white font-bold">Manager SCALSET</span>
                        </div>
                    </motion.div>
                </div>


                {/* Bottom Roles Grid Level */}
                <div className="relative w-full mt-[60px]">
                    {/* The complex connecting lines structure for the bottom grid (DESKTOP ONLY) */}
                    <div className="absolute -top-[60px] left-0 right-0 h-[60px] pointer-events-none z-0 hidden lg:block">
                        {/* Main horizontal spine */}
                        <div className="absolute top-0 left-[8%] right-[8%] h-px bg-cyan-500/60 overflow-hidden">
                            <motion.div
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-y-0 w-72 bg-linear-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee]/40"
                            />
                        </div>
                        {/* Center vertical drop from manager */}
                        <div className="absolute bottom-[60px] left-1/2 w-px h-[60px] bg-cyan-500/60 overflow-hidden">
                            <motion.div
                                animate={{ y: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-x-0 h-16 bg-linear-to-b from-transparent via-cyan-300 to-transparent shadow-[0_0_12px_#22d3ee]"
                            />
                        </div>

                        {/* Individual vertical drops to each card */}
                        {roles.map((_, i) => {
                            // Assuming 6 columns evenly spaced
                            const leftPos = `${(100 / 6) * i + (100 / 12)}%`;
                            return (
                                <div key={`line-${i}`} className="absolute top-0 w-px h-[60px] bg-linear-to-b from-cyan-500/60 to-transparent overflow-hidden" style={{ left: leftPos }}>
                                    <motion.div
                                        animate={{ y: ['-100%', '100%'] }}
                                        transition={{ duration: 1.5 + (i * 0.2), repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-x-0 h-10 bg-linear-to-b from-transparent via-cyan-300 to-transparent shadow-[0_0_10px_#22d3ee]"
                                    />
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400/80"></div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Simple vertical connection for MOBILE/TABLET - Extended to bridge gap and create a continuous backbone */}
                    <div className="absolute -top-[108px] bottom-0 left-1/2 -translate-x-1/2 w-px bg-linear-to-b from-cyan-500/60 via-cyan-500/40 to-transparent pointer-events-none z-0 lg:hidden overflow-hidden">
                        <motion.div
                            animate={{ y: ['-10%', '110%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-x-0 h-32 bg-linear-to-b from-transparent via-cyan-300 to-transparent shadow-[0_0_12px_#22d3ee]"
                        />
                    </div>


                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                    >
                        {roles.map((role, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                                }}
                                className="flex flex-col rounded-[1.25rem] bg-[#0d0d14] border border-white/10 overflow-hidden group hover:border-cyan-500/50 transition-all duration-500 h-[320px] relative"
                            >
                                <div className="relative flex-1 w-full overflow-hidden">
                                    <Image
                                        src={role.image}
                                        alt={role.title}
                                        fill
                                        sizes="(min-width: 1024px) 15vw, (min-width: 640px) 50vw, 100vw"
                                        className="object-cover object-center filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                    />
                                    {/* Gradient overlay to blend image into text box */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-[#0d0d14] to-transparent z-10" />

                                    {/* Hover Description Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 top-0 bg-[#0d0d14]/80 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                        <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4 border border-cyan-500/50">
                                            <User size={22} className="text-cyan-400" />
                                        </div>
                                        <p className="text-white text-sm leading-relaxed translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            {role.details}
                                        </p>
                                    </div>
                                </div>

                                <div className="px-3 py-4 flex flex-col items-center justify-center text-center relative z-30 bg-[#0d0d14] h-[88px] shrink-0">
                                    <h4 className="text-white font-bold text-base md:text-lg leading-tight mb-1 w-full truncate">{role.title}</h4>
                                    <p className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold w-full truncate">{role.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
