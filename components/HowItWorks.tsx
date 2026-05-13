import { Search, Users, GraduationCap, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Analyse de votre besoin",
    description: "Définition précise de vos attentes et des compétences requises.",
    icon: Search,
  },
  {
    number: "02",
    title: "Recrutement des profils adaptés",
    description: "Sélection rigoureuse des meilleurs talents pour votre projet.",
    icon: Users,
  },
  {
    number: "03",
    title: "Formation et encadrement dans nos locaux",
    description: "Intégration, formation continue et management de proximité.",
    icon: GraduationCap,
  },
  {
    number: "04",
    title: "Mise en place et pilotage avec vous",
    description: "Lancement opérationnel, suivi des performances et ajustements.",
    icon: Rocket,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden max-[768px]:py-20 max-[480px]:py-16">
      <div className="max-w-7xl mx-auto px-6 relative z-10 max-[480px]:px-4">
        <div className="text-center mb-16 md:mb-24">
          <p className="text-slate-500 uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-4">
            Processus
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white leading-none max-[768px]:text-4xl max-[480px]:text-[1.75rem]">
            Comment ça fonctionne
          </h2>
        </div>

        <div className="relative">
          {/* Connector Line - Desktop Horizontal */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-slate-700/50 z-0" />
          
          {/* Connector Line - Mobile Vertical */}
          <div className="lg:hidden absolute top-10 bottom-20 left-10 w-[2px] border-l-2 border-dashed border-slate-700/50 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 max-w-2xl lg:max-w-none mx-auto relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative group flex flex-row lg:flex-col items-start lg:items-center gap-6 lg:gap-8 cursor-default">
                  {/* Icon & Number Container */}
                  <div className="relative z-10 flex flex-col items-center shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-[#0a0f1c] border border-slate-800 shadow-xl flex items-center justify-center group-hover:scale-110 group-hover:border-white/50 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Icon className="w-8 h-8 text-white group-hover:text-slate-200 transition-colors duration-300 relative z-10" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 lg:text-center glass-panel rounded-3xl p-6 lg:p-8 transform group-hover:-translate-y-2 group-hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)] transition-all duration-300 border border-white/5 group-hover:border-white/20 bg-white/2 group-hover:bg-white/4 relative overflow-hidden w-full">
                    {/* Background Number */}
                    <div className="absolute -top-4 -right-2 lg:-top-6 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 text-7xl lg:text-8xl font-black text-white/10 select-none transition-all duration-500 pointer-events-none">
                      {step.number}
                    </div>
                    
                    <div className="relative z-10">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed font-medium group-hover:text-slate-300 transition-colors">
                        {step.description}
                      </p>
                    </div>
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
