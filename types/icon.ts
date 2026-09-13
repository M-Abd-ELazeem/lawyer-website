/**
 * Every icon the content layer is allowed to reference.
 *
 * Content stores an icon as one of these *string keys*, never as JSX, so that
 * a CMS or JSON API can supply `"icon": "building"` and have it render.
 * `components/icons/registry.ts` maps each key to its component.
 */
export type IconKey =
  | "scale"
  | "building"
  | "house"
  | "users"
  | "file-text"
  | "gavel"
  | "phone"
  | "mail"
  | "map-pin"
  | "clock"
  | "whatsapp"
  | "send"
  | "check-circle"
  | "menu"
  | "user-check"
  | "briefcase"
  | "book-open"
  | "languages";
