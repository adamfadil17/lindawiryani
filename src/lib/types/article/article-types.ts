// ─── Categories ────────────────────────────────────────────────────────────────

export const categories = [
  "All",
  "Guides",
  "Planning Advice",
  "Destination Knowledge",
  "Venue & Location",
  "Real Weddings",
  "Design & Concept",
] as const;

export type Category = (typeof categories)[number];

// ─── Article ───────────────────────────────────────────────────────────────────

export interface Article {
  id: number;
  slug: string;
  category: Category;
  tag: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  image: string;
  content: string; // TipTap-serialised HTML
}
