"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  X,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

type Currency = "IDR" | "USD";

interface Venue {
  id: number;
  name: string;
  city: string;
  province: string;
  capacity: string;
  price: number | undefined;
  image: string;
  images: string[];
  description: string;
}

interface VenueDetailModalProps {
  venue: Venue;
  onClose: () => void;
  selectedCurrency: Currency;
  exchangeRate: number;
}

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

export default function VenueDetailModal({
  venue,
  onClose,
  selectedCurrency: initialCurrency,
  exchangeRate,
}: VenueDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCurrency, setSelectedCurrency] =
    useState<Currency>(initialCurrency);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const totalImages = venue.images.length;
  const visibleThumbnails = 4;

  // Sync with parent currency when it changes
  useEffect(() => {
    setSelectedCurrency(initialCurrency);
  }, [initialCurrency]);

  // Reset image index ketika venue berubah
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [venue.id]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const getScrollPosition = (imageIndex: number) => {
    if (totalImages <= visibleThumbnails) {
      return 0;
    }

    if (imageIndex >= totalImages - visibleThumbnails) {
      return totalImages - visibleThumbnails;
    }

    return Math.max(0, imageIndex - 1);
  };

  const thumbnailScrollIndex = getScrollPosition(currentImageIndex);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const scrollThumbnailsRight = () => {
    const nextIndex = Math.min(currentImageIndex + 1, totalImages - 1);
    setCurrentImageIndex(nextIndex);
  };

  const scrollThumbnailsLeft = () => {
    const prevIndex = Math.max(currentImageIndex - 1, 0);
    setCurrentImageIndex(prevIndex);
  };

  const canScrollLeft = currentImageIndex > 0;
  const canScrollRight = currentImageIndex < totalImages - 1;

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 hover:cursor-pointer bg-white rounded-full transition-colors"
          aria-label="Close modal"
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
                src={
                  venue.images[currentImageIndex] ||
                  "https://placehold.net/default.svg"
                }
                alt={`${venue.name} - Image ${currentImageIndex + 1}`}
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Navigation Arrows for Main Image */}
              {totalImages > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center hover:cursor-pointer transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 text-primary" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center hover:cursor-pointer transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {totalImages > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {totalImages}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {totalImages > 1 && (
              <div className="flex flex-col gap-3 px-6 md:px-4">
                <div className="relative w-full">
                  <div
                    ref={thumbnailContainerRef}
                    className="w-full overflow-hidden"
                  >
                    <div
                      className="flex gap-2 transition-transform duration-300 ease-out"
                      style={{
                        transform: `translateX(calc(-${thumbnailScrollIndex} * (25% + 0.5rem)))`,
                      }}
                    >
                      {venue.images.map((img, index) => {
                        const isVisible =
                          index >= thumbnailScrollIndex &&
                          index < thumbnailScrollIndex + visibleThumbnails;

                        return (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className="relative rounded-lg overflow-hidden transition-all flex-shrink-0 w-[calc(25%-0.375rem)]"
                            style={{
                              aspectRatio: "1",
                            }}
                            aria-label={`View image ${index + 1}`}
                          >
                            <div
                              className={`w-full h-full relative transition-all ${
                                index === currentImageIndex
                                  ? "ring-2 ring-primary ring-offset-2"
                                  : "opacity-60 hover:opacity-100"
                              }`}
                            >
                              <Image
                                src={img || "https://placehold.net/default.svg"}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                loading="lazy"
                                className="object-cover hover:cursor-pointer"
                                sizes="25vw"
                              />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Thumbnail Navigation Arrows */}
                  {totalImages > visibleThumbnails && (
                    <>
                      <button
                        onClick={scrollThumbnailsLeft}
                        disabled={!canScrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-primary/80 hover:bg-primary disabled:bg-stone-300 disabled:cursor-not-allowed rounded-full flex items-center justify-center hover:cursor-pointer transition-all shadow-lg z-10"
                        aria-label="Scroll thumbnails left"
                      >
                        <ChevronLeft className="w-5 h-5 text-white" />
                      </button>

                      <button
                        onClick={scrollThumbnailsRight}
                        disabled={!canScrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-primary/80 hover:bg-primary disabled:bg-stone-300 disabled:cursor-not-allowed rounded-full flex items-center justify-center hover:cursor-pointer transition-all shadow-lg z-10"
                        aria-label="Scroll thumbnails right"
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Counter */}
                {totalImages > visibleThumbnails && (
                  <div className="text-center text-sm text-primary/60">
                    Showing {thumbnailScrollIndex + 1}-
                    {Math.min(
                      thumbnailScrollIndex + visibleThumbnails,
                      totalImages
                    )}{" "}
                    of {totalImages}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Side - Venue Details */}
          <div className="flex flex-col items-start gap-2 justify-start">
            {/* Header and Info Container */}
            <p className="text-sm text-primary tracking-widest italic font-semibold">
              VENUES
            </p>

            <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
              {venue.name}
            </h2>

            {/* Currency Dropdown in Modal */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-primary tracking-wider italic font-semibold">
                CURRENCY
              </span>
              <div className="relative">
                <button
                  onClick={() =>
                    setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)
                  }
                  className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors hover:cursor-pointer"
                >
                  {selectedCurrency}
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${
                      isCurrencyDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCurrencyDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-stone-200 shadow-lg z-10 min-w-[80px]">
                    {(["IDR", "USD"] as Currency[]).map((currency) => (
                      <button
                        key={currency}
                        onClick={() => {
                          setSelectedCurrency(currency);
                          setIsCurrencyDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-3 py-2 text-sm transition-colors hover:cursor-pointer ${
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

            {/* Venue Info */}
            <div className="flex justify-start gap-8 items-center">
              <div className="flex flex-col mb-8">
                <span className="text-lg text-primary italic">Starts from</span>
                <div className="flex items-center gap-2">
                  {venue.price === 0 ? null : (
                    <span className="text-base self-end text-primary">
                      {selectedCurrency}
                    </span>
                  )}
                  <div className="flex justify-center gap-1">
                    <span className="text-2xl font-medium text-primary">
                      {formatPrice(venue.price, selectedCurrency, exchangeRate)}
                    </span>
                    {venue.price === 0 ? null : (
                      <span className="text-sm text-primary self-center">
                        nett
                      </span>
                    )}
                  </div>
                </div>
              </div>
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
            </div>

            {/* Description */}
            <p className="text-base text-primary/80 text-justify leading-relaxed mb-8">
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
  );
}
