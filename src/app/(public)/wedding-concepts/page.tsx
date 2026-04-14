"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fadeInUp, scaleIn, staggerContainer } from "@/lib/motion";
import {
  conceptLayers,
  venueCurationConsiderations,
  stylingFocusAreas,
  editorialSources,
  planningJourney,
} from "@/lib/data/wedding-concepts-data";
import WeddingThemesSection from "@/components/shared/wedding-themes";
import VenuesSection from "@/components/shared/venues";
import type { Venue, Currency } from "@/types";
import { useCurrencyConverter } from "@/hook/useCurrencyConverter";

export default function WeddingConceptsPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCurrency] = useState<Currency>("IDR");

  const [venueFromTheme, setVenueFromTheme] = useState<Venue | null>(null);

  const exchangeRate = useCurrencyConverter();

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 1024);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleExploreVenueFromTheme = (venue: Venue) => {
    setVenueFromTheme(venue);
  };

  return (
    <main className="relative overflow-hidden">
      <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-48">
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dzerxindp/image/upload/v1773317740/header-wedding-concepts_et47hl.jpg"
            alt="Wedding Concepts — Curated Wedding Celebrations"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/34 via-black/10 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 pb-20 lg:pb-28"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-2 mb-12 mt-6"
          >
            <Link
              href="/wedding-concepts"
              className="text-white/80 text-sm tracking-widest uppercase hover:text-white transition-colors"
            >
              Wedding Concepts
            </Link>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-white tracking-[0.3em] uppercase mb-5"
          >
            Curated Wedding Celebrations
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-white font-semibold leading-tight max-w-4xl uppercase"
          >
            Wedding Concepts
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-white/80 max-w-xl leading-relaxed"
          >
            Thoughtfully designed to help couples explore possibilities, not
            packages.
          </motion.p>
        </motion.div>
      </section>

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
                A creative layer for how weddings are imagined.
              </h2>
            </div>
          </motion.div>

          <div className="lg:col-span-8 space-y-10">
            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed text-justify"
            >
              Our wedding concepts are designed to help couples explore
              possibilities, not packages. Each concept acts as a creative and
              strategic layer that supports how weddings are imagined, designed,
              and experienced.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed text-justify"
            >
              These concepts are not separate steps — they are interconnected.
              Venue curation shapes theme. Theme informs styling. Styling draws
              from editorial inspiration. Together, they form a cohesive design
              language that supports meaningful decision-making and refined
              execution.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="border-l-2 border-primary/50 pl-8 py-2"
            >
              <p className="text-primary font-semibold tracking-widest uppercase mb-5">
                How Concepts Support Your Planning Journey
              </p>
              <div className="space-y-3">
                {[
                  "Meaningful decision-making",
                  "Efficient planning",
                  "Refined execution",
                  "Emotionally resonant celebrations",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-3 h-px bg-primary/70 flex-shrink-0" />
                    <span className="text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById("venue-list-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="border border-primary text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary hover:text-white hover:cursor-pointer transition-colors duration-300"
              >
                EXPLORE VENUE LIST
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("wedding-themes-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-primary text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary/90 hover:cursor-pointer transition-colors duration-300"
              >
                EXPLORE THEMES
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="bg-primary py-20 lg:py-28"
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
              <p className="text-white tracking-[0.25em] uppercase mb-3">
                The Four Layers
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
                Wedding Concept Layers
              </h2>
            </div>
            <div className="lg:col-span-7 flex items-end">
              <p className="text-white text-justify leading-relaxed">
                Each concept layer supports how your celebration is imagined,
                designed, and experienced. Explore each layer to understand how
                they shape your wedding journey.
              </p>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-10 lg:gap-12">
            {conceptLayers.map((layer, i) => {
              const sectionIds = [
                "venue-curation-section",
                "wedding-themes-section",
                "styling-concepts-section",
                "editorial-inspiration-section",
              ];
              const targetId = sectionIds[i];
              return (
                <motion.div key={layer.href} variants={fadeInUp} custom={i}>
                  <button
                    onClick={() =>
                      document
                        .getElementById(targetId)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="group block text-left w-full hover:cursor-pointer"
                  >
                    <div className="relative h-[40vh] lg:h-[380px] overflow-hidden mb-5">
                      <Image
                        src={layer.image}
                        alt={layer.title}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                      <div className="absolute top-5 left-5">
                        <span className="text-white/60 font-mono text-sm tracking-widest">
                          {layer.number}
                        </span>
                      </div>
                      <div className="absolute top-5 right-5">
                        <span className="bg-white/90 text-primary text-sm tracking-widest px-3 py-1.5">
                          {layer.tag.toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute bottom-5 right-5 w-10 h-10 bg-white/20 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white">
                        <ArrowRight className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm tracking-[0.2em] uppercase mb-1">
                        {layer.subtitle}
                      </p>
                      <h3 className="text-white font-semibold text-xl group-hover:text-white/80 transition-colors">
                        {layer.title}
                      </h3>
                      <p className="text-white mt-2 leading-relaxed text-sm">
                        {layer.desc}
                      </p>
                      <div className="flex items-center gap-2 mt-4 text-white text-sm tracking-wider group-hover:text-white/80 transition-colors">
                        <span>EXPLORE</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="venue-curation-section"
        className="py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <motion.div
              variants={scaleIn}
              className="lg:col-span-5 relative h-[55vh] lg:h-[600px] overflow-hidden"
            >
              <Image
                src="https://res.cloudinary.com/dzerxindp/image/upload/v1773156604/venue_curation2_sseeau.jpg"
                alt="Venue Curation"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute bottom-6 left-6 bg-white/90 px-6 py-4">
                <p className="text-primary text-sm tracking-widest uppercase mb-1">
                  Our Approach
                </p>
                <p className="text-primary font-semibold text-2xl">Curated</p>
                <p className="text-primary text-sm">Not a directory</p>
              </div>
            </motion.div>

            <div className="lg:col-span-7 space-y-10">
              <motion.div variants={fadeInUp}>
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  Concept Layer
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold">
                  Venue Curation
                </h2>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-primary leading-relaxed text-justify"
              >
                Venue curation is the foundation of every wedding we design.
                Rather than presenting an exhaustive directory, we provide a
                considered selection of spaces that align with the emotional,
                aesthetic, and logistical requirements of each celebration
                style.
              </motion.p>

              <motion.div variants={fadeInUp}>
                <p className="text-primary font-semibold tracking-widest uppercase mb-5">
                  Our Selection Criteria
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {venueCurationConsiderations.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-3 h-px bg-primary/50 flex-shrink-0 mt-2.5" />
                      <span className="text-primary">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-primary italic leading-relaxed"
              >
                We believe the right venue does more than host a wedding — it
                shapes the entire experience.
              </motion.p>

              <motion.div variants={fadeInUp}>
                <button
                  onClick={() =>
                    document
                      .getElementById("venue-list-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="border border-primary text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary hover:text-white hover:cursor-pointer transition-colors duration-300"
                >
                  EXPLORE VENUE LIST BY DESTINATION
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/*
        WeddingThemesSection menggunakan weddingThemeList dari new-data.
        elopementThemes  = filter type === "ELOPEMENT"
        intimateThemes   = filter type === "INTIMATE"
        Venue name lookup via venueList menggunakan theme.venue_id.
        onExploreVenue meneruskan Venue (tipe baru dari @/types) ke VenuesSection.
      */}
      <WeddingThemesSection
        isMobile={isMobile}
        onExploreVenue={handleExploreVenueFromTheme}
      />

      {/*
        VenuesSection menggunakan venueList, weddingExperienceList,
        dan weddingThemeList dari new-data.
        Filter Experience berdasarkan venue.experience_id.
        Filter Location berdasarkan venue.destination.name.
        VenueDetailModal menerima elopementThemes & intimateThemes.
      */}
      <VenuesSection
        isMobile={isMobile}
        selectedCurrency={selectedCurrency}
        exchangeRate={exchangeRate}
        onVenueSelect={() => {}}
        externalSelectedVenue={venueFromTheme}
        onExternalModalClose={() => setVenueFromTheme(null)}
      />

      <motion.section
        id="styling-concepts-section"
        className="py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <motion.div variants={fadeInUp} className="lg:col-span-4 lg:pt-2">
              <div className="lg:sticky lg:top-32">
                <div className="w-16 h-px bg-primary/70 mb-6" />
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  Concept Layer
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                  Styling Concepts
                </h2>
                <p className="mt-6 text-primary leading-relaxed italic">
                  Styling is never about excess. It is about clarity and
                  harmony.
                </p>
              </div>
            </motion.div>

            <div className="lg:col-span-8 space-y-10">
              <motion.p
                variants={fadeInUp}
                className="text-primary leading-relaxed text-justify"
              >
                Styling concepts translate vision into physical form. This is
                where atmosphere becomes visible — through composition,
                materiality, texture, and restraint. Our styling concepts are
                born from a deep understanding of the venue, the couple's story,
                and the emotional arc of the entire celebration.
              </motion.p>

              <motion.div variants={fadeInUp}>
                <p className="text-primary font-semibold tracking-widest uppercase mb-6">
                  Our Styling Concepts Focus On
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {stylingFocusAreas.map((item, i) => (
                    <div
                      key={item}
                      className="flex items-center gap-4 p-4 border border-primary/40 bg-white/40"
                    >
                      <span className="text-primary font-mono mt-0.5 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-primary">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="border-l-2 border-primary/50 pl-8 py-2"
              >
                <p className="text-primary font-semibold tracking-widest uppercase mb-4">
                  Styling Supports
                </p>
                <div className="space-y-3">
                  {[
                    "Private Villa Weddings",
                    "Intimate Weddings",
                    "Elopement Weddings",
                    "Luxury Weddings",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-4">
                      <div className="w-3 h-px bg-primary flex-shrink-0" />
                      <span className="text-primary">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="editorial-inspiration-section"
        className="relative py-20 lg:py-28 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 bg-primary/10" />
        <div className="absolute top-0 right-0 w-1/3 h-full hidden lg:block">
          <Image
            src="https://res.cloudinary.com/dzerxindp/image/upload/v1773156603/editorial_inspiration_j5twsn.jpg"
            alt="Editorial Inspiration"
            fill
            loading="lazy"
            className="object-cover"
            sizes="33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="max-w-3xl">
            <motion.div variants={fadeInUp} className="mb-10">
              <p className="text-primary tracking-[0.25em] uppercase mb-3">
                Concept Layer
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold leading-tight">
                Editorial Inspiration
              </h2>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed mb-10 text-justify"
            >
              Editorial inspiration is where storytelling begins. Rather than
              copying trends, we draw from a broader world of aesthetic
              references — bridging imagination and reality, guiding both
              creative direction and execution.
            </motion.p>

            <motion.div variants={fadeInUp} className="mb-10">
              <p className="text-primary italic mb-6">
                We draw inspiration from:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {editorialSources.map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 p-4 border border-primary/40 bg-white/40"
                  >
                    <span className="text-primary font-mono mt-0.5 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <p className="text-primary font-semibold tracking-widest uppercase mb-5">
                Editorial Inspiration Helps Couples
              </p>
              <div className="space-y-3">
                {[
                  "Visualize mood and pacing",
                  "Understand scale and restraint",
                  "See how design interacts with place",
                  "Align emotionally with their vision",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-3 h-px bg-primary/70 flex-shrink-0" />
                    <span className="text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link href="/portfolio">
                <button className="border border-primary text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary hover:text-white hover:cursor-pointer transition-colors duration-300">
                  VIEW PORTFOLIO
                </button>
              </Link>
              <Link href="/journal">
                <button className="bg-primary text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary/90 hover:cursor-pointer transition-colors duration-300">
                  READ THE JOURNAL
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <motion.div variants={fadeInUp} className="lg:col-span-5">
              <p className="text-primary tracking-[0.25em] uppercase mb-3">
                From Concept to Celebration
              </p>
              <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                Every celebration
                <br />
                begins with
                <br />
                <span className="italic font-light">understanding.</span>
              </h2>
              <p className="mt-6 text-primary leading-relaxed italic">
                We guide you through each step with calm precision and artistry.
              </p>
            </motion.div>

            <div className="lg:col-span-7 space-y-10">
              <motion.div variants={fadeInUp}>
                <div className="space-y-4">
                  {planningJourney.map((item, i) => (
                    <div
                      key={item}
                      className="flex items-center gap-6 p-5 border border-primary/40 bg-white/40"
                    >
                      <span className="text-primary font-mono flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-primary">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link href="/approach">
                  <button className="border border-primary text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary hover:text-white hover:cursor-pointer transition-colors duration-300">
                    EXPLORE OUR APPROACH
                  </button>
                </Link>
                <Link href="/wedding-experiences">
                  <button className="bg-primary text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary/90 hover:cursor-pointer transition-colors duration-300">
                    VIEW WEDDING EXPERIENCES
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="relative py-24 lg:py-36 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dzerxindp/image/upload/v1773156606/wedding_concepts_closing_wvmfpu.jpg"
            alt="Begin Your Wedding Concept Journey"
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
            Begin Your Wedding Concept Journey
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-semibold leading-tight max-w-4xl mx-auto uppercase"
          >
            Your wedding should feel
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl italic font-light normal-case">
              aligned — not selected.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            We invite you to explore the concepts and venues above, or begin a
            conversation with us to shape a celebration that reflects your
            vision.
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
                VIEW OUR PORTFOLIO
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
