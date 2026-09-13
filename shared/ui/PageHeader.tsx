import type { ReactNode } from "react";
import { Divider } from "./Divider";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

/** Title block for inner pages (articles, services, article detail). */
export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <header className="text-right space-y-3">
      <Divider variant="gold" />
      <h1 className="text-3xl lg:text-4xl font-bold text-c-white leading-tight">{title}</h1>
      {subtitle ? <p className="text-c-foreground text-sm leading-relaxed">{subtitle}</p> : null}
      {children}
    </header>
  );
}
