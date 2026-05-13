"use client";
import { useEffect, useRef } from "react";

// ── Noise ─────────────────────────────────────────────────────────────────────
const HTAB = (() => {
  const t = new Float32Array(512);
  for (let i = 0; i < 512; i++) {
    const s = Math.sin(i * 127.1) * 43758.5453 + Math.cos(i * 311.7) * 21340.9;
    t[i] = Math.abs(s) % 1.0;
  }
  return t;
})();
function h2(ix: number, iy: number) { return HTAB[((ix * 127 + iy * 311) & 511)]; }
function vnoise(x: number, y: number) {
  const ix = x | 0, iy = y | 0, fx = x - ix, fy = y - iy;
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  return h2(ix,iy)*(1-u)*(1-v) + h2(ix+1,iy)*u*(1-v)
       + h2(ix,iy+1)*(1-u)*v   + h2(ix+1,iy+1)*u*v;
}
// Three noise frequencies superimposed → granular texture with multiple scales
function density3(xN: number, li: number, t: number, spd: number) {
  return vnoise(xN * 4.5  - t * spd * 0.18 + li * 5.1, li * 2.3) * 0.50
       + vnoise(xN * 11.0 - t * spd * 0.30 + li * 8.7, li * 4.1) * 0.32
       + vnoise(xN * 26.0 - t * spd * 0.12 + li * 3.3, li * 7.9) * 0.18;
}

function rnd(lo: number, hi: number) { return Math.random() * (hi - lo) + lo; }
function gauss1D() {
  const u = Math.random() || 1e-10;
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * Math.random());
}

// ── Flow layers ───────────────────────────────────────────────────────────────
// sigma: vertical half-width of each sand flow (pixels).
// Thin = perceptible as a distinct current. Wide = atmospheric blur.
const FLOWS = [
  { yRatio: 0.89, amp: 58, freq: 1.10, speed: 0.30, sigma: 20, dim: 1.30 },
  { yRatio: 0.73, amp: 72, freq: 1.50, speed: 0.36, sigma: 15, dim: 1.00 },
  { yRatio: 0.57, amp: 50, freq: 1.90, speed: 0.22, sigma: 10, dim: 0.76 },
  { yRatio: 0.40, amp: 34, freq: 2.30, speed: 0.12, sigma:  7, dim: 0.52 },
  { yRatio: 0.24, amp: 20, freq: 1.70, speed: 0.06, sigma:  4, dim: 0.30 },
];

// ── Types ─────────────────────────────────────────────────────────────────────
interface FlowParticle {
  layerIdx: number;
  xN0:      number;   // initial x phase [0, 1] — drifts each frame
  dyPx:     number;   // y offset from wave centre (pixels, gaussian)
  aBase:    number;   // base alpha × gaussian(y) weight
}
interface DustParticle {
  xN0: number; yN: number; a: number; spd: number;
}

// ── Build particles ───────────────────────────────────────────────────────────
// Particles drift horizontally with their flow — the eye perceives movement.
function buildFlowParticles(): FlowParticle[] {
  const arr: FlowParticle[] = [];
  for (let li = 0; li < FLOWS.length; li++) {
    const sigma = FLOWS[li].sigma;
    // Front flows denser; back flows sparser
    const n = [9000, 7500, 6000, 4500, 3000][li];
    for (let i = 0; i < n; i++) {
      const dyN  = gauss1D();            // standard normal
      const dyPx = dyN * sigma;          // pixel offset
      const gY   = Math.exp(-dyN * dyN * 0.5); // gaussian weight (bright near centre)
      arr.push({
        layerIdx: li,
        xN0:      Math.random(),
        dyPx,
        // Core particles (|dyN|<0.8) are brighter; halo is much weaker
        aBase: rnd(0.010, 0.075) * gY,
      });
    }
  }
  return arr;
}

// Independent atmospheric dust — no wave structure, slow drift
function buildDust(): DustParticle[] {
  const arr: DustParticle[] = [];
  for (let i = 0; i < 20000; i++) {
    arr.push({
      xN0: Math.random(),
      yN:  rnd(0.08, 0.98),
      a:   rnd(0.0008, 0.012),
      spd: rnd(0.010, 0.20),
    });
  }
  return arr;
}

// #030303 opaque in little-endian Uint32
const BG32 = (255 << 24 | 3 << 16 | 3 << 8 | 3) >>> 0;

