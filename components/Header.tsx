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

    // Subtle scale pulse in first 160px of scroll, then resets to 1
    const logoScale = useTransform(scrollY, [0, 80, 160], [1, 1.08, 1]);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-3 bg-gradient-to-b from-[#090911]/90 to-transparent backdrop-blur-[2px]"
        >
            {/* Logo — hidden during rocket launch, revealed on arrival */}
            <motion.div
                ref={navLogoRef}
                style={{ scale: logoScale, transformOrigin: "left center" }}
                className="flex-shrink-0"
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
                    className="focus:outline-none relative block w-32 md:w-44 sm:w-70 lg:w-[21.8rem] h-15 md:h-20 flex items-center"
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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="relative group py-2"
                    >
                        <motion.span
                            initial="rest"
                            whileHover="hover"
                            animate="rest"
                            className="text-sm font-bold text-neutral-400 group-hover:text-white transition-colors relative flex flex-col items-center"
                        >
                            <motion.span
                                variants={{
                                    rest: { y: 0 },
                                    hover: { y: -2 }
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                {item.name}
                            </motion.span>
                            <motion.span
                                className="absolute -bottom-1 left-0 w-full h-0.5 bg-white origin-left"
                                variants={{
                                    rest: { scaleX: 0 },
                                    hover: { scaleX: 1 }
                                }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                        </motion.span>
                    </Link>
                ))}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
                className="md:hidden text-white p-2 relative z-50"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-full left-0 right-0 bg-[#090911]/95 backdrop-blur-md border-b border-white/10 flex flex-col items-center gap-4 py-8 md:hidden z-40 overflow-hidden"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-xl font-bold text-neutral-400 hover:text-white transition-colors py-2 w-full text-center"
                            >
                                <motion.span
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-block"
                                >
                                    {item.name}
                                </motion.span>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
