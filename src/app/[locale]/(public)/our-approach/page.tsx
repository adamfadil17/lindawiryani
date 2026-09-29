"use client";

import { useTranslations } from "next-intl";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { fadeIn, fadeInUp, scaleIn, staggerContainer } from "@/lib/motion";
import { useOurApproachData } from "@/lib/data/our-approach-data";

export default function OurApproachPage() {
  const t = useTranslations("ourApproachPage");
  const planningRef = useRef<HTMLDivElement>(null);
  const { designQualities, phases, pillars, specializations } =
    useOurApproachData();

  return (
    <main className="relative overflow-hidden">
      <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-48">
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dzerxindp/image/upload/v1773382153/header-our-approach_kcii2q.png"
            alt="Linda Wiryani Design and Event Planning"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/10 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
        </div>
        \
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
              href="/our-approach"
              className="text-white/80 text-sm tracking-widest uppercase hover:text-white transition-colors"
            >
              {t("breadcrumb")}
            </Link>
          </motion.div>
          <motion.p
            variants={fadeInUp}
            className="text-white tracking-[0.3em] mb-5 uppercase"
          >
            {t("heroKicker")}
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-white font-semibold leading-tight max-w-4xl uppercase"
          >
            {t("heroTitle1")}
            <br />
            <span>{t("heroTitle2")}</span>
          </motion.h1>
        </motion.div>
      </section>
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

      <motion.section
        className="relative py-24 lg:py-36 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dzerxindp/image/upload/v1773311704/closing_fjcftu.jpg"
            alt="A wedding that feels like you"
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
            className="text-white tracking-[0.25em]  uppercase mb-4"
          >
            {t("closingKicker")}
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-semibold leading-tight max-w-4xl mx-auto uppercase"
          >
            {t("closingTitle1")}
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl italic font-light normal-case">
              {t("closingTitle2")}
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-8 text-white/80  max-w-2xl mx-auto text-center leading-relaxed"
          >
            {t("closingBody")}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-12 flex flex-wrap gap-4 justify-center"
          >
            <Link href="https://wa.me/628113980998" target="_blank">
              <button className="bg-white text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer hover:bg-white/90 transition-colors duration-300">
                {t("ctaBegin")}
              </button>
            </Link>
            <Link href="/services">
              <button className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:cursor-pointer  hover:bg-white/10 transition-colors duration-300">
                {t("ctaServices")}
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
