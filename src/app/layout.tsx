import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Linda Wiryani",
  description: "Linda Wiryani Design & Event Planning",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cormorant.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/logo-lindawiryani-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/logo-lindawiryani-16x16.png"
        />

        <meta name="theme-color" content="#ffffff" />
        <meta name="author" content="Linda Wiryani" />
        <meta
          name="keywords"
          content="Linda Wiryani, Event Planning, Bali, Wedding, Marketing"
        />
        <meta
          property="og:title"
          content="Linda Wiryani - Design & Event Planning"
        />
        <meta
          property="og:description"
          content="Luxury-inspired Bali wedding styling and event planning with five-star hospitality standards."
        />
        <meta property="og:url" content="https://www.lindawiryani.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
