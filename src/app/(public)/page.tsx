"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Users,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { fadeInUp, scaleIn, staggerContainer } from "@/lib/motion";
import {
  cities,
  venues,
  Venue,
  elopementThemes,
  intimateThemes,
  elopementCategoryImages,
  intimateCategoryImages,
  WeddingTheme,
  locations,
} from "@/lib/data/wedding-concepts/wedding-concepts-data";
import VenueDetailModal from "@/components/shared/venue-detail-modal";
import ThemeDetailModal from "@/components/shared/theme-detail-modal";
import { Currency } from "@/lib/types/wedding-concepts/wedding-concepts-types";
import AboutUs from "@/components/shared/about-us";
import { fadeInUp as fadeInUpMotion } from "@/lib/motion";
import { venueCurationConsiderations } from "@/lib/data/wedding-concepts/wedding-concepts-data";
import Instagram from "@/components/shared/instagram";
import { reviews } from "@/lib/data/portfolio/portfolio-data";
import Gallery from "@/components/shared/gallery";

type ExperienceFilter =
  | "Private Villa Weddings"
  | "Intimate Weddings"
  | "Elopement Weddings"
  | "Luxury Weddings";

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

const formatPrice = (
  price: number | undefined,
  currency: Currency,
  rate: number,
) => {
  if (!price) return "To Be Confirmed";
  const finalPrice = currency === "USD" ? price / rate : price;
  if (currency === "USD") {
    return finalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// ─── Sub-Components ───────────────────────────────────────────────────────────

interface VenueCardProps {
  venue: Venue;
  selectedCurrency: Currency;
  exchangeRate: number;
  onClick: () => void;
}

function VenueCard({
  venue,
  selectedCurrency,
  exchangeRate,
  onClick,
}: VenueCardProps) {
  return (
    <article
      onClick={onClick}
      className="relative group overflow-hidden aspect-[4/5] cursor-pointer"
    >
      <Image
        src={venue.images.hero || "https://placehold.net/default.svg"}
        alt={`${venue.name} - ${venue.slogan}`}
        fill
        quality={85}
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-xl md:text-2xl font-semibold mb-1 leading-tight max-w-[200px]">
          {venue.name}
        </h3>
        <p className="text-md font-light italic mb-4 text-white max-w-[280px]">
          {venue.slogan}
        </p>
        <div className="flex items-center justify-start mb-4">
          <div className="flex flex-col items-start">
            <span className="text-sm text-white/80 italic mb-0.5">
              Starts from
            </span>
            <div className="flex items-baseline gap-2">
              {venue.startingPrice !== 0 && (
                <span className="text-md font-medium">{selectedCurrency}</span>
              )}
              <span className="text-xl md:text-2xl font-normal text-white">
                {formatPrice(
                  venue.startingPrice,
                  selectedCurrency,
                  exchangeRate,
                )}
              </span>
              {venue.startingPrice !== 0 && (
                <span className="text-sm text-white">nett</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-md">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span>
              {cities.find((city) => city.id === venue.location.cityId)?.name},{" "}
              {venue.location.provinceId.charAt(0).toUpperCase() +
                venue.location.provinceId.slice(1)}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{venue.capacity} pax</span>
          </div>
        </div>
      </div>
    </article>
  );
}

interface ThemeCategoryCardProps {
  title: string;
  description: string;
  images: string[];
  onClick: () => void;
}

function ThemeCategoryCard({
  title,
  description,
  images,
  onClick,
}: ThemeCategoryCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <motion.article
      onClick={onClick}
      variants={fadeInUp}
      className="relative overflow-hidden cursor-pointer group aspect-[3/4] transition-all"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image
            src={
              images[currentImageIndex] || "https://placehold.net/default.svg"
            }
            alt={title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="50vw"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <div className="min-h-[120px] flex flex-col justify-start">
          <h3 className="text-2xl text-center md:text-3xl font-semibold mb-3">
            {title}
          </h3>
          <p className="text-md text-center text-white/90 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

interface WeddingThemeCardProps {
  theme: WeddingTheme;
  onClick: () => void;
}

function WeddingThemeCard({ theme, onClick }: WeddingThemeCardProps) {
  const venueData = venues.find((v) => v.id === theme.venueId);
  return (
    <article
      className="relative overflow-hidden cursor-pointer group aspect-[16/9]"
      onClick={onClick}
    >
      <Image
        src={theme.image || "https://placehold.net/default.svg"}
        alt={theme.title}
        fill
        loading="lazy"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-xl md:text-2xl font-semibold leading-tight mb-2">
          {theme.title}
        </h3>
        <p className="text-md text-white/90">
          {venueData ? venueData.name : "Venue To Be Confirmed"}
        </p>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [selectedVenueFilter, setSelectedVenueFilter] =
    useState<ExperienceFilter>("Luxury Weddings");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("IDR");
  const [isVenueDropdownOpen, setIsVenueDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const [selectedThemeCategory, setSelectedThemeCategory] = useState<
    "elopement" | "intimate"
  >("elopement");
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [currentThemeSlide, setCurrentThemeSlide] = useState(0);

  const [visibleCount, setVisibleCount] = useState(6);
  const [currentVenueSlide, setCurrentVenueSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const [selectedThemeForModal, setSelectedThemeForModal] =
    useState<WeddingTheme | null>(null);
  const [selectedVenueForModal, setSelectedVenueForModal] =
    useState<Venue | null>(null);

  const exchangeRate = useCurrencyConverter();

  const [reviewSlide, setReviewSlide] = useState(0);

  const DESKTOP_CARDS = 3;
  const maxDesktopSlide = reviews.length - DESKTOP_CARDS;
  const maxMobileSlide = reviews.length - 1;

  // ── Effects ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 1024);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    setCurrentVenueSlide(0);
    setVisibleCount(6);
  }, [selectedLocation, selectedVenueFilter]);

  // ── Derived State ──────────────────────────────────────────────────────────
  const filteredVenues = useMemo(() => {
    let list = venues;

    const elopementVenueIds = new Set(
      elopementThemes.map((t) => t.venueId).filter(Boolean),
    );
    const intimateVenueIds = new Set(
      intimateThemes.map((t) => t.venueId).filter(Boolean),
    );

    if (selectedVenueFilter === "Luxury Weddings") {
      list = list.filter((v) => v.categoryRelations?.category === "luxury");
    } else if (selectedVenueFilter === "Private Villa Weddings") {
      list = list.filter(
        (v) => v.categoryRelations?.category === "private_villa",
      );
    } else if (selectedVenueFilter === "Elopement Weddings") {
      list = list.filter((v) => elopementVenueIds.has(v.id));
    } else if (selectedVenueFilter === "Intimate Weddings") {
      list = list.filter((v) => intimateVenueIds.has(v.id));
    }

    if (selectedLocation !== "All") {
      list = list.filter((v) => {
        const city = cities.find((c) => c.id === v.location.cityId);
        return city?.name === selectedLocation;
      });
    }
    return list;
  }, [selectedVenueFilter, selectedLocation]);

  const visibleVenues = useMemo(
    () => (isMobile ? filteredVenues : filteredVenues.slice(0, visibleCount)),
    [filteredVenues, visibleCount, isMobile],
  );
  const totalVenuesCount = filteredVenues.length;
  const hasMoreVenues = visibleCount < totalVenuesCount;

  const currentThemes =
    selectedThemeCategory === "elopement" ? elopementThemes : intimateThemes;

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleExploreVenueFromTheme = (venue: Venue) => {
    setSelectedThemeForModal(null);
    setTimeout(() => setSelectedVenueForModal(venue), 100);
  };

  const handleCategoryClick = (category: "elopement" | "intimate") => {
    setSelectedThemeCategory(category);
    setCurrentThemeSlide(0);
    setTimeout(() => {
      document
        .getElementById("wedding-themes-selector")
        ?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
  };

  const nextThemeSlide = () =>
    setCurrentThemeSlide((p) => (p + 1) % currentThemes.length);
  const prevThemeSlide = () =>
    setCurrentThemeSlide(
      (p) => (p - 1 + currentThemes.length) % currentThemes.length,
    );
  const nextVenueSlide = () =>
    setCurrentVenueSlide((p) => (p + 1) % filteredVenues.length);
  const prevVenueSlide = () =>
    setCurrentVenueSlide(
      (p) => (p - 1 + filteredVenues.length) % filteredVenues.length,
    );

  // ── Render ─────────────────────────────────────────────────────────────────
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-white font-semibold leading-tight max-w-4xl uppercase"
          >
            Destination &
            <br />
            <span className="italic font-light normal-case">
              Intimate Weddings
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-white/80 max-w-xl leading-relaxed"
          >
            Designed with intention, emotion, and art. Every celebration begins
            with a story — thoughtfully crafted, never templated.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="#wedding-themes-section">
              <button className="bg-white text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/90 hover:cursor-pointer transition-colors duration-300">
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
      <motion.section
        id="wedding-themes-section"
        className="relative py-20 lg:py-28 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 bg-primary/10" />
        <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          {/* Header */}
          <motion.div variants={fadeInUp} className="mb-14 lg:mb-20">
            <p className="text-primary tracking-[0.25em] uppercase mb-3">
              Concept Layer 02
            </p>
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5">
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold leading-tight">
                  Wedding
                  <br />
                  <span className="italic font-light">Themes</span>
                </h2>
              </div>
              <div className="lg:col-span-7 flex items-end">
                <p className="text-primary leading-relaxed text-justify">
                  Our wedding themes are not packages or styles. They are
                  emotional directions — guiding how your celebration feels,
                  flows, and unfolds. Theme supports decisions around scale,
                  intimacy, ceremony style, and the overall guest experience.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Category Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            variants={fadeInUp}
          >
            <ThemeCategoryCard
              title="Elopement Weddings"
              description="Intimate celebrations designed for couples seeking privacy, meaning, and extraordinary settings."
              images={elopementCategoryImages}
              onClick={() => handleCategoryClick("elopement")}
            />
            <ThemeCategoryCard
              title="Intimate Weddings"
              description="Thoughtfully scaled celebrations curated for connection, elegance, and refined hospitality."
              images={intimateCategoryImages}
              onClick={() => handleCategoryClick("intimate")}
            />
          </motion.div>

          {/* Theme Selector + Cards */}
          <motion.div
            id="wedding-themes-selector"
            variants={fadeInUp}
            className="mb-8"
          >
            {/* Filter */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className="text-base md:text-lg text-primary tracking-widest uppercase font-semibold">
                WEDDING THEMES
              </span>
              <div className="relative">
                <button
                  onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                  className="flex items-center gap-2 text-md text-primary hover:text-primary/80 transition-colors hover:cursor-pointer font-medium capitalize"
                >
                  <span>{selectedThemeCategory}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isThemeDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isThemeDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-stone-200 shadow-lg z-10 min-w-[150px]">
                    {(["elopement", "intimate"] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedThemeCategory(cat);
                          setIsThemeDropdownOpen(false);
                          setCurrentThemeSlide(0);
                        }}
                        className={`block w-full text-left px-4 py-2 transition-colors hover:cursor-pointer capitalize ${
                          selectedThemeCategory === cat
                            ? "bg-primary text-white"
                            : "text-primary hover:bg-stone-100"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-12 text-center">
              <AnimatePresence mode="wait">
                {selectedThemeCategory === "elopement" ? (
                  <motion.p
                    key="elopement-desc"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="text-base md:text-lg text-primary max-w-3xl mx-auto leading-relaxed"
                  >
                    Intimate celebrations designed for couples seeking privacy,
                    meaning, and extraordinary settings.
                  </motion.p>
                ) : (
                  <motion.p
                    key="intimate-desc"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="text-base md:text-lg text-primary max-w-3xl mx-auto leading-relaxed"
                  >
                    Thoughtfully scaled celebrations curated for connection,
                    elegance, and refined hospitality.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Cards — Mobile slider / Desktop grid */}
            {isMobile ? (
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedThemeCategory}-${currentThemeSlide}`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <WeddingThemeCard
                      theme={currentThemes[currentThemeSlide]}
                      onClick={() =>
                        setSelectedThemeForModal(
                          currentThemes[currentThemeSlide],
                        )
                      }
                    />
                  </motion.div>
                </AnimatePresence>
                {currentThemes.length > 1 && (
                  <>
                    <button
                      onClick={prevThemeSlide}
                      className="absolute left-4 top-1/3 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white"
                    >
                      <ArrowLeft className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
                    </button>
                    <button
                      onClick={nextThemeSlide}
                      className="absolute right-4 top-1/3 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white"
                    >
                      <ArrowRight className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
                    </button>
                    <div className="flex justify-center gap-2 mt-4">
                      {currentThemes.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentThemeSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all hover:cursor-pointer ${
                            currentThemeSlide === index
                              ? "bg-primary w-8"
                              : "bg-stone-300"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {currentThemes.map((theme) => (
                  <WeddingThemeCard
                    key={theme.id}
                    theme={theme}
                    onClick={() => setSelectedThemeForModal(theme)}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* ── VENUES & SETTINGS ─────────────────────────────────────────── */}
      <motion.section
        id="venue-list-section"
        className="bg-primary py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05, margin: "0px 0px -80px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          {/* Section Header */}
          <motion.div
            variants={fadeInUp}
            className="mb-14 lg:mb-20 grid lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-5">
              <p className="text-white tracking-[0.25em] uppercase mb-3">
                Venues & Settings
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
                Curated
                <br />
                <span className="italic font-light">for Experience</span>
              </h2>
            </div>
            <div className="lg:col-span-7 flex items-end">
              <p className="text-white text-justify leading-relaxed">
                We curate venues not by popularity, but by their ability to hold
                emotion, beauty, and experience. Each space is selected for its
                architectural character, natural environment, privacy, and
                creative potential.
              </p>
            </div>
          </motion.div>

          {/* Wedding Experiences — 4-card stack */}
          <motion.div className="mb-16" variants={fadeInUp}>
            {/* Top row: 3 cards side-by-side on desktop */}
            <div className="hidden lg:grid grid-cols-3 gap-px mb-px bg-white/10">
              <Link
                href="/wedding-experiences/private-villa-weddings"
                className="group relative bg-primary overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/venues/banner/private-bg.png"
                    alt="Private Villa Weddings in Bali"
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  <div className="absolute top-5 left-5">
                    <span className="text-white/80 font-mono text-sm tracking-[0.3em]">
                      01
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl md:text-2xl font-semibold leading-tight mb-3">
                      Private Villa
                      <br />
                      <span className="italic font-light">Weddings</span>
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
                      Privacy, freedom of design, and an atmosphere that feels
                      personal rather than commercial.
                    </p>
                    <span className="inline-flex items-center gap-2 text-white text-sm tracking-widest border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                      EXPLORE <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>

              <Link
                href="/wedding-experiences/intimate-weddings"
                className="group relative bg-primary overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="https://placehold.net/default.svg"
                    alt="Intimate Weddings in Bali"
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  <div className="absolute top-5 left-5">
                    <span className="text-white/40 font-mono text-sm tracking-[0.3em]">
                      02
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl md:text-2xl font-semibold leading-tight mb-3">
                      Intimate
                      <br />
                      <span className="italic font-light">Weddings</span>
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
                      Space for connection, presence, and beauty without excess.
                      Quality over quantity.
                    </p>
                    <span className="inline-flex items-center gap-2 text-white text-sm tracking-widest border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                      EXPLORE <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>

              <Link
                href="/wedding-experiences/elopement-weddings"
                className="group relative bg-primary overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="https://placehold.net/default.svg"
                    alt="Elopement Weddings in Bali"
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  <div className="absolute top-5 left-5">
                    <span className="text-white/40 font-mono text-sm tracking-[0.3em]">
                      03
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl md:text-2xl font-semibold leading-tight mb-3">
                      Elopement
                      <br />
                      <span className="italic font-light">Weddings</span>
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
                      Not a smaller wedding — a deeper one. Emotionally rich,
                      visually poetic, entirely yours.
                    </p>
                    <span className="inline-flex items-center gap-2 text-white text-sm tracking-widest border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                      EXPLORE <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Mobile & Tablet: all cards full-width stacked */}
            <div className="flex flex-col gap-px lg:hidden mb-px">
              <Link
                href="/wedding-experiences/private-villa-weddings"
                className="group relative bg-primary overflow-hidden block"
              >
                <div className="relative aspect-[4/3] sm:aspect-[21/9] overflow-hidden">
                  <Image
                    src="/images/venues/banner/private-bg.png"
                    alt="Private Villa Weddings in Bali"
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  <div className="absolute top-5 left-5">
                    <span className="text-white/80 font-mono text-sm tracking-[0.3em]">
                      01
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="text-white text-xl md:text-2xl font-semibold leading-tight mb-3">
                      Private Villa
                      <br />
                      <span className="italic font-light">Weddings</span>
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-md">
                      Privacy, freedom of design, and an atmosphere that feels
                      personal rather than commercial.
                    </p>
                    <span className="inline-flex items-center gap-2 text-white text-sm tracking-widest border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                      EXPLORE <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>

              <Link
                href="/wedding-experiences/intimate-weddings"
                className="group relative bg-primary overflow-hidden block"
              >
                <div className="relative aspect-[4/3] sm:aspect-[21/9] overflow-hidden">
                  <Image
                    src="https://placehold.net/default.svg"
                    alt="Intimate Weddings in Bali"
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  <div className="absolute top-5 left-5">
                    <span className="text-white/40 font-mono text-sm tracking-[0.3em]">
                      02
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="text-white text-xl md:text-2xl font-semibold leading-tight mb-3">
                      Intimate
                      <br />
                      <span className="italic font-light">Weddings</span>
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-md">
                      Space for connection, presence, and beauty without excess.
                      Quality over quantity.
                    </p>
                    <span className="inline-flex items-center gap-2 text-white text-sm tracking-widest border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                      EXPLORE <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>

              <Link
                href="/wedding-experiences/elopement-weddings"
                className="group relative bg-primary overflow-hidden block"
              >
                <div className="relative aspect-[4/3] sm:aspect-[21/9] overflow-hidden">
                  <Image
                    src="https://placehold.net/default.svg"
                    alt="Elopement Weddings in Bali"
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  <div className="absolute top-5 left-5">
                    <span className="text-white/40 font-mono text-sm tracking-[0.3em]">
                      03
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="text-white text-xl md:text-2xl font-semibold leading-tight mb-3">
                      Elopement
                      <br />
                      <span className="italic font-light">Weddings</span>
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-md">
                      Not a smaller wedding — a deeper one. Emotionally rich,
                      visually poetic, entirely yours.
                    </p>
                    <span className="inline-flex items-center gap-2 text-white text-sm tracking-widest border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                      EXPLORE <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Bottom row: Luxury — full width */}
            <div className="mb-12">
              <Link
                href="/wedding-experiences/luxury-weddings"
                className="group relative bg-primary overflow-hidden block"
              >
                <div className="relative aspect-[4/3] sm:aspect-[21/9] overflow-hidden">
                  <Image
                    src="/images/venues/banner/signature-bg.png"
                    alt="Luxury Weddings in Bali"
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  <div className="absolute top-5 left-5">
                    <span className="text-white/40 font-mono text-sm tracking-[0.3em]">
                      04
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-semibold leading-tight mb-3">
                      Luxury
                      <br />
                      <span className="italic font-light">Weddings</span>
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-md">
                      Luxury is not about excess — it is about refinement, care,
                      and experience shaped by architecture and atmosphere.
                    </p>
                    <span className="inline-flex items-center gap-2 text-white text-sm tracking-widest border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                      EXPLORE <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* ── Filters ─────────────────────────────────────────────── */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-8 mb-4 flex-wrap"
            >
              {/* Experience Filter */}
              <div className="flex items-center gap-4">
                <span className="text-base md:text-lg text-white tracking-wider uppercase font-semibold">
                  EXPERIENCE
                </span>
                <div className="relative">
                  <button
                    onClick={() => setIsVenueDropdownOpen(!isVenueDropdownOpen)}
                    className="flex items-center gap-2 text-md text-white hover:text-white/80 transition-colors font-medium hover:cursor-pointer"
                  >
                    <span>{selectedVenueFilter}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isVenueDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isVenueDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-white border border-stone-200 shadow-lg z-10 min-w-[200px]">
                      {(
                        [
                          "Private Villa Weddings",
                          "Intimate Weddings",
                          "Elopement Weddings",
                          "Luxury Weddings",
                        ] as ExperienceFilter[]
                      ).map((v) => (
                        <button
                          key={v}
                          onClick={() => {
                            setSelectedVenueFilter(v);
                            setIsVenueDropdownOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 transition-colors hover:cursor-pointer ${
                            selectedVenueFilter === v
                              ? "bg-primary text-white"
                              : "text-primary hover:bg-stone-100"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Location Filter */}
              <div className="flex items-center gap-4">
                <span className="text-base md:text-lg text-white tracking-wider uppercase font-semibold">
                  LOCATION
                </span>
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsLocationDropdownOpen(!isLocationDropdownOpen)
                    }
                    className="flex items-center gap-2 text-md text-white hover:text-white/80 transition-colors font-medium hover:cursor-pointer"
                  >
                    <span>{selectedLocation}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isLocationDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isLocationDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-white border border-stone-200 shadow-lg z-10 min-w-[120px] max-h-[240px] overflow-y-auto">
                      {locations.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => {
                            setSelectedLocation(loc);
                            setIsLocationDropdownOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 transition-colors hover:cursor-pointer ${
                            selectedLocation === loc
                              ? "bg-primary text-white"
                              : "text-primary hover:bg-stone-100"
                          }`}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Currency Filter */}
              <div className="flex items-center gap-4">
                <span className="text-base md:text-lg text-white tracking-wider uppercase font-semibold">
                  CURRENCY
                </span>
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)
                    }
                    className="flex items-center gap-2 text-md text-white hover:text-white/80 transition-colors font-medium hover:cursor-pointer"
                  >
                    <span>{selectedCurrency}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isCurrencyDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isCurrencyDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-white border border-stone-200 shadow-lg z-10 min-w-[100px]">
                      {(["IDR", "USD"] as Currency[]).map((currency) => (
                        <button
                          key={currency}
                          onClick={() => {
                            setSelectedCurrency(currency);
                            setIsCurrencyDropdownOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 transition-colors hover:cursor-pointer ${
                            selectedCurrency === currency
                              ? "bg-primary text-white"
                              : "text-primary hover:bg-stone-100"
                          }`}
                        >
                          {currency}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-center text-sm text-white mb-12"
            >
              {selectedLocation === "All"
                ? `Showing ${visibleVenues.length} of ${totalVenuesCount} venues`
                : `Showing ${visibleVenues.length} of ${totalVenuesCount} venue${
                    totalVenuesCount !== 1 ? "s" : ""
                  } in ${selectedLocation}`}
            </motion.p>
          </motion.div>

          {/* Venue Cards */}
          <div id="venue-list-container" className="mb-24">
            <div className="mb-12 text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={selectedVenueFilter}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="text-base md:text-lg text-white max-w-3xl mx-auto leading-relaxed"
                >
                  {selectedVenueFilter === "Luxury Weddings" &&
                    "A curated selection of venues known for distinctive architecture, setting, and experience."}
                  {selectedVenueFilter === "Private Villa Weddings" &&
                    "Exclusive private estates offering intimacy, flexibility, and a deeply personal celebration experience."}
                  {selectedVenueFilter === "Elopement Weddings" &&
                    "Intimate settings designed for couples seeking privacy, meaning, and extraordinary surroundings."}
                  {selectedVenueFilter === "Intimate Weddings" &&
                    "Thoughtfully curated venues for scaled celebrations — connection, elegance, and refined hospitality."}
                </motion.p>
              </AnimatePresence>
            </div>

            {isMobile ? (
              <div className="relative">
                <AnimatePresence mode="wait">
                  {filteredVenues.length > 0 && (
                    <motion.div
                      key={currentVenueSlide}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <VenueCard
                        venue={filteredVenues[currentVenueSlide]}
                        selectedCurrency={selectedCurrency}
                        exchangeRate={exchangeRate}
                        onClick={() =>
                          setSelectedVenueForModal(
                            filteredVenues[currentVenueSlide],
                          )
                        }
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                {filteredVenues.length > 1 && (
                  <>
                    <button
                      onClick={prevVenueSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white"
                    >
                      <ArrowLeft className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
                    </button>
                    <button
                      onClick={nextVenueSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white"
                    >
                      <ArrowRight className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
                    </button>
                    <div className="flex justify-center gap-2 mt-4">
                      {filteredVenues.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentVenueSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all hover:cursor-pointer ${
                            currentVenueSlide === index
                              ? "bg-white w-8"
                              : "bg-stone-300"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  key={`${selectedVenueFilter}-${selectedLocation}`}
                >
                  {visibleVenues.map((venue) => (
                    <VenueCard
                      key={venue.id}
                      venue={venue}
                      selectedCurrency={selectedCurrency}
                      exchangeRate={exchangeRate}
                      onClick={() => setSelectedVenueForModal(venue)}
                    />
                  ))}
                </div>

                <div className="text-center mt-12">
                  {hasMoreVenues ? (
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="bg-transparent border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      VIEW MORE ({totalVenuesCount - visibleCount} MORE)
                    </button>
                  ) : (
                    totalVenuesCount > 6 && (
                      <button
                        onClick={() => setVisibleCount(6)}
                        className="bg-transparent border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer hover:bg-white/10 transition-colors"
                      >
                        VIEW LESS
                      </button>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </motion.section>

      {/* ── MODALS ────────────────────────────────────────────────────── */}
      {selectedVenueForModal && (
        <VenueDetailModal
          venue={selectedVenueForModal}
          onClose={() => setSelectedVenueForModal(null)}
          selectedCurrency={selectedCurrency}
          exchangeRate={exchangeRate}
        />
      )}
      {selectedThemeForModal && (
        <ThemeDetailModal
          theme={selectedThemeForModal}
          onClose={() => setSelectedThemeForModal(null)}
          onExploreVenue={handleExploreVenueFromTheme}
        />
      )}
      {/* <Gallery /> */}

      <Instagram />
      {/* ── KIND WORDS ────────────────────────────────────────────────── */}
      <motion.section
        className="py-20 lg:py-28 bg-primary/10"
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
                  <span className="italic font-light">share with us</span>
                </h2>
              </div>
              <div className="lg:col-span-7 flex items-end">
                <p className="text-primary leading-relaxed text-justify">
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
                    <span className="text-5xl text-primary/20 font-serif leading-none select-none">
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
                      {review.origin}
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
                  setReviewSlide((p) => Math.min(p + 1, reviews.length - 3))
                }
                disabled={reviewSlide >= reviews.length - 3}
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
