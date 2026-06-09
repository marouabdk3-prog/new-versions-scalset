"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in");
                    }
                });
            },
            { threshold: 0.15 }
        );
        document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style>{`
                .fade-up {
                    opacity: 0;
                    transform: translateY(32px);
                    transition: opacity 0.8s cubic-bezier(.22,1,.36,1), transform 0.8s cubic-bezier(.22,1,.36,1);
                }
                .fade-up.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }
                .delay-1 { transition-delay: 0.1s; }
                .delay-2 { transition-delay: 0.2s; }
                .delay-3 { transition-delay: 0.3s; }
                .delay-4 { transition-delay: 0.4s; }
                .gold-border-card {
                    border: 1px solid rgba(212,175,55,0.0);
                    transition: border-color 0.4s, transform 0.4s;
                }
                .gold-border-card:hover {
                    border-color: rgba(212,175,55,0.35);
                    transform: translateY(-6px);
                }
            `}</style>

            <main style={{ background: "#030303", color: "#fff", fontFamily: "var(--font-montserrat), sans-serif" }}>

                {/* ── HERO ─────────────────────────────────── */}
                <section style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "160px 24px 100px",
                    position: "relative",
                    overflow: "hidden",
                }}>
                    {/* glow */}
                    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                        <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(60px)" }}></div>
                    </div>

                    <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
                        <p className="fade-up" style={{ color: "#d4af37", fontSize: 11, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 32 }}>
                            — À propos de ScalSet —
                        </p>
                        <h1 className="fade-up delay-1" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.03em", textTransform: "uppercase", margin: "0 0 40px" }}>
                            L'exécution<br />
                            <span style={{ WebkitTextFillColor: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>
                                comme art.
                            </span>
                        </h1>
                        <p className="fade-up delay-2" style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "rgba(255,255,255,0.5)", fontWeight: 300, lineHeight: 1.8, maxWidth: 600, margin: "0 auto" }}>
                            Notre ambition est simple : vous permettre de réussir avec les bons outils et les bonnes personnes. La croissance devient maîtrisée.
                        </p>
                    </div>
                </section>

                {/* ── STATS ─────────────────────────────────── */}
                <section style={{ padding: "80px 24px", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48, textAlign: "center" }}>
                        {[
                            { val: "100%", label: "Dédiés à votre succès" },
                            { val: "24/7", label: "Disponibilité totale" },
                            { val: "0%", label: "De compromis" },
                        ].map((s, i) => (
                            <div key={i} className="fade-up" style={{ transitionDelay: `${i * 0.12}s` }}>
                                <p style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 900, lineHeight: 1, color: "#d4af37", margin: "0 0 12px" }}>{s.val}</p>
                                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── MISSION ─────────────────────────────────── */}
                <section style={{ padding: "120px 24px" }}>
                    <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 80, alignItems: "center" }}>
                        <div className="fade-up">
                            <p style={{ color: "#d4af37", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 24 }}>Notre mission</p>
                            <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, letterSpacing: "-0.03em", textTransform: "uppercase", lineHeight: 1.05, margin: "0 0 32px" }}>
                                Votre succès,<br /><span style={{ color: "#d4af37" }}>notre raison d'être.</span>
                            </h2>
                            <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.9, fontSize: "1.05rem", marginBottom: 20 }}>
                                Nous veillons à offrir à nos équipes des conditions de travail sérieuses et valorisantes, pour vous apporter une vraie stabilité sur le long terme.
                            </p>
                            <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.9, fontSize: "1.05rem" }}>
                                Aucune fuite, aucune exposition. Vos données, vos process et votre organisation restent strictement protégés.
                            </p>
                        </div>
                        <div className="fade-up delay-2" style={{ display: "flex", justifyContent: "center" }}>
                            <div style={{
                                width: "min(400px, 100%)",
                                aspectRatio: "1",
                                borderRadius: 32,
                                border: "1px solid rgba(212,175,55,0.15)",
                                background: "rgba(212,175,55,0.02)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                                overflow: "hidden",
                            }}>
                                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 30%, rgba(212,175,55,0.08), transparent 60%)" }}></div>
                                <Image src="/100.svg" alt="ScalSet" width={160} height={160} style={{ position: "relative", zIndex: 1, filter: "drop-shadow(0 0 40px rgba(212,175,55,0.3))" }} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── ADN ─────────────────────────────────── */}
                <section style={{ padding: "120px 24px", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}>
                    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                        <div className="fade-up" style={{ textAlign: "center", marginBottom: 72 }}>
                            <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, letterSpacing: "-0.03em", textTransform: "uppercase", margin: "0 0 16px" }}>Notre ADN</h2>
                            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.1rem", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
                                Les trois piliers qui soutiennent notre excellence opérationnelle.
                            </p>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
                            {[
                                { num: "01", title: "Rentabilité", desc: "Payez moins, gagnez plus. Un coût d'exécution réduit avec de meilleures performances, sans sacrifier la qualité." },
                                { num: "02", title: "Concret", desc: "Pas de promesses en l'air. Un travail structuré et suivi au quotidien par des équipes encadrées qui exécutent proprement." },
                                { num: "03", title: "Confiance", desc: "Collaborer en toute sérénité. Vos process et votre organisation sont strictement protégés, à chaque instant." },
                            ].map((item, i) => (
                                <div key={i} className={`fade-up gold-border-card delay-${i + 1}`} style={{
                                    padding: "48px 40px",
                                    borderRadius: 24,
                                    background: "#0a0a0a",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    cursor: "default",
                                }}>
                                    <span style={{ display: "block", fontSize: "3.5rem", fontWeight: 900, color: "rgba(212,175,55,0.15)", lineHeight: 1, marginBottom: 24 }}>{item.num}</span>
                                    <h3 style={{ fontSize: "1.6rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>{item.title}</h3>
                                    <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.8, fontSize: "1rem" }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── ORGANISATION ─────────────────────────────────── */}
                <section style={{ padding: "120px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ maxWidth: 800, margin: "0 auto" }}>
                        <div className="fade-up" style={{ textAlign: "center", marginBottom: 80 }}>
                            <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, letterSpacing: "-0.03em", textTransform: "uppercase", margin: "0 0 16px" }}>L'organisation</h2>
                            <p style={{ color: "#d4af37", fontSize: 12, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>Pensée pour performer</p>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {[
                                { num: "01", label: "Le Client (Vous)", desc: "Vous définissez les objectifs, validez les profils et restez le pilote incontesté de votre croissance.", gold: false },
                                { num: "02", label: "SCALSET", desc: "Chef d'orchestre. Nous recrutons, formons et supervisons l'ensemble des opérations en temps réel.", gold: true },
                                { num: "03", label: "Le Manager Dédié", desc: "Votre relais sur le terrain. Il encadre les équipes dans nos locaux, garantit les KPI et vous reporte chaque jour.", gold: false },
                                { num: "04", label: "L'équipe Opérationnelle", desc: "Closers, Setters, Copywriters, Designers, Support… Des experts formés, prêts à exécuter sans friction.", gold: false },
                            ].map((step, i) => (
                                <div key={i} className={`fade-up delay-${i + 1}`} style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 28,
                                    padding: "36px 40px",
                                    borderRadius: 20,
                                    background: step.gold ? "rgba(212,175,55,0.06)" : "rgba(255,255,255,0.02)",
                                    border: `1px solid ${step.gold ? "rgba(212,175,55,0.25)" : "rgba(255,255,255,0.06)"}`,
                                }}>
                                    <div style={{
                                        width: 52,
                                        height: 52,
                                        borderRadius: "50%",
                                        border: `2px solid ${step.gold ? "#d4af37" : "rgba(255,255,255,0.15)"}`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "0.8rem",
                                        fontWeight: 900,
                                        color: step.gold ? "#d4af37" : "rgba(255,255,255,0.4)",
                                        flexShrink: 0,
                                        marginTop: 4,
                                    }}>{step.num}</div>
                                    <div>
                                        <h3 style={{ fontSize: "1.25rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8, color: step.gold ? "#d4af37" : "#fff" }}>{step.label}</h3>
                                        <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7, fontSize: "0.95rem", margin: 0 }}>{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ─────────────────────────────────── */}
                <section style={{ padding: "120px 24px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)", background: "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.06) 0%, transparent 70%)" }}>
                    <div className="fade-up" style={{ maxWidth: 700, margin: "0 auto" }}>
                        <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 900, letterSpacing: "-0.03em", textTransform: "uppercase", lineHeight: 1, margin: "0 0 24px" }}>
                            Prêt à dominer<br />votre marché ?
                        </h2>
                        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: 48 }}>
                            Laissez-nous gérer l'exécution. Concentrez-vous sur la vision.
                        </p>
                        <Link href="/contact" style={{
                            display: "inline-block",
                            padding: "18px 48px",
                            borderRadius: 9999,
                            background: "#d4af37",
                            color: "#000",
                            fontWeight: 800,
                            fontSize: "0.85rem",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            textDecoration: "none",
                            transition: "background 0.3s, transform 0.3s",
                        }}
                            onMouseEnter={e => { (e.target as HTMLElement).style.background = "#fff"; (e.target as HTMLElement).style.transform = "scale(1.04)"; }}
                            onMouseLeave={e => { (e.target as HTMLElement).style.background = "#d4af37"; (e.target as HTMLElement).style.transform = "scale(1)"; }}
                        >
                            Lancer une collaboration
                        </Link>
                    </div>
                </section>

            </main>
        </>
    );
}
