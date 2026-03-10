import { destinationList, destinationCategories } from "@/lib/data/new-data/destination-data";
import { venueList } from "@/lib/data/new-data/venue-data";
import { weddingExperienceList } from "@/lib/data/new-data/wedding-experience-data";
import { weddingThemeList } from "@/lib/data/new-data/wedding-theme-data";

import type {
  Destination,
  DestinationCategory,
  Venue,
  WeddingExperience,
  WeddingTheme,
} from "@/lib/types/new-strucutre";

// ─── Hydrated theme type ──────────────────────────────────────────────────────
// WeddingTheme lengkap dengan relasi venue + experience yang sudah di-resolve.

export type HydratedTheme = Omit<WeddingTheme, "venue" | "experience"> & {
  venue: Venue;
  experience: WeddingExperience;
};

// ─────────────────────────────────────────────────────────────────────────────
// DESTINATION RESOLVERS
// ─────────────────────────────────────────────────────────────────────────────

export function getAllDestinations(): Destination[] {
  return destinationList;
}

export function getDestinationById(id: string): Destination | undefined {
  return destinationList.find((d) => d.id === id);
}

export function getDestinationsByCategory(categoryId: string): Destination[] {
  return destinationList.filter((d) => d.categoryId === categoryId);
}

export function getDestinationsByType(type: string): Destination[] {
  return destinationList.filter(
    (d) => d.type.toLowerCase() === type.toLowerCase()
  );
}

export function getAllDestinationCategories(): DestinationCategory[] {
  return destinationCategories;
}

export function getDestinationCategoryById(id: string): DestinationCategory | undefined {
  return destinationCategories.find((c) => c.id === id);
}

// ─────────────────────────────────────────────────────────────────────────────
// VENUE RESOLVERS
// ─────────────────────────────────────────────────────────────────────────────

export function getAllVenues(): Venue[] {
  return venueList;
}

export function getVenueById(id: string): Venue | undefined {
  return venueList.find((v) => v.id === id);
}

export function getVenuesByDestination(destinationId: string): Venue[] {
  return venueList.filter((v) => v.destinationId === destinationId);
}

export function getVenuesByExperience(experienceId: string): Venue[] {
  return venueList.filter((v) => v.experienceId === experienceId);
}

export function getVenuesByDestinationAndExperience(
  destinationId: string,
  experienceId: string
): Venue[] {
  return venueList.filter(
    (v) => v.destinationId === destinationId && v.experienceId === experienceId
  );
}

export function getVenuesByMinCapacity(minCapacity: number): Venue[] {
  return venueList.filter((v) => v.capacity >= minCapacity);
}

export function getVenuesByMaxPrice(maxPrice: number): Venue[] {
  return venueList.filter((v) => v.startingPrice <= maxPrice);
}

export function getVenuesByPriceRange(min: number, max: number): Venue[] {
  return venueList.filter(
    (v) => v.startingPrice >= min && v.startingPrice <= max
  );
}

export function getVenueHeroImage(venueId: string): string | undefined {
  return getVenueById(venueId)?.images.find((img) => img.type === "HERO")?.url;
}

export function getVenueGalleryImages(venueId: string): Venue["images"] {
  return getVenueById(venueId)?.images.filter((img) => img.type === "GALLERY") ?? [];
}

// ─────────────────────────────────────────────────────────────────────────────
// WEDDING EXPERIENCE RESOLVERS
// ─────────────────────────────────────────────────────────────────────────────

export function getAllWeddingExperiences(): WeddingExperience[] {
  return weddingExperienceList;
}

export function getWeddingExperienceById(id: string): WeddingExperience | undefined {
  return weddingExperienceList.find((e) => e.id === id);
}

export function getWeddingExperienceByCategory(category: string): WeddingExperience | undefined {
  return weddingExperienceList.find((e) => e.category === category);
}

export function getVenuesForExperience(experienceId: string): Venue[] {
  return getVenuesByExperience(experienceId);
}

