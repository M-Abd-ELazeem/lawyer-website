import type { InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";
import { CONTROL_CLASS, CONTROL_INVALID_CLASS } from "./control-styles";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean };

export function Input({ className, invalid, ...props }: InputProps) {
  return (
    <input
      className={cn(CONTROL_CLASS, invalid && CONTROL_INVALID_CLASS, className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}
