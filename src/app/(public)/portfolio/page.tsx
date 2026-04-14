import axios from "axios";
import type { Portfolio, WeddingExperience, Destination } from "@/types";
import { PortfolioPage } from "./_components/portfolio-page";
import { deriveReviews } from "@/lib/reviews-utils";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

async function fetchAllPortfolios(): Promise<Portfolio[]> {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/portfolios`, {
      params: { limit: 100 },
    });
    return data.data ?? [];
  } catch {
    return [];
  }
}

async function fetchAllExperiences(): Promise<WeddingExperience[]> {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/wedding-experiences`, {
      params: { limit: 100 },
    });
    return data.data ?? [];
  } catch {
    return [];
  }
}

async function fetchAllDestinations(): Promise<Destination[]> {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/destinations`, {
      params: { limit: 100 },
    });
    return data.data ?? [];
  } catch {
    return [];
  }
}

export default async function Page() {
  const [portfolios, experiences, destinations] = await Promise.all([
    fetchAllPortfolios(),
    fetchAllExperiences(),
    fetchAllDestinations(),
  ]);

  return (
    <PortfolioPage
      portfolios={portfolios}
      experiences={experiences}
      destinations={destinations}
      initialReviews={deriveReviews(portfolios)}
    />
  );
}
