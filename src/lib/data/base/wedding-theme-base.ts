import type { WeddingTheme } from "@/types";

/**
 * Language-neutral wedding-theme fields. Shared by every locale — edit once here.
 * Copy (title, description) lives in translate/<locale>/wedding-theme-text.<locale>.ts,
 * images live in ./wedding-theme-media.ts.
 */
export type WeddingThemeBase = Pick<
  WeddingTheme,
  "id" | "slug" | "type" | "venue_id" | "experience_id"
>;

/** Teks yang diterjemahkan per bahasa, dikunci per theme id. */
export interface WeddingThemeText {
  title: string;
  description: string;
}

export const weddingThemeBase: WeddingThemeBase[] = [
  { id: "private-villa-elopement", slug: "private-villa-elopement", type: "ELOPEMENT", venue_id: "", experience_id: "3" },
  { id: "cliffside-elopement", slug: "cliffside-elopement", type: "ELOPEMENT", venue_id: "", experience_id: "3" },
  { id: "architectural-modern-tropical-elopement", slug: "architectural-modern-tropical-elopement", type: "ELOPEMENT", venue_id: "", experience_id: "3" },
  { id: "forest-jungle-elopement", slug: "forest-jungle-elopement", type: "ELOPEMENT", venue_id: "", experience_id: "3" },
  { id: "waterfall-elopement", slug: "waterfall-elopement", type: "ELOPEMENT", venue_id: "", experience_id: "3" },
  { id: "rice-field-elopement", slug: "rice-field-elopement", type: "ELOPEMENT", venue_id: "", experience_id: "3" },
  { id: "beachfront-elopement", slug: "beachfront-elopement", type: "ELOPEMENT", venue_id: "", experience_id: "3" },
  { id: "lake-elopement", slug: "lake-elopement", type: "ELOPEMENT", venue_id: "", experience_id: "3" },
  { id: "volcano-mountain-elopement", slug: "volcano-mountain-elopement", type: "ELOPEMENT", venue_id: "", experience_id: "3" },
  { id: "riverside-elopement", slug: "riverside-elopement", type: "ELOPEMENT", venue_id: "", experience_id: "3" },
  { id: "eco-sustainable-elopement", slug: "eco-sustainable-elopement", type: "ELOPEMENT", venue_id: "", experience_id: "3" },
  { id: "sacred-spiritual-elopement", slug: "sacred-spiritual-elopement", type: "ELOPEMENT", venue_id: "", experience_id: "3" },
  { id: "cultural-heritage-elopement", slug: "cultural-heritage-elopement", type: "ELOPEMENT", venue_id: "", experience_id: "3" },
  { id: "sunrise-purification-elopement", slug: "sunrise-purification-elopement", type: "ELOPEMENT", venue_id: "", experience_id: "3" },
  { id: "editorial-luxury-elopement", slug: "editorial-luxury-elopement", type: "ELOPEMENT", venue_id: "", experience_id: "3" },
  { id: "private-villa-estate", slug: "private-villa-estate", type: "INTIMATE", venue_id: "10", experience_id: "2" },
  { id: "luxury-resort-intimate", slug: "luxury-resort-intimate", type: "INTIMATE", venue_id: "23", experience_id: "2" },
  { id: "garden-riverside", slug: "garden-riverside", type: "INTIMATE", venue_id: "30", experience_id: "2" },
  { id: "cultural-architectural", slug: "cultural-architectural", type: "INTIMATE", venue_id: "19", experience_id: "2" },
  { id: "destination-intimate", slug: "destination-intimate", type: "INTIMATE", venue_id: "22", experience_id: "2" },
  { id: "forest-jungle-intimate", slug: "forest-jungle-intimate", type: "INTIMATE", venue_id: "31", experience_id: "2" },
];
