"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Users, GraduationCap, Rocket } from "lucide-react";
import Image from "next/image";

const steps = [
    {
        number: "01",
        title: "Analyse",
        description: "Définition précise de vos attentes et des compétences requises. Nous étudions votre organisation en profondeur.",
        icon: Search,
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    },
    {
        number: "02",
        title: "Recrutement",
        description: "Sélection rigoureuse des meilleurs talents. Nous trions, testons et validons les profils parfaitement adaptés à votre ADN.",
        icon: Users,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    },
    {
        number: "03",
        title: "Formation",
        description: "Vos équipes intègrent nos locaux premium. Nous gérons la formation continue, le matériel et le management de proximité.",
        icon: GraduationCap,
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
    },
    {
        number: "04",
        title: "Pilotage",
        description: "Lancement opérationnel immédiat. Vous pilotez votre nouvelle équipe directement via vos outils habituels.",
        icon: Rocket,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    },
];

export default function HowItWorks() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const cubeTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#stack-cube",
                    start: "top top",
                    end: "+=2000",
                    scrub: 1,
                    pin: true,
                }
            });

            const layers = gsap.utils.toArray('.cube-layer') as HTMLElement[];
            const texts = gsap.utils.toArray('.cube-text-item') as HTMLElement[];
            const zOffsets = [0, 60, 120, 180]; // Distances

            layers.forEach((layer: HTMLElement, index) => {
                cubeTl.to(layer, {
                    z: zOffsets[index],
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out'
                }, index * 0.5);

                cubeTl.to(texts[index], {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power2.out',
                    onStart: () => texts[index].classList.add('active'),
                    onReverseComplete: () => texts[index].classList.remove('active')
                }, index * 0.5);
            });

            cubeTl.to(layers, {
                onStart: () => {
                    layers.forEach((l: HTMLElement) => l.classList.add('glow-active'));
                },
                onReverseComplete: () => {
                    layers.forEach((l: HTMLElement) => l.classList.remove('glow-active'));
                },
                duration: 0.5
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="stack-cube" className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent perspective-[2000px] z-10">
            
            {/* Header / Title */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center w-full z-20 pointer-events-none">
                <p className="text-[#d4af37] uppercase tracking-[0.3em] text-xs font-bold mb-4">PROCESSUS</p>
                <h2 className="font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] to-[#a3a3a3]"
                    style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}>
                    Comment <em style={{ fontStyle: "italic", background: "linear-gradient(180deg, #ffffff 0%, #eaddc5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ça fonctionne</em>
                </h2>
            </div>

            <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 mt-20">
                {/* 3D Cube Container */}
                <div className="flex-1 flex justify-center items-center w-full h-[400px]">
                    <div className="relative w-[250px] h-[250px] md:w-[350px] md:h-[350px] preserve-3d rotate-x-60 rotate-z-minus-45" style={{ transformStyle: "preserve-3d", transform: "rotateX(60deg) rotateZ(-45deg)" }}>
                        {steps.map((step, index) => (
                            <div 
                                key={index} 
                                className="cube-layer absolute top-0 left-0 w-full h-full bg-[rgba(20,20,20,0.8)] backdrop-blur-[10px] border border-white/5 opacity-0 shadow-[0_50px_100px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out overflow-hidden"
                                style={{ transform: "translateZ(500px)" }}
                            >
                                <Image
                                    src={step.image}
                                    alt={step.title}
                                    fill
                                    className="object-cover grayscale-[40%] opacity-40 mix-blend-overlay"
                                />
                                <div className="absolute inset-0 border border-transparent transition-colors duration-500 [.glow-active_&]:border-[#d4af37]/80 [.glow-active_&]:shadow-[0_0_40px_rgba(212,175,55,0.4),inset_0_0_20px_rgba(212,175,55,0.2),-20px_20px_60px_rgba(0,0,0,0.8)]" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Texts */}
                <div className="flex-1 flex flex-col justify-center gap-6 md:gap-10 pl-0 lg:pl-16 w-full mt-12 lg:mt-0 relative z-20">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="cube-text-item flex items-center gap-4 md:gap-8 opacity-20 translate-x-[30px] transition-all duration-500 ease-out [&.active]:opacity-100 [&.active]:translate-x-0">
                                <span className="layer-num text-5xl md:text-6xl font-black leading-none text-transparent" style={{ WebkitTextStroke: "1px rgba(212,175,55,0.8)", fontFamily: "var(--font-sans)" }}>
                                    {step.number}
                                </span>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-xl md:text-2xl uppercase tracking-widest text-[#f4f4f4] m-0 flex items-center gap-3" style={{ fontFamily: "var(--font-montserrat)" }}>
                                        <Icon size={20} className="text-[#d4af37]" /> {step.title}
                                    </h3>
                                    <p className="text-sm md:text-[15px] text-[#a3a3a3] max-w-sm m-0 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
