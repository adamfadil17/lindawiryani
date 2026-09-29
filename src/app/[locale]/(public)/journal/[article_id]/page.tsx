import { notFound } from "next/navigation";
import { ArticleDetail } from "./components/article-detail";
import { getArticleData } from "@/lib/data/article-data";
import { Metadata } from "next";
import type { Locale } from "@/i18n/routing";

export async function generateStaticParams() {
  const { articles } = getArticleData("en");
  return articles.map((article) => ({
    article_id: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; article_id: string }>;
}): Promise<Metadata> {
  const { locale, article_id } = await params;
  const { articles } = getArticleData(locale);
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

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; article_id: string }>;
}) {
  const { locale, article_id } = await params;
  const { articles } = getArticleData(locale);
  const article = articles.find((a) => a.slug === article_id);

  if (!article) notFound();

  const related = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  return <ArticleDetail article={article} related={related} />;
}
