import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import type { Portfolio } from "@/types";
import { useLocale } from "next-intl";

import { portfolioBase } from "./base/portfolio-base";
import type { PortfolioContent, PortfolioReview } from "./base/portfolio-base";
import { buildPortfolioGallery, portfolioMedia } from "./base/portfolio-media";
import { content as en } from "./translate/en/portfolio-text.en";
import { content as id } from "./translate/id/portfolio-text.id";
import { content as zh } from "./translate/zh/portfolio-text.zh";
import { content as fr } from "./translate/fr/portfolio-text.fr";
import { content as ja } from "./translate/ja/portfolio-text.ja";

/**
 * Portfolio = base (bahasa-netral) + media (gambar/galeri) + teks per bahasa.
 *
 *   base/portfolio-base.ts          id, slug, couple, relasi id, credit_planner
 *   base/portfolio-media.ts         image + galeri
 *   translate/<l>/portfolio-text.<l>.ts   teks per portfolio id + daftar review
 *
 * Menambah bahasa baru: buat portfolio-text.<l>.ts lalu daftarkan di
 * `contentByLocale`. Portfolio yang belum diterjemahkan jatuh ke teks en per field.
 */
const contentByLocale: Record<Locale, PortfolioContent> = {
  en,
  id,
  zh,
  fr,
  ja,
};

export interface PortfolioData {
  portfolioItems: Portfolio[];
  reviews: PortfolioReview[];
}

const cache = new Map<Locale, PortfolioData>();

function resolve(locale: Locale): PortfolioData {
  const key = contentByLocale[locale] ? locale : routing.defaultLocale;
  const cached = cache.get(key);
  if (cached) return cached;

  const c = contentByLocale[key];
  const portfolioItems: Portfolio[] = portfolioBase.map((base) => {
    const media = portfolioMedia[base.id];
    return {
      ...base,
      ...en.items[base.id],
      ...c.items[base.id],
      image: media.image,
      gallery: buildPortfolioGallery(base.id, media.gallery),
    };
  });

  const data = { portfolioItems, reviews: c.reviews ?? en.reviews };
  cache.set(key, data);
  return data;
}

export function getPortfolioData(locale: Locale): PortfolioData {
  return resolve(locale);
}

export function usePortfolioData(): PortfolioData {
  const locale = useLocale() as Locale;
  return resolve(locale);
}
