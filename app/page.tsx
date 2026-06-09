import Hero from "@/components/Hero";
import CustomCursor from "@/components/CustomCursor";
import SSPrismaticIntegration from "@/components/SSPrismaticIntegration";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <CustomCursor />
      <Hero />
      <SSPrismaticIntegration />
    </main>
  );
}
