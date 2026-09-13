import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export function Badge({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] text-gold",
        className,
      )}
    >
      {children}
    </span>
  );
}
