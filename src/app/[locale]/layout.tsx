import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { DEFAULT_OG_IMAGE, OG_LOCALE, SITE_URL, absoluteUrl } from "@/lib/seo";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

/**
 * Site-wide defaults, localized from messages `seo.site`.
 * Intentionally NO `alternates` / `openGraph.url` here: a page-level value
 * replaces the parent's, and a root canonical would point every page that
 * forgets its own at the homepage. Each page sets its own (see lib/seo.ts).
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "seo.site" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: "%s | Linda Wiryani",
    },
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    authors: [{ name: "Linda Wiryani" }],
    icons: {
      icon: "/images/logo-lindawiryani.png",
      shortcut: "/images/logo-lindawiryani.png",
      apple: "/apple-touch-icon.png.png",
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: absoluteUrl(locale as Locale),
      siteName: t("siteName"),
      locale: OG_LOCALE[locale as Locale],
      type: "website",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: t("ogAlt"),
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enables static rendering for this locale in child server components
  setRequestLocale(locale);

  const tLd = await getTranslations({ locale, namespace: "seo.jsonLd" });

  // Structured Data (JSON-LD) updated with your specific service descriptions
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EventPlanning",
    name: "Linda Wiryani Design and Event Planning",
    url: "https://www.lindawiryani.com",
    image: "https://www.lindawiryani.com/images/logo-lindawiryani.png",
    description: tLd("description"),
    inLanguage: locale,
    telephone: "+628113980998",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bali",
      addressRegion: "Bali",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -8.6297215,
      longitude: 115.2386418,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "23:59",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: tLd("catalogName"),
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: tLd("offers.elopement.name"),
            description: tLd("offers.elopement.description"),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: tLd("offers.intimate.name"),
            description: tLd("offers.intimate.description"),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: tLd("offers.venues.name"),
            description: tLd("offers.venues.description"),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: tLd("offers.villa.name"),
            description: tLd("offers.villa.description"),
          },
        },
      ],
    },
  };

  return (
    <html lang={locale} className={cormorant.className}>
      <body>
        <Script
          id="schema-markup"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
