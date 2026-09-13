import type { LabelHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export function Label({ className, children, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cn("text-c-foreground text-xs block", className)} {...props}>
      {children}
    </label>
  );
}
