import { Metadata } from "next";
import { WeddingExperiencesDetail } from "./components/wedding-experiences-detail";
import { weddingExperienceList } from "@/lib/data/wedding-experience-data";
import { venueList } from "@/lib/data/venue-data";
import { weddingThemeList } from "@/lib/data/wedding-theme-data";

const elopementThemes = weddingThemeList.filter((t) => t.type === "ELOPEMENT");
const intimateThemes = weddingThemeList.filter((t) => t.type === "INTIMATE");

const locations = [
  "All",
  ...Array.from(
    new Set(
      venueList.map((v) => v.destination?.name).filter(Boolean) as string[],
    ),
  ),
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ experience_id: string }>;
}): Promise<Metadata> {
  const { experience_id } = await params;
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
  params: Promise<{ experience_id: string }>;
}) {
  const { experience_id } = await params;
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
