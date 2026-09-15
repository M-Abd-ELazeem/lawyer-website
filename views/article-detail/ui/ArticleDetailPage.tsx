import { notFound } from "next/navigation";
import { getArticle } from "@/entities/article";
import { formatDate } from "@/shared/lib/format";
import { Badge, Breadcrumbs, Container, Divider, Prose, Section } from "@/shared/ui";
import { CtaBanner } from "@/widgets/cta-banner";

export async function ArticleDetailPage({ slug }: { slug: string }) {
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <main>
      <Section className="py-20">
        <Container className="max-w-3xl space-y-6">
          <Breadcrumbs
            items={[
              { label: "الرئيسية", href: "/" },
              { label: "المقالات", href: "/articles" },
              { label: article.title },
            ]}
          />

          <header className="text-right space-y-3">
            <Divider variant="gold" />
            <h1 className="text-h1 font-bold text-c-white leading-tight">{article.title}</h1>
            <time dateTime={article.publishedAt} className="block text-c-foreground/70 text-caption">
              {formatDate(article.publishedAt)}
            </time>
            {article.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {article.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            ) : null}
          </header>

          <Divider />

          <Prose className="text-right">
            {article.body
              ?.split("\n\n")
              .map((paragraph, index) => <p key={index}>{paragraph}</p>) ?? <p>{article.excerpt}</p>}
          </Prose>
        </Container>
      </Section>

      <CtaBanner />
    </main>
  );
}
