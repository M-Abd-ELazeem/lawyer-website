import { getServices } from "@/entities/service";
import { Card, Container, IconBox, PageHeader, Section } from "@/shared/ui";
import { iconRegistry } from "@/shared/ui/icons";
import { CtaBanner } from "@/widgets/cta-banner";

export async function ServicesPage() {
  const services = await getServices();

  return (
    <main>
      <Section className="py-20">
        <Container className="max-w-6xl space-y-10">
          <PageHeader
            title="مجالات الممارسة"
            subtitle="نقدّم استشارات متخصصة في أبرز فروع القانون داخل دولة الإمارات."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const Icon = iconRegistry[service.icon];
              return (
                <Card key={service.id} className="text-right">
                  <IconBox className="mb-3">
                    <Icon className="size-6" />
                  </IconBox>
                  <h2 className="text-white font-semibold text-h4 mb-2">{service.title}</h2>
                  <p className="text-slate-400 text-small">{service.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </main>
  );
}
