import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/seo";
import { getDestinations, getPortfolios, getWeddingExperiences } from "@/lib/content";
import PortfolioPageClient from "./page-client";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "portfolio", "/portfolio");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [portfolio, destinations, experiences] = await Promise.all([
    getPortfolios(locale),
    getDestinations(locale),
    getWeddingExperiences(locale),
  ]);

  return (
    <PortfolioPageClient
      portfolioItems={portfolio.portfolioItems}
      reviews={portfolio.reviews}
      destinationList={destinations.destinationList}
      weddingExperienceList={experiences.weddingExperienceList}
    />
  );
}
