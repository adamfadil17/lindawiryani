"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import {
  destinationList,
  destinationCategories,
} from "@/lib/data/destination-data";
import { Destination } from "@/types";

type CategoryId =
  | "cat-bali"
  | "cat-themes"
  | "cat-islands"
  | "cat-outsite-bali";

const CATEGORY_META: Record<
  CategoryId,
  {
    label: string;
    anchor: string;
    description: string;
    locations: { label: string; value: string }[];
  }
> = {
  "cat-bali": {
    label: "Bali",
    anchor: "bali",
    description:
      "From dramatic clifftops to lush jungle valleys, Bali offers an extraordinary range of wedding environments — each distinct in character, atmosphere, and emotional quality.",
    locations: [
      {
        label: "South Bali",
        value: "South Bali",
      },
      {
        label: "Ubud & Gianyar",
        value: "Ubud & Gianyar",
      },
      {
        label: "East Bali",
        value: "East Bali",
      },
      {
        label: "North Bali",
        value: "North Bali",
      },
      {
        label: "West Bali",
        value: "West Bali",
      },
      {
        label: "Highlands & Mountains",
        value: "Highlands, Lakes and Mountains",
      },
    ],
  },
  "cat-themes": {
    label: "Themes",
    anchor: "themes",
    description:
      "Beyond geography, we curate weddings by emotional atmosphere and design character — from clifftop sunsets and jungle canopies to sacred rivers and highland gardens.",
    locations: [
      { label: "Lake Weddings", value: "Highlands, Lakes and Mountains" },
      {
        label: "Waterfall Weddings",
        value: "Ubud & Gianyar, North Bali, West Bali",
      },
      {
        label: "Private Villa",
        value: "South Bali, Ubud & Gianyar, East Bali, North Bali, West Bali",
      },
      { label: "Mountain Weddings", value: "Highlands, Lakes and Mountains" },
      {
        label: "Jungle / Forest",
        value: "Ubud & Gianyar, East Bali",
      },
      {
        label: "Beachfront / Oceanfront",
        value: "South Bali, East Bali, North Bali",
      },
      {
        label: "Royal Balinese",
        value: "Ubud & Gianyar, East Bali",
      },
      {
        label: "Rice Paddy Field",
        value: "Ubud & Gianyar, East Bali, West Bali",
      },
      {
        label: "Riverside",
        value: "Ubud & Gianyar, East Bali, West Bali",
      },
      {
        label: "Garden Weddings",
        value: "South Bali, Ubud & Gianyar, Highlands, Lakes and Mountains",
      },
    ],
  },
  "cat-islands": {
    label: "Islands",
    anchor: "islands",
    description:
      "Indonesia's island archipelago offers rare and exclusive settings — from the white sands of the Nusa Islands to the dramatic savannah landscapes of Sumba.",
    locations: [
      {
        label: "Nusa Islands",
        value: "Nusa Islands",
      },
    ],
  },
  "cat-outsite-bali": {
    label: "Outside Bali",
    anchor: "outside-bali",
    description:
      "Select destinations beyond Bali for couples seeking cultural depth, volcanic grandeur, or the remote landscapes of Indonesia's most extraordinary regions.",
    locations: [
      { label: "Lombok", value: "Lombok" },
      { label: "Sumba", value: "Sumba" },
      {
        label: "Java",
        value: "Java",
      },
    ],
  },
};

const INITIAL_SHOW = 6;

function matchesLocation(
  destination: Destination,
  locationValue: string | null,
) {
  if (!locationValue) return true;
  const dest = destination.location;
  if (dest === locationValue) return true;
  return dest
    .split(/–/)
    .pop()!
    .split(",")
    .map((s) => s.trim())
    .includes(locationValue);
}

function DestinationCard({ destination }: { destination: Destination }) {
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
        Explore Destination
      </span>
    </Link>
  );
}