export function getThemesForExperience(experienceId: string): HydratedTheme[] {
  return weddingThemeList
    .filter((t) => t.experienceId === experienceId)
    .flatMap((t) => {
      const h = hydrateTheme(t);
      return h ? [h] : [];
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// WEDDING THEME RESOLVERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Hydrate raw theme entry → HydratedTheme dengan venue + experience ter-resolve.
 * Returns undefined jika venueId atau experienceId tidak valid.
 */
export function hydrateTheme(
  raw: (typeof weddingThemeList)[number]
): HydratedTheme | undefined {
  const venue = getVenueById(raw.venueId);
  const experience = getWeddingExperienceById(raw.experienceId);
  if (!venue || !experience) return undefined;
  return { ...raw, venue, experience };
}

export function getAllWeddingThemes(): HydratedTheme[] {
  return weddingThemeList.flatMap((t) => {
    const h = hydrateTheme(t);
    return h ? [h] : [];
  });
}

export function getWeddingThemeById(id: string): HydratedTheme | undefined {
  const raw = weddingThemeList.find((t) => t.id === id);
  return raw ? hydrateTheme(raw) : undefined;
}

export function getWeddingThemesByType(type: WeddingTheme["type"]): HydratedTheme[] {
  return weddingThemeList
    .filter((t) => t.type === type)
    .flatMap((t) => {
      const h = hydrateTheme(t);
      return h ? [h] : [];
    });
}

export function getWeddingThemesByName(themeName: string): HydratedTheme[] {
  return weddingThemeList
    .filter((t) => t.themeName === themeName)
    .flatMap((t) => {
      const h = hydrateTheme(t);
      return h ? [h] : [];
    });
}

export function getWeddingThemesByVenue(venueId: string): HydratedTheme[] {
  return weddingThemeList
    .filter((t) => t.venueId === venueId)
    .flatMap((t) => {
      const h = hydrateTheme(t);
      return h ? [h] : [];
    });
}

export function getWeddingThemesByExperience(experienceId: string): HydratedTheme[] {
  return getThemesForExperience(experienceId);
}

export function getWeddingThemesByTypeAndExperience(
  type: WeddingTheme["type"],
  experienceId: string
): HydratedTheme[] {
  return weddingThemeList
    .filter((t) => t.type === type && t.experienceId === experienceId)
    .flatMap((t) => {
      const h = hydrateTheme(t);
      return h ? [h] : [];
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// CROSS-ENTITY RESOLVERS
// ─────────────────────────────────────────────────────────────────────────────

/** Ambil data lengkap (theme + venue + experience + destination) — untuk halaman detail theme. */
export function getThemeWithFullDetails(themeId: string):
  | { theme: HydratedTheme; venue: Venue; experience: WeddingExperience; destination: Destination }
  | undefined {
  const theme = getWeddingThemeById(themeId);
  if (!theme) return undefined;

  const destination = getDestinationById(theme.venue.destinationId);
  if (!destination) return undefined;

  return { theme, venue: theme.venue, experience: theme.experience, destination };
}

/** Ambil semua theme + venue berdasarkan destinationId — untuk halaman destination. */
export function getThemesByDestination(
  destinationId: string
): Array<{ theme: HydratedTheme; venue: Venue }> {
  const venueIds = new Set(getVenuesByDestination(destinationId).map((v) => v.id));
  return weddingThemeList
    .filter((t) => venueIds.has(t.venueId))
    .flatMap((t) => {
      const h = hydrateTheme(t);
      return h ? [{ theme: h, venue: h.venue }] : [];
    });
}

/** Ambil ringkasan experience + venue list + theme list — untuk halaman listing. */
export function getExperienceSummary(experienceId: string):
  | { experience: WeddingExperience; venues: Venue[]; themes: HydratedTheme[] }
  | undefined {
  const experience = getWeddingExperienceById(experienceId);
  if (!experience) return undefined;
  return {
    experience,
    venues: getVenuesForExperience(experienceId),
    themes: getThemesForExperience(experienceId),
  };
}