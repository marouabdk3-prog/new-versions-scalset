"use client";

import { useCallback, useEffect, useRef } from "react";

type Particle = {
    baseX: number;
    baseY: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    freeUntil: number;
    phase: number;
    size: number;
    alpha: number;
};

type TrailPoint = {
    x: number;
    y: number;
    directionX: number;
    directionY: number;
    speed: number;
    time: number;
};

type ParticleTextProps = {
    lines: string[];
    ariaLabel: string;
    className: string;
    yOffset?: number;
    explode?: boolean;
};

export default function ParticleText({ lines, ariaLabel, className, yOffset = 0, explode }: ParticleTextProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const pointerRef = useRef({
        active: false,
        x: 0,
        y: 0,
        speed: 0,
        directionX: 0,
        directionY: 0,
        lastMoveTime: 0,
        previousX: 0,
        previousY: 0,
        previousTime: 0,
        trail: [] as TrailPoint[],
    });
    const explodeRef = useRef(explode);
    explodeRef.current = explode;

    const explodeStateRef = useRef<{
        active: boolean;
        startTime: number;
    }>({ active: false, startTime: 0 });

    const buildParticles = useCallback(() => {
        const wrapper = wrapperRef.current;
        const text = textRef.current;
        const canvas = canvasRef.current;

        if (!wrapper || !text || !canvas) {
            return;
        }

        const rect = wrapper.getBoundingClientRect();
        const textRect = text.getBoundingClientRect();
        const width = Math.max(1, Math.floor(rect.width));
        const height = Math.max(1, Math.floor(rect.height));
        const textOffsetX = textRect.left - rect.left;
        const textOffsetY = textRect.top - rect.top;
        const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.floor(width * devicePixelRatio);
        canvas.height = Math.floor(height * devicePixelRatio);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const computed = window.getComputedStyle(text);
        const fontSize = Number.parseFloat(computed.fontSize) || 48;
        const parsedLineHeight = Number.parseFloat(computed.lineHeight);
        const lineHeight = Number.isFinite(parsedLineHeight) ? parsedLineHeight : fontSize * 1.2;

        const sampleCanvas = document.createElement("canvas");
        sampleCanvas.width = width;
        sampleCanvas.height = height;

        const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true });
        if (!sampleContext) {
            return;
        }

        sampleContext.clearRect(0, 0, width, height);
        sampleContext.font = `${computed.fontStyle} ${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`;
        sampleContext.textAlign = "center";
        sampleContext.textBaseline = "middle";
        sampleContext.fillStyle = "#ffffff";

        const firstLineY = textOffsetY + textRect.height / 2 - ((lines.length - 1) * lineHeight) / 2 + yOffset;
        lines.forEach((line, index) => {
            sampleContext.fillText(line, textOffsetX + textRect.width / 2, firstLineY + index * lineHeight);
        });

        const imageData = sampleContext.getImageData(0, 0, width, height).data;
        const sampleStep = 2;
        const particles: Particle[] = [];

        for (let y = 0; y < height; y += sampleStep) {
            for (let x = 0; x < width; x += sampleStep) {
                const alpha = imageData[(y * width + x) * 4 + 3];

                if (alpha > 30) {
                    const baseX = x + (Math.random() - 0.5) * 1.2;
                    const baseY = y + (Math.random() - 0.5) * 1.2;

                    particles.push({
                        baseX,
                        baseY,
                        x: baseX,
                        y: baseY,
                        vx: 0,
                        vy: 0,
                        freeUntil: 0,
                        phase: Math.random() * Math.PI * 2,
                        size: 1.2 + Math.random() * 1.6,
alpha: 0.65 + Math.random() * 0.32,

                    });
                }
            }
        }

        particlesRef.current = particles;
    }, [lines]);

    // Lazy init: build particles only when section enters viewport
    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        let initialized = false;

        const intersectionObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !initialized) {
                    initialized = true;
                    buildParticles();
                    void document.fonts?.ready.then(buildParticles);
                }
            },
            { threshold: 0.05 }
        );
        intersectionObserver.observe(wrapper);

        const resizeObserver = new ResizeObserver(() => {
            if (initialized) buildParticles();
        });
        resizeObserver.observe(wrapper);

        return () => {
            intersectionObserver.disconnect();
            resizeObserver.disconnect();
        };
    }, [buildParticles]);

    useEffect(() => {
        if (explode) {
            // Trigger explosion state immediately if possible
            if (!explodeStateRef.current.active) {
                explodeStateRef.current = { active: true, startTime: performance.now() };
            }

            // Assign velocities to particles if they exist
            if (particlesRef.current.length > 0) {
                const now = performance.now();
                const wrapper = wrapperRef.current;
                if (!wrapper) return;
                const rect = wrapper.getBoundingClientRect();
                const cx = rect.width / 2;
                const cy = rect.height / 2;

                particlesRef.current.forEach((particle) => {
                    if (particle.freeUntil > now) return; // Already exploding
                    const dx = particle.x - cx;
                    const dy = particle.y - cy;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    const speed = 5.0 + (dist / 180) * 12.0 + Math.random() * 6.0;
                    const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.4;

                    particle.vx = Math.cos(angle) * speed;
                    particle.vy = Math.sin(angle) * speed;
                    particle.freeUntil = now + 999999;
                });
            }
        } else {
            if (explodeStateRef.current.active) {
                explodeStateRef.current.active = false;
                particlesRef.current.forEach((particle) => {
                    particle.freeUntil = 0;
                });
            }
        }
    }, [explode]);

    // Draw loop: pause when scrolled out of view, resume when visible
    useEffect(() => {
        let animationFrame = 0;
        let loopRunning = false;

        const draw = () => {
            if (!loopRunning) return;
            const canvas = canvasRef.current;
            const particles = particlesRef.current;
            const now = performance.now();
            const pointer = pointerRef.current;
            const explodeState = explodeStateRef.current;
            const timeSinceMove = now - pointer.lastMoveTime;
            const movementEnergy = pointer.active && timeSinceMove < 180
                ? Math.max(0, pointer.speed - 0.01) * (1 - timeSinceMove / 180)
                : 0;
            const disruptionRadius = 104;
            const carryRadius = 240;
            const disruptionRadiusSq = disruptionRadius * disruptionRadius;
            const carryRadiusSq = carryRadius * carryRadius;
            const trail = pointer.trail;

            if (canvas) {
                const context = canvas.getContext("2d");
                const ratio = canvas.width / Math.max(1, canvas.getBoundingClientRect().width);

                if (context) {
                    context.setTransform(ratio, 0, 0, ratio, 0, 0);
                    context.clearRect(0, 0, canvas.width / ratio, canvas.height / ratio);
                    context.fillStyle = "#E2E8F0";

                    if (explodeRef.current && !explodeState.active && particles.length > 0) {
                        explodeState.active = true;
                        explodeState.startTime = now;

                        const rect = canvas.getBoundingClientRect();
                        const cx = rect.width / 2;
                        const cy = rect.height / 2;

                        particles.forEach((particle) => {
                            if (particle.freeUntil > now) return;
                            const dx = particle.x - cx;
                            const dy = particle.y - cy;
                            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                            const speed = 5.0 + (dist / 180) * 12.0 + Math.random() * 6.0;
                            const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.4;
                            particle.vx = Math.cos(angle) * speed;
                            particle.vy = Math.sin(angle) * speed;
                            particle.freeUntil = now + 999999;
                        });
                    }

                    if (explodeState.active) {
                        const elapsed = now - explodeState.startTime;
                        const t = Math.min(elapsed / 800, 1);

                        particles.forEach((particle) => {
                            particle.vx *= 0.97;
                            particle.vy *= 0.97;
                            particle.vy += 0.04;
                            particle.x += particle.vx;
                            particle.y += particle.vy;

                            const alphaMultiplier = Math.max(0, 1 - Math.pow(t, 1.5));
                            if (alphaMultiplier > 0.01) {
                                context.globalAlpha = particle.alpha * alphaMultiplier;
                                context.beginPath();
                                context.arc(particle.x + particle.size / 2, particle.y + particle.size / 2, particle.size / 2, 0, Math.PI * 2);
                                context.fill();
                            }
                        });
                    } else {
                        particles.forEach((particle) => {
                        const homeX = particle.baseX - particle.x;
                        const homeY = particle.baseY - particle.y;
                        const returnDelay = Math.max(0, timeSinceMove - 50);
                        const canReturn = now > particle.freeUntil && movementEnergy === 0;
                        const returnForce = canReturn ? Math.min(returnDelay / 200, 1) * 0.18 : 0;

                        particle.vx += homeX * returnForce;
                        particle.vy += homeY * returnForce;

                        if (movementEnergy > 0) {
                            let bestPoint: TrailPoint | null = null;
                            let bestDistanceSq = carryRadiusSq;

                            for (let i = trail.length - 1; i >= 0; i -= 1) {
                                const point = trail[i];
                                const age = now - point.time;

                                if (age > 700) {
                                    break;
                                }

                                const dx = particle.x - point.x;
                                const dy = particle.y - point.y;
                                const distanceSq = dx * dx + dy * dy;

                                if (distanceSq < bestDistanceSq) {
                                    bestDistanceSq = distanceSq;
                                    bestPoint = point;
                                }
                            }

                            if (bestPoint && bestDistanceSq > 0) {
                                const pointerDx = particle.x - bestPoint.x;
                                const pointerDy = particle.y - bestPoint.y;
                                const distanceSq = bestDistanceSq;
                                const distance = Math.sqrt(distanceSq);
                                const disruptForce = distanceSq < disruptionRadiusSq
                                    ? ((disruptionRadius - distance) / disruptionRadius) ** 2
                                    : 0;
                                const carryForce = ((carryRadius - distance) / carryRadius) ** 2;
                                const trailAge = Math.max(0, now - bestPoint.time);
                                const trailFade = 1 - Math.min(trailAge / 700, 1);
                                const motionBoost = Math.min(bestPoint.speed * 0.22, 3.2);
                                const directionalForce = carryForce * trailFade * (1.45 + motionBoost);
                                const radialForce = disruptForce * 0.13;
                                const shimmer = Math.sin(now * 0.0035 + particle.phase) * 0.035;

                                particle.vx += bestPoint.directionX * directionalForce + (pointerDx / distance) * radialForce + shimmer;
                                particle.vy += bestPoint.directionY * directionalForce + (pointerDy / distance) * radialForce - shimmer * 0.35;
                                particle.freeUntil = now + 1100;
                            }
                        }

                        const drag = movementEnergy > 0 || now < particle.freeUntil ? 0.985 : 0.82;
                        particle.vx *= drag;
                        particle.vy *= drag;
                        particle.x += particle.vx;
                        particle.y += particle.vy;

                        context.globalAlpha = particle.alpha;
                        context.beginPath();
                        context.arc(particle.x + particle.size / 2, particle.y + particle.size / 2, particle.size / 2, 0, Math.PI * 2);
                        context.fill();
                    });
                }

                    context.globalAlpha = 1;
                }
            }

            animationFrame = requestAnimationFrame(draw);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loopRunning) {
                    loopRunning = true;
                    animationFrame = requestAnimationFrame(draw);
                } else if (!entries[0].isIntersecting && loopRunning) {
                    loopRunning = false;
                    cancelAnimationFrame(animationFrame);
                }
            },
            { threshold: 0 }
        );

        const wrapper = wrapperRef.current;
        if (wrapper) observer.observe(wrapper);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <div
            ref={wrapperRef}
            role="heading"
            aria-level={2}
            aria-label={ariaLabel}
            className="absolute inset-0 left-1/2 min-h-screen w-screen max-w-none -translate-x-1/2 cursor-default select-none"
            onPointerMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const now = performance.now();
                const pointer = pointerRef.current;
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                const elapsed = Math.max(16, now - pointer.previousTime);
                const movementX = x - pointer.previousX;
                const movementY = y - pointer.previousY;
                const movementDistance = Math.hypot(movementX, movementY);

                pointer.active = true;
                pointer.x = x;
                pointer.y = y;
                pointer.speed = movementDistance / elapsed;
                if (movementDistance > 0) {
                    pointer.directionX = movementX / movementDistance;
                    pointer.directionY = movementY / movementDistance;
                }
                pointer.lastMoveTime = now;

                if (movementDistance > 2) {
                    pointer.trail.push({
                        x,
                        y,
                        directionX: pointer.directionX,
                        directionY: pointer.directionY,
                        speed: pointer.speed,
                        time: now,
                    });
                    pointer.trail = pointer.trail.filter((point) => now - point.time < 700).slice(-28);
                }

                pointer.previousX = x;
                pointer.previousY = y;
                pointer.previousTime = now;
            }}
            onPointerLeave={() => {
                pointerRef.current.active = false;
                pointerRef.current.speed = 0;
                pointerRef.current.trail = [];
            }}
        >
            <h2 ref={textRef} aria-hidden="true" className={`${className} absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 opacity-0`}>
                {lines.map((line, index) => (
                    <span key={line}>
                        {line}
                        {index < lines.length - 1 ? <br /> : null}
                    </span>
                ))}
            </h2>
            <canvas aria-hidden="true" ref={canvasRef} className="absolute inset-0 h-full w-full" />
        </div>
    );
}
