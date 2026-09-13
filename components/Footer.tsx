import { MailIcon, MapPinIcon, PhoneIcon, ScaleIcon } from "@/components/icons";
import Link from "next/link";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { mailtoHref, telHref } from "@/lib/utils/contact-links";

export default function Footer() {
  return (
    <footer className="bg-dark-secondary border-t border-white/5 text-c-foreground py-12 px-6 lg:px-16 mt-auto text-right">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* العمود 1: اللوجو والوصف */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div>
              <Link className="flex items-center gap-3" href="/">
                <span className="grid place-items-center size-10 rounded-md bg-gradient-gold text-black shadow-gold">
                  <ScaleIcon className="size-5" />
                </span>
                <div className="leading-tight">
                  <div className="text-base font-semibold tracking-wide text-white">{siteConfig.name}</div>
                  <div className="text-[11px] text-gold tracking-[0.3em]">{siteConfig.title}</div>
                </div>
              </Link>
            </div>
          </div>
          <p className="text-xs text-c-foreground/80 leading-relaxed">{siteConfig.description}</p>
        </div>

        {/* العمود 2: روابط سريعة */}
        <div className="space-y-3">
          <h3 className="text-c-white font-bold text-sm">روابط سريعة</h3>
          <ul className="space-y-2 text-xs">
            {footerNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gold transition">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* العمود 3: معلومات الاتصال */}
        <div className="space-y-3">
          <h3 className="text-c-white font-bold text-sm">معلومات الاتصال</h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <a href={telHref()} className="flex items-center gap-2 hover:text-gold transition">
                <PhoneIcon className="size-3.5 text-gold" />
                <span dir="ltr">{siteConfig.phone.display}</span>
              </a>
            </li>
            <li>
              <a href={mailtoHref()} className="flex items-center gap-2 hover:text-gold transition">
                <MailIcon className="size-3.5 text-gold" />
                <span>{siteConfig.email}</span>
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPinIcon className="size-3.5 text-gold shrink-0" />
              <span>{siteConfig.address.short}</span>
            </li>
          </ul>
        </div>

        {/* العمود 4: ساعات العمل */}
        <div className="space-y-3">
          <h3 className="text-c-white font-bold text-sm">ساعات العمل</h3>
          <ul className="space-y-2 text-xs text-c-foreground/80">
            {siteConfig.hours.map((entry) => (
              <li key={entry.days}>
                {entry.days}: {entry.time}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* الحقوق */}
      <div className="text-center text-xs text-c-foreground/60 border-t border-white/5 mt-10 pt-6">
        © {new Date().getFullYear()} {siteConfig.legalName}. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
