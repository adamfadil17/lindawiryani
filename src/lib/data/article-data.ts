import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import type { Article } from "@/types";
import { useLocale } from "next-intl";

import { articleBase } from "./base/article-base";
import type { ArticleText } from "./base/article-base";
import { articleText as en } from "./translate/en/article-text.en";
import { articleText as id } from "./translate/id/article-text.id";
import { articleText as zh } from "./translate/zh/article-text.zh";
import { articleText as fr } from "./translate/fr/article-text.fr";
import { articleText as ja } from "./translate/ja/article-text.ja";

/**
 * Article = base (bahasa-netral) + teks per bahasa.
 *
 *   base/article-base.ts                    id, slug, category, published_at, image
 *   translate/<l>/article-text.<l>.ts       title + excerpt + content (per article id)
 *
 * Menambah bahasa baru: buat article-text.<l>.ts lalu daftarkan di `textByLocale`.
 * Artikel yang belum diterjemahkan jatuh ke teks en per field.
 */
const textByLocale: Record<Locale, Record<string, ArticleText>> = {
  en,
  id,
  zh,
  fr,
  ja,
};

export type ArticleData = { articles: Article[] };

const cache = new Map<Locale, ArticleData>();

function resolve(locale: Locale): ArticleData {
  const key = textByLocale[locale] ? locale : routing.defaultLocale;
  const cached = cache.get(key);
  if (cached) return cached;

  const text = textByLocale[key];
  const articles: Article[] = articleBase.map((base) => ({
    ...base,
    ...en[base.id],
    ...text[base.id],
  }));

  const data = { articles };
  cache.set(key, data);
  return data;
}

export function getArticleData(locale: Locale): ArticleData {
  return resolve(locale);
}

export function useArticleData(): ArticleData {
  const locale = useLocale() as Locale;
  return resolve(locale);
}
