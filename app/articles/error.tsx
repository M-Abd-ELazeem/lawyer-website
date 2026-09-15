"use client";

import { useEffect } from "react";
import { Container, ErrorState, Section } from "@/shared/ui";

export default function ArticlesError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("[articles] failed to render", error);
  }, [error]);

  return (
    <main>
      <Section className="min-h-screen py-20">
        <Container className="max-w-3xl">
          <ErrorState
            title="تعذّر تحميل المقالات"
            description="حدث خطأ أثناء جلب المقالات. يرجى المحاولة مرة أخرى."
            onRetry={unstable_retry}
          />
        </Container>
      </Section>
    </main>
  );
}
