import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-8 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* اسم المكتب */}
        <div>
          <h2 className="text-xl font-bold mb-2">مكتب المحامي</h2>
          <p className="text-gray-400 text-sm">نقدم أفضل الخدمات القانونية باحترافية وخبرة</p>
        </div>

        {/* روابط */}
        <div>
          <h3 className="font-semibold mb-3">روابط سريعة</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link href="/">الرئيسية</Link>
            </li>
            <li>
              <Link href="/about">عن المحامي</Link>
            </li>
            <li>
              <Link href="/services">الخدمات</Link>
            </li>
            <li>
              <Link href="/articles">المقالات</Link>
            </li>
            <li>
              <Link href="/contact">تواصل معنا</Link>
            </li>
          </ul>
        </div>

        {/* تواصل */}
        <div>
          <h3 className="font-semibold mb-3">تواصل معنا</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>📞 +20 100 000 0000</li>
            <li>✉️ info@lawyer.com</li>
            <li>📍 الامارات العربية المتحدة</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        © 2025 مكتب المحامي. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
