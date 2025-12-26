import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lindawiryani.com"),
  title: {
    default:
      "Linda Wiryani | Luxury Elopement & Intimate Wedding Planner Bali",
    template: "%s | Linda Wiryani",
  },
  description:
    "Linda Wiryani Design & Event Planning: Curating intimate elopements and private villa weddings in Bali. Artfully designed celebrations rooted in architecture, hospitality, and storytelling.",
  keywords: [
    "Linda Wiryani",
    "Bali Wedding Planner",
    "Private Villa Wedding Bali",
    "Intimate Wedding Bali",
    "Elopement Bali",
    "Signature Wedding Venues Bali",
    "Luxury Wedding Design",
    "Bespoke Wedding Styling Bali",
  ],
  authors: [{ name: "Linda Wiryani" }],
  icons: {
    icon: "/images/logo-lindawiryani.png",
    shortcut: "/images/logo-lindawiryani.png",
  },
  openGraph: {
    title:
      "Linda Wiryani - Elopement, Intimate, Signature Venues and Private Villa Weddings in Bali",
    description:
      "Bespoke Bali wedding planning for couples who value meaning over excess. Specializing in intimate celebrations, signature venues, and private estates.",
    url: "https://www.lindawiryani.com",
    siteName: "Linda Wiryani Design & Event Planning",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/logo-lindawiryani.png",
        width: 1200,
        height: 630,
        alt: "Linda Wiryani Luxury Wedding Planning Bali",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data (JSON-LD) updated with your specific service descriptions
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Linda Wiryani Design and Event Planning",
    url: "https://www.lindawiryani.com",
    image: "https://www.lindawiryani.com/images/logo-lindawiryani.png",
    description:
      "A Bali-based wedding planning and design practice specializing in intimate celebrations, private villa weddings, and signature venues.",
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
      name: "Wedding Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Elopement Weddings",
            description:
              "Intimate celebrations designed for couples seeking privacy, meaning, and extraordinary settings.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Intimate Weddings",
            description:
              "Thoughtfully scaled celebrations curated for connection, elegance, and refined hospitality.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Signature Venue Selection",
            description:
              "A curated selection of venues known for distinctive architecture, setting, and experience.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Private Villa Weddings",
            description:
              "Exclusive private estates offering intimacy, flexibility, and a deeply personal celebration experience.",
          },
        },
      ],
    },
  };

  return (
    <html lang="en" className={cormorant.className}>
      <body>
        <Script
          id="schema-markup"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
