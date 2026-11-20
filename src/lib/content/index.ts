import "server-only";

import { unstable_cache } from "next/cache";

import { routing, type Locale } from "@/i18n/routing";
import { prisma } from "@/lib/prisma";
import { sanitizeRichText } from "@/lib/sanitize";
import { CONTENT_TAG } from "./tags";

import { getWorkingWithUsData, type WorkingWithUsData } from "@/lib/data/working-with-us";
import {
  getStaticExperiencePageCopy,
  getStaticPortfolioReviews,
  type ExperiencePageCopy,
  type PortfolioReview,
} from "@/lib/data/static";
import type {
  Article,
  ArticleCategory,
  Destination,
  DestinationCategory,
  OpenPosition,
  Portfolio,
  Venue,
  WeddingExperience,
  WeddingTheme,
} from "@/types";

/**
 * Public content data layer.
 *
 * Server Components call these helpers instead of importing static data.
 * All DB results share one cache tag (`public-content`): admin mutations call
 * `revalidateTag` (task 4.2). The site runs a single Node instance, so Next's
 * in-process cache is sufficient.
 */

export interface DestinationData {
  destinationCategories: DestinationCategory[];
  destinationList: Destination[];
}

export interface ExperienceData {
  weddingExperienceList: WeddingExperience[];
}

export interface VenueData {
  venueList: Venue[];
}

export interface WeddingThemeData {
  weddingThemeList: WeddingTheme[];
}

export interface PortfolioData {
  portfolioItems: Portfolio[];
  reviews: PortfolioReview[];
}

export interface ArticleData {
  articles: Article[];
}

// ─── Primitives ─────────────────────────────────────────────────────────────

type TranslationRow = { locale: string } & Record<string, unknown>;

function translationFor(
  translations: TranslationRow[],
  locale: Locale,
): TranslationRow | undefined {
  if (locale === "en") return undefined;
  return translations.find((row) => row.locale === locale);
}

