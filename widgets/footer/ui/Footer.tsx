import Link from "next/link";
import { Logo, OpeningHours, mailtoHref, siteConfig, telHref } from "@/entities/office";
import { footerNav } from "@/shared/config/navigation";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/shared/ui/icons";

export function Footer() {
  return (
    <footer className="bg-dark-secondary border-t border-white/5 text-c-foreground py-12 px-6 lg:px-16 mt-auto text-right">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* العمود 1: اللوجو والوصف */}
        <div className="space-y-4">
          <Logo />
          <p className="text-small text-c-foreground/80 leading-relaxed">{siteConfig.description}</p>
        </div>

        {/* العمود 2: روابط سريعة */}
        <div className="space-y-3">
          <h3 className="text-c-white font-bold text-h4">روابط سريعة</h3>
          <ul className="space-y-2 text-small">
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
          <h3 className="text-c-white font-bold text-h4">معلومات الاتصال</h3>
          <ul className="space-y-2.5 text-small">
            <li>
              <a href={telHref()} className="flex items-center gap-2 hover:text-gold transition">
                <PhoneIcon className="size-3.5 text-gold shrink-0" />
                <span dir="ltr">{siteConfig.phone.display}</span>
              </a>
            </li>
            <li>
              <a href={mailtoHref()} className="flex items-center gap-2 hover:text-gold transition">
                <MailIcon className="size-3.5 text-gold shrink-0" />
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
          <h3 className="text-c-white font-bold text-h4">ساعات العمل</h3>
          <OpeningHours className="text-c-foreground/80" />
        </div>
      </div>

      {/* الحقوق */}
      <div className="text-center text-caption text-c-foreground/60 border-t border-white/5 mt-10 pt-6">
        © {new Date().getFullYear()} {siteConfig.legalName}. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
