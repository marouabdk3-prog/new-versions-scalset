"use client";

import { useEffect, useState } from "react";

const contactMethods = [
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        ),
        label: "Siège Social",
        value: "Dubaï Silicon Oasis, UAE",
        href: null,
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>
        ),
        label: "Email",
        value: "contact@scalset.com",
        href: "mailto:contact@scalset.com",
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
        ),
        label: "WhatsApp Business",
        value: "+971 56 284 16 93",
        href: "https://wa.me/971562841693",
        green: true,
    },
];

export default function ContactPage() {
    const [category, setCategory] = useState("Besoin de renfort");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("animate-in")),
            { threshold: 0.1 }
        );
        document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const categories = ["Besoin de renfort", "Rejoindre l'équipe", "Partenariat", "Autre"];

    return (
        <>
            <style>{`
                .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1); }
                .fade-up.animate-in { opacity: 1; transform: translateY(0); }
                .field { width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 16px 20px; color: #fff; font-size: 0.95rem; font-family: var(--font-montserrat), sans-serif; outline: none; transition: border-color 0.3s, box-shadow 0.3s; resize: none; }
                .field::placeholder { color: rgba(255,255,255,0.2); }
                .field:focus { border-color: rgba(212,175,55,0.5); box-shadow: 0 0 0 3px rgba(212,175,55,0.08); }
                .cat-btn { padding: 10px 20px; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: rgba(255,255,255,0.45); font-size: 0.8rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; transition: all 0.25s; font-family: var(--font-montserrat), sans-serif; }
                .cat-btn.active { border-color: #d4af37; color: #d4af37; background: rgba(212,175,55,0.08); }
                .cat-btn:hover:not(.active) { border-color: rgba(255,255,255,0.25); color: rgba(255,255,255,0.8); }
                .contact-method { display: flex; align-items: center; gap: 20px; padding: 28px 32px; border-radius: 20px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); transition: border-color 0.3s; text-decoration: none; color: inherit; }
                .contact-method:hover { border-color: rgba(255,255,255,0.15); }
                .submit-btn { width: 100%; padding: 18px; border-radius: 14px; background: #d4af37; color: #000; font-weight: 800; font-size: 0.85rem; letter-spacing: 0.18em; text-transform: uppercase; border: none; cursor: pointer; font-family: var(--font-montserrat), sans-serif; transition: background 0.3s, transform 0.2s; }
                .submit-btn:hover { background: #e8c84d; transform: translateY(-2px); }
            `}</style>

            <main style={{ background: "#030303", color: "#fff", fontFamily: "var(--font-montserrat), sans-serif" }}>

                {/* ── HERO ─────────────────────────────────── */}
                <section style={{
                    padding: "180px 24px 100px",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                }}>
                    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 65%)", borderRadius: "50%", filter: "blur(80px)" }}></div>
                    </div>
                    <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
                        <p className="fade-up" style={{ color: "#d4af37", fontSize: 11, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 24 }}>— Contactez-nous —</p>
                        <h1 className="fade-up" style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.03em", textTransform: "uppercase", margin: "0 0 32px" }}>
                            Passons à<br />
                            <span style={{ color: "#d4af37" }}>l'action.</span>
                        </h1>
                        <p className="fade-up" style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", color: "rgba(255,255,255,0.45)", fontWeight: 300, lineHeight: 1.8, maxWidth: 520, margin: "0 auto" }}>
                            Que vous souhaitiez confier vos opérations ou rejoindre notre équipe, nous sommes à votre écoute.
                        </p>
                    </div>
                </section>

                {/* ── CONTACT LAYOUT ─────────────────────────────────── */}
                <section style={{ padding: "80px 24px 140px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 60, alignItems: "start" }}>

                        {/* LEFT: Form */}
                        <div className="fade-up">
                            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 40 }}>Envoyer un message</h2>
                            <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    <label style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Votre nom complet</label>
                                    <input type="text" required placeholder="Jean Dupont" className="field" />
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    <label style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Email</label>
                                    <input type="email" required placeholder="jean@company.com" className="field" />
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                    <label style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Catégorie</label>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                                        {categories.map(cat => (
                                            <button key={cat} type="button" onClick={() => setCategory(cat)} className={`cat-btn ${category === cat ? "active" : ""}`}>{cat}</button>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    <label style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Votre message</label>
                                    <textarea required rows={5} placeholder="Décrivez-nous votre besoin..." className="field" />
                                </div>

                                <button type="submit" className="submit-btn" style={{ marginTop: 8 }}>Envoyer le message</button>
                            </form>
                        </div>

                        {/* RIGHT: Info */}
                        <div className="fade-up" style={{ transitionDelay: "0.15s", display: "flex", flexDirection: "column", gap: 32 }}>
                            <div>
                                <h2 style={{ fontSize: "1.6rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 12 }}>Coordonnées</h2>
                                <p style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>Réponse garantie sous 24 heures ouvrées. Nous travaillons avec des clients partout dans le monde.</p>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {contactMethods.map((method, i) => {
                                    const El = method.href ? "a" : "div";
                                    return (
                                        <El key={i} {...(method.href ? { href: method.href } : {})} className="contact-method" style={{ textDecoration: "none", color: "inherit" }}>
                                            <div style={{
                                                width: 52, height: 52, borderRadius: 16, flexShrink: 0,
                                                background: method.green ? "rgba(37,211,102,0.1)" : "rgba(255,255,255,0.04)",
                                                border: `1px solid ${method.green ? "rgba(37,211,102,0.3)" : "rgba(255,255,255,0.08)"}`,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                color: method.green ? "#25D366" : "rgba(255,255,255,0.6)",
                                            }}>{method.icon}</div>
                                            <div>
                                                <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 6 }}>{method.label}</p>
                                                <p style={{ fontSize: "1rem", fontWeight: 600, color: "#fff", margin: 0 }}>{method.value}</p>
                                            </div>
                                        </El>
                                    );
                                })}
                            </div>

                            {/* Map */}
                            <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", height: 260 }}>
                                <iframe
                                    title="Dubaï Silicon Oasis"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115598.67571344445!2d55.22896574929853!3d25.12061245089308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6153675005b7%3A0x6bba0fafa9321e10!2sDubai%20Silicon%20Oasis!5e0!3m2!1sen!2sfr!4v1709400000000!5m2!1sen!2sfr"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(80%) contrast(85%) grayscale(30%)" }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>

                    </div>
                </section>

            </main>
        </>
    );
}
