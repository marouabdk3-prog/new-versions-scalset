import { TrendingDown, Users, Settings, Zap, ShieldCheck, Globe } from "lucide-react";

// Passed standard sizes and colors to icons to control them via wrapper class
const features = [
    {
        icon: <TrendingDown size={36} strokeWidth={1.5} />,
        title: "Réduisez vos coûts sans perdre en performance",
        description: "Bénéficiez d’une équipe performante à un coût bien inférieur au marché local."
    },
    {
        icon: <Users size={36} strokeWidth={1.5} />,
        title: "Des équipes encadrées, pas des freelances isolés",
        description: "Vos équipes travaillent dans nos locaux, supervisées par nos managers au quotidien."
    },
    {
        icon: <Settings size={36} strokeWidth={1.5} />,
        title: "On s’occupe de tout, vous restez concentré",
        description: "Recrutement, formation et management : nous gérons l’ensemble pour vous."
    },
    {
        icon: <Zap size={36} strokeWidth={1.5} />,
        title: "Moins de coûts, plus de résultats",
        description: "Améliorez votre rentabilité tout en maintenant un haut niveau de performance."
    },
    {
        icon: <ShieldCheck size={36} strokeWidth={1.5} />,
        title: "Aucune contrainte RH ni charges administratives",
        description: "Aucune gestion RH, aucune cotisation, aucune contrainte administrative de votre côté."
    },
    {
        icon: <Globe size={36} strokeWidth={1.5} />,
        title: "Couverture multilingue",
        description: "Nous mettons en place des équipes capables d’intervenir en français, anglais et dans d’autres langues selon vos besoins."
    }
];

export default function WhyUs() {
    return (
        <section className="py-24 px-6 md:px-12 lg:px-20 relative z-10 max-[768px]:py-20 max-[480px]:py-16 max-[480px]:px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-24 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#F8FAFC] to-[#94A3B8] py-2 max-[768px]:text-4xl max-[768px]:mb-16 max-[480px]:text-[1.75rem] max-[480px]:leading-snug max-[480px]:mb-12">
                    Pourquoi les entreprises<br />choisissent ScalSet
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16 max-[480px]:gap-y-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}

                            className="group relative flex flex-col items-center"
                        >
                            {/* Hover Core Glow Effect between Icon and Text */}
                            <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-48 h-48 bg-slate-200/0 group-hover:bg-[#E2E8F0]/15 blur-[40px] transition-colors duration-700 pointer-events-none z-0 rounded-full" />

                            {/* Icon Box (Floating above) */}
                            <div className="relative z-20 w-[92px] h-[92px] bg-[#0d0d14] border border-white/5 shadow-2xl rounded-[1.25rem] flex items-center justify-center transition-all duration-500 group-hover:-translate-y-2 group-hover:border-white/20 group-hover:shadow-[0_0_30px_rgba(226,232,240,0.15)] mb-[1.25rem]">
                                {/* Glossy highlight on top of icon box */}
                                <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/[0.12] to-transparent rounded-t-[1.25rem] pointer-events-none" />
                                {/* Bottom dark inverse shadow */}
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent rounded-b-[1.25rem] pointer-events-none" />

                                {/* Icon wrapper with glow transition */}
                                <div className="text-slate-100 group-hover:text-[#F8FAFC] drop-shadow-[0_0_0px_rgba(226,232,240,0)] group-hover:drop-shadow-[0_0_15px_rgba(248,250,252,0.8)] transition-all duration-500 relative z-10">
                                    {feature.icon}
                                </div>
                            </div>

                            {/* Text Card */}
                            <div className="relative z-10 w-full flex-1 bg-[#11111B] border border-white/5 rounded-3xl p-8 pt-10 flex flex-col items-center text-center transition-all duration-500 group-hover:border-white/10 group-hover:bg-[#151520] glass-panel max-[480px]:p-6 max-[480px]:pt-8">
                                {/* Subtle top edge highlight on text card (appears on hover) */}
                                <div className="absolute inset-x-[15%] top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                <h3 className="text-[1.35rem] font-bold text-slate-100 mb-3 tracking-tight group-hover:text-white transition-colors duration-300 max-[480px]:text-xl max-[480px]:mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-400 text-[15px] leading-relaxed max-w-[280px] group-hover:text-slate-300 transition-colors duration-300 max-[480px]:text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
