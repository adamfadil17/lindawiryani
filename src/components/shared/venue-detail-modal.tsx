"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { X, MapPin, Users, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Venue {
  id: number;
  name: string;
  city: string;
  province: string;
  capacity: string;
  image: string;
  images: string[];
  description: string;
}

interface VenueDetailModalProps {
  venue: Venue;
  onClose: () => void;
}

export default function VenueDetailModal({
  venue,
  onClose,
}: VenueDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [thumbnailScrollIndex, setThumbnailScrollIndex] = useState(0);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % venue.images.length;
    setCurrentImageIndex(newIndex);
    if (newIndex >= thumbnailScrollIndex + 4) {
      setThumbnailScrollIndex(newIndex - 3);
    } else if (newIndex < thumbnailScrollIndex) {
      setThumbnailScrollIndex(newIndex);
    }
  };

  const prevImage = () => {
    const newIndex =
      (currentImageIndex - 1 + venue.images.length) % venue.images.length;
    setCurrentImageIndex(newIndex);
    if (newIndex < thumbnailScrollIndex) {
      setThumbnailScrollIndex(newIndex);
    } else if (newIndex >= thumbnailScrollIndex + 4) {
      setThumbnailScrollIndex(newIndex - 3);
    }
  };

  const scrollThumbnailsRight = () => {
    const nextIndex = Math.min(
      thumbnailScrollIndex + 1,
      Math.max(0, venue.images.length - 4)
    );
    setThumbnailScrollIndex(nextIndex);
    setCurrentImageIndex(nextIndex);
  };

  const scrollThumbnailsLeft = () => {
    const prevIndex = Math.max(thumbnailScrollIndex - 1, 0);
    setThumbnailScrollIndex(prevIndex);
    setCurrentImageIndex(prevIndex);
  };

  const canScrollLeft = thumbnailScrollIndex > 0;
  const canScrollRight =
    thumbnailScrollIndex < Math.max(0, venue.images.length - 4);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 hover:cursor-pointer bg-white rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-primary" />
        </button>

        {/* Modal Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8 overflow-y-auto">
          {/* Left Side - Image Carousel */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
              <Image
                src={venue.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${venue.name} - Image ${currentImageIndex + 1}`}
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Image Counter */}
              {venue.images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {venue.images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {venue.images.length > 1 && (
              <div className="flex flex-col gap-3">
                <div className="relative w-full">
                  <div
                    ref={thumbnailContainerRef}
                    className="w-full overflow-hidden"
                  >
                    <div
                      className="flex gap-2 transition-transform duration-300"
                      style={{
                        transform: `translateX(-${
                          thumbnailScrollIndex * (100 / 4)
                        }%)`,
                        width: "100%",
                      }}
                    >
                      {venue.images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentImageIndex(index);
                            if (index >= thumbnailScrollIndex + 4) {
                              setThumbnailScrollIndex(index - 3);
                            } else if (index < thumbnailScrollIndex) {
                              setThumbnailScrollIndex(index);
                            }
                          }}
                          className={`relative rounded-lg overflow-hidden transition-all flex-shrink-0`}
                          style={{
                            width: "calc(25% - 6px)",
                            aspectRatio: "1",
                          }}
                        >
                          <div
                            className={`w-full h-full relative ${
                              index === currentImageIndex
                                ? "ring-2 ring-primary"
                                : "opacity-60 hover:opacity-100"
                            }`}
                          >
                            <Image
                              src={img || "/placeholder.svg"}
                              alt={`Thumbnail ${index + 1}`}
                              fill
                              className="object-cover hover cursor-pointer"
                              sizes="25vw"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={scrollThumbnailsLeft}
                    disabled={!canScrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary/70 hover:bg-primary/90 disabled:bg-stone-300 disabled:cursor-not-allowed rounded-full flex items-center justify-center hover:cursor-pointer transition-colors z-10"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>

                  <button
                    onClick={scrollThumbnailsRight}
                    disabled={!canScrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary/70 hover:bg-primary/90 disabled:bg-stone-300 disabled:cursor-not-allowed rounded-full flex items-center justify-center hover:cursor-pointer transition-colors z-10"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Thumbnail Counter */}
                <div className="text-center text-sm text-primary/60">
                  {Math.min(thumbnailScrollIndex + 4, venue.images.length)} of{" "}
                  {venue.images.length}
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Venue Details */}
          <div className="flex flex-col gap-8">
            {/* Header and Info Container */}
            <div>
              <p className="text-sm text-primary tracking-widest italic font-semibold mb-2">
                VENUES
              </p>
              <h2 className="text-3xl md:text-4xl text-primary font-semibold mb-6 leading-tight">
                {venue.name}
              </h2>

              {/* Venue Info */}
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-lg text-primary">
                    {venue.city}, {venue.province}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-lg text-primary">{venue.capacity}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-base text-primary/80 leading-relaxed mb-8">
                {venue.description}
              </p>

              {/* CTA Button */}
              <Link href="https://wa.me/628113980998" target="_blank">
                <button
                  onClick={onClose}
                  className="bg-primary hover:cursor-pointer text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary/90 transition-colors w-full md:w-auto"
                >
                  PLAN YOUR DREAM
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
