"use client";

import { useEffect } from "react";
import Link from "next/link";

const profiles = [
    { name: "Closer", desc: "Conversion de prospects et closing des ventes à haute valeur ajoutée." },
    { name: "Setter", desc: "Qualification des contacts, prospection et génération de rendez-vous qualifiés." },
    { name: "Copywriter", desc: "Rédaction de textes persuasifs pour vos pages de vente, emails et publicités." },
    { name: "Community Manager", desc: "Gestion et animation de vos communautés sur l'ensemble des réseaux sociaux." },
    { name: "Designer Graphique", desc: "Création d'identités visuelles, publications et supports de communication percutants." },
    { name: "Vidéaste", desc: "Montage vidéo dynamique (réels, TikToks) pour vos réseaux sociaux et publicités." },
    { name: "Assistant de Direction", desc: "Gestion administrative, organisation des plannings et support quotidien." },
    { name: "Support Client", desc: "Assistance réactive, gestion des litiges et fidélisation de vos clients." },
    { name: "Développeur Web", desc: "Création, maintenance et optimisation de vos sites web et applications." },
    { name: "Media Buyer", desc: "Création, gestion et optimisation de vos campagnes d'acquisition payantes." },
];

const steps = [
    { n: "01", title: "Prise de contact", desc: "Vous nous contactez directement sur WhatsApp et échangez avec un membre de notre équipe." },
    { n: "02", title: "Analyse du besoin", desc: "Nous comprenons votre activité, vos objectifs et les profils dont vous avez réellement besoin." },
    { n: "03", title: "Proposition adaptée", desc: "Nous vous proposons une solution claire avec les profils les plus pertinents pour votre projet." },
    { n: "04", title: "Appel si nécessaire", desc: "Un appel visio peut être organisé pour affiner les détails et valider ensemble la mise en place." },
    { n: "05", title: "Mise en place rapide", desc: "Nous constituons votre équipe et vous pouvez commencer à travailler immédiatement." },
];

export default function ServicesPage() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("animate-in")),
            { threshold: 0.1 }
        );
        document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style>{`
                .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1); }
                .fade-up.animate-in { opacity: 1; transform: translateY(0); }
                .profile-card { background: #0a0a0a; border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 36px 32px; transition: border-color 0.35s, transform 0.35s; cursor: default; }
                .profile-card:hover { border-color: rgba(212,175,55,0.35); transform: translateY(-6px); }
                .step-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 36px 40px; display: flex; gap: 28px; align-items: flex-start; }
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
                        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "70vw", height: "70vw", background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%)", borderRadius: "50%", filter: "blur(80px)" }}></div>
                    </div>
                    <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
                        <p className="fade-up" style={{ color: "#d4af37", fontSize: 11, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 24 }}>— Nos Services —</p>
                        <h1 className="fade-up" style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.03em", textTransform: "uppercase", margin: "0 0 32px" }}>
                            Les profils<br />
                            <span style={{ color: "#d4af37" }}>experts</span>
                        </h1>
                        <p className="fade-up" style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", color: "rgba(255,255,255,0.45)", fontWeight: 300, lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
                            Nous mettons en place pour vous les profils adaptés à chaque besoin, sur tous les métiers réalisables en ligne.
                        </p>
                    </div>
                </section>

                {/* ── PROFILES GRID ─────────────────────────────────── */}
                <section style={{ padding: "80px 24px 120px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                            {profiles.map((p, i) => (
                                <div key={i} className="profile-card fade-up" style={{ transitionDelay: `${(i % 4) * 0.08}s` }}>
                                    <span style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", color: "#d4af37", textTransform: "uppercase", marginBottom: 16 }}>
                                        0{i + 1}
                                    </span>
                                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 12 }}>{p.name}</h3>
                                    <p style={{ color: "rgba(255,255,255,0.42)", lineHeight: 1.7, fontSize: "0.92rem", margin: 0 }}>{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── HOW IT WORKS ─────────────────────────────────── */}
                <section style={{ padding: "120px 24px", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}>
                    <div style={{ maxWidth: 860, margin: "0 auto" }}>
                        <div className="fade-up" style={{ textAlign: "center", marginBottom: 72 }}>
                            <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, letterSpacing: "-0.03em", textTransform: "uppercase", margin: "0 0 16px" }}>
                                Comment ça <span style={{ color: "#d4af37" }}>fonctionne ?</span>
                            </h2>
                            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.05rem", lineHeight: 1.7 }}>
                                Un processus simple, rapide et transparent.
                            </p>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {steps.map((step, i) => (
                                <div key={i} className="step-card fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                                    <div style={{
                                        width: 52, height: 52, borderRadius: "50%",
                                        border: "2px solid rgba(212,175,55,0.3)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "0.75rem", fontWeight: 900, color: "#d4af37", flexShrink: 0
                                    }}>{step.n}</div>
                                    <div>
                                        <h3 style={{ fontSize: "1.1rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>{step.title}</h3>
                                        <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7, fontSize: "0.95rem", margin: 0 }}>{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ─────────────────────────────────── */}
                <section style={{ padding: "120px 24px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)", background: "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.06) 0%, transparent 70%)" }}>
                    <div className="fade-up" style={{ maxWidth: 640, margin: "0 auto" }}>
                        <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, letterSpacing: "-0.03em", textTransform: "uppercase", lineHeight: 1, margin: "0 0 24px" }}>
                            Prêt à constituer<br />votre équipe ?
                        </h2>
                        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: 48 }}>
                            Une solution sur mesure, déployée rapidement.
                        </p>
                        <Link href="/contact" style={{
                            display: "inline-block", padding: "18px 48px",
                            borderRadius: 9999, background: "#d4af37",
                            color: "#000", fontWeight: 800, fontSize: "0.8rem",
                            letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none",
                        }}>
                            Nous contacter
                        </Link>
                    </div>
                </section>

            </main>
        </>
    );
}
