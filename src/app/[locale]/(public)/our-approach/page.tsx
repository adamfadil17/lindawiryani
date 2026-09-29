"use client";

import { useTranslations } from "next-intl";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { fadeIn, fadeInUp, scaleIn, staggerContainer } from "@/lib/motion";
import { useOurApproachData } from "@/lib/data/our-approach-data";
import PageClosing from "@/components/shared/page-closing";
import PageHero from "@/components/shared/page-hero";
import { WHATSAPP_URL } from "@/lib/constants";

export default function OurApproachPage() {
  const t = useTranslations("ourApproachPage");
  const planningRef = useRef<HTMLDivElement>(null);
  const { designQualities, phases, pillars, specializations } =
    useOurApproachData();

  return (
    <main className="relative overflow-hidden">
      <PageHero
        image="https://res.cloudinary.com/dzerxindp/image/upload/v1773382153/header-our-approach_kcii2q.png"
        imageAlt="Linda Wiryani Design and Event Planning"
        breadcrumb={t("breadcrumb")}
        breadcrumbHref="/our-approach"
        kicker={t("heroKicker")}
        title={t("heroTitle1")}
        titleSecondLine={t("heroTitle2")}
        spacing="compact"
        overlay="soft"
      />
      <motion.section
        className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div variants={fadeInUp} className="lg:col-span-5">
            <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
              {t("introTitle")}
            </h2>
            <p className="mt-6 text-primary  leading-relaxed">
              {t("introBody")}
            </p>
            <div className="mt-10 w-16 h-px bg-primary/70" />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="lg:col-span-7 space-y-6 text-primary text-justify leading-relaxed"
          >
            <p className="text-primary leading-relaxed text-justify ">
              {t("introP1")}
            </p>
            <p className="text-primary leading-relaxed text-justify ">
              {t("introP2")}
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="bg-primary/15 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7 space-y-8">
              <motion.div variants={fadeInUp}>
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  {t("studioKicker")}
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold">
                  {t("studioTitle")}
                </h2>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-primary leading-relaxed text-justify "
              >
                {t("studioP1")}
              </motion.p>

              <motion.p
                variants={fadeInUp}
                className="text-primary leading-relaxed text-justify "
              >
                {t("studioP2")}
              </motion.p>

              <motion.div variants={fadeInUp}>
                <p className="text-primary  mb-4 italic">
                  {t("qualitiesLead")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {designQualities.map((q) => (
                    <span
                      key={q}
                      className="border border-primary/50 text-primary text-sm tracking-widest hover:bg-primary transition-colors hover:text-white px-4 py-2"
                    >
                      {q}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-primary  italic">
                  {t("qualitiesFooter")}
                </p>
              </motion.div>
            </div>

            <motion.div
              variants={scaleIn}
              className="lg:col-span-5 relative h-[60vh] lg:h-[550px] overflow-hidden"
            >
              <Image
                src="https://res.cloudinary.com/dzerxindp/image/upload/v1773493721/our-studio-our-approach1_b6vweo.png"
                alt="Design-led wedding studio"
                fill
                loading="lazy"
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              variants={fadeIn}
              className="lg:col-span-5 relative h-[50vh] lg:h-[500px] overflow-hidden order-2 lg:order-1"
            >
              <Image
                src="https://res.cloudinary.com/dzerxindp/image/upload/v1773311285/our-roots_ibpu3e.jpg"
                alt="Bali landscape and nature"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </motion.div>

            <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
              <motion.div variants={fadeInUp}>
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  {t("rootsKicker")}
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold">
                  {t("rootsTitle")}
                </h2>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-primary leading-relaxed text-justify "
              >
                {t("rootsP1")}
              </motion.p>

              <motion.p
                variants={fadeInUp}
                className="text-primary leading-relaxed text-justify "
              >
                {t("rootsP2")}
              </motion.p>
              <motion.div variants={fadeInUp} className="space-y-3">
                {[t("venue1"), t("venue2"), t("venue3"), t("venue4")].map(
                  (venue) => (
                    <div key={venue} className="flex items-center gap-4">
                      <div className="w-3 h-px bg-primary/70 flex-shrink-0" />
                      <span className="text-primary">{venue}</span>
                    </div>
                  ),
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={planningRef}
        className="bg-primary/15 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16 lg:mb-20"
          >
            <p className="text-primary tracking-[0.25em] uppercase mb-3">
              {t("phasesKicker")}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold">
              {t("phasesTitle")}
            </h2>
            <p className="mt-6 text-primary  max-w-xl mx-auto text-center leading-relaxed">
              {t("phasesIntro")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.number}
                variants={fadeInUp}
                custom={i}
                className="border border-primary/30 p-8 flex flex-col gap-6 hover:border-primary/80 transition-colors duration-300"
              >
                <span className="text-5xl font-semibold text-primary leading-none">
                  {phase.number}
                </span>
                <h3 className="text-primary font-semibold ">{phase.title}</h3>
                <p className="text-primary leading-relaxed flex-1">
                  {phase.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <motion.section
        className="py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-6 space-y-8">
              <motion.div variants={fadeInUp}>
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  {t("differenceKicker")}
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold">
                  {t("differenceTitle")}
                </h2>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-primary/15 p-8 border-l-2 border-primary"
              >
                <p className="text-primary  italic leading-relaxed">
                  {t("differenceQuote1")}
                  <br />
                  {t("differenceQuote2")}
                </p>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-primary  text-justify leading-relaxed"
              >
                {t("differenceBody")}
              </motion.p>
            </div>

            <div className="lg:col-span-6 space-y-8">
              <motion.div variants={fadeInUp}>
                <p className="text-primary mb-6">{t("pillarsLead")}</p>
                <div className="space-y-4">
                  {pillars.map((pillar, i) => (
                    <motion.div
                      key={pillar}
                      variants={fadeInUp}
                      custom={i}
                      className="flex items-center gap-4 pb-4 border-b border-primary/20 last:border-0"
                    >
                      <span className="text-primary font-mono w-6 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-primary">{pillar}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section
        className="bg-primary/15 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7 space-y-8">
              <motion.div variants={fadeInUp}>
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  {t("specKicker")}
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold">
                  {t("specTitle")}
                </h2>
              </motion.div>

              <motion.p variants={fadeInUp} className="text-primary">
                {t("specIntro")}
              </motion.p>

              <motion.div variants={fadeInUp} className="space-y-4">
                {specializations.map((item, i) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-3 h-px bg-primary/70 flex-shrink-0" />
                    <span className="text-primary">{item}</span>
                  </div>
                ))}
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-primary italic border-t border-primary/20 pt-6"
              >
                {t("specFooter")}
              </motion.p>
            </div>

            <motion.div
              variants={scaleIn}
              className="lg:col-span-5 relative h-[50vh] lg:h-[480px] overflow-hidden"
            >
              <Image
                src="/images/service/service4.png"
                alt="Luxury Bali wedding specialization"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <PageClosing
        image="https://res.cloudinary.com/dzerxindp/image/upload/v1773311704/closing_fjcftu.jpg"
        imageAlt="A wedding that feels like you"
        kicker={t("closingKicker")}
        titleLine1={t("closingTitle1")}
        titleLine2={t("closingTitle2")}
        body={t("closingBody")}
        primaryCta={{
          label: t("ctaBegin"),
          href: WHATSAPP_URL,
          external: true,
        }}
        secondaryCta={{ label: t("ctaServices"), href: "/services" }}
        spacing="relaxed"
      />
    </main>
  );
}
