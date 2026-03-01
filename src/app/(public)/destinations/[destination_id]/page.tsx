import { Metadata } from "next";
import { notFound } from "next/navigation";
import { destinationList } from "@/lib/data/destinations/destination-data";
import DestinationDetail from "./components/destination-detail";

interface Props {
  params: Promise<{
    destination_id: string;
  }>;
}

export async function generateStaticParams() {
  return destinationList.map((destination) => ({
    destination_id: destination.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const destination = destinationList.find(
    (d) => d.slug === resolvedParams.destination_id,
  );

  if (!destination) {
    return {
      title: "Destination Not Found",
    };
  }

  return {
    title: `${destination.name} Wedding Planning | Destination Weddings`,
    description: destination.description,
    openGraph: {
      title: `${destination.name} Destination Weddings`,
      description: destination.longDescription,
      images: [
        {
          url: destination.imageUrl,
          width: 1200,
          height: 630,
          alt: destination.name,
        },
      ],
    },
  };
}

export default async function DestinationPage({ params }: Props) {
  const resolvedParams = await params;
  const destination = destinationList.find(
    (d) => d.slug === resolvedParams.destination_id,
  );

  if (!destination) {
    notFound();
  }

  return <DestinationDetail destination={destination} />;
}
