"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useLogoAnimation } from "./LogoAnimationContext";

const navItems = [
    { name: "Accueil", href: "/" },
    { name: "A propos", href: "/a-propos" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
];

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const { navLogoRef, navLogoVisible } = useLogoAnimation();

    const logoScale = useTransform(scrollY, [0, 80, 160], [1, 1.08, 1]);

    return (
        <div className="fixed top-0 left-0 right-0 z-110 px-4 sm:px-6 pt-2 sm:pt-3">

            {/* ── FLOATING NAVBAR ── */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="group relative w-full flex items-center justify-between px-4 md:px-6 py-1 rounded-xl overflow-hidden"
                style={{
                    background: "rgba(4, 4, 8, 0.55)",
                    backdropFilter: "blur(18px) saturate(160%)",
                    WebkitBackdropFilter: "blur(18px) saturate(160%)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
                    transition: "background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease",
                    isolation: "isolate",
                }}
            >
                {/* Bottom luminous ribbon — appears on navbar hover */}
                <div
                    className="absolute inset-x-0 bottom-0 h-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 15%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.3) 85%, transparent 100%)",
                    boxShadow: "0 0 12px 2px rgba(255,255,255,0.6), 0 0 30px 6px rgba(255,255,255,0.2)"
                    }}
                />

                {/* Inner ambient glow from top */}
                <div
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    style={{
                        background: "radial-gradient(ellipse 80% 40% at 50% -10%, rgba(255,255,255,0.04) 0%, transparent 70%)"
                    }}
                />

                {/* ── LOGO ── */}
                <motion.div
                    ref={navLogoRef}
                    style={{ scale: logoScale, transformOrigin: "left center" }}
                    className="shrink-0 relative z-10"
                    animate={{ opacity: navLogoVisible ? 1 : 0 }}
                    transition={{
                        opacity: {
                            duration: navLogoVisible ? 0.3 : 0,
                            ease: "easeOut",
                        },
                    }}
                >
                    <Link
                        href="/"
                        className="focus:outline-none relative block w-28 md:w-40 lg:w-72 h-11 md:h-14"
                    >
                        <Image
                            src="/SCALSET-1.ico"
                            alt="ScalSet Logo"
                            fill
                            sizes="(min-width: 1024px) 350px, (min-width: 768px) 176px, 128px"
                            className="object-contain object-left scale-[2.8] origin-left"
                            priority
                        />
                    </Link>
                </motion.div>

                {/* ── DESKTOP NAV ── */}
                <nav className="hidden md:flex items-center gap-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative group py-2"
                        >
                            <span
                                className="text-base font-bold tracking-[0.2em] uppercase transition-opacity duration-300 hover:opacity-70"
                                style={{ color: "#c8c8c8" }}
                            >
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </nav>

                {/* ── MOBILE TOGGLE ── */}
                <button
                    className="md:hidden text-slate-400 hover:text-white p-2 relative z-10 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={isMobileMenuOpen ? "close" : "open"}
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                        >
                            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </motion.span>
                    </AnimatePresence>
                </button>
            </motion.header>

            {/* ── MOBILE DROPDOWN ── */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-2 rounded-2xl overflow-hidden origin-top"
                        style={{
                            background: "rgba(6, 6, 12, 0.92)",
                            backdropFilter: "blur(28px) saturate(170%)",
                            WebkitBackdropFilter: "blur(28px) saturate(170%)",
                            border: "1px solid rgba(255,255,255,0.09)",
                            boxShadow: "0 24px 64px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08)",
                        }}
                    >
                        {/* Top reflective line */}
                        <div
                            className="h-px w-full pointer-events-none"
                            style={{
                                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18) 50%, transparent)"
                            }}
                        />

                        <div className="flex flex-col items-center gap-1 py-5 px-3">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.055, duration: 0.2, ease: "easeOut" }}
                                    className="w-full"
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block text-center py-3 px-4 text-[11px] font-semibold tracking-[0.2em] uppercase text-slate-400 hover:text-white transition-colors duration-200 rounded-xl hover:bg-white/5"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
