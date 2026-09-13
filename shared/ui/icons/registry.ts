import type { ComponentType } from "react";
import type { IconKey } from "./types";
import type { IconProps } from "./icons";
import {
  BookOpenIcon,
  BriefcaseIcon,
  BuildingIcon,
  CheckCircleIcon,
  ClockIcon,
  FileTextIcon,
  GavelIcon,
  HouseIcon,
  LanguagesIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ScaleIcon,
  SendIcon,
  UserCheckIcon,
  UsersIcon,
  WhatsappIcon,
} from "./icons";

/**
 * Resolves the string icon keys stored in the content layer to components.
 *
 * This indirection is what lets content live as plain data: a CMS can return
 * `{ "icon": "building" }` over JSON and it renders, which is impossible when
 * the icon is JSX embedded in the data itself.
 *
 * Typed as a total Record, so adding a key to `IconKey` without registering a
 * component here is a compile error rather than a blank space on the page.
 */
export const iconRegistry: Record<IconKey, ComponentType<IconProps>> = {
  scale: ScaleIcon,
  building: BuildingIcon,
  house: HouseIcon,
  users: UsersIcon,
  "file-text": FileTextIcon,
  gavel: GavelIcon,
  phone: PhoneIcon,
  mail: MailIcon,
  "map-pin": MapPinIcon,
  clock: ClockIcon,
  whatsapp: WhatsappIcon,
  send: SendIcon,
  "check-circle": CheckCircleIcon,
  "user-check": UserCheckIcon,
  briefcase: BriefcaseIcon,
  "book-open": BookOpenIcon,
  languages: LanguagesIcon,
};
