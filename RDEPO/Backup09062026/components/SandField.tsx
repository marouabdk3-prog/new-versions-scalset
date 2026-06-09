"use client";

import { useEffect, useRef } from "react";

// ─── GLSL: Background particles ──────────────────────────────────────────────
const VERT = `
  precision highp float;

  attribute float a_x;
  attribute float a_z;
  attribute float a_size;
  attribute float a_alpha;
  attribute float a_speed;
  attribute float a_phase;

  uniform float u_time;
  uniform vec2  u_mouse;

  varying float v_alpha;

  const float SIN_P = 0.3746;
  const float COS_P = 0.9272;
  const float CAM_H = 0.32;
  const float FOV   = 0.92;

  float hash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float vnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),             hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }
  float ridge(vec2 p) {
    float n = vnoise(p);
    n = 1.0 - abs(2.0 * n - 1.0);
    return n * n;
  }
  float fbm3(vec2 p) {
    float v = 0.0, a = 0.50;
    mat2 m = mat2(1.60, 1.20, -1.20, 1.60);
    for (int i = 0; i < 3; i++) { v += vnoise(p) * a; p = m * p; a *= 0.50; }
    return v;
  }
  float ridgeFBM(vec2 p) {
    float v = 0.0, a = 0.54, prev = 1.0;
    mat2 m = mat2(1.60, 1.20, -1.20, 1.60);
    for (int i = 0; i < 5; i++) {
      float n = ridge(p);
      v += n * a * prev;
      prev = n;
      p = m * p;
      a *= 0.46;
    }
    return v;
  }

  void main() {
    float t    = u_time;
    float wind = t * 0.012 * a_speed;

    vec2 nc1 = vec2(a_x * 0.18 + wind + a_phase * 0.06,
                    a_z * 0.42         + a_phase * 0.04);
    vec2 nc2 = vec2(
      a_x * 0.13 + a_z * 0.22 + wind * 0.50 + a_phase * 0.035,
      a_z * 0.12 - a_x * 0.19               + a_phase * 0.05
    );
    vec2 warp = vec2(
      fbm3(nc1 + vec2(0.0, 0.0) + wind * 0.09),
      fbm3(nc1 + vec2(3.7, 2.1) + wind * 0.06)
    ) * 0.32;

    float r1  = ridgeFBM(nc1 + warp);
    float r2  = ridgeFBM(nc2 + warp * 0.70);
    float raw = sqrt(r1 * r2);
    float base = r1 * 0.28;
    float h    = (raw * 0.72 + base) * 2.20 - 0.20;

    float camX   = u_mouse.x * 0.030;
    float camY   = u_mouse.y * 0.012;
    float dy     = h - CAM_H - camY;
    float y_view = dy  * COS_P - a_z * SIN_P;
    float z_view = dy  * SIN_P + a_z * COS_P;

    if (z_view < 0.02) {
      gl_Position  = vec4(10.0, 0.0, 0.0, 1.0);
      gl_PointSize = 0.0;
      return;
    }

    float persp = FOV / z_view;
    float ndcX  = (a_x - camX) * persp;
    float ndcY  = y_view * persp;

    gl_PointSize = clamp(a_size * 1.85 / (0.42 + a_z * 0.80), 0.14, 6.5);

    float hMax        = 1.80;
    float hNorm       = clamp((h + 0.20) / hMax, 0.0, 1.0);
    float valley      = smoothstep(0.00, 0.18, hNorm);
    float crest       = 1.0 + smoothstep(0.35, 0.85, hNorm) * 2.8;
    float sideBoost   = 1.0 + smoothstep(0.55, 1.0, abs(ndcX)) * 0.9;
    float bottomBoost = 1.0 + smoothstep(-0.20, -0.70, ndcY) * 1.4;
    float fog         = 1.0 - smoothstep(0.45, 4.80, a_z);
    float topKill     = 1.0 - smoothstep(0.12, 0.48, ndcY);

    v_alpha = clamp(a_alpha * valley * crest * sideBoost * bottomBoost * fog * topKill, 0.0, 1.0);
    gl_Position = vec4(ndcX, ndcY, 0.0, 1.0);
  }
`;

// ─── GLSL: Logo particles (NDC-space, no perspective) ────────────────────────
const LOGO_VERT = `
  precision highp float;
  attribute vec2  a_ndc;
  attribute float a_size;
  attribute float a_alpha;
  uniform float u_time;
  uniform vec2  u_mouse;
  varying float v_alpha;

  void main() {
    // Organic micro-drift — particles breathe in place
    vec2 drift = vec2(
      sin(u_time * 0.17 + a_ndc.x * 3.5 + a_ndc.y * 1.9) * 0.006,
      cos(u_time * 0.13 + a_ndc.x * 2.1 + a_ndc.y * 4.3) * 0.004
    );
    // Mouse parallax — logo subtly follows pointer
    vec2 parallax = u_mouse * vec2(0.022, 0.014);
    // Slow pulse per particle
    float pulse = 0.62 + 0.38 * sin(u_time * 0.48 + a_ndc.x * 1.6 + a_ndc.y * 1.2);
    v_alpha = a_alpha * pulse;
    gl_Position  = vec4(a_ndc + drift + parallax, 0.0, 1.0);
    gl_PointSize = a_size;
  }
`;

