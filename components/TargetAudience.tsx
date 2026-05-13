import { Building2, Rocket, ShoppingCart, Briefcase, Lightbulb, FileText } from "lucide-react";

const targets = [
    {
        title: "Grandes entreprises",
        description: "Nous pouvons structurer une organisation complète sans limite de personnel pour gérer toute votre exécution à grande échelle.",
        icon: Building2,
    },
    {
        title: "E-commerce",
        description: "Pour soutenir vos ventes, votre support client et votre gestion opérationnelle.",
        icon: ShoppingCart,
    },
    {
        title: "Agences",
        description: "Pour exécuter davantage et mieux servir vos clients.",
        icon: Briefcase,
    },
    {
        title: "Startups",
        description: "Pour construire une équipe adaptée à votre croissance.",
        icon: Rocket,
    },
    {
        title: "Entrepreneurs",
        description: "Pour vous libérer de l’opérationnel et vous concentrer sur le développement.",
        icon: Lightbulb,
    },
    {
        title: "Cabinets & services",
        description: "Pour gagner en organisation et en qualité d’exécution.",
        icon: FileText,
    },
];

// Duplicate for seamless scroll
const scrollingTargets = [...targets, ...targets, ...targets];

export default function TargetAudience() {
    return (
        <section className="py-24 relative">
            {/* Top and Bottom Gradient Blends removed for consistent global background */}
            <div className="flex flex-col items-center gap-16">
                {/* Static centered titles */}
                <div className="text-center">
                    <p className="text-slate-500 uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-4">
                        SCALSET
                    </p>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white leading-none">
                        Who needs us
                    </h2>
                </div>

                {/* Marquee Container */}
                <div className="relative w-full overflow-hidden">
                    {/* Edge Fades removed for consistent global background */}

                    {/* Scrolling Content */}
                    <div className="flex gap-6 w-max px-6 animate-marquee-ltr">
                        {scrollingTargets.map((target, i) => {
                            const Icon = target.icon;
                            return (
                                <div
                                    key={`${target.title}-${i}`}
                                    className="glass-panel w-[85vw] max-w-[300px] md:w-[350px] md:max-w-none rounded-3xl p-6 md:p-8 flex flex-col items-center text-center gap-6 cursor-default group"
                                >
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <Icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                                            {target.title}
                                        </h3>
                                        <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                            {target.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}




