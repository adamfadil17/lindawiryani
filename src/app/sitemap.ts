import type { MetadataRoute } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { HREFLANG, absoluteUrl } from "@/lib/seo";
import { getSitemapContent } from "@/lib/content";

// Do not prerender at build time: a DB-backed sitemap should not add 500+
// queries to the build, and it must reflect newly published content.
export const dynamic = "force-dynamic";

/**
 * Sitemap for the localized public site. One entry per available locale per
 * page, with hreflang alternates (incl. x-default). Detail pages only list
 * locales that actually have a translation in the DB (task 4.4).
 */

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

const STATIC_PAGES: { path: string; priority: number; freq: Freq }[] = [
  { path: "", priority: 1, freq: "weekly" },
  { path: "/wedding-experiences", priority: 0.9, freq: "monthly" },
  { path: "/destinations", priority: 0.9, freq: "monthly" },
  { path: "/portfolio", priority: 0.8, freq: "weekly" },
  { path: "/services", priority: 0.8, freq: "monthly" },
  { path: "/our-approach", priority: 0.7, freq: "yearly" },
  { path: "/wedding-concepts", priority: 0.7, freq: "monthly" },
  { path: "/journal", priority: 0.7, freq: "weekly" },
  { path: "/contact", priority: 0.7, freq: "yearly" },
  { path: "/working-with-us", priority: 0.5, freq: "yearly" },
];

function entries(
  path: string,
  priority: number,
  changeFrequency: Freq,
  locales: Locale[] = [...routing.locales],
  lastModified?: Date,
): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[HREFLANG[locale]] = absoluteUrl(locale, path);
  }
  languages["x-default"] = absoluteUrl(routing.defaultLocale, path);

  return locales.map((locale) => ({
    url: absoluteUrl(locale, path),
    changeFrequency,
    priority,
    lastModified,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getSitemapContent();

  return [
    ...STATIC_PAGES.flatMap((page) => entries(page.path, page.priority, page.freq)),
    ...content.destinations.flatMap((entity) =>
      entries(
        `/destinations/${entity.slug}`,
        0.8,
        "monthly",
        entity.locales,
        entity.updated_at,
      ),
    ),
    ...content.experiences.flatMap((entity) =>
      entries(
        `/wedding-experiences/${entity.slug}`,
        0.8,
        "monthly",
        entity.locales,
        entity.updated_at,
      ),
    ),
    ...content.portfolios.flatMap((entity) =>
      entries(
        `/portfolio/${entity.slug}`,
        0.6,
        "yearly",
        entity.locales,
        entity.updated_at,
      ),
    ),
    ...content.articles.flatMap((entity) =>
      entries(
        `/journal/${entity.slug}`,
        0.6,
        "monthly",
        entity.locales,
        entity.updated_at,
      ),
    ),
  ];
}
