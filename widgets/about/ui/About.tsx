import Image from "next/image";
import { siteConfig } from "@/entities/office";
import { Card, Container, Divider, Section } from "@/shared/ui";
import { iconRegistry } from "@/shared/ui/icons";
import { aboutFeatures } from "../model/features";

export function About() {
  return (
    <Section id="about">
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* النص (يمين في RTL) */}
          <div className="w-full lg:flex-1 text-right space-y-4">
            <div className="inline-block">
              <Divider variant="gold" className="mb-6" />
              <p className="text-gold text-small font-semibold tracking-widest mb-1">نبذة عني</p>
              <span className="block h-0.5 w-8 bg-gold rounded-full" />
            </div>

            <h2 className="text-h2 font-bold text-c-white leading-tight">
              المستشار <span className="text-gold">محمود حسن</span>
            </h2>

            <p className="text-slate-300 text-body leading-relaxed pt-2">
              مستشار قانوني مقيم في إمارة أبوظبي، يمتلك خبرة ممتدة في تقديم الاستشارات القانونية للأفراد والشركات. يجمع
              بين العمق الأكاديمي والممارسة العملية، ويؤمن بأن العدالة تبدأ من فهمٍ دقيق لكل تفصيل في ملف الموكل.
            </p>

            <p className="text-slate-300 text-body leading-relaxed">
              أسس مكتبه ليكون منصة قانونية متخصصة تخدم المجتمع التجاري والعائلي داخل الإمارات، مع التركيز على الدقة،
              السرية، والنتائج المدروسة.
            </p>
          </div>

          {/* الصورة (يسار في RTL) */}
          <div className="w-full lg:flex-1">
            <div className="relative rounded-2xl overflow-hidden border-gold shadow-2xl group">
              <Image
                src={siteConfig.images.about}
                alt={`المستشار ${siteConfig.name}`}
                width={600}
                height={400}
                className="w-full h-95 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {aboutFeatures.map((item) => {
            const Icon = iconRegistry[item.icon];
            return (
              <Card key={item.id}>
                <div className="text-gold">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-white font-semibold text-h4">{item.title}</h3>
                <p className="text-slate-400 text-small leading-relaxed">{item.description}</p>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
