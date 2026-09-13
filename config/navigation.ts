/**
 * Navigation is defined once so the header and footer menus cannot drift apart.
 *
 * Navbar and Footer both render inside the root layout, so on-page section
 * links must be written as "/#id" rather than "#id" to work from other routes.
 */
export type NavLink = {
  href: string;
  label: string;
};

export const mainNav: NavLink[] = [
  { href: "/", label: "الرئيسية" },
  { href: "/#about", label: "عن المحامي" },
  { href: "/#services", label: "الخدمات" },
  { href: "/articles", label: "المقالات" },
  { href: "/#contact", label: "تواصل معنا" },
];

export const footerNav: NavLink[] = [
  { href: "/", label: "الرئيسية" },
  { href: "/#about", label: "نبذة عني" },
  { href: "/#services", label: "الخدمات" },
  { href: "/articles", label: "المقالات القانونية" },
  { href: "/#contact", label: "تواصل معي" },
];
