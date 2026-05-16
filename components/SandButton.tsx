"use client";

import Link from "next/link";

export default function SandButton({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="relative inline-flex items-center justify-center group cursor-pointer"
        >
            {/* Ambient Gold Glow around the button */}
            <div className="absolute inset-0 rounded-[999px] bg-[#d4af37]/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Metallic Border Container */}
            <div 
                className="relative rounded-[999px] p-[2px] shadow-[0_10px_30px_rgba(212,175,55,0.4)] group-hover:shadow-[0_15px_40px_rgba(212,175,55,0.6)] transition-all duration-300"
                style={{
                    background: "linear-gradient(180deg, #ffffff 0%, #a3a3a3 20%, #4d4d4d 50%, #d4af37 80%, #ffdf73 100%)"
                }}
            >
                {/* Inner Dark Background */}
                <div className="relative px-8 py-3 md:px-12 md:py-4 flex items-center justify-center rounded-[999px] bg-gradient-to-b from-black/80 to-[#1a1a1a] backdrop-blur-md">
                    
                    {/* Metallic Inner Shadow for bevel effect */}
                    <div className="absolute inset-0 rounded-[999px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),inset_0_-1px_3px_rgba(212,175,55,0.3)] pointer-events-none" />

                    {/* Content with Metallic Text Effect */}
                    <div 
                        className="relative z-10 flex items-center gap-3 font-bold text-lg md:text-xl lg:text-2xl tracking-wide transition-transform duration-300 group-hover:scale-[1.03]"
                        style={{
                            background: "linear-gradient(180deg, #ffffff 0%, #a3a3a3 25%, #4d4d4d 45%, #2b2b2b 50%, #8c8c8c 55%, #e6e6e6 80%, #d4af37 100%)",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                            filter: "drop-shadow(0px 1px 1px rgba(255,255,255,0.4)) drop-shadow(0px 2px 2px rgba(0,0,0,0.8)) drop-shadow(0px 4px 6px rgba(0,0,0,0.9))"
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Link>
    );
}
