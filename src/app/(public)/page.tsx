"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import AboutUs from "@/components/shared/about-us";
import Instagram from "@/components/shared/instagram";
import { reviews } from "@/lib/data/portfolio-data";
import WeddingThemesSection from "@/components/shared/wedding-themes";
import VenuesSection from "@/components/shared/venues";
import { useCurrencyConverter } from "@/hook/useCurrencyConverter";
import type { Venue, Currency } from "@/types";
import { ReviewsSection } from "@/components/shared/reviews";

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCurrency] = useState<Currency>("IDR");
  const [reviewSlide, setReviewSlide] = useState(0);

  const [venueFromTheme, setVenueFromTheme] = useState<Venue | null>(null);

  const exchangeRate = useCurrencyConverter();

  const DESKTOP_CARDS = 3;

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 1024);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleExploreVenueFromTheme = (venue: Venue) => {
    setVenueFromTheme(venue);
  };

  return (
    <div id="home" className="min-h-screen overflow-x-hidden">
      <section className="relative min-h-[75vh] md:min-h-[70vh] lg:min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-48">
        <div className="absolute inset-0">
          <Image
            src="/images/hero1.png"
            alt="Luxury Wedding Planner & Designer in Bali"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/34 via-black/10 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 pb-20 lg:pb-28"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeInUp}
            className="text-white tracking-[0.3em] uppercase mb-5"
          >
            Luxury Wedding Planner & Designer in Bali
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-5 md:mb-6 leading-tight"
          >
            Destination & Intimate Weddings <br />
            <span> in Bali – Designed with Intention</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-white/80 max-w-xl leading-relaxed"
          >
            This is where you place emotion, art, storytelling, hospitality,
            philosophy.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="#wedding-themes-section">
              <button className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/10 hover:cursor-pointer transition-colors duration-300">
                PLAN YOUR BALI WEDDING
              </button>
            </Link>
            <Link href="#about">
              <button className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/10 hover:cursor-pointer transition-colors duration-300">
                EXPLORE OUR APPROACH
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <AboutUs />

      <WeddingThemesSection
        isMobile={isMobile}
        onExploreVenue={handleExploreVenueFromTheme}
      />

      <VenuesSection
        isMobile={isMobile}
        selectedCurrency={selectedCurrency}
        exchangeRate={exchangeRate}
        onVenueSelect={() => {}}
        externalSelectedVenue={venueFromTheme}
        onExternalModalClose={() => setVenueFromTheme(null)}
      />

      <Instagram />

      <ReviewsSection />
    </div>
  );
}
