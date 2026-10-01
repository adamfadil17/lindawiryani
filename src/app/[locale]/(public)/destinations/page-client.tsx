"use client";

import { useTranslations } from "next-intl";

import { useState, useRef, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import {
  useDestinationData,
  getDestinationData,
} from "@/lib/data/destination-data";
import { Destination } from "@/types";
import PageClosing from "@/components/shared/page-closing";
import PageHero from "@/components/shared/page-hero";
import { WHATSAPP_URL } from "@/lib/constants";

type CategoryId =
  | "cat-bali"
  | "cat-themes"
  | "cat-islands"
  | "cat-outsite-bali";

const CATEGORY_META: Record<
  CategoryId,
  {
    // `key` -> messages: destinationsPage.cat.<key> / <key>Desc
    key: "bali" | "themes" | "islands" | "outside";
    anchor: string;
    // `key` -> messages: destinationsPage.loc.<key>; `value` stays English
    // because filtering matches against the English location data.
    locations: { key: string; value: string }[];
  }
> = {
  "cat-bali": {
    key: "bali",
    anchor: "bali",
    locations: [
      { key: "southBali", value: "South Bali" },
      { key: "ubud", value: "Ubud & Gianyar" },
      { key: "eastBali", value: "East Bali" },
      { key: "northBali", value: "North Bali" },
      { key: "westBali", value: "West Bali" },
      { key: "highlands", value: "Highlands, Lakes and Mountains" },
    ],
  },
  "cat-themes": {
    key: "themes",
    anchor: "themes",
    locations: [
      { key: "lake", value: "Highlands, Lakes and Mountains" },
      {
        key: "waterfall",
        value: "Ubud & Gianyar, North Bali, West Bali",
      },
      {
        key: "privateVilla",
        value: "South Bali, Ubud & Gianyar, East Bali, North Bali, West Bali",
      },
      { key: "mountain", value: "Highlands, Lakes and Mountains" },
      { key: "jungle", value: "Ubud & Gianyar, East Bali" },
      { key: "beachfront", value: "South Bali, East Bali, North Bali" },
      { key: "royal", value: "Ubud & Gianyar, East Bali" },
      { key: "ricePaddy", value: "Ubud & Gianyar, East Bali, West Bali" },
      { key: "riverside", value: "Ubud & Gianyar, East Bali, West Bali" },
      {
        key: "garden",
        value: "South Bali, Ubud & Gianyar, Highlands, Lakes and Mountains",
      },
      { key: "chapel", value: "South Bali" },
    ],
  },
  "cat-islands": {
    key: "islands",
    anchor: "islands",
    locations: [{ key: "nusa", value: "Nusa Islands" }],
  },
  "cat-outsite-bali": {
    key: "outside",
    anchor: "outside-bali",
    locations: [
      { key: "lombok", value: "Lombok" },
      { key: "sumba", value: "Sumba" },
      { key: "java", value: "Java" },
    ],
  },
};

const INITIAL_SHOW = 6;

function matchesLocation(
  destination: Destination,
  locationValue: string | null,
) {
  if (!locationValue) return true;
  // Filtering always uses the English location (by id) so it keeps working
  // when `destination.location` is translated for display.
  const dest =
    getDestinationData("en").destinationList.find(
      (d) => d.id === destination.id,
    )?.location ?? destination.location;
  if (dest === locationValue) return true;
  return dest
    .split(/–/)
    .pop()!
    .split(",")
    .map((s) => s.trim())
    .includes(locationValue);
}

function DestinationCard({ destination }: { destination: Destination }) {
  const t = useTranslations("destinationsPage");
  return (
    <Link href={`/destinations/${destination.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden mb-4">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          unoptimized={destination.image.includes("placehold")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 text-primary text-xs tracking-widest uppercase px-2 py-1">
            {destination.location.length > 30
              ? destination.location.slice(0, 30) + "…"
              : destination.location}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-white/80 text-xs tracking-widest uppercase mb-1">
            {destination.type}
          </p>
          <h3 className="text-white font-semibold text-xl uppercase">
            {destination.name}
          </h3>
        </div>
      </div>
      <p className="text-primary text-sm leading-relaxed line-clamp-2">
        {destination.description}
      </p>
      <span className="inline-block mt-3 text-xs tracking-widest uppercase text-primary border-b border-primary/30 pb-0.5 group-hover:border-primary transition-colors duration-300">
        {t("exploreDestination")}
      </span>
    </Link>
  );
}

function CategorySection({ categoryId }: { categoryId: CategoryId }) {
  const t = useTranslations("destinationsPage");
  const { destinationList } = useDestinationData();
  const meta = CATEGORY_META[categoryId];
  const categoryLabel = t(`cat.${meta.key}`);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const selectedValue =
    meta.locations.find((l) => l.key === selectedKey)?.value ?? null;

  const allDestinations = destinationList.filter(
    (d) => d.category_id === categoryId && matchesLocation(d, selectedValue),
  );

  useEffect(() => {
    setExpanded(false);
  }, [selectedKey]);

  const visibleDestinations = expanded
    ? allDestinations
    : allDestinations.slice(0, INITIAL_SHOW);

  const hiddenCount = allDestinations.length - INITIAL_SHOW;

  return (
    <motion.section
      id={meta.anchor}
      className="scroll-mt-8 py-20 lg:py-28 border-t border-primary/10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.05, margin: "0px 0px -80px 0px" }}
      variants={staggerContainer}
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 mb-10">
          <motion.div variants={fadeInUp} className="lg:col-span-4">
            <p className="text-primary tracking-[0.25em] uppercase mb-3 text-sm">
              {categoryLabel}
            </p>
            <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
              {categoryLabel}
              <br />
              <span className="italic font-light text-2xl md:text-3xl">
                {t("destinationsWord")}
              </span>
            </h2>
            <p className="text-xs text-primary tracking-wider uppercase mt-4">
              {t("destinationCount", { count: allDestinations.length })}
              {selectedKey ? ` · ${t(`loc.${selectedKey}`)}` : ""}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="lg:col-span-8 flex flex-col justify-center"
          >
            <p className="text-primary leading-relaxed mb-6 max-w-2xl">
              {t(`cat.${meta.key}Desc`)}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedKey(null)}
                className={`px-4 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors border hover:cursor-pointer ${
                  selectedKey === null
                    ? "bg-primary/5 border-primary text-primary"
                    : "border-primary/30 text-primary/80 hover:border-primary/50 hover:text-primary"
                }`}
              >
                {t("all")}
              </button>
              {meta.locations.map((loc) => (
                <button
                  key={loc.key}
                  onClick={() =>
                    setSelectedKey(selectedKey === loc.key ? null : loc.key)
                  }
                  className={`px-4 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors border hover:cursor-pointer ${
                    selectedKey === loc.key
                      ? "bg-primary/5 border-primary text-primary"
                      : "border-primary/30 text-primary/80 hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {t(`loc.${loc.key}`)}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${categoryId}-${selectedKey ?? "all"}-${expanded ? "exp" : "col"}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {allDestinations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center max-w-xl mx-auto">
                <p className="text-primary tracking-[0.25em] uppercase mb-4 text-sm">
                  {t("comingSoon")}
                </p>
                <h3 className="text-2xl text-primary font-semibold leading-tight mb-4">
                  {t("curatedTitle1")}
                  <br />
                  <span className="italic font-light">
                    {t("curatedTitle2")}
                  </span>
                </h3>
                <p className="text-primary/80 text-sm leading-relaxed">
                  {t("comingSoonBody")}
                </p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {visibleDestinations.map((destination) => (
                    <DestinationCard
                      key={destination.slug}
                      destination={destination}
                    />
                  ))}
                </div>

                {allDestinations.length > INITIAL_SHOW && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-12 flex flex-col items-center gap-3"
                  >
                    <p className="text-primary text-xs tracking-widest uppercase">
                      {expanded
                        ? t("showingAll", { total: allDestinations.length })
                        : t("showingPartial", {
                            count: Math.min(
                              INITIAL_SHOW,
                              allDestinations.length,
                            ),
                            total: allDestinations.length,
                          })}
                    </p>

                    <div className="w-48 h-px bg-primary/15 relative overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-primary/50"
                        animate={{
                          width: expanded
                            ? "100%"
                            : `${(INITIAL_SHOW / allDestinations.length) * 100}%`,
                        }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>

                    <button
                      onClick={() => setExpanded((v) => !v)}
                      className="mt-2 flex items-center gap-3 px-8 py-3 border border-primary/60 text-primary text-xs font-semibold tracking-widest uppercase hover:bg-primary hover:text-white transition-colors duration-300 hover:cursor-pointer"
                    >
                      {expanded ? (
                        <>
                          <span>{t("showLess")}</span>
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </>
                      ) : (
                        <>
                          <span>
                            {t("showMoreCategory", {
                              count: hiddenCount,
                              label: categoryLabel,
                            })}
                          </span>
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

export default function DestinationsPage() {
  const t = useTranslations("destinationsPage");
  const { destinationList } = useDestinationData();
  const [activeAnchor, setActiveAnchor] = useState<string>("bali");

  useEffect(() => {
    const anchors = Object.values(CATEGORY_META).map((m) => m.anchor);
    const handleScroll = () => {
      for (const anchor of [...anchors].reverse()) {
        const el = document.getElementById(anchor);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 80) {
          setActiveAnchor(anchor);
          return;
        }
      }
      setActiveAnchor(anchors[0]);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (anchor: string) => {
    const el = document.getElementById(anchor);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 32;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <main className="relative overflow-hidden">
      <PageHero
        image="https://res.cloudinary.com/dzerxindp/image/upload/v1773382245/header-destination_vcrwin.jpg"
        imageAlt="Indonesia Destinations"
        breadcrumb={t("breadcrumb")}
        breadcrumbHref="/destinations"
        kicker={t("heroKicker")}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        subtitleClassName="text-white text-sm md:text-base font-light leading-relaxed mt-10 max-w-4xl"
        spacing="compact"
        overlay="soft"
      />

      <motion.section
        className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 space-y-8">
            <motion.div variants={fadeInUp}>
              <p className="text-primary tracking-[0.25em] uppercase mb-3">
                {t("approachKicker")}
              </p>
              <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                {t("approachTitle1")}
                <br />
                <span>{t("approachTitle2")}</span>
              </h2>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-4">
              <p className="text-primary mb-6">{t("philosophyLead")}</p>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6]
                  .map((n) => t(`philosophy${n}`))
                  .map((item, i) => (
                    <div
                      key={item}
                      className="flex items-center gap-4 pb-4 border-b border-primary/20 last:border-0"
                    >
                      <span className="text-primary font-mono w-6 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-primary">{item}</span>
                    </div>
                  ))}
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-6 space-y-8">
            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed text-justify mb-8"
            >
              {t("approachP1")}
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed text-justify"
            >
              {t("approachP2")}
            </motion.p>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="bg-primary/10 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <motion.div variants={fadeInUp} className="mb-14">
            <p className="text-primary tracking-[0.25em] uppercase mb-3">
              {t("whyKicker")}
            </p>
            <h2 className="text-3xl md:text-4xl text-primary font-semibold">
              {t("whyTitle1")}
              <br />
              <span>{t("whyTitle2")}</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div variants={fadeInUp} className="space-y-4">
              <h3 className="text-primary mb-6">{t("offersLead")}</h3>
              {[1, 2, 3, 4, 5]
                .map((n) => t(`offers${n}`))
                .map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 pb-4 border-b border-primary/20 last:border-0"
                  >
                    <div className="w-3 h-px bg-primary/50 flex-shrink-0 mt-2.5" />
                    <span className="text-primary">{item}</span>
                  </div>
                ))}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="bg-primary p-8 lg:p-10 h-full flex flex-col justify-between">
                <div>
                  <p className="text-white font-semibold tracking-[0.25em] uppercase mb-3">
                    {t("stylesKicker")}
                  </p>
                  <h3 className="text-2xl text-white font-semibold mb-4">
                    {t("stylesTitle")}
                  </h3>
                  <p className="text-white leading-relaxed mb-8">
                    {t("stylesBody")}
                  </p>
                  <div className="space-y-4">
                    {[1, 2, 3, 4]
                      .map((n) => t(`styles${n}`))
                      .map((item, i) => (
                        <div key={item} className="flex items-center gap-4">
                          <span className="text-white font-mono w-5 flex-shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-white">{item}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="bg-primary/5 border-y border-primary/10 py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="mb-10">
            <p className="text-primary tracking-[0.25em] uppercase mb-3">
              {t("categoryKicker")}
            </p>
            <h2 className="text-3xl md:text-4xl text-primary font-semibold">
              {t("categoryTitle")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(
              Object.entries(CATEGORY_META) as [
                CategoryId,
                (typeof CATEGORY_META)[CategoryId],
              ][]
            ).map(([id, meta]) => {
              const count = destinationList.filter(
                (d) => d.category_id === id,
              ).length;
              const isActive = activeAnchor === meta.anchor;
              return (
                <button
                  key={id}
                  onClick={() => scrollToSection(meta.anchor)}
                  className={`group text-left p-6 border transition-all duration-300 hover:cursor-pointer ${
                    isActive
                      ? "bg-primary border-primary text-white"
                      : "bg-white border-primary/30 hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  {/* Top row: label + count */}
                  <div className="flex items-start justify-between mb-4">
                    <p
                      className={`text-xs font-semibold tracking-[0.2em] uppercase ${
                        isActive ? "text-white" : "text-primary"
                      }`}
                    >
                      {t(`cat.${meta.key}`)}
                    </p>
                    <span
                      className={`text-xs font-mono px-2 py-0.5 flex-shrink-0 ml-2 ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-primary/10 text-primary/80"
                      }`}
                    >
                      {count}
                    </span>
                  </div>

                  <h3
                    className={`text-xl font-semibold leading-tight mb-3 ${
                      isActive ? "text-white" : "text-primary"
                    }`}
                  >
                    {t(`cat.${meta.key}`)}
                    <span
                      className={`block text-sm italic font-light mt-0.5 ${
                        isActive ? "text-white/80" : "text-primary/80"
                      }`}
                    >
                      {t("destinationsWord")}
                    </span>
                  </h3>

                  <p
                    className={`text-xs leading-relaxed line-clamp-3 mb-5 ${
                      isActive ? "text-white" : "text-primary"
                    }`}
                  >
                    {t(`cat.${meta.key}Desc`)}
                  </p>

                  {meta.locations.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-5">
                      {meta.locations.slice(0, 4).map((loc) => (
                        <span
                          key={loc.key}
                          className={`text-xs tracking-wide px-2 py-0.5 border ${
                            isActive
                              ? "border-white/50 text-white"
                              : "border-primary/30 text-primary"
                          }`}
                        >
                          {t(`loc.${loc.key}`)}
                        </span>
                      ))}
                      {meta.locations.length > 4 && (
                        <span
                          className={`text-xs tracking-wide px-2 py-0.5 ${
                            isActive ? "text-white" : "text-primary"
                          }`}
                        >
                          {t("moreCount", { count: meta.locations.length - 4 })}
                        </span>
                      )}
                    </div>
                  )}
                  <div
                    className={`flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-transform duration-300 group-hover:translate-x-1 ${
                      isActive ? "text-white" : "text-primary"
                    }`}
                  >
                    {t("explore")}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {(Object.keys(CATEGORY_META) as CategoryId[]).map((categoryId) => (
        <CategorySection key={categoryId} categoryId={categoryId} />
      ))}
      <PageClosing
        image="https://res.cloudinary.com/dzerxindp/image/upload/v1773318397/destination-closing_eie0gt.png"
        imageAlt="Your Bali destination wedding"
        kicker={t("closingKicker")}
        titleLine1={t("closingTitle1")}
        titleLine2={t("closingTitle2")}
        body={t("closingBody")}
        primaryCta={{
          label: t("ctaBegin"),
          href: WHATSAPP_URL,
          external: true,
        }}
        secondaryCta={{ label: t("ctaPortfolio"), href: "/portfolio" }}
      />
    </main>
  );
}