// ─── GLSL: Shared fragment shader ─────────────────────────────────────────────
const FRAG = `
  precision mediump float;
  varying float v_alpha;
  void main() {
    vec2  c = gl_PointCoord - 0.5;
    float d = length(c) * 2.0;
    if (d > 1.0) discard;
    float a = (1.0 - d * d * d) * v_alpha;
    gl_FragColor = vec4(1.0, 1.0, 1.0, a);
  }
`;

// ─── WebGL helpers ────────────────────────────────────────────────────────────
function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}
function makeProgram(gl: WebGLRenderingContext, vs: string, fs: string) {
  const p = gl.createProgram()!;
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER,   vs));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p);
  return p;
}

// ─── Background particles ─────────────────────────────────────────────────────
const FLOATS = 6;
const STRIDE = FLOATS * 4;
const N      = 220_000;
const FOV_C  = 0.92;

function rnd(lo: number, hi: number) { return Math.random() * (hi - lo) + lo; }

function buildParticles(): Float32Array {
  const data = new Float32Array(N * FLOATS);
  let ptr = 0;
  for (let i = 0; i < N; i++) {
    const frac = i / N;
    let z: number, size: number, alpha: number, speed: number;
    if (frac < 0.18) {
      z = 0.38 + 1.60 * Math.pow(Math.random(), 2.0);
      size = rnd(0.20, 0.70); alpha = rnd(0.018, 0.060); speed = rnd(0.06, 0.38);
    } else if (frac < 0.28) {
      z = 0.38 + 2.20 * Math.pow(Math.random(), 1.5);
      size = rnd(0.50, 1.80); alpha = rnd(0.040, 0.130); speed = rnd(0.15, 0.55);
    } else if (frac < 0.62) {
      z = 0.38 + 4.40 * Math.pow(Math.random(), 1.05);
      size = rnd(0.60, 2.30); alpha = rnd(0.030, 0.110); speed = rnd(0.22, 1.10);
    } else if (frac < 0.80) {
      z = 0.38 + 3.90 * Math.pow(Math.random(), 0.88);
      size = rnd(0.22, 1.00); alpha = rnd(0.022, 0.090); speed = rnd(0.50, 1.40);
    } else if (frac < 0.92) {
      z = 0.38 + 4.50 * Math.pow(Math.random(), 0.95);
      size = rnd(0.12, 0.50); alpha = rnd(0.008, 0.035); speed = rnd(0.70, 1.80);
    } else {
      z = 0.38 + 4.40 * Math.pow(Math.random(), 0.70);
      size = rnd(0.40, 1.30); alpha = rnd(0.065, 0.190); speed = rnd(0.85, 1.70);
    }
    const xr = (z + 0.30) / FOV_C * 1.25;
    data[ptr++] = rnd(-xr, xr);
    data[ptr++] = z;
    data[ptr++] = size;
    data[ptr++] = alpha;
    data[ptr++] = speed;
    data[ptr++] = rnd(0, Math.PI * 2);
  }
  return data;
}

// ─── Logo particles ───────────────────────────────────────────────────────────
// Renders a triangle + "SCALSET" text to an offscreen canvas, samples lit pixels
// as particle positions in NDC-space. The result is a ghostly ambient glow that
// sits behind the animated Hero content.
const LOGO_FLOATS  = 4;  // ndcX, ndcY, size, alpha
const LOGO_STRIDE  = LOGO_FLOATS * 4;

