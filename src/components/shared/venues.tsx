"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  MapPin,
  Users,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Venues() {
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 venues initially
  const [isMobile, setIsMobile] = useState(false);

  const locations = ["All", "Uluwatu", "Ubud", "Sanur", "Canggu", "Seminyak"];

  const venues = [
    {
      id: 1,
      name: "Tanah Gajah Resort (Haliiprana)",
      city: "Ubud",
      province: "Bali",
      capacity: "150 pax",
      image: "/images/venue1.png",
    },
    {
      id: 2,
      name: "Maya Ubud Resort & Spa",
      city: "Ubud",
      province: "Bali",
      capacity: "200 pax",
      image: "/images/venue2.png",
    },
    {
      id: 3,
      name: "Griya Agung Ballroom",
      city: "Sanur",
      province: "Bali",
      capacity: "1000 pax",
      image: "/images/venue3.png",
    },
    {
      id: 4,
      name: "Tirtha Uluwatu",
      city: "Uluwatu",
      province: "Bali",
      capacity: "500 pax",
      image: "/images/venue4.png",
    },
    {
      id: 5,
      name: "Renaissance Bali Uluwatu Resort & Spa",
      city: "Uluwatu",
      province: "Bali",
      capacity: "300 pax",
      image: "/images/venue5.png",
    },
    {
      id: 6,
      name: "Villa The Palm House",
      city: "Canggu",
      province: "Bali",
      capacity: "1000 pax",
      image: "/images/venue6.png",
    },
    {
      id: 7,
      name: "Alila Villas Uluwatu",
      city: "Uluwatu",
      province: "Bali",
      capacity: "200 pax",
      image: "/images/venue1.png",
    },
    {
      id: 8,
      name: "The Mulia Resort",
      city: "Seminyak",
      province: "Bali",
      capacity: "800 pax",
      image: "/images/venue2.png",
    },
    {
      id: 9,
      name: "Four Seasons Resort Bali",
      city: "Ubud",
      province: "Bali",
      capacity: "120 pax",
      image: "/images/venue3.png",
    },
    {
      id: 10,
      name: "W Bali - Seminyak",
      city: "Seminyak",
      province: "Bali",
      capacity: "400 pax",
      image: "/images/venue4.png",
    },
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    checkIsMobile();

    // Add resize listener
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Filter venues based on selected location
  const filteredVenues = useMemo(() => {
    if (selectedLocation === "All") {
      return venues;
    }
    return venues.filter((venue) => venue.city === selectedLocation);
  }, [selectedLocation]);

  // Get venues to display based on visibleCount and mobile state
  const visibleVenues = useMemo(() => {
    // On mobile, always show all filtered venues
    if (isMobile) {
      return filteredVenues;
    }
    // On desktop, respect visibleCount
    return filteredVenues.slice(0, visibleCount);
  }, [filteredVenues, visibleCount, isMobile]);

  // Get count of venues for current filter
  const venueCount = filteredVenues.length;
  const hasMoreVenues = visibleCount < filteredVenues.length;

  // Reset slide when filter changes
  useEffect(() => {
    setCurrentSlide(0);
    setVisibleCount(6); // Reset visible count when filter changes
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

  return (
    <section id="venues" className="bg-white py-16 lg:py-24 relative">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-2xl text-primary tracking-wider italic font-semibold mb-4">
            VENUES
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold mb-12 max-w-4xl mx-auto leading-tight">
            Curated Bali Wedding Venues for Luxury, Intimate, and Private Villa
            Celebrations
          </h1>

          {/* Location Filter */}
          <div className="flex items-center justify-center gap-4 mb-4">
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
          </div>

          {/* Venue Count Display */}
          <p className="text-md text-primary">
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
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-12">
          {visibleVenues.map((venue) => (
            <div
              key={venue.id}
              className="relative group overflow-hidden aspect-[4/5] cursor-pointer"
            >
              <Image
                src={venue.image}
                alt={venue.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="33vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-semibold mb-2 leading-tight max-w-[160px]">
                  {venue.name}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-md">
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

                  <button className="text-white hover:text-white/90 hover:cursor-pointer transition-colors border-b border-white pb-1 text-sm font-light tracking-wider">
                    View Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        {visibleVenues.length > 0 && (
          <div className="lg:hidden mb-12">
            <div className="relative">
              {/* Single Venue Display */}
              <div className="relative group overflow-hidden aspect-[4/5] cursor-pointer">
                <Image
                  src={visibleVenues[currentSlide].image}
                  alt={visibleVenues[currentSlide].name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="100vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2 leading-tight">
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

                  <button className="text-white hover:text-white/90 hover:cursor-pointer transition-colors border-b border-white pb-1 text-sm font-light tracking-wider">
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
          </div>
        )}

        {/* No venues found message */}
        {filteredVenues.length === 0 && (
          <div className="text-center py-12 mb-12">
            <p className="text-lg text-primary mb-4">
              No venues found in {selectedLocation}
            </p>
            <button
              onClick={() => setSelectedLocation("All")}
              className="text-primary hover:text-primary/80 transition-colors underline"
            >
              View all venues
            </button>
          </div>
        )}

        {/* View More Button - Desktop only, when there are more venues to load */}
        {!isMobile && hasMoreVenues && (
          <div className="text-center mb-24">
            <button
              onClick={handleViewMore}
              className="bg-primary border border-primary text-white font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer hover:bg-primary/90 transition-colors"
            >
              VIEW MORE ({filteredVenues.length - visibleCount} MORE)
            </button>
          </div>
        )}

        {/* View Less Button - Desktop only, when all venues are displayed and there are more than 6 */}
        {!isMobile && !hasMoreVenues && filteredVenues.length > 6 && (
          <div className="text-center mb-24">
            <button
              onClick={() => setVisibleCount(6)}
              className="bg-transparent border border-primary text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer hover:bg-primary hover:text-white transition-colors"
            >
              VIEW LESS
            </button>
          </div>
        )}
      </div>

      {/* Two Image Layout - Full width edge to edge */}
      <div className="absolute left-0 right-0 w-full">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="flex">
            {/* Left Image - Wedding rings and hands (840px) */}
            <div className="relative h-[428px] w-[840px] overflow-hidden flex-shrink-0">
              <Image
                src="/images/banner-venues1.png"
                alt="Wedding rings and hands with bouquet"
                fill
                className="object-cover"
                sizes="840px"
              />
            </div>

            {/* Right Image - Floral arrangement (fills remaining space to edge) */}
            <div className="relative h-[428px] flex-1 overflow-hidden">
              <Image
                src="/images/banner-venues2.png"
                alt="Beautiful floral arrangement"
                fill
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
              src="/images/banner-venues1.png"
              alt="Wedding rings and hands with bouquet"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </div>

      {/* Spacer to maintain layout flow */}
      <div className="h-[428px]"></div>
    </section>
  );
}
