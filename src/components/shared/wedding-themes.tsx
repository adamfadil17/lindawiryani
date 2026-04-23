"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ArrowLeft, ChevronDown } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { weddingThemeList } from "@/lib/data/wedding-theme-data";
import { venueList } from "@/lib/data/venue-data";
import ThemeDetailModal from "@/components/shared/theme-detail-modal";
import type { Venue, WeddingTheme } from "@/types";

// ─── Constants ────────────────────────────────────────────────────────────────

const CARDS_PER_PAGE = 6;

// ─── Derived data ─────────────────────────────────────────────────────────────

// Filter tema per kategori dari weddingThemeList
const elopementThemes = weddingThemeList.filter((t) => t.type === "ELOPEMENT");
const intimateThemes = weddingThemeList.filter((t) => t.type === "INTIMATE");

// Ambil gambar slideshow dari tema masing-masing kategori (maks 5, deduplicate)
const elopementCategoryImages = [
  ...new Set(elopementThemes.map((t) => t.image).filter(Boolean)),
].slice(0, 5) as string[];

const intimateCategoryImages = [
  ...new Set(intimateThemes.map((t) => t.image).filter(Boolean)),
].slice(0, 5) as string[];

// ─── ThemeCategoryCard ────────────────────────────────────────────────────────

interface ThemeCategoryCardProps {
  title: string;
  description: string;
  images: string[];
  onClick: () => void;
}

