"use client";

import Link from "next/link";

export default function SandButton({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="group relative px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-500 bg-black flex items-center justify-center overflow-hidden w-fit border border-[#d4af37]/60 hover:border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]">
            <div className="absolute inset-0 bg-[#eaddc5]/0 group-hover:bg-[#eaddc5]/10 transition-colors duration-500" />
            <span className="relative font-sans font-bold text-xs sm:text-sm tracking-wide" style={{
                background: "linear-gradient(180deg, #ffffff 0%, #eaddc5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0px 3px 5px rgba(0,0,0,0.9))"
            }}>
                {children}
            </span>
        </Link>
    );
}
