import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { HREFLANG, absoluteUrl } from "@/lib/seo";
import { getDestinationData } from "@/lib/data/destination-data";
import { getArticleData } from "@/lib/data/article-data";
import { getWeddingExperienceData } from "@/lib/data/wedding-experience-data";
import { getPortfolioData } from "@/lib/data/portfolio-data";

/**
 * Sitemap for the localized public site. One entry per locale per page,
 * each carrying hreflang alternates (incl. x-default) so search engines
 * can pair /id, /fr and /zh with their English counterpart.
 * Slugs are identical across locales, so the English data is the source.
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
): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[HREFLANG[l]] = absoluteUrl(l, path);
  languages["x-default"] = absoluteUrl(routing.defaultLocale, path);

  return routing.locales.map((locale) => ({
    url: absoluteUrl(locale, path),
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const { destinationList } = getDestinationData("en");
  const { articles } = getArticleData("en");
  const { weddingExperienceList } = getWeddingExperienceData("en");
  const { portfolioItems } = getPortfolioData("en");

  return [
    ...STATIC_PAGES.flatMap((p) => entries(p.path, p.priority, p.freq)),
    ...destinationList.flatMap((d) =>
      entries(`/destinations/${d.slug}`, 0.8, "monthly"),
    ),
    ...weddingExperienceList.flatMap((e) =>
      entries(`/wedding-experiences/${e.slug}`, 0.8, "monthly"),
    ),
    ...portfolioItems.flatMap((p) =>
      entries(`/portfolio/${p.slug}`, 0.6, "yearly"),
    ),
    ...articles.flatMap((a) => entries(`/journal/${a.slug}`, 0.6, "monthly")),
  ];
}
