import Image from "next/image";

export default function Hero() {
  return (
    <section className=" container section-dark min-h-screen">
      <Image
        alt="hero lawyer"
        width={1920}
        height={1080}
        className="absolute inset-0 size-full object-cover"
        src="/hero-lawyer-CKDTvzYb.jpg"
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#0a0f1a]/90 via-[#0a0f1a]/50 to-[#0a0f1a]/20"></div>
      <div className="relative min-h-screen flex items-center justify-start px-8 lg:px-30">
        <div className="max-w-xl text-white text-right">
          <span className="gold-divider mb-6"></span>

          <div className="flex items-center justify-start gap-2 mb-6">
            <p className="text-gold text-sm tracking-widest">مستشار قانوني</p>
            <span className="text-gold">·</span>
            <p className="text-gold text-sm tracking-widest">أبوظبي</p>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-2">عدالة بصيرة،</h1>
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gold mb-6">واستشارة موثوقة.</h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            مكتب المستشار محمود حسن للاستشارات القانونية — خبرة ممتدة في خدمة الأفراد والشركات داخل إمارة أبوظبي بحلول
            قانونية دقيقة ومدروسة.
          </p>

          <div className="flex gap-4 justify-start mb-10">
            <a className="btn-gold flex items-center gap-2"> احجز استشارتك الآن ←</a>

            <a className="btn-light">تصفح الخدمات</a>
          </div>

          <div className="flex gap-8 justify-around border-t border-white/20 pt-6">
            <div className="text-center">
              <p className="text-gold text-2xl font-bold">+15</p>
              <p className="text-gray-400 text-sm">سنة خبرة</p>
            </div>
            <div className="text-center">
              <p className="text-gold text-2xl font-bold">+500</p>
              <p className="text-gray-400 text-sm">قضية ناجحة</p>
            </div>
            <div className="text-center">
              <p className="text-gold text-2xl font-bold">+200</p>
              <p className="text-gray-400 text-sm">موكل راضٍ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
