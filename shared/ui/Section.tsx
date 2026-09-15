import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type SectionProps = {
  /** Anchor target. The header and footer link to these. */
  id?: string;
  /** Which of the two alternating page backgrounds to use. */
  tone?: "dark" | "secondary";
  className?: string;
  children: ReactNode;
};

/**
 * The standard page section wrapper.
 *
 * Replaces the "w-full bg-dark-* py-16 px-6 lg:px-16" string that was
 * pasted into five sections, each with slightly different drift.
 */
export function Section({ id, tone = "dark", className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full py-16 px-6 lg:px-16",
        tone === "dark" ? "bg-dark-section" : "bg-dark-secondary",
        className,
      )}
    >
      {children}
    </section>
  );
}
