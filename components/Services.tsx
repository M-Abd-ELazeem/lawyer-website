import { iconRegistry } from "@/components/icons/registry";
import type { Service } from "@/types";

const services: Service[] = [
  {
    id: "commercial",
    title: "القانون التجاري",
    description: "تأسيس الشركات، العقود التجارية، والنزاعات بين الشركاء.",
    icon: "building",
  },
  {
    id: "real-estate",
    title: "القانون العقاري",
    description: "نزاعات الإيجارات، الملكية، وعقود البيع والشراء.",
    icon: "house",
  },
  {
    id: "personal-status",
    title: "الأحوال الشخصية",
    description: "قضايا الأسرة، الميراث، والوصايا وفق التشريعات الإماراتية.",
    icon: "users",
  },
  {
    id: "contracts",
    title: "صياغة العقود",
    description: "إعداد ومراجعة العقود بدقة لحماية مصالح موكلينا.",
    icon: "file-text",
  },
  {
    id: "litigation",
    title: "التقاضي والتحكيم",
    description: "تمثيل قانوني أمام المحاكم وهيئات التحكيم في الدولة.",
    icon: "gavel",
  },
  {
    id: "general",
    title: "الاستشارات العامة",
    description: "آراء قانونية مكتوبة وشفهية لمختلف القضايا والنزاعات.",
    icon: "scale",
  },
];

export default function Services() {
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
            {services.map((service) => {
              const Icon = iconRegistry[service.icon];
              return (
                <div key={service.id} className="card text-right">
                  <div className="text-gold text-3xl mb-3 icon-box">
                    <Icon className="size-6" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">{service.title}</h4>
                  <p className="text-slate-400 text-sm">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
