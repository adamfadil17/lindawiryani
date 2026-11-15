import { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationDetail from "./components/destination-detail";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getDestinationData } from "@/lib/data/destination-data";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata, fitTitle } from "@/lib/seo";

interface Props {
  params: Promise<{
    locale: Locale;
    destination_id: string;
  }>;
}

export async function generateStaticParams() {
  const { destinationList } = getDestinationData("en");
  return destinationList.map((destination) => ({
    destination_id: destination.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const t = await getTranslations({ locale, namespace: "destinationDetail" });
  const tSeo = await getTranslations({ locale, namespace: "seo" });
  const { destinationList } = getDestinationData(locale);
  const destination = destinationList.find(
    (d) => d.slug === resolvedParams.destination_id,
  );

  if (!destination) {
    return { title: t("notFound") };
  }

  return buildPageMetadata({
    locale,
    path: `/destinations/${destination.slug}`,
    title: fitTitle(
      locale,
      t("metaTitle", { name: destination.name }),
      destination.name,
    ),
    ogTitle: t("metaOgTitle", { name: destination.name }),
    description: destination.description,
    ogDescription: destination.long_description,
    siteName: tSeo("site.siteName"),
    image: {
      url: destination.image,
      width: 1200,
      height: 630,
      alt: destination.name,
    },
  });
}

export default async function DestinationPage({ params }: Props) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  const { destinationList } = getDestinationData(resolvedParams.locale);
  const destination = destinationList.find(
    (d) => d.slug === resolvedParams.destination_id,
  );

  if (!destination) {
    notFound();
  }
  const otherDestinations = destinationList.filter(
    (d) =>
      d.slug !== destination.slug && d.category_id === destination.category_id,
  );

  return (
    <DestinationDetail
      destination={destination}
      otherDestinations={otherDestinations}
    />
  );
}
