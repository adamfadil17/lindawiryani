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

export default function Venues() {
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<(typeof venues)[0] | null>(
    null
  );
  const [hasInteracted, setHasInteracted] = useState(false);

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
    // Mark that user has interacted with filters
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

  // Grid variants for filtering animation
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
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeInUp}
              className="text-2xl text-primary tracking-wider italic font-semibold mb-4"
            >
              VENUES
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold mb-12 max-w-4xl mx-auto leading-tight"
            >
              Curated Bali Wedding Venues for Luxury, Intimate, and Private
              Villa Celebrations
            </motion.h1>

            {/* Location Filter */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-4 mb-4"
            >
              <span className="text-xl text-primary tracking-wider italic font-semibold">
                LOCATION
              </span>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-lg text-primary hover:text-primary/80 transition-colors hover:cursor-pointer"
                >
                  {selectedLocation}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-stone-200 shadow-lg z-10 min-w-[120px]">
                    {locations.map((location) => (
                      <button
                        key={location}
                        onClick={() => {
                          setSelectedLocation(location);
                          setIsDropdownOpen(false);
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
            </motion.div>

            {/* Venue Count Display */}
            <motion.p variants={fadeInUp} className="text-md text-primary">
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
          </motion.div>

          {/* Desktop Grid - Updated to always show without viewport trigger after interaction */}
          <motion.div
            className="hidden lg:grid lg:grid-cols-3 gap-6 mb-12"
            key={selectedLocation} // Force re-render on location change
            initial="hidden"
            animate="visible" // Changed from whileInView to animate
            variants={gridVariants}
          >
            {visibleVenues.map((venue) => (
              <motion.div
                key={venue.id}
                variants={cardVariants}
                className="relative group overflow-hidden aspect-[4/5] cursor-pointer"
              >
                <Image
                  src={venue.image || "https://placehold.net/default.svg"}
                  alt={venue.name}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="33vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2 leading-tight max-w-[240px]">
                    {venue.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-base">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {venue.city}, {venue.province}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{venue.capacity}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedVenue(venue)}
                      className="text-white hover:text-white/90 hover:cursor-pointer transition-colors border-b border-white pb-1 text-sm font-light tracking-wider"
                    >
                      View Detail
                    </button>
                  </div>
                </div>
              </motion.div>
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
                <div className="relative">
                  {/* Single Venue Display */}
                  <div className="relative group overflow-hidden aspect-[4/5] cursor-pointer">
                    <Image
                      src={
                        visibleVenues[currentSlide].image ||
                        "https://placehold.net/default.svg"
                      }
                      alt={visibleVenues[currentSlide].name}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="100vw"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-semibold mb-2 leading-tight max-w-[240px]">
                        {visibleVenues[currentSlide].name}
                      </h3>

                      <div className="flex flex-col gap-2 mb-4">
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {visibleVenues[currentSlide].city},{" "}
                            {visibleVenues[currentSlide].province}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="w-4 h-4" />
                          <span>{visibleVenues[currentSlide].capacity}</span>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          setSelectedVenue(visibleVenues[currentSlide])
                        }
                        className="text-white hover:text-white/90 hover:cursor-pointer transition-colors border-b border-white pb-1 text-sm font-light tracking-wider"
                      >
                        View Detail
                      </button>
                    </div>
                  </div>

                  {/* Navigation Arrows - Only show if more than 1 venue */}
                  {visibleVenues.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary/70 hover:bg-primary/90 rounded-full flex items-center justify-center transition-colors shadow-lg"
                      >
                        <ChevronLeft className="w-6 h-6 text-white" />
                      </button>

                      <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary/70 hover:bg-primary/90 rounded-full flex items-center justify-center transition-colors shadow-lg"
                      >
                        <ChevronRight className="w-6 h-6 text-white" />
                      </button>
                    </>
                  )}
                </div>

                {/* Slide Indicators - Only show if more than 1 venue */}
                {visibleVenues.length > 1 && (
                  <div className="flex justify-center mt-6 space-x-2">
                    {visibleVenues.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentSlide
                            ? "bg-primary"
                            : "bg-stone-300 hover:bg-stone-400"
                        }`}
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
              <p className="text-lg text-primary mb-4">
                No venues found in {selectedLocation}
              </p>
              <button
                onClick={() => setSelectedLocation("All")}
                className="text-primary hover:text-primary/80 transition-colors underline"
              >
                View all venues
              </button>
            </motion.div>
          )}

          {/* View More Button - Desktop only, when there are more venues to load */}
          {!isMobile && hasMoreVenues && (
            <motion.div
              className="text-center mb-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={handleViewMore}
                className="bg-primary border border-primary text-white font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer hover:bg-primary/90 transition-colors"
              >
                VIEW MORE ({filteredVenues.length - visibleCount} MORE)
              </button>
            </motion.div>
          )}

          {/* View Less Button - Desktop only, when all venues are displayed and there are more than 6 */}
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

        {/* Two Image Layout - Full width edge to edge */}
        <motion.div
          className="absolute left-0 right-0 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeIn}
        >
          {/* Desktop Layout */}
          <div className="hidden md:block">
            <div className="flex">
              {/* Left Image - Wedding rings and hands (840px) */}
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

              {/* Right Image - Floral arrangement (fills remaining space to edge) */}
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

          {/* Mobile Layout - Stacked full width */}
          <div className="md:hidden">
            {/* Left Image - Full width on mobile */}
            <div className="relative h-[428px] w-full overflow-hidden">
              <Image
                src="/images/venues/banner/banner-venues1.png"
                alt="Wedding rings and hands with bouquet"
                fill
                loading="lazy"
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
        </motion.div>

        {/* Spacer to maintain layout flow */}
        <div className="h-[428px]"></div>
      </section>

      {selectedVenue && (
        <VenueDetailModal
          venue={selectedVenue}
          onClose={() => setSelectedVenue(null)}
        />
      )}
    </>
  );
}
