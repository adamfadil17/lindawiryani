/**
 * Canonical article category values.
 *
 * Prisma stores the underscored enum names (`Planning_Advice`), while the
 * public site and admin UI display human labels (`Planning Advice`). Keep both
 * mappings here so filters send the enum value and cards/badges show the label.
 */

export const ARTICLE_CATEGORY_VALUES = [
  "Guides",
  "Planning_Advice",
  "Destination_Knowledge",
  "Venue_and_Location",
  "Real_Weddings",
  "Design_and_Concept",
] as const;

export type ArticleCategoryValue = (typeof ARTICLE_CATEGORY_VALUES)[number];

const ARTICLE_CATEGORY_LABELS: Record<ArticleCategoryValue, string> = {
  Guides: "Guides",
  Planning_Advice: "Planning Advice",
  Destination_Knowledge: "Destination Knowledge",
  Venue_and_Location: "Venue & Location",
  Real_Weddings: "Real Weddings",
  Design_and_Concept: "Design & Concept",
};

export function articleCategoryLabel(value: string): string {
  return (
    ARTICLE_CATEGORY_LABELS[value as ArticleCategoryValue] ??
    value.replace(/_and_/g, " & ").replace(/_/g, " ")
  );
}
