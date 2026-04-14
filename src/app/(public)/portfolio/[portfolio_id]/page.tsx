import { Metadata } from "next";
import { notFound } from "next/navigation";
import axios from "axios";
import type { Portfolio } from "@/types";
import { PortfolioDetail } from "./components/portfolio-detail";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

async function fetchPortfolioBySlug(slug: string): Promise<Portfolio | null> {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/portfolios`, {
      params: { slug },
    });
    return data.data ?? null;
  } catch {
    return null;
  }
}

async function fetchRelatedPortfolios(
  currentId: string,
  destinationId: string | null,
  experienceId: string | null,
): Promise<Portfolio[]> {
  try {
    const queries: Promise<Portfolio[]>[] = [];

    if (destinationId) {
      queries.push(
        axios
          .get(`${BASE_URL}/api/portfolios`, {
            params: { destinationId, limit: 10 },
          })
          .then((r) => r.data.data ?? [])
          .catch(() => []),
      );
    }

    if (experienceId) {
      queries.push(
        axios
          .get(`${BASE_URL}/api/portfolios`, {
            params: { experienceId, limit: 10 },
          })
          .then((r) => r.data.data ?? [])
          .catch(() => []),
      );
    }

    const results = await Promise.all(queries);

    const seen = new Set<string>([currentId]);
    const merged: Portfolio[] = [];
    for (const list of results) {
      for (const p of list) {
        if (!seen.has(p.id)) {
          seen.add(p.id);
          merged.push(p);
        }
        if (merged.length === 3) break;
      }
      if (merged.length === 3) break;
    }

    return merged;
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ portfolio_id: string }>;
}): Promise<Metadata> {
  const { portfolio_id } = await params;
  const item = await fetchPortfolioBySlug(portfolio_id);

  if (!item) {
    return { title: "Portfolio | Linda Wiryani Design and Event Planning" };
  }

  return {
    title: `${item.couple} — ${item.subtitle} | Portfolio | Linda Wiryani Design`,
    description: item.excerpt,
    openGraph: {
      title: `${item.couple} — ${item.subtitle}`,
      description: item.excerpt,
      images: [{ url: item.image, alt: `${item.couple} wedding in Bali` }],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ portfolio_id: string }>;
}) {
  const { portfolio_id } = await params;

  const item = await fetchPortfolioBySlug(portfolio_id);
  if (!item) notFound();

  const relatedItems = await fetchRelatedPortfolios(
    item.id,
    item.destination_id,
    item.experience_id,
  );

  return <PortfolioDetail item={item} relatedItems={relatedItems} />;
}
