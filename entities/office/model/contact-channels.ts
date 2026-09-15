import type { IconKey } from "@/shared/ui/icons";
import { siteConfig } from "../config/site";
import { buildWhatsAppUrl, telHref } from "../lib/contact-links";

export type ContactChannel = {
  title: string;
  description: string;
  href: string;
  external: boolean;
  icon: IconKey;
};

/** The phone / WhatsApp / address channels shown above the contact form. */
export const contactChannels: ContactChannel[] = [
  {
    title: "اتصل بنا",
    description: siteConfig.phone.display,
    href: telHref(),
    external: false,
    icon: "phone",
  },
  {
    title: "واتساب",
    description: "راسلنا مباشرة على الواتساب",
    href: buildWhatsAppUrl(),
    external: true,
    icon: "whatsapp",
  },
  {
    title: "العنوان",
    description: siteConfig.address.short,
    href: siteConfig.address.mapsUrl,
    external: true,
    icon: "map-pin",
  },
];