function buildLogoParticles(W: number, H: number): Float32Array {
  const OW = 1200, OH = 440;
  const oc = document.createElement("canvas");
  oc.width = OW; oc.height = OH;
  const ox = oc.getContext("2d")!;
  ox.clearRect(0, 0, OW, OH);

  // Triangle outline — equilateral, apex at top
  const cx = OW / 2;
  ox.beginPath();
  ox.moveTo(cx,          OH * 0.04);
  ox.lineTo(OW * 0.915,  OH * 0.60);
  ox.lineTo(OW * 0.085,  OH * 0.60);
  ox.closePath();
  ox.strokeStyle = "white";
  ox.lineWidth   = 5;
  ox.stroke();

  // "SCALSET" text below triangle
  const fs = Math.round(OH * 0.26);
  ox.font          = `700 ${fs}px Arial, sans-serif`;
  ox.textAlign     = "center";
  ox.textBaseline  = "alphabetic";
  ox.fillStyle     = "white";
  ox.fillText("SCALSET", cx, OH * 0.93);

  const img  = ox.getImageData(0, 0, OW, OH).data;
  const pts: number[] = [];

  // Compute NDC extents that maintain the offscreen canvas aspect ratio
  const logoW = 1.50;                              // 75% of NDC width
  const logoH = logoW * (OH / OW) / (W / H);      // preserve aspect ratio
  const centerY = 0.12;                            // slightly above vertical center

  for (let y = 0; y < OH; y++) {
    for (let x = 0; x < OW; x++) {
      if (img[(y * OW + x) * 4 + 3] < 60) continue;
      const ndcX = (x / OW - 0.5) * logoW + (Math.random() - 0.5) * 0.006;
      const ndcY = -(y / OH - 0.5) * logoH + centerY + (Math.random() - 0.5) * 0.003;
      pts.push(
        ndcX, ndcY,
        0.55 + Math.random() * 1.20,   // point size (px)
        0.035 + Math.random() * 0.090, // base alpha — low, accumulates additively
      );
    }
  }

  return new Float32Array(pts);
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SandField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha:           false,
      antialias:       false,
      powerPreference: "high-performance",
    }) as WebGLRenderingContext | null;
    if (!gl) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── Background program ────────────────────────────────────────────────────
    const prog = makeProgram(gl, VERT, FRAG);
    const buf  = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, buildParticles(), gl.STATIC_DRAW);
    gl.useProgram(prog);

    const bgAttrs: [string, number, number][] = [
      ["a_x",     1,  0],
      ["a_z",     1,  4],
      ["a_size",  1,  8],
      ["a_alpha", 1, 12],
      ["a_speed", 1, 16],
      ["a_phase", 1, 20],
    ];
    for (const [name, comps, offset] of bgAttrs) {
      const loc = gl.getAttribLocation(prog, name);
      if (loc < 0) continue;
      gl.vertexAttribPointer(loc, comps, gl.FLOAT, false, STRIDE, offset);
      gl.enableVertexAttribArray(loc);
    }
    const uTime  = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    // ── Logo program ──────────────────────────────────────────────────────────
    const logoProg  = makeProgram(gl, LOGO_VERT, FRAG);
    const logoData  = buildLogoParticles(canvas.width, canvas.height);
    const N_LOGO    = (logoData.length / LOGO_FLOATS) | 0;
    const logoBuf   = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, logoBuf);
    gl.bufferData(gl.ARRAY_BUFFER, logoData, gl.STATIC_DRAW);
    gl.useProgram(logoProg);

    const logoAttrs: [string, number, number][] = [
      ["a_ndc",   2,  0],
      ["a_size",  1,  8],
      ["a_alpha", 1, 12],
    ];
    for (const [name, comps, offset] of logoAttrs) {
      const loc = gl.getAttribLocation(logoProg, name);
      if (loc < 0) continue;
      gl.vertexAttribPointer(loc, comps, gl.FLOAT, false, LOGO_STRIDE, offset);
      gl.enableVertexAttribArray(loc);
    }
    const uLogoTime  = gl.getUniformLocation(logoProg, "u_time");
    const uLogoMouse = gl.getUniformLocation(logoProg, "u_mouse");

    // ── Shared GL state ───────────────────────────────────────────────────────
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.clearColor(0, 0, 0, 1);

    const mouse  = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      target.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      target.y = -(e.clientY / window.innerHeight)  * 2 + 1;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    let raf: number;
    const t0 = performance.now();

    const draw = () => {
      mouse.x += (target.x - mouse.x) * 0.045;
      mouse.y += (target.y - mouse.y) * 0.045;
      const t = (performance.now() - t0) * 0.001;

      gl.clear(gl.COLOR_BUFFER_BIT);

      // Pass 1: background sand field
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      for (const [name, comps, offset] of bgAttrs) {
        const loc = gl.getAttribLocation(prog, name);
        if (loc >= 0) gl.vertexAttribPointer(loc, comps, gl.FLOAT, false, STRIDE, offset);
      }
      gl.uniform1f(uTime,  t);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.POINTS, 0, N);

      // Pass 2: logo glow
      gl.useProgram(logoProg);
      gl.bindBuffer(gl.ARRAY_BUFFER, logoBuf);
      for (const [name, comps, offset] of logoAttrs) {
        const loc = gl.getAttribLocation(logoProg, name);
        if (loc >= 0) gl.vertexAttribPointer(loc, comps, gl.FLOAT, false, LOGO_STRIDE, offset);
      }
      gl.uniform1f(uLogoTime,  t);
      gl.uniform2f(uLogoMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.POINTS, 0, N_LOGO);

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      gl.deleteBuffer(buf);
      gl.deleteBuffer(logoBuf);
      gl.deleteProgram(prog);
      gl.deleteProgram(logoProg);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position:      "absolute",
          inset:         0,
          zIndex:        0,
          pointerEvents: "none",
          display:       "block",
          width:         "100%",
          height:        "100%",
        }}
      />

      {/* Radial fog — darkens edges, preserves center glow */}
      <div style={{
        position:      "absolute",
        inset:         0,
        zIndex:        0,
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse 92% 72% at 50% 58%, transparent 18%, rgba(0,0,0,0.36) 52%, rgba(0,0,0,0.84) 100%)",
      }} />

      {/* Top veil — keeps navbar area dark */}
      <div style={{
        position:      "absolute",
        inset:         0,
        zIndex:        0,
        pointerEvents: "none",
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.10) 32%, transparent 48%)",
      }} />
    </>
  );
}
