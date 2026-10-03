import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";

import {
  conceptLayerBase,
  type ConceptLayerText,
  type WeddingConceptsContent,
} from "./base/wedding-concepts-base";
import { content as en } from "./translate/en/wedding-concepts-text.en";
import { content as id } from "./translate/id/wedding-concepts-text.id";
import { content as zh } from "./translate/zh/wedding-concepts-text.zh";
import { content as fr } from "./translate/fr/wedding-concepts-text.fr";
import { content as ja } from "./translate/ja/wedding-concepts-text.ja";

/**
 * Wedding concepts = base (nomor, href, gambar) + teks per bahasa.
 *
 *   base/wedding-concepts-base.ts                     number, href, image
 *   translate/<l>/wedding-concepts-text.<l>.ts        teks per nomor layer + daftar
 *
 * Menambah bahasa baru: buat wedding-concepts-text.<l>.ts lalu daftarkan di
 * `contentByLocale`. Bagian yang belum diterjemahkan jatuh ke teks en per field.
 */
const contentByLocale: Record<Locale, WeddingConceptsContent> = {
  en,
  id,
  zh,
  fr,
  ja,
};

export interface ConceptLayer extends ConceptLayerText {
  number: string;
  href: string;
  image: string;
}

export interface WeddingConceptsData {
  venueCurationConsiderations: string[];
  stylingFocusAreas: string[];
  editorialSources: string[];
  conceptLayers: ConceptLayer[];
  planningJourney: string[];
}

const cache = new Map<Locale, WeddingConceptsData>();

function resolve(locale: Locale): WeddingConceptsData {
  const key = contentByLocale[locale] ? locale : routing.defaultLocale;
  const cached = cache.get(key);
  if (cached) return cached;

  const c = contentByLocale[key];
  const data: WeddingConceptsData = {
    venueCurationConsiderations:
      c.venueCurationConsiderations ?? en.venueCurationConsiderations,
    stylingFocusAreas: c.stylingFocusAreas ?? en.stylingFocusAreas,
    editorialSources: c.editorialSources ?? en.editorialSources,
    conceptLayers: conceptLayerBase.map((base) => ({
      ...base,
      ...en.conceptLayers[base.number],
      ...c.conceptLayers[base.number],
    })),
    planningJourney: c.planningJourney ?? en.planningJourney,
  };
  cache.set(key, data);
  return data;
}

export function getWeddingConceptsData(locale: Locale): WeddingConceptsData {
  return resolve(locale);
}

export function useWeddingConceptsData(): WeddingConceptsData {
  const locale = useLocale() as Locale;
  return resolve(locale);
}
