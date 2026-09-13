import Link from "next/link";
import { formatDate } from "@/shared/lib/format";
import { Badge, Card } from "@/shared/ui";
import type { Article } from "../model/types";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="text-right flex flex-col gap-3 h-full">
      <time dateTime={article.publishedAt} className="text-c-foreground/70 text-xs">
        {formatDate(article.publishedAt)}
      </time>

      <h2 className="text-c-white font-semibold text-lg leading-snug">
        <Link href={`/articles/${article.slug}`} className="hover:text-gold transition">
          {article.title}
        </Link>
      </h2>

      <p className="text-c-foreground text-sm leading-relaxed flex-1">{article.excerpt}</p>

      {article.tags.length > 0 ? (
        <div className="flex flex-wrap gap-2 pt-1">
          {article.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      ) : null}
    </Card>
  );
}
