import { Divider } from "@/shared/ui";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/shared/ui/icons";
import { siteConfig } from "../config/site";
import { mailtoHref, telHref } from "../lib/contact-links";
import { OpeningHours } from "./OpeningHours";

/** Address, opening hours and direct contact links, shown beside the form. */
export function OfficeInfoPanel() {
  return (
    <div className="bg-dark-card border border-white/5 rounded-xl p-6 sm:p-8 space-y-6 text-right">
      <div className="space-y-2">
        <h3 className="text-c-white font-bold text-lg">العنوان</h3>
        <p className="text-c-foreground text-xs leading-relaxed">{siteConfig.address.full}</p>
        <a
          href={siteConfig.address.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold text-xs font-semibold inline-flex items-center gap-1.5 hover:underline pt-1"
        >
          <MapPinIcon className="size-4" />
          <span>فتح في خرائط جوجل</span>
        </a>
      </div>

      <div className="space-y-3">
        <h3 className="text-c-white font-bold text-lg">ساعات العمل</h3>
        <OpeningHours showIcon className="text-c-foreground" />
      </div>

      <Divider className="my-4" />

      <div className="space-y-2.5">
        <a
          href={telHref()}
          className="flex items-center justify-start gap-2 text-c-white text-xs hover:text-gold transition"
        >
          <PhoneIcon className="size-4 text-gold shrink-0" />
          <span dir="ltr">{siteConfig.phone.display}</span>
        </a>
        <a
          href={mailtoHref()}
          className="flex items-center justify-start gap-2 text-c-white text-xs hover:text-gold transition"
        >
          <MailIcon className="size-4 text-gold shrink-0" />
          <span>{siteConfig.email}</span>
        </a>
      </div>
    </div>
  );
}
