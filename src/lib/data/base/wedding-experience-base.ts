import type { WeddingExperience } from "@/types";

/**
 * Language-neutral wedding-experience fields. Shared by every locale — edit once here.
 * Copy lives in translate/<locale>/wedding-experience-text.<locale>.ts,
 * images live in ./wedding-experience-media.ts.
 */
export type WeddingExperienceBase = Pick<
  WeddingExperience,
  "id" | "slug" | "category" | "hero_style"
> & {
  /** Urutan FAQ; sort_order = indeks. Teks FAQ dikunci per id di file teks. */
  faq_ids: string[];
};

/** Kartu sub-experience: tautan bersama; teksnya dikunci per slug di file teks. */
export interface SubExperienceBase {
  slug: string;
  href: string;
}

type TextKeys =
  | "name"
  | "hero_desc"
  | "intro_label"
  | "intro_heading"
  | "intro_body"
  | "intro_list_label"
  | "intro_list"
  | "intro_footnote"
  | "approach_label"
  | "approach_heading"
  | "approach_body"
  | "approach_list_label"
  | "approach_list"
  | "services_label"
  | "services_heading"
  | "services_list"
  | "services_footnote"
  | "services_dark_label"
  | "services_dark_heading"
  | "services_dark_body"
  | "services_dark_list"
  | "closing_label"
  | "closing_heading"
  | "closing_body"
  | "closing_couple_label"
  | "closing_couple_values";

/** Teks satu experience: field teks + FAQ (dikunci per faq id). */
export type WeddingExperienceText = Pick<WeddingExperience, TextKeys> & {
  faqs: Record<string, { question: string; answer: string }>;
};

/** Seluruh teks wedding-experience untuk satu bahasa. */
export interface WeddingExperienceContent {
  /** Dikunci per experience id */
  experiences: Record<string, WeddingExperienceText>;
  /** Dikunci per slug experience */
  subExperiences: Record<
    string,
    { title: string; subtitle: string; tag: string; desc: string }
  >;
  whyBali: string[];
  fullServiceIncludes: string[];
  hospitalityValues: string[];
  coupleValues: string[];
  designFoundation: string[];
  /** FAQ umum (urutan sama di semua bahasa) */
  faqs: { q: string; a: string }[];
}

export const weddingExperienceBase: WeddingExperienceBase[] = [
  {
    id: "1",
    slug: "private-villa-weddings",
    category: "private_villa_weddings",
    hero_style: "split",
    faq_ids: [
      "faq-pvw-1",
      "faq-pvw-2",
      "faq-pvw-3",
      "faq-pvw-4",
      "faq-pvw-5",
    ],
  },
  {
    id: "2",
    slug: "intimate-weddings",
    category: "intimate_weddings",
    hero_style: "bottom",
    faq_ids: [
      "faq-iw-1",
      "faq-iw-2",
      "faq-iw-3",
      "faq-iw-4",
      "faq-iw-5",
    ],
  },
  {
    id: "3",
    slug: "elopement-weddings",
    category: "elopement_weddings",
    hero_style: "centered",
    faq_ids: [
      "faq-ew-1",
      "faq-ew-2",
      "faq-ew-3",
      "faq-ew-4",
      "faq-ew-5",
    ],
  },
  {
    id: "4",
    slug: "luxury-weddings",
    category: "luxury_weddings",
    hero_style: "editorial",
    faq_ids: [
      "faq-lw-1",
      "faq-lw-2",
      "faq-lw-3",
      "faq-lw-4",
      "faq-lw-5",
    ],
  },
];

export const subExperienceBase: SubExperienceBase[] = [
  { slug: "private-villa-weddings", href: "/wedding-experiences/private-villa-weddings" },
  { slug: "intimate-weddings", href: "/wedding-experiences/intimate-weddings" },
  { slug: "elopement-weddings", href: "/wedding-experiences/elopement-weddings" },
  { slug: "luxury-weddings", href: "/wedding-experiences/luxury-weddings" },
];
