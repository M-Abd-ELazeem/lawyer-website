import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type CardProps = {
  className?: string;
  children: ReactNode;
};

/** Surface used by the feature grid, services grid and contact cards. */
export function Card({ className, children }: CardProps) {
  return <div className={cn("card", className)}>{children}</div>;
}
