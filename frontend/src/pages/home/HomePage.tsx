import { Navbar } from "@/components/HoveringBars/Navbar";
import { Footer } from "@/components/HoveringBars/Footer";
import { Hero } from "@/sections/HeroSection";
import { Services } from "@/sections/ServicesSection";
import { Metrics } from "@/sections/MetricsSection";
import KXstudios from "@/sections/kx";
import ServicesOffered from "@/sections/servicesOffered";
import { SystemArchetypeHUD } from "@/sections/ArchtypeSection";
import { EngineeringAuditCta } from "@/sections/EngineeringAuditCta";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      
      <main>
        <Hero />
        <Services />
        <ServicesOffered/>
        <SystemArchetypeHUD />
        <KXstudios/>
        <Metrics />
        <EngineeringAuditCta />
        
      </main>
      <Footer />
    </div>
  );
}
