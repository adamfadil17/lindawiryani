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
  Loader2,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { weddingExperienceList } from "@/lib/data/wedding-experience-data";
import { weddingThemeList } from "@/lib/data/wedding-theme-data";
import VenueDetailModal from "@/components/shared/venue-detail-modal";
import type { Venue, Currency } from "@/types";
import { useVenueFilters } from "@/hook/useVenueFilters";

const elopementThemes = weddingThemeList.filter((t) => t.type === "ELOPEMENT");
const intimateThemes = weddingThemeList.filter((t) => t.type === "INTIMATE");

const EXPERIENCE_LABEL_MAP: Record<string, string> = {
  "private-villa-weddings": "Private Villa Weddings",
  "intimate-weddings": "Intimate Weddings",
  "elopement-weddings": "Elopement Weddings",
  "luxury-weddings": "Luxury Weddings",
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  luxury_weddings:
    "A curated selection of venues known for distinctive architecture, setting, and experience.",
  private_villa_weddings:
    "Exclusive private estates offering intimacy, flexibility, and a deeply personal celebration experience.",
  elopement_weddings:
    "Intimate settings designed for couples seeking privacy, meaning, and extraordinary surroundings.",
  intimate_weddings:
    "Thoughtfully curated venues for scaled celebrations — connection, elegance, and refined hospitality.",
};

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
        src={venue.image || "https://placehold.net/default.svg"}
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
              {venue.starting_price !== 0 && (
                <span className="text-md font-medium">{selectedCurrency}</span>
              )}
              <span className="text-xl md:text-2xl font-normal text-white">
                {formatPrice(
                  venue.starting_price,
                  selectedCurrency,
                  exchangeRate,
                )}
              </span>
              {venue.starting_price !== 0 && (
                <span className="text-sm text-white">nett</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-md">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span>{venue.destination?.name ?? "Indonesia"}</span>
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

function NoVenuesFound({
  selectedLocation,
  selectedExperienceLabel,
}: {
  selectedLocation: string;
  selectedExperienceLabel: string;
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
        <span className="font-medium">{selectedExperienceLabel}</span> venues
        available in <span className="font-medium">{selectedLocation}</span>.
        Try selecting a different location or experience.
      </p>
    </motion.div>
  );
}

function VenueListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="aspect-[4/5] bg-primary/10 animate-pulse" />
      ))}
    </div>
  );
}

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
  const {
    experiences,
    venues: filteredVenues,
    locations,
    selectedExperienceSlug,
    selectedLocation,
    setSelectedExperienceSlug,
    setSelectedLocation,
    selectedExperience,
    totalVenuesCount,
    isLoadingExperiences,
    isLoadingVenues,
    venuesError,
  } = useVenueFilters();

  const [selectedCurrencyLocal, setSelectedCurrencyLocal] =
    useState<Currency>(selectedCurrency);
  const [isExperienceDropdownOpen, setIsExperienceDropdownOpen] =
    useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [currentVenueSlide, setCurrentVenueSlide] = useState(0);
  const [selectedVenueForModal, setSelectedVenueForModal] =
    useState<Venue | null>(null);

  useEffect(() => {
    if (externalSelectedVenue) {
      setSelectedVenueForModal(externalSelectedVenue);
    }
  }, [externalSelectedVenue]);

  useEffect(() => {
    setCurrentVenueSlide(0);
    setVisibleCount(6);
  }, [selectedLocation, selectedExperienceSlug]);

  const visibleVenues = useMemo(
    () => (isMobile ? filteredVenues : filteredVenues.slice(0, visibleCount)),
    [filteredVenues, visibleCount, isMobile],
  );
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

  const selectedExperienceLabel =
    EXPERIENCE_LABEL_MAP[selectedExperienceSlug] ??
    selectedExperience?.name ??
    "";

  const categoryDescription =
    CATEGORY_DESCRIPTIONS[selectedExperience?.category ?? ""] ?? "";

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

          <motion.div className="mb-16" variants={fadeInUp}>
            <div className="hidden lg:grid grid-cols-3 gap-px mb-px bg-white/10">
              {weddingExperienceList.slice(0, 3).map((exp, i) => (
                <Link
                  key={exp.slug}
                  href={`/wedding-experiences/${exp.slug}`}
                  className="group relative bg-primary overflow-hidden"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={exp.hero_image}
                      alt={`${exp.name} in Bali`}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
                      sizes="33vw"
                    />
                    <div className="absolute top-5 left-5">
                      <span className="text-white/80 font-mono text-sm tracking-[0.3em]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-xl md:text-2xl font-semibold leading-tight mb-3">
                        {exp.name.split(" ").slice(0, -1).join(" ")}
                        <br />
                        <span className="italic font-light">
                          {exp.name.split(" ").slice(-1)[0]}
                        </span>
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
                        {exp.hero_desc}
                      </p>
                      <span className="inline-flex items-center gap-2 text-white text-sm tracking-widest border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                        EXPLORE <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {weddingExperienceList[3] && (
              <div className="hidden lg:block mb-14">
                <Link
                  href={`/wedding-experiences/${weddingExperienceList[3].slug}`}
                  className="group relative bg-primary overflow-hidden block"
                >
                  <div className="relative aspect-[21/9] overflow-hidden">
                    <Image
                      src={weddingExperienceList[3].hero_image}
                      alt={`${weddingExperienceList[3].name} in Bali`}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
                      sizes="100vw"
                    />
                    <div className="absolute top-5 left-5">
                      <span className="text-white/40 font-mono text-sm tracking-[0.3em]">
                        04
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-semibold leading-tight mb-3">
                        {weddingExperienceList[3].name
                          .split(" ")
                          .slice(0, -1)
                          .join(" ")}
                        <br />
                        <span className="italic font-light">
                          {
                            weddingExperienceList[3].name
                              .split(" ")
                              .slice(-1)[0]
                          }
                        </span>
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-md">
                        {weddingExperienceList[3].hero_desc}
                      </p>
                      <span className="inline-flex items-center gap-2 text-white text-sm tracking-widest border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                        EXPLORE <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            <div className="flex flex-col gap-px lg:hidden mb-8 sm:mb-10 md:mb-12">
              {weddingExperienceList.map((exp, i) => (
                <Link
                  key={exp.slug}
                  href={`/wedding-experiences/${exp.slug}`}
                  className="group relative bg-primary overflow-hidden block"
                >
                  <div className="relative aspect-[4/3] sm:aspect-[21/9] overflow-hidden">
                    <Image
                      src={exp.hero_image}
                      alt={`${exp.name} in Bali`}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75"
                      sizes="100vw"
                    />
                    <div className="absolute top-5 left-5">
                      <span className="text-white/80 font-mono text-sm tracking-[0.3em]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <h3 className="text-white text-xl md:text-2xl font-semibold leading-tight mb-3">
                        {exp.name.split(" ").slice(0, -1).join(" ")}
                        <br />
                        <span className="italic font-light">
                          {exp.name.split(" ").slice(-1)[0]}
                        </span>
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-md">
                        {exp.hero_desc}
                      </p>
                      <span className="inline-flex items-center gap-2 text-white text-sm tracking-widest border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                        EXPLORE <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8 mb-4 mt-8 sm:mt-10 lg:mt-0 flex-wrap"
            >
              <div className="flex items-center gap-4">
                <span className="text-base md:text-lg text-primary tracking-wider uppercase font-semibold">
                  EXPERIENCE
                </span>
                <div className="relative">
                  {isLoadingExperiences ? (
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          setIsExperienceDropdownOpen(!isExperienceDropdownOpen)
                        }
                        className="flex items-center gap-2 text-md text-primary hover:text-primary/80 transition-colors font-medium hover:cursor-pointer"
                      >
                        <span>{selectedExperienceLabel}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isExperienceDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isExperienceDropdownOpen && (
                        <div className="absolute top-full right-0 mt-2 bg-white border border-stone-200 shadow-lg z-10 min-w-[200px]">
                          {experiences.map((exp) => (
                            <button
                              key={exp.slug}
                              onClick={() => {
                                setSelectedExperienceSlug(exp.slug);
                                setIsExperienceDropdownOpen(false);
                              }}
                              className={`block w-full text-left px-4 py-2 transition-colors hover:cursor-pointer ${
                                selectedExperienceSlug === exp.slug
                                  ? "bg-primary text-white"
                                  : "text-primary hover:bg-stone-100"
                              }`}
                            >
                              {EXPERIENCE_LABEL_MAP[exp.slug] ?? exp.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

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

          <div id="venue-list-container" className="mb-24">
            <div className="mb-12 text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={selectedExperienceSlug}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="text-base md:text-lg text-primary max-w-3xl mx-auto leading-relaxed"
                >
                  {categoryDescription}
                </motion.p>
              </AnimatePresence>
            </div>

            {isLoadingVenues ? (
              <VenueListSkeleton />
            ) : venuesError ? (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <p className="text-primary/60 text-sm">{venuesError}</p>
              </motion.div>
            ) : filteredVenues.length === 0 ? (
              <NoVenuesFound
                selectedLocation={selectedLocation}
                selectedExperienceLabel={selectedExperienceLabel}
              />
            ) : isMobile ? (
              /* Mobile slider */
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
              /* Desktop grid */
              <>
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  key={`${selectedExperienceSlug}-${selectedLocation}`}
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

      {selectedVenueForModal && (
        <VenueDetailModal
          venue={selectedVenueForModal}
          onClose={handleModalClose}
          selectedCurrency={selectedCurrencyLocal}
          exchangeRate={exchangeRate}
          elopementThemes={elopementThemes}
          intimateThemes={intimateThemes}
        />
      )}
    </>
  );
}
