import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import type { Venue, WeddingTheme } from "@/types";
import { useLocale } from "next-intl";

import { venueBase } from "./base/venue-base";
import { buildGallery, venueMedia } from "./base/venue-media";
import type { VenueText } from "./base/venue-base";
import { getDestinationData } from "./destination-data";
import { getWeddingExperienceData } from "./wedding-experience-data";
import { venueText as en } from "./translate/en/venue-text.en";
import { venueText as id } from "./translate/id/venue-text.id";
import { venueText as zh } from "./translate/zh/venue-text.zh";
import { venueText as fr } from "./translate/fr/venue-text.fr";
import { venueText as ja } from "./translate/ja/venue-text.ja";
import { venueText as de } from "./translate/de/venue-text.de";


/**
 * Venue = base (bahasa-netral) + media (gambar/galeri) + teks per bahasa.
 *
 *   base/venue-base.ts            id, slug, name, kapasitas, harga, relasi id
 *   base/venue-media.ts           image + galeri (satu tempat untuk semua bahasa)
 *   translate/<l>/venue-text.<l>  slogan + description (dikunci per venue id)
 *
 * Menambah bahasa baru: buat translate/<l>/venue-text.<l>.ts, daftarkan di
 * `textByLocale` di bawah. Venue yang belum diterjemahkan jatuh ke teks en
 * per field, jadi tidak ada yang kosong.
 */
const textByLocale: Record<Locale, Record<string, VenueText>> = {
  en,
  id,
  zh,
  fr,
  ja,
  de
};

export type VenueData = { venueList: Venue[] };

// Dibangun sekali per bahasa. injectThemesIntoVenues memutasi list ini,
// jadi instance harus dipakai bersama (sama seperti file per-bahasa sebelumnya).
const cache = new Map<Locale, VenueData>();

function resolve(locale: Locale): VenueData {
  const key = textByLocale[locale] ? locale : routing.defaultLocale;
  const cached = cache.get(key);
  if (cached) return cached;

  const { destinationList } = getDestinationData(key);
  const { weddingExperienceList } = getWeddingExperienceData(key);
  const text = textByLocale[key];

  const venueList: Venue[] = venueBase.map((base) => {
    const media = venueMedia[base.id];
    const t = { ...en[base.id], ...text[base.id] };
    return {
      ...base,
      ...t,
      image: media.image,
      gallery: buildGallery(base.id, media.gallery),
      destination: destinationList.find((d) => d.id === base.destination_id)!,
      experience: weddingExperienceList.find(
        (e) => e.id === base.experience_id,
      )!,
    };
  });

  const data = { venueList };
  cache.set(key, data);
  return data;
}

export function getVenueData(locale: Locale): VenueData {
  return resolve(locale);
}

export function useVenueData(): VenueData {
  const locale = useLocale() as Locale;
  return resolve(locale);
}

// Locale-aware helpers: pass the current locale (from `useLocale()` in Client
// Components, or `params.locale` / `getLocale()` in Server Components) first.

export const getVenueList = (locale: Locale): Venue[] =>
  resolve(locale).venueList;

export const getVenue = (locale: Locale, id: string): Venue => {
  const venue = resolve(locale).venueList.find((v) => v.id === id);
  if (!venue) throw new Error(`Venue with id "${id}" not found`);
  return venue;
};

export const getVenueBySlug = (
  locale: Locale,
  slug: string,
): Venue | undefined => resolve(locale).venueList.find((v) => v.slug === slug);

export function injectThemesIntoVenues(
  locale: Locale,
  themes: WeddingTheme[],
): void {
  for (const venue of resolve(locale).venueList) {
    venue.themes = themes.filter((t) => t.venue_id === venue.id);
  }
}

export const getVenuesByExperience = (
  locale: Locale,
  experienceId: string,
): Venue[] =>
  resolve(locale).venueList.filter((v) => v.experience_id === experienceId);

export const getVenuesByDestination = (
  locale: Locale,
  destinationId: string,
): Venue[] =>
  resolve(locale).venueList.filter((v) => v.destination_id === destinationId);
