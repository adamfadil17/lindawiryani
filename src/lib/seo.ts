import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";

/**
 * Central SEO helpers for the public (localized) site.
 * All user-facing SEO copy lives in messages/<locale>.json under `seo.*`.
 */

export const SITE_URL = "https://www.lindawiryani.com";
export const DEFAULT_OG_IMAGE = "/images/logo-lindawiryani.png";

/** Open Graph locale codes per site locale. */
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  id: "id_ID",
  zh: "zh_CN",
  fr: "fr_FR",
};

/** hreflang codes per site locale. */
export const HREFLANG: Record<Locale, string> = {
  en: "en",
  id: "id",
  zh: "zh",
  fr: "fr",
};

/** Keys under `seo.pages` in messages/*.json. */
export type SeoPageKey =
  | "home"
  | "services"
  | "ourApproach"
  | "contact"
  | "workingWithUs"
  | "weddingConcepts"
  | "destinations"
  | "portfolio"
  | "journal"
  | "weddingExperiences";

/**
 * Path (without locale prefix) → URL path including the locale prefix,
 * following `localePrefix: "as-needed"` (default locale has no prefix).
 */
export function localizedPath(locale: Locale, path = ""): string {
  const p = path === "/" ? "" : path;
  if (locale === routing.defaultLocale) return p || "/";
  return `/${locale}${p}`;
}

export function absoluteUrl(locale: Locale, path = ""): string {
  return `${SITE_URL}${localizedPath(locale, path)}`;
}

/** canonical + hreflang (incl. x-default) for one page. */
export function buildAlternates(
  locale: Locale,
  path = "",
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[HREFLANG[l]] = absoluteUrl(l, path);
  }
  languages["x-default"] = absoluteUrl(routing.defaultLocale, path);
  return { canonical: absoluteUrl(locale, path), languages };
}

/**
 * Clips text for meta descriptions at a natural boundary.
 * Works for space-separated languages and for Chinese (no spaces).
 */
export function clip(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const slice = clean.slice(0, max - 1);
  const breakAt = Math.max(
    slice.lastIndexOf(" "),
    slice.lastIndexOf("，"),
    slice.lastIndexOf("、"),
    slice.lastIndexOf("；"),
    slice.lastIndexOf("。"),
  );
  const cut = breakAt > max * 0.6 ? slice.slice(0, breakAt) : slice;
  return `${cut.replace(/[\s,;:—–\-，、；：]+$/u, "")}…`;
}

/** Brand suffix appended by the root title template (`%s | Linda Wiryani`). */
export const TITLE_SUFFIX = " | Linda Wiryani";

/** Max <title> length (incl. brand suffix) per locale; Chinese is denser. */
export const titleLimit = (locale: Locale) => (locale === "zh" ? 35 : 60);

/**
 * Returns `preferred` if it still fits the title limit once the brand
 * suffix is appended, otherwise the shorter `fallback`. Used where a
 * name may already contain the descriptive words (e.g. "Waterfall
 * Weddings" + "Destination Wedding Planner").
 */
export function fitTitle(
  locale: Locale,
  preferred: string,
  fallback: string,
): string {
  return preferred.length + TITLE_SUFFIX.length <= titleLimit(locale)
    ? preferred
    : fallback;
}

/** Max meta-description length per locale (Chinese is denser). */
export const descLimit = (locale: Locale) => (locale === "zh" ? 75 : 155);

interface PageMetaInput {
  locale: Locale;
  /** Path without locale prefix, e.g. "/services" ("" for home). */
  path: string;
  title: string;
  description: string;
  /** Skip the `%s | Linda Wiryani` template (home page). */
  absoluteTitle?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  image?: { url: string; width?: number; height?: number; alt?: string };
  siteName?: string;
}

/**
 * Full per-page metadata: title, description, canonical + hreflang,
 * Open Graph (localized `locale`) and Twitter card.
 * NOTE: a page-level `openGraph` / `alternates` REPLACES the parent's, so
 * every field is set here instead of relying on the root layout.
 */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle,
  ogTitle,
  ogDescription,
  image,
  siteName = "Linda Wiryani Design & Event Planning",
}: PageMetaInput): Metadata {
  const img = image ?? { url: DEFAULT_OG_IMAGE, width: 1200, height: 630 };
  const desc = clip(description, descLimit(locale));
  const ogDesc = clip(ogDescription ?? description, 200);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: desc,
    alternates: buildAlternates(locale, path),
    openGraph: {
      title: ogTitle ?? title,
      description: ogDesc,
      url: absoluteUrl(locale, path),
      siteName,
      locale: OG_LOCALE[locale],
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l]),
      type: "website",
      images: [img],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description: ogDesc,
      images: [img.url],
    },
  };
}

/** Metadata for the static pages, copy from messages `seo.pages.<key>`. */
export async function getPageMetadata(
  locale: Locale,
  key: SeoPageKey,
  path: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "seo" });
  return buildPageMetadata({
    locale,
    path,
    title: t(`pages.${key}.title`),
    description: t(`pages.${key}.description`),
    absoluteTitle: key === "home",
    siteName: t("site.siteName"),
    image: {
      url: DEFAULT_OG_IMAGE,
      width: 1200,
      height: 630,
      alt: t("site.ogAlt"),
    },
  });
}
