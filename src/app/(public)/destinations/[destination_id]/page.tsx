import { Metadata } from "next";
import { notFound } from "next/navigation";
import axios from "axios";
import type { Destination } from "@/types";
import { DestinationDetail } from "./components/destination-detail";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

async function fetchDestinationBySlug(
  slug: string,
): Promise<Destination | null> {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/destinations`, {
      params: { slug },
    });
    return data.data ?? null;
  } catch {
    return null;
  }
}

async function fetchDestinationsByCategory(
  categoryId: string,
): Promise<Destination[]> {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/destinations`, {
      params: { categoryId, limit: 100 },
    });
    return data.data ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ destination_id: string }>;
}): Promise<Metadata> {
  const { destination_id } = await params;
  const destination = await fetchDestinationBySlug(destination_id);

  if (!destination) {
    return {
      title: "Destination Not Found | Linda Wiryani Design and Event Planning",
    };
  }

  return {
    title: `${destination.name} Wedding Planning | Linda Wiryani Design and Event Planning`,
    description: destination.description,
    openGraph: {
      title: `${destination.name} Destination Weddings`,
      description: destination.long_description,
      images: [
        {
          url: destination.image,
          width: 1200,
          height: 630,
          alt: destination.name,
        },
      ],
    },
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ destination_id: string }>;
}) {
  const { destination_id } = await params;

  const destination = await fetchDestinationBySlug(destination_id);
  if (!destination) notFound();

  const categoryId = destination.location?.category?.id;
  const allInCategory = categoryId
    ? await fetchDestinationsByCategory(categoryId)
    : [];

  const otherDestinations = allInCategory.filter(
    (d) => d.slug !== destination.slug,
  );

  return (
    <DestinationDetail
      destination={destination}
      otherDestinations={otherDestinations}
    />
  );
}
