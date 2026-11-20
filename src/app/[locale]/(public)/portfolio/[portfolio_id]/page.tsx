import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PortfolioDetail from "./components/portfolio-detail";
import {
  getPortfolios,
  getDestinations,
  getWeddingExperiences,
  getContentLocales,
} from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata, getPageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const { portfolioItems } = await getPortfolios("en");
  return portfolioItems.map((item) => ({
    portfolio_id: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; portfolio_id: string }>;
}): Promise<Metadata> {
  const { locale, portfolio_id } = await params;
  const { portfolioItems } = await getPortfolios(locale);
  const item = portfolioItems.find((p) => p.slug === portfolio_id);

  if (!item) {
    return getPageMetadata(locale, "portfolio", "/portfolio");
  }

  const tSeo = await getTranslations({ locale, namespace: "seo" });
  const alternateLocales = await getContentLocales("portfolio", item.slug);
  return buildPageMetadata({
    locale,
    path: `/portfolio/${item.slug}`,
    alternateLocales,
    title: tSeo("detail.portfolioTitle", {
      couple: item.couple,
      subtitle: item.subtitle,
    }),
    ogTitle: `${item.couple} — ${item.subtitle}`,
    description: item.excerpt,
    siteName: tSeo("site.siteName"),
    image: {
      url: item.image,
      alt: tSeo("detail.portfolioAlt", { couple: item.couple }),
    },
  });
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; portfolio_id: string }>;
}) {
  const { locale, portfolio_id } = await params;
  setRequestLocale(locale);

  const { portfolioItems } = await getPortfolios(locale);
  const { destinationList } = await getDestinations(locale);
  const { weddingExperienceList } = await getWeddingExperiences(locale);

  const item = portfolioItems.find((p) => p.slug === portfolio_id);

  if (!item) {
    notFound();
  }

  const relatedItems = portfolioItems
    .filter(
      (p) =>
        p.id !== item.id &&
        (p.destination_id === item.destination_id ||
          p.experience_id === item.experience_id),
    )
    .slice(0, 3);

  const destination = destinationList.find((d) => d.id === item.destination_id);
  const experience = weddingExperienceList.find(
    (e) => e.id === item.experience_id,
  );

  return (
    <PortfolioDetail
      item={item}
      relatedItems={relatedItems}
      destination={destination}
      experience={experience}
    />
  );
}
