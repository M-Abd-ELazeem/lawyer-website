import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark-secondary border-t border-white/5 text-c-foreground py-12 px-6 lg:px-16 mt-auto text-right">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* العموج 1: اللوجو والوصف */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div>
              <Link className="flex items-center gap-3" href="/">
                <span className="grid place-items-center size-10 rounded-md bg-gradient-gold text-black shadow-gold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-scale size-5"
                    aria-hidden="true"
                  >
                    <path d="M12 3v18"></path>
                    <path d="m19 8 3 8a5 5 0 0 1-6 0zV7"></path>
                    <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1"></path>
                    <path d="m5 8 3 8a5 5 0 0 1-6 0zV7"></path>
                    <path d="M7 21h10"></path>
                  </svg>
                </span>
                <div className="leading-tight">
                  <div className="text-base font-semibold tracking-wide text-white">محمود حسن</div>
                  <div className="text-[11px] text-gold tracking-[0.3em]">مستشار قانوني</div>
                </div>
              </Link>
            </div>
          </div>
          <p className="text-xs text-c-foreground/80 leading-relaxed">
            مكتب استشارات قانونية متخصص في تقديم الحلول القانونية المتكاملة للأفراد والشركات في إمارة أبوظبي.
          </p>
        </div>

        {/* العمود 2: روابط سريعة */}
        <div className="space-y-3">
          <h3 className="text-c-white font-bold text-sm">روابط سريعة</h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/" className="hover:text-gold transition">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link href="#about" className="hover:text-gold transition">
                نبذة عني
              </Link>
            </li>
            <li>
              <Link href="#services" className="hover:text-gold transition">
                الخدمات
              </Link>
            </li>
            <li>
              <Link href="#articles" className="hover:text-gold transition">
                المقالات القانونية
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-gold transition">
                تواصل معي
              </Link>
            </li>
          </ul>
        </div>

        {/* العمود 3: معلومات الاتصال */}
        <div className="space-y-3">
          <h3 className="text-c-white font-bold text-sm">معلومات الاتصال</h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <a href="tel:+971566481670" className="flex items-center gap-2 hover:text-gold transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gold"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+971 56 648 1670</span>
              </a>
            </li>
            <li>
              <a href="mailto:info@mahmoud-hassan.ae" className="flex items-center gap-2 hover:text-gold transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gold"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>info@mahmoud-hassan.ae</span>
              </a>
            </li>
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gold shrink-0"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>مزيد مول، مدينة محمد بن زايد، أبوظبي</span>
            </li>
          </ul>
        </div>

        {/* العمود 4: ساعات العمل */}
        <div className="space-y-3">
          <h3 className="text-c-white font-bold text-sm">ساعات العمل</h3>
          <ul className="space-y-2 text-xs text-c-foreground/80">
            <li>الأحد - الخميس: 9 ص - 6 م</li>
            <li>السبت: 10 ص - 2 م</li>
            <li>الجمعة: مغلق</li>
          </ul>
        </div>
      </div>

      {/* الحقوق */}
      <div className="text-center text-xs text-c-foreground/60 border-t border-white/5 mt-10 pt-6">
        © 2026 مكتب المستشار محمود حسن للاستشارات القانونية. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
