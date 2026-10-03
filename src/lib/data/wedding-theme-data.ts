import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import type { WeddingTheme } from "@/types";
import { useLocale } from "next-intl";

import { weddingThemeBase } from "./base/wedding-theme-base";
import type { WeddingThemeText } from "./base/wedding-theme-base";
import {
  buildThemeGallery,
  weddingThemeMedia,
} from "./base/wedding-theme-media";
import { getVenueData } from "./venue-data";
import { getWeddingExperienceData } from "./wedding-experience-data";
import { weddingThemeText as en } from "./translate/en/wedding-theme-text.en";
import { weddingThemeText as id } from "./translate/id/wedding-theme-text.id";
import { weddingThemeText as zh } from "./translate/zh/wedding-theme-text.zh";
import { weddingThemeText as fr } from "./translate/fr/wedding-theme-text.fr";
import { weddingThemeText as ja } from "./translate/ja/wedding-theme-text.ja";
import { weddingThemeText as de } from "./translate/de/wedding-theme-text.de";


/**
 * WeddingTheme = base (bahasa-netral) + media (gambar/galeri) + teks per bahasa.
 *
 *   base/wedding-theme-base.ts    id, slug, type, venue_id, experience_id
 *   base/wedding-theme-media.ts   image + galeri
 *   translate/<l>/wedding-theme-text.<l>.ts   title + description (per theme id)
 *
 * Menambah bahasa baru: buat wedding-theme-text.<l>.ts lalu daftarkan di
 * `textByLocale`. Tema yang belum diterjemahkan jatuh ke teks en per field.
 */
const textByLocale: Record<Locale, Record<string, WeddingThemeText>> = {
  en,
  id,
  zh,
  fr,
  ja,
  de
};

export type WeddingThemeData = { weddingThemeList: WeddingTheme[] };

const cache = new Map<Locale, WeddingThemeData>();

function resolve(locale: Locale): WeddingThemeData {
  const key = textByLocale[locale] ? locale : routing.defaultLocale;
  const cached = cache.get(key);
  if (cached) return cached;

  const { venueList } = getVenueData(key);
  const { weddingExperienceList } = getWeddingExperienceData(key);
  const text = textByLocale[key];

  const weddingThemeList: WeddingTheme[] = weddingThemeBase.map((base) => {
    const media = weddingThemeMedia[base.id];
    return {
      ...base,
      ...en[base.id],
      ...text[base.id],
      image: media.image,
      gallery: buildThemeGallery(base.id, media.gallery),
      venue: venueList.find((v) => v.id === base.venue_id),
      experience: weddingExperienceList.find(
        (e) => e.id === base.experience_id,
      )!,
    };
  });

  const data = { weddingThemeList };
  cache.set(key, data);
  return data;
}

export function getWeddingThemeData(locale: Locale): WeddingThemeData {
  return resolve(locale);
}

export function useWeddingThemeData(): WeddingThemeData {
  const locale = useLocale() as Locale;
  return resolve(locale);
}
