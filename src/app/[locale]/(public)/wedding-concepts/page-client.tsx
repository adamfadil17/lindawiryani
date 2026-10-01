"use client";

import { useTranslations } from "next-intl";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { fadeInUp, scaleIn, staggerContainer } from "@/lib/motion";
import { useWeddingConceptsData } from "@/lib/data/wedding-concepts-data";
import WeddingThemesSection from "@/components/shared/wedding-themes";
import VenuesSection from "@/components/shared/venues";
import type { Venue, Currency } from "@/types";
import { useCurrencyConverter } from "@/hook/useCurrencyConverter";
import PageClosing from "@/components/shared/page-closing";
import PageHero from "@/components/shared/page-hero";
import { WHATSAPP_URL } from "@/lib/constants";

export default function WeddingConceptsPage() {
  const tNav = useTranslations("nav");
  const t = useTranslations("weddingConceptsPage");
  const {
    conceptLayers,
    venueCurationConsiderations,
    stylingFocusAreas,
    editorialSources,
    planningJourney,
  } = useWeddingConceptsData();
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
      <PageHero
        image="https://res.cloudinary.com/dzerxindp/image/upload/v1773317740/header-wedding-concepts_et47hl.jpg"
        imageAlt="Wedding Concepts — Curated Wedding Celebrations"
        breadcrumb={t("breadcrumb")}
        breadcrumbHref="/wedding-concepts"
        kicker={t("heroKicker")}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        breadcrumbSpacing="mb-12"
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
                {t("introTitle")}
              </h2>
            </div>
          </motion.div>

          <div className="lg:col-span-8 space-y-10">
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
              className="border-l-2 border-primary/30 pl-8 py-2"
            >
              <p className="text-primary font-semibold tracking-widest uppercase mb-5">
                {t("journeyLead")}
              </p>
              <div className="space-y-3">
                {[
                  t("journey1"),
                  t("journey2"),
                  t("journey3"),
                  t("journey4"),
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
                {t("exploreVenueList")}
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("wedding-themes-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-primary text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary/90 hover:cursor-pointer transition-colors duration-300"
              >
                {t("exploreThemes")}
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
                {t("layersKicker")}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
                {t("layersTitle")}
              </h2>
            </div>
            <div className="lg:col-span-7 flex items-end">
              <p className="text-white text-justify leading-relaxed">
                {t("layersIntro")}
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
                        <span>{t("explore")}</span>
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
                  {t("venueCurationApproach")}
                </p>
                <p className="text-primary font-semibold text-2xl">
                  {t("venueCurationCurated")}
                </p>
                <p className="text-primary text-sm">
                  {t("venueCurationNotDirectory")}
                </p>
              </div>
            </motion.div>

            <div className="lg:col-span-7 space-y-10">
              <motion.div variants={fadeInUp}>
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  {t("conceptLayer")}
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold">
                  {t("venueCurationTitle")}
                </h2>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-primary leading-relaxed text-justify"
              >
                {t("venueCurationP1")}
              </motion.p>

              <motion.div variants={fadeInUp}>
                <p className="text-primary font-semibold tracking-widest uppercase mb-5">
                  {t("venueCriteriaLead")}
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
                {t("venueQuote")}
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
                  {t("exploreVenueListByDestination")}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <WeddingThemesSection
        isMobile={isMobile}
        onExploreVenue={handleExploreVenueFromTheme}
      />

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
                  {t("conceptLayer")}
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                  {t("stylingTitle")}
                </h2>
                <p className="mt-6 text-primary leading-relaxed italic">
                  {t("stylingSubtitle")}
                </p>
              </div>
            </motion.div>

            <div className="lg:col-span-8 space-y-10">
              <motion.p
                variants={fadeInUp}
                className="text-primary leading-relaxed text-justify"
              >
                {t("stylingP1")}
              </motion.p>

              <motion.div variants={fadeInUp}>
                <p className="text-primary font-semibold tracking-widest uppercase mb-6">
                  {t("stylingFocusLead")}
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {stylingFocusAreas.map((item, i) => (
                    <div
                      key={item}
                      className="flex items-center gap-4 p-4 border border-primary/30 bg-white/40"
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
                className="border-l-2 border-primary/30 pl-8 py-2"
              >
                <p className="text-primary font-semibold tracking-widest uppercase mb-4">
                  {t("stylingSupportsLead")}
                </p>
                <div className="space-y-3">
                  {[
                    tNav("weddingExperiencesSubmenu.privateVilla"),
                    tNav("weddingExperiencesSubmenu.intimate"),
                    tNav("weddingExperiencesSubmenu.elopement"),
                    tNav("weddingExperiencesSubmenu.luxury"),
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
                {t("conceptLayer")}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold leading-tight">
                {t("editorialTitle")}
              </h2>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed mb-10 text-justify"
            >
              {t("editorialP1")}
            </motion.p>

            <motion.div variants={fadeInUp} className="mb-10">
              <p className="text-primary italic mb-6">{t("weDrawFrom")}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {editorialSources.map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 p-4 border border-primary/30 bg-white/40"
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
                {t("editorialHelpsLead")}
              </p>
              <div className="space-y-3">
                {[
                  t("editorialHelp1"),
                  t("editorialHelp2"),
                  t("editorialHelp3"),
                  t("editorialHelp4"),
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
                  {t("viewPortfolio")}
                </button>
              </Link>
              <Link href="/journal">
                <button className="bg-primary text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary/90 hover:cursor-pointer transition-colors duration-300">
                  {t("readJournal")}
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
                {t("journeyKicker")}
              </p>
              <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                {t("journeyTitle1")}
                <br />
                {t("journeyTitle2")}
                <br />
                <span className="italic font-light">{t("journeyTitle3")}</span>
              </h2>
              <p className="mt-6 text-primary leading-relaxed italic">
                {t("journeySubtitle")}
              </p>
            </motion.div>

            <div className="lg:col-span-7 space-y-10">
              <motion.div variants={fadeInUp}>
                <div className="space-y-4">
                  {planningJourney.map((item, i) => (
                    <div
                      key={item}
                      className="flex items-center gap-6 p-5 border border-primary/30 bg-white/40"
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
                    {t("exploreApproach")}
                  </button>
                </Link>
                <Link href="/wedding-experiences">
                  <button className="bg-primary text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary/90 hover:cursor-pointer transition-colors duration-300">
                    {t("viewExperiences")}
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <PageClosing
        image="https://res.cloudinary.com/dzerxindp/image/upload/v1773156606/wedding_concepts_closing_wvmfpu.jpg"
        imageAlt="Begin Your Wedding Concept Journey"
        kicker={t("closingKicker")}
        titleLine1={t("closingTitle1")}
        titleLine2={t("closingTitle2")}
        body={t("closingBody")}
        primaryCta={{
          label: t("ctaBegin"),
          href: WHATSAPP_URL,
          external: true,
        }}
        secondaryCta={{ label: t("ctaViewPortfolio"), href: "/portfolio" }}
      />
    </main>
  );
}
