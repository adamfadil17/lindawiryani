import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/seo";
import { getWorkingWithUsPageData } from "@/lib/content";
import WorkingWithUsPageClient from "./page-client";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "workingWithUs", "/working-with-us");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const data = await getWorkingWithUsPageData(locale);

  return (
    <WorkingWithUsPageClient
      openPositions={data.openPositions}
      englishPositions={data.englishPositions}
      vendorCategories={data.vendorCategories}
      englishVendorCategories={data.englishVendorCategories}
      vendorValues={data.vendorValues}
    />
  );
}
