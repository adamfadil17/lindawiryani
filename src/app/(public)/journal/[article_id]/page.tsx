import { Metadata } from "next";
import { notFound } from "next/navigation";
import axios from "axios";
import type { Article } from "@/types";
import { ArticleDetail } from "./_components/article-detail";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/articles`, {
      params: { slug },
    });
    return data.data ?? null;
  } catch {
    return null;
  }
}

async function fetchArticlesByCategory(
  category: string,
  excludeSlug: string,
): Promise<Article[]> {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/articles`, {
      params: { category, limit: 10 },
    });
    const list: Article[] = data.data ?? [];

    return list.filter((a) => a.slug !== excludeSlug).slice(0, 3);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ article_id: string }>;
}): Promise<Metadata> {
  const { article_id } = await params;
  const article = await fetchArticleBySlug(article_id);

  if (!article) {
    return { title: "Article | Linda Wiryani Design and Event Planning" };
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

export default async function Page({
  params,
}: {
  params: Promise<{ article_id: string }>;
}) {
  const { article_id } = await params;

  const article = await fetchArticleBySlug(article_id);
  if (!article) notFound();

  const related = await fetchArticlesByCategory(article.category, article.slug);

  return <ArticleDetail article={article} related={related} />;
}
