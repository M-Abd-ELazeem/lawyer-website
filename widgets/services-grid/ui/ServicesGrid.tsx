import type { Service } from "@/entities/service";
import { Card, Container, IconBox, Section, SectionHeading } from "@/shared/ui";
import { iconRegistry } from "@/shared/ui/icons";

type ServicesGridProps = {
  services: Service[];
};

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <Section id="services" tone="secondary" className="py-20">
      <Container>
        <SectionHeading
          align="center"
          title="مجالات الممارسة"
          subtitle="نقدّم استشارات متخصصة في أبرز فروع القانون داخل دولة الإمارات."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
          {services.map((service) => {
            const Icon = iconRegistry[service.icon];
            return (
              <Card key={service.id} className="text-right">
                <IconBox className="mb-3">
                  <Icon className="size-6" />
                </IconBox>
                <h3 className="text-white font-semibold mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm">{service.description}</p>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
