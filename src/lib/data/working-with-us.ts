import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";

import {
  openPositionKeys,
  vendorCategoryKeys,
  vendorValueNumbers,
  type WorkingWithUsContent,
} from "./base/working-with-us-base";
import { content as en } from "./translate/en/working-with-us-text.en";
import { content as id } from "./translate/id/working-with-us-text.id";
import { content as zh } from "./translate/zh/working-with-us-text.zh";
import { content as fr } from "./translate/fr/working-with-us-text.fr";
import { content as ja } from "./translate/ja/working-with-us-text.ja";

/**
 * Working with us = urutan/key (base) + teks per bahasa.
 *
 *   base/working-with-us-base.ts                 key kategori, posisi, nomor nilai
 *   translate/<l>/working-with-us-text.<l>.ts    teks per key
 *
 * Menambah bahasa baru: buat working-with-us-text.<l>.ts lalu daftarkan di
 * `contentByLocale`. Bagian yang belum diterjemahkan jatuh ke teks en per field.
 */
const contentByLocale: Record<Locale, WorkingWithUsContent> = {
  en,
  id,
  zh,
  fr,
  ja,
};

export interface WorkingWithUsData {
  vendorCategories: string[];
  openPositions: { title: string; type: string; level: string; desc: string }[];
  vendorValues: { no: string; title: string; desc: string }[];
}

const cache = new Map<Locale, WorkingWithUsData>();

function resolve(locale: Locale): WorkingWithUsData {
  const key = contentByLocale[locale] ? locale : routing.defaultLocale;
  const cached = cache.get(key);
  if (cached) return cached;

  const c = contentByLocale[key];
  const data: WorkingWithUsData = {
    vendorCategories: vendorCategoryKeys.map(
      (k) => c.vendorCategories[k] ?? en.vendorCategories[k],
    ),
    openPositions: openPositionKeys.map((k) => ({
      ...en.openPositions[k],
      ...c.openPositions[k],
    })),
    vendorValues: vendorValueNumbers.map((no) => ({
      no,
      ...en.vendorValues[no],
      ...c.vendorValues[no],
    })),
  };
  cache.set(key, data);
  return data;
}

export function getWorkingWithUsData(locale: Locale): WorkingWithUsData {
  return resolve(locale);
}

export function useWorkingWithUsData(): WorkingWithUsData {
  const locale = useLocale() as Locale;
  return resolve(locale);
}
