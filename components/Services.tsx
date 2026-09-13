export default function Services() {
  const services = [
    {
      title: "القانون التجاري",
      desc: "تأسيس الشركات، العقود التجارية، والنزاعات بين الشركاء.",
      icon: (
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
          className="lucide lucide-building2 lucide-building-2 size-6"
          aria-hidden="true"
        >
          <path d="M10 12h4"></path>
          <path d="M10 8h4"></path>
          <path d="M14 21v-3a2 2 0 0 0-4 0v3"></path>
          <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"></path>
          <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"></path>
        </svg>
      ),
    },
    {
      title: "القانون العقاري",
      desc: "نزاعات الإيجارات، الملكية، وعقود البيع والشراء.",
      icon: (
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
          className="lucide lucide-house size-6"
          aria-hidden="true"
        >
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        </svg>
      ),
    },
    {
      title: "الأحوال الشخصية",
      desc: "قضايا الأسرة، الميراث، والوصايا وفق التشريعات الإماراتية.",
      icon: (
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
          className="lucide lucide-users size-6"
          aria-hidden="true"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <circle cx="9" cy="7" r="4"></circle>
        </svg>
      ),
    },
    {
      title: "صياغة العقود",
      desc: "إعداد ومراجعة العقود بدقة لحماية مصالح موكلينا.",
      icon: (
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
          className="lucide lucide-file-text size-6"
          aria-hidden="true"
        >
          <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
          <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
          <path d="M10 9H8"></path>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
        </svg>
      ),
    },
    {
      title: "التقاضي والتحكيم",
      desc: "تمثيل قانوني أمام المحاكم وهيئات التحكيم في الدولة.",
      icon: (
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
          className="lucide lucide-gavel size-6"
          aria-hidden="true"
        >
          <path d="m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381"></path>
          <path d="m16 16 6-6"></path>
          <path d="m21.5 10.5-8-8"></path>
          <path d="m8 8 6-6"></path>
          <path d="m8.5 7.5 8 8"></path>
        </svg>
      ),
    },

    {
      title: "الاستشارات العامة",
      desc: "آراء قانونية مكتوبة وشفهية لمختلف القضايا والنزاعات.",
      icon: (
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
          className="lucide lucide-scale size-6"
          aria-hidden="true"
        >
          <path d="M12 3v18"></path>
          <path d="m19 8 3 8a5 5 0 0 1-6 0zV7"></path>
          <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1"></path>
          <path d="m5 8 3 8a5 5 0 0 1-6 0zV7"></path>
          <path d="M7 21h10"></path>
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className=" w-full bg-dark-secondary   px-4 py-20">
      <div className="max-w-7xl mx-auto space-y-16 px-6  lg:px-10">
        <div className="w-full text-center ">
          {/* gold line */}
          <span className="gold-divider mb-6"></span>
          <h2 className="text-2xl font-bold p-4 text-c-white">مجالات الممارسة</h2>
          <p className="text-c-foreground ">نقدّم استشارات متخصصة في أبرز فروع القانون داخل دولة الإمارات.</p>
        </div>
        <div className=" text-center p-4">
          {/* grid  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
            {services.map((service, index) => (
              <div key={index} className="card text-right">
                <div className="text-gold text-3xl mb-3 icon-box">{service.icon}</div>
                <h4 className="text-white font-semibold mb-2">{service.title}</h4>
                <p className="text-slate-400 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
