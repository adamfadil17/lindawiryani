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
import { fadeIn, fadeInUp, scaleIn, staggerContainer } from "@/lib/motion";
import {
  cities,
  venues,
  Venue,
  elopementThemes,
  intimateThemes,
  elopementCategoryImages,
  intimateCategoryImages,
  WeddingTheme,
  conceptLayers,
  venueCurationConsiderations,
  stylingFocusAreas,
  editorialSources,
  locations,
  planningJourney,
} from "@/lib/data/wedding-concepts/wedding-concepts-data";
import VenueDetailModal from "@/components/shared/venue-detail-modal";
import ThemeDetailModal from "@/components/shared/theme-detail-modal";
import { Currency } from "@/lib/types/wedding-concepts/wedding-concepts-types";

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

export default function WeddingConceptsPage() {
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

    // Build sets of venueIds used in theme relations
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
      // Venues used in elopement themes
      list = list.filter((v) => elopementVenueIds.has(v.id));
    } else if (selectedVenueFilter === "Intimate Weddings") {
      // Venues used in intimate themes
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

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

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

  const handleBannerViewVenues = (filter: ExperienceFilter) => {
    setSelectedVenueFilter(filter);
    setTimeout(() => {
      document
        .getElementById("venue-list-container")
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
    <main className="relative overflow-hidden">
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-48">
        <div className="absolute inset-0">
          <Image
            src="https://placehold.net/default.svg"
            alt="Wedding Concepts — Curated Wedding Celebrations"
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
          {/* Breadcrumb */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-2 mb-12 mt-6"
          >
            <Link
              href="/wedding-concepts"
              className="text-white/80 text-sm tracking-widest uppercase hover:text-white transition-colors"
            >
              Wedding Concepts
            </Link>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-white tracking-[0.3em] uppercase mb-5"
          >
            Curated Wedding Celebrations
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-white font-semibold leading-tight max-w-4xl uppercase"
          >
            Wedding Concepts
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-white/80 max-w-xl leading-relaxed"
          >
            Thoughtfully designed to help couples explore possibilities, not
            packages.
          </motion.p>
        </motion.div>
      </section>

      {/* ── INTRO SPLIT ───────────────────────────────────────────────── */}
      <motion.section
        className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div variants={fadeInUp} className="lg:col-span-4 lg:pt-2">
            <div className="lg:sticky lg:top-32">
              <div className="w-16 h-px bg-primary/70 mb-6" />
              <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                A creative layer for how weddings are imagined.
              </h2>
            </div>
          </motion.div>

          <div className="lg:col-span-8 space-y-10">
            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed text-justify"
            >
              Our wedding concepts are designed to help couples explore
              possibilities, not packages. Each concept acts as a creative and
              strategic layer that supports how weddings are imagined, designed,
              and experienced.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed text-justify"
            >
              These concepts are not separate steps — they are interconnected.
              Venue curation shapes theme. Theme informs styling. Styling draws
              from editorial inspiration. Together, they form a cohesive design
              language that supports meaningful decision-making and refined
              execution.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="border-l-2 border-primary/50 pl-8 py-2"
            >
              <p className="text-primary font-semibold tracking-widest uppercase mb-5">
                How Concepts Support Your Planning Journey
              </p>
              <div className="space-y-3">
                {[
                  "Meaningful decision-making",
                  "Efficient planning",
                  "Refined execution",
                  "Emotionally resonant celebrations",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-3 h-px bg-primary/70 flex-shrink-0" />
                    <span className="text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById("venue-list-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="border border-primary text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary hover:text-white hover:cursor-pointer transition-colors duration-300"
              >
                EXPLORE VENUE LIST
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("wedding-themes-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-primary text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary/90 hover:cursor-pointer transition-colors duration-300"
              >
                EXPLORE THEMES
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── CONCEPT LAYERS ────────────────────────────────────────────── */}
      <motion.section
        className="bg-primary py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05, margin: "0px 0px -80px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <motion.div
            variants={fadeInUp}
            className="mb-14 lg:mb-20 grid lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-5">
              <p className="text-white tracking-[0.25em] uppercase mb-3">
                The Four Layers
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
                Wedding Concept Layers
              </h2>
            </div>
            <div className="lg:col-span-7 flex items-end">
              <p className="text-white text-justify leading-relaxed">
                Each concept layer supports how your celebration is imagined,
                designed, and experienced. Explore each layer to understand how
                they shape your wedding journey.
              </p>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-10 lg:gap-12">
            {conceptLayers.map((layer, i) => {
              const sectionIds = [
                "venue-curation-section",
                "wedding-themes-section",
                "styling-concepts-section",
                "editorial-inspiration-section",
              ];
              const targetId = sectionIds[i];
              return (
                <motion.div key={layer.href} variants={fadeInUp} custom={i}>
                  <button
                    onClick={() =>
                      document
                        .getElementById(targetId)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="group block text-left w-full hover:cursor-pointer"
                  >
                    <div className="relative h-[40vh] lg:h-[380px] overflow-hidden mb-5">
                      <Image
                        src={layer.image}
                        alt={layer.title}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                      <div className="absolute top-5 left-5">
                        <span className="text-white/60 font-mono text-sm tracking-widest">
                          {layer.number}
                        </span>
                      </div>
                      <div className="absolute top-5 right-5">
                        <span className="bg-white/90 text-primary text-sm tracking-widest px-3 py-1.5">
                          {layer.tag.toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute bottom-5 right-5 w-10 h-10 bg-white/20 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white">
                        <ArrowRight className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm tracking-[0.2em] uppercase mb-1">
                        {layer.subtitle}
                      </p>
                      <h3 className="text-white font-semibold text-xl group-hover:text-white/80 transition-colors">
                        {layer.title}
                      </h3>
                      <p className="text-white mt-2 leading-relaxed text-sm">
                        {layer.desc}
                      </p>
                      <div className="flex items-center gap-2 mt-4 text-white text-sm tracking-wider group-hover:text-white/80 transition-colors">
                        <span>EXPLORE</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ── VENUE CURATION DETAIL ─────────────────────────────────────── */}
      <motion.section
        id="venue-curation-section"
        className="py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <motion.div
              variants={scaleIn}
              className="lg:col-span-5 relative h-[55vh] lg:h-[600px] overflow-hidden"
            >
              <Image
                src="https://res.cloudinary.com/dzerxindp/image/upload/v1773156604/venue_curation2_sseeau.jpg"
                alt="Venue Curation"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute bottom-6 left-6 bg-white/90 px-6 py-4">
                <p className="text-primary text-sm tracking-widest uppercase mb-1">
                  Our Approach
                </p>
                <p className="text-primary font-semibold text-2xl">Curated</p>
                <p className="text-primary text-sm">Not a directory</p>
              </div>
            </motion.div>

            <div className="lg:col-span-7 space-y-10">
              <motion.div variants={fadeInUp}>
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  Concept Layer 01
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold">
                  Venue Curation
                </h2>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-primary leading-relaxed text-justify"
              >
                Venue curation is the foundation of every wedding we design.
                Rather than presenting an exhaustive directory, we provide a
                carefully selected overview of venues by area — typically one to
                five representative venues — to help couples understand location
                character, venue style, and indicative starting budgets.
              </motion.p>

              <motion.p
                variants={fadeInUp}
                className="text-primary leading-relaxed text-justify"
              >
                Our curated venue selections are not recommendations to choose
                from directly, but guidance tools that reflect the types of
                spaces we work with and the experiences they support.
              </motion.p>

              <motion.div variants={fadeInUp}>
                <p className="text-primary tracking-widest uppercase mb-5">
                  Our Venue Curation Process Considers
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {venueCurationConsiderations.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-3 h-px bg-primary/50 flex-shrink-0 mt-2.5" />
                      <span className="text-primary">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-primary italic leading-relaxed"
              >
                We believe the right venue does more than host a wedding — it
                shapes the entire experience.
              </motion.p>

              <motion.div variants={fadeInUp}>
                <button
                  onClick={() =>
                    document
                      .getElementById("venue-list-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="border border-primary text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary hover:text-white hover:cursor-pointer transition-colors duration-300"
                >
                  EXPLORE VENUE LIST BY DESTINATION
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── WEDDING THEMES ────────────────────────────────────────────── */}
      <motion.section
        id="wedding-themes-section"
        className="relative py-20 lg:py-28 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 bg-primary/15" />
        <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          {/* Header */}
          <motion.div variants={fadeInUp} className="mb-14 lg:mb-20">
            <p className="text-primary tracking-[0.25em] uppercase mb-3">
              Concept Layer 02
            </p>
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5">
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold leading-tight">
                  Wedding Themes
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
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentThemeSlide === index
                          ? "bg-primary w-8"
                          : "bg-stone-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                key={selectedThemeCategory}
                initial="hidden"
                animate="visible"
                variants={gridVariants}
              >
                {currentThemes.map((theme, index) => (
                  <motion.div
                    key={`${selectedThemeCategory}-${index}`}
                    variants={fadeInUp}
                  >
                    <WeddingThemeCard
                      theme={theme}
                      onClick={() => setSelectedThemeForModal(theme)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* ── STYLING CONCEPTS DETAIL ───────────────────────────────────── */}
      <motion.section
        id="styling-concepts-section"
        className="py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <motion.div variants={fadeInUp} className="lg:col-span-4 lg:pt-2">
              <div className="lg:sticky lg:top-32">
                <div className="w-16 h-px bg-primary/70 mb-6" />
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  Concept Layer 03
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                  Styling Concepts
                </h2>
                <p className="mt-6 text-primary leading-relaxed italic">
                  Styling is never about excess. It is about clarity and
                  harmony.
                </p>
                {/* <div className="mt-8">
                  <Link href="/wedding-concepts/styling-concepts">
                    <button className="border border-primary text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary hover:text-white hover:cursor-pointer transition-colors duration-300">
                      VIEW STYLING
                    </button>
                  </Link>
                </div> */}
              </div>
            </motion.div>

            <div className="lg:col-span-8 space-y-10">
              <motion.p
                variants={fadeInUp}
                className="text-primary leading-relaxed text-justify"
              >
                Styling concepts translate vision into physical form. This is
                where atmosphere becomes visible — through composition,
                materiality, texture, and restraint. Our styling concepts are
                born from a deep understanding of the venue, the couple's story,
                and the emotional arc of the entire celebration.
              </motion.p>

              <motion.div variants={fadeInUp}>
                <p className="text-primary font-semibold tracking-widest uppercase mb-6">
                  Our Styling Concepts Focus On
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {stylingFocusAreas.map((item, i) => (
                    <div
                      key={item}
                      className="flex items-center gap-4 p-4 border border-primary/40 bg-white/40"
                    >
                      <span className="text-primary font-mono mt-0.5 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-primary">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="border-l-2 border-primary/50 pl-8 py-2"
              >
                <p className="text-primary font-semibold tracking-widest uppercase mb-4">
                  Styling Supports
                </p>
                <div className="space-y-3">
                  {[
                    "Private Villa Weddings",
                    "Intimate Weddings",
                    "Elopement Weddings",
                    "Luxury Weddings",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-4">
                      <div className="w-3 h-px bg-primary flex-shrink-0" />
                      <span className="text-primary">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── EDITORIAL INSPIRATION ─────────────────────────────────────── */}
      <motion.section
        id="editorial-inspiration-section"
        className="relative py-20 lg:py-28 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 bg-primary/10" />
        <div className="absolute top-0 right-0 w-1/3 h-full hidden lg:block">
          <Image
            src="https://res.cloudinary.com/dzerxindp/image/upload/v1773156603/editorial_inspiration_j5twsn.jpg"
            alt="Editorial Inspiration"
            fill
            loading="lazy"
            className="object-cover"
            sizes="33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="max-w-3xl">
            <motion.div variants={fadeInUp} className="mb-10">
              <p className="text-primary tracking-[0.25em] uppercase mb-3">
                Concept Layer 04
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold leading-tight">
                Editorial Inspiration
              </h2>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed mb-10 text-justify"
            >
              Editorial inspiration is where storytelling begins. Rather than
              copying trends, we draw from a broader world of aesthetic
              references — bridging imagination and reality, guiding both
              creative direction and execution.
            </motion.p>

            <motion.div variants={fadeInUp} className="mb-10">
              <p className="text-primary italic mb-6">
                We draw inspiration from:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {editorialSources.map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 p-4 border border-primary/40 bg-white/40"
                  >
                    <span className="text-primary font-mono mt-0.5 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <p className="text-primary font-semibold tracking-widest uppercase mb-5">
                Editorial Inspiration Helps Couples
              </p>
              <div className="space-y-3">
                {[
                  "Visualize mood and pacing",
                  "Understand scale and restraint",
                  "See how design interacts with place",
                  "Align emotionally with their vision",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-3 h-px bg-primary/70 flex-shrink-0" />
                    <span className="text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link href="/portfolio">
                <button className="border border-primary text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary hover:text-white hover:cursor-pointer transition-colors duration-300">
                  VIEW PORTFOLIO
                </button>
              </Link>
              <Link href="/journal">
                <button className="bg-primary text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary/90 hover:cursor-pointer transition-colors duration-300">
                  READ THE JOURNAL
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── VENUES & SETTINGS ─────────────────────────────────────────── */}
      <motion.section
        id="venue-list-section"
        className="bg-primary/15 py-20 lg:py-28"
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
              <p className="text-primary tracking-[0.25em] uppercase mb-3">
                Venues & Settings
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold leading-tight">
                Curated for Experience
              </h2>
            </div>
            <div className="lg:col-span-7 flex items-end">
              <p className="text-primary text-justify leading-relaxed">
                We curate venues not by popularity, but by their ability to hold
                emotion, beauty, and experience. Each space is selected for its
                architectural character, natural environment, privacy, and
                creative potential.
              </p>
            </div>
          </motion.div>

          {/* Wedding Experiences — 4-card stack */}
          <motion.div className="mb-16" variants={fadeInUp}>
            {/* Top row: 3 cards side-by-side on desktop, full-width on tablet */}
            <div className="hidden lg:grid grid-cols-3 gap-px mb-px bg-white/10">
              {/* 01 Private Villa — desktop only 3-col */}
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

              {/* 02 Intimate — desktop only */}
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

              {/* 03 Elopement — desktop only */}
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

            {/* Mobile & Tablet (< lg): all 4 cards full-width stacked */}
            <div className="flex flex-col gap-px lg:hidden mb-px">
              {/* 01 Private Villa */}
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

              {/* 02 Intimate */}
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

              {/* 03 Elopement */}
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

            {/* Bottom row: 1 full-width card (all breakpoints) */}
            <div className="mb-12">
              {/* 04 Luxury */}
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
                <span className="text-base md:text-lg text-primary tracking-wider uppercase font-semibold">
                  EXPERIENCE
                </span>
                <div className="relative">
                  <button
                    onClick={() => setIsVenueDropdownOpen(!isVenueDropdownOpen)}
                    className="flex items-center gap-2 text-md text-primary hover:text-primary/80 transition-colors font-medium hover:cursor-pointer"
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
                <span className="text-base md:text-lg text-primary tracking-wider uppercase font-semibold">
                  LOCATION
                </span>
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsLocationDropdownOpen(!isLocationDropdownOpen)
                    }
                    className="flex items-center gap-2 text-md text-primary hover:text-primary/80  transition-colors font-medium hover:cursor-pointer"
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
                <span className="text-base md:text-lg text-primary tracking-wider uppercase font-semibold">
                  CURRENCY
                </span>
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)
                    }
                    className="flex items-center gap-2 text-md text-primary hover:text-primary/80 transition-colors font-medium hover:cursor-pointer"
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
              className="text-center text-sm text-primary mb-12"
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
            {/* Description based on filter */}
            <div className="mb-12 text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={selectedVenueFilter}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="text-base md:text-lg text-primary max-w-3xl mx-auto leading-relaxed"
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
                      className="bg-transparent border border-primary text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer hover:bg-primary hover:text-white transition-colors"
                    >
                      VIEW MORE ({totalVenuesCount - visibleCount} MORE)
                    </button>
                  ) : (
                    totalVenuesCount > 6 && (
                      <button
                        onClick={() => setVisibleCount(6)}
                        className="bg-transparent border border-primary text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer hover:bg-primary hover:text-white transition-colors"
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

      {/* ── FROM CONCEPT TO CELEBRATION ───────────────────────────────── */}
      <motion.section
        className="py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <motion.div variants={fadeInUp} className="lg:col-span-5">
              <p className="text-primary tracking-[0.25em] uppercase mb-3">
                From Concept to Celebration
              </p>
              <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                Every celebration
                <br />
                begins with
                <br />
                <span className="italic font-light">understanding.</span>
              </h2>
              <p className="mt-6 text-primary leading-relaxed italic">
                We guide you through each step with calm precision and artistry.
              </p>
            </motion.div>

            <div className="lg:col-span-7 space-y-10">
              <motion.div variants={fadeInUp}>
                <div className="space-y-4">
                  {planningJourney.map((item, i) => (
                    <div
                      key={item}
                      className="flex items-center gap-6 p-5 border border-primary/40 bg-white/40"
                    >
                      <span className="text-primary font-mono flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-primary">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link href="/approach">
                  <button className="border border-primary text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary hover:text-white hover:cursor-pointer transition-colors duration-300">
                    EXPLORE OUR APPROACH
                  </button>
                </Link>
                <Link href="/wedding-experiences">
                  <button className="bg-primary text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary/90 hover:cursor-pointer transition-colors duration-300">
                    VIEW WEDDING EXPERIENCES
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── CLOSING CTA ───────────────────────────────────────────────── */}
      <motion.section
        className="relative py-24 lg:py-36 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0">
          <Image
            src="https://placehold.net/default.svg"
            alt="Begin Your Wedding Concept Journey"
            fill
            loading="lazy"
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary/72" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 text-center">
          <motion.p
            variants={fadeInUp}
            className="text-white tracking-[0.25em] uppercase mb-4"
          >
            Begin Your Wedding Concept Journey
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-semibold leading-tight max-w-4xl mx-auto uppercase"
          >
            Your wedding should feel
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl italic font-light normal-case">
              aligned — not selected.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            We invite you to explore the concepts and venues above, or begin a
            conversation with us to shape a celebration that reflects your
            vision.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <Link href="https://wa.me/628113980998" target="_blank">
              <button className="bg-white text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/90 hover:cursor-pointer transition-colors duration-300">
                PLAN YOUR WEDDING
              </button>
            </Link>
            <Link href="/portfolio">
              <button className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/10 hover:cursor-pointer transition-colors duration-300">
                VIEW OUR PORTFOLIO
              </button>
            </Link>
          </motion.div>
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
    </main>
  );
}
