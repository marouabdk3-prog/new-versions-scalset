import type { Metadata } from "next";
import { Space_Grotesk, Syncopate } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "SCALSET - Partenaire d'exécution opérationnelle",
  description: "Tu décides. ScalSet exécute. La croissance devient maîtrisée.",
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LogoAnimationProvider } from "@/components/LogoAnimationContext";
import SandBackground from "@/components/SandBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark max-[480px]:overflow-x-hidden">
      <body className={`${spaceGrotesk.variable} ${syncopate.variable} antialiased text-[#F8FAFC] relative min-h-screen overflow-x-hidden`}>
        <SandBackground />
        <LogoAnimationProvider>
          <div className="relative z-10 max-[480px]:overflow-x-hidden max-[480px]:w-full">
            <Header />
            {children}
            <Footer />
          </div>
        </LogoAnimationProvider>
      </body>
    </html>
  );
}
