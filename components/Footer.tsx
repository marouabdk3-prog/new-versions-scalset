"use client";

import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer style={{
            background: "#030303",
            borderTop: "1px solid rgba(212,175,55,0.12)",
            fontFamily: "var(--font-montserrat), sans-serif",
            color: "#fff",
        }}>
            <div style={{
                maxWidth: 1200,
                margin: "0 auto",
                padding: "80px 40px 40px",
            }}>

                {/* ── TOP ROW ── */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr",
                    gap: 60,
                    marginBottom: 64,
                }}>

                    {/* Brand */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <Link href="/" style={{ textDecoration: "none" }}>
                            <span style={{
                                fontSize: "1.6rem",
                                fontWeight: 800,
                                letterSpacing: "0.15em",
                                background: "linear-gradient(135deg, #fff 40%, #d4af37 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}>
                                SCALSET
                            </span>
                        </Link>
                        <p style={{
                            color: "rgba(255,255,255,0.38)",
                            fontSize: "0.9rem",
                            lineHeight: 1.8,
                            maxWidth: 340,
                            margin: 0,
                        }}>
                            Partenaire d&apos;exécution opérationnelle. Nous permettons aux entreprises de croître en déléguant l&apos;opérationnel quotidien.
                        </p>
                        <Link href="/contact" style={{
                            display: "inline-block",
                            marginTop: 8,
                            padding: "12px 28px",
                            borderRadius: 9999,
                            border: "1px solid rgba(212,175,55,0.4)",
                            color: "#d4af37",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            textDecoration: "none",
                            width: "fit-content",
                            transition: "background 0.3s, color 0.3s",
                        }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.background = "#d4af37";
                                (e.currentTarget as HTMLElement).style.color = "#000";
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.background = "transparent";
                                (e.currentTarget as HTMLElement).style.color = "#d4af37";
                            }}
                        >
                            Démarrer un projet
                        </Link>
                    </div>

                    {/* Navigation */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <h4 style={{
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.3)",
                            margin: "0 0 8px",
                        }}>Navigation</h4>
                        {[
                            { label: "Accueil", href: "/" },
                            { label: "À propos", href: "/a-propos" },
                            { label: "Services", href: "/services" },
                            { label: "Contact", href: "/contact" },
                        ].map(({ label, href }) => (
                            <Link key={href} href={href} style={{
                                color: "rgba(255,255,255,0.5)",
                                fontSize: "0.92rem",
                                textDecoration: "none",
                                transition: "color 0.25s",
                                width: "fit-content",
                            }}
                                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#d4af37"}
                                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Contact Info */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <h4 style={{
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.3)",
                            margin: "0 0 8px",
                        }}>Contact</h4>
                        <a href="mailto:contact@scalset.com" style={{
                            color: "rgba(255,255,255,0.5)",
                            fontSize: "0.92rem",
                            textDecoration: "none",
                            transition: "color 0.25s",
                        }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"}
                        >
                            contact@scalset.com
                        </a>
                        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.92rem", margin: 0 }}>+971 56 284 16 93</p>
                        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem", margin: 0, lineHeight: 1.6 }}>Dubaï Silicon Oasis<br />Émirats Arabes Unis</p>
                    </div>

                </div>

                {/* ── BOTTOM ROW ── */}
                <div style={{
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 16,
                }}>
                    <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.78rem", letterSpacing: "0.08em", margin: 0 }}>
                        © {year} SCALSET. Tous droits réservés.
                    </p>
                    <div style={{ display: "flex", gap: 28 }}>
                        {[
                            { label: "Mentions légales", href: "/mentions-legales" },
                            { label: "Confidentialité", href: "/confidentialite" },
                        ].map(({ label, href }) => (
                            <Link key={href} href={href} style={{
                                color: "rgba(255,255,255,0.2)",
                                fontSize: "0.78rem",
                                textDecoration: "none",
                                letterSpacing: "0.05em",
                                transition: "color 0.25s",
                            }}
                                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#d4af37"}
                                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.2)"}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
}
