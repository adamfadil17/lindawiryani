"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import type { Venue, WeddingTheme } from "@/types";

interface ThemeDetailModalProps {
  theme: WeddingTheme;
  onClose: () => void;
  onExploreVenue: (venue: Venue) => void;
}

function TipTapContent({ html }: { html: string }) {
  return (
    <div
      className="tiptap-content text-primary"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

const ImageLoadingSkeleton = () => (
  <div className="absolute inset-0 bg-stone-200 animate-pulse">
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>
  </div>
);

export default function ThemeDetailModal({
  theme,
  onClose,
  onExploreVenue,
}: ThemeDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const galleryImages = theme.gallery ?? [];
  const totalImages = galleryImages.length;

  const relatedVenue = theme.venue as Venue | undefined | null;
  const venueName = relatedVenue?.name ?? "Venue To Be Confirmed";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    setCurrentImageIndex(0);
    setImageLoaded(false);
    setImageError(false);
  }, [theme.id]);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [currentImageIndex]);

  const nextImage = () => {
    if (totalImages > 1)
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    if (totalImages > 1)
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const currentImageUrl =
    totalImages > 0
      ? (galleryImages[currentImageIndex].url ??
        "https://placehold.net/default.svg")
      : (theme.image ?? "https://placehold.net/default.svg");

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-30 p-2 hover:cursor-pointer bg-white/80 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-primary" />
        </button>

        <div className="overflow-y-auto p-4 md:p-8">
          <div className="flex flex-col gap-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100">
              {!imageLoaded && !imageError && <ImageLoadingSkeleton />}

              {imageError && (
                <div className="absolute inset-0 bg-stone-200 flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 bg-stone-300 rounded-full flex items-center justify-center">
                    <X className="w-8 h-8 text-stone-500" />
                  </div>
                  <p className="text-stone-500 text-sm">Failed to load image</p>
                </div>
              )}

              <Image
                src={currentImageUrl}
                alt={`${theme.title} - Image ${currentImageIndex + 1}`}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                priority
                sizes="(max-width: 1024px) 100vw, 80vw"
                onLoad={() => {
                  setImageLoaded(true);
                  setImageError(false);
                }}
                onError={() => {
                  setImageLoaded(true);
                  setImageError(true);
                }}
              />

              {totalImages > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white flex items-center justify-center transition-colors hover:cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 text-primary" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white flex items-center justify-center transition-colors hover:cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </button>
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 text-xs">
                    {currentImageIndex + 1} / {totalImages}
                  </div>
                </>
              )}
            </div>

            <article className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stone-100 pb-8">
                <div className="flex-1">
                  <span className="text-xs text-primary tracking-widest uppercase font-semibold mb-2 block">
                    Wedding Theme
                  </span>
                  <span className="block text-3xl md:text-4xl text-primary font-semibold leading-tight mb-2">
                    {theme.title}
                  </span>

                  {relatedVenue ? (
                    <button
                      onClick={() => {
                        onExploreVenue(relatedVenue);
                        onClose();
                      }}
                      className="flex items-center gap-2 text-primary italic hover:text-primary/80 hover:cursor-pointer group"
                    >
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="text-md">{venueName}</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-primary/60 italic">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="text-md">{venueName}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  {relatedVenue && (
                    <button
                      onClick={() => {
                        onExploreVenue(relatedVenue);
                        onClose();
                      }}
                      className="bg-white border border-primary text-primary font-semibold px-6 py-4 text-sm tracking-widest hover:bg-stone-50 transition-colors uppercase hover:cursor-pointer"
                    >
                      Explore Venue
                    </button>
                  )}
                  <Link
                    href="https://wa.me/628113980998"
                    target="_blank"
                    className="flex-1"
                  >
                    <button className="bg-primary text-white font-semibold px-10 py-4 text-sm tracking-widest hover:bg-primary/90 transition-colors w-full uppercase hover:cursor-pointer">
                      PLAN YOUR DREAM
                    </button>
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <span className="block text-sm text-primary tracking-widest uppercase font-bold">
                  The Experience
                </span>
                <TipTapContent html={theme.description} />
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}