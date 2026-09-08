// import Image from "next/image";

// export default function About() {
//   return (
//     <section className=" container section-dark px-16 py-10">
//       {/*  */}
//       <div className=" flex flex-col lg:flex-row gap-12 mx-auto items-center">
//         {/* content */}
//         <div className="w-full lg:flex-1 text-center">
//           {/* gold line */}
//           <span className="gold-divider mb-6 "></span>
//           <p className="text-gold text-sm tracking-widest">نبذة عني</p>
//           <h1 className="text-c-white ">
//             المستشار <span className="text-gold">محمود حسن</span>
//           </h1>
//           <p className="text-c-foreground">
//             مستشار قانوني مقيم في إمارة أبوظبي، يمتلك خبرة ممتدة في تقديم الاستشارات القانونية للأفراد والشركات. يجمع
//             بين العمق الأكاديمي والممارسة العملية، ويؤمن بأن العدالة تبدأ من فهمٍ دقيق لكل تفصيل في ملف الموكل.
//           </p>
//           <p className="text-c-foreground">
//             أسس مكتبه ليكون منصة قانونية متخصصة تخدم المجتمع التجاري والعائلي داخل الإمارات، مع التركيز على الدقة،
//             السرية، والنتائج المدروسة.
//           </p>
//         </div>

//         {/* image */}
//         <div className="w-full lg:flex-1">
//           <div className=" border-gold">
//             <Image src="/about-desk-9hQc1FT4.jpg" alt="محامي" width={500} height={500} />
//           </div>
//         </div>
//       </div>
//       {/*  */}
//       <div className=""></div>
//     </section>
//   );
// }

import Image from "next/image";

export default function About() {
  const features = [
    {
      title: "اعتماد قانوني",
      desc: "مرخص لممارسة الاستشارات القانونية في الإمارات.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      title: "خبرة عملية",
      desc: "أكثر من 8 سنة في القضايا التجارية والمدنية.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "خلفية أكاديمية",
      desc: "ماجستير في القانون مع تخصص في العقود.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      title: "ثنائي اللغة",
      desc: "تقديم الاستشارات بالعربية والإنجليزية.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-dark-section py-16 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-16 px-6  lg:px-10">
        {/* Main Content Row */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Text Content Container (Right Side in RTL) */}
          <div className="w-full lg:flex-1 text-right space-y-4">
            <div className="inline-block">
              {/* gold line */}
              <span className="gold-divider mb-6"></span>
              <p className="text-gold text-xs font-semibold tracking-widest mb-1">نبذة عني</p>
              <span className="block h-0.2 w-8 bg-gold rounded-full"></span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              المستشار <span className="text-gold">محمود حسن</span>
            </h2>

            <p className="text-slate-300 text-sm lg:text-base leading-relaxed pt-2">
              مستشار قانوني مقيم في إمارة أبوظبي، يمتلك خبرة ممتدة في تقديم الاستشارات القانونية للأفراد والشركات. يجمع
              بين العمق الأكاديمي والممارسة العملية، ويؤمن بأن العدالة تبدأ من فهمٍ دقيق لكل تفصيل في ملف الموكل.
            </p>

            <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
              أسس مكتبه ليكون منصة قانونية متخصصة تخدم المجتمع التجاري والعائلي داخل الإمارات، مع التركيز على الدقة،
              السرية، والنتائج المدروسة.
            </p>
          </div>

          {/* Image Container (Left Side in RTL) */}
          <div className="w-full lg:flex-1">
            <div className="relative rounded-2xl overflow-hidden border-gold shadow-2xl group">
              <Image
                src="/about-desk-9hQc1FT4.jpg"
                alt="المستشار محمود حسن"
                width={600}
                height={400}
                className="w-full h-95 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {features.map((item, index) => (
            <div key={index} className=" card">
              <div className="text-gold">{item.icon}</div>
              <h3 className="text-white font-semibold text-base">{item.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
