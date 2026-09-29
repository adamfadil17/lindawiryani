import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "../globals.css";

/**
 * Root layout for the admin area (/auth/login, /dashboard/*).
 *
 * The public site has its own root layout in app/[locale]/layout.tsx.
 * Because there is no app/layout.tsx, every top-level route group needs
 * its own <html>/<body> — this is the one for (admin), which is not
 * localized on purpose.
 */

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Admin | Linda Wiryani",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cormorant.className}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
