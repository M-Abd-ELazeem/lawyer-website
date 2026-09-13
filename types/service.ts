import type { IconKey } from "./icon";

/** A practice area shown in the services grid. */
export type Service = {
  id: string;
  title: string;
  description: string;
  icon: IconKey;
};
