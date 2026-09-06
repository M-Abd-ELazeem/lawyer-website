import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import CTA from "@/components/CTA";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <WhyUs /> 
      <CTA />
      <ContactForm />
      {/* 
      
     
    
      <Articles />
       */}
    </main>
  );
}
