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

type ParticleLogoProps = {
    src: string;
    alt: string;
    className?: string;
    explode?: boolean;
    onExplodeComplete?: () => void;
    yOffset?: number;
};

const EXPLOSION_DURATION = 800;

export default function ParticleLogo({ src, alt, className, explode, onExplodeComplete, yOffset = 0 }: ParticleLogoProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const imgRef = useRef<HTMLImageElement | null>(null);
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
        notified: boolean;
    }>({ active: false, startTime: 0, notified: false });
    const onExplodeCompleteRef = useRef(onExplodeComplete);
    onExplodeCompleteRef.current = onExplodeComplete;

    const buildParticles = useCallback(() => {
        const wrapper = wrapperRef.current;
        const canvas = canvasRef.current;
        if (!wrapper || !canvas) return;

        if (imgRef.current) {
            imgRef.current.onload = null;
            imgRef.current = null;
        }

        const rect = wrapper.getBoundingClientRect();
        const width = Math.max(1, Math.floor(rect.width));
        const height = Math.max(1, Math.floor(rect.height));
        const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.floor(width * devicePixelRatio);
        canvas.height = Math.floor(height * devicePixelRatio);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const img = new Image();
        imgRef.current = img;
        img.crossOrigin = "anonymous";
        img.src = src;

        img.onload = () => {
            if (imgRef.current !== img) return;

            const sampleCanvas = document.createElement("canvas");
            sampleCanvas.width = width;
            sampleCanvas.height = height;
            const ctx = sampleCanvas.getContext("2d", { willReadFrequently: true });
            if (!ctx) return;

            const fitScale = Math.min(width / img.naturalWidth, height / img.naturalHeight) * 0.72;
            const drawW = img.naturalWidth * fitScale;
            const drawH = img.naturalHeight * fitScale;
            const drawX = (width - drawW) / 2;
            const drawY = (height - drawH) / 2 + yOffset;

            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, drawX, drawY, drawW, drawH);

            const imageData = ctx.getImageData(0, 0, width, height).data;
            const sampleStep = 3; // Optimized density
            const particles: Particle[] = [];

            for (let y = 0; y < height; y += sampleStep) {
                for (let x = 0; x < width; x += sampleStep) {
                    const alpha = imageData[(y * width + x) * 4 + 3];
                    if (alpha > 50) {
                        const baseX = x + (Math.random() - 0.5) * 1.5;
                        const baseY = y + (Math.random() - 0.5) * 1.5;
                        particles.push({
                            baseX,
                            baseY,
                            x: baseX,
                            y: baseY,
                            vx: 0,
                            vy: 0,
                            freeUntil: 0,
                            phase: Math.random() * Math.PI * 2,
                            size: 2.2 + Math.random() * 1.5, // Larger size to compensate for lower density
                            alpha: 0.65 + Math.random() * 0.3,
                        });
                    }
                }
            }

            particlesRef.current = particles;
        };
    }, [src]);

    useEffect(() => {
        buildParticles();
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        const resizeObserver = new ResizeObserver(buildParticles);
        resizeObserver.observe(wrapper);
        return () => resizeObserver.disconnect();
    }, [buildParticles]);

    useEffect(() => {
        if (!explode && explodeStateRef.current.active) {
            explodeStateRef.current.active = false;
            explodeStateRef.current.notified = false;
            particlesRef.current.forEach((particle) => {
                particle.freeUntil = 0;
            });
        }
    }, [explode]);

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
                        explodeState.notified = false;

                        const rect = canvas.getBoundingClientRect();
                        const cx = rect.width / 2;
                        const cy = rect.height / 2;
                        const maxDist = Math.sqrt(cx * cx + cy * cy);

                        particles.forEach((particle) => {
                            const dx = particle.x - cx;
                            const dy = particle.y - cy;
                            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                            const normalizedDist = Math.min(dist / maxDist, 1);
                            const speed = 4.5 + normalizedDist * 12.0 + Math.random() * 6.0;
                            const baseAngle = Math.atan2(dy, dx);
                            const angle = baseAngle + (Math.random() - 0.5) * 0.65;

                            particle.vx = Math.cos(angle) * speed * (0.8 + Math.random() * 0.4);
                            particle.vy = Math.sin(angle) * speed * (0.8 + Math.random() * 0.4);
                            particle.freeUntil = now + 999999;
                        });
                    }

                    if (explodeState.active) {
                        const elapsed = now - explodeState.startTime;
                        const t = Math.min(elapsed / EXPLOSION_DURATION, 1);

                        particles.forEach((particle) => {
                            // Gradual deceleration + subtle gravity for natural arc
                            particle.vx *= 0.974;
                            particle.vy *= 0.974;
                            particle.vy += 0.045;
                            particle.x += particle.vx;
                            particle.y += particle.vy;

                            // Staggered fade: each particle's phase (0–2π) maps to a 0–0.3 head start
                            const delay = (particle.phase / (Math.PI * 2)) * 0.3;
                            const fadeT = t <= delay ? 0 : Math.min(1, (t - delay) / (1 - delay));
                            const alphaMultiplier = Math.max(0, 1 - Math.pow(fadeT, 1.5));

                            if (alphaMultiplier > 0.01) {
                                context.globalAlpha = particle.alpha * alphaMultiplier;
                                context.fillRect(particle.x, particle.y, particle.size, particle.size);
                            }
                        });

                        context.globalAlpha = 1;

                        if (elapsed >= EXPLOSION_DURATION + 150 && !explodeState.notified) {
                            explodeState.notified = true;
                            onExplodeCompleteRef.current?.();
                        }
                    } else {
                        // Normal interactive physics (unchanged)
                        const timeSinceMove = now - pointer.lastMoveTime;
                        const movementEnergy =
                            pointer.active && timeSinceMove < 180
                                ? Math.max(0, pointer.speed - 0.01) * (1 - timeSinceMove / 180)
                                : 0;
                        const disruptionRadius = 90;
                        const carryRadius = 200;
                        const disruptionRadiusSq = disruptionRadius ** 2;
                        const carryRadiusSq = carryRadius ** 2;
                        const trail = pointer.trail;

                        particles.forEach((particle) => {
                            const homeX = particle.baseX - particle.x;
                            const homeY = particle.baseY - particle.y;
                            const returnDelay = Math.max(0, timeSinceMove - 50);
                            const canReturn = now > particle.freeUntil && movementEnergy === 0;
                            const returnForce = canReturn ? Math.min(returnDelay / 200, 1) * 0.15 : 0; // Faster reconstruction

                            particle.vx += homeX * returnForce;
                            particle.vy += homeY * returnForce;

                            if (canReturn) {
                                const breathe = Math.sin(now * 0.002 + particle.phase) * 0.04;
                                const drift = Math.cos(now * 0.0015 + particle.phase * 2.3) * 0.03;
                                const wander = Math.sin(now * 0.003 + particle.phase * 1.7) * 0.02;
                                particle.vx += breathe * 0.6 + drift;
                                particle.vy += breathe + wander;
                            }

                            if (movementEnergy > 0) {
                                let bestPoint: TrailPoint | null = null;
                                let bestDistanceSq = carryRadiusSq;

                                for (let i = trail.length - 1; i >= 0; i -= 1) {
                                    const point = trail[i];
                                    if (now - point.time > 700) break;
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
                                    const distance = Math.sqrt(bestDistanceSq);
                                    const disruptForce =
                                        bestDistanceSq < disruptionRadiusSq
                                            ? ((disruptionRadius - distance) / disruptionRadius) ** 2
                                            : 0;
                                    const carryForce = ((carryRadius - distance) / carryRadius) ** 2;
                                    const trailFade = 1 - Math.min((now - bestPoint.time) / 700, 1);
                                    const motionBoost = Math.min(bestPoint.speed * 0.22, 3.2);
                                    const directionalForce = carryForce * trailFade * (1.45 + motionBoost);
                                    const radialForce = disruptForce * 0.13;
                                    const shimmer = Math.sin(now * 0.0035 + particle.phase) * 0.035;

                                    particle.vx +=
                                        bestPoint.directionX * directionalForce +
                                        (pointerDx / distance) * radialForce +
                                        shimmer;
                                    particle.vy +=
                                        bestPoint.directionY * directionalForce +
                                        (pointerDy / distance) * radialForce -
                                        shimmer * 0.35;
                                    particle.freeUntil = now + 300;
                                }
                            }

                            const drag = movementEnergy > 0 || now < particle.freeUntil ? 0.985 : 0.82; // Original snap drag
                            particle.vx *= drag;
                            particle.vy *= drag;
                            particle.x += particle.vx;
                            particle.y += particle.vy;

                            context.globalAlpha = particle.alpha;
                            context.fillRect(particle.x, particle.y, particle.size, particle.size);
                        });

                        context.globalAlpha = 1;
                    }
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
            role="img"
            aria-label={alt}
            className={`relative cursor-default select-none ${className ?? ""}`}
            onPointerMove={(event) => {
                if (explodeStateRef.current.active) return;

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
                    pointer.trail = pointer.trail.filter((p) => now - p.time < 700).slice(-28);
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
            <canvas ref={canvasRef} aria-hidden="true" className="block w-full h-full" />
        </div>
    );
}
