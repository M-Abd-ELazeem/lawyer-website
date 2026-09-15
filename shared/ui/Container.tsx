import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type ContainerProps = {
  className?: string;
  children: ReactNode;
};

/** Centred content column used inside a Section. */
export function Container({ className, children }: ContainerProps) {
  return <div className={cn("max-w-7xl mx-auto space-y-16 px-6 lg:px-10", className)}>{children}</div>;
}
