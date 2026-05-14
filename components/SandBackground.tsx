"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type WaveSurface = {
    points: THREE.Points;
    geometry: THREE.BufferGeometry;
    baseX: Float32Array;
    baseY: Float32Array;
    baseZ: Float32Array;
    flow: Float32Array;
    offsetY: Float32Array;
    offsetZ: Float32Array;
    drift: Float32Array;
    dust: Float32Array;
    path: (flow: number) => number;
    phaseOffset: number;
};

type WaveSceneState = {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    waves: WaveSurface[];
};

type DuneConfig = {
    count: number;
    startX: number;
    endX: number;
    z: number;
    depth: number;
    thickness: number;
    dustHeight: number;
    opacity: number;
    sizeMin: number;
    sizeMax: number;
    phaseOffset: number;
    startFade: number;
    endFade: number;
    path: (flow: number) => number;
};

const DUNE_TONES = [10, 17, 26, 36, 47, 59, 74, 74, 74, 59, 59, 47].map((value) => value / 255);

function smoothstep(edge0: number, edge1: number, value: number) {
    const t = Math.min(Math.max((value - edge0) / (edge1 - edge0), 0), 1);

    return t * t * (3 - 2 * t);
}

function randomBell() {
    return (Math.random() + Math.random() + Math.random()) / 3 - 0.5;
}

function createPointMaterial(defaultSize: number, defaultOpacity: number) {
    return new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        depthTest: true,
        blending: THREE.AdditiveBlending,
        uniforms: {
            uOpacity: { value: defaultOpacity },
        },
        vertexShader: `
            attribute float aSize;
            attribute float aAlpha;
            attribute float aShade;
            varying float vAlpha;
            varying float vShade;

            void main() {
                vAlpha = aAlpha;
                vShade = aShade;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = max(aSize, ${defaultSize.toFixed(1)});
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform float uOpacity;
            varying float vAlpha;
            varying float vShade;

            void main() {
                vec2 center = gl_PointCoord - vec2(0.5);
                float circle = 1.0 - smoothstep(0.28, 0.5, length(center));
                gl_FragColor = vec4(vec3(vShade), uOpacity * vAlpha * circle);
            }
        `,
    });
}

function createDuneSurface(config: DuneConfig, renderOrder: number, densityScale: number = 1.0): WaveSurface {
    // Performance optimization: reduce particle count
    const count = Math.floor(config.count * 0.15 * densityScale); // extreme optimization
    const sizeMultiplier = 1.4; // Reduced from 2.6 for smaller sand grains

    const positions = new Float32Array(count * 3);
    const baseX = new Float32Array(count);
    const baseYValues = new Float32Array(count);
    const baseZ = new Float32Array(count);
    const flow = new Float32Array(count);
    const offsetY = new Float32Array(count);
    const offsetZ = new Float32Array(count);
    const drift = new Float32Array(count);
    const dust = new Float32Array(count);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);
    const shades = new Float32Array(count);

    for (let index = 0; index < count; index += 1) {
        const isDust = Math.random() > 0.45 ? 1 : 0; // Increased dust proportion
        const t = Math.random();
        const x = config.startX + (config.endX - config.startX) * t;
        const y = config.path(t);
        const thicknessNoise = randomBell();
        const verticalOffset = isDust
            ? Math.random() * config.dustHeight + Math.max(0, randomBell()) * config.thickness * 0.42
            : thicknessNoise * config.thickness - Math.random() * config.thickness * 0.38;
        const zOffset = randomBell() * config.depth;
        const fadeIn = smoothstep(0, config.startFade, t);
        const fadeOut = 1 - smoothstep(1 - config.endFade, 1, t);
        const body = Math.max(0, 1 - Math.abs(thicknessNoise) * 1.45);
        const centerClear = 1 - Math.exp(-((x * x) / 16 + (y * y) / 7.8)) * 0.44;
        const alpha = Math.pow(fadeIn * fadeOut, 1.42) * (isDust ? 0.65 : 0.68 + body * 0.48) * config.opacity * centerClear; // Increased dust visibility
        const positionIndex = index * 3;

        positions[positionIndex] = x;
        positions[positionIndex + 1] = y + verticalOffset;
        positions[positionIndex + 2] = config.z + zOffset;

        baseX[index] = x;
        baseYValues[index] = y;
        baseZ[index] = config.z;
        flow[index] = t;
        offsetY[index] = verticalOffset;
        offsetZ[index] = zOffset;
        drift[index] = (Math.random() - 0.5) * 0.7;
        dust[index] = isDust;
        sizes[index] = (isDust
            ? config.sizeMin * 0.68 + Math.random() * 0.34
            : config.sizeMin + Math.random() * (config.sizeMax - config.sizeMin)) * sizeMultiplier;
        alphas[index] = alpha;
        shades[index] = DUNE_TONES[Math.floor(Math.random() * DUNE_TONES.length)];
        const gradientTone = 26 + body * 48;
        shades[index] = gradientTone / 255;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));
    geometry.setAttribute("aShade", new THREE.BufferAttribute(shades, 1));

    const material = createPointMaterial(0.9, 1.35);
    const points = new THREE.Points(geometry, material);
    points.renderOrder = renderOrder;

    return {
        points,
        geometry,
        baseX,
        baseY: baseYValues,
        baseZ,
        flow,
        offsetY,
        offsetZ,
        drift,
        dust,
        path: config.path,
        phaseOffset: config.phaseOffset,
    };
}

