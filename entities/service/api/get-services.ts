import { apiGet } from "@/shared/api/client";
import { hasApi } from "@/shared/config/env";
import { seedServices } from "../model/services";
import type { Service } from "../model/types";

/**
 * The seam for the services API.
 *
 * Components call this and never touch the seed data directly, so
 * connecting a CMS is a change to this file alone.
 */
export async function getServices(): Promise<Service[]> {
  if (!hasApi) return seedServices;

  const dto = await apiGet<ServiceDto[]>("/services", { revalidate: 3600, tags: ["services"] });
  return dto.map(toService);
}

/** Shape returned by the backend, kept separate from the domain model. */
type ServiceDto = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

function toService(dto: ServiceDto): Service {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    // Unknown icon keys fall back rather than crashing the page.
    icon: (dto.icon as Service["icon"]) ?? "scale",
  };
}
