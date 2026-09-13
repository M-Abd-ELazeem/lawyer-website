import { Container, Section, Skeleton } from "@/shared/ui";

export default function Loading() {
  return (
    <main>
      <Section className="min-h-screen py-20">
        <Container className="max-w-6xl space-y-10">
          <div className="space-y-3">
            <Skeleton className="h-0.5 w-16" />
            <Skeleton className="h-9 w-72 max-w-full" />
            <Skeleton className="h-4 w-full max-w-xl" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-48" />
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
