"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "Est-ce que c’est vraiment moins cher que recruter en interne ?",
        answer: (
            <div className="space-y-4">
                <p>Oui. Vous bénéficiez d’une équipe performante à un coût bien inférieur au marché local, tout en maintenant un haut niveau de performance.</p>
            </div>
        )
    },
    {
        question: "Est-ce que je garde le contrôle sur mon équipe ?",
        answer: (
            <div className="space-y-4">
                <p>Oui. Votre équipe travaille depuis nos locaux, encadrée et supervisée, mais reste entièrement pilotée par vous via WhatsApp, email ou vos outils.</p>
            </div>
        )
    },
    {
        question: "Est-ce que vous gérez tout le recrutement et le management ?",
        answer: (
            <div className="space-y-4">
                <p>Oui. Nous recrutons, formons et encadrons les profils pour vous. Vous n’avez aucune gestion opérationnelle à faire.</p>
            </div>
        )
    },
    {
        question: "Est-ce que ce sont des freelances ?",
        answer: (
            <div className="space-y-4">
                <p>Non. Ce sont des équipes qui travaillent dans nos locaux, encadrées, supervisées et sous contrat, garantissant stabilité et continuité.</p>
            </div>
        )
    },
    {
        question: "Est-ce que je dois gérer des charges ou des contraintes RH ?",
        answer: (
            <div className="space-y-4">
                <p>Non. Vous travaillez en prestation de service, sans gestion RH, sans cotisations ni contraintes administratives.</p>
            </div>
        )
    },
    {
        question: "Est-ce que ça peut s’adapter à mon activité ?",
        answer: (
            <div className="space-y-4">
                <p>Oui. Si une tâche peut être réalisée à distance, nous pouvons mettre en place les profils adaptés à votre besoin.</p>
            </div>
        )
    }
];

export default function Faq() {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggleOpen = (index: number) => {
        setOpenIndexes((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    return (
        <section className="py-24 px-6 md:px-12 lg:px-20 max-[768px]:py-20 max-[480px]:py-16 max-[480px]:px-4">
            <div className="max-w-4xl mx-auto flex flex-col gap-16">

                <div
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#F8FAFC] to-[#94A3B8] leading-[1.2] py-2 max-[768px]:text-4xl max-[480px]:text-[1.75rem]">
                        Questions fréquentes
                    </h2>
                </div>

                <div className="flex flex-col gap-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndexes.includes(index);
                        return (
                            <div
                                key={index}
                                className="border border-white/10 rounded-2xl bg-[#11111b]/50 backdrop-blur-sm overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleOpen(index)}
                                    className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none max-[480px]:px-4 max-[480px]:py-4"
                                >
                                    <span className="text-lg font-semibold text-slate-100 max-[480px]:text-base">{faq.question}</span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ml-4 ${isOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                <div
                                    className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
                                >
                                    <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4 max-[480px]:px-4 max-[480px]:pb-4">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
