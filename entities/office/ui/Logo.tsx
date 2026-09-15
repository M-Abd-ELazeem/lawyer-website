import Link from "next/link";
import { cn } from "@/shared/lib/cn";
import { ScaleIcon } from "@/shared/ui/icons";
import { siteConfig } from "../config/site";

type LogoProps = {
  className?: string;
};

/** Office wordmark. Was duplicated verbatim in the navbar and the footer. */
export function Logo({ className }: LogoProps) {
  return (
    <Link className={cn("flex items-center gap-3", className)} href="/">
      <span className="grid place-items-center size-10 rounded-md bg-gradient-gold text-black shadow-gold">
        <ScaleIcon className="size-5" />
      </span>
      <span className="leading-tight">
        <span className="block text-h4 font-semibold tracking-wide text-white">{siteConfig.name}</span>
        <span className="block text-caption text-gold tracking-[0.3em]">{siteConfig.title}</span>
      </span>
    </Link>
  );
}
