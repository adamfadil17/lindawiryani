import type { Portfolio } from "@/types";

/**
 * Language-neutral portfolio fields. Shared by every locale — edit once here.
 * Copy lives in translate/<locale>/portfolio-text.<locale>.ts,
 * images live in ./portfolio-media.ts.
 * Nama pasangan (couple) dan credit_planner adalah nama diri, jadi tidak diterjemahkan.
 */
export type PortfolioBase = Pick<
  Portfolio,
  | "id"
  | "slug"
  | "couple"
  | "destination_id"
  | "venue_id"
  | "experience_id"
  | "credit_planner"
>;

type TextKeys =
  | "subtitle"
  | "tags"
  | "excerpt"
  | "origin"
  | "review"
  | "content"
  | "story_sections"
  | "credit_role"
  | "credit_location_detail"
  | "credit_couple_origin";

/** Teks satu portfolio, dikunci per portfolio id. */
export type PortfolioText = Pick<Portfolio, TextKeys>;

export interface PortfolioReview {
  quote: string;
  couple: string;
  origin: string;
}

/** Seluruh teks portfolio untuk satu bahasa. */
export interface PortfolioContent {
  items: Record<string, PortfolioText>;
  reviews: PortfolioReview[];
}

export const portfolioBase: PortfolioBase[] = [
  {
    id: "1",
    slug: "anaz-jane-tegalalang",
    couple: "Anaz & Jane",
    destination_id: "2",
    venue_id: "1",
    experience_id: "3",
    credit_planner: "Linda Wiryani Design and Event Planning",
  },
];
