import axios from "axios";
import type { WeddingExperience } from "@/types";
import { WeddingExperiencesPage } from "./_components/wedding-experiences-page";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

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

export default async function Page() {
  const experiences = await fetchAllExperiences();

  return <WeddingExperiencesPage experiences={experiences} />;
}
