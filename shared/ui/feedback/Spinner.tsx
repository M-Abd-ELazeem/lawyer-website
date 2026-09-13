import { cn } from "@/shared/lib/cn";

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      role="status"
      aria-label="جارٍ التحميل"
      className={cn(
        "inline-block size-4 rounded-full border-2 border-current border-t-transparent animate-spin",
        className,
      )}
    />
  );
}
