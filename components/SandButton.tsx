"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
};

export default function SandButton({ href, children }: { href: string; children: React.ReactNode }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const particlesRef = useRef<Particle[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const render = () => {
            animationFrameId = requestAnimationFrame(render);
            
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = canvas.getBoundingClientRect();
            
            if (canvas.width !== Math.floor(rect.width * dpr) || canvas.height !== Math.floor(rect.height * dpr)) {
                canvas.width = Math.floor(rect.width * dpr);
                canvas.height = Math.floor(rect.height * dpr);
                ctx.scale(dpr, dpr);
            }

            ctx.clearRect(0, 0, rect.width, rect.height);

            const pad = 30;
            const btnW = rect.width - pad * 2;
            const btnH = rect.height - pad * 2;
            const r = btnH / 2; 

            // Glow Border
            ctx.beginPath();
            ctx.roundRect(pad, pad, btnW, btnH, r);
            ctx.strokeStyle = isHovered ? "rgba(226, 232, 240, 1)" : "rgba(148, 163, 184, 0.4)";
            ctx.lineWidth = isHovered ? 2 : 1;
            ctx.shadowColor = "rgba(226, 232, 240, 0.9)";
            ctx.shadowBlur = isHovered ? 18 : 0;
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Spawn particles if hovered
            if (isHovered) {
                for (let i = 0; i < 14; i++) { // Increased particle count for finer dust
                    const perimeter = 2 * (btnW - 2 * r) + 2 * Math.PI * r;
                    let p = Math.random() * perimeter;
                    let px, py;
                    
                    if (p < btnW - 2 * r) {
                        px = pad + r + p;
                        py = pad;
                    } else if (p < 2 * (btnW - 2 * r)) {
                        px = pad + r + (p - (btnW - 2 * r));
                        py = pad + btnH;
                    } else {
                        const isLeft = Math.random() > 0.5;
                        const angle = Math.random() * Math.PI;
                        const cx = isLeft ? pad + r : pad + btnW - r;
                        const cy = pad + r;
                        px = cx + Math.cos(angle + (isLeft ? Math.PI / 2 : -Math.PI / 2)) * r;
                        py = cy + Math.sin(angle + (isLeft ? Math.PI / 2 : -Math.PI / 2)) * r;
                    }

                    const centerX = pad + btnW / 2;
                    const centerY = pad + btnH / 2;
                    const dx = px - centerX;
                    const dy = py - centerY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    particlesRef.current.push({
                        x: px,
                        y: py,
                        vx: (dx / dist) * (1.5 + Math.random() * 2) + (Math.random() - 0.5) * 0.5,
                        vy: (dy / dist) * (1.5 + Math.random() * 2) + (Math.random() - 0.5) * 0.5 - 0.5,
                        life: 0,
                        maxLife: 20 + Math.random() * 30,
                        size: 0.4 + Math.random() * 0.8 // Reduced size for very fine sand
                    });
                }
            }

            particlesRef.current.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.96; // drag
                p.vy *= 0.96;
                p.life++;
            });

            particlesRef.current = particlesRef.current.filter(p => p.life < p.maxLife);

            particlesRef.current.forEach(p => {
                const alpha = 1 - Math.pow(p.life / p.maxLife, 1.5);
                ctx.globalAlpha = alpha;
                ctx.fillStyle = "rgba(226, 232, 240, 1)";
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
        };

        render();

        return () => cancelAnimationFrame(animationFrameId);
    }, [isHovered]);

    return (
        <Link
            href={href}
            className="relative inline-flex items-center justify-center group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            <div className="relative px-6 py-3 md:px-8 md:py-3.5 flex items-center justify-center">
                <canvas
                    ref={canvasRef}
                    className="absolute pointer-events-none"
                    style={{ 
                        top: '-30px', 
                        left: '-30px', 
                        right: '-30px', 
                        bottom: '-30px',
                        width: 'calc(100% + 60px)',
                        height: 'calc(100% + 60px)'
                    }}
                />
                <div className="relative z-10 flex items-center gap-2 md:gap-3 text-white font-medium text-base md:text-lg tracking-wide transition-all">
                    {children}
                </div>
            </div>
        </Link>
    );
}
