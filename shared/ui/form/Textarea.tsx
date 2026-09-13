import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";
import { CONTROL_CLASS, CONTROL_INVALID_CLASS } from "./control-styles";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean };

export function Textarea({ className, invalid, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(CONTROL_CLASS, "resize-none", invalid && CONTROL_INVALID_CLASS, className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}
