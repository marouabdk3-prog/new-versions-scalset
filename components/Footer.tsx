import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="py-20 px-6 md:px-12 lg:px-20 border-t border-white/5" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                {/* Brand Column */}
                <div className="flex flex-col gap-6 lg:col-span-2">
                    <Link href="/" className="relative block w-28 sm:w-36 md:w-44 lg:w-[200px] h-10 sm:h-12 lg:h-[50px] flex-shrink-0 overflow-hidden">
                        <Image
                            src="/SCALSET-1.ico"
                            alt="ScalSet Logo"
                            fill
                            sizes="(min-width: 1024px) 200px, (min-width: 640px) 144px, 112px"
                            className="object-contain object-left scale-[2.2] origin-left"
                        />
                    </Link>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                        Partenaire d&apos;exécution opérationnelle. Nous permettons aux entreprises de croître en déléguant l&apos;opérationnel quotidien.
                    </p>
                </div>

                {/* Navigation */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-white font-bold tracking-tight">Navigation</h4>
                    <nav className="flex flex-col gap-2">
                        <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors">Accueil</Link>
                        <Link href="/a-propos" className="text-slate-400 hover:text-white text-sm transition-colors">À propos</Link>
                        <Link href="/services" className="text-slate-400 hover:text-white text-sm transition-colors">Services</Link>
                    </nav>
                </div>

                {/* Contact/Action */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-white font-bold tracking-tight">Contact</h4>
                    <p className="text-slate-400 text-sm">Prêt à faire passer votre entreprise au niveau supérieur ?</p>
                    <Link href="/contact" className="text-slate-100 hover:text-white text-sm font-bold underline decoration-slate-400 decoration-2 underline-offset-4 transition-all">
                        Démarrer un projet
                    </Link>
                </div>

            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 text-xs">
                    © {new Date().getFullYear()} SCALSET. Tous droits réservés.
                </p>
                <div className="flex gap-6">
                    <Link href="/mentions-legales" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Mentions légales</Link>
                    <Link href="/confidentialite" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Confidentialité</Link>
                </div>
            </div>
        </footer>
    );
}
