"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLogoAnimation } from "./LogoAnimationContext";

const navItems = [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "/a-propos" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();
    const { navLogoRef, navLogoVisible } = useLogoAnimation();
    const pathname = usePathname();

    useEffect(() => {
        return scrollY.onChange((v) => setScrolled(v > 50));
    }, [scrollY]);

    return (
        <header style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 110,
            transition: "background 0.5s, backdrop-filter 0.5s, box-shadow 0.5s, padding 0.5s",
            background: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.05)" : "none",
            padding: scrolled ? "14px 0" : "20px 0",
        }}>
            <div style={{
                maxWidth: 1400,
                margin: "0 auto",
                padding: "0 48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}>

                {/* ── LOGO ── */}
                <motion.div
                    ref={navLogoRef}
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: navLogoVisible ? 1 : 0, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                >
                    <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                        <Image src="/100.svg" alt="ScalSet" width={52} height={52} style={{ display: "block", filter: "drop-shadow(0 0 8px rgba(255,255,255,0.25))" }} priority />
                    </Link>
                </motion.div>

                {/* ── DESKTOP NAV ── */}
                <motion.nav
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                    className="hidden lg:flex"
                >
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "8px 18px",
                                borderRadius: 9999,
                                border: isActive ? "1px solid rgba(212,175,55,0.5)" : "1px solid transparent",
                                background: isActive ? "rgba(212,175,55,0.06)" : "transparent",
                                textDecoration: "none",
                                transition: "all 0.25s",
                            }}
                                onMouseEnter={e => {
                                    if (!isActive) {
                                        (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.1)";
                                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!isActive) {
                                        (e.currentTarget as HTMLElement).style.border = "1px solid transparent";
                                        (e.currentTarget as HTMLElement).style.background = "transparent";
                                    }
                                }}
                            >
                                <span style={{
                                    fontSize: "0.78rem",
                                    fontWeight: 700,
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase",
                                    color: isActive ? "#d4af37" : "rgba(255,255,255,0.8)",
                                    fontFamily: "var(--font-montserrat), sans-serif",
                                }}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </motion.nav>

                {/* ── RIGHT: LANG + MOBILE ── */}
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                    style={{ display: "flex", alignItems: "center", gap: 16 }}
                >
                    {/* Language — desktop */}
                    <div className="hidden lg:flex" style={{ alignItems: "center", gap: 4 }}>
                        <button style={{
                            padding: "6px 12px", borderRadius: 9999,
                            background: "rgba(255,255,255,0.08)", border: "none",
                            color: "#fff", fontSize: "0.75rem", fontWeight: 700,
                            letterSpacing: "0.12em", cursor: "pointer",
                            fontFamily: "var(--font-montserrat), sans-serif",
                        }}>FR</button>
                        <button style={{
                            padding: "6px 12px", borderRadius: 9999,
                            background: "transparent", border: "none",
                            color: "rgba(255,255,255,0.38)", fontSize: "0.75rem", fontWeight: 700,
                            letterSpacing: "0.12em", cursor: "pointer",
                            fontFamily: "var(--font-montserrat), sans-serif",
                            transition: "color 0.2s",
                        }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.38)"}
                        >EN</button>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="lg:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", padding: 8 }}
                    >
                        {mobileOpen ? (
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        ) : (
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
                        )}
                    </button>
                </motion.div>
            </div>

            {/* ── MOBILE MENU ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: "absolute",
                            top: "100%",
                            left: 16,
                            right: 16,
                            marginTop: 8,
                            borderRadius: 20,
                            background: "rgba(8,8,8,0.97)",
                            backdropFilter: "blur(24px)",
                            border: "1px solid rgba(212,175,55,0.15)",
                            boxShadow: "0 24px 60px rgba(0,0,0,0.8)",
                            overflow: "hidden",
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", padding: "20px 16px" }}>
                            {navItems.map((item, i) => (
                                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{
                                    display: "block",
                                    padding: "14px 16px",
                                    borderRadius: 12,
                                    color: pathname === item.href ? "#d4af37" : "rgba(255,255,255,0.8)",
                                    fontSize: "0.85rem",
                                    fontWeight: 700,
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase",
                                    textDecoration: "none",
                                    background: pathname === item.href ? "rgba(212,175,55,0.06)" : "transparent",
                                    fontFamily: "var(--font-montserrat), sans-serif",
                                    marginBottom: 4,
                                }}>
                                    {item.name}
                                </Link>
                            ))}
                            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 12, paddingTop: 16, display: "flex", gap: 8, justifyContent: "center" }}>
                                <button style={{ padding: "8px 20px", borderRadius: 9999, background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer", fontFamily: "var(--font-montserrat), sans-serif" }}>FR</button>
                                <button style={{ padding: "8px 20px", borderRadius: 9999, background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer", fontFamily: "var(--font-montserrat), sans-serif" }}>EN</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
