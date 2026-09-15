"use client";

import { Button } from "../Button";

type ErrorStateProps = {
  title?: string;
  description?: string;
  /** Next's error boundary passes unstable_retry; wire it here. */
  onRetry?: () => void;
};

export function ErrorState({
  title = "حدث خطأ غير متوقع",
  description = "تعذّر تحميل المحتوى. يرجى المحاولة مرة أخرى.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="text-center py-16 space-y-4">
      <h2 className="text-c-white font-bold text-h3">{title}</h2>
      <p className="text-c-foreground text-body">{description}</p>
      {onRetry ? (
        <Button variant="light" onClick={onRetry}>
          إعادة المحاولة
        </Button>
      ) : null}
    </div>
  );
}
