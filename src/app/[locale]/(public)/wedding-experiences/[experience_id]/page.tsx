import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { WeddingExperiencesDetail } from "./components/wedding-experiences-detail";
import { getWeddingExperienceData } from "@/lib/data/wedding-experience-data";
import { getVenueData } from "@/lib/data/venue-data";
import { getWeddingThemeData } from "@/lib/data/wedding-theme-data";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata, getPageMetadata } from "@/lib/seo";

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
    return getPageMetadata(locale, "weddingExperiences", "/wedding-experiences");
  }

  const tSeo = await getTranslations({ locale, namespace: "seo" });
  const title = tSeo("detail.experienceTitle", { name: experience.name });
  return buildPageMetadata({
    locale,
    path: `/wedding-experiences/${experience.slug}`,
    title,
    description: experience.hero_desc,
    siteName: tSeo("site.siteName"),
    image: {
      url: experience.hero_image,
      width: 1200,
      height: 630,
      alt: tSeo("detail.experienceAlt", { name: experience.name }),
    },
  });
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
