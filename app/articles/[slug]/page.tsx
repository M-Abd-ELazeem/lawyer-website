import type { Metadata } from "next";
import { getArticle, getArticles } from "@/entities/article";
import { ArticleDetailPage } from "@/views/article-detail";

/** Prerender every known article at build time. */
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/articles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) return { title: "المقال غير موجود" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      tags: article.tags,
    },
  };
}

export default async function Page({ params }: PageProps<"/articles/[slug]">) {
  const { slug } = await params;
  return <ArticleDetailPage slug={slug} />;
}
