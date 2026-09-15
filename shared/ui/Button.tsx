import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export type ButtonVariant = "gold" | "light";

const VARIANTS: Record<ButtonVariant, string> = {
  gold: "btn-gold",
  light: "btn-light",
};

type BaseProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

/**
 * Button and ButtonLink are kept separate rather than made polymorphic:
 * the props of <button> and <a> differ enough that a single `as` prop
 * costs more in type gymnastics than it saves at the call site.
 */
export function Button({
  variant = "gold",
  className,
  children,
  ...props
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(VARIANTS[variant], className)} {...props}>
      {children}
    </button>
  );
}

/** Internal navigation. Uses next/link so client-side routing works. */
export function ButtonLink({
  variant = "gold",
  className,
  children,
  href,
  ...props
}: BaseProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <Link href={href} className={cn(VARIANTS[variant], className)} {...props}>
      {children}
    </Link>
  );
}

/** External links (wa.me, maps, tel:). Always opens safely. */
export function ButtonExternalLink({
  variant = "gold",
  className,
  children,
  href,
  ...props
}: BaseProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn(VARIANTS[variant], className)} {...props}>
      {children}
    </a>
  );
}
