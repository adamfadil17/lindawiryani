import type { Metadata, Viewport } from "next"; // Added Viewport type
import { Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// 1. NEW VIEWPORT EXPORT (Fixes the themeColor warning)
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

// 2. UPDATED METADATA (themeColor removed from here)
export const metadata: Metadata = {
  metadataBase: new URL("https://www.lindawiryani.com"),
  title: {
    default: "Linda Wiryani | Luxury Wedding & Event Planning Bali",
    template: "%s | Linda Wiryani",
  },
  description:
    "Bespoke Bali wedding styling and event planning with five-star hospitality standards.",
  keywords: [
    "Linda Wiryani",
    "Bali Wedding Planner",
    "Luxury Wedding Bali",
    "Event Design Bali",
  ],
  authors: [{ name: "Linda Wiryani" }],
  icons: {
    icon: "/images/logo-lindawiryani.png",
    shortcut: "/images/logo-lindawiryani.png",
  },
  openGraph: {
    title: "Linda Wiryani - Luxury Design & Event Planning",
    description:
      "Luxury-inspired Bali wedding styling and event planning with five-star hospitality standards.",
    url: "https://www.lindawiryani.com",
    siteName: "Linda Wiryani",
    locale: "en_US",
    type: "website",
    images: [
      {
        // FIX: Ensure this path matches where your file actually is
        // If the file is in public/images/logo-lindawiryani.png, use:
        url: "/images/logo-lindawiryani.png",
        width: 1200,
        height: 630,
        alt: "Linda Wiryani Wedding Planning Bali",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Linda Wiryani Design & Event Planning",
    url: "https://www.lindawiryani.com",
    image: "https://www.lindawiryani.com/images/logo-lindawiryani.png",
    description:
      "Premium wedding organization and event design services in Bali.",
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
          itemOffered: { "@type": "Service", name: "Wedding Planning" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Event Styling & Design" },
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
