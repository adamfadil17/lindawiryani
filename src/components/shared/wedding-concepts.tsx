"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  Users,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import {
  locations,
  weddingConceptVenues,
  VenueData,
} from "@/lib/wedding-concepts-data";
import {
  elopementThemes,
  intimateThemes,
  elopementCategoryImages,
  intimateCategoryImages,
  WeddingTheme,
} from "@/lib/wedding-concepts-data";
import VenueDetailModal from "./venue-detail-modal";
import ThemeDetailModal from "./theme-detail-modal";

type Currency = "IDR" | "USD";
type VenueFilter = "Signature Venues" | "Private Villas";

const useCurrencyConverter = () => {
  const [exchangeRate, setExchangeRate] = useState<number>(15800);
  const [lastFetch, setLastFetch] = useState<number>(0);
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
          setLastFetch(Number.parseInt(cachedTime));
          return;
        }
      }

      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();
        const rate = data.rates.IDR;

        setExchangeRate(rate);
        setLastFetch(now);

        sessionStorage.setItem("exchangeRate", rate.toString());
        sessionStorage.setItem("exchangeRateTime", now.toString());
      } catch (error) {
        console.error("[v0] Failed to fetch exchange rate:", error);
      }
    };

    fetchExchangeRate();
  }, []);

  return exchangeRate;
};

