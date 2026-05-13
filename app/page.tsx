import Hero from "@/components/Hero";
import Outsoursection from "@/components/Outsoursection";
import ServicesOverview from "@/components/ServicesOverview";
import WhyUs from "@/components/WhyUs";
import TargetAudience from "@/components/TargetAudience";
import HowItWorks from "@/components/HowItWorks";
import Extersec from "@/components/Extersec";
import Faq from "@/components/Faq";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Outsoursection />
      <WhyUs />
      <ServicesOverview />
      <TargetAudience />
      <HowItWorks />
      <Extersec />
      <Faq />
    </main>
  );
}
