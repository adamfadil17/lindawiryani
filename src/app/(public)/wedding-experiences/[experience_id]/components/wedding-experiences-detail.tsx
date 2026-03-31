"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ArrowRight,
  MapPin,
  Users,
  ArrowLeft,
} from "lucide-react";
import { fadeIn, fadeInUp, scaleIn, staggerContainer } from "@/lib/motion";

import type { WeddingExperience } from "@/types";

type ExperienceData = Omit<
  WeddingExperience,
  "venues" | "themes" | "portfolios"
>;
import VenueDetailModal from "@/components/shared/venue-detail-modal";
import type { Venue, WeddingTheme, Currency } from "@/types";

// ─── Shared components ────────────────────────────────────────────────────────

function Breadcrumb({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/wedding-experiences"
        className="text-white/80 text-sm tracking-widest uppercase hover:text-white transition-colors"
      >
        Wedding Experiences
      </Link>
      <span className="text-white text-sm">/</span>
      <span className="text-white text-sm font-simbold tracking-widest uppercase truncate max-w-[240px]">
        {label}
      </span>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-primary/20 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left hover:cursor-pointer group"
      >
        <span className="text-primary font-semibold text-sm md:text-base pr-6 group-hover:text-primary/80 transition-colors">
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <p className="text-primary/80 leading-relaxed pb-5">{a}</p>}
    </div>
  );
}

// ─── Hero variants ────────────────────────────────────────────────────────────

