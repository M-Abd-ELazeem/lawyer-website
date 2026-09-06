import Image from "next/image";

export default function Hero() {
  return (
    <section className=" container section-dark my-5 px-16 py-10">
      <Image
        alt="/hero-lawyer-CKDTvzYb.jpg"
        width="1920"
        height="1080"
        className="absolute inset-0 size-full object-cover"
        src="/hero-lawyer-CKDTvzYb.jpg"
      />
      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-24 min-h-[92vh] flex items-center text-white">
        <div>
          <a>مكتب محاماة واستشارات قانونية · الإمارات العربية المتحدة</a>
          <h1>حقوقك في أيدٍ أمينة</h1>
          <p>
            نقدم خدمات قانونية متكاملة في الإمارات بخبرة تزيد عن 4 سنوات في قضايا الأسرة والتجارة والعقارات والجنايات
          </p>
          <div>
            <button>احجز استشارة مجانية</button>
            <button>تعرف على خدماتنا</button>
          </div>

          <div>
            <a>✓ استشارة مجانية</a>
            <a>✓ سرية تامة</a>
            <a>✓ خبرة واسعة</a>
            <a>✓ نتائج مضمونة</a>
          </div>
        </div>
      </div>
    </section>
  );
}
