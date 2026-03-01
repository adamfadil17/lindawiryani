import { notFound } from "next/navigation";
import { ArticleDetail } from "./components/article-detail";
import { articles } from "@/lib/data/article/article-data";
import { Metadata } from "next";

export async function generateStaticParams() {
  return articles.map((article) => ({
    article_id: article.slug,
  }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ article_id: string }>;
}): Promise<Metadata> {
  const { article_id } = await params;
  const article = articles.find((a) => a.slug === article_id);
  if (!article) {
    return {
      title: "Article | Linda Wiryani Design and Event Planning",
    };
  }

  return {
    title: `${article.title} — Linda Wiryani Journal`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ article_id: string }>;
}) {
  const { article_id } = await params;
  const article = articles.find((a) => a.slug === article_id);

  if (!article) notFound();

  // Related articles: same category, exclude current
  const related = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  return <ArticleDetail article={article} related={related} />;
}
