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
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-[#d4af37]/5 rounded-full blur-[100px] pointer-events-none" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 w-full">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <p className="text-[#d4af37] uppercase tracking-[0.3em] text-xs font-bold mb-6">NOUS CONTACTER</p>
                    <h1 className="text-4xl md:text-6xl font-light text-[#f4f4f4] tracking-tight mb-6" style={{ fontFamily: "var(--font-cormorant)" }}>
                        Passons à <em style={{ fontStyle: "italic", background: "linear-gradient(180deg, #ffffff 0%, #eaddc5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>l&apos;action</em>
                    </h1>
                    <p className="text-[rgba(255,255,255,0.6)] text-lg md:text-xl max-w-2xl mx-auto font-sans">
                        Que vous souhaitiez confier vos opérations ou rejoindre notre équipe, nous sommes à votre écoute.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Left Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="rounded-[2rem] p-6 sm:p-10 md:p-14 relative overflow-hidden w-full flex flex-col"
                        style={{
                            background: "rgba(10,10,10,0.6)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(212,175,55,0.15)",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.1)"
                        }}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-bl-full blur-2xl pointer-events-none" />

                        <h2 className="text-2xl font-bold text-white mb-12 flex items-center gap-3" style={{ fontFamily: "var(--font-cormorant)" }}>
                            <MessageSquare className="text-[#d4af37]" size={24} />
                            Contact Rapide (WhatsApp)
                        </h2>

                        <form onSubmit={handleWhatsAppSubmit} className="flex flex-col gap-8 sm:gap-10 relative z-10 font-sans">
                            {/* Nom */}
                            <div className="flex flex-col gap-3">
                                <label className="text-sm font-semibold text-[#eaddc5]">Votre Nom Complet</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Jean Dupont"
                                    className="w-full bg-[rgba(0,0,0,0.3)] border border-white/10 rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-[#f4f4f4] placeholder-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[#d4af37] focus:shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all duration-300"
                                />
                            </div>

                            {/* Sujet (Pre-written categories) */}
                            <div className="flex flex-col gap-3">
                                <label className="text-sm font-semibold text-[#eaddc5]">Catégorie de demande</label>
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
                                                ? "bg-[#d4af37]/10 border-[#d4af37]/50 text-[#f4f4f4] shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                                                : "bg-[rgba(0,0,0,0.3)] border-white/5 text-[rgba(255,255,255,0.5)] hover:border-[#d4af37]/30 hover:bg-[#d4af37]/5 hover:text-[#f4f4f4]"
                                                }`}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Message */}
                            <div className="flex flex-col gap-3">
                                <label className="text-sm font-semibold text-[#eaddc5]">Votre Message</label>
                                <textarea
                                    required
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={5}
                                    placeholder="Décrivez-nous votre besoin..."
                                    className="w-full bg-[rgba(0,0,0,0.3)] border border-white/10 rounded-xl px-5 py-4 text-[#f4f4f4] placeholder-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[#d4af37] focus:shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all duration-300 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="cursor-pointer mt-4 w-full bg-black hover:bg-[rgba(20,20,20,1)] hover:scale-[1.02] text-[#f4f4f4] font-bold py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transform active:scale-[0.98] flex justify-center items-center gap-3 border border-[#d4af37]/30 hover:border-[#d4af37]/60"
                            >
                                <Send size={20} className="text-[#d4af37]" />
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
                            <h2 className="text-3xl font-light text-[#f4f4f4] tracking-tight" style={{ fontFamily: "var(--font-cormorant)" }}>Nos Coordonnées</h2>

                            <div className="flex items-start gap-6 group cursor-default">
                                <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/5 border border-[#d4af37]/20 flex items-center justify-center shrink-0 group-hover:bg-[#d4af37]/10 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all duration-300">
                                    <MapPin className="text-[#d4af37] transition-colors" size={28} />
                                </div>
                                <div>
                                    <h4 className="text-[#f4f4f4] font-bold text-xl mb-1 mt-1 transition-colors" style={{ fontFamily: "var(--font-cormorant)" }}>Dubaï (Siège)</h4>
                                    <p className="text-[rgba(255,255,255,0.6)] leading-relaxed text-[15px] font-sans">
                                        Dubaï Silicon Oasis<br />
                                        Émirats Arabes Unis
                                    </p>
                                </div>
                            </div>

                            <a href="mailto:contact@scalset.com" className="flex items-start gap-6 group cursor-pointer w-fit pb-1 border-b border-transparent hover:border-[#d4af37]/30 transition-all duration-300">
                                <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/5 border border-[#d4af37]/20 flex items-center justify-center shrink-0 group-hover:bg-[#d4af37]/10 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all duration-300">
                                    <Mail className="text-[#d4af37] transition-colors" size={28} />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h4 className="text-[#f4f4f4] font-bold text-xl mb-1 mt-1 transition-colors" style={{ fontFamily: "var(--font-cormorant)" }}>Email</h4>
                                    <span className="text-[rgba(255,255,255,0.6)] text-[15px] font-sans">
                                        contact@scalset.com
                                    </span>
                                </div>
                            </a>

                            <div className="flex items-start gap-6 group cursor-default">
                                <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/5 border border-[#d4af37]/20 flex items-center justify-center shrink-0 group-hover:bg-[#d4af37]/10 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all duration-300">
                                    <Phone className="text-[#d4af37] transition-colors" size={28} />
                                </div>
                                <div>
                                    <h4 className="text-[#f4f4f4] font-bold text-xl mb-1 mt-1 transition-colors sm:pl-4" style={{ fontFamily: "var(--font-cormorant)" }}>WhatsApp Business</h4>
                                    <p className="text-[#eaddc5] font-medium transition-colors font-sans">+971 56 284 16 93</p>
                                    <p className="text-[rgba(255,255,255,0.4)] text-sm font-sans mt-1">Réponse sous 24h</p>
                                </div>
                            </div>
                        </div>

                        {/* Google Maps Embed */}
                        <div className="w-full h-[220px] sm:h-[280px] md:h-[350px] rounded-[2rem] overflow-hidden relative shrink-0" style={{
                            border: "1px solid rgba(212,175,55,0.15)",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
                        }}>
                            {/* Grayscale/Invert filter to match dark aesthetics perfectly */}
                            <iframe
                                title="Localisation Dubaï"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115598.67571344445!2d55.22896574929853!3d25.12061245089308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6153675005b7%3A0x6bba0fafa9321e10!2sDubai%20Silicon%20Oasis%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sfr!4v1709400000000!5m2!1sen!2sfr"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: "grayscale(100%) invert(100%) brightness(50%) sepia(100%) hue-rotate(10deg) saturate(300%) contrast(1.2)" }}
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
