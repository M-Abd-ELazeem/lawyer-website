import { IconBox } from "@/shared/ui";
import { MapPinIcon, PhoneIcon, WhatsappIcon } from "@/shared/ui/icons";
import { siteConfig } from "../config/site";
import { buildWhatsAppUrl, telHref } from "../lib/contact-links";

const cards = [
  {
    title: "اتصل بنا",
    description: siteConfig.phone.display,
    href: telHref(),
    external: false,
    Icon: PhoneIcon,
  },
  {
    title: "واتساب",
    description: "راسلنا مباشرة على الواتساب",
    href: buildWhatsAppUrl(),
    external: true,
    Icon: WhatsappIcon,
  },
  {
    title: "العنوان",
    description: siteConfig.address.short,
    href: siteConfig.address.mapsUrl,
    external: true,
    Icon: MapPinIcon,
  },
];

/** The three phone / WhatsApp / address cards above the contact form. */
export function ContactInfoCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map(({ title, description, href, external, Icon }) => (
        <a
          key={title}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="card text-center flex flex-col items-center"
        >
          <IconBox className="mb-4">
            <Icon className="size-5" />
          </IconBox>
          <h3 className="text-c-white font-bold text-lg mb-2">{title}</h3>
          <p className="text-c-foreground text-xs leading-relaxed">{description}</p>
        </a>
      ))}
    </div>
  );
}
