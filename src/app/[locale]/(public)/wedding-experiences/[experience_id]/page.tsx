import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { WeddingExperiencesDetail } from "./components/wedding-experiences-detail";
import { getWeddingExperienceData } from "@/lib/data/wedding-experience-data";
import { getVenueData } from "@/lib/data/venue-data";
import { getWeddingThemeData } from "@/lib/data/wedding-theme-data";
import type { Locale } from "@/i18n/routing";

export async function generateStaticParams() {
  const { weddingExperienceList } = getWeddingExperienceData("en");
  return weddingExperienceList.map((e) => ({ experience_id: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; experience_id: string }>;
}): Promise<Metadata> {
  const { locale, experience_id } = await params;
  const { weddingExperienceList } = getWeddingExperienceData(locale);
  const experience = weddingExperienceList.find(
    (e) => e.slug === experience_id,
  );

  if (!experience) {
    return {
      title: "Wedding Experiences | Linda Wiryani Design and Event Planning",
    };
  }

  return {
    title: `${experience.name} in Bali | Linda Wiryani Design and Event Planning`,
    description: experience.hero_desc,
    openGraph: {
      title: `${experience.name} in Bali`,
      description: experience.hero_desc,
      images: [
        {
          url: experience.hero_image,
          width: 1200,
          height: 630,
          alt: `${experience.name} in Bali`,
        },
      ],
    },
  };
}

export default async function WeddingExperiencePage({
  params,
}: {
  params: Promise<{ locale: Locale; experience_id: string }>;
}) {
  const { locale, experience_id } = await params;
  setRequestLocale(locale);

  const { weddingExperienceList } = getWeddingExperienceData(locale);
  const { venueList } = getVenueData(locale);
  const { weddingThemeList } = getWeddingThemeData(locale);

  const elopementThemes = weddingThemeList.filter(
    (t) => t.type === "ELOPEMENT",
  );
  const intimateThemes = weddingThemeList.filter((t) => t.type === "INTIMATE");
  const locations = [
    "All",
    ...Array.from(
      new Set(
        venueList.map((v) => v.destination?.name).filter(Boolean) as string[],
      ),
    ),
  ];

  return (
    <WeddingExperiencesDetail
      experienceList={weddingExperienceList}
      currentSlug={experience_id}
      allVenues={venueList}
      elopementThemes={elopementThemes}
      intimateThemes={intimateThemes}
      locations={locations}
    />
  );
}
