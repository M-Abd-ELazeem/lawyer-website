import { apiGet } from "@/shared/api/client";
import { hasApi } from "@/shared/config/env";
import { seedArticles } from "../model/articles";
import type { Article } from "../model/types";

/**
 * The seam for the articles API. Components never touch seed data directly,
 * so connecting the CMS is a change to this file alone.
 */
export async function getArticles(): Promise<Article[]> {
  if (!hasApi) return sortByNewest(seedArticles);

  const dto = await apiGet<ArticleDto[]>("/articles", { revalidate: 600, tags: ["articles"] });
  return sortByNewest(dto.map(toArticle));
}

export async function getArticle(slug: string): Promise<Article | null> {
  if (!hasApi) return seedArticles.find((article) => article.slug === slug) ?? null;

  try {
    const dto = await apiGet<ArticleDto>(`/articles/${slug}`, {
      revalidate: 600,
      tags: ["articles", `article:${slug}`],
    });
    return toArticle(dto);
  } catch {
    // A missing article is a 404, not a crash.
    return null;
  }
}

type ArticleDto = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  tags?: string[];
  coverImage?: string;
  body?: string;
};

function toArticle(dto: ArticleDto): Article {
  return {
    slug: dto.slug,
    title: dto.title,
    excerpt: dto.excerpt,
    publishedAt: dto.publishedAt,
    tags: dto.tags ?? [],
    coverImage: dto.coverImage,
    body: dto.body,
  };
}

function sortByNewest(articles: Article[]): Article[] {
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
