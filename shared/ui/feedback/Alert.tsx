import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type AlertProps = {
  tone: "success" | "error";
  className?: string;
  children: ReactNode;
};

const TONES: Record<AlertProps["tone"], string> = {
  success: "border-green-500/40 bg-green-500/10 text-green-300",
  error: "border-red-500/40 bg-red-500/10 text-red-300",
};

/**
 * Inline result message.
 *
 * Deliberately not a toast/portal system: the only caller is the contact
 * form's submit result, and the message should stay next to the form.
 */
export function Alert({ tone, className, children }: AlertProps) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn("rounded-md border px-4 py-3 text-small leading-relaxed", TONES[tone], className)}
    >
      {children}
    </div>
  );
}
