import type { IconKey } from "@/shared/ui/icons";

/** A titled feature/benefit item with an icon, used by About and WhyUs. */
export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: IconKey;
};

