import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { FormError } from "./FormError";
import { Label } from "./Label";

type FieldProps = {
  /** Must match the control's id so the label and error are associated. */
  htmlFor: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Label + control + error.
 *
 * The contact form repeated this label/input pair five times, each with the
 * same long className copied by hand.
 */
export function Field({ htmlFor, label, error, className, children }: FieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      <FormError id={`${htmlFor}-error`}>{error}</FormError>
    </div>
  );
}
