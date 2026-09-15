import { cn } from "@/shared/lib/cn";

type DividerProps = {
  /** "gold" is the short gradient accent rule used above section headings. */
  variant?: "gold" | "rule";
  className?: string;
};

export function Divider({ variant = "rule", className }: DividerProps) {
  if (variant === "gold") {
    return <span className={cn("gold-divider", className)} />;
  }
  return <hr className={cn("border-white/10", className)} />;
}