function updateWave(wave: WaveSurface, time: number) {
    const position = wave.geometry.getAttribute("position") as THREE.BufferAttribute;
    const positionArray = position.array as Float32Array;
    const phase = time + wave.phaseOffset;

    // Wind gusts — periodic surges of stronger wind
    const gustStrength = 0.5 + Math.sin(phase * 0.18) * 0.3 + Math.sin(phase * 0.07) * 0.2;
    const gustDirection = Math.sin(phase * 0.12) * 0.15;

    for (let index = 0; index < position.count; index += 1) {
        const x = wave.baseX[index];
        const flow = wave.flow[index];
        const z = wave.baseZ[index] + wave.offsetZ[index];
        const d = wave.drift[index];
        const isDust = wave.dust[index];

        // Dust: grains flying off the dune crests, carried by wind
        let dustLift = 0;
        let dustCarry = 0;
        if (isDust > 0) {
            // Cyclic launch — each particle has its own timing
            const launchCycle = (phase * 0.6 + d * 8.0 + flow * 12.0) % (Math.PI * 2);
            const inFlight = Math.max(0, Math.sin(launchCycle));
            // Parabolic arc — rises fast then drifts down
            const arc = inFlight * (1.0 - inFlight * 0.3);
            // Height: volatilized sand flies high
            dustLift = arc * (2.8 + gustStrength * 1.5) +
                Math.sin(phase * 2.2 + d * 5.0) * 0.25 * inFlight;
            // Horizontal carry by wind while in flight
            dustCarry = inFlight * (2.0 + gustStrength * 1.2) *
                (0.7 + Math.sin(d * 3.0) * 0.3);
            // Swirl/turbulence in the air
            dustLift += Math.sin(phase * 3.0 + d * 7.0) * 0.2 * inFlight;
            dustCarry += Math.cos(phase * 2.5 + d * 4.0) * 0.25 * inFlight;
        }

        // Rolling undulation — sand dune surface breathing
        const slowRoll =
            Math.sin(x * 0.08 + phase * 1.2 + d) * 0.35 +
            Math.sin(flow * Math.PI * 2.2 + phase * 1.1) * 0.25 +
            Math.cos(z * 0.24 + phase * 0.8) * 0.18 +
            Math.sin(flow * Math.PI * 5.5 + phase * 0.6 + d) * 0.08;

        // Horizontal wind drift
        const windBase = Math.sin(phase * 0.7 + flow * Math.PI * 2 + d) * 0.3;
        const windGust = Math.sin(phase * 1.5 + d * 2.5) * 0.2 * gustStrength;
        const windPush = 0.12 * gustStrength;
        const horizontalDrift = windBase + windGust + windPush + gustDirection + dustCarry;

        // Depth sway
        const depthDrift = Math.cos(phase * 0.55 + flow * Math.PI * 1.5 + d) * 0.15 +
            Math.sin(phase * 0.3 + d * 1.8) * 0.06;

        const y = wave.path(flow) + wave.offsetY[index] + slowRoll + dustLift;

        const i3 = index * 3;
        positionArray[i3] = x + horizontalDrift;
        positionArray[i3 + 1] = y;
        positionArray[i3 + 2] = z + depthDrift;
    }

    position.needsUpdate = true;
}

