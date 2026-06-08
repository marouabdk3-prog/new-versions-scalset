import type { Metadata } from "next";
import { Space_Grotesk, Syncopate, Cormorant_Garamond } from "next/font/google";
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

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "SCALSET - Partenaire d'exécution opérationnelle",
  description: "Tu décides. ScalSet exécute. La croissance devient maîtrisée.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LogoAnimationProvider } from "@/components/LogoAnimationContext";
import MercuryIntro from "@/components/MercuryIntro";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark max-[480px]:overflow-x-hidden">
      <body className={`${spaceGrotesk.variable} ${syncopate.variable} ${cormorant.variable} antialiased text-[#F8FAFC] relative min-h-screen overflow-x-hidden`}>
        {/* Intro overlay sits above everything; real site is behind it */}
        <MercuryIntro />
        <LogoAnimationProvider>
          <div id="main-site" className="relative z-10 max-[480px]:overflow-x-hidden max-[480px]:w-full">
            <Header />
            {children}
            <Footer />
          </div>
        </LogoAnimationProvider>
      </body>
    </html>
  );
}
