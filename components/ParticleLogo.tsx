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
    delay: number;
    isLocked: boolean;
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
    
    const constructionStartTimeRef = useRef<number>(0);
    const initializedRef = useRef(false);

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

            const isPortraitMobile = width < 768 && height > width;
            const isLandscapeMobile = height < 500;

            const w = window.innerWidth;
            const aspect = width / height;
            const isSquareish = aspect < 1.1;

            let mobileScale = 0.72; // Desktop Default
            if (w <= 1024 || isSquareish) {
                // More flexible scaling based on aspect ratio
                const baseScale = isPortraitMobile ? 0.55 : (isLandscapeMobile ? 0.42 : 0.60);
                mobileScale = Math.min(baseScale, aspect * 0.85);
            }

            const fitScale = Math.min(width / img.naturalWidth, height / img.naturalHeight) * mobileScale;
            const drawW = img.naturalWidth * fitScale;
            const drawH = img.naturalHeight * fitScale;
            const drawX = (width - drawW) / 2;
            const drawY = (height - drawH) / 2 + yOffset;

            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, drawX, drawY, drawW, drawH);

            const imageData = ctx.getImageData(0, 0, width, height).data;
            const sampleStep = 1; // Extremely high density for fine dust
            const particles: Particle[] = [];

            for (let y = 0; y < height; y += sampleStep) {
                for (let x = 0; x < width; x += sampleStep) {
                    const alpha = imageData[(y * width + x) * 4 + 3];
                    if (alpha > 60) { // Higher threshold to keep it crisp
                        const baseX = x + (Math.random() - 0.5) * 0.5;
                        const baseY = y + (Math.random() - 0.5) * 0.5;
                        particles.push({
                            baseX,
                            baseY,
                            // Start from the right side, off-screen, slightly scattered vertically
                            x: width + Math.random() * width * 0.8,
                            y: baseY + (Math.random() - 0.5) * height * 0.5,
                            vx: -Math.random() * 0.5,
                            vy: (Math.random() - 0.5) * 0.2,
                            freeUntil: 0,
                            phase: Math.random() * Math.PI * 2,
                            // Very fine, small particles
                            size: (0.6 + Math.random() * 1.0) * (window.innerWidth < 768 ? 0.7 : 1.0),
                            alpha: 0.3 + Math.random() * 0.4,
                            // Sequential delay for gathering from right to left
                            delay: (x / width) * 1200 + Math.random() * 400,
                            isLocked: false,
                        });
                    }
                }
            }

            particlesRef.current = particles;
            
            // Reset initialization so the animation restarts properly if particles are rebuilt
            initializedRef.current = false;
        };
    }, [src]);

    useEffect(() => {
        buildParticles();
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        let resizeTimeout: NodeJS.Timeout;
        const resizeObserver = new ResizeObserver(() => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => buildParticles(), 200);
        });
        resizeObserver.observe(wrapper);
        return () => {
            resizeObserver.disconnect();
            clearTimeout(resizeTimeout);
        };
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

        const circleCanvas = document.createElement("canvas");
        circleCanvas.width = 16;
        circleCanvas.height = 16;
        const cCtx = circleCanvas.getContext("2d");
        if (cCtx) {
            cCtx.beginPath();
            cCtx.arc(8, 8, 7.5, 0, Math.PI * 2);
            cCtx.fillStyle = "#ffffff"; // Pure white for fine dust
            cCtx.fill();
        }

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
                                context.drawImage(circleCanvas, particle.x, particle.y, particle.size, particle.size);
                            }
                        });

                        context.globalAlpha = 1;

                        if (elapsed >= EXPLOSION_DURATION + 150 && !explodeState.notified) {
                            explodeState.notified = true;
                            onExplodeCompleteRef.current?.();
                        }
                    } else {
                        const now = performance.now();
                        const elapsedConstruction = now - constructionStartTimeRef.current;

                        particles.forEach((particle) => {
                            const particleElapsed = elapsedConstruction - particle.delay;

                            // 1. AMBIENT DRIFT
                            if (particleElapsed < 0) {
                                // Drift slowly to the left
                                particle.x -= 0.15 + Math.random() * 0.1;
                                particle.y += Math.cos(now * 0.001 + particle.phase) * 0.05;
                                
                                context.globalAlpha = particle.alpha * 0.2; // Very faded while drifting
                                context.drawImage(circleCanvas, particle.x, particle.y, particle.size, particle.size);
                                return;
                            }

                            const dx = particle.baseX - particle.x;
                            const dy = particle.baseY - particle.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);

                            // 2. MAGNETIC ATTRACTION PHASE
                            if (!particle.isLocked) {
                                const gatherT = Math.min(particleElapsed / 1000, 1);
                                // Very soft ease-out for a gentle landing
                                const ease = 1 - Math.pow(1 - gatherT, 4);
                                
                                const pullForce = 0.015 + ease * 0.08;
                                particle.vx += dx * pullForce;
                                particle.vy += dy * pullForce;
                                
                                // High friction for a floating dust feel
                                particle.vx *= 0.84;
                                particle.vy *= 0.84;

                                particle.x += particle.vx;
                                particle.y += particle.vy;

                                if (dist < 0.5 || gatherT >= 1) {
                                    particle.isLocked = true;
                                    particle.x = particle.baseX;
                                    particle.y = particle.baseY;
                                }
                                context.globalAlpha = particle.alpha * (0.4 + ease * 0.6);
                            } 
                            // 3. NORMAL / LIVING STATE
                            else {
                                // Force particle strictly back to its base position to maintain sharp logo
                                particle.x += (particle.baseX - particle.x) * 0.1;
                                particle.y += (particle.baseY - particle.y) * 0.1;

                                // Extremely subtle micro-vibration only
                                const lifeX = Math.sin(now * 0.002 + particle.phase) * 0.05;
                                const lifeY = Math.cos(now * 0.002 + particle.phase) * 0.05;
                                
                                particle.x += lifeX;
                                particle.y += lifeY;

                                context.globalAlpha = particle.alpha;
                            }
                            context.drawImage(circleCanvas, particle.x, particle.y, particle.size, particle.size);
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
                    if (!initializedRef.current) {
                        initializedRef.current = true;
                        constructionStartTimeRef.current = performance.now();
                        
                        // Reset all particles to their starting positions off-screen right
                        if (canvasRef.current) {
                            const rect = canvasRef.current.getBoundingClientRect();
                            const width = rect.width;
                            const height = rect.height;
                            particlesRef.current.forEach(p => {
                                p.x = width + Math.random() * width * 0.8;
                                p.y = p.baseY + (Math.random() - 0.5) * height * 0.5;
                                p.vx = -Math.random() * 0.5;
                                p.vy = (Math.random() - 0.5) * 0.2;
                                p.isLocked = false;
                            });
                        }
                    }
                    loopRunning = true;
                    animationFrame = requestAnimationFrame(draw);
                } else if (!entries[0].isIntersecting) {
                    if (loopRunning) {
                        loopRunning = false;
                        cancelAnimationFrame(animationFrame);
                    }
                    // Reset animation state when out of view so it replays when scrolled back to
                    initializedRef.current = false;
                    particlesRef.current.forEach(p => p.isLocked = false);
                }
            },
            { threshold: 0.15 }
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
