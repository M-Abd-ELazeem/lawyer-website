import type { Feature } from "@/entities/office";

/**
 * Section content, kept out of ui/ so it has the shape an API response
 * would have. Icons are string keys, never JSX.
 */
export const aboutFeatures: Feature[] = [
  {
    id: "licensed",
    title: "اعتماد قانوني",
    description: "مرخص لممارسة الاستشارات القانونية في الإمارات.",
    icon: "user-check",
  },
  {
    id: "experience",
    title: "خبرة عملية",
    description: "أكثر من 8 سنة في القضايا التجارية والمدنية.",
    icon: "briefcase",
  },
  {
    id: "academic",
    title: "خلفية أكاديمية",
    description: "ماجستير في القانون مع تخصص في العقود.",
    icon: "book-open",
  },
  {
    id: "bilingual",
    title: "ثنائي اللغة",
    description: "تقديم الاستشارات بالعربية والإنجليزية.",
    icon: "languages",
  },
];
