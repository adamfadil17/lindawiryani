"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Venues() {
  const [selectedLocation, setSelectedLocation] = useState("Uluwatu");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const locations = ["Uluwatu", "Ubud", "Sanur", "Canggu", "Seminyak"];

  const venues = [
    {
      id: 1,
      name: "Tanah Gajah Resort (Haliiprana)",
      location: "Ubud, Bali",
      capacity: "150 pax",
      image: "/images/venue1.png",
    },
    {
      id: 2,
      name: "Maya Ubud Resort & Spa",
      location: "Ubud, Bali",
      capacity: "200 pax",
      image: "/images/venue2.png",
    },
    {
      id: 3,
      name: "Griya Agung Ballroom",
      location: "Sanur, Bali",
      capacity: "1000 pax",
      image: "/images/venue3.png",
    },
    {
      id: 4,
      name: "Tirtha Uluwatu",
      location: "Uluwatu, Bali",
      capacity: "500 pax",
      image: "/images/venue4.png",
    },
    {
      id: 5,
      name: "Renaissance Bali Uluwatu Resort & Spa",
      location: "Uluwatu, Bali",
      capacity: "300 pax",
      image: "/images/venue5.png",
    },
    {
      id: 6,
      name: "Villa The Palm House",
      location: "Canggu, Bali",
      capacity: "1000 pax",
      image: "/images/venue6.png",
    },
  ];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-stone-500 text-sm tracking-[0.2em] uppercase mb-4">
            VENUES
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-stone-700 leading-tight mb-12">
            Elegant Spaces for Timeless Vows
          </h1>

          {/* Location Filter */}
          <div className="flex items-center justify-center gap-4">
            <span className="text-stone-500 text-sm tracking-[0.2em] uppercase">
              LOCATION
            </span>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors"
              >
                {selectedLocation}
                <ChevronDown className="w-4 h-4" />
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
                      className="block w-full text-left px-4 py-2 text-stone-600 hover:bg-stone-50 transition-colors"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Venues Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="relative group overflow-hidden rounded-lg aspect-[4/5] cursor-pointer"
            >
              <Image
                src={venue.image || "/placeholder.svg"}
                alt={venue.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-light mb-2 leading-tight max-w-[160px]">
                  {venue.name}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{venue.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{venue.capacity}</span>
                    </div>
                  </div>

                  <button className="text-white hover:text-white/80 transition-colors border-b border-white pb-1 text-sm font-light tracking-wider">
                    View Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Button
            variant="outline"
            className="border-stone-400 text-stone-700 hover:bg-stone-200 px-8 py-3 tracking-wider"
          >
            View More
          </Button>
        </div>
      </div>
    </section>
  );
}