const formatPrice = (
  price: number | undefined,
  currency: Currency,
  rate: number
) => {
  if (!price) return "To Be Confirmed";

  let finalPrice = price;

  if (currency === "USD") {
    finalPrice = price / rate;
  }

  if (currency === "USD") {
    return finalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

interface VenueCardProps {
  venue: VenueData;
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
    <motion.article
      onClick={onClick}
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.3 },
        },
      }}
      className="relative group overflow-hidden aspect-[4/5] cursor-pointer"
    >
      <Image
        src={venue.images.hero || "https://placehold.net/default.svg"}
        alt={`${venue.name} - ${venue.slogan}`}
        fill
        loading="lazy"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="33vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-xl md:text-2xl font-semibold mb-1 leading-tight max-w-[280px]">
          {venue.name}
        </h3>

        <h3 className="text-md font-light italic mb-4 text-white max-w-[280px]">
          {venue.slogan}
        </h3>

        <div className="flex items-center justify-start mb-4">
          <div className="flex flex-col items-start">
            <span className="text-sm text-white/80 italic mb-0.5">
              Starts from
            </span>
            <div className="flex items-baseline gap-2">
              {venue.startingPrice === 0 ? null : (
                <span className="text-md font-medium">{selectedCurrency}</span>
              )}
              <span className="text-xl md:text-2xl font-normal text-white">
                {formatPrice(
                  venue.startingPrice,
                  selectedCurrency,
                  exchangeRate
                )}
              </span>
              {venue.startingPrice === 0 ? null : (
                <span className="text-sm text-white">nett</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-md">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <h3>
                {venue.city}, {venue.province}
              </h3>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>{venue.capacity} pax</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

interface CategoryCardProps {
  title: string;
  description: string;
  images: string[];
  onClick: () => void;
}

function CategoryCard({
  title,
  description,
  images,
  onClick,
}: CategoryCardProps) {
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
            alt={
              title === "Elopement Weddings"
                ? "Elopement Weddings in Bali"
                : "Intimate Weddings in Bali"
            }
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
          <h3 className="text-2xl md:text-3xl font-semibold mb-3">{title}</h3>

          <p className="text-md md:text-md text-white/90 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

interface ThemeCardProps {
  title: string;
  venue: string;
  image: string;
  onClick: () => void;
}

function ThemeCard({ title, venue, image, onClick }: ThemeCardProps) {
  return (
    <article
      className="relative overflow-hidden cursor-pointer group aspect-[16/9]"
      onClick={onClick}
    >
      <Image
        src={image || "https://placehold.net/default.svg"}
        alt={title}
        fill
        loading="lazy"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="33vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-xl md:text-2xl font-semibold leading-tight mb-2">
          {title}
        </h3>
        <p className="text-md text-white/90">{venue}</p>
      </div>
    </article>
  );
}

export default function WeddingConcepts() {
  const [selectedVenue, setSelectedVenue] =
    useState<VenueFilter>("Signature Venues");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("IDR");
  const [isVenueDropdownOpen, setIsVenueDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [selectedThemeCategory, setSelectedThemeCategory] = useState<
    "elopement" | "intimate"
  >("elopement");
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentThemeSlide, setCurrentThemeSlide] = useState(0);

  const [visibleCount, setVisibleCount] = useState(6);
  const [currentVenueSlide, setCurrentVenueSlide] = useState(0);

  const [selectedThemeForModal, setSelectedThemeForModal] =
    useState<WeddingTheme | null>(null);

  const [selectedVenueForModal, setSelectedVenueForModal] =
    useState<VenueData | null>(null);

  const exchangeRate = useCurrencyConverter();

  const handleExploreVenueFromTheme = (venue: any) => {
    setSelectedThemeForModal(null); // Tutup modal tema
    setTimeout(() => {
      setSelectedVenueForModal(venue); // Buka modal venue dengan sedikit delay agar transisi mulus
    }, 100);
  };

  useEffect(() => {
    const handleFilterEvent = (event: CustomEvent) => {
      const { type, value } = event.detail;

      if (type === "theme") {
        setSelectedThemeCategory(value as "elopement" | "intimate");
        setCurrentThemeSlide(0);
      } else if (type === "venue") {
        setSelectedVenue(value as VenueFilter);
        setCurrentVenueSlide(0);
        setVisibleCount(6);
      }
    };

    window.addEventListener(
      "weddingConceptsFilter",
      handleFilterEvent as EventListener
    );

    return () => {
      window.removeEventListener(
        "weddingConceptsFilter",
        handleFilterEvent as EventListener
      );
    };
  }, []);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const filteredVenues = useMemo(() => {
    let venues = weddingConceptVenues;

    // CHANGED: Now filtering by single 'category' field
    if (selectedVenue === "Signature Venues") {
      venues = venues.filter((venue) => venue.category === "signature");
    } else if (selectedVenue === "Private Villas") {
      venues = venues.filter((venue) => venue.category === "private_villa");
    }

    if (selectedLocation !== "All") {
      venues = venues.filter((venue) => venue.city === selectedLocation);
    }

    return venues;
  }, [selectedVenue, selectedLocation]);

  useEffect(() => {
    setCurrentVenueSlide(0);
    setVisibleCount(6);
  }, [selectedLocation, selectedVenue]);

  const visibleVenues = useMemo(() => {
    if (isMobile) {
      return filteredVenues;
    }
    return filteredVenues.slice(0, visibleCount);
  }, [filteredVenues, visibleCount, isMobile]);

  const totalVenuesCount = filteredVenues.length;
  const hasMoreVenues = visibleCount < totalVenuesCount;

  const currentThemes =
    selectedThemeCategory === "elopement" ? elopementThemes : intimateThemes;

  const nextThemeSlide = () => {
    setCurrentThemeSlide((prev) => (prev + 1) % currentThemes.length);
  };

  const prevThemeSlide = () => {
    setCurrentThemeSlide(
      (prev) => (prev - 1 + currentThemes.length) % currentThemes.length
    );
  };

  const nextVenueSlide = () => {
    setCurrentVenueSlide((prev) => (prev + 1) % filteredVenues.length);
  };

  const prevVenueSlide = () => {
    setCurrentVenueSlide(
      (prev) => (prev - 1 + filteredVenues.length) % filteredVenues.length
    );
  };

  const handleCategoryClick = (category: "elopement" | "intimate") => {
    setSelectedThemeCategory(category);
    setCurrentThemeSlide(0);

    setTimeout(() => {
      const themesSection = document.getElementById("wedding-themes-selector");
      if (themesSection) {
        themesSection.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, 100);
  };

  const handleThemeClick = (theme: WeddingTheme) => {
    setSelectedThemeForModal(theme);
  };

  // Fungsi baru untuk button View Venues di Banner
  const handleBannerViewVenues = (filter: VenueFilter) => {
    setSelectedVenue(filter);

    setTimeout(() => {
      const venueListSection = document.getElementById("venue-list-container");
      if (venueListSection) {
        venueListSection.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, 100);
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const handleVenueClick = (venue: VenueData) => {
    setSelectedVenueForModal(venue);
  };

  return (
    <section id="wedding-concepts" className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Hero Section */}
        <motion.header
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl text-primary tracking-wider italic font-semibold mb-4"
          >
            WEDDING CONCEPTS
          </motion.h2>

          <motion.h3
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold mb-12 max-w-4xl mx-auto leading-tight"
          >
            CURATED WEDDING CELEBRATIONS, THOUGHTFULLY DESIGNED
          </motion.h3>

          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg text-primary font-monomax-w-3xl mx-auto leading-relaxed"
          >
            Begin your journey by choosing a wedding concept that reflects your
            vision — or explore our curated venues to discover the setting that
            best complements your celebration.
          </motion.p>
        </motion.header>

        {/* Category Cards */}
        <motion.div
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center"
            variants={fadeInUp}
          >
            <CategoryCard
              title="Elopement Weddings"
              description={`Intimate celebrations designed for couples seeking privacy, meaning, and extraordinary settings.`}
              images={elopementCategoryImages}
              onClick={() => handleCategoryClick("elopement")}
            />
            <CategoryCard
              title="Intimate Weddings"
              description={`Thoughtfully scaled celebrations curated for connection, elegance, and refined hospitality.`}
              images={intimateCategoryImages}
              onClick={() => handleCategoryClick("intimate")}
            />
          </motion.div>
        </motion.div>

        {/* Wedding Themes Section */}
        <motion.div
          id="wedding-themes-selector"
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={staggerContainer}
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-12"
            variants={fadeInUp}
          >
            <span className="text-base md:text-lg text-primary tracking-widest uppercase font-semibold">
              WEDDING THEMES
            </span>
            <div className="relative">
              <button
                onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                className="flex items-center gap-2 text-md md:text-md text-primary hover:text-primary/80 transition-colors hover:cursor-pointer font-medium capitalize"
                aria-label="Select wedding theme"
                aria-expanded={isThemeDropdownOpen}
              >
                <h3>{selectedThemeCategory}</h3>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isThemeDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isThemeDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-stone-200 shadow-lg z-10 min-w-[150px]">
                  {(["elopement", "intimate"] as const).map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedThemeCategory(category);
                        setIsThemeDropdownOpen(false);
                        setCurrentThemeSlide(0);
                      }}
                      className={`block w-full text-left px-4 py-2 transition-colors hover:cursor-pointer capitalize ${
                        selectedThemeCategory === category
                          ? "bg-primary text-white"
                          : "text-primary hover:bg-stone-100"
                      }`}
                    >
                      <h3>{category}</h3>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Conditional Short Description based on selectedThemeCategory */}
          <div className="mb-12 text-center">
            <AnimatePresence mode="wait">
              {selectedThemeCategory === "elopement" ? (
                <motion.p
                  key="elopement-desc"
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="text-base md:text-lg text-primary font-monomax-w-3xl mx-auto leading-relaxed"
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
                  className="text-base md:text-lg text-primary font-monomax-w-3xl mx-auto leading-relaxed"
                >
                  Thoughtfully scaled celebrations curated for connection,
                  elegance, and refined hospitality.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

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
                  <ThemeCard
                    title={currentThemes[currentThemeSlide].title}
                    venue={currentThemes[currentThemeSlide].venue}
                    image={currentThemes[currentThemeSlide].image}
                    onClick={() =>
                      setSelectedThemeForModal(currentThemes[currentThemeSlide])
                    }
                  />
                </motion.div>
              </AnimatePresence>

              <button
                onClick={prevThemeSlide}
                className="absolute left-4 top-1/3 -translate-y-1/2 bg-primary/70 p-2 shadow-lg items-center hover:bg-primary/90 transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={nextThemeSlide}
                className="absolute right-4 top-1/3 -translate-y-1/2 bg-primary/70 p-2 shadow-lg items-center hover:bg-primary/90 transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6 text-white" />
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
                  <ThemeCard
                    title={theme.title}
                    venue={theme.venue}
                    image={theme.image}
                    onClick={() => handleThemeClick(theme)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Signature & Private Villa Headers */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={staggerContainer}
        >
          {/* Signature Wedding Concepts */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 mb-0"
            variants={fadeInUp}
          >
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px] overflow-hidden">
              <Image
                src="/images/venues/banner/signature-bg.png"
                alt="Signature Wedding Venues in Bali"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center px-6 py-10 lg:px-12 lg:py-16 bg-white">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary mb-4 lg:mb-6">
                Signature Wedding Venues
              </h3>
              <p className="text-base md:text-lg text-primary/70 leading-relaxed mb-6">
                A curated selection of venues known for distinctive
                architecture, setting, and experience.
              </p>
              <div className="flex">
                <button
                  onClick={() => handleBannerViewVenues("Signature Venues")}
                  className="text-primary hover:text-primary/80 transition-colors border-b border-primary pb-1 text-sm font-semibold tracking-wider hover:cursor-pointer"
                  aria-label="View Signature Venues"
                >
                  View Venues
                </button>
              </div>
            </div>
          </motion.div>

          {/* Private Villa Wedding Estates */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 mb-12"
            variants={fadeInUp}
          >
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px] overflow-hidden lg:order-2">
              <Image
                src="/images/venues/banner/private-bg.png"
                alt="Private Villa Weddings in Bali"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center px-6 py-10 lg:px-12 lg:py-16 bg-white lg:order-1">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary mb-4 lg:mb-6">
                Private Villa Weddings
              </h3>
              <p className="text-base md:text-lg text-primary/70 leading-relaxed mb-6">
                Exclusive private estates offering intimacy, flexibility, and a
                deeply personal celebration experience.
              </p>
              <div className="flex">
                <button
                  onClick={() => handleBannerViewVenues("Private Villas")}
                  className="text-primary hover:text-primary/80 transition-colors border-b border-primary pb-1 text-sm font-semibold tracking-wider hover:cursor-pointer"
                  aria-label="View Private Villa Venues"
                >
                  View Venues
                </button>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-8 mb-4 flex-wrap"
          >
            <div className="flex items-center gap-4">
              <span className="text-base md:text-lg text-primary tracking-wider uppercase font-semibold">
                VENUE
              </span>
              <div className="relative">
                <button
                  onClick={() => setIsVenueDropdownOpen(!isVenueDropdownOpen)}
                  className="flex items-center gap-2 text-md md:text-md text-primary hover:text-primary/80 transition-colors font-medium hover:cursor-pointer"
                >
                  <h3>{selectedVenue}</h3>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isVenueDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isVenueDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-stone-200 shadow-lg z-10 min-w-[150px]">
                    {(
                      ["Signature Venues", "Private Villas"] as VenueFilter[]
                    ).map((venue) => (
                      <button
                        key={venue}
                        onClick={() => {
                          setSelectedVenue(venue);
                          setIsVenueDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 transition-colors hover:cursor-pointer ${
                          selectedVenue === venue
                            ? "bg-primary text-white"
                            : "text-primary hover:bg-stone-100"
                        }`}
                      >
                        <h3>{venue}</h3>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-base md:text-lg text-primary tracking-wider uppercase font-semibold">
                LOCATION
              </span>
              <div className="relative">
                <button
                  onClick={() =>
                    setIsLocationDropdownOpen(!isLocationDropdownOpen)
                  }
                  className="flex items-center gap-2 text-md md:text-md text-primary hover:text-primary/80 transition-colors font-medium hover:cursor-pointer"
                >
                  <h3>{selectedLocation}</h3>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isLocationDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isLocationDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-stone-200 shadow-lg z-10 min-w-[120px]">
                    {locations.map((location) => (
                      <button
                        key={location}
                        onClick={() => {
                          setSelectedLocation(location);
                          setIsLocationDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 transition-colors hover:cursor-pointer ${
                          selectedLocation === location
                            ? "bg-primary text-white"
                            : "text-primary hover:bg-stone-100"
                        }`}
                      >
                        <h3>{location}</h3>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-base md:text-lg text-primary tracking-wider uppercase font-semibold">
                CURRENCY
              </span>
              <div className="relative">
                <button
                  onClick={() =>
                    setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)
                  }
                  className="flex items-center gap-2 text-md md:text-md text-primary hover:text-primary/80 transition-colors font-medium hover:cursor-pointer"
                >
                  <h3>{selectedCurrency}</h3>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isCurrencyDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCurrencyDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-stone-200 shadow-lg z-10 min-w-[100px]">
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
                        <h3>{currency}</h3>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-center text-sm md:text-sm text-primary/70 mb-12"
          >
            {selectedLocation === "All"
              ? `Showing ${visibleVenues.length} of ${totalVenuesCount} venues`
              : `Showing ${visibleVenues.length} of ${totalVenuesCount} venue${
                  totalVenuesCount !== 1 ? "s" : ""
                } in ${selectedLocation}`}
          </motion.p>
        </motion.div>

        {/* Venue Cards Container */}
        <div id="venue-list-container" className="mb-24">
          {/* Conditional Short Description based on selectedVenue filter */}
          <div className="mb-12 text-center">
            <AnimatePresence mode="wait">
              {selectedVenue === "Signature Venues" ? (
                <motion.p
                  key="signature-desc"
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="text-base md:text-lg text-primary font-monomax-w-3xl mx-auto leading-relaxed"
                >
                  A curated selection of venues known for distinctive
                  architecture, setting, and experience.
                </motion.p>
              ) : (
                <motion.p
                  key="private-villa-desc"
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="text-base md:text-lg text-primary font-monomax-w-3xl mx-auto leading-relaxed"
                >
                  Exclusive private estates offering intimacy, flexibility, and
                  a deeply personal celebration experience.
                </motion.p>
              )}
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
                        handleVenueClick(filteredVenues[currentVenueSlide])
                      }
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {filteredVenues.length > 1 && (
                <>
                  <button
                    onClick={prevVenueSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary/70 p-2 shadow-lg items-center hover:bg-primary/90 transition-colors z-10 hover:cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>

                  <button
                    onClick={nextVenueSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary/70 p-2 shadow-lg items-center hover:bg-primary/90 transition-colors z-10 hover:cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
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
                key={`${selectedVenue}-${selectedLocation}`}
              >
                {visibleVenues.map((venue) => (
                  <VenueCard
                    key={venue.id}
                    venue={venue}
                    selectedCurrency={selectedCurrency}
                    exchangeRate={exchangeRate}
                    onClick={() => handleVenueClick(venue)}
                  />
                ))}
              </div>

              <div className="text-center mt-12">
                {hasMoreVenues ? (
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="bg-primary border border-primary text-white font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer hover:bg-primary/90 transition-colors rounded"
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
          onExploreVenue={handleExploreVenueFromTheme} // Pass fungsi baru
        />
      )}
    </section>
  );
}
