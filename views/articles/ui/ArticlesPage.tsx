import { ArticleCard, getArticles } from "@/entities/article";
import { Container, EmptyState, PageHeader, Section } from "@/shared/ui";

export async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <main>
      <Section className="min-h-screen py-20">
        <Container className="max-w-6xl space-y-10">
          <PageHeader
            title="المقالات القانونية"
            subtitle="مقالات وآراء قانونية حول أبرز المسائل التي تهم الأفراد والشركات في دولة الإمارات."
          />

          {articles.length === 0 ? (
            <EmptyState title="لا توجد مقالات بعد" description="سيتم نشر المقالات قريباً." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
