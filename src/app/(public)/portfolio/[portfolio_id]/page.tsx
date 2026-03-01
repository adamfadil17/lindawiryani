import { notFound } from "next/navigation";
import { Metadata } from "next";
import { portfolioItems } from "@/lib/data/portfolio/portfolio-data";
import PortfolioDetail from "./components/portfolio-detail";

// ─── generateStaticParams ─────────────────────────────────────────────────────

export async function generateStaticParams() {
  return portfolioItems.map((item) => ({
    portfolio_id: item.slug,
  }));
}

// ─── generateMetadata ─────────────────────────────────────────────────────────

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
      images: [{ url: item.heroImage, alt: `${item.couple} wedding in Bali` }],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

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

  return <PortfolioDetail item={item} />;
}