function parser(row: Record<string, unknown>, translations: TranslationRow[], locale: Locale) {
  const translated = translationFor(translations, locale);
  return (field: string): unknown => translated?.[field] ?? row[field];
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function asTuple(value: unknown): [string, string] {
  return Array.isArray(value) && value.length >= 2
    ? [String(value[0]), String(value[1])]
    : ["", ""];
}

const ARTICLE_CATEGORY_LABELS: Record<string, ArticleCategory> = {
  Guides: "Guides",
  Planning_Advice: "Planning Advice",
  Destination_Knowledge: "Destination Knowledge",
  Venue_and_Location: "Venue & Location",
  Real_Weddings: "Real Weddings",
  Design_and_Concept: "Design & Concept",
};

function themeTypeFor(
  category: string,
): WeddingTheme["type"] {
  if (category === "elopement_weddings") return "ELOPEMENT";
  if (category === "intimate_weddings") return "INTIMATE";
  return undefined;
}

// ─── Destinations ───────────────────────────────────────────────────────────

async function buildDestinations(locale: Locale): Promise<DestinationData> {
  const [categoryRows, destinationRows] = await Promise.all([
    prisma.destinationCategory.findMany({
      where: { status: "published" },
      include: { translations: true },
      orderBy: { sort_order: "asc" },
    }),
    prisma.destination.findMany({
      where: { status: "published" },
      include: {
        translations: true,
        category: { select: { slug: true } },
      },
      orderBy: { sort_order: "asc" },
    }),
  ]);

  const categoryBySlug = new Map<string, DestinationCategory>();
  const destinationCategories: DestinationCategory[] = categoryRows.map((row) => {
    const value = parser(row as never, row.translations as never, locale);
    const category: DestinationCategory = {
      id: row.slug,
      name: String(value("name") ?? ""),
      destinations: [],
    };
    categoryBySlug.set(row.slug, category);
    return category;
  });

  const destinationList: Destination[] = destinationRows.map((row) => {
    const value = parser(row as never, row.translations as never, locale);
    const category = categoryBySlug.get(row.category.slug);
    if (!category) throw new Error(`Missing category ${row.category.slug}`);

    return {
      id: row.id,
      name: String(value("name") ?? ""),
      slug: row.slug,
      // Keep the static key (cat-bali, …) for the public filters.
      category_id: row.category.slug,
      category,
      type: String(value("type") ?? ""),
      description: String(value("description") ?? ""),
      long_description: String(value("long_description") ?? ""),
      location: String(value("location") ?? ""),
      atmosphere: String(value("atmosphere") ?? ""),
      accessibility_notes: String(value("accessibility_notes") ?? ""),
      seasonal_considerations: String(value("seasonal_considerations") ?? ""),
      image: row.image,
      guest_capacity: String(value("guest_capacity") ?? ""),
      highlights: asStringArray(value("highlights")),
      best_for: asStringArray(value("best_for")),
      ceremony_options: asStringArray(value("ceremony_options")),
      reception_options: asStringArray(value("reception_options")),
      accommodation_nearby: asStringArray(value("accommodation_nearby")),
      dining_experiences: asStringArray(value("dining_experiences")),
      unique_features: asStringArray(value("unique_features")),
    };
  });

  return { destinationCategories, destinationList };
}

const cachedDestinations = unstable_cache(buildDestinations, ["content-destinations"], {
  tags: [CONTENT_TAG],
});

export async function getDestinations(locale: Locale): Promise<DestinationData> {
  return cachedDestinations(locale);
}

// ─── Experiences ────────────────────────────────────────────────────────────

async function buildExperiences(locale: Locale): Promise<ExperienceData> {
  const rows = await prisma.weddingExperience.findMany({
    where: { status: "published" },
    include: {
      translations: true,
      faqs: {
        include: { translations: true },
        orderBy: { sort_order: "asc" },
      },
    },
    orderBy: { sort_order: "asc" },
  });

  const weddingExperienceList: WeddingExperience[] = rows.map((row) => {
    const value = parser(row as never, row.translations as never, locale);

    return {
      id: row.id,
      slug: row.slug,
      category: row.category as WeddingExperience["category"],
      name: String(value("name") ?? ""),
      hero_style: row.hero_style as WeddingExperience["hero_style"],
      hero_image: row.hero_image,
      hero_desc: String(value("hero_desc") ?? ""),
      intro_label: String(value("intro_label") ?? ""),
      intro_heading: asTuple(value("intro_heading")),
      intro_body: String(value("intro_body") ?? ""),
      intro_list_label: (value("intro_list_label") as string | null) ?? null,
      intro_list: asStringArray(value("intro_list")),
      intro_footnote: (value("intro_footnote") as string | null) ?? null,
      intro_images: asStringArray(row.intro_images),
      approach_label: String(value("approach_label") ?? ""),
      approach_heading: asTuple(value("approach_heading")),
      approach_body: String(value("approach_body") ?? ""),
      approach_list_label: (value("approach_list_label") as string | null) ?? null,
      approach_list: asStringArray(value("approach_list")),
      approach_image: row.approach_image,
      services_label: String(value("services_label") ?? ""),
      services_heading: asTuple(value("services_heading")),
      services_list: asStringArray(value("services_list")),
      services_footnote: String(value("services_footnote") ?? ""),
      services_dark_label: String(value("services_dark_label") ?? ""),
      services_dark_heading: asTuple(value("services_dark_heading")),
      services_dark_body: String(value("services_dark_body") ?? ""),
      services_dark_list: asStringArray(value("services_dark_list")),
      closing_label: String(value("closing_label") ?? ""),
      closing_heading: asTuple(value("closing_heading")),
      closing_body: String(value("closing_body") ?? ""),
      closing_image: row.closing_image,
      closing_couple_label: (value("closing_couple_label") as string | null) ?? null,
      closing_couple_values: asStringArray(value("closing_couple_values")),
      faqs: row.faqs.map((faq) => {
        const faqValue = parser(
          faq as never,
          faq.translations as never,
          locale,
        );
        return {
          id: faq.id,
          experience_id: faq.experience_id,
          question: String(faqValue("question") ?? ""),
          answer: String(faqValue("answer") ?? ""),
          sort_order: faq.sort_order,
        };
      }),
    };
  });

  return { weddingExperienceList };
}

const cachedExperiences = unstable_cache(buildExperiences, ["content-experiences"], {
  tags: [CONTENT_TAG],
});

export async function getWeddingExperiences(
  locale: Locale,
): Promise<ExperienceData> {
  return cachedExperiences(locale);
}

export async function getExperienceBySlug(
  locale: Locale,
  slug: string,
): Promise<WeddingExperience | undefined> {
  const { weddingExperienceList } = await getWeddingExperiences(locale);
  return weddingExperienceList.find((experience) => experience.slug === slug);
}

// ─── Venues ─────────────────────────────────────────────────────────────────

async function buildVenues(locale: Locale): Promise<VenueData> {
  const [destinationData, experienceData, venueRows] = await Promise.all([
    getDestinations(locale),
    getWeddingExperiences(locale),
    prisma.venue.findMany({
      where: { status: "published" },
      include: {
        translations: true,
        gallery: { orderBy: { sort_order: "asc" } },
      },
      orderBy: { sort_order: "asc" },
    }),
  ]);

  const destinationById = new Map(
    destinationData.destinationList.map((d) => [d.id, d]),
  );
  const experienceById = new Map(
    experienceData.weddingExperienceList.map((e) => [e.id, e]),
  );

  const venueList: Venue[] = venueRows.map((row) => {
    const value = parser(row as never, row.translations as never, locale);
    const destination = destinationById.get(row.destination_id);
    const experience = experienceById.get(row.experience_id);
    if (!destination || !experience) {
      throw new Error(`Missing relation for venue ${row.slug}`);
    }

    return {
      id: row.id,
      slug: row.slug,
      name: String(value("name") ?? row.name),
      slogan: String(value("slogan") ?? ""),
      description: String(value("description") ?? ""),
      image: row.image,
      capacity: row.capacity,
      starting_price: row.starting_price,
      destination_id: row.destination_id,
      destination,
      experience_id: row.experience_id,
      experience,
      gallery: row.gallery.map((image) => ({
        id: image.id,
        url: image.url,
        sort_order: image.sort_order,
        venue_id: image.venue_id,
      })),
    };
  });

  return { venueList };
}

const cachedVenues = unstable_cache(buildVenues, ["content-venues"], {
  tags: [CONTENT_TAG],
});

export async function getVenues(locale: Locale): Promise<VenueData> {
  return cachedVenues(locale);
}

export async function getVenueBySlug(
  locale: Locale,
  slug: string,
): Promise<Venue | undefined> {
  const { venueList } = await getVenues(locale);
  return venueList.find((venue) => venue.slug === slug);
}

// ─── Wedding themes ─────────────────────────────────────────────────────────

async function buildThemes(locale: Locale): Promise<WeddingThemeData> {
  const [venueData, experienceData, rows] = await Promise.all([
    getVenues(locale),
    getWeddingExperiences(locale),
    prisma.weddingTheme.findMany({
      where: { status: "published" },
      include: {
        translations: true,
        gallery: { orderBy: { sort_order: "asc" } },
      },
      orderBy: { sort_order: "asc" },
    }),
  ]);

  const venueById = new Map(venueData.venueList.map((v) => [v.id, v]));
  const experienceById = new Map(
    experienceData.weddingExperienceList.map((e) => [e.id, e]),
  );

  const weddingThemeList: WeddingTheme[] = rows.map((row) => {
    const value = parser(row as never, row.translations as never, locale);
    const experience = experienceById.get(row.experience_id);
    if (!experience) throw new Error(`Missing experience for theme ${row.slug}`);

    return {
      id: row.id,
      slug: row.slug,
      // UI-only grouping kept for the static components (Phase 2 decision).
      type: themeTypeFor(experience.category),
      title: String(value("title") ?? ""),
      description: sanitizeRichText(String(value("description") ?? "")),
      image: row.image,
      inclusions: asStringArray(value("inclusions")),
      venue_id: row.venue_id,
      venue: row.venue_id ? venueById.get(row.venue_id) ?? null : null,
      experience_id: row.experience_id,
      experience,
      gallery: row.gallery.map((image) => ({
        id: image.id,
        url: image.url,
        sort_order: image.sort_order,
        theme_id: image.theme_id,
      })),
    };
  });

  return { weddingThemeList };
}

const cachedThemes = unstable_cache(buildThemes, ["content-themes"], {
  tags: [CONTENT_TAG],
});

export async function getWeddingThemes(
  locale: Locale,
): Promise<WeddingThemeData> {
  return cachedThemes(locale);
}

export async function getThemeBySlug(
  locale: Locale,
  slug: string,
): Promise<WeddingTheme | undefined> {
  const { weddingThemeList } = await getWeddingThemes(locale);
  return weddingThemeList.find((theme) => theme.slug === slug);
}

// ─── Portfolios ─────────────────────────────────────────────────────────────

async function buildPortfolios(locale: Locale): Promise<PortfolioData> {
  const [destinationData, experienceData, rows] = await Promise.all([
    getDestinations(locale),
    getWeddingExperiences(locale),
    prisma.portfolio.findMany({
      where: { status: "published" },
      include: {
        translations: true,
        gallery: { orderBy: { sort_order: "asc" } },
      },
      orderBy: { sort_order: "asc" },
    }),
  ]);

  const destinationById = new Map(
    destinationData.destinationList.map((d) => [d.id, d]),
  );
  const experienceById = new Map(
    experienceData.weddingExperienceList.map((e) => [e.id, e]),
  );

  const portfolioItems: Portfolio[] = rows.map((row) => {
    const value = parser(row as never, row.translations as never, locale);

    return {
      id: row.id,
      slug: row.slug,
      couple: row.couple,
      subtitle: String(value("subtitle") ?? ""),
      destination_id: row.destination_id,
      venue_id: row.venue_id,
      experience_id: row.experience_id,
      destination: row.destination_id
        ? destinationById.get(row.destination_id) ?? null
        : null,
      experience: row.experience_id
        ? experienceById.get(row.experience_id) ?? null
        : null,
      image: row.image,
      gallery: row.gallery.map((image) => ({
        id: image.id,
        url: image.url,
        sort_order: image.sort_order,
        portfolio_id: image.portfolio_id,
      })),
      tags: asStringArray(value("tags")),
      excerpt: String(value("excerpt") ?? ""),
      origin: (value("origin") as string | null) ?? undefined,
      review: (value("review") as string | null) ?? undefined,
      content: (value("content") as string | null)
        ? sanitizeRichText(value("content") as string)
        : undefined,
      story_sections: Array.isArray(value("story_sections"))
        ? (value("story_sections") as Portfolio["story_sections"])
        : [],
      credit_role: String(value("credit_role") ?? ""),
      credit_planner: row.credit_planner,
      credit_location_detail: String(value("credit_location_detail") ?? ""),
      credit_couple_origin: String(value("credit_couple_origin") ?? ""),
    };
  });

  return {
    portfolioItems,
    reviews: getStaticPortfolioReviews(locale),
  };
}

const cachedPortfolios = unstable_cache(buildPortfolios, ["content-portfolios"], {
  tags: [CONTENT_TAG],
});

export async function getPortfolios(locale: Locale): Promise<PortfolioData> {
  return cachedPortfolios(locale);
}

export async function getPortfolioBySlug(
  locale: Locale,
  slug: string,
): Promise<Portfolio | undefined> {
  const { portfolioItems } = await getPortfolios(locale);
  return portfolioItems.find((item) => item.slug === slug);
}

// ─── Articles ───────────────────────────────────────────────────────────────

async function buildArticles(locale: Locale): Promise<ArticleData> {
  const rows = await prisma.article.findMany({
    where: { status: "published" },
    include: { translations: true },
    orderBy: { sort_order: "asc" },
  });

  const articles: Article[] = rows.map((row) => {
    const value = parser(row as never, row.translations as never, locale);

    return {
      id: row.id,
      slug: row.slug,
      category: ARTICLE_CATEGORY_LABELS[row.category] ?? "Guides",
      title: String(value("title") ?? ""),
      excerpt: String(value("excerpt") ?? ""),
      published_at: row.published_at.toISOString().slice(0, 10),
      image: row.image,
      content: sanitizeRichText(String(value("content") ?? "")),
    };
  });

  return { articles };
}

const cachedArticles = unstable_cache(buildArticles, ["content-articles"], {
  tags: [CONTENT_TAG],
});

export async function getArticles(locale: Locale): Promise<ArticleData> {
  return cachedArticles(locale);
}

export async function getArticleBySlug(
  locale: Locale,
  slug: string,
): Promise<Article | undefined> {
  const { articles } = await getArticles(locale);
  return articles.find((article) => article.slug === slug);
}

// ─── Open positions + static working-with-us copy ───────────────────────────

export interface OpenPositionsData {
  openPositions: OpenPosition[];
}

async function buildPositions(locale: Locale): Promise<OpenPositionsData> {
  const rows = await prisma.openPosition.findMany({
    where: { status: "published", is_active: true },
    include: { translations: true },
    orderBy: { sort_order: "asc" },
  });

  const openPositions: OpenPosition[] = rows.map((row) => {
    const value = parser(row as never, row.translations as never, locale);
    return {
      id: row.id,
      title: String(value("title") ?? ""),
      type: String(value("type") ?? ""),
      level: String(value("level") ?? ""),
      desc: String(value("desc") ?? ""),
      is_active: row.is_active,
    };
  });

  return { openPositions };
}

const cachedPositions = unstable_cache(buildPositions, ["content-positions"], {
  tags: [CONTENT_TAG],
});

export async function getOpenPositions(
  locale: Locale,
): Promise<OpenPositionsData> {
  return cachedPositions(locale);
}

/**
 * Working-with-us page data: DB positions + static vendor copy (D4).
 * `englishPositions` / `englishVendorCategories` keep form submission values
 * stable across locales.
 */
export async function getWorkingWithUsPageData(
  locale: Locale,
): Promise<
  Omit<WorkingWithUsData, "openPositions"> & {
    openPositions: OpenPosition[];
    englishPositions: OpenPosition[];
    englishVendorCategories: string[];
  }
> {
  const [staticData, positions, english] = await Promise.all([
    Promise.resolve(getWorkingWithUsData(locale)),
    getOpenPositions(locale),
    getOpenPositions("en"),
  ]);

  return {
    ...staticData,
    openPositions: positions.openPositions,
    englishPositions: english.openPositions,
    englishVendorCategories: getWorkingWithUsData("en").vendorCategories,
  };
}

// ─── Extra static copy (reviews / experience page copy) ─────────────────────

export function getPortfolioReviews(locale: Locale): PortfolioReview[] {
  return getStaticPortfolioReviews(locale);
}

export function getExperiencePageCopy(locale: Locale): ExperiencePageCopy {
  return getStaticExperiencePageCopy(locale);
}

// ─── Sitemap + hreflang availability ────────────────────────────────────────

export type ContentKind =
  | "destination"
  | "experience"
  | "portfolio"
  | "article";

export interface SitemapEntity {
  slug: string;
  updated_at: Date;
  locales: Locale[];
}

export interface SitemapContent {
  destinations: SitemapEntity[];
  experiences: SitemapEntity[];
  portfolios: SitemapEntity[];
  articles: SitemapEntity[];
}

const ALL_LOCALES = [...routing.locales] as Locale[];

function localesFrom(translations: { locale: string }[]): Locale[] {
  const set = new Set<Locale>(["en"]);
  for (const { locale } of translations) {
    if (ALL_LOCALES.includes(locale as Locale)) set.add(locale as Locale);
  }
  return ALL_LOCALES.filter((locale) => set.has(locale));
}

export async function getSitemapContent(): Promise<SitemapContent> {
  const [destinations, experiences, portfolios, articles] = await Promise.all([
    prisma.destination.findMany({
      where: { status: "published" },
      select: {
        slug: true,
        updated_at: true,
        translations: { select: { locale: true } },
      },
      orderBy: { sort_order: "asc" },
    }),
    prisma.weddingExperience.findMany({
      where: { status: "published" },
      select: {
        slug: true,
        updated_at: true,
        translations: { select: { locale: true } },
      },
      orderBy: { sort_order: "asc" },
    }),
    prisma.portfolio.findMany({
      where: { status: "published" },
      select: {
        slug: true,
        updated_at: true,
        translations: { select: { locale: true } },
      },
      orderBy: { sort_order: "asc" },
    }),
    prisma.article.findMany({
      where: { status: "published" },
      select: {
        slug: true,
        updated_at: true,
        translations: { select: { locale: true } },
      },
      orderBy: { sort_order: "asc" },
    }),
  ]);

  const toEntity = (row: {
    slug: string;
    updated_at: Date;
    translations: { locale: string }[];
  }): SitemapEntity => ({
    slug: row.slug,
    updated_at: row.updated_at,
    locales: localesFrom(row.translations),
  });

  return {
    destinations: destinations.map(toEntity),
    experiences: experiences.map(toEntity),
    portfolios: portfolios.map(toEntity),
    articles: articles.map(toEntity),
  };
}

/** Locales that actually have a translation for one entity (hreflang). */
export async function getContentLocales(
  kind: ContentKind,
  slug: string,
): Promise<Locale[]> {
  const select = { translations: { select: { locale: true } } } as const;

  const row =
    kind === "destination"
      ? await prisma.destination.findUnique({ where: { slug }, select })
      : kind === "experience"
        ? await prisma.weddingExperience.findUnique({ where: { slug }, select })
        : kind === "portfolio"
          ? await prisma.portfolio.findUnique({ where: { slug }, select })
          : await prisma.article.findUnique({ where: { slug }, select });

  if (!row) return ["en"];
  return localesFrom(row.translations);
}
