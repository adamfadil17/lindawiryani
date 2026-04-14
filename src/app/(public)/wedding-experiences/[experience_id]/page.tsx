import { Metadata } from "next";
import { notFound } from "next/navigation";
import axios from "axios";
import { WeddingExperiencesDetail } from "./_components/wedding-experiences-detail";
import type { WeddingExperience } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

function toArray<T>(value: unknown, fallback: T): T {
  if (Array.isArray(value)) return value as T;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? (parsed as T) : fallback;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

function normaliseExperience(raw: Record<string, unknown>): WeddingExperience {
  return {
    ...raw,
    intro_heading: toArray(raw.intro_heading, ["", ""]),
    intro_list: toArray(raw.intro_list, []),
    intro_images: toArray(raw.intro_images, []),
    approach_heading: toArray(raw.approach_heading, ["", ""]),
    approach_list: toArray(raw.approach_list, []),
    services_heading: toArray(raw.services_heading, ["", ""]),
    services_list: toArray(raw.services_list, []),
    services_dark_heading: toArray(raw.services_dark_heading, ["", ""]),
    services_dark_list: toArray(raw.services_dark_list, []),
    closing_heading: toArray(raw.closing_heading, ["", ""]),
    closing_couple_values: toArray(raw.closing_couple_values, []),
    faqs: toArray(raw.faqs, []),
    venues: toArray(raw.venues, []),
    themes: toArray(raw.themes, []),
  } as unknown as WeddingExperience;
}

async function fetchExperienceBySlug(
  slug: string,
): Promise<WeddingExperience | null> {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/wedding-experiences`, {
      params: { slug },
    });
    const raw = data.data ?? data;
    return raw ? normaliseExperience(raw) : null;
  } catch {
    return null;
  }
}

async function fetchAllExperiences(): Promise<WeddingExperience[]> {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/wedding-experiences`, {
      params: { limit: 50 },
    });
    return data.data ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ experience_id: string }>;
}): Promise<Metadata> {
  const { experience_id } = await params;
  const experience = await fetchExperienceBySlug(experience_id);

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

  const [experience, experienceList] = await Promise.all([
    fetchExperienceBySlug(experience_id),
    fetchAllExperiences(),
  ]);

  if (!experience) notFound();

  return (
    <WeddingExperiencesDetail
      experience={experience}
      experienceList={experienceList}
    />
  );
}
