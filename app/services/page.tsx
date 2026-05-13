"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    Handshake,
    CalendarDays,
    Users,
    PenTool,
    Palette,
    Film,
    Briefcase,
    Headset,
    Code,
    Target,
    CheckCircle2,
    MessageCircle,
    Search,
    FileText,
    Video,
    Rocket
} from "lucide-react";
import Link from "next/link";

const whys = [
    "Réduire les coûts de recrutement et de formation",
    "Accéder rapidement à des compétences spécialisées",
    "Gagner en flexibilité et en agilité opérationnelle",
    "Se libérer du management quotidien",
    "Améliorer la qualité d'exécution globale",
];

const profiles = [
    { title: "Closer", description: "Conversion de prospects et closing des ventes à haute valeur ajoutée.", icon: Handshake },
    { title: "Setter", description: "Qualification des contacts, prospection et génération de rendez-vous qualifiés.", icon: CalendarDays },
    { title: "Community Manager", description: "Gestion et animation de vos communautés sur l'ensemble des réseaux sociaux.", icon: Users },
    { title: "Copywriter", description: "Rédaction de textes persuasifs pour vos pages de vente, emails et publicités.", icon: PenTool },
    { title: "Designer graphique", description: "Création d'identités visuelles, publications et supports de communication percutants.", icon: Palette },
    { title: "Vidéaste", description: "Montage vidéo dynamique (réels, TikToks) pour vos réseaux sociaux et publicités.", icon: Film },
    { title: "Assistant de direction", description: "Gestion administrative, organisation des plannings et support quotidien de l'exécutif.", icon: Briefcase },
    { title: "Support client", description: "Assistance réactive, gestion des litiges et fidélisation de vos clients.", icon: Headset },
    { title: "Développeur Web", description: "Création, maintenance et optimisation de vos sites web, pages de capture et applications.", icon: Code },
    { title: "Media buyer", description: "Création, gestion et optimisation de vos campagnes d'acquisition payantes sur toutes les plateformes.", icon: Target },
];

const processSteps = [
    {
        title: "Prise de contact",
        description: "Vous nous contactez directement sur WhatsApp et échangez avec un membre de notre équipe.",
        icon: MessageCircle
    },
    {
        title: "Analyse de votre besoin",
        description: "Nous comprenons votre activité, vos objectifs et les profils dont vous avez réellement besoin.",
        icon: Search
    },
    {
        title: "Proposition adaptée",
        description: "Nous vous proposons une solution claire avec les profils les plus pertinents pour votre projet.",
        icon: FileText
    },
    {
        title: "Appel si nécessaire",
        description: "Un appel visio peut être organisé pour affiner les détails et valider ensemble la mise en place.",
        icon: Video
    },
    {
        title: "Mise en place rapide",
        description: "Nous constituons votre équipe et vous pouvez commencer à travailler immédiatement.",
        icon: Rocket
    }
];

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

