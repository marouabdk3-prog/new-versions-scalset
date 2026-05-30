"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageSquare, Send } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

const WHATSAPP_NUMBER = "971541771844"; // À remplacer par le numéro réel de l'entreprise

const CATEGORIES = [
    { label: "Besoin de renfort", defaultText: "Bonjour, j'aimerais avoir plus d'informations sur vos services pour renforcer mon équipe." },
    { label: "Rejoindre l'équipe", defaultText: "Bonjour, je souhaite postuler pour rejoindre les équipes SCALSET." },
    { label: "Partenariat", defaultText: "Bonjour, j'aimerais discuter d'une opportunité de partenariat." },
    { label: "Autre", defaultText: "Bonjour, j'ai une demande spécifique à vous soumettre." }
];

export default function ContactPage() {
    const [name, setName] = useState("");
    const [subject, setSubject] = useState(CATEGORIES[0].label);
    const [message, setMessage] = useState(CATEGORIES[0].defaultText);

    const handleWhatsAppSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Formater le message pour WhatsApp
        const text = `Bonjour SCALSET,\n\nJe suis ${name}.\nSujet: ${subject}\n\nMessage:\n${message}`;
        const encodedText = encodeURIComponent(text);

        // Rediriger vers WhatsApp
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, "_blank");
    };

    return (
        <main className="min-h-screen pt-24 sm:pt-32 md:pt-40 pb-20 md:pb-32 relative flex flex-col items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 w-full">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
                        Passons à <span className="text-transparent bg-clip-text bg-linear-to-r from-slate-300 to-slate-500">l&apos;action</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Que vous souhaitiez confier vos opérations ou rejoindre notre équipe, nous sommes à votre écoute.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Left Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="glass-panel rounded-4xl sm:rounded-[2.5rem] p-6 sm:p-10 md:p-14 relative overflow-hidden w-full flex flex-col"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-500/10 rounded-bl-full blur-2xl pointer-events-none" />

                        <h2 className="text-2xl font-bold text-white mb-12 flex items-center gap-3">
                            <MessageSquare className="text-slate-300" size={24} />
                            Contact Rapide (WhatsApp)
                        </h2>

                        <form onSubmit={handleWhatsAppSubmit} className="flex flex-col gap-8 sm:gap-14 relative z-10">
                            {/* Nom */}
                            <div className="flex flex-col gap-3">
                                <label className="text-sm font-semibold text-slate-300">Votre Nom Complet</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Jean Dupont"
                                    className="w-full bg-[#0d0d14] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-600 focus:outline-hidden focus:border-slate-400 focus:shadow-[0_0_15px_rgba(148,163,184,0.15)] transition-all duration-300"
                                />
                            </div>

                            {/* Sujet (Pre-written categories) */}
                            <div className="flex flex-col gap-3">
                                <label className="text-sm font-semibold text-slate-300">Catégorie de demande</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat.label}
                                            type="button"
                                            onClick={() => {
                                                setSubject(cat.label);
                                                setMessage(cat.defaultText);
                                            }}
                                            className={`cursor-pointer py-3.5 px-4 rounded-xl text-sm font-medium transition-all duration-300 border ${subject === cat.label
                                                ? "bg-slate-400/20 border-slate-300 text-white shadow-[0_0_15px_rgba(148,163,184,0.2)]"
                                                : "bg-[#0d0d14] border-white/5 text-slate-400 hover:border-slate-400/30 hover:bg-slate-400/5 hover:text-slate-200"
                                                }`}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Message */}
                            <div className="flex flex-col gap-3">
                                <label className="text-sm font-semibold text-slate-300">Votre Message</label>
                                <textarea
                                    required
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={5}
                                    placeholder="Décrivez-nous votre besoin..."
                                    className="w-full bg-[#0d0d14] border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-600 focus:outline-hidden focus:border-slate-400 focus:shadow-[0_0_15px_rgba(148,163,184,0.15)] transition-all duration-300 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="cursor-pointer mt-4 w-full bg-white hover:bg-slate-100 hover:scale-[1.02] text-black font-bold py-5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transform active:scale-[0.98] flex justify-center items-center gap-3"
                            >
                                <Send size={20} className="text-black" />
                                Lancer la discussion
                            </button>
                        </form>
                    </motion.div>

                    {/* Right Column: Info & Map */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col gap-14"
                    >
                        <div className="space-y-10 md:px-0 px-4">
                            <h2 className="text-3xl font-bold text-white tracking-tight">Nos Coordonnées</h2>

                            <div className="flex items-start gap-6 group cursor-default">
                                <div className="w-16 h-16 rounded-2xl bg-slate-500/10 border border-slate-500/30 flex items-center justify-center shrink-0 group-hover:bg-slate-500/20 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(148,163,184,0.15)] transition-all duration-300">
                                    <MapPin className="text-slate-300 group-hover:text-slate-100 transition-colors" size={28} />
                                </div>
                                <div>
                                    <h4 className="text-slate-200 font-bold text-xl mb-1 mt-1 transition-colors group-hover:text-white">Dubaï (Siège)</h4>
                                    <p className="text-slate-400 leading-relaxed text-base group-hover:text-slate-300 transition-colors">
                                        Dubaï Silicon Oasis<br />
                                        Émirats Arabes Unis
                                    </p>
                                </div>
                            </div>

                            <a href="mailto:contact@scalset.com" className="flex items-start gap-6 group cursor-pointer w-fit pb-1 border-b border-transparent hover:border-slate-500/30 transition-all duration-300">
                                <div className="w-16 h-16 rounded-2xl bg-slate-500/10 border border-slate-500/30 flex items-center justify-center shrink-0 group-hover:bg-slate-500/20 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(148,163,184,0.15)] transition-all duration-300">
                                    <Mail className="text-slate-300 group-hover:text-slate-100 transition-colors" size={28} />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h4 className="text-slate-200 font-bold text-xl mb-1 mt-1 transition-colors group-hover:text-white">Email</h4>
                                    <span className="text-slate-400 group-hover:text-slate-300 text-base transition-colors">
                                        contact@scalset.com
                                    </span>
                                </div>
                            </a>

                            <div className="flex items-start gap-6 group cursor-default">
                                <div className="w-16 h-16 rounded-2xl bg-slate-500/10 border border-slate-500/30 flex items-center justify-center shrink-0 group-hover:bg-slate-500/20 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(148,163,184,0.15)] transition-all duration-300">
                                    <Phone className="text-slate-300 group-hover:text-slate-100 transition-colors" size={28} />
                                </div>
                                <div>
                                    <h4 className="text-slate-200 font-bold text-xl mb-1 mt-1 transition-colors group-hover:text-white sm:pl-4">WhatsApp Business</h4>
                                    <p className="text-slate-300 font-medium group-hover:text-white transition-colors">+971 56 284 16 93</p>
                                    <p className="text-slate-500 text-base group-hover:text-slate-400 transition-colors">Réponse sous 24h</p>
                                </div>
                            </div>
                        </div>

                        {/* Google Maps Embed */}
                        <div className="glass-panel w-full h-[220px] sm:h-[280px] md:h-[350px] rounded-[2rem] overflow-hidden relative shrink-0">
                            {/* Grayscale/Invert filter to match dark aesthetics perfectly */}
                            <iframe
                                title="Localisation Dubaï"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115598.67571344445!2d55.22896574929853!3d25.12061245089308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6153675005b7%3A0x6bba0fafa9321e10!2sDubai%20Silicon%20Oasis%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sfr!4v1709400000000!5m2!1sen!2sfr"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(85%) contrast(85%)" }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                    </motion.div>
                </div>
            </div>
        </main>
    );
}
