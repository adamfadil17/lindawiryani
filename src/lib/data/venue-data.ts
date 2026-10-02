import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import type { Venue, WeddingTheme } from "@/types";

import * as en from "./translate/en/venue-data.en";
import * as id from "./translate/id/venue-data.id";
import * as zh from "./translate/zh/venue-data.zh";
import * as fr from "./translate/fr/venue-data.fr";
import * as ja from "./translate/ja/venue-data.ja";

export type VenueData = typeof en;

const byLocale: Record<Locale, VenueData> = { en, id, zh, fr, ja };

function resolve(locale: Locale): VenueData {
  return byLocale[locale] ?? byLocale[routing.defaultLocale];
}

export function getVenueData(locale: Locale): VenueData {
  return resolve(locale);
}

export function useVenueData(): VenueData {
  const locale = useLocale() as Locale;
  return resolve(locale);
}

// Locale-aware equivalents of the helpers that used to live directly in
// venue-data.ts. Every call site now needs to pass the current locale
// (from `useLocale()` in Client Components, or `params.locale` /
// `getLocale()` in Server Components) as the first argument.

export const getVenueList = (locale: Locale): Venue[] => resolve(locale).venueList;

export const getVenue = (locale: Locale, id: string): Venue => {
  const venue = resolve(locale).venueList.find((v) => v.id === id);
  if (!venue) throw new Error(`Venue with id "${id}" not found`);
  return venue;
};

export const getVenueBySlug = (
  locale: Locale,
  slug: string,
): Venue | undefined => resolve(locale).venueList.find((v) => v.slug === slug);

export function injectThemesIntoVenues(locale: Locale, themes: WeddingTheme[]): void {
  for (const venue of resolve(locale).venueList) {
    venue.themes = themes.filter((t) => t.venue_id === venue.id);
  }
}

export const getVenuesByExperience = (
  locale: Locale,
  experienceId: string,
): Venue[] => resolve(locale).venueList.filter((v) => v.experience_id === experienceId);

export const getVenuesByDestination = (
  locale: Locale,
  destinationId: string,
): Venue[] => resolve(locale).venueList.filter((v) => v.destination_id === destinationId);
