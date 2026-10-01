"use client";

import { useTranslations } from "next-intl";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, MapPin, ChevronDown, ArrowLeft } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Portfolio } from "@/types";
import { usePortfolioData } from "@/lib/data/portfolio-data";
import { useDestinationData } from "@/lib/data/destination-data";
import PageClosing from "@/components/shared/page-closing";
import PageHero from "@/components/shared/page-hero";
import { WHATSAPP_URL } from "@/lib/constants";

const weddingExperiences = [
  {
    id: "1",
    labelKey: "privateVilla",
    labelName: "Private Villa Weddings",
    slug: "private-villa-weddings",
  },
  {
    id: "2",
    labelKey: "intimate",
    labelName: "Intimate Weddings",
    slug: "intimate-weddings",
  },
  {
    id: "3",
    labelKey: "elopement",
    labelName: "Elopement Weddings",
    slug: "elopement-weddings",
  },
  {
    id: "4",
    labelKey: "luxury",
    labelName: "Luxury Weddings",
    slug: "luxury-weddings",
  },
];

interface FilterDropdownProps {
  label: string;
  value: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
  options: { label: string; value: string }[];
  align?: "left" | "right";
}

function FilterDropdown({
  label,
  value,
  isOpen,
  onToggle,
  onSelect,
  options,
  align = "left",
}: FilterDropdownProps) {
  const t = useTranslations("portfolioPage");
  const selectedLabel =
    value === "all"
      ? label
      : (options.find((o) => o.value === value)?.label ?? label);

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 border border-primary/50 text-primary px-5 py-2.5 text-sm tracking-widest uppercase hover:border-primary hover:bg-primary/5 transition-colors hover:cursor-pointer"
      >
        <span className="font-medium">{selectedLabel}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full mt-2 bg-white border border-stone-200 shadow-xl z-20 min-w-[220px] ${align === "right" ? "right-0" : "left-0"}`}
          >
            <div
              className={
                options.length > 5
                  ? "max-h-[260px] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:color-mix(in_srgb,var(--color-primary)_30%,transparent)_transparent]"
                  : ""
              }
            >
              <button
                onClick={() => onSelect("all")}
                className={`block w-full text-left px-5 py-3 text-sm transition-colors hover:cursor-pointer ${
                  value === "all"
                    ? "bg-primary text-white"
                    : "text-primary hover:bg-stone-50"
                }`}
              >
                {t("all")}
              </button>
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onSelect(opt.value)}
                  className={`block w-full text-left px-5 py-3 text-sm transition-colors hover:cursor-pointer ${
                    value === opt.value
                      ? "bg-primary text-white"
                      : "text-primary hover:bg-stone-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface PortfolioCardProps {
  item: Portfolio;
}

function PortfolioCard({ item }: PortfolioCardProps) {
  const t = useTranslations("portfolioPage");
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className="relative group overflow-hidden cursor-pointer aspect-[4/3]"
    >
      <Link href={`/portfolio/${item.slug}`} className="block h-full">
        <Image
          src={item.image}
          alt={item.couple}
          fill
          quality={85}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

        <div className="absolute top-5 left-5 flex flex-wrap gap-2">
          {item.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="bg-primary/80 text-white text-xs tracking-widest px-3 py-1"
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </div>

        <div className="absolute top-5 right-5 w-9 h-9 bg-white/10 border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white">
          <ArrowRight className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl md:text-2xl font-semibold leading-tight mb-1">
            {item.couple}
          </h3>
          <p className="text-white/80 italic text-sm mb-3">{item.subtitle}</p>
          <div className="flex items-center gap-1.5 text-white/80 text-sm">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{item.credit_location_detail}</span>
          </div>
          {item.origin && (
            <p className="text-white/80 text-sm mt-1 tracking-widest uppercase">
              {t("fromOrigin", { origin: item.origin })}
            </p>
          )}
        </div>
      </Link>
    </motion.article>
  );
}

export default function PortfolioPage() {
  const tHome = useTranslations("home");
  const t = useTranslations("portfolioPage");
  const tNav = useTranslations("nav");
  const { portfolioItems, reviews } = usePortfolioData();
  const { destinationList } = useDestinationData();
  const destinations = useMemo(
    () => destinationList.map((d) => ({ label: d.name, slug: d.slug })),
    [destinationList],
  );
  const [selectedExperience, setSelectedExperience] = useState<string>("all");
  const [selectedDestination, setSelectedDestination] = useState<string>("all");
  const [isExpDropdownOpen, setIsExpDropdownOpen] = useState(false);
  const [isDestDropdownOpen, setIsDestDropdownOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [reviewSlide, setReviewSlide] = useState(0);

  const DESKTOP_CARDS = 3;
  const maxDesktopSlide = reviews.length - DESKTOP_CARDS;
  const maxMobileSlide = reviews.length - 1;

  const closeDropdowns = () => {
    setIsExpDropdownOpen(false);
    setIsDestDropdownOpen(false);
  };

  const filteredItems = useMemo(() => {
    let list = portfolioItems;
    if (selectedExperience !== "all") {
      const exp = weddingExperiences.find((e) => e.slug === selectedExperience);
      if (exp) {
        list = list.filter((item) => item.experience_id === exp.id);
      }
    }
    if (selectedDestination !== "all") {
      const dest = destinationList.find((d) => d.slug === selectedDestination);
      if (dest) {
        list = list.filter((item) => item.destination_id === dest.id);
      }
    }
    return list;
  }, [
    portfolioItems,
    destinationList,
    selectedExperience,
    selectedDestination,
  ]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;
  const totalCount = filteredItems.length;

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <main className="relative overflow-hidden" onClick={closeDropdowns}>
      <PageHero
        image="/images/service/service2.png"
        imageAlt="Portfolio — Real Weddings in Bali"
        breadcrumb={t("breadcrumb")}
        breadcrumbHref="/portfolio"
        kicker={t("heroKicker")}
        title={t("heroTitle1")}
        titleSecondLine={t("heroTitle2")}
        subtitle={t("heroSubtitle")}
        spacing="compact"
        titleSize="xlLarge"
      />

      <motion.section
        className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div variants={fadeInUp} className="lg:col-span-4 lg:pt-2">
            <div className="lg:sticky lg:top-32">
              <div className="w-16 h-px bg-primary/70 mb-6" />
              <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                {t("introTitle1")}
                <br />
                <span>{t("introTitle2")}</span>
              </h2>
            </div>
          </motion.div>

          <div className="lg:col-span-8 space-y-8">
            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed text-justify"
            >
              {t("introP1")}
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed text-justify"
            >
              {t("introP2")}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="border-l-2 border-primary/50 pl-8 py-2"
            >
              <p className="text-primary font-semibold tracking-widest uppercase mb-5">
                {t("ourWeddingsAreLead")}
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  t("quality1"),
                  t("quality2"),
                  t("quality3"),
                  t("quality4"),
                  t("quality5"),
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-3 h-px bg-primary/70 flex-shrink-0" />
                    <span className="text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="portfolio-grid"
        className="py-16 lg:py-20 bg-primary/15"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05, margin: "0px 0px -80px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <motion.div variants={fadeInUp} className="mb-12 lg:mb-16">
            <div className="grid lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-5">
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  {t("designStoriesKicker")}
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                  {t("designStoriesTitle")}
                </h2>
              </div>
              <div className="lg:col-span-7 flex items-end">
                <p className="text-primary leading-relaxed text-justify">
                  {t("designStoriesBody")}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-4 mb-10"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-primary text-sm tracking-widest uppercase font-semibold mr-2">
              {t("filterBy")}
            </span>

            <FilterDropdown
              label={t("experienceLabel")}
              value={selectedExperience}
              isOpen={isExpDropdownOpen}
              onToggle={() => {
                setIsExpDropdownOpen((p) => !p);
                setIsDestDropdownOpen(false);
              }}
              onSelect={(v) => {
                setSelectedExperience(v);
                setIsExpDropdownOpen(false);
                setVisibleCount(6);
              }}
              options={weddingExperiences.map((e) => ({
                label: tNav(`weddingExperiencesSubmenu.${e.labelKey}`),
                value: e.slug,
              }))}
            />

            <FilterDropdown
              label={t("destinationLabel")}
              value={selectedDestination}
              isOpen={isDestDropdownOpen}
              onToggle={() => {
                setIsDestDropdownOpen((p) => !p);
                setIsExpDropdownOpen(false);
              }}
              onSelect={(v) => {
                setSelectedDestination(v);
                setIsDestDropdownOpen(false);
                setVisibleCount(6);
              }}
              options={destinations.map((d) => ({
                label: d.label,
                value: d.slug,
              }))}
              align="left"
            />

            {(selectedExperience !== "all" ||
              selectedDestination !== "all") && (
              <button
                onClick={() => {
                  setSelectedExperience("all");
                  setSelectedDestination("all");
                  setVisibleCount(6);
                }}
                className="text-primary/80 text-sm tracking-widest uppercase hover:text-primary transition-colors hover:cursor-pointer underline underline-offset-4"
              >
                {t("clearFilters")}
              </button>
            )}

            <span className="ml-auto text-primary">
              {totalCount}{" "}
              {totalCount === 1 ? t("storySingular") : t("storyPlural")}
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            {filteredItems.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-24 text-center"
              >
                <p className="text-primary/80 text-lg italic">
                  {t("noResults")}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={`${selectedExperience}-${selectedDestination}`}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
              >
                {visibleItems.map((item) => (
                  <PortfolioCard key={item.id} item={item} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {filteredItems.length > 0 && (
            <div className="text-center mt-12">
              {hasMore ? (
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="border border-primary text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary hover:text-white hover:cursor-pointer transition-colors duration-300"
                >
                  {t("viewMore", {
                    count: filteredItems.length - visibleCount,
                  })}
                </button>
              ) : (
                totalCount > 6 && (
                  <button
                    onClick={() => setVisibleCount(6)}
                    className="border border-primary/30 text-primary/80 font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary/5 hover:cursor-pointer transition-colors duration-300"
                  >
                    {t("viewLess")}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </motion.section>

      <motion.section
        className="bg-primary py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -80px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <motion.div
            variants={fadeInUp}
            className="mb-14 lg:mb-20 grid lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-5">
              <p className="text-white tracking-[0.25em] uppercase mb-3">
                {t("exploreWorkKicker")}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
                {t("byExperienceTitle")}
              </h2>
            </div>
            <div className="lg:col-span-7 flex items-end">
              <p className="text-white leading-relaxed text-justify">
                {t("byExperienceBody")}
              </p>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {weddingExperiences.map((exp, i) => (
              <motion.div key={exp.slug} variants={fadeInUp} custom={i}>
                <Link
                  href={`/wedding-experiences/${exp.slug}`}
                  className="group flex items-center justify-between border border-white/20 p-6 hover:border-white/60 hover:bg-white/5 transition-all duration-300"
                >
                  <span className="text-white font-medium tracking-wide group-hover:text-white/80 transition-colors">
                    {exp.labelName}
                  </span>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors flex-shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -80px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <motion.div
            variants={fadeInUp}
            className="mb-14 lg:mb-20 grid lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-5">
              <p className="text-primary tracking-[0.25em] uppercase mb-3">
                {t("exploreWorkKicker")}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold leading-tight">
                {t("byDestinationTitle")}
              </h2>
            </div>
            <div className="lg:col-span-7 flex items-end">
              <p className="text-primary leading-relaxed text-justify">
                {t("byDestinationBody")}
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {destinations.map((dest, i) => (
              <motion.div key={dest.slug} variants={fadeInUp} custom={i}>
                <Link
                  href={`/destinations/${dest.slug}`}
                  className="group block text-center border border-primary/30 p-5 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <span className="text-primary text-sm font-medium tracking-widest uppercase group-hover:text-white transition-colors">
                    {dest.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-20 lg:py-28 bg-primary/10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <motion.div variants={fadeInUp} className="mb-14 lg:mb-20">
            <p className="text-primary tracking-[0.25em] uppercase mb-3">
              {tHome("reviewsKicker")}
            </p>
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5">
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold leading-tight">
                  {tHome("reviewsTitle1")}
                  <br />
                  <span className="italic font-light">
                    {tHome("reviewsTitle2")}
                  </span>
                </h2>
              </div>
              <div className="lg:col-span-7 flex items-end">
                <p className="text-primary leading-relaxed text-justify">
                  {tHome("reviewsIntro")}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="hidden lg:block overflow-hidden"
          >
            <motion.div
              className="flex gap-6"
              animate={{
                x: `calc(-${reviewSlide * (100 / 3)}% - ${reviewSlide * 8}px)`,
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="min-w-[calc(33.333%-11px)] bg-white border border-primary/10 p-8 flex flex-col justify-between hover:border-primary/30 transition-colors duration-300"
                >
                  <div>
                    <span className="text-5xl text-primary/80 font-serif leading-none select-none">
                      "
                    </span>
                    <p className="text-primary leading-relaxed italic mt-2 text-justify">
                      {review.quote}
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-primary/10">
                    <p className="text-primary font-semibold text-sm tracking-wide">
                      {review.couple}
                    </p>
                    <p className="text-primary/80 text-xs tracking-widest uppercase mt-1">
                      {tHome("coupleFrom", { origin: review.origin })}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp} className="lg:hidden overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={reviewSlide}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
                className="bg-white border border-primary/10 p-8 flex flex-col justify-between"
              >
                <div>
                  <span className="text-5xl text-primary/80 font-serif leading-none select-none">
                    "
                  </span>
                  <p className="text-primary leading-relaxed italic mt-2 text-justify">
                    {reviews[reviewSlide].quote}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-primary/10">
                  <p className="text-primary font-semibold text-sm tracking-wide">
                    {reviews[reviewSlide].couple}
                  </p>
                  <p className="text-primary/80 text-xs tracking-widest uppercase mt-1">
                    {tHome("coupleFrom", {
                      origin: reviews[reviewSlide].origin,
                    })}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <div className="flex items-center justify-between mt-10">
            <div className="flex gap-2">
              {reviews.slice(0, reviews.length - 2).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewSlide(i)}
                  className={`h-2 rounded-full transition-all hover:cursor-pointer ${
                    reviewSlide === i
                      ? "bg-primary w-8"
                      : "bg-primary/30 w-2 hover:bg-primary/60"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setReviewSlide((p) => Math.max(p - 1, 0))}
                disabled={reviewSlide === 0}
                className="w-10 h-10 border border-primary/30 flex items-center justify-center hover:bg-primary hover:border-primary group transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
              </button>
              <button
                onClick={() =>
                  setReviewSlide((p) => Math.min(p + 1, reviews.length - 3))
                }
                disabled={reviewSlide >= reviews.length - 3}
                className="w-10 h-10 border border-primary/30 flex items-center justify-center hover:bg-primary hover:border-primary group transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:cursor-pointer"
              >
                <ArrowRight className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      <PageClosing
        image="https://res.cloudinary.com/dzerxindp/image/upload/v1773318849/portfolio-closing_ejp9mq.png"
        imageAlt="Begin Your Wedding Journey"
        kicker={t("closingKicker")}
        titleLine1={t("closingTitle1")}
        titleLine2={t("closingTitle2")}
        body={t("closingBody")}
        primaryCta={{
          label: t("ctaBegin"),
          href: WHATSAPP_URL,
          external: true,
        }}
        secondaryCta={{ label: t("ctaJournal"), href: "/journal" }}
      />
    </main>
  );
}