function ThemeCategoryCard({
  title,
  description,
  images,
  onClick,
}: ThemeCategoryCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <motion.article
      onClick={onClick}
      variants={fadeInUp}
      className="relative overflow-hidden cursor-pointer group aspect-[3/4] transition-all"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image
            src={
              images[currentImageIndex] || "https://placehold.net/default.svg"
            }
            alt={title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="50vw"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <div className="min-h-[120px] flex flex-col justify-start">
          <h3 className="text-2xl text-center md:text-3xl font-semibold mb-3">
            {title}
          </h3>
          <p className="text-md text-center text-white/90 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

// ─── WeddingThemeCard ─────────────────────────────────────────────────────────

interface WeddingThemeCardProps {
  theme: WeddingTheme;
  onClick: () => void;
}

function WeddingThemeCard({ theme, onClick }: WeddingThemeCardProps) {
  // Lookup nama venue dari venueList menggunakan theme.venue_id (skema baru)
  const venueData = venueList.find((v) => v.id === theme.venue_id);

  return (
    <article
      className="relative overflow-hidden cursor-pointer group aspect-[16/9]"
      onClick={onClick}
    >
      <Image
        src={theme.image || "https://placehold.net/default.svg"}
        alt={theme.title}
        fill
        loading="lazy"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-xl md:text-2xl font-semibold leading-tight mb-2">
          {theme.title}
        </h3>
        <p className="text-md text-white/90">
          {venueData ? venueData.name : "Venue To Be Confirmed"}
        </p>
      </div>
    </article>
  );
}

// ─── WeddingThemesSection ─────────────────────────────────────────────────────

interface WeddingThemesSectionProps {
  isMobile: boolean;
  onExploreVenue: (venue: Venue) => void;
}

export default function WeddingThemesSection({
  isMobile,
  onExploreVenue,
}: WeddingThemesSectionProps) {
  const [selectedThemeCategory, setSelectedThemeCategory] = useState<
    "elopement" | "intimate"
  >("elopement");
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [currentThemeSlide, setCurrentThemeSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedThemeForModal, setSelectedThemeForModal] =
    useState<WeddingTheme | null>(null);

  const currentThemes =
    selectedThemeCategory === "elopement" ? elopementThemes : intimateThemes;

  // Pagination untuk desktop
  const totalPages = Math.ceil(currentThemes.length / CARDS_PER_PAGE);
  const paginatedThemes = currentThemes.slice(
    currentPage * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE + CARDS_PER_PAGE,
  );

  const handleCategoryClick = (category: "elopement" | "intimate") => {
    setSelectedThemeCategory(category);
    setCurrentThemeSlide(0);
    setCurrentPage(0);
    setTimeout(() => {
      document
        .getElementById("wedding-themes-selector")
        ?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
  };

  // Mobile slider navigation
  const nextThemeSlide = () =>
    setCurrentThemeSlide((p) => (p + 1) % currentThemes.length);
  const prevThemeSlide = () =>
    setCurrentThemeSlide(
      (p) => (p - 1 + currentThemes.length) % currentThemes.length,
    );

  // Desktop page navigation
  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 0));

  return (
    <>
      <motion.section
        id="wedding-themes-section"
        className="relative py-20 lg:py-28 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 bg-primary/10" />
        <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          {/* Header */}
          <motion.div variants={fadeInUp} className="mb-14 lg:mb-20">
            <p className="text-primary tracking-[0.25em] uppercase mb-3">
              Concept Layer
            </p>
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5">
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold leading-tight">
                  Wedding Themes
                </h2>
              </div>
              <div className="lg:col-span-7 flex items-end">
                <p className="text-primary leading-relaxed text-justify">
                  Our wedding themes are not packages or styles. They are
                  emotional directions — guiding how your celebration feels,
                  flows, and unfolds. Theme supports decisions around scale,
                  intimacy, ceremony style, and the overall guest experience.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Category Cards — gambar slideshow dari tema masing-masing kategori */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            variants={fadeInUp}
          >
            <ThemeCategoryCard
              title="Elopement Weddings"
              description="Intimate celebrations designed for couples seeking privacy, meaning, and extraordinary settings."
              images={elopementCategoryImages}
              onClick={() => handleCategoryClick("elopement")}
            />
            <ThemeCategoryCard
              title="Intimate Weddings"
              description="Thoughtfully scaled celebrations curated for connection, elegance, and refined hospitality."
              images={intimateCategoryImages}
              onClick={() => handleCategoryClick("intimate")}
            />
          </motion.div>

          {/* Theme Selector + Cards */}
          <motion.div
            id="wedding-themes-selector"
            variants={fadeInUp}
            className="mb-8"
          >
            {/* Filter dropdown */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className="text-base md:text-lg text-primary tracking-widest uppercase font-semibold">
                WEDDING THEMES
              </span>
              <div className="relative">
                <button
                  onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                  className="flex items-center gap-2 text-md text-primary hover:text-primary/80 transition-colors hover:cursor-pointer font-medium capitalize"
                >
                  <span>{selectedThemeCategory}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isThemeDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isThemeDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-stone-200 shadow-lg z-10 min-w-[150px]">
                    {(["elopement", "intimate"] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedThemeCategory(cat);
                          setIsThemeDropdownOpen(false);
                          setCurrentThemeSlide(0);
                          setCurrentPage(0);
                        }}
                        className={`block w-full text-left px-4 py-2 transition-colors hover:cursor-pointer capitalize ${
                          selectedThemeCategory === cat
                            ? "bg-primary text-white"
                            : "text-primary hover:bg-stone-100"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Deskripsi kategori aktif */}
            <div className="mb-12 text-center">
              <AnimatePresence mode="wait">
                {selectedThemeCategory === "elopement" ? (
                  <motion.p
                    key="elopement-desc"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="text-base md:text-lg text-primary max-w-3xl mx-auto leading-relaxed"
                  >
                    Intimate celebrations designed for couples seeking privacy,
                    meaning, and extraordinary settings.
                  </motion.p>
                ) : (
                  <motion.p
                    key="intimate-desc"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="text-base md:text-lg text-primary max-w-3xl mx-auto leading-relaxed"
                  >
                    Thoughtfully scaled celebrations curated for connection,
                    elegance, and refined hospitality.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Cards — Mobile slider / Desktop grid with pagination */}
            {isMobile ? (
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedThemeCategory}-${currentThemeSlide}`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <WeddingThemeCard
                      theme={currentThemes[currentThemeSlide]}
                      onClick={() =>
                        setSelectedThemeForModal(
                          currentThemes[currentThemeSlide],
                        )
                      }
                    />
                  </motion.div>
                </AnimatePresence>
                {currentThemes.length > 1 && (
                  <>
                    <button
                      onClick={prevThemeSlide}
                      className="absolute left-4 top-1/3 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white"
                    >
                      <ArrowLeft className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
                    </button>
                    <button
                      onClick={nextThemeSlide}
                      className="absolute right-4 top-1/3 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white"
                    >
                      <ArrowRight className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
                    </button>
                    <div className="flex justify-center gap-2 mt-4">
                      {currentThemes.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentThemeSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all hover:cursor-pointer ${
                            currentThemeSlide === index
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
              <div>
                {/* Grid 6 cards */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedThemeCategory}-page-${currentPage}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {paginatedThemes.map((theme) => (
                      <WeddingThemeCard
                        key={theme.id}
                        theme={theme}
                        onClick={() => setSelectedThemeForModal(theme)}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Pagination controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-6 mt-10">
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 0}
                      className="w-10 h-10 border border-primary flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-primary"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPage(index)}
                          className={`w-2.5 h-2.5 rounded-full transition-all hover:cursor-pointer ${
                            currentPage === index
                              ? "bg-primary w-8 rounded-full"
                              : "bg-stone-300 hover:bg-primary/50"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages - 1}
                      className="w-10 h-10 border border-primary flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-primary"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Modal — onExploreVenue meneruskan Venue (tipe baru dari @/types) ke parent */}
      {selectedThemeForModal && (
        <ThemeDetailModal
          theme={selectedThemeForModal}
          onClose={() => setSelectedThemeForModal(null)}
          onExploreVenue={onExploreVenue}
        />
      )}
    </>
  );
}