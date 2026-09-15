import type { SelectHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";
import { CONTROL_CLASS, CONTROL_INVALID_CLASS } from "./control-styles";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean };

export function Select({ className, invalid, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(CONTROL_CLASS, invalid && CONTROL_INVALID_CLASS, className)}
      aria-invalid={invalid || undefined}
      {...props}
    >
      {children}
    </select>
  );
}
