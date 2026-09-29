import { useTranslations } from "next-intl";
import type { ArticleCategory } from "@/types";

/**
 * Article categories are stable English values in the data (they are used
 * for filtering and grouping), so they never change per locale. These keys
 * map them to the translated labels under `journalPage` in messages/*.json.
 */
const categoryKeys: Record<ArticleCategory, string> = {
  Guides: "guides",
  "Planning Advice": "planningAdvice",
  "Destination Knowledge": "destinationKnowledge",
  "Venue & Location": "venueLocation",
  "Real Weddings": "realWeddings",
  "Design & Concept": "designConcept",
};

export function useCategoryText() {
  const t = useTranslations("journalPage");
  return {
    label: (c: ArticleCategory) => t(`categories.${categoryKeys[c]}`),
    description: (c: ArticleCategory) =>
      t(`categoryDescriptions.${categoryKeys[c]}`),
  };
}
