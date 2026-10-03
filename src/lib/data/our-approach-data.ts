import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";

import {
  phaseNumbers,
  type OurApproachContent,
} from "./base/our-approach-base";
import { content as en } from "./translate/en/our-approach-text.en";
import { content as id } from "./translate/id/our-approach-text.id";
import { content as zh } from "./translate/zh/our-approach-text.zh";
import { content as fr } from "./translate/fr/our-approach-text.fr";
import { content as ja } from "./translate/ja/our-approach-text.ja";

/**
 * Our approach = urutan fase (base) + teks per bahasa.
 *
 *   base/our-approach-base.ts                  urutan nomor fase
 *   translate/<l>/our-approach-text.<l>.ts     teks per nomor fase + daftar
 *
 * Menambah bahasa baru: buat our-approach-text.<l>.ts lalu daftarkan di
 * `contentByLocale`. Bagian yang belum diterjemahkan jatuh ke teks en per field.
 */
const contentByLocale: Record<Locale, OurApproachContent> = {
  en,
  id,
  zh,
  fr,
  ja,
};

export interface OurApproachData {
  phases: { number: string; title: string; desc: string }[];
  pillars: string[];
  specializations: string[];
  designQualities: string[];
}

const cache = new Map<Locale, OurApproachData>();

function resolve(locale: Locale): OurApproachData {
  const key = contentByLocale[locale] ? locale : routing.defaultLocale;
  const cached = cache.get(key);
  if (cached) return cached;

  const c = contentByLocale[key];
  const data: OurApproachData = {
    phases: phaseNumbers.map((number) => ({
      number,
      ...en.phases[number],
      ...c.phases[number],
    })),
    pillars: c.pillars ?? en.pillars,
    specializations: c.specializations ?? en.specializations,
    designQualities: c.designQualities ?? en.designQualities,
  };
  cache.set(key, data);
  return data;
}

export function getOurApproachData(locale: Locale): OurApproachData {
  return resolve(locale);
}

export function useOurApproachData(): OurApproachData {
  const locale = useLocale() as Locale;
  return resolve(locale);
}
