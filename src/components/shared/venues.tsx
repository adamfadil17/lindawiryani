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
import VenueDetailModal from "./venue-detail-modal";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion";
import { locations, venues } from "@/lib/text-src";

// Helper function untuk convert nama venue ke slug
const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

// Currency types
type Currency = "IDR" | "USD";

// Currency converter hook dengan cache 1 jam
const useCurrencyConverter = () => {
  const [exchangeRate, setExchangeRate] = useState<number>(15800); // Default rate IDR to USD
  const [lastFetch, setLastFetch] = useState<number>(0);
  const CACHE_DURATION = 60 * 60 * 1000; // 1 jam dalam milidetik

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const now = Date.now();

      // Check if we have cached data in localStorage
      const cachedRate = localStorage.getItem("exchangeRate");
      const cachedTime = localStorage.getItem("exchangeRateTime");

      if (cachedRate && cachedTime) {
        const timeDiff = now - parseInt(cachedTime);
        if (timeDiff < CACHE_DURATION) {
          setExchangeRate(parseFloat(cachedRate));
          setLastFetch(parseInt(cachedTime));
          return;
        }
      }

      // Fetch new rate if cache expired or doesn't exist
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();
        const rate = data.rates.IDR;

        setExchangeRate(rate);
        setLastFetch(now);

        // Save to localStorage
        localStorage.setItem("exchangeRate", rate.toString());
        localStorage.setItem("exchangeRateTime", now.toString());
      } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
        // Keep using the default or cached rate
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

  // Convert to USD if needed
  if (currency === "USD") {
    finalPrice = price / rate;
  }

  // Format based on currency
  if (currency === "USD") {
    return finalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export default function Venues() {
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("IDR");
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<(typeof venues)[0] | null>(
    null
  );
  const [hasInteracted, setHasInteracted] = useState(false);

  const exchangeRate = useCurrencyConverter();

  // Effect untuk membaca URL hash dan membuka modal
  useEffect(() => {
    const scrollToVenues = () => {
      const venuesSection = document.getElementById("venues");
      if (venuesSection) {
        venuesSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash.includes("#venues?venue=")) {
        const urlParams = new URLSearchParams(hash.split("?")[1]);
        const venueSlug = urlParams.get("venue");

        if (venueSlug) {
          scrollToVenues();

          setTimeout(() => {
            const venue = venues.find((v) => createSlug(v.name) === venueSlug);

            if (venue) {
              setSelectedVenue(venue);
            } else {
              console.warn("Venue not found:", venueSlug);
            }
          }, 500);
        }
      } else if (hash === "#venues") {
        scrollToVenues();
        setSelectedVenue(null);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
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
    if (selectedLocation === "All") {
      return venues;
    }
    return venues.filter((venue) => venue.city === selectedLocation);
  }, [selectedLocation]);

  const visibleVenues = useMemo(() => {
    if (isMobile) {
      return filteredVenues;
    }
    return filteredVenues.slice(0, visibleCount);
  }, [filteredVenues, visibleCount, isMobile]);

  const venueCount = filteredVenues.length;
  const hasMoreVenues = visibleCount < filteredVenues.length;

  useEffect(() => {
    setCurrentSlide(0);
    setVisibleCount(6);
    if (selectedLocation !== "All") {
      setHasInteracted(true);
    }
  }, [selectedLocation]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % visibleVenues.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + visibleVenues.length) % visibleVenues.length
    );
  };

  const handleViewMore = () => {
    const newVisibleCount = visibleCount + 6;
    setVisibleCount(newVisibleCount);
  };

  const handleOpenVenueDetail = (venue: (typeof venues)[0]) => {
    const slug = createSlug(venue.name);
    window.location.hash = `venues?venue=${slug}`;
    setSelectedVenue(venue);
  };

  const handleCloseVenueDetail = () => {
    window.location.hash = "venues";
    setSelectedVenue(null);
  };

  // Props untuk VenueDetailModal
  const venueDetailProps = {
    venue: selectedVenue,
    onClose: handleCloseVenueDetail,
    selectedCurrency,
    exchangeRate,
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      <section id="venues" className="bg-white py-16 lg:py-24 relative">
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          {/* Header Section */}
          <motion.header
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={staggerContainer}
          >
            {/* Category Label */}
            <motion.p
              variants={fadeInUp}
              className="text-2xl text-primary tracking-wider italic font-semibold mb-4"
            >
              VENUES
            </motion.p>

            {/* H1 - Main Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold mb-12 max-w-4xl mx-auto leading-tight"
            >
              CURATED BALI WEDDING VENUES FOR LUXURY, INTIMATE, AND PRIVATE
              VILLA CELEBRATIONS
            </motion.h1>

            {/* Location and Currency Filters */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-8 mb-4 flex-wrap"
            >
              {/* Location Filter */}
              <div className="flex items-center gap-4">
                <span className="text-lg md:text-lg text-primary tracking-wider uppercase font-semibold">
                  Location
                </span>
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsLocationDropdownOpen(!isLocationDropdownOpen)
                    }
                    className="flex items-center gap-2 text-base md:text-lg text-primary hover:text-primary/80 transition-colors hover:cursor-pointer font-medium"
                    aria-label="Select location"
                    aria-expanded={isLocationDropdownOpen}
                  >
                    {selectedLocation}
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
                          {location}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Currency Filter */}
              <div className="flex items-center gap-4">
                <span className="text-lg md:text-lg text-primary tracking-wider uppercase font-semibold">
                  Currency
                </span>
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)
                    }
                    className="flex items-center gap-2 text-base md:text-lg text-primary hover:text-primary/80 transition-colors hover:cursor-pointer font-medium"
                    aria-label="Select currency"
                    aria-expanded={isCurrencyDropdownOpen}
                  >
                    {selectedCurrency}
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
                          {currency}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Venue Count Display - Caption */}
            <motion.p
              variants={fadeInUp}
              className="text-sm md:text-sm text-primary"
            >
              {!isMobile
                ? selectedLocation === "All"
                  ? `Showing ${visibleVenues.length} of ${venueCount} venues`
                  : `Showing ${visibleVenues.length} of ${venueCount} venue${
                      venueCount !== 1 ? "s" : ""
                    } in ${selectedLocation}`
                : selectedLocation === "All"
                ? `${venueCount} venues available`
                : `${venueCount} venue${
                    venueCount !== 1 ? "s" : ""
                  } available in ${selectedLocation}`}
            </motion.p>
          </motion.header>

          {/* Desktop Grid */}
          <motion.div
            className="hidden lg:grid lg:grid-cols-3 gap-6 mb-12"
            key={selectedLocation}
            initial="hidden"
            animate="visible"
            variants={gridVariants}
          >
            {visibleVenues.map((venue) => (
              <motion.article
                key={venue.id}
                onClick={() => handleOpenVenueDetail(venue)}
                variants={cardVariants}
                className="relative group overflow-hidden aspect-[4/5] cursor-pointer"
              >
                <Image
                  src={venue.image || "https://placehold.net/default.svg"}
                  alt={`${venue.name} - ${venue.slogan}`}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="33vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  {/* H2 - Venue Name */}
                  <h2 className="text-xl md:text-2xl font-semibold mb-1 leading-tight max-w-[280px]">
                    {venue.name}
                  </h2>

                  {/* Slogan */}
                  <p className="text-md font-light italic mb-4 text-white max-w-[280px]">
                    {venue.slogan}
                  </p>

                  {/* H3 - Pricing */}
                  <div className="flex items-center justify-start mb-4">
                    <div className="flex flex-col items-start">
                      <span className="text-sm text-white/80 italic mb-0.5">
                        Starts from
                      </span>
                      <div className="flex items-baseline gap-2">
                        {venue.price === 0 ? null : (
                          <span className="text-md font-medium">
                            {selectedCurrency}
                          </span>
                        )}
                        <h3 className="text-xl md:text-2xl font-normal text-white">
                          {formatPrice(
                            venue.price,
                            selectedCurrency,
                            exchangeRate
                          )}
                        </h3>
                        {venue.price === 0 ? null : (
                          <span className="text-sm text-white">nett</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Location & Capacity Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-md">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {venue.city}, {venue.province}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>{venue.capacity}</span>
                      </div>
                    </div>

                    {/* <button
                      onClick={() => handleOpenVenueDetail(venue)}
                      className="text-white hover:text-white/90 hover:cursor-pointer transition-colors border-b border-white pb-1 text-sm font-light tracking-wider"
                      aria-label={`View details for ${venue.name}`}
                    >
                      View Detail
                    </button> */}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Mobile Slider */}
          {visibleVenues.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLocation}
                className="lg:hidden mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <article className="relative">
                  <div
                    className="relative group overflow-hidden aspect-[4/5] cursor-pointer"
                    onClick={() =>
                      handleOpenVenueDetail(visibleVenues[currentSlide])
                    }
                  >
                    <Image
                      src={
                        visibleVenues[currentSlide].image ||
                        "https://placehold.net/default.svg"
                      }
                      alt={`${visibleVenues[currentSlide].name} - ${visibleVenues[currentSlide].slogan}`}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="100vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      {/* H2 - Venue Name */}
                      <h2 className="text-xl md:text-2xl font-semibold mb-1 leading-tight max-w-[280px]">
                        {visibleVenues[currentSlide].name}
                      </h2>

                      {/* Slogan */}
                      <p className="text-md font-light italic mb-4 text-white/90 max-w-[280px]">
                        {visibleVenues[currentSlide].slogan}
                      </p>

                      <div className="flex justify-start gap-8 items-start">
                        {/* H3 - Pricing */}
                        <div className="flex items-start justify-start flex-col mb-4">
                          <span className="text-sm italic text-white/80 mb-0.5">
                            Starts from
                          </span>
                          <div className="flex items-baseline gap-2">
                            {visibleVenues[currentSlide].price === 0 ? null : (
                              <span className="text-md text-white font-medium">
                                {selectedCurrency}
                              </span>
                            )}
                            <h3 className="text-xl md:text-2xl font-normal">
                              {formatPrice(
                                visibleVenues[currentSlide].price,
                                selectedCurrency,
                                exchangeRate
                              )}
                            </h3>
                            {visibleVenues[currentSlide].price === 0 ? null : (
                              <span className="text-sm text-white">nett</span>
                            )}
                          </div>
                        </div>

                        {/* Location & Capacity Info */}
                        <div className="flex flex-col gap-2 mb-4">
                          <div className="flex items-center gap-1.5 text-md">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {visibleVenues[currentSlide].city},{" "}
                              {visibleVenues[currentSlide].province}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-md">
                            <Users className="w-4 h-4" />
                            <span>{visibleVenues[currentSlide].capacity}</span>
                          </div>
                        </div>
                      </div>

                      {/* <button
                        onClick={() =>
                          handleOpenVenueDetail(visibleVenues[currentSlide])
                        }
                        className="text-white hover:text-white/90 hover:cursor-pointer transition-colors border-b border-white pb-1 text-xs font-light tracking-wider"
                        aria-label={`View details for ${visibleVenues[currentSlide].name}`}
                      >
                        View Detail
                      </button> */}
                    </div>
                  </div>

                  {visibleVenues.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary/70 hover:bg-primary/90 flex items-center justify-center transition-colors shadow-lg"
                        aria-label="Previous venue"
                      >
                        <ChevronLeft className="w-6 h-6 text-white" />
                      </button>

                      <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary/70 hover:bg-primary/90 flex items-center justify-center transition-colors shadow-lg"
                        aria-label="Next venue"
                      >
                        <ChevronRight className="w-6 h-6 text-white" />
                      </button>
                    </>
                  )}
                </article>

                {/* Slide Indicators - Caption */}
                {visibleVenues.length > 1 && (
                  <div
                    className="flex justify-center mt-6 space-x-2"
                    role="tablist"
                    aria-label="Venue slides"
                  >
                    {visibleVenues.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentSlide
                            ? "bg-primary"
                            : "bg-stone-300 hover:bg-stone-400"
                        }`}
                        role="tab"
                        aria-selected={index === currentSlide}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* No venues found message */}
          {filteredVenues.length === 0 && (
            <motion.div
              className="text-center py-12 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-base md:text-md text-primary mb-4">
                No venues found in {selectedLocation}
              </p>
              <button
                onClick={() => setSelectedLocation("All")}
                className="text-primary hover:text-primary/80 transition-colors underline hover:cursor-pointer text-sm"
              >
                View all venues
              </button>
            </motion.div>
          )}

          {/* View More Button */}
          {!isMobile && hasMoreVenues && (
            <motion.div
              className="text-center mb-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={handleViewMore}
                className="bg-primary border border-primary text-white font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer hover:bg-primary/90 transition-colors rounded"
              >
                VIEW MORE ({filteredVenues.length - visibleCount} MORE)
              </button>
            </motion.div>
          )}

          {/* View Less Button */}
          {!isMobile && !hasMoreVenues && filteredVenues.length > 6 && (
            <motion.div
              className="text-center mb-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setVisibleCount(6)}
                className="bg-transparent border border-primary text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer hover:bg-primary hover:text-white transition-colors"
              >
                VIEW LESS
              </button>
            </motion.div>
          )}
        </div>

        {/* Two Image Layout */}
        <motion.div
          className="absolute left-0 right-0 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeIn}
        >
          {/* Desktop Layout (xl and above - 1280px+) */}
          <div className="hidden xl:block">
            <div className="flex">
              <div className="relative h-[428px] w-[840px] overflow-hidden flex-shrink-0">
                <Image
                  src="/images/venues/banner/banner-venues1.png"
                  alt="Wedding rings and hands with bouquet"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="840px"
                />
              </div>

              <div className="relative h-[428px] flex-1 overflow-hidden">
                <Image
                  src="/images/venues/banner/banner-venues2.png"
                  alt="Beautiful floral arrangement"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(100vw - 840px)"
                />
              </div>
            </div>
          </div>

          {/* iPad Pro & Large Tablet Layout (lg to xl - 1024px to 1279px) */}
          <div className="hidden lg:block xl:hidden">
            <div className="flex">
              <div className="relative h-[400px] w-[50%] overflow-hidden flex-shrink-0">
                <Image
                  src="/images/venues/banner/banner-venues1.png"
                  alt="Wedding rings and hands with bouquet"
                  fill
                  loading="lazy"
                  className="object-cover object-center"
                  sizes="55vw"
                />
              </div>

              <div className="relative h-[400px] w-[50%] overflow-hidden flex-shrink-0">
                <Image
                  src="/images/venues/banner/banner-venues2.png"
                  alt="Beautiful floral arrangement"
                  fill
                  loading="lazy"
                  className="object-cover object-center"
                  sizes="45vw"
                />
              </div>
            </div>
          </div>

          {/* iPad/Tablet Layout (md to lg - 768px to 1023px) */}
          <div className="hidden md:block lg:hidden">
            <div className="flex">
              <div className="relative h-[340px] w-[50%] overflow-hidden flex-shrink-0">
                <Image
                  src="/images/venues/banner/banner-venues1.png"
                  alt="Wedding rings and hands with bouquet"
                  fill
                  loading="lazy"
                  className="object-cover object-center"
                  sizes="50vw"
                />
              </div>

              <div className="relative h-[340px] w-[50%] overflow-hidden flex-shrink-0">
                <Image
                  src="/images/venues/banner/banner-venues2.png"
                  alt="Beautiful floral arrangement"
                  fill
                  loading="lazy"
                  className="object-cover object-center"
                  sizes="50vw"
                />
              </div>
            </div>
          </div>

          {/* Mobile Layout (below md - below 768px) */}
          <div className="md:hidden">
            <div className="relative h-[300px] w-full overflow-hidden">
              <Image
                src="/images/venues/banner/banner-venues1.png"
                alt="Wedding rings and hands with bouquet"
                fill
                loading="lazy"
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
          </div>
        </motion.div>

        {/* Spacer - Responsive height */}
        <div className="h-[300px] md:h-[340px] lg:h-[400px] xl:h-[428px]"></div>
      </section>

      {/* {selectedVenue && (
        <VenueDetailModal
          venue={selectedVenue}
          onClose={handleCloseVenueDetail}
          selectedCurrency={selectedCurrency}
          exchangeRate={exchangeRate}
        />
      )} */}
    </>
  );
}
