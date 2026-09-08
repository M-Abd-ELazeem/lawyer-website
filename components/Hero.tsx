import Image from "next/image";

export default function Hero() {
  return (
    <section className=" container lg:px-15 bg-dark-section min-h-screen">
      {/* background image */}
      <Image
        alt="hero lawyer"
        width={1920}
        height={1080}
        className="absolute inset-0 size-full object-cover"
        src="/hero-lawyer-CKDTvzYb.jpg"
      />
      {/* overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-[#0d1520]/90 via-[#0d1520]/50 to-[#0d1520]/20"></div>
      {/* content */}
      <div className="relative min-h-screen flex items-center justify-start px-8 lg:px-20">
        <div className="max-w-xl text-white text-right">
          {/* gold line */}
          <span className="gold-divider mb-6"></span>
          {/* tags */}
          <div className="flex items-center justify-start gap-2 mb-6">
            <p className="text-gold text-sm tracking-widest">مستشار قانوني</p>
            <span className="text-gold">·</span>
            <p className="text-gold text-sm tracking-widest">أبوظبي</p>
          </div>
          {/* title */}
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-2">عدالة بصيرة،</h1>
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gold mb-6">واستشارة موثوقة.</h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            مكتب المستشار محمود حسن للاستشارات القانونية — خبرة ممتدة في خدمة الأفراد والشركات داخل إمارة أبوظبي بحلول
            قانونية دقيقة ومدروسة.
          </p>
          {/* buttons */}
          <div className="flex gap-4 justify-start mb-10">
            <a className="btn-gold flex items-center gap-2"> احجز استشارتك الآن ←</a>

            <a className="btn-light">تصفح الخدمات</a>
          </div>
          {/* stats */}
          <div className="flex gap-8 justify-around border-t border-white/20 pt-6">
            <div className="text-center">
              <p className="text-gold text-2xl font-bold">+8</p>
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
