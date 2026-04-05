import { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationDetail from "./components/destination-detail";
import { destinationList } from "@/lib/data/destination-data";

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

export default async function DestinationPage({ params }: Props) {
  const resolvedParams = await params;
  const destination = destinationList.find(
    (d) => d.slug === resolvedParams.destination_id,
  );

  if (!destination) {
    notFound();
  }
  const otherDestinations = destinationList.filter(
    (d) =>
      d.slug !== destination.slug &&
      d.category_id === destination.category_id,
  );

  return (
    <DestinationDetail
      destination={destination}
      otherDestinations={otherDestinations}
    />
  );
}