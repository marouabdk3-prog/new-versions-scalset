"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GoldenDnaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number, height: number;
    let animationFrameId: number;

    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    let scrollProgress = 0;

    const drawDNA = () => {
      ctx.clearRect(0, 0, width, height);
      const time = Date.now() * 0.0005;

      const elements: any[] = [];
      const radius = Math.min(width * 0.15, 250);
      const spacing = 40;
      const twistRate = 0.006;

      const scrollShift = scrollProgress * height * 5;
      const yOffset = scrollShift % spacing;

      const camZ = 3.0;

      const project = (x3d: number, y3d: number, z3d: number) => {
        const scale = camZ / (camZ - z3d);
        return {
          x: width / 2 + x3d * scale,
          y: height / 2 + y3d * scale,
          scale: scale,
          z: z3d,
        };
      };

      for (let y = -400; y < height + 400; y += spacing) {
        const actualY1 = y + yOffset;
        const actualY2 = actualY1 + spacing;

        const angleOffset = time + scrollShift * twistRate;
        const angleA1 = actualY1 * twistRate + angleOffset;
        const angleA2 = actualY2 * twistRate + angleOffset;

        const x3D_A1 = Math.cos(angleA1) * radius;
        const z3D_A1 = Math.sin(angleA1);
        const y3D_A1 = actualY1 - height / 2;

        const x3D_A2 = Math.cos(angleA2) * radius;
        const z3D_A2 = Math.sin(angleA2);
        const y3D_A2 = actualY2 - height / 2;

        const x3D_B1 = Math.cos(angleA1 + Math.PI) * radius;
        const z3D_B1 = Math.sin(angleA1 + Math.PI);
        const y3D_B1 = y3D_A1;

        const x3D_B2 = Math.cos(angleA2 + Math.PI) * radius;
        const z3D_B2 = Math.sin(angleA2 + Math.PI);
        const y3D_B2 = y3D_A2;

        const pA1 = project(x3D_A1, y3D_A1, z3D_A1);
        const pA2 = project(x3D_A2, y3D_A2, z3D_A2);
        const pB1 = project(x3D_B1, y3D_B1, z3D_B1);
        const pB2 = project(x3D_B2, y3D_B2, z3D_B2);

        const colorBase = "212, 175, 55";

        elements.push({
          type: "backbone",
          p1: pA1,
          p2: pA2,
          z: (pA1.z + pA2.z) / 2,
          colorBase,
        });

        elements.push({
          type: "backbone",
          p1: pB1,
          p2: pB2,
          z: (pB1.z + pB2.z) / 2,
          colorBase,
        });

        elements.push({
          type: "rung",
          p1: pA1,
          p2: pB1,
          z: (pA1.z + pB1.z) / 2,
          colorBase,
        });
      }

      elements.sort((a, b) => a.z - b.z);

      elements.forEach((el) => {
        const scale = (el.p1.scale + el.p2.scale) / 2;
        const depthAlpha = Math.max(0, (el.z + 1.5) / 2.5);

        ctx.beginPath();
        ctx.moveTo(el.p1.x, el.p1.y);
        ctx.lineTo(el.p2.x, el.p2.y);

        if (el.type === "backbone") {
          ctx.lineWidth = 18 * scale;
          ctx.strokeStyle = `rgba(0, 0, 0, ${0.8 * depthAlpha})`;
          ctx.stroke();

          ctx.lineWidth = 12 * scale;
          ctx.strokeStyle = `rgba(${el.colorBase}, ${0.5 * depthAlpha})`;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(el.p1.x - 2 * scale, el.p1.y - 2 * scale);
          ctx.lineTo(el.p2.x - 2 * scale, el.p2.y - 2 * scale);
          ctx.lineWidth = 3 * scale;
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 * depthAlpha})`;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(el.p1.x, el.p1.y, 6 * scale, 0, Math.PI * 2);
          const radGrad = ctx.createRadialGradient(
            el.p1.x,
            el.p1.y,
            0,
            el.p1.x,
            el.p1.y,
            6 * scale
          );
          radGrad.addColorStop(0, `rgba(255,255,255,${depthAlpha})`);
          radGrad.addColorStop(1, `rgba(${el.colorBase},0)`);
          ctx.fillStyle = radGrad;
          ctx.fill();
        } else {
          const gradient = ctx.createLinearGradient(
            el.p1.x,
            el.p1.y,
            el.p2.x,
            el.p2.y
          );
          gradient.addColorStop(0, `rgba(${el.colorBase}, 0)`);
          gradient.addColorStop(0.2, `rgba(${el.colorBase}, ${0.3 * depthAlpha})`);
          gradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.6 * depthAlpha})`);
          gradient.addColorStop(0.8, `rgba(${el.colorBase}, ${0.3 * depthAlpha})`);
          gradient.addColorStop(1, `rgba(${el.colorBase}, 0)`);

          ctx.lineWidth = 5 * scale;
          ctx.strokeStyle = gradient;
          ctx.stroke();

          const cx = (el.p1.x + el.p2.x) / 2;
          const cy = (el.p1.y + el.p2.y) / 2;
          ctx.beginPath();
          ctx.arc(cx, cy, 3 * scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.5 * depthAlpha})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(drawDNA);
    };

    drawDNA();

    // GSAP scroll trigger for rotation tied to scroll
    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress = self.progress;
      },
    });

    // We fade in the canvas later in Hero section, so start it at opacity 0
    gsap.set(canvas, { opacity: 0 });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      scrollTrigger.kill();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="dna-canvas"
      className="fixed top-0 left-0 w-screen h-screen -z-20 pointer-events-none blur-[12px] scale-105 mix-blend-screen"
    />
  );
}
