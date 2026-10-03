import type { Article } from "@/types";

/**
 * Language-neutral article fields. Shared by every locale — edit once here.
 * Copy (title, excerpt, content) lives in translate/<locale>/article-text.<locale>.ts.
 * Kategori tetap nilai bahasa Inggris (dipakai untuk filter); labelnya diterjemahkan
 * lewat messages/*.json (journalPage.categories) — lihat lib/article-categories.ts.
 */
export type ArticleBase = Pick<
  Article,
  "id" | "slug" | "category" | "published_at" | "image"
>;

/** Teks yang diterjemahkan per bahasa, dikunci per article id. */
export interface ArticleText {
  title: string;
  excerpt: string;
  /** TipTap-serialised HTML */
  content: string;
}

export const articleBase: ArticleBase[] = [
  {
    id: "1",
    slug: "how-to-plan-destination-wedding-bali",
    category: "Guides",
    published_at: "2026-03-05",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773318719/header2_y85db9.jpg",
  },
  {
    id: "2",
    slug: "destination-wedding-budget-bali",
    category: "Guides",
    published_at: "2026-02-18",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773384839/destination-wedding-budgeting_k4xrpr.png",
  },
  {
    id: "3",
    slug: "wedding-planning-timeline-bali",
    category: "Planning Advice",
    published_at: "2026-02-01",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773382639/the-ideal-wedding-planning-timeline_kv3oso.jpg",
  },
  {
    id: "4",
    slug: "destination-wedding-mistakes-to-avoid",
    category: "Planning Advice",
    published_at: "2026-01-15",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773382646/5-common-destination_jg19wl.jpg",
  },
  {
    id: "5",
    slug: "guest-experience-destination-wedding",
    category: "Planning Advice",
    published_at: "2025-12-28",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773383429/designing-your-guest_mps7lh.png",
  },
  {
    id: "6",
    slug: "ubud-vs-uluwatu-bali-wedding-location",
    category: "Destination Knowledge",
    published_at: "2025-12-10",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773383433/ubud-vs-uluwatu_tinzk5.png",
  },
  {
    id: "7",
    slug: "east-bali-nusa-penida-wedding-destinations",
    category: "Destination Knowledge",
    published_at: "2025-11-20",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773383434/eastbali-vs-nusa-penida_jme7zc.png",
  },
  {
    id: "8",
    slug: "best-season-bali-wedding",
    category: "Destination Knowledge",
    published_at: "2025-11-05",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773383453/understanding-bali-seasons_uhltq2.png",
  },
  {
    id: "9",
    slug: "private-villa-weddings-bali",
    category: "Venue & Location",
    published_at: "2025-10-15",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773383457/why-private-villa_cqlz6o.png",
  },
  {
    id: "10",
    slug: "hidden-wedding-venues-bali",
    category: "Venue & Location",
    published_at: "2025-09-25",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773383461/hidden-estate_xk8ijr.png",
  },
  {
    id: "13",
    slug: "designing-atmosphere-wedding",
    category: "Design & Concept",
    published_at: "2025-07-30",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773383890/elopment-wedding_xupkrb.png",
  },
  {
    id: "14",
    slug: "elopement-design-guide",
    category: "Design & Concept",
    published_at: "2025-06-12",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773383777/designing-atmosphere_yj5zou.png",
  },
  {
    id: "15",
    slug: "botanical-bali-wedding-floral-design",
    category: "Design & Concept",
    published_at: "2025-05-01",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/f_auto,q_auto:good/v1773383711/botanical-wedding_uvhrdv.png",
  },
  {
    id: "16",
    slug: "nusa-lembongan-wedding-between-land-and-sea",
    category: "Design & Concept",
    published_at: "2026-08-28",
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1787892363/Between_Land_Sea_z0jhic.png",
  },
];
