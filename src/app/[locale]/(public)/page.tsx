import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/seo";
import {
  getPortfolioReviews,
  getVenues,
  getWeddingExperiences,
  getWeddingThemes,
} from "@/lib/content";
import HomePageClient from "./page-client";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "home", "");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [reviews, venues, experiences, themes] = await Promise.all([
    getPortfolioReviews(locale),
    getVenues(locale),
    getWeddingExperiences(locale),
    getWeddingThemes(locale),
  ]);

  return (
    <HomePageClient
      reviews={reviews}
      venueList={venues.venueList}
      weddingExperienceList={experiences.weddingExperienceList}
      weddingThemeList={themes.weddingThemeList}
    />
  );
}