function CategorySection({ categoryId }: { categoryId: CategoryId }) {
  const meta = CATEGORY_META[categoryId];
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const selectedValue =
    meta.locations.find((l) => l.label === selectedLabel)?.value ?? null;

  const allDestinations = destinationList.filter(
    (d) => d.category_id === categoryId && matchesLocation(d, selectedValue),
  );

  useEffect(() => {
    setExpanded(false);
  }, [selectedLabel]);

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
              {meta.label}
            </p>
            <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
              {meta.label}
              <br />
              <span className="italic font-light text-2xl md:text-3xl">
                Destinations
              </span>
            </h2>
            <p className="text-xs text-primary tracking-wider uppercase mt-4">
              {allDestinations.length} destination
              {allDestinations.length !== 1 ? "s" : ""}
              {selectedLabel ? ` · ${selectedLabel}` : ""}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="lg:col-span-8 flex flex-col justify-center"
          >
            <p className="text-primary leading-relaxed mb-6 max-w-2xl">
              {meta.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedLabel(null)}
                className={`px-4 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors border hover:cursor-pointer ${
                  selectedLabel === null
                    ? "bg-primary/5 border-primary text-primary"
                    : "border-primary/30 text-primary/80 hover:border-primary/50 hover:text-primary"
                }`}
              >
                All
              </button>
              {meta.locations.map((loc) => (
                <button
                  key={loc.label}
                  onClick={() =>
                    setSelectedLabel(
                      selectedLabel === loc.label ? null : loc.label,
                    )
                  }
                  className={`px-4 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors border hover:cursor-pointer ${
                    selectedLabel === loc.label
                      ? "bg-primary/5 border-primary text-primary"
                      : "border-primary/30 text-primary/80 hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${categoryId}-${selectedLabel ?? "all"}-${expanded ? "exp" : "col"}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {allDestinations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center max-w-xl mx-auto">
                <p className="text-primary tracking-[0.25em] uppercase mb-4 text-sm">
                  Coming Soon
                </p>
                <h3 className="text-2xl text-primary font-semibold leading-tight mb-4">
                  Curated With Intention
                  <br />
                  <span className="italic font-light">Not by Volume</span>
                </h3>
                <p className="text-primary/80 text-sm leading-relaxed">
                  Destinations are developed intentionally and selectively —
                  check back as our collection grows.
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
                        ? `Showing all ${allDestinations.length} destinations`
                        : `Showing ${Math.min(INITIAL_SHOW, allDestinations.length)} of ${allDestinations.length}`}
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
                          <span>Show Less</span>
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
                            Show {hiddenCount} More {meta.label} Destinations
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
      <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-48">
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dzerxindp/image/upload/v1773382245/header-destination_vcrwin.jpg"
            alt="Indonesia Destinations"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/10 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 pb-10 md:pb-14 lg:pb-24 text-start lg:text-left"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-2 mb-10 mt-6"
          >
            <Link
              href="/destinations"
              className="text-white/80 text-sm tracking-widest uppercase hover:text-white transition-colors"
            >
              Destinations
            </Link>
          </motion.div>
          <motion.p
            variants={fadeInUp}
            className="text-white tracking-[0.3em] mb-5 uppercase"
          >
            Indonesia Destination Weddings
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-white font-semibold leading-tight max-w-4xl uppercase"
          >
            Curated Destination Wedding Experiences Rooted in Bali
            <p className="text-white text-sm md:text-base font-light leading-relaxed mt-10 normal-case">
              While rooted in Bali, we curate select destination weddings across
              Indonesia for couples seeking rare landscapes, cultural depth, and
              emotionally meaningful environments.
            </p>
          </motion.h1>
        </motion.div>
      </section>

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
                Our Approach
              </p>
              <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                Rooted in Bali
                <br />
                <span>Curated Across Indonesia</span>
              </h2>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-4">
              <p className="text-primary mb-6">Design Philosophy:</p>
              <div className="space-y-4">
                {[
                  "Natural integrity",
                  "Cultural depth",
                  "Emotional atmosphere",
                  "Privacy and seclusion",
                  "Design potential",
                  "Guest experience quality",
                ].map((item, i) => (
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
              Bali remains the creative heart of our studio where our planning
              systems, creative process, and core wedding experiences are based.
              From this foundation, we extend our work to select destinations
              across Indonesia that align with our design philosophy.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed text-justify"
            >
              We do not approach Indonesia as a list of locations. We approach
              it as a collection of environments, each offering a distinct
              emotional and experiential quality. Every destination is carefully
              assessed for accessibility, guest comfort, production feasibility,
              and environmental responsibility.
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
              Destination Choice
            </p>
            <h2 className="text-3xl md:text-4xl text-primary font-semibold">
              Why Indonesia
              <br />
              <span>For Destination Weddings</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div variants={fadeInUp} className="space-y-4">
              <h3 className="text-primary mb-6">Indonesia Offers:</h3>
              {[
                "Extraordinary natural diversity",
                "Deep cultural heritage",
                "Spiritually significant landscapes",
                "Remote and exclusive environments",
                "Strong sense of place and ritual",
              ].map((item) => (
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
                    Celebration Styles
                  </p>
                  <h3 className="text-2xl text-white font-semibold mb-4">
                    Indonesia Multi-Day Journeys
                  </h3>
                  <p className="text-white leading-relaxed mb-8">
                    Many Indonesia destination weddings unfold as retreat-style
                    celebrations, multi-day experiences, culturally inspired
                    gatherings, nature-integrated ceremonies, and intimate,
                    emotionally rich journeys.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Retreat-style celebrations",
                      "Multi-day experiences",
                      "Culturally inspired gatherings",
                      "Nature-integrated ceremonies",
                    ].map((item, i) => (
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
              Explore by Category
            </p>
            <h2 className="text-3xl md:text-4xl text-primary font-semibold">
              Where Would You Like to Celebrate?
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
                      {meta.label}
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
                    {meta.label}
                    <span
                      className={`block text-sm italic font-light mt-0.5 ${
                        isActive ? "text-white/80" : "text-primary/80"
                      }`}
                    >
                      Destinations
                    </span>
                  </h3>

                  <p
                    className={`text-xs leading-relaxed line-clamp-3 mb-5 ${
                      isActive ? "text-white" : "text-primary"
                    }`}
                  >
                    {meta.description}
                  </p>

                  {meta.locations.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-5">
                      {meta.locations.slice(0, 4).map((loc) => (
                        <span
                          key={loc.label}
                          className={`text-xs tracking-wide px-2 py-0.5 border ${
                            isActive
                              ? "border-white/50 text-white"
                              : "border-primary/30 text-primary"
                          }`}
                        >
                          {loc.label}
                        </span>
                      ))}
                      {meta.locations.length > 4 && (
                        <span
                          className={`text-xs tracking-wide px-2 py-0.5 ${
                            isActive ? "text-white" : "text-primary"
                          }`}
                        >
                          +{meta.locations.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                  <div
                    className={`flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-transform duration-300 group-hover:translate-x-1 ${
                      isActive ? "text-white" : "text-primary"
                    }`}
                  >
                    Explore
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
      <motion.section
        className="relative py-24 lg:py-36 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dzerxindp/image/upload/v1773318397/destination-closing_eie0gt.png"
            alt="Your Bali destination wedding"
            fill
            loading="lazy"
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 text-center">
          <motion.p
            variants={fadeInUp}
            className="text-white tracking-[0.25em] uppercase mb-4"
          >
            Begin Your Journey
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-semibold leading-tight max-w-4xl mx-auto uppercase"
          >
            Ready to Plan Your
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl italic font-light normal-case">
              Destination Wedding?
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            Explore the destinations above or begin a conversation with us to
            shape a destination wedding experience that reflects your vision.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <Link href="https://wa.me/628113980998" target="_blank">
              <button className="bg-white text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/90 hover:cursor-pointer transition-colors duration-300">
                BEGIN YOUR STORY
              </button>
            </Link>
            <Link href="/portfolio">
              <button className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/10 hover:cursor-pointer transition-colors duration-300">
                VIEW PORTFOLIO
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
