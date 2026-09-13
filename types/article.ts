/** A legal article. `body` is only populated on the detail view. */
export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO 8601 date string. */
  publishedAt: string;
  tags: string[];
  coverImage?: string;
  /** HTML or Markdown from the CMS. Must be sanitized before rendering. */
  body?: string;
};
