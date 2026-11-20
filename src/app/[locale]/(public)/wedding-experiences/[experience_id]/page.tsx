import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { WeddingExperiencesDetail } from "./components/wedding-experiences-detail";
import {
  getWeddingExperiences,
  getVenues,
  getWeddingThemes,
  getContentLocales,
} from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata, getPageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const { weddingExperienceList } = await getWeddingExperiences("en");
  return weddingExperienceList.map((e) => ({ experience_id: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; experience_id: string }>;
}): Promise<Metadata> {
  const { locale, experience_id } = await params;
  const { weddingExperienceList } = await getWeddingExperiences(locale);
  const experience = weddingExperienceList.find(
    (e) => e.slug === experience_id,
  );

  if (!experience) {
    return getPageMetadata(locale, "weddingExperiences", "/wedding-experiences");
  }

  const tSeo = await getTranslations({ locale, namespace: "seo" });
  const title = tSeo("detail.experienceTitle", { name: experience.name });
  const alternateLocales = await getContentLocales(
    "experience",
    experience.slug,
  );
  return buildPageMetadata({
    locale,
    path: `/wedding-experiences/${experience.slug}`,
    alternateLocales,
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

  const [{ weddingExperienceList }, { venueList }, { weddingThemeList }] =
    await Promise.all([
      getWeddingExperiences(locale),
      getVenues(locale),
      getWeddingThemes(locale),
    ]);

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
      weddingThemeList={weddingThemeList}
      elopementThemes={elopementThemes}
      intimateThemes={intimateThemes}
      locations={locations}
    />
  );
}