function HeroSplit({ data }: { data: ExperienceData }) {
  return (
    <section className="relative min-h-[80vh] md:min-h-[70vh] lg:min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-48">
      <div className="absolute inset-0">
        <Image
          src={data.hero_image}
          alt={data.name}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/10 to-black/20" />
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
          <Breadcrumb label={data.name} />
        </motion.div>
        <motion.p
          variants={fadeInUp}
          className="text-white tracking-[0.3em] uppercase mb-5"
        >
          {`${data.name} Planner in Bali`}
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-white font-semibold leading-tight max-w-4xl uppercase"
        >
          {data.name}
          <br />
          <span>{"in Bali"}</span>
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="text-white/80 max-w-3xl leading-relaxed mt-6"
        >
          {data.hero_desc}
        </motion.p>
        <motion.div variants={fadeInUp} className="mt-10">
          <Link href="https://wa.me/628113980998" target="_blank">
            <button className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-primary hover:cursor-pointer transition-colors duration-300">
              INQUIRE NOW
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

function HeroBottomSplit({ data }: { data: ExperienceData }) {
  return (
    <section className="relative min-h-[80vh] md:min-h-[70vh] lg:min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-48">
      <div className="absolute inset-0">
        <Image
          src={data.hero_image}
          alt={data.name}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/10 to-black/20" />
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
          <Breadcrumb label={data.name} />
        </motion.div>
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <motion.p
              variants={fadeInUp}
              className="text-white tracking-[0.3em] uppercase mb-5"
            >
              {`${data.name} Planner in Bali`}
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-white font-semibold leading-tight max-w-4xl uppercase"
            >
              {data.name}
              <br />
              <span>{"in Bali"}</span>
            </motion.h1>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <motion.p
              variants={fadeInUp}
              className="text-white/80 leading-relaxed border-l border-white/80 pl-6"
            >
              {data.hero_desc}
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-8">
              <Link href="https://wa.me/628113980998" target="_blank">
                <button className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-primary hover:cursor-pointer transition-colors duration-300">
                  INQUIRE NOW
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function HeroCentered({ data }: { data: ExperienceData }) {
  return (
    <section className="relative min-h-[80vh] md:min-h-[70vh] lg:min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-48">
      <div className="absolute inset-0">
        <Image
          src={data.hero_image}
          alt={data.name}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/10 to-black/20" />
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
          <Breadcrumb label={data.name} />
        </motion.div>
        <motion.p
          variants={fadeInUp}
          className="text-white tracking-[0.3em] uppercase mb-5"
        >
          {`${data.name} Planner in Bali`}
        </motion.p>
        <motion.div variants={fadeInUp} className="mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-white font-semibold leading-tight max-w-4xl uppercase">
            {data.name}
            <br />
            <span>{"in Bali"}</span>
          </h1>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          className="w-16 h-px bg-white/80 mb-6"
        />
        <motion.p
          variants={fadeInUp}
          className="text-white/80 max-w-3xl leading-relaxed mb-10"
        >
          {data.hero_desc}
        </motion.p>
        <motion.div variants={fadeInUp}>
          <Link href="https://wa.me/628113980998" target="_blank">
            <button className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-primary hover:cursor-pointer transition-colors duration-300">
              INQUIRE NOW
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

function HeroEditorial({ data }: { data: ExperienceData }) {
  return (
    <section className="relative min-h-[80vh] md:min-h-[70vh] lg:min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-48">
      <div className="absolute inset-0">
        <Image
          src={data.hero_image}
          alt={data.name}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/10 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
      </div>
      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 pb-20 lg:pb-28 flex flex-col"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div
          variants={fadeInUp}
          className="flex items-center gap-2 mb-12 mt-6"
        >
          <Breadcrumb label={data.name} />
        </motion.div>
        <motion.p
          variants={fadeInUp}
          className="text-white tracking-[0.3em] uppercase mb-5"
        >
          {`${data.name} Planner in Bali`}
        </motion.p>
        <motion.div variants={fadeInUp}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-white font-semibold leading-tight max-w-4xl uppercase">
            {data.name}
            <br />
            <span>{"in Bali"}</span>
          </h1>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          className="mt-10 w-16 h-px bg-white/80"
        />
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <motion.p
            variants={fadeInUp}
            className="text-white/80 max-w-sm leading-relaxed"
          >
            {data.hero_desc}
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="https://wa.me/628113980998" target="_blank">
              <button className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-primary hover:cursor-pointer transition-colors duration-300">
                INQUIRE NOW
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Section components ────────────────────────────────────────────────────────

function SectionIntro({ data }: { data: ExperienceData }) {
  return (
    <motion.section
      className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-20 lg:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15, margin: "0px 0px -100px 0px" }}
      variants={staggerContainer}
    >
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-5 space-y-8">
          <motion.div variants={fadeInUp}>
            <p className="text-primary tracking-[0.25em] uppercase mb-3">
              {data.intro_label}
            </p>
            <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
              {data.intro_heading[0]}
              <br />
              <span>{data.intro_heading[1]}</span>
            </h2>
          </motion.div>
          <motion.div variants={fadeInUp} className="space-y-0">
            {data.intro_list_label && (
              <p className="text-primary italic mb-4">
                {data.intro_list_label}
              </p>
            )}
            {data.intro_list.map((item, i) => (
              <div
                key={item}
                className="flex items-center gap-4 py-3.5 border-b border-primary/20 last:border-0"
              >
                <span className="text-primary font-mono w-5 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-primary">{item}</span>
              </div>
            ))}
          </motion.div>
          {data.intro_footnote && (
            <motion.p
              variants={fadeInUp}
              className="text-primary italic leading-relaxed border-t border-primary/20 pt-5"
            >
              {data.intro_footnote}
            </motion.p>
          )}
        </div>
        <div className="lg:col-span-7 space-y-8">
          <motion.p
            variants={fadeInUp}
            className="text-primary leading-relaxed text-justify"
          >
            {data.intro_body}
          </motion.p>
          {/* Staggered image pair */}
          <motion.div variants={scaleIn} className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={data.approach_image}
                alt={data.name}
                fill
                loading="lazy"
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden mt-8">
              <Image
                src={data.hero_image}
                alt={data.name}
                fill
                loading="lazy"
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function SectionApproach({ data }: { data: ExperienceData }) {
  return (
    <motion.section
      className="bg-primary/15 py-20 lg:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
      variants={staggerContainer}
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            variants={fadeIn}
            className="lg:col-span-6 relative h-[50vh] lg:h-[520px] overflow-hidden"
          >
            <Image
              src={data.approach_image}
              alt={data.approach_heading[0]}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <div className="lg:col-span-6 space-y-8">
            <motion.div variants={fadeInUp}>
              <p className="text-primary tracking-[0.25em] uppercase mb-3">
                {data.approach_label}
              </p>
              <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                {data.approach_heading[0]}
                <br />
                <span>{data.approach_heading[1]}</span>
              </h2>
            </motion.div>
            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed text-justify"
            >
              {data.approach_body}
            </motion.p>
            <motion.div variants={fadeInUp} className="space-y-0">
              {data.approach_list_label && (
                <p className="text-primary italic mb-4">
                  {data.approach_list_label}
                </p>
              )}
              {data.approach_list.map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-4 py-3.5 border-b border-primary/20 last:border-0"
                >
                  <span className="text-primary font-mono w-5 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-primary">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function SectionServices({ data }: { data: ExperienceData }) {
  return (
    <motion.section
      className="py-20 lg:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
      variants={staggerContainer}
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div variants={fadeInUp} className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-primary tracking-[0.25em] uppercase mb-3">
                {data.services_label}
              </p>
              <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                {data.services_heading[0]}
                <br />
                <span>{data.services_heading[1]}</span>
              </h2>
            </div>
            <div className="space-y-0">
              {data.services_list.map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-4 py-3.5 border-b border-primary/20 last:border-0"
                >
                  <span className="text-primary font-mono w-5 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-primary">{item}</span>
                </div>
              ))}
            </div>
            {data.services_footnote && (
              <p className="text-primary italic leading-relaxed border-t border-primary/20 pt-5">
                {data.services_footnote}
              </p>
            )}
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-7 bg-primary p-10 lg:p-14 space-y-6"
          >
            <p className="text-white tracking-[0.25em] uppercase">
              {data.services_dark_label}
            </p>
            <h3 className="text-2xl md:text-3xl text-white font-semibold leading-tight">
              {data.services_dark_heading[0]}
              <br />
              <span>{data.services_dark_heading[1]}</span>
            </h3>
            <p className="text-white/80 leading-relaxed">
              {data.services_dark_body}
            </p>
            <div className="space-y-0 pt-2">
              {data.services_dark_list.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 py-3 border-b border-white/20 last:border-0"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function SectionClosing({ data }: { data: ExperienceData }) {
  return (
    <motion.section
      className="relative py-24 lg:py-32 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
      variants={staggerContainer}
    >
      <div className="absolute inset-0">
        <Image
          src={data.closing_image}
          alt="Closing"
          fill
          loading="lazy"
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/72" />
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        {data.closing_couple_values.length > 0 ? (
          /* Two-column closing for villa page */
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6 space-y-8">
              <motion.div variants={fadeInUp}>
                <p className="text-white tracking-[0.25em] uppercase mb-3">
                  {data.closing_label}
                </p>
                <h2 className="text-3xl md:text-4xl text-white uppercase font-semibold">
                  {data.closing_heading[0]}
                  <br />
                  <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl italic font-light normal-case">
                    {data.closing_heading[1]}
                  </span>
                </h2>
              </motion.div>
              <motion.p
                variants={fadeInUp}
                className="text-white/80 leading-relaxed"
              >
                {data.closing_body}
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-4 justify-start"
              >
                <Link href="https://wa.me/628113980998" target="_blank">
                  <button className="bg-white text-primary font-semibold px-8 py-3 text-xs tracking-widest hover:bg-white/90 hover:cursor-pointer transition-colors duration-300">
                    BEGIN YOUR STORY
                  </button>
                </Link>
                <Link href="/wedding-concepts">
                  <button className="border border-white text-white font-semibold px-8 py-3 text-xs tracking-widest hover:bg-white/10 hover:cursor-pointer transition-colors duration-300">
                    VIEW WEDDING CONCEPTS
                  </button>
                </Link>
              </motion.div>
            </div>
            {data.closing_couple_label && (
              <div className="lg:col-span-6 space-y-1">
                <motion.div variants={fadeInUp}>
                  <p className="text-white italic mb-5">
                    {data.closing_couple_label}
                  </p>
                  {data.closing_couple_values.map((v) => (
                    <div
                      key={v}
                      className="flex items-center gap-4 py-3 border-b border-white/40"
                    >
                      <div className="w-3 h-px bg-white/80 flek-shrink-0" />
                      <span className="text-white">{v}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            )}
          </div>
        ) : (
          /* Centered closing for other pages */
          <div className="text-center max-w-3xl mx-auto">
            <motion.p
              variants={fadeInUp}
              className="text-white tracking-[0.25em] uppercase mb-4"
            >
              {data.closing_label}
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl lg:text-6xl text-white uppercase font-semibold leading-tight"
            >
              {data.closing_heading[0]}
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl italic font-light normal-case">
                {data.closing_heading[1]}
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-white/80 max-w-xl mx-auto leading-relaxed"
            >
              {data.closing_body}
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-wrap gap-4 justify-center"
            >
              <Link href="https://wa.me/628113980998" target="_blank">
                <button className="bg-white text-primary font-semibold px-8 py-3 text-xs tracking-widest hover:bg-white/90 hover:cursor-pointer transition-colors duration-300">
                  BEGIN YOUR STORY
                </button>
              </Link>
              <Link href="/wedding-concepts">
                <button className="border border-white text-white font-semibold px-8 py-3 text-xs tracking-widest hover:bg-white/10 hover:cursor-pointer transition-colors duration-300">
                  VIEW WEDDING CONCEPTS
                </button>
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </motion.section>
  );
}

function SectionFaq({ data }: { data: ExperienceData }) {
  return (
    <motion.section
      className="py-20 lg:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
      variants={staggerContainer}
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div variants={fadeInUp} className="lg:col-span-4">
            <p className="text-primary tracking-[0.25em] uppercase mb-3">FAQ</p>
            <h2 className="text-2xl md:text-3xl text-primary font-semibold">
              {data.name}
              <br />
              <span>Questions</span>
            </h2>
          </motion.div>
          <motion.div variants={fadeIn} className="lg:col-span-8">
            {data.faqs.map((faq) => (
              <FaqItem key={faq.question} q={faq.question} a={faq.answer} />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

const useCurrencyConverter = () => {
  const [exchangeRate, setExchangeRate] = useState<number>(15800);
  const CACHE_DURATION = 60 * 60 * 1000;

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const now = Date.now();
      const cachedRate = sessionStorage.getItem("exchangeRate");
      const cachedTime = sessionStorage.getItem("exchangeRateTime");

      if (cachedRate && cachedTime) {
        const timeDiff = now - Number.parseInt(cachedTime);
        if (timeDiff < CACHE_DURATION) {
          setExchangeRate(Number.parseFloat(cachedRate));
          return;
        }
      }

      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD",
        );
        const data = await response.json();
        const rate = data.rates.IDR;
        setExchangeRate(rate);
        sessionStorage.setItem("exchangeRate", rate.toString());
        sessionStorage.setItem("exchangeRateTime", now.toString());
      } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
      }
    };
    fetchExchangeRate();
  }, []);

  return exchangeRate;
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

// ─── Section Venue List ────────────────────────────────────────────────────────

interface SectionVenueListProps {
  experience: ExperienceData;
  allVenues: Venue[];
  elopementThemes: WeddingTheme[];
  intimateThemes: WeddingTheme[];
  locations: string[];
}

function SectionVenueList({
  experience,
  allVenues,
  elopementThemes,
  intimateThemes,
  locations,
}: SectionVenueListProps) {
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("IDR");
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [currentVenueSlide, setCurrentVenueSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedVenueForModal, setSelectedVenueForModal] =
    useState<Venue | null>(null);

  const exchangeRate = useCurrencyConverter();

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 1024);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    setCurrentVenueSlide(0);
    setVisibleCount(6);
  }, [selectedLocation]);

  const filteredVenues = useMemo(() => {
    let list = allVenues.filter((v) => v.experience_id === experience.id);

    if (selectedLocation !== "All") {
      list = list.filter((v) => v.destination?.name === selectedLocation);
    }

    return list;
  }, [allVenues, experience.id, selectedLocation]);

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

  const categoryDescriptions: Record<string, string> = {
    luxury_weddings:
      "A curated selection of venues known for distinctive architecture, setting, and experience.",
    private_villa_weddings:
      "Exclusive private estates offering intimacy, flexibility, and a deeply personal celebration experience.",
    elopement_weddings:
      "Intimate settings designed for couples seeking privacy, meaning, and extraordinary surroundings.",
    intimate_weddings:
      "Thoughtfully curated venues for scaled celebrations — connection, elegance, and refined hospitality.",
  };

  return (
    <>
      <motion.section
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
              <p className="text-primary text-justify leading-relaxed">
                We curate venues not by popularity, but by their ability to hold
                emotion, beauty, and experience. Each space is selected for its
                architectural character, natural environment, privacy, and
                creative potential.
              </p>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-8 mb-4 flex-wrap"
          >
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
                  <span>{selectedCurrency}</span>
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
                          setSelectedCurrency(currency);
                          setIsCurrencyDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 transition-colors hover:cursor-pointer ${
                          selectedCurrency === currency
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

          {/* Venue Cards */}
          <motion.div variants={fadeInUp} className="mb-10">
            <div className="mb-12 text-center">
              <p className="text-base md:text-lg text-primary max-w-3xl mx-auto leading-relaxed">
                {categoryDescriptions[experience.category]}
              </p>
            </div>

            {isMobile ? (
              <div className="relative">
                <AnimatePresence mode="wait">
                  {filteredVenues.length > 0 && (
                    <motion.div
                      key={currentVenueSlide}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <VenueCard
                        venue={filteredVenues[currentVenueSlide]}
                        selectedCurrency={selectedCurrency}
                        exchangeRate={exchangeRate}
                        onClick={() =>
                          setSelectedVenueForModal(
                            filteredVenues[currentVenueSlide],
                          )
                        }
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                {filteredVenues.length > 1 && (
                  <>
                    <button
                      onClick={prevVenueSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white"
                    >
                      <ArrowLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={nextVenueSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white"
                    >
                      <ArrowRight className="w-6 h-6 text-white" />
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
                {filteredVenues.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {visibleVenues.map((venue) => (
                        <VenueCard
                          key={venue.id}
                          venue={venue}
                          selectedCurrency={selectedCurrency}
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
                ) : (
                  <div className="text-center py-16">
                    <p className="text-primary text-lg italic">
                      No venues found for the selected location.
                    </p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </motion.section>

      {selectedVenueForModal && (
        <VenueDetailModal
          venue={selectedVenueForModal}
          onClose={() => setSelectedVenueForModal(null)}
          selectedCurrency={selectedCurrency}
          exchangeRate={exchangeRate}
          elopementThemes={elopementThemes}
          intimateThemes={intimateThemes}
        />
      )}
    </>
  );
}

function SectionSubExperiences({
  currentSlug,
  experienceList,
}: {
  currentSlug: string;
  experienceList: WeddingExperience[];
}) {
  const filtered = experienceList.filter((exp) => exp.slug !== currentSlug);
  return (
    <motion.section
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
              Explore Further
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold leading-tight">
              Other Wedding
              <br />
              <span>Experiences</span>
            </h2>
          </div>
          <div className="lg:col-span-7 flex items-end">
            <p className="text-primary text-justify leading-relaxed">
              Each experience below is a distinct celebration style, curated for
              the couples who choose it. Explore the one that resonates most
              with your vision.
            </p>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-10 lg:gap-12">
          {filtered.map((exp, i) => (
            <motion.div key={exp.slug} variants={fadeInUp} custom={i}>
              <Link href={exp.slug} className="group block">
                <div className="relative h-[40vh] lg:h-[420px] overflow-hidden mb-5">
                  <Image
                    src={exp.hero_image}
                    alt={exp.name}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5">
                    <span className="bg-white/90 text-primary text-sm tracking-widest px-3 py-1.5">
                      {exp.name.toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute bottom-5 right-5 w-10 h-10 bg-white/20 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white">
                    <ArrowRight className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
                  </div>
                </div>
                <div>
                  <h3 className="text-primary font-semibold text-xl group-hover:text-primary/70 transition-colors">
                    {exp.name}
                  </h3>
                  <p className="text-primary/70 mt-2 leading-relaxed">
                    {exp.hero_desc}
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-primary text-sm tracking-wider group-hover:text-primary/60 transition-colors">
                    <span>EXPLORE</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function WeddingExperiencesDetail({
  experienceList,
  currentSlug,
  allVenues,
  elopementThemes,
  intimateThemes,
  locations,
}: {
  experienceList: WeddingExperience[];
  currentSlug: string;
  allVenues: Venue[];
  elopementThemes: WeddingTheme[];
  intimateThemes: WeddingTheme[];
  locations: string[];
}) {
  const experience = experienceList.find((e) => e.slug === currentSlug);

  if (!experience) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-primary/50 tracking-[0.25em] text-xs uppercase mb-4">
            404
          </p>
          <h1 className="text-3xl md:text-4xl text-primary font-semibold mb-6">
            Page <span className="italic font-light">not found</span>
          </h1>
          <Link href="/wedding-experiences">
            <button className="border border-primary text-primary font-semibold px-8 py-3 text-xs tracking-widest hover:bg-primary hover:text-white hover:cursor-pointer transition-colors duration-300">
              BACK TO WEDDING EXPERIENCES
            </button>
          </Link>
        </div>
      </main>
    );
  }

  const heroMap: Record<string, React.ReactNode> = {
    split: <HeroSplit data={experience} />,
    bottom: <HeroBottomSplit data={experience} />,
    centered: <HeroCentered data={experience} />,
    editorial: <HeroEditorial data={experience} />,
  };

  return (
    <main className="relative overflow-hidden">
      {heroMap[experience.hero_style]}
      <SectionIntro data={experience} />
      <SectionApproach data={experience} />
      <SectionServices data={experience} />
      <SectionVenueList
        experience={experience}
        allVenues={allVenues}
        elopementThemes={elopementThemes}
        intimateThemes={intimateThemes}
        locations={locations}
      />
      <SectionFaq data={experience} />
      <SectionSubExperiences
        experienceList={experienceList}
        currentSlug={currentSlug}
      />
      <SectionClosing data={experience} />
    </main>
  );
}