import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { Divider } from "./Divider";

type SectionHeadingProps = {
  /** Small gold label above the title. */
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "start" | "center";
  className?: string;
};

/**
 * Gold rule + eyebrow + heading + subtitle.
 *
 * This block was written out separately in About, ServicesGrid, WhyUs and
 * ContactSection, with the markup drifting in each.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "start",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-2", align === "center" && "text-center", className)}>
      <Divider variant="gold" className="mb-4" />
      {eyebrow ? <p className="text-gold text-small font-semibold tracking-wide">{eyebrow}</p> : null}
      <h2 className="text-h2 font-bold text-c-white">{title}</h2>
      {subtitle ? <p className="text-c-foreground text-body">{subtitle}</p> : null}
    </div>
  );
}
