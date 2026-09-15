import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type IconBoxProps = {
  className?: string;
  children: ReactNode;
};

/** Tinted square that frames an icon. */
export function IconBox({ className, children }: IconBoxProps) {
  return <span className={cn("icon-box", className)}>{children}</span>;
}