function setupWaveScene(canvas: HTMLCanvasElement): WaveSceneState {
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1)); // Lower pixel ratio for performance

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 80);
    camera.position.set(0, 0, 18);
    camera.lookAt(0, 0, 0);

    const isMobile = window.innerWidth < 1024;
    const densityScale = isMobile ? 0.4 : 1.0;
    const waveScale = isMobile ? 0.6 : 1.0;
    const yOffset = isMobile ? -1.0 : 0.0; // push down

    const waves = [
        createDuneSurface({
            count: 64000,
            startX: 20,
            endX: -1,
            z: -3.15,
            depth: 5.1,
            thickness: 0,
            dustHeight: 24,
            opacity: 0.8,
            sizeMin: 0,
            sizeMax: 1.56,
            phaseOffset: 3.1,
            startFade: 0.12,
            endFade: 0.2,
            path: (flow) => (3.5 + Math.sin((1 - flow) * Math.PI) * 0.48 - flow * 0.22 + Math.sin(flow * Math.PI * 2.7) * 0.5) * waveScale + yOffset,
        }, 1, densityScale),
        createDuneSurface({
            count: 64000,
            startX: 20,
            endX: -1,
            z: -3.15,
            depth: 5.1,
            thickness: 2.5,
            dustHeight: 0,
            opacity: 0.8,
            sizeMin: 0,
            sizeMax: 1.56,
            phaseOffset: 3.1,
            startFade: 0.12,
            endFade: 0.2,
            path: (flow) => (3.5 + Math.sin((1 - flow) * Math.PI) * 0.48 - flow * 0.22 + Math.sin(flow * Math.PI * 2.7) * 0.5) * waveScale + yOffset,
        }, 1, densityScale),
        createDuneSurface({
            count: 42000,
            startX: -20.4,
            endX: 0,
            z: -4.7,
            depth: 3.7,
            thickness: 0,
            dustHeight: 24,
            opacity: 0.7,
            sizeMin: 0.4,
            sizeMax: 1.56,
            phaseOffset: 2.2,
            startFade: 0.28,
            endFade: 0.18,
            path: (flow) => (0.5 + Math.sin(flow * Math.PI * 0.95) * 0.48 - smoothstep(0.5, 1, flow) * 1.12 + Math.sin(flow * Math.PI * 4.1) * 0.3) * waveScale + yOffset,
        }, 2, densityScale),
        createDuneSurface({
            count: 42000,
            startX: -20.4,
            endX: 0,
            z: -4.7,
            depth: 3.7,
            thickness: 2.5,
            dustHeight: 0,
            opacity: 0.7,
            sizeMin: 0.4,
            sizeMax: 1.56,
            phaseOffset: 2.2,
            startFade: 0.28,
            endFade: 0.18,
            path: (flow) => (0.5 + Math.sin(flow * Math.PI * 0.95) * 0.48 - smoothstep(0.5, 1, flow) * 1.12 + Math.sin(flow * Math.PI * 4.1) * 0.3) * waveScale + yOffset,
        }, 2, densityScale),
        createDuneSurface({
            count: 56000,
            startX: -20.6,
            endX: 10.1,
            z: -5.7,
            depth: 4.4,
            thickness: 0.2,
            dustHeight: 27,
            opacity: 0.75,
            sizeMin: 0.4,
            sizeMax: 1.56,
            phaseOffset: 1.35,
            startFade: 0.12,
            endFade: 0.18,
            path: (flow) => (-3.54 - flow * 0.82 + Math.sin(flow * Math.PI * 0.9) * 0.28 + Math.sin(flow * Math.PI * 3.5) * 0.28) * waveScale + yOffset,
        }, 3, densityScale),
        createDuneSurface({
            count: 56000,
            startX: -20.6,
            endX: 10.1,
            z: -5.7,
            depth: 4.4,
            thickness: 0,
            dustHeight: 24,
            opacity: 0.8,
            sizeMin: 0,
            sizeMax: 1.56,
            phaseOffset: 3.1,
            startFade: 0.12,
            endFade: 0.2,
            path: (flow) => (-5 + Math.sin(flow * Math.PI * 0.75) * 0.34 + smoothstep(0.52, 0.68, flow) * 0.56 - smoothstep(0.76, 1, flow) * 0.76 + Math.sin(flow * Math.PI * 4.8) * 0.5) * waveScale + yOffset,
        }, 4, densityScale),
        createDuneSurface({
            count: 64000,
            startX: 20,
            endX: -1,
            z: -3.15,
            depth: 5.1,
            thickness: 2.5,
            dustHeight: 0,
            opacity: 0.8,
            sizeMin: 0,
            sizeMax: 1.56,
            phaseOffset: 3.1,
            startFade: 0.12,
            endFade: 0.2,
            path: (flow) => (-5 + Math.sin(flow * Math.PI * 0.75) * 0.34 + smoothstep(0.52, 0.68, flow) * 0.56 - smoothstep(0.76, 1, flow) * 0.76 + Math.sin(flow * Math.PI * 4.8) * 0.5) * waveScale + yOffset,
        }, 4, densityScale),

        // BLUE LINE MOVEMENT — long powder wave, left to right
        createDuneSurface({
            count: 60000,
            startX: -34,
            endX: 30,
            z: -2.6,
            depth: 10.5,
            thickness: 7.8,
            dustHeight: 58,
            opacity: 0.92,
            sizeMin: 0.12,
            sizeMax: 2.4,
            phaseOffset: 6.4,
            startFade: 0.02,
            endFade: 0.22,

            path: (flow) => {
                const softEntrance =
                    -Math.exp(-flow * 4.2) * 0.9;

                const longLowStart =
                    -0.85 * (1 - smoothstep(0.05, 0.38, flow));

                const mainRise =
                    smoothstep(0.32, 0.66, flow) * 2.25;

                const roundTop =
                    -smoothstep(0.62, 0.82, flow) * 0.55;

                const finalFall =
                    -smoothstep(0.74, 1.0, flow) * 2.05;

                const organicNoise =
                    Math.sin(flow * Math.PI * 2.1) * 0.18
                    + Math.sin(flow * Math.PI * 5.7) * 0.08;

                return (
                    -5.9
                    + softEntrance
                    + longLowStart
                    + mainRise
                    + roundTop
                    + finalFall
                    + organicNoise
                ) * waveScale + yOffset;
            },
        }, 8, densityScale),
    ];
    scene.add(...waves.map((wave) => wave.points));

    return {
        renderer,
        scene,
        camera,
        waves,
    };
}

