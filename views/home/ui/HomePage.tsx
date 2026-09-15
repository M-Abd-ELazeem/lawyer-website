import { getServices } from "@/entities/service";
import { Hero } from "@/widgets/hero";
import { About } from "@/widgets/about";
import { ServicesGrid } from "@/widgets/services-grid";
import { WhyUs } from "@/widgets/why-us";
import { CtaBanner } from "@/widgets/cta-banner";
import { ContactSection } from "@/widgets/contact-section";

export async function HomePage() {
  // Fetched once here and passed down: the services grid and the contact
  // form's consultation-type options are the same list.
  const services = await getServices();

  return (
    <main>
      <Hero />
      <About />
      <ServicesGrid services={services} />
      <WhyUs />
      <CtaBanner />
      <ContactSection services={services} />
    </main>
  );
}
