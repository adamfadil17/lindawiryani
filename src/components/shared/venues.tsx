"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { MapPin, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Venues() {
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
  ];

  // Filter venues based on selected location
  const filteredVenues = useMemo(() => {
    if (selectedLocation === "All") {
      return venues;
    }
    return venues.filter((venue) => venue.city === selectedLocation);
  }, [selectedLocation]);

  // Get count of venues for current filter
  const venueCount = filteredVenues.length;

  return (
    <section id="venues" className="bg-white py-16 lg:py-24 relative">
      {/* Decorative Floral Element */}
      {/* <div className="absolute top-16 left-60 w-32 h-32">
        <Image
          src="/images/floral4.svg"
          alt="Decorative floral branch"
          width={128}
          height={128}
          className="object-contain"
        />
      </div> */}
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-2xl text-primary tracking-wider italic font-semibold mb-4">
            VENUES
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold mb-12 max-w-4xl mx-auto leading-tight">
            Elegant Spaces for Timeless Vows
          </h1>

          {/* Location Filter */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-xl text-primary tracking-wider italic font-semibold">
              LOCATION
            </span>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-lg text-primary hover:text-stone-600 transition-colors hover:cursor-pointer"
              >
                {selectedLocation}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-stone-200 rounded shadow-lg z-10 min-w-[120px]">
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
            {selectedLocation === "All"
              ? `Showing all ${venueCount} venues`
              : `Showing ${venueCount} venue${
                  venueCount !== 1 ? "s" : ""
                } in ${selectedLocation}`}
          </p>
        </div>

        {/* Venues Grid */}
        {filteredVenues.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredVenues.map((venue) => (
              <div
                key={venue.id}
                className="relative group overflow-hidden rounded-lg aspect-[4/5] cursor-pointer"
              >
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
        ) : (
          <div className="text-center py-12 mb-12">
            <p className="text-lg text-primary mb-4">
              No venues found in {selectedLocation}
            </p>
            <button
              onClick={() => setSelectedLocation("All")}
              className="text-primary hover:text-stone-600 transition-colors underline"
            >
              View all venues
            </button>
          </div>
        )}

        {/* View More Button */}
        <div className="text-center mb-24">
          <button className="bg-primary border border-primary text-white px-8 py-3 text-sm tracking-widest hover:cursor-pointer">
            View More
          </button>
        </div>
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