export default function SandBackground() {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const mount = mountRef.current;

        if (!canvas || !mount) {
            return;
        }

        const state = setupWaveScene(canvas);
        const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        let animationFrame = 0;
        let wavePhase = 0;

        const resize = () => {
            const width = mount.clientWidth;
            const height = mount.clientHeight;
            const aspect = width / Math.max(1, height);

            state.camera.aspect = aspect;

            // Adjust camera distance for portrait (mobile) screens to avoid horizontal clipping
            if (aspect < 1) {
                state.camera.position.z = 18 + (1 - aspect) * 22; // Pull camera back on narrow screens
            } else {
                state.camera.position.z = 18;
            }

            state.camera.updateProjectionMatrix();
            state.renderer.setSize(width, height, false);
        };

        const animate = () => {
            if (!reduceMotionQuery.matches) {
                wavePhase += 0.024;
            }

            state.waves.forEach((wave) => updateWave(wave, wavePhase));
            state.renderer.render(state.scene, state.camera);
            animationFrame = window.requestAnimationFrame(animate);
        };

        resize();
        animate();

        window.addEventListener("resize", resize);

        return () => {
            window.cancelAnimationFrame(animationFrame);
            window.removeEventListener("resize", resize);
            state.renderer.dispose();
            state.scene.traverse((object) => {
                if (object instanceof THREE.Points) {
                    object.geometry.dispose();
                    if (Array.isArray(object.material)) {
                        object.material.forEach((material) => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="pointer-events-none fixed inset-0 z-0"
            aria-hidden="true"
        >
            <canvas ref={canvasRef} className="h-full w-full" />
        </div>
    );
}
