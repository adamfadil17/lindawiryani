"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  MapPin,
  Users,
  ChevronDown,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import {
  cities,
  venues,
  Venue,
  elopementThemes,
  intimateThemes,
  locations,
  venueCurationConsiderations,
} from "@/lib/data/wedding-concepts/wedding-concepts-data";
import VenueDetailModal from "@/components/shared/venue-detail-modal";
import { Currency } from "@/lib/types/wedding-concepts/wedding-concepts-types";

type ExperienceFilter =
  | "Private Villa Weddings"
  | "Intimate Weddings"
  | "Elopement Weddings"
  | "Luxury Weddings";

const formatPrice = (
  price: number | undefined,
  currency: Currency,
  rate: number,
) => {
  if (!price) return "To Be Confirmed";
  const finalPrice = currency === "USD" ? price / rate : price;
  if (currency === "USD") {
    return finalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// ─── VenueCard ────────────────────────────────────────────────────────────────

interface VenueCardProps {
  venue: Venue;
  selectedCurrency: Currency;
  exchangeRate: number;
  onClick: () => void;
}

function VenueCard({
  venue,
  selectedCurrency,
  exchangeRate,
  onClick,
}: VenueCardProps) {
  return (
    <article
      onClick={onClick}
      className="relative group overflow-hidden aspect-[4/5] cursor-pointer"
    >
      <Image
        src={venue.images.hero || "https://placehold.net/default.svg"}
        alt={`${venue.name} - ${venue.slogan}`}
        fill
        quality={85}
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-xl md:text-2xl font-semibold mb-1 leading-tight max-w-[200px]">
          {venue.name}
        </h3>
        <p className="text-md font-light italic mb-4 text-white max-w-[280px]">
          {venue.slogan}
        </p>
        <div className="flex items-center justify-start mb-4">
          <div className="flex flex-col items-start">
            <span className="text-sm text-white/80 italic mb-0.5">
              Starts from
            </span>
            <div className="flex items-baseline gap-2">
              {venue.startingPrice !== 0 && (
                <span className="text-md font-medium">{selectedCurrency}</span>
              )}
              <span className="text-xl md:text-2xl font-normal text-white">
                {formatPrice(
                  venue.startingPrice,
                  selectedCurrency,
                  exchangeRate,
                )}
              </span>
              {venue.startingPrice !== 0 && (
                <span className="text-sm text-white">nett</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-md">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span>
              {cities.find((city) => city.id === venue.location.cityId)?.name},{" "}
              {venue.location.provinceId.charAt(0).toUpperCase() +
                venue.location.provinceId.slice(1)}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{venue.capacity} pax</span>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── NoVenuesFound ────────────────────────────────────────────────────────────

function NoVenuesFound({
  selectedLocation,
  selectedVenueFilter,
  onReset,
}: {
  selectedLocation: string;
  selectedVenueFilter: ExperienceFilter;
  onReset: () => void;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="mb-6 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <MapPin className="w-7 h-7 text-primary/80" />
      </div>
      <p className="text-primary text-lg italic font-light mb-2">
        No venues found for the selected location.
      </p>
      <p className="text-primary/80 text-sm mb-8 max-w-sm">
        There are currently no{" "}
        <span className="font-medium">{selectedVenueFilter}</span> venues
        available in{" "}
        <span className="font-medium">{selectedLocation}</span>. Try selecting a
        different location or experience.
      </p>
    </motion.div>
  );
}

// ─── VenuesSection ────────────────────────────────────────────────────────────

interface VenuesSectionProps {
  isMobile: boolean;
  selectedCurrency: Currency;
  exchangeRate: number;
  onVenueSelect: (venue: Venue) => void;
  externalSelectedVenue?: Venue | null;
  onExternalModalClose?: () => void;
}

export default function VenuesSection({
  isMobile,
  selectedCurrency,
  exchangeRate,
  onVenueSelect,
  externalSelectedVenue,
  onExternalModalClose,
}: VenuesSectionProps) {
  const [selectedVenueFilter, setSelectedVenueFilter] =
    useState<ExperienceFilter>("Luxury Weddings");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCurrencyLocal, setSelectedCurrencyLocal] =
    useState<Currency>(selectedCurrency);
  const [isVenueDropdownOpen, setIsVenueDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const [visibleCount, setVisibleCount] = useState(6);
  const [currentVenueSlide, setCurrentVenueSlide] = useState(0);

  const [selectedVenueForModal, setSelectedVenueForModal] =
    useState<Venue | null>(null);

  // Sync external selected venue (e.g. from theme modal)
  useEffect(() => {
    if (externalSelectedVenue) {
      setSelectedVenueForModal(externalSelectedVenue);
    }
  }, [externalSelectedVenue]);

  useEffect(() => {
    setCurrentVenueSlide(0);
    setVisibleCount(6);
  }, [selectedLocation, selectedVenueFilter]);

  const filteredVenues = useMemo(() => {
    let list = venues;

    const elopementVenueIds = new Set(
      elopementThemes.map((t) => t.venueId).filter(Boolean),
    );
    const intimateVenueIds = new Set(
      intimateThemes.map((t) => t.venueId).filter(Boolean),
    );

    if (selectedVenueFilter === "Luxury Weddings") {
      list = list.filter((v) => v.categoryRelations?.category === "luxury");
    } else if (selectedVenueFilter === "Private Villa Weddings") {
      list = list.filter(
        (v) => v.categoryRelations?.category === "private_villa",
      );
    } else if (selectedVenueFilter === "Elopement Weddings") {
      list = list.filter((v) => elopementVenueIds.has(v.id));
    } else if (selectedVenueFilter === "Intimate Weddings") {
      list = list.filter((v) => intimateVenueIds.has(v.id));
    }

    if (selectedLocation !== "All") {
      list = list.filter((v) => {
        const city = cities.find((c) => c.id === v.location.cityId);
        return city?.name === selectedLocation;
      });
    }
    return list;
  }, [selectedVenueFilter, selectedLocation]);

  const visibleVenues = useMemo(
    () => (isMobile ? filteredVenues : filteredVenues.slice(0, visibleCount)),
    [filteredVenues, visibleCount, isMobile],
  );
  const totalVenuesCount = filteredVenues.length;
  const hasMoreVenues = visibleCount < totalVenuesCount;

  const nextVenueSlide = () =>
    setCurrentVenueSlide((p) => (p + 1) % filteredVenues.length);
  const prevVenueSlide = () =>
    setCurrentVenueSlide(
      (p) => (p - 1 + filteredVenues.length) % filteredVenues.length,
    );

  const handleModalClose = () => {
    setSelectedVenueForModal(null);
    onExternalModalClose?.();
  };

  return (
    <>
      <motion.section
        id="venue-list-section"
        className="bg-primary/15 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05, margin: "0px 0px -80px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          {/* Section Header */}
          <motion.div
            variants={fadeInUp}
            className="mb-14 lg:mb-20 grid lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-5">
              <p className="text-primary tracking-[0.25em] uppercase mb-3">
                Venues & Settings
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold leading-tight">
                Curated for Experience
              </h2>
            </div>
            <div className="lg:col-span-7 flex items-end">
              <p className="text-primary/80 text-justify leading-relaxed">
                We curate venues not by popularity, but by their ability to hold
                emotion, beauty, and experience. Each space is selected for its
                architectural character, natural environment, privacy, and
                creative potential.
              </p>
            </div>
          </motion.div>

          {/* Wedding Experiences — 4-card stack */}
          <motion.div className="mb-16" variants={fadeInUp}>
            {/* Top row: 3 cards side-by-side on desktop */}
            <div className="hidden lg:grid grid-cols-3 gap-px mb-px bg-white/10">
              <Link
                href="/wedding-experiences/private-villa-weddings"
                className="group relative bg-primary overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/venues/banner/private-bg.png"
                    alt="Private Villa Weddings in Bali"
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
                    sizes="33vw"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" /> */}
                  <div className="absolute top-5 left-5">
                    <span className="text-white/80 font-mono text-sm tracking-[0.3em]">
                      01
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl md:text-2xl font-semibold leading-tight mb-3">
                      Private Villa
                      <br />
                      <span className="italic font-light">Weddings</span>
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
                      Privacy, freedom of design, and an atmosphere that feels
                      personal rather than commercial.
                    </p>
                    <span className="inline-flex items-center gap-2 text-white text-sm tracking-widest border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                      EXPLORE <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>

              <Link
                href="/wedding-experiences/intimate-weddings"
                className="group relative bg-primary overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dzerxindp/image/upload/v1767878596/BAL_1453_e7hd8w.jpg"
                    alt="Intimate Weddings in Bali"
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
                    sizes="33vw"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" /> */}
                  <div className="absolute top-5 left-5">
                    <span className="text-white/40 font-mono text-sm tracking-[0.3em]">
                      02
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl md:text-2xl font-semibold leading-tight mb-3">
                      Intimate
                      <br />
                      <span className="italic font-light">Weddings</span>
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
                      Space for connection, presence, and beauty without excess.
                      Quality over quantity.
                    </p>
                    <span className="inline-flex items-center gap-2 text-white text-sm tracking-widest border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                      EXPLORE <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>

              <Link
                href="/wedding-experiences/elopement-weddings"
                className="group relative bg-primary overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dzerxindp/image/upload/v1767346138/Wedding_4_htlkyl.jpg"
                    alt="Elopement Weddings in Bali"
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
                    sizes="33vw"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" /> */}
                  <div className="absolute top-5 left-5">
                    <span className="text-white/40 font-mono text-sm tracking-[0.3em]">
                      03
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl md:text-2xl font-semibold leading-tight mb-3">
                      Elopement
                      <br />
                      <span className="italic font-light">Weddings</span>
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
                      Not a smaller wedding — a deeper one. Emotionally rich,
                      visually poetic, entirely yours.
                    </p>
                    <span className="inline-flex items-center gap-2 text-white text-sm tracking-widest border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                      EXPLORE <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Mobile & Tablet: all cards full-width stacked */}
            <div className="flex flex-col gap-px lg:hidden mb-px">
              <Link
                href="/wedding-experiences/private-villa-weddings"
                className="group relative bg-primary overflow-hidden block"
              >
                <div className="relative aspect-[4/3] sm:aspect-[21/9] overflow-hidden">
                  <Image
                    src="/images/venues/banner/private-bg.png"
                    alt="Private Villa Weddings in Bali"
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
                    sizes="100vw"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" /> */}
                  <div className="absolute top-5 left-5">
                    <span className="text-white/80 font-mono text-sm tracking-[0.3em]">
                      01
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="text-white text-xl md:text-2xl font-semibold leading-tight mb-3">
                      Private Villa
                      <br />
                      <span className="italic font-light">Weddings</span>
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-md">
                      Privacy, freedom of design, and an atmosphere that feels
                      personal rather than commercial.
                    </p>
                    <span className="inline-flex items-center gap-2 text-white text-sm tracking-widest border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                      EXPLORE <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>

              <Link
                href="/wedding-experiences/intimate-weddings"
                className="group relative bg-primary overflow-hidden block"
              >
                <div className="relative aspect-[4/3] sm:aspect-[21/9] overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dzerxindp/image/upload/v1767878596/BAL_1453_e7hd8w.jpg"
                    alt="Intimate Weddings in Bali"
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
                    sizes="100vw"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" /> */}
                  <div className="absolute top-5 left-5">
                    <span className="text-white/40 font-mono text-sm tracking-[0.3em]">
                      02
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="text-white text-xl md:text-2xl font-semibold leading-tight mb-3">
                      Intimate
                      <br />
                      <span className="italic font-light">Weddings</span>
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-md">
                      Space for connection, presence, and beauty without excess.
                      Quality over quantity.
                    </p>
                    <span className="inline-flex items-center gap-2 text-white text-sm tracking-widest border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                      EXPLORE <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>

              <Link
                href="/wedding-experiences/elopement-weddings"
                className="group relative bg-primary overflow-hidden block"
              >
                <div className="relative aspect-[4/3] sm:aspect-[21/9] overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dzerxindp/image/upload/v1767346138/Wedding_4_htlkyl.jpg"
                    alt="Elopement Weddings in Bali"
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
                    sizes="100vw"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" /> */}
                  <div className="absolute top-5 left-5">
                    <span className="text-white/40 font-mono text-sm tracking-[0.3em]">
                      03
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="text-white text-xl md:text-2xl font-semibold leading-tight mb-3">
                      Elopement
                      <br />
                      <span className="italic font-light">Weddings</span>
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-md">
                      Not a smaller wedding — a deeper one. Emotionally rich,
                      visually poetic, entirely yours.
                    </p>
                    <span className="inline-flex items-center gap-2 text-white text-sm tracking-widest border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                      EXPLORE <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Bottom row: Luxury — full width */}
            <div className="mb-12">
              <Link
                href="/wedding-experiences/luxury-weddings"
                className="group relative bg-primary overflow-hidden block"
              >
                <div className="relative aspect-[4/3] sm:aspect-[21/9] overflow-hidden">
                  <Image
                    src="/images/venues/banner/signature-bg.png"
                    alt="Luxury Weddings in Bali"
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
                    sizes="100vw"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" /> */}
                  <div className="absolute top-5 left-5">
                    <span className="text-white/40 font-mono text-sm tracking-[0.3em]">
                      04
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-semibold leading-tight mb-3">
                      Luxury
                      <br />
                      <span className="italic font-light">Weddings</span>
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-md">
                      Luxury is not about excess — it is about refinement, care,
                      and experience shaped by architecture and atmosphere.
                    </p>
                    <span className="inline-flex items-center gap-2 text-white text-sm tracking-widest border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                      EXPLORE <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* ── Filters ─────────────────────────────────────────────── */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-8 mb-4 flex-wrap"
            >
              {/* Experience Filter */}
              <div className="flex items-center gap-4">
                <span className="text-base md:text-lg text-primary tracking-wider uppercase font-semibold">
                  EXPERIENCE
                </span>
                <div className="relative">
                  <button
                    onClick={() => setIsVenueDropdownOpen(!isVenueDropdownOpen)}
                    className="flex items-center gap-2 text-md text-primary hover:text-primary/80 transition-colors font-medium hover:cursor-pointer"
                  >
                    <span>{selectedVenueFilter}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isVenueDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isVenueDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-white border border-stone-200 shadow-lg z-10 min-w-[200px]">
                      {(
                        [
                          "Private Villa Weddings",
                          "Intimate Weddings",
                          "Elopement Weddings",
                          "Luxury Weddings",
                        ] as ExperienceFilter[]
                      ).map((v) => (
                        <button
                          key={v}
                          onClick={() => {
                            setSelectedVenueFilter(v);
                            setIsVenueDropdownOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 transition-colors hover:cursor-pointer ${
                            selectedVenueFilter === v
                              ? "bg-primary text-white"
                              : "text-primary hover:bg-stone-100"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Location Filter */}
              <div className="flex items-center gap-4">
                <span className="text-base md:text-lg text-primary tracking-wider uppercase font-semibold">
                  LOCATION
                </span>
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsLocationDropdownOpen(!isLocationDropdownOpen)
                    }
                    className="flex items-center gap-2 text-md text-primary hover:text-primary/80 transition-colors font-medium hover:cursor-pointer"
                  >
                    <span>{selectedLocation}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isLocationDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isLocationDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-white border border-stone-200 shadow-lg z-10 min-w-[120px] max-h-[240px] overflow-y-auto">
                      {locations.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => {
                            setSelectedLocation(loc);
                            setIsLocationDropdownOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 transition-colors hover:cursor-pointer ${
                            selectedLocation === loc
                              ? "bg-primary text-white"
                              : "text-primary hover:bg-stone-100"
                          }`}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Currency Filter */}
              <div className="flex items-center gap-4">
                <span className="text-base md:text-lg text-primary tracking-wider uppercase font-semibold">
                  CURRENCY
                </span>
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)
                    }
                    className="flex items-center gap-2 text-md text-primary hover:text-primary/80 transition-colors font-medium hover:cursor-pointer"
                  >
                    <span>{selectedCurrencyLocal}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isCurrencyDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isCurrencyDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-white border border-stone-200 shadow-lg z-10 min-w-[100px]">
                      {(["IDR", "USD"] as Currency[]).map((currency) => (
                        <button
                          key={currency}
                          onClick={() => {
                            setSelectedCurrencyLocal(currency);
                            setIsCurrencyDropdownOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 transition-colors hover:cursor-pointer ${
                            selectedCurrencyLocal === currency
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

            <motion.p
              variants={fadeInUp}
              className="text-center text-sm text-primary mb-12"
            >
              {selectedLocation === "All"
                ? `Showing ${visibleVenues.length} of ${totalVenuesCount} venues`
                : `Showing ${visibleVenues.length} of ${totalVenuesCount} venue${
                    totalVenuesCount !== 1 ? "s" : ""
                  } in ${selectedLocation}`}
            </motion.p>
          </motion.div>

          {/* Venue Cards */}
          <div id="venue-list-container" className="mb-24">
            <div className="mb-12 text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={selectedVenueFilter}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="text-base md:text-lg text-primary max-w-3xl mx-auto leading-relaxed"
                >
                  {selectedVenueFilter === "Luxury Weddings" &&
                    "A curated selection of venues known for distinctive architecture, setting, and experience."}
                  {selectedVenueFilter === "Private Villa Weddings" &&
                    "Exclusive private estates offering intimacy, flexibility, and a deeply personal celebration experience."}
                  {selectedVenueFilter === "Elopement Weddings" &&
                    "Intimate settings designed for couples seeking privacy, meaning, and extraordinary surroundings."}
                  {selectedVenueFilter === "Intimate Weddings" &&
                    "Thoughtfully curated venues for scaled celebrations — connection, elegance, and refined hospitality."}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* ── No Venues Found State ── */}
            {filteredVenues.length === 0 ? (
              <NoVenuesFound
                selectedLocation={selectedLocation}
                selectedVenueFilter={selectedVenueFilter}
                onReset={() => setSelectedLocation("All")}
              />
            ) : isMobile ? (
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentVenueSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <VenueCard
                      venue={filteredVenues[currentVenueSlide]}
                      selectedCurrency={selectedCurrencyLocal}
                      exchangeRate={exchangeRate}
                      onClick={() =>
                        setSelectedVenueForModal(
                          filteredVenues[currentVenueSlide],
                        )
                      }
                    />
                  </motion.div>
                </AnimatePresence>
                {filteredVenues.length > 1 && (
                  <>
                    <button
                      onClick={prevVenueSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white"
                    >
                      <ArrowLeft className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
                    </button>
                    <button
                      onClick={nextVenueSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white"
                    >
                      <ArrowRight className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
                    </button>
                    <div className="flex justify-center gap-2 mt-4">
                      {filteredVenues.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentVenueSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all hover:cursor-pointer ${
                            currentVenueSlide === index
                              ? "bg-primary w-8"
                              : "bg-stone-300"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  key={`${selectedVenueFilter}-${selectedLocation}`}
                >
                  {visibleVenues.map((venue) => (
                    <VenueCard
                      key={venue.id}
                      venue={venue}
                      selectedCurrency={selectedCurrencyLocal}
                      exchangeRate={exchangeRate}
                      onClick={() => setSelectedVenueForModal(venue)}
                    />
                  ))}
                </div>

                <div className="text-center mt-12">
                  {hasMoreVenues ? (
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="bg-transparent border border-primary text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer hover:bg-primary hover:text-white transition-colors"
                    >
                      VIEW MORE ({totalVenuesCount - visibleCount} MORE)
                    </button>
                  ) : (
                    totalVenuesCount > 6 && (
                      <button
                        onClick={() => setVisibleCount(6)}
                        className="bg-transparent border border-primary text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer hover:bg-primary hover:text-white transition-colors"
                      >
                        VIEW LESS
                      </button>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </motion.section>

      {/* Modal */}
      {selectedVenueForModal && (
        <VenueDetailModal
          venue={selectedVenueForModal}
          onClose={handleModalClose}
          selectedCurrency={selectedCurrencyLocal}
          exchangeRate={exchangeRate}
        />
      )}
    </>
  );
}