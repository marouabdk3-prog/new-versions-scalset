"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, type CSSProperties } from "react";

const ORBS = [
    { x: "10%", y: "15%", size: 380, duration: 14, delay: 0, parallax: 20 },
    { x: "65%", y: "55%", size: 480, duration: 19, delay: -6, parallax: -15 },
    { x: "40%", y: "78%", size: 300, duration: 23, delay: -11, parallax: 25 },
];

export default function OrbField() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 }); // Current interpolated mouse pos
    const targetRef = useRef({ x: 0, y: 0 }); // Target mouse pos from event
    const rafRef = useRef<number | null>(null);
    const containerStyle: CSSProperties & Record<"--mouse-x" | "--mouse-y", string> = {
        position: "fixed",
        inset: 0,
        zIndex: -2,
        pointerEvents: "none",
        background: "#000",
        "--mouse-x": "0",
        "--mouse-y": "0",
    };

    useEffect(() => {
        const pointerQuery = window.matchMedia("(pointer: fine)");
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

        if (!pointerQuery.matches || motionQuery.matches) {
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            // Normalized mouse coordinates -1 to 1
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            targetRef.current = { x, y };
        };

        const tick = () => {
            // Smoothly interpolate towards target
            mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.05;
            mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.05;

            // Update CSS variables on the container ref directly
            // This bypasses React's render cycle completely
            if (containerRef.current) {
                containerRef.current.style.setProperty('--mouse-x', mouseRef.current.x.toString());
                containerRef.current.style.setProperty('--mouse-y', mouseRef.current.y.toString());
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={containerStyle}
        >
            {ORBS.map((o, i) => (
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        left: o.x,
                        top: o.y,
                        width: o.size,
                        height: o.size,
                        transform: `translate(calc(var(--mouse-x) * ${o.parallax}px), calc(var(--mouse-y) * ${o.parallax}px))`,
                        willChange: "transform",
                    }}
                >
                    <img
                        className="orb-field-bubble"
                        src="/glob.gif"
                        style={{
                            width: "100%",
                            height: "100%",
                            mixBlendMode: "screen",
                            opacity: 0.75,
                            animation: `floatOrb ${o.duration}s ease-in-out ${o.delay}s infinite alternate`,
                            willChange: "transform",
                        }}
                        alt=""
                        aria-hidden="true"
                        decoding="async"
                    />
                </div>
            ))}

            <style>{`
                @keyframes floatOrb {
                    0%   { transform: translate(0px, 0px) scale(1); }
                    33%  { transform: translate(30px, -40px) scale(1.04); }
                    66%  { transform: translate(-25px, 30px) scale(0.97); }
                    100% { transform: translate(20px, -20px) scale(1.02); }
                }

                @media (prefers-reduced-motion: reduce) {
                    .orb-field-bubble {
                        animation: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
