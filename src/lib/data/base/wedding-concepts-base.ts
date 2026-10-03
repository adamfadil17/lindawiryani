/**
 * Language-neutral wedding-concepts fields. Shared by every locale — edit once here.
 * Copy lives in translate/<locale>/wedding-concepts-text.<locale>.ts.
 */
export interface ConceptLayerBase {
  number: string;
  href: string;
  image: string;
}

export interface ConceptLayerText {
  title: string;
  subtitle: string;
  desc: string;
  tag: string;
  supports: string[];
}

export interface WeddingConceptsContent {
  venueCurationConsiderations: string[];
  stylingFocusAreas: string[];
  editorialSources: string[];
  /** Dikunci per nomor ("01".."04") */
  conceptLayers: Record<string, ConceptLayerText>;
  planningJourney: string[];
}

export const conceptLayerBase: ConceptLayerBase[] = [
  {
    number: "01",
    href: "/wedding-concepts/venue-curation",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773156602/venue_curation_k55a6q.jpg",
  },
  {
    number: "02",
    href: "/wedding-concepts/wedding-themes",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773156603/Theme_jksjdk.jpg",
  },
  {
    number: "03",
    href: "/wedding-concepts/styling-concepts",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773156603/styling_concept_j56muk.jpg",
  },
  {
    number: "04",
    href: "/wedding-concepts/editorial-inspiration",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1773156603/editorial_inspiration_j5twsn.jpg",
  },
];