// ── Component ─────────────────────────────────────────────────────────────────
export default function SandDunesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let imgData: ImageData;
    let buf8: Uint8ClampedArray;
    let buf32: Uint32Array;

    const resize = () => {
      W = canvas.offsetWidth  || window.innerWidth;
      H = canvas.offsetHeight || window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
      imgData = ctx.createImageData(W, H);
      buf8    = imgData.data;
      buf32   = new Uint32Array(imgData.data.buffer);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const flowParticles = buildFlowParticles();
    const dustParticles = buildDust();

    // Per-frame lookup tables — avoids per-particle sin/noise calls
    let waveYtab: Float32Array | null = null;   // [li * W + xi] = waveY
    let densTab:  Float32Array | null = null;   // [li * W + xi] = noise density

    let raf: number;
    const t0 = performance.now();

    const draw = () => {
      if (!W || !H) { raf = requestAnimationFrame(draw); return; }
      const t = (performance.now() - t0) * 0.001;

      // Allocate / reallocate tables on resize
      const tabSize = FLOWS.length * W;
      if (!waveYtab || waveYtab.length !== tabSize) {
        waveYtab = new Float32Array(tabSize);
        densTab  = new Float32Array(tabSize);
      }

      // ── Pass 1: precompute per-column wave Y + density ─────────────────
      const twopiW = (2 * Math.PI) / W;
      for (let li = 0; li < FLOWS.length; li++) {
        const fl  = FLOWS[li];
        const ph  = t * fl.speed;
        const liO = li * 0.85;
        const base = li * W;
        for (let xi = 0; xi < W; xi++) {
          const kx = twopiW * fl.freq * xi;
          waveYtab![base + xi] = fl.yRatio * H
            + fl.amp * Math.sin(kx - ph)
            + fl.amp * 0.26 * Math.sin(kx * 2.15 - ph * 1.38 + liO)
            + fl.amp * 0.06 * Math.sin(kx * 5.1  - ph * 3.00 + li * 1.4);
          // Noise density: creates bright patches and voids along each current
          const xN = xi / W;
          densTab![base + xi] = 0.18 + density3(xN, li, t, fl.speed) * 0.82;
        }
      }

      // ── Fill background ────────────────────────────────────────────────
      buf32.fill(BG32);

      // ── Pass 2: flow particles ─────────────────────────────────────────
      for (let pi = 0; pi < flowParticles.length; pi++) {
        const p  = flowParticles[pi];
        const fl = FLOWS[p.layerIdx];

        // Particle drifts left with its flow — horizontal motion is visible
        const xN = ((p.xN0 - t * fl.speed * 0.055 + 10) % 1.0 + 1.0) % 1.0;
        const xi = (xN * W) | 0;

        const base = p.layerIdx * W + xi;
        const sy   = (waveYtab![base] + p.dyPx) | 0;
        if (sy < 0 || sy >= H) continue;

        const bright = (p.aBase * densTab![base] * fl.dim * 252) | 0;
        if (bright < 2) continue;

        const idx = (sy * W + xi) * 4;
        const pr  = buf8[idx];
        // Screen blend: accumulates naturally without hard clipping
        const blended = (pr + bright - ((pr * bright) >> 8)) | 0;
        buf8[idx] = buf8[idx+1] = buf8[idx+2] = blended;
      }

      // ── Pass 3: atmospheric dust between flows ─────────────────────────
      for (let di = 0; di < dustParticles.length; di++) {
        const d  = dustParticles[di];
        const xN = ((d.xN0 - t * d.spd * 0.055 + 10) % 1.0 + 1.0) % 1.0;
        const xi = (xN * W) | 0;
        const yi = (d.yN * H) | 0;
        if (yi >= H) continue;

        const noiseD = 0.15 + vnoise(xN * 8.0 - t * d.spd * 0.3, d.yN * 6.0) * 0.85;
        const bright = (d.a * noiseD * 252) | 0;
        if (bright < 2) continue;

        const idx = (yi * W + xi) * 4;
        const pr  = buf8[idx];
        buf8[idx] = buf8[idx+1] = buf8[idx+2] = (pr + bright - ((pr * bright) >> 8)) | 0;
      }

      ctx.putImageData(imgData, 0, 0);
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute", inset: 0, zIndex: 0,
          pointerEvents: "none", display: "block",
          width: "100%", height: "100%",
        }}
      />
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        background:
          "radial-gradient(ellipse 92% 72% at 50% 58%, transparent 18%, rgba(3,3,3,0.32) 52%, rgba(3,3,3,0.88) 100%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        background:
          "linear-gradient(to bottom, rgba(3,3,3,0.94) 0%, rgba(3,3,3,0.08) 22%, transparent 36%)",
      }} />
    </>
  );
}
