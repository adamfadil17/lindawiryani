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
import { Venue, cities } from "@/lib/wedding-concepts-data";

type Currency = "IDR" | "USD";

interface VenueDetailModalProps {
  venue: Venue;
  onClose: () => void;
  selectedCurrency: Currency;
  exchangeRate: number;
}

const formatPrice = (
  price: number | undefined,
  currency: Currency,
  rate: number,
) => {
  if (!price || price === 0) return "To Be Confirmed";

  let finalPrice = price;

  if (currency === "USD") {
    finalPrice = price / rate;
  }

  return finalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Komponen Loading Skeleton
const ImageLoadingSkeleton = () => (
  <div className="absolute inset-0 bg-stone-200 animate-pulse">
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>
  </div>
);

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
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [loadedThumbnails, setLoadedThumbnails] = useState<Set<number>>(
    new Set(),
  );
  const [mainImageError, setMainImageError] = useState(false);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const totalImages = venue.images.gallery.length;
  const visibleThumbnails = 4;

  const thumbnailItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setSelectedCurrency(initialCurrency);
  }, [initialCurrency]);

  useEffect(() => {
    setCurrentImageIndex(0);
    setMainImageLoaded(false);
    setMainImageError(false);
    setLoadedThumbnails(new Set());
  }, [venue.id]);

  useEffect(() => {
    // Reset loading state ketika image berubah
    setMainImageLoaded(false);
    setMainImageError(false);
  }, [currentImageIndex]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

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
    if (totalImages <= visibleThumbnails) return 0;

    const maxScrollIndex = totalImages - visibleThumbnails;

    return Math.min(
      Math.max(imageIndex - Math.floor(visibleThumbnails / 2), 0),
      maxScrollIndex,
    );
  };

  const thumbnailScrollIndex = getScrollPosition(currentImageIndex);
  const thumbnailWidth = thumbnailItemRef.current?.offsetWidth ?? 0;

  const gap = 8; // gap-2 = 0.5rem = 8px

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleMainImageLoad = () => {
    setMainImageLoaded(true);
    setMainImageError(false);
  };

  const handleMainImageError = () => {
    setMainImageLoaded(true);
    setMainImageError(true);
  };

  const handleThumbnailLoad = (index: number) => {
    setLoadedThumbnails((prev) => new Set(prev).add(index));
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="venue-modal-title"
    >
      <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 hover:cursor-pointer bg-white/80 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-primary" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8 overflow-y-auto">
          {/* Left Side - Image Carousel */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
              {/* Loading Skeleton */}
              {!mainImageLoaded && !mainImageError && <ImageLoadingSkeleton />}

              {/* Error State */}
              {mainImageError && (
                <div className="absolute inset-0 bg-stone-200 flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 bg-stone-300 rounded-full flex items-center justify-center">
                    <X className="w-8 h-8 text-stone-500" />
                  </div>
                  <p className="text-stone-500 text-sm">Failed to load image</p>
                </div>
              )}

              {/* Main Image */}
              <Image
                src={
                  venue.images.gallery[currentImageIndex] ||
                  "https://placehold.net/default.svg"
                }
                alt={`${venue.name} - Image ${currentImageIndex + 1}`}
                fill
                loading="lazy"
                className={`object-cover transition-opacity duration-300 ${
                  mainImageLoaded ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 768px) 100vw, 50vw"
                onLoad={handleMainImageLoad}
                onError={handleMainImageError}
              />

              {totalImages > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white flex items-center justify-center hover:cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-primary" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white flex items-center justify-center hover:cursor-pointer transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </button>
                </>
              )}

              {totalImages > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 text-sm">
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
                        transform: `translateX(-${
                          thumbnailScrollIndex * (thumbnailWidth + gap)
                        }px)`,
                      }}
                    >
                      {venue.images.gallery.map((img, index) => {
                        const isLoaded = loadedThumbnails.has(index);

                        return (
                          <button
                            key={index}
                            ref={index === 0 ? thumbnailItemRef : undefined}
                            onClick={() => setCurrentImageIndex(index)}
                            className="relative overflow-hidden transition-all flex-shrink-0 w-[calc(25%-0.375rem)]"
                            style={{ aspectRatio: "1" }}
                          >
                            {/* Thumbnail Loading Skeleton */}
                            {!isLoaded && (
                              <div className="absolute inset-0 bg-stone-200 animate-pulse">
                                <div className="w-full h-full flex items-center justify-center">
                                  <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                </div>
                              </div>
                            )}

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
                                className={`object-cover hover:cursor-pointer transition-opacity duration-300 ${
                                  isLoaded ? "opacity-100" : "opacity-0"
                                }`}
                                sizes="25vw"
                                onLoad={() => handleThumbnailLoad(index)}
                              />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={prevImage}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-primary/80 hover:bg-primary flex items-center justify-center hover:cursor-pointer transition-all shadow-lg z-10"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-primary/80 hover:bg-primary flex items-center justify-center hover:cursor-pointer transition-all shadow-lg z-10"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Venue Details */}
          <article className="flex flex-col items-start gap-3 justify-start">
            {/* Category Label & Venue Type */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-primary tracking-widest uppercase font-semibold">
                Venues
              </span>
              <div className="flex gap-2">
                {venue.categoryRelations?.category === "signature" && (
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Signature
                  </span>
                )}
                {venue.categoryRelations?.category === "private_villa" && (
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Private Villa
                  </span>
                )}
              </div>
            </div>

            {venue.categoryRelations?.category === "signature" ? (
              <span
                id="venue-modal-title"
                className="block text-3xl md:text-4xl text-primary font-semibold leading-tight"
              >
                {venue.name}
              </span>
            ) : (
              <span
                id="venue-modal-title"
                className="block text-3xl md:text-4xl text-primary font-semibold leading-tight"
              >
                {venue.slogan}
              </span>
            )}

            {venue.categoryRelations?.category === "signature" && (
              <span className="block text-lg md:text-xl text-primary font-light italic leading-snug -mt-1">
                {venue.slogan}
              </span>
            )}

            {/* Currency Dropdown */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-primary tracking-wider uppercase font-semibold">
                Currency
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

            {/* Venue Info Section */}
            <div className="flex justify-start gap-8 items-start mt-4 mb-6 w-full border-y border-stone-100 py-6">
              <div className="flex flex-col">
                <span className="text-sm text-primary italic mb-1">
                  Starts from
                </span>
                <div className="flex items-baseline gap-2">
                  {venue.startingPrice > 0 && (
                    <span className="text-md text-primary font-medium">
                      {selectedCurrency}
                    </span>
                  )}
                  <span className="text-2xl md:text-2xl font-medium text-primary">
                    {formatPrice(
                      venue.startingPrice,
                      selectedCurrency,
                      exchangeRate,
                    )}
                  </span>
                  {venue.startingPrice > 0 && (
                    <span className="text-sm text-primary">nett</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="block text-md text-primary">
                    {cities.find((c) => c.id === venue.location.cityId)?.name},{" "}
                    {venue.location.provinceId.charAt(0).toUpperCase() +
                      venue.location.provinceId.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-md text-primary">
                    {venue.capacity} Pax
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="https://wa.me/628113980998"
              target="_blank"
              className="w-full"
            >
              <button className="bg-primary hover:cursor-pointer text-white font-semibold px-8 py-4 text-sm tracking-widest hover:bg-primary/90 transition-colors w-full uppercase">
                PLAN YOUR DREAM
              </button>
            </Link>

            <p className="text-sm md:text-base text-primary text-justify leading-relaxed mb-6">
              {venue.description}
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
