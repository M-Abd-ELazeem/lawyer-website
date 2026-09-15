import { ContactInfoCards, OfficeInfoPanel } from "@/entities/office";
import type { Service } from "@/entities/service";
import { ConsultationForm } from "@/features/consultation-request";
import { Container, Section, SectionHeading } from "@/shared/ui";

type ContactSectionProps = {
  services: Service[];
};

export function ContactSection({ services }: ContactSectionProps) {
  return (
    <Section id="contact" className="py-20">
      <Container className="max-w-6xl space-y-12">
        <SectionHeading
          align="center"
          eyebrow="تواصل معي"
          title="نحن هنا لخدمتك"
          subtitle="اترك لنا تفاصيل قضيتك وسنعاود التواصل معك خلال أقرب وقت ممكن."
        />

        <ContactInfoCards />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <ConsultationForm services={services} />
          </div>
          <div className="lg:col-span-5">
            <OfficeInfoPanel />
          </div>
        </div>
      </Container>
    </Section>
  );
}
