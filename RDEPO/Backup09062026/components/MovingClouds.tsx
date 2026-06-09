"use client";

import { useEffect, useRef } from "react";

// speed = vw per frame at 60fps. startX = initial position in vw (>100 = off-screen right)
const CLOUDS = [
    { w: 950, h: 170, top: "3%",  opacity: 0.38, speed: 0.035, startX:  110, blur: 55 },
    { w: 720, h: 135, top: "13%", opacity: 0.30, speed: 0.055, startX:   45, blur: 45 },
    { w: 1050,h: 190, top: "21%", opacity: 0.25, speed: 0.025, startX:   75, blur: 65 },
    { w: 620, h: 115, top: "7%",  opacity: 0.33, speed: 0.070, startX:  -15, blur: 40 },
    { w: 830, h: 155, top: "28%", opacity: 0.20, speed: 0.042, startX:   20, blur: 52 },
    { w: 510, h: 105, top: "1%",  opacity: 0.28, speed: 0.060, startX:  -50, blur: 38 },
    { w: 770, h: 145, top: "17%", opacity: 0.22, speed: 0.032, startX:  -30, blur: 58 },
];

export default function MovingClouds() {
    const refs = useRef<(HTMLDivElement | null)[]>([]);
    const positions = useRef<number[]>(CLOUDS.map(c => c.startX));
    const raf = useRef<number>(0);

    useEffect(() => {
        const tick = () => {
            positions.current = positions.current.map((x, i) => {
                const next = x - CLOUDS[i].speed;
                return next < -130 ? 115 : next;
            });
            positions.current.forEach((x, i) => {
                const el = refs.current[i];
                if (el) el.style.transform = `translateX(${x}vw)`;
            });
            raf.current = requestAnimationFrame(tick);
        };

        raf.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf.current);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            {CLOUDS.map((c, i) => (
                <div
                    key={i}
                    ref={el => { refs.current[i] = el; }}
                    style={{
                        position: "absolute",
                        top: c.top,
                        width: c.w,
                        height: c.h,
                        opacity: c.opacity,
                        filter: `blur(${c.blur}px)`,
                        borderRadius: "50%",
                        background:
                            "radial-gradient(ellipse at 40% 50%, rgba(70,50,25,0.95) 0%, rgba(45,32,15,0.7) 45%, transparent 100%)",
                        transform: `translateX(${c.startX}vw)`,
                        willChange: "transform",
                    }}
                />
            ))}
        </div>
    );
}
