"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Venue } from "@/lib/data/wedding-concepts/wedding-concepts-data";
import AboutUs from "@/components/shared/about-us";
import Instagram from "@/components/shared/instagram";
import { reviews } from "@/lib/data/portfolio/portfolio-data";
import { Currency } from "@/lib/types/wedding-concepts/wedding-concepts-types";
import WeddingThemesSection from "@/components/shared/wedding-themes";
import VenuesSection from "@/components/shared/venues";

// ── Extracted sub-page components ────────────────────────────────────────

// ── Currency hook ───────────────────────────────────────────────────────────
const useCurrencyConverter = () => {
  const [exchangeRate, setExchangeRate] = useState<number>(15800);
  const CACHE_DURATION = 60 * 60 * 1000;

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const now = Date.now();
      const cachedRate = sessionStorage.getItem("exchangeRate");
      const cachedTime = sessionStorage.getItem("exchangeRateTime");

      if (cachedRate && cachedTime) {
        const timeDiff = now - Number.parseInt(cachedTime);
        if (timeDiff < CACHE_DURATION) {
          setExchangeRate(Number.parseFloat(cachedRate));
          return;
        }
      }

      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD",
        );
        const data = await response.json();
        const rate = data.rates.IDR;
        setExchangeRate(rate);
        sessionStorage.setItem("exchangeRate", rate.toString());
        sessionStorage.setItem("exchangeRateTime", now.toString());
      } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
      }
    };

    fetchExchangeRate();
  }, []);

  return exchangeRate;
};

// ─── Page ───────────────────────────────────────────────────────────────────

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCurrency] = useState<Currency>("IDR");
  const [reviewSlide, setReviewSlide] = useState(0);

  // Venue selected from ThemeDetailModal — passed down to VenuesSection
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
      {/* ── HERO ──────────────────────────────────────────────────────── */}
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

      {/* ── ABOUT US ──────────────────────────────────────────────────── */}
      <AboutUs />

      {/* ── WEDDING THEMES ────────────────────────────────────────────── */}
      <WeddingThemesSection
        isMobile={isMobile}
        onExploreVenue={handleExploreVenueFromTheme}
      />

      {/* ── VENUES & SETTINGS ─────────────────────────────────────────── */}
      <VenuesSection
        isMobile={isMobile}
        selectedCurrency={selectedCurrency}
        exchangeRate={exchangeRate}
        onVenueSelect={() => {}}
        externalSelectedVenue={venueFromTheme}
        onExternalModalClose={() => setVenueFromTheme(null)}
      />

      {/* <Gallery /> */}

      <Instagram />

      {/* ── KIND WORDS ────────────────────────────────────────────────── */}
      <motion.section
        className="py-20 lg:py-28 bg-primary/15"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="mb-14 lg:mb-20">
            <p className="text-primary tracking-[0.25em] uppercase mb-3">
              Kind Words
            </p>
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5">
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold leading-tight">
                  What our couples
                  <br />
                  <span>share with us</span>
                </h2>
              </div>
              <div className="lg:col-span-7 flex items-end">
                <p className="text-primary/80 leading-relaxed text-justify">
                  Our couples often speak not only about how their wedding
                  looked, but how it felt — calm, meaningful, effortless,
                  personal, and unforgettable are words that appear again and
                  again in their reflections.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Desktop Slider: 3 cards visible, slide by 1 ── */}
          <motion.div
            variants={fadeInUp}
            className="hidden lg:block overflow-hidden"
          >
            <motion.div
              className="flex gap-6"
              animate={{
                x: `calc(-${reviewSlide * (100 / 3)}% - ${reviewSlide * 8}px)`,
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="min-w-[calc(33.333%-11px)] bg-white border border-primary/10 p-8 flex flex-col justify-between hover:border-primary/30 transition-colors duration-300"
                >
                  <div>
                    <span className="text-5xl text-primary/50 font-serif leading-none select-none">
                      "
                    </span>
                    <p className="text-primary leading-relaxed italic mt-2 text-justify">
                      {review.quote}
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-primary/10">
                    <p className="text-primary font-semibold text-sm tracking-wide">
                      {review.couple}
                    </p>
                    <p className="text-primary/80 text-xs tracking-widest uppercase mt-1">
                      {`Couple from ${review.origin} `}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Mobile Slider: 1 card visible ── */}
          <motion.div variants={fadeInUp} className="lg:hidden overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={reviewSlide}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
                className="bg-white border border-primary/10 p-8 flex flex-col justify-between"
              >
                <div>
                  <span className="text-5xl text-primary/20 font-serif leading-none select-none">
                    "
                  </span>
                  <p className="text-primary leading-relaxed italic mt-2 text-justify">
                    {reviews[reviewSlide].quote}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-primary/10">
                  <p className="text-primary font-semibold text-sm tracking-wide">
                    {reviews[reviewSlide].couple}
                  </p>
                  <p className="text-primary/50 text-xs tracking-widest uppercase mt-1">
                    {reviews[reviewSlide].origin}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ── Controls (shared) ── */}
          <div className="flex items-center justify-between mt-10">
            {/* Dot indicators */}
            <div className="flex gap-2">
              {reviews.slice(0, reviews.length - 2).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewSlide(i)}
                  className={`h-2 rounded-full transition-all hover:cursor-pointer ${
                    reviewSlide === i
                      ? "bg-primary w-8"
                      : "bg-primary/30 w-2 hover:bg-primary/60"
                  }`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setReviewSlide((p) => Math.max(p - 1, 0))}
                disabled={reviewSlide === 0}
                className="w-10 h-10 border border-primary/40 flex items-center justify-center hover:bg-primary hover:border-primary group transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
              </button>
              <button
                onClick={() =>
                  setReviewSlide((p) =>
                    Math.min(p + 1, reviews.length - DESKTOP_CARDS),
                  )
                }
                disabled={reviewSlide >= reviews.length - DESKTOP_CARDS}
                className="w-10 h-10 border border-primary/40 flex items-center justify-center hover:bg-primary hover:border-primary group transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:cursor-pointer"
              >
                <ArrowRight className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}