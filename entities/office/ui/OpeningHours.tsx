import { cn } from "@/shared/lib/cn";
import { ClockIcon } from "@/shared/ui/icons";
import { siteConfig } from "../config/site";

type OpeningHoursProps = {
  /** The contact panel shows a clock per row; the footer lists them plainly. */
  showIcon?: boolean;
  className?: string;
};

/** Office opening hours. Rendered in both the footer and the contact panel. */
export function OpeningHours({ showIcon = false, className }: OpeningHoursProps) {
  return (
    <ul className={cn("space-y-2 text-small", className)}>
      {siteConfig.hours.map((entry) => (
        <li key={entry.days} className={cn(showIcon && "flex items-center justify-start gap-2")}>
          {showIcon ? <ClockIcon className="size-4 text-gold shrink-0" /> : null}
          <span>
            {entry.days}: {entry.time}
          </span>
        </li>
      ))}
    </ul>
  );
}
