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
      <h1 className="text-h1 font-bold text-c-white leading-tight">{title}</h1>
      {subtitle ? <p className="text-c-foreground text-body leading-relaxed">{subtitle}</p> : null}
      {children}
    </header>
  );
}
