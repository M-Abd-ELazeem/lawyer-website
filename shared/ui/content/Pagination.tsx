import Link from "next/link";
import { cn } from "@/shared/lib/cn";

type PaginationProps = {
  page: number;
  totalPages: number;
  /** Builds the href for a page number, e.g. (n) => `/articles?page=${n}` */
  hrefFor: (page: number) => string;
};

export function Pagination({ page, totalPages, hrefFor }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="تصفح الصفحات" className="flex items-center justify-center gap-2 pt-8">
      {pages.map((n) => (
        <Link
          key={n}
          href={hrefFor(n)}
          aria-current={n === page ? "page" : undefined}
          className={cn(
            "size-9 grid place-items-center rounded-md border text-small transition",
            n === page
              ? "border-gold bg-gold/10 text-gold"
              : "border-white/10 text-c-foreground hover:border-gold/50 hover:text-gold",
          )}
        >
          {n}
        </Link>
      ))}
    </nav>
  );
}
