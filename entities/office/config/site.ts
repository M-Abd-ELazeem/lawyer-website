/**
 * Single source of truth for the office's identity and contact details.
 *
 * These values were previously retyped in CTA.tsx, ContactForm.tsx and
 * Footer.tsx, which is how the WhatsApp number drifted into a broken form.
 */
export const siteConfig = {
  name: "محمود حسن",
  title: "مستشار قانوني",
  legalName: "مكتب المستشار محمود حسن للاستشارات القانونية",
  description:
    "مكتب استشارات قانونية متخصص في تقديم الحلول القانونية المتكاملة للأفراد والشركات في إمارة أبوظبي.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mahmoud-hassan.ae",
  locale: "ar_AE",

  phone: {
    /** Human-readable, with spaces. Never put this in a URL. */
    display: "+971 56 648 1670",
    /** Digits only. This is what tel: and wa.me require. */
    raw: "971566481670",
  },

  email: "info@mahmoud-hassan.ae",

  address: {
    short: "مزيد مول، مدينة محمد بن زايد، أبوظبي",
    full: "مزيد مول (Mazyad Mall) - مدينة محمد بن زايد - إمارة أبوظبي، الإمارات العربية المتحدة",
    mapsUrl: "https://maps.google.com/?q=Mazyad+Mall+Mohammed+Bin+Zayed+City+Abu+Dhabi",
  },

  hours: [
    { days: "الأحد - الخميس", time: "9 صباحاً - 6 مساءً" },
    { days: "السبت", time: "10 صباحاً - 2 ظهراً" },
    { days: "الجمعة", time: "مغلق" },
  ],

  images: {
    hero: "/hero-lawyer.jpg",
    about: "/about-desk.jpg",
  },

  stats: [
    { value: "+8", label: "سنة خبرة" },
    { value: "+500", label: "قضية ناجحة" },
    { value: "+200", label: "موكل راضٍ" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
