import Image from "next/image";
import type { Feature } from "@/entities/office";
import { Card, Container, Divider, Section } from "@/shared/ui";
import { iconRegistry } from "@/shared/ui/icons";

const features: Feature[] = [
  {
    id: "licensed",
    title: "اعتماد قانوني",
    description: "مرخص لممارسة الاستشارات القانونية في الإمارات.",
    icon: "user-check",
  },
  {
    id: "experience",
    title: "خبرة عملية",
    description: "أكثر من 8 سنة في القضايا التجارية والمدنية.",
    icon: "briefcase",
  },
  {
    id: "academic",
    title: "خلفية أكاديمية",
    description: "ماجستير في القانون مع تخصص في العقود.",
    icon: "book-open",
  },
  {
    id: "bilingual",
    title: "ثنائي اللغة",
    description: "تقديم الاستشارات بالعربية والإنجليزية.",
    icon: "languages",
  },
];

export function About() {
  return (
    <Section id="about">
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* النص (يمين في RTL) */}
          <div className="w-full lg:flex-1 text-right space-y-4">
            <div className="inline-block">
              <Divider variant="gold" className="mb-6" />
              <p className="text-gold text-xs font-semibold tracking-widest mb-1">نبذة عني</p>
              <span className="block h-0.5 w-8 bg-gold rounded-full" />
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-c-white leading-tight">
              المستشار <span className="text-gold">محمود حسن</span>
            </h2>

            <p className="text-slate-300 text-sm lg:text-base leading-relaxed pt-2">
              مستشار قانوني مقيم في إمارة أبوظبي، يمتلك خبرة ممتدة في تقديم الاستشارات القانونية للأفراد والشركات. يجمع
              بين العمق الأكاديمي والممارسة العملية، ويؤمن بأن العدالة تبدأ من فهمٍ دقيق لكل تفصيل في ملف الموكل.
            </p>

            <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
              أسس مكتبه ليكون منصة قانونية متخصصة تخدم المجتمع التجاري والعائلي داخل الإمارات، مع التركيز على الدقة،
              السرية، والنتائج المدروسة.
            </p>
          </div>

          {/* الصورة (يسار في RTL) */}
          <div className="w-full lg:flex-1">
            <div className="relative rounded-2xl overflow-hidden border-gold shadow-2xl group">
              <Image
                src="/about-desk-9hQc1FT4.jpg"
                alt="المستشار محمود حسن"
                width={600}
                height={400}
                className="w-full h-95 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {features.map((item) => {
            const Icon = iconRegistry[item.icon];
            return (
              <Card key={item.id}>
                <div className="text-gold">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-white font-semibold text-base">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
