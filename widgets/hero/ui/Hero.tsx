import Image from "next/image";
import { siteConfig } from "@/entities/office";
import { ButtonLink, Divider } from "@/shared/ui";

export function Hero() {
  return (
    <section id="hero" className="relative container lg:px-15 bg-dark-section min-h-screen">
      <Image
        alt="hero lawyer"
        width={1920}
        height={1080}
        priority
        className="absolute inset-0 size-full object-cover"
        src="/hero-lawyer-CKDTvzYb.jpg"
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#0d1520]/90 via-[#0d1520]/50 to-[#0d1520]/20" />

      <div className="relative min-h-screen flex items-center justify-start px-8 lg:px-20">
        <div className="max-w-xl text-white text-right">
          <Divider variant="gold" className="mb-6" />

          <div className="flex items-center justify-start gap-2 mb-6">
            <p className="text-gold text-sm tracking-widest">{siteConfig.title}</p>
            <span className="text-gold">·</span>
            <p className="text-gold text-sm tracking-widest">أبوظبي</p>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="block mb-2">عدالة بصيرة،</span>
            <span className="block text-gold">واستشارة موثوقة.</span>
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            مكتب المستشار محمود حسن للاستشارات القانونية — خبرة ممتدة في خدمة الأفراد والشركات داخل إمارة أبوظبي بحلول
            قانونية دقيقة ومدروسة.
          </p>

          <div className="flex gap-4 justify-start mb-10">
            <ButtonLink href="/#contact" className="flex items-center gap-2">
              احجز استشارتك الآن ←
            </ButtonLink>
            <ButtonLink href="/#services" variant="light">
              تصفح الخدمات
            </ButtonLink>
          </div>

          <div className="flex gap-8 justify-around border-t border-white/20 pt-6">
            {siteConfig.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-gold text-2xl font-bold">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
