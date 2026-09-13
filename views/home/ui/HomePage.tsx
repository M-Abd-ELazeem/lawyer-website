import { Hero } from "@/widgets/hero";
import { About } from "@/widgets/about";
import { ServicesGrid } from "@/widgets/services-grid";
import { WhyUs } from "@/widgets/why-us";
import { CtaBanner } from "@/widgets/cta-banner";
import { ContactSection } from "@/widgets/contact-section";

export function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <ServicesGrid />
      <WhyUs />
      <CtaBanner />
      <ContactSection />
    </main>
  );
}