export default function Services() {
    return (
        <main className="min-h-screen pt-32 pb-32 relative overflow-hidden">

            {/* Animated Ambient Background Glows */}
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-slate-300/[0.03] blur-[120px] rounded-full pointer-events-none"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-[30%] right-[-10%] w-[40vw] h-[40vw] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none"
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, -40, 0],
                    y: [0, -50, 0],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.div
                className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] bg-slate-400/[0.02] blur-[130px] rounded-full pointer-events-none"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 30, 0],
                    y: [0, -40, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col gap-24">

                {/* ── 1. HERO ── */}
                <section className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-6"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-[1px] bg-slate-500" />
                            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">
                                Profils
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] uppercase">
                            Les profils que nous mettons à votre disposition
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-bold mt-4">
                            Nous mettons en place pour vous les profils adaptés à chaque besoin, sur tous les métiers réalisables en ligne :
                        </p>
                    </motion.div>
                </section>

                {/* ── 2. PROFILES GRID ── */}
                <section className="flex flex-col gap-12 border-t border-white/5 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {profiles.map((profile, i) => {
                            const Icon = profile.icon;
                            return (
                                <motion.div
                                    key={i}
                                    custom={i}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: "-40px" }}
                                    className={`group glass-panel flex flex-col gap-4 p-6 sm:p-8 rounded-2xl hover:bg-slate-400/10 transition-all duration-300 ${i === 8 ? "lg:col-start-2" : ""}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-11 h-11 rounded-full bg-slate-100/10 border border-slate-100/20 flex items-center justify-center shrink-0 group-hover:bg-slate-100/20 group-hover:scale-110 group-hover:border-slate-100/40 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                            <Icon className="w-5 h-5 text-slate-100 drop-shadow-md" strokeWidth={1.5} />
                                        </div>
                                    </div>
                                    <h3 className="text-slate-100 font-bold text-lg leading-tight mt-1">{profile.title}</h3>
                                    <p className="text-slate-300/70 text-sm leading-relaxed">
                                        {profile.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* ── 3. Contact section── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-panel p-8 md:p-10 rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-500/3 blur-[80px] rounded-full pointer-events-none" />
                        <p className="text-slate-300 leading-relaxed text-lg relative z-10 max-w-3xl">
                            Et si vos besoins sont spécifiques, nous pouvons constituer une équipe entièrement personnalisée, adaptée à votre activité. Nous disposons d&apos;un répertoire complet de profils capables de couvrir tout ce qui peut se faire en ligne.
                        </p>
                        <Link
                            href="#contact"
                            className="relative z-10 shrink-0 inline-flex items-center gap-3 bg-white text-black font-semibold rounded-full px-8 py-4 hover:bg-slate-100 transition-colors duration-200"
                        >
                            Nous contacter
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </section>
                <section className="flex flex-col gap-16 md:gap-24 text-center max-w-[95vw] mx-auto w-full pt-6">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-[#F8FAFC] to-[#94A3B8] leading-[1.2] py-2">
                        COMMENT ÇA FONCTIONNE ?
                    </h1>

                    <div className="relative flex flex-col lg:flex-row justify-between gap-8 lg:gap-4 mt-4">
                        {/* Connecting line for Desktop */}
                        <div className="hidden lg:block absolute top-[44px] left-[5%] right-[5%] h-[2px] bg-slate-800 border-t border-dashed border-slate-700">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-linear-to-r from-transparent via-slate-300 to-transparent w-1/3 shadow-[0_0_15px_rgba(226,232,240,0.5)]"
                                animate={{ x: ["-100%", "300%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        {/* Connecting dashed line for Mobile */}
                        <div className="lg:hidden absolute top-[5%] bottom-[5%] left-[39px] w-[2px] bg-slate-800 border-l border-dashed border-slate-700">
                            <motion.div
                                className="absolute inset-x-0 top-0 bg-linear-to-b from-transparent via-slate-300 to-transparent h-1/3 shadow-[0_0_15px_rgba(226,232,240,0.5)]"
                                animate={{ y: ["-100%", "300%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        {processSteps.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ duration: 0.6, delay: i * 0.15 }}
                                    className="relative flex flex-row lg:flex-col items-start lg:items-center gap-6 lg:gap-8 flex-1 group z-10"
                                >
                                    {/* Number / Icon Bubble */}
                                    <div className="relative w-20 h-20 shrink-0 lg:mx-auto rounded-full bg-[#0d0d14] border-2 border-slate-300/30 shadow-[0_0_15px_rgba(226,232,240,0.08)] flex flex-col items-center justify-center group-hover:border-slate-200/50 group-hover:shadow-[0_0_30px_rgba(226,232,240,0.25)] transition-all duration-500">
                                        <div className="absolute inset-0 rounded-full bg-slate-300/5 group-hover:bg-slate-300/15 transition-colors duration-500" />
                                        <span className="text-xs font-bold text-slate-400 group-hover:text-slate-200 transition-colors mb-0.5">0{i + 1}</span>
                                        <Icon className="w-6 h-6 text-slate-300 group-hover:text-slate-100 group-hover:drop-shadow-[0_0_8px_rgba(226,232,240,0.6)] transition-all duration-300" />
                                    </div>

                                    {/* Content Card */}
                                    <div className="flex-1 glass-panel p-6 lg:p-7 rounded-2xl transition-all duration-300 flex flex-col gap-3 text-left lg:text-center w-full">
                                        <h3 className="text-xl font-bold text-slate-100 tracking-tight">{step.title}</h3>
                                        <p className="text-sm md:text-base text-slate-400/90 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="flex justify-center"
                    >
                        <Link
                            href="#contact"
                            className="inline-flex items-center gap-3 bg-white text-black font-semibold rounded-full px-10 py-5 hover:bg-slate-100 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                        >
                            Nous contacter
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </section>

                {/* ── 4. POURQUOI EXTERNALISER ? ── */}
                <section className="flex flex-col border-t border-white/5 pt-16 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        className="group glass-panel relative p-8 md:p-12 lg:p-16 rounded-[2.5rem] transition-all duration-500 flex flex-col gap-10 w-full max-w-5xl overflow-hidden"
                    >
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-500/5 blur-[80px] rounded-full pointer-events-none transition-all duration-500 group-hover:bg-slate-500/10" />

                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-b from-slate-100 to-slate-400 tracking-tight text-center relative z-10">
                            Pourquoi choisir ScalSet ?
                        </h3>

                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 lg:gap-x-12 lg:gap-y-8 mt-4 relative z-10">
                            {whys.map((item, ii) => (
                                <li key={ii} className="flex items-start gap-4 text-slate-200 md:text-lg font-medium leading-relaxed">
                                    <div className="mt-1 bg-slate-100/10 border border-slate-100/20 p-2 rounded-full shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                                        <CheckCircle2 className="w-5 h-5 text-slate-100 drop-shadow-md" strokeWidth={2.5} />
                                    </div>
                                    <span className="font-medium pt-0.5">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="mt-4 flex justify-center relative z-10"
                        >
                            <Link
                                href="#contact"
                                className="inline-flex items-center gap-3 bg-white text-black font-semibold rounded-full px-10 py-5 hover:bg-slate-100 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                            >
                                Démarrer la collaboration
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>

            </div>
        </main>
    );
}
