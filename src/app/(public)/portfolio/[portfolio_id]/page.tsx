import { notFound } from "next/navigation";
import { Metadata } from "next";
import PortfolioDetail from "./components/portfolio-detail";
import { portfolioItems } from "@/lib/data/portfolio-data";
import { destinationList } from "@/lib/data/destination-data";
import { weddingExperienceList } from "@/lib/data/wedding-experience-data";


export async function generateStaticParams() {
  return portfolioItems.map((item) => ({
    portfolio_id: item.slug,
  }));
}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ portfolio_id: string }>;
}): Promise<Metadata> {
  const { portfolio_id } = await params;
  const item = portfolioItems.find((p) => p.slug === portfolio_id);

  if (!item) {
    return {
      title: "Portfolio | Linda Wiryani Design and Event Planning",
    };
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


export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ portfolio_id: string }>;
}) {
  const { portfolio_id } = await params;
  const item = portfolioItems.find((p) => p.slug === portfolio_id);

  if (!item) {
    notFound();
  }

  const relatedItems = portfolioItems
    .filter(
      (p) =>
        p.id !== item.id &&
        (p.destination_id === item.destination_id ||
          p.experience_id === item.experience_id),
    )
    .slice(0, 3);

  const destination = destinationList.find((d) => d.id === item.destination_id);
  const experience = weddingExperienceList.find(
    (e) => e.id === item.experience_id,
  );

  return (
    <PortfolioDetail
      item={item}
      relatedItems={relatedItems}
      destination={destination}
      experience={experience}
    />
  );
}
