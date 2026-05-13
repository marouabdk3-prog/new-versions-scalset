"use client";

import { useEffect, useRef } from "react";

// Couche de dunes au premier plan — montée dans <Hero> à z-index 12.
// Même shader que SandField (version validée), restreint à z ∈ [0.50, 1.05].
// Les crêtes proches caméra projettent à ndcY ≈ +0.20 → passent devant le logo.

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

  const float SIN_P = 0.2955;
  const float COS_P = 0.9553;
  const float CAM_H = 0.27;
  const float FOV   = 0.92;

  float hash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),               hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), f.x),
      f.y
    );
  }
  float fbm5(vec2 p) {
    float v = 0.0, a = 0.54;
    for (int i = 0; i < 5; i++) {
      v += vnoise(p) * a;
      float px = 1.60 * p.x - 1.20 * p.y;
      float py = 1.20 * p.x + 1.60 * p.y;
      p = vec2(px, py);
      a *= 0.46;
    }
    return v;
  }
  float fbm3_ripple(vec2 p) {
    float v = 0.0, a = 0.60;
    for (int i = 0; i < 3; i++) {
      v += vnoise(p) * a;
      float px = 1.80 * p.x - 0.80 * p.y;
      float py = 0.80 * p.x + 1.80 * p.y;
      p = vec2(px, py);
      a *= 0.42;
    }
    return v;
  }

  void main() {
    float wind = u_time * 0.016 * a_speed;
    vec2 nc_dune   = vec2(a_x * 0.32 + wind + a_phase * 0.10 + 1.7,
                          a_z * 0.88 + a_phase * 0.04 + 0.9);
    float wind_fast = u_time * 0.026 * a_speed;
    vec2 nc_ripple  = vec2(a_x * 1.90 + wind_fast + a_phase * 0.22 + 3.1,
                           a_z * 2.40 + a_phase * 0.18 + 1.5);
    float h_dune   = fbm5(nc_dune);
    float h_ripple = fbm3_ripple(nc_ripple);
    float h        = (h_dune * 0.70 + h_ripple * 0.30) * 0.83 - 0.25;

    // Parallaxe souris plus forte (couche la plus proche)
    float camX = u_mouse.x * 0.055;
    float camY = u_mouse.y * 0.026;
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

    // Taille plus grande au premier plan
    gl_PointSize = clamp(a_size * 2.10 / (0.50 + a_z * 0.90), 0.3, 10.0);

    float hNorm    = clamp((h + 0.25) / 0.83, 0.0, 1.0);
    float valley   = smoothstep(0.0, 0.35, hNorm);
    float crest    = 1.0 + smoothstep(0.50, 1.0, hNorm) * 4.20;
    float rNorm    = clamp(h_ripple, 0.0, 1.0);
    float ripBoost = smoothstep(0.68, 1.0, rNorm) * 2.0;
    float topKill  = 1.0 - smoothstep(0.02, 0.28, ndcY);
    v_alpha = clamp(a_alpha * valley * (crest + ripBoost) * topKill, 0.0, 0.80);

    gl_Position = vec4(ndcX, ndcY, 0.0, 1.0);
  }
`;

const FRAG = `
  precision mediump float;
  varying float v_alpha;

  void main() {
    vec2  c = gl_PointCoord - 0.5;
    float d = length(c) * 2.0;
    if (d > 1.0) discard;
    float a = (1.0 - d * d) * v_alpha;
    gl_FragColor = vec4(1.0, 1.0, 1.0, a);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}
function makeProgram(gl: WebGLRenderingContext) {
  const p = gl.createProgram()!;
  gl.attachShader(p, compileShader(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(p, compileShader(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(p);
  return p;
}

const FLOATS_PER = 6;
const STRIDE     = FLOATS_PER * 4;

function rnd(lo: number, hi: number) { return Math.random() * (hi - lo) + lo; }

function buildFgParticles(count: number): Float32Array {
  const data = new Float32Array(count * FLOATS_PER);
  const fov  = 0.92;

  for (let i = 0; i < count; i++) {
    const base = i * FLOATS_PER;
    const frac = i / count;

    let x: number, z: number, size: number, alpha: number, speed: number;

    if (frac < 0.22) {
      z     = 0.50 + 0.55 * Math.pow(Math.random(), 0.50);
      const xr = (z + 0.30) / fov * 1.15;
      x     = rnd(-xr, xr);
      size  = rnd(0.20, 0.70);
      alpha = rnd(0.010, 0.040);
      speed = rnd(0.06, 0.35);
    } else if (frac < 0.82) {
      z     = 0.50 + 0.55 * Math.pow(Math.random(), 0.60);
      const xr = (z + 0.30) / fov * 1.15;
      x     = rnd(-xr, xr);
      size  = rnd(1.10, 3.20);
      alpha = rnd(0.028, 0.100);
      speed = rnd(0.22, 1.05);
    } else {
      z     = 0.50 + 0.55 * Math.pow(Math.random(), 0.70);
      const xr = (z + 0.30) / fov * 1.15;
      x     = rnd(-xr, xr);
      size  = rnd(0.40, 1.20);
      alpha = rnd(0.050, 0.140);
      speed = rnd(0.90, 1.60);
    }

    data[base + 0] = x;
    data[base + 1] = z;
    data[base + 2] = size;
    data[base + 3] = alpha;
    data[base + 4] = speed;
    data[base + 5] = rnd(0, Math.PI * 2);
  }

  return data;
}

const FG_COUNT = 12_000;

export default function SandFieldFg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha:           true,
      antialias:       false,
      powerPreference: "high-performance",
    }) as WebGLRenderingContext | null;
    if (!gl) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const prog = makeProgram(gl);
    gl.useProgram(prog);

    const particles = buildFgParticles(FG_COUNT);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, particles, gl.STATIC_DRAW);

    const attrs: [string, number, number][] = [
      ["a_x",     1,  0],
      ["a_z",     1,  4],
      ["a_size",  1,  8],
      ["a_alpha", 1, 12],
      ["a_speed", 1, 16],
      ["a_phase", 1, 20],
    ];
    for (const [name, comps, off] of attrs) {
      const loc = gl.getAttribLocation(prog, name);
      if (loc < 0) continue;
      gl.vertexAttribPointer(loc, comps, gl.FLOAT, false, STRIDE, off);
      gl.enableVertexAttribArray(loc);
    }

    const uTime  = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.clearColor(0, 0, 0, 0);

    let mx = 0, my = 0, tx = 0, ty = 0;
    const onMouse = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth)  * 2.0 - 1.0;
      ty = -((e.clientY / window.innerHeight) * 2.0 - 1.0);
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    let raf: number;
    const t0 = performance.now();
    const draw = () => {
      mx += (tx - mx) * 0.040;
      my += (ty - my) * 0.040;
      const t = (performance.now() - t0) * 0.001;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime,  t);
      gl.uniform2f(uMouse, mx, my);
      gl.drawArrays(gl.POINTS, 0, FG_COUNT);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "absolute",
        inset:         0,
        width:         "100%",
        height:        "100%",
        zIndex:        12,
        pointerEvents: "none",
        display:       "block",
      }}
    />
  );
}
