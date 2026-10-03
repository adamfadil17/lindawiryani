import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import type { Destination, DestinationCategory } from "@/types";
import { useLocale } from "next-intl";

import {
  destinationBase,
  destinationCategoryIds,
  type DestinationContent,
} from "./base/destination-base";
import { content as en } from "./translate/en/destination-text.en";
import { content as id } from "./translate/id/destination-text.id";
import { content as zh } from "./translate/zh/destination-text.zh";
import { content as fr } from "./translate/fr/destination-text.fr";
import { content as ja } from "./translate/ja/destination-text.ja";

/**
 * Destination = base (bahasa-netral) + teks per bahasa.
 *
 *   base/destination-base.ts                 id, slug, category_id, location (EN), image, guest_capacity
 *   translate/<l>/destination-text.<l>.ts    teks per slug + nama kategori + nama lokasi
 *
 * Menambah bahasa baru: buat destination-text.<l>.ts lalu daftarkan di
 * `contentByLocale`. Cukup tulis field yang sudah diterjemahkan — sisanya
 * (per field) otomatis jatuh ke teks en.
 */
const contentByLocale: Record<Locale, DestinationContent> = {
  en,
  id,
  zh,
  fr,
  ja,
};

export interface DestinationData {
  destinationCategories: DestinationCategory[];
  destinationList: Destination[];
}

const cache = new Map<Locale, DestinationData>();

function resolve(locale: Locale): DestinationData {
  const key = contentByLocale[locale] ? locale : routing.defaultLocale;
  const cached = cache.get(key);
  if (cached) return cached;

  const c = contentByLocale[key];

  const destinationCategories: DestinationCategory[] =
    destinationCategoryIds.map((catId) => ({
      id: catId,
      name: c.categoryNames[catId] ?? en.categoryNames[catId],
      destinations: [],
    }));

  const destinationList: Destination[] = destinationBase.map((base) => {
    const category = destinationCategories.find((x) => x.id === base.category_id)!;
    const text = {
      ...en.destinationText[base.slug],
      ...c.destinationText[base.slug],
    };
    return {
      ...base,
      ...text,
      location: c.locationNames[base.location] ?? base.location,
      category,
    } as Destination;
  });

  const data = { destinationCategories, destinationList };
  cache.set(key, data);
  return data;
}

export function getDestinationData(locale: Locale): DestinationData {
  return resolve(locale);
}

export function useDestinationData(): DestinationData {
  const locale = useLocale() as Locale;
  return resolve(locale);
}
