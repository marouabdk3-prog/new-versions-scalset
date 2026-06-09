"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Info, ShoppingBag, Phone } from "lucide-react";
import { useLogoAnimation } from "./LogoAnimationContext";

const navItems = [
    { name: "Accueil", href: "/", icon: Home },
    { name: "A propos", href: "/a-propos", icon: Info },
    { name: "Services", href: "/services", icon: ShoppingBag },
    { name: "Contact", href: "/contact", icon: Phone },
];

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const [isFloating, setIsFloating] = useState(false);
    const { navLogoRef, navLogoVisible } = useLogoAnimation();
    const pathname = usePathname();

    useEffect(() => {
        return scrollY.onChange((latest) => {
            setIsFloating(latest > 50);
        });
    }, [scrollY]);

    const logoScale = useTransform(scrollY, [0, 80, 160], [1, 1.08, 1]);

    return (
        <div className={`fixed left-0 right-0 z-[110] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isFloating ? "top-0 py-4 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 shadow-xl" : "top-0 py-6 md:py-8 bg-transparent"}`}>
            
            <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between relative">
                
                {/* ── LOGO ── */}
                <motion.div
                    ref={navLogoRef}
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: navLogoVisible ? 1 : 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    style={{ scale: logoScale, transformOrigin: "left center" }}
                    className="shrink-0 relative z-10 w-28 md:w-36 h-10 md:h-12"
                >
                    <Link href="/" className="focus:outline-none relative block w-full h-full">
                        <Image
                            src="/100.svg"
                            alt="ScalSet Logo"
                            fill
                            sizes="(min-width: 768px) 144px, 112px"
                            className="object-contain object-left drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]"
                            priority
                        />
                    </Link>
                </motion.div>

                {/* ── DESKTOP NAV ── */}
                <motion.nav 
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2"
                >
                    <div className="flex items-center gap-6 xl:gap-10">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link key={item.href} href={item.href} className="group flex items-center gap-2">
                                    <div className={`flex items-center justify-center rounded-full transition-all duration-500 ${isActive ? 'w-10 h-10 border border-[#d4af37]' : 'w-10 h-10 border border-transparent'}`}>
                                        <Icon size={18} strokeWidth={1.5} className="text-white group-hover:text-[#d4af37] transition-colors duration-300" />
                                    </div>
                                    <span className={`text-[13px] xl:text-[14px] font-bold tracking-[0.12em] uppercase transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#f4f4f4] group-hover:text-[#d4af37]'}`}>
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </motion.nav>

                {/* ── RIGHT SECTION (Lang & Mobile Toggle) ── */}
                <motion.div 
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="flex items-center justify-end"
                >
                    {/* Language Switcher */}
                    <div className="hidden lg:flex items-center gap-5 h-8">
                        <button className="text-white font-bold text-[14px] tracking-wide border-b-[2px] border-white pb-0.5">
                            FR
                        </button>
                        <button className="text-white/50 hover:text-white font-bold text-[14px] tracking-wide transition-colors pb-0.5 border-b-[2px] border-transparent">
                            EN
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden text-white p-2 relative z-10 transition-colors duration-200"
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
                                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                            </motion.span>
                        </AnimatePresence>
                    </button>
                </motion.div>
            </div>

            {/* ── MOBILE DROPDOWN ── */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-[100%] left-4 right-4 rounded-2xl overflow-hidden origin-top mt-2"
                        style={{
                            background: "rgba(10, 10, 10, 0.95)",
                            backdropFilter: "blur(28px) saturate(170%)",
                            WebkitBackdropFilter: "blur(28px) saturate(170%)",
                            border: "1px solid rgba(212,175,55,0.2)",
                            boxShadow: "0 24px 64px rgba(0,0,0,0.8), inset 0 1px 0 rgba(212,175,55,0.2)",
                        }}
                    >
                        <div className="flex flex-col gap-2 py-6 px-4">
                            {navItems.map((item, i) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <motion.div key={item.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05, duration: 0.2 }} className="w-full">
                                        <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)}
                                            className={`flex items-center gap-4 py-3 px-4 rounded-xl transition-colors duration-200 ${isActive ? 'bg-white/5' : 'hover:bg-white/5'}`}>
                                            <div className={`flex items-center justify-center rounded-full ${isActive ? 'w-10 h-10 border border-[#d4af37]' : 'w-10 h-10 border border-transparent'}`}>
                                                <Icon size={18} strokeWidth={1.5} className="text-white" />
                                            </div>
                                            <span className="text-[13px] font-bold tracking-[0.15em] uppercase text-white">
                                                {item.name}
                                            </span>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                            
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-8">
                                <button className="text-white font-bold text-[14px] tracking-wide border-b-[2px] border-[#d4af37] pb-0.5">
                                    FR
                                </button>
                                <button className="text-white/50 hover:text-white font-bold text-[14px] tracking-wide transition-colors pb-0.5 border-b-[2px] border-transparent">
                                    EN
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
