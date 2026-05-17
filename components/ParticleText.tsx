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
    isFlying: boolean;
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

    useEffect(() => {
        explodeRef.current = explode;
    }, [explode]);

    const explodeStateRef = useRef<{
        active: boolean;
        startTime: number;
    }>({ active: false, startTime: 0 });

    const constructionStartTimeRef = useRef<number>(0);
    const initializedRef = useRef(false);

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

        const maxWidth = width * 0.95; // Match HTML wrapping logic
        const words = lines.join(" ").split(" ");
        const wrappedLines: string[] = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const testLine = currentLine + " " + word;
            const testWidth = sampleContext.measureText(testLine).width;
            if (testWidth < maxWidth) {
                currentLine = testLine;
            } else {
                wrappedLines.push(currentLine);
                currentLine = word;
            }
        }
        wrappedLines.push(currentLine);

        const firstLineY = textOffsetY + textRect.height / 2 - ((wrappedLines.length - 1) * lineHeight) / 2 + yOffset;

        wrappedLines.forEach((line, index) => {
            sampleContext.fillText(line, textOffsetX + textRect.width / 2, firstLineY + index * lineHeight);
        });

        const imageData = sampleContext.getImageData(0, 0, width, height).data;
        const sampleStep = 1; // Extremely high density for fine dust
        const particles: Particle[] = [];

        for (let y = 0; y < height; y += sampleStep) {
            for (let x = 0; x < width; x += sampleStep) {
                const alpha = imageData[(y * width + x) * 4 + 3];

                if (alpha > 40) { // Slightly higher threshold to avoid noise
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
                        isFlying: false,
                        // Sequential delay for left-to-right assembly
                        delay: (x / width) * 1200 + Math.random() * 400,
                        isLocked: false,
                    });
                }
            }
        }

        particlesRef.current = particles;
        // Reset initialization so the animation restarts properly if particles are rebuilt
        initializedRef.current = false;
    }, [lines, yOffset]);

    // Lazy init: build particles only when section enters viewport
    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const intersectionObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !initializedRef.current) {
                    initializedRef.current = true;
                    constructionStartTimeRef.current = performance.now();
                    buildParticles();
                    void document.fonts?.ready.then(() => {
                        constructionStartTimeRef.current = performance.now();
                        buildParticles();
                    });
                }
            },
            { threshold: 0.05 }
        );
        intersectionObserver.observe(wrapper);

        let resizeTimeout: NodeJS.Timeout;
        const resizeObserver = new ResizeObserver(() => {
            if (initializedRef.current) {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => buildParticles(), 200);
            }
        });
        resizeObserver.observe(wrapper);

        if (initializedRef.current) {
            buildParticles();
        }

        return () => {
            intersectionObserver.disconnect();
            resizeObserver.disconnect();
            clearTimeout(resizeTimeout);
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
            const timeSinceMove = now - pointer.lastMoveTime;
            const movementEnergy = pointer.active && timeSinceMove < 180
                ? Math.max(0, pointer.speed - 0.01) * (1 - timeSinceMove / 180)
                : 0;
            const isMobile = window.innerWidth < 768;
            const disruptionRadius = isMobile ? 55 : 104;
            const carryRadius = isMobile ? 130 : 240;
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
                                context.drawImage(circleCanvas, particle.x, particle.y, particle.size, particle.size);
                            }
                        });
                    } else {
                        const elapsedConstruction = now - constructionStartTimeRef.current;
                        
                        particles.forEach((particle) => {
                            const particleElapsed = elapsedConstruction - particle.delay;
                            
                            // 1. AMBIENT DRIFT (Before attraction starts)
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
                            const distSq = dx * dx + dy * dy;
                            const dist = Math.sqrt(distSq);

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

                                // Lock if very close or if time is up
                                if (dist < 0.5 || gatherT >= 1) {
                                    particle.isLocked = true;
                                    particle.x = particle.baseX;
                                    particle.y = particle.baseY;
                                }
                                
                                context.globalAlpha = particle.alpha * (0.4 + ease * 0.6);
                            } 
                            // 3. LOCKED / LIVING STATE
                            else {
                                // Force particle strictly back to its base position to maintain sharp text
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
                    }
                    context.globalAlpha = 1;
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
            { threshold: 0.5 } // Ensure the user has actually scrolled into the section
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
