import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="py-20 px-6 md:px-12 lg:px-20 border-t border-[rgba(212,175,55,0.1)] relative overflow-hidden" style={{ background: "linear-gradient(to top, rgba(212,175,55,0.05), transparent)" }}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">

                {/* Brand Column */}
                <div className="flex flex-col gap-6 lg:col-span-2">
                    <Link href="/" className="inline-block flex-shrink-0">
                        <span className="text-3xl font-light tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] to-[#d4af37]" style={{ fontFamily: "var(--font-montserrat)" }}>SCALSET</span>
                    </Link>
                    <p className="text-[rgba(255,255,255,0.6)] text-[15px] font-sans leading-relaxed max-w-sm">
                        Partenaire d&apos;exécution opérationnelle. Nous permettons aux entreprises de croître en déléguant l&apos;opérationnel quotidien.
                    </p>
                </div>

                {/* Navigation */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-[#f4f4f4] font-bold tracking-widest uppercase text-sm" style={{ fontFamily: "var(--font-sans)" }}>Navigation</h4>
                    <nav className="flex flex-col gap-3">
                        <Link href="/" className="text-[rgba(255,255,255,0.6)] hover:text-[#d4af37] text-[15px] font-sans transition-colors w-fit">Accueil</Link>
                        <Link href="/a-propos" className="text-[rgba(255,255,255,0.6)] hover:text-[#d4af37] text-[15px] font-sans transition-colors w-fit">À propos</Link>
                        <Link href="/services" className="text-[rgba(255,255,255,0.6)] hover:text-[#d4af37] text-[15px] font-sans transition-colors w-fit">Services</Link>
                    </nav>
                </div>

                {/* Contact/Action */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-[#f4f4f4] font-bold tracking-widest uppercase text-sm" style={{ fontFamily: "var(--font-sans)" }}>Contact</h4>
                    <p className="text-[rgba(255,255,255,0.6)] text-[15px] font-sans">Prêt à faire passer votre entreprise au niveau supérieur ?</p>
                    <Link href="/contact" className="text-[#d4af37] hover:text-[#eaddc5] text-[15px] font-sans underline decoration-[#d4af37]/40 decoration-1 underline-offset-4 transition-all w-fit mt-2">
                        Démarrer un projet
                    </Link>
                </div>

            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[rgba(212,175,55,0.1)] flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
                <p className="text-[rgba(255,255,255,0.3)] text-xs font-sans tracking-wide">
                    © {new Date().getFullYear()} SCALSET. Tous droits réservés.
                </p>
                <div className="flex gap-6">
                    <Link href="/mentions-legales" className="text-[rgba(255,255,255,0.3)] hover:text-[#d4af37] text-xs font-sans transition-colors">Mentions légales</Link>
                    <Link href="/confidentialite" className="text-[rgba(255,255,255,0.3)] hover:text-[#d4af37] text-xs font-sans transition-colors">Confidentialité</Link>
                </div>
            </div>
        </footer>
    );
}
