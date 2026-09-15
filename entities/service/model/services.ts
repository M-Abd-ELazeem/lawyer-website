import type { Service } from "./types";

/**
 * Seed content, served until a CMS is connected.
 *
 * Icons are string keys, not JSX, so this array has exactly the shape an
 * API response would have and can be swapped for one without touching any
 * component.
 */
export const seedServices: Service[] = [
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
