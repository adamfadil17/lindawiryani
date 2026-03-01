export type ExperienceSlug =
  | "private-villa-weddings"
  | "intimate-weddings"
  | "elopement-weddings"
  | "luxury-weddings";
// | "bali-destination-wedding";

export type DestinationSlug =
  | "uluwatu"
  | "ubud"
  | "canggu"
  | "seminyak"
  | "sanur"
  | "kintamani"
  | "nusa-dua"
  | "east-bali"
  | "tabanan"
  | "nusa-penida";

export interface PortfolioStorySection {
  heading?: string;
  body: string[];
}

export interface PortfolioItem {
  id: string;
  slug: string;
  couple: string;
  subtitle: string;
  location: string;
  destinationSlug: DestinationSlug;
  experiences: ExperienceSlug[];
  heroImage: string;
  galleryImages: string[];
  tags: string[];
  excerpt: string;
  origin?: string;
  review?: string;
  content?: string;
  storySections: PortfolioStorySection[];
  credit: {
    role: string;
    planner: string;
    locationDetail: string;
    coupleOrigin: string;
  };
}
