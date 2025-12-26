"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Check,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { WeddingTheme } from "@/lib/wedding-themes-data";
import { weddingConceptVenues } from "@/lib/wedding-concepts-data";

interface ThemeDetailModalProps {
  theme: WeddingTheme;
  onClose: () => void;
  onExploreVenue: (venue: any) => void;
}

export default function ThemeDetailModal({
  theme,
  onClose,
  onExploreVenue,
}: ThemeDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImages = theme.gallery?.length || 0;
  const relatedVenue = weddingConceptVenues.find(
    (v) => v.name === theme.venueName
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Reset index saat theme berubah
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [theme.title]);

  const nextImage = () => {
    if (totalImages > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }
  };

  const prevImage = () => {
    if (totalImages > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

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
              <Image
                src={
                  theme.gallery[currentImageIndex] ||
                  "https://placehold.net/default.svg"
                }
                alt={`${theme.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 80vw"
              />

              {/* Navigasi hanya muncul jika gambar lebih dari satu */}
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

                  {/* Indicator jumlah gambar */}
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
                  <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight mb-2">
                    {theme.title}
                  </h2>

                  <button
                    onClick={() => relatedVenue && onExploreVenue(relatedVenue)}
                    className="flex items-center gap-2 text-primary italic hover:text-primary/80 hover:cursor-pointer group"
                  >
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="text-md">{theme.venueName}</span>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  {/* Secondary CTA: Explore Venue */}
                  {relatedVenue && (
                    <button
                      onClick={() => onExploreVenue(relatedVenue)}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                <div className="flex flex-col gap-4">
                  <h3 className="text-sm text-primary tracking-widest uppercase font-bold">
                    The Experience
                  </h3>
                  <p className="text-sm md:text-base text-primary text-justify leading-relaxed italic">
                    "{theme.description}"
                  </p>
                </div>

                <div className="bg-stone-50 p-6 md:p-8">
                  <h3 className="text-sm text-primary tracking-widest uppercase font-bold mb-6">
                    Curated Wedding Inclusions
                  </h3>
                  <ul className="grid grid-cols-1 gap-4">
                    {theme.inclusions?.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-primary/80 leading-snug"
                      >
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
