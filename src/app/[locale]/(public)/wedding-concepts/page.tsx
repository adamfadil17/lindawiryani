import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/seo";
import {
  getVenues,
  getWeddingExperiences,
  getWeddingThemes,
} from "@/lib/content";
import WeddingConceptsPageClient from "./page-client";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "weddingConcepts", "/wedding-concepts");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [venues, experiences, themes] = await Promise.all([
    getVenues(locale),
    getWeddingExperiences(locale),
    getWeddingThemes(locale),
  ]);

  return (
    <WeddingConceptsPageClient
      venueList={venues.venueList}
      weddingExperienceList={experiences.weddingExperienceList}
      weddingThemeList={themes.weddingThemeList}
    />
  );
}
