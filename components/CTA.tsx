import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/utils/contact-links";

export default function CTA() {
  return (
    <section className="bg-dark-secondary py-16 px-6 lg:px-16 border-y border-white/5">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-c-white leading-tight">
          هل تحتاج استشارة قانونية؟
        </h2>

        {/* Description */}
        <p className="text-c-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          تواصل معنا اليوم لحجز موعدك في مكتبنا بـ{siteConfig.address.short}.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link href="/#contact" className="btn-gold flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3">
            <span>تواصل معي</span>
            <span className="text-lg leading-none">←</span>
          </Link>

          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-light flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3"
          >
            تواصل عبر واتساب
          </a>
        </div>
      </div>
    </section>
  );
}
