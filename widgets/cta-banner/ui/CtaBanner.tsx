import { buildWhatsAppUrl, siteConfig } from "@/entities/office";
import { ButtonExternalLink, ButtonLink } from "@/shared/ui";

export function CtaBanner() {
  return (
    <section className="bg-dark-secondary py-16 px-6 lg:px-16 border-y border-white/5">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-h2 font-bold text-c-white leading-tight">
          هل تحتاج استشارة قانونية؟
        </h2>

        <p className="text-c-foreground text-body leading-relaxed max-w-2xl mx-auto">
          تواصل معنا اليوم لحجز موعدك في مكتبنا بـ{siteConfig.address.short}.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <ButtonLink
            href="/#contact"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3"
          >
            <span>تواصل معي</span>
            <span className="text-lg leading-none">←</span>
          </ButtonLink>

          <ButtonExternalLink
            href={buildWhatsAppUrl()}
            variant="light"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3"
          >
            تواصل عبر واتساب
          </ButtonExternalLink>
        </div>
      </div>
    </section>
  );
}
