import axios from "axios";
import type { DestinationCategory } from "@/types";
import { DestinationsPage } from "./_components/destinations-page";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

async function fetchCategories(): Promise<DestinationCategory[]> {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/destination-categories`, {
      params: { limit: 100 },
    });
    return data.data ?? [];
  } catch {
    return [];
  }
}

async function fetchDestinationCount(categoryId: string): Promise<number> {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/destinations`, {
      params: { categoryId, limit: 100 },
    });
    return data.meta?.total ?? data.data?.length ?? 0;
  } catch {
    return 0;
  }
}

export default async function Page() {
  const categories = await fetchCategories();


  const counts = await Promise.all(
    categories.map(async (cat) => ({
      id: cat.id,
      count: await fetchDestinationCount(cat.id),
    })),
  );

  const categoryCounts = Object.fromEntries(
    counts.map(({ id, count }) => [id, count]),
  );

  return (
    <DestinationsPage
      categories={categories}
      categoryCounts={categoryCounts}
    />
  );
}