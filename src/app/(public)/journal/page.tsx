import axios from "axios";
import type { Article } from "@/types";
import { ArticlePage } from "./_components/article-page";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

async function fetchAllArticles(): Promise<Article[]> {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/articles`, {
      params: { limit: 100 },
    });
    return data.data ?? [];
  } catch {
    return [];
  }
}

async function fetchFeaturedArticle(): Promise<Article | null> {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/articles`, {
      params: { category: "Featured", limit: 1 },
    });
    const list: Article[] = data.data ?? [];
    return list[0] ?? null;
  } catch {
    return null;
  }
}

export default async function Page() {
  const [articles, featured] = await Promise.all([
    fetchAllArticles(),
    fetchFeaturedArticle(),
  ]);

  return <ArticlePage articles={articles} featured={featured} />;
}
