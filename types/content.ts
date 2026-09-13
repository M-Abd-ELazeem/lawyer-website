import type { IconKey } from "./icon";

/** A titled feature/benefit item with an icon, used by About and WhyUs. */
export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: IconKey;
};

/** Hero section copy. */
export type HeroContent = {
  eyebrow: string[];
  titleLead: string;
  titleAccent: string;
  description: string;
  image: string;
};

/** About section copy. */
export type AboutContent = {
  eyebrow: string;
  nameLead: string;
  nameAccent: string;
  paragraphs: string[];
  image: string;
  features: Feature[];
};

/** "Why choose us" section copy. */
export type WhyUsContent = {
  title: string;
  description: string;
  points: string[];
  quote: string;
  quoteAuthor: string;
};
