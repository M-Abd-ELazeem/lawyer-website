import type { IconKey } from "@/shared/ui/icons";

/** A practice area shown in the services grid. */
export type Service = {
  id: string;
  title: string;
  description: string;
  icon: IconKey;
};
