import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type ProseProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Long-form body copy.
 *
 * Takes rendered children, never an HTML string. If the CMS returns raw
 * HTML it MUST be sanitized on the server before being turned into nodes:
 * piping untrusted CMS HTML straight into dangerouslySetInnerHTML on a
 * public site is a stored-XSS vector.
 */
export function Prose({ className, children }: ProseProps) {
  return (
    <div
      className={cn(
        "text-c-foreground leading-loose space-y-4",
        "[&_h2]:text-c-white [&_h2]:font-bold [&_h2]:text-xl [&_h2]:pt-4",
        "[&_h3]:text-c-white [&_h3]:font-semibold [&_h3]:text-lg",
        "[&_a]:text-gold [&_a]:underline",
        "[&_ul]:list-disc [&_ul]:pr-5 [&_ol]:list-decimal [&_ol]:pr-5",
        "[&_blockquote]:border-r-2 [&_blockquote]:border-gold [&_blockquote]:pr-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
