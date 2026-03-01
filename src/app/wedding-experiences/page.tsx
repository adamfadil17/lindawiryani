"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fadeIn, fadeInUp, scaleIn, staggerContainer } from "@/lib/motion";


import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { coupleValues, designFoundation, faqs, fullServiceIncludes, hospitalityValues, subExperiences, whyBali } from "@/lib/data/wedding-experiences/wedding-experiences-data";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-primary/20 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left hover:cursor-pointer group"
      >
        <span className="text-primary font-semibold md: pr-6 group-hover:text-primary/80 transition-colors">
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WeddingExperiencesPage() {
  return (
    <main className="relative overflow-hidden">
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-48">
        <div className="absolute inset-0">
          <Image
            src="https://placehold.net/default.svg"
            alt="Bali Destination Wedding"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Layered overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/34 via-black/10 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 pb-20 lg:pb-28"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Breadcrumb */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-2 mb-12 mt-6"
          >
            <Link
              href="/wedding-experiences"
              className="text-white/80 text-sm tracking-widest uppercase hover:text-white transition-colors"
            >
              Wedding Experiences
            </Link>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-white tracking-[0.3em] uppercase mb-5"
          >
            Bali Destination Wedding Planner
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-white font-semibold leading-tight max-w-4xl uppercase"
          >
            Luxury Destination
            <br />
            <span className="italic font-light normal-case">
              Wedding Planning in Bali
            </span>
          </motion.h1>
        </motion.div>

        {/* Vertical label */}
      </section>

      {/* ── INTRO SPLIT ───────────────────────────────────────────────── */}
      <motion.section
        className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left sticky label */}
          <motion.div variants={fadeInUp} className="lg:col-span-4 lg:pt-2">
            <div className="lg:sticky lg:top-32">
              <div className="w-16 h-px bg-primary/70 mb-6" />
              <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                A destination
                <br />
                wedding in Bali
                <br />
                <span className="italic font-light">
                  is more than a location.
                </span>
              </h2>
            </div>
          </motion.div>

          {/* Right content */}
          <div className="lg:col-span-8 space-y-10">
            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed text-justify "
            >
              It is an experience shaped by atmosphere, culture, landscape, and
              emotion. At Linda Wiryani Design and Event Planning, we specialize
              in luxury destination wedding planning in Bali, designing weddings
              that are intentional, refined, and deeply personal.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed text-justify "
            >
              Our approach blends design artistry, hospitality precision, and
              local expertise to create weddings that feel effortless, elevated,
              and meaningful. We work with couples from around the world who are
              drawn to Bali for its natural beauty, spiritual depth, and
              intimate sense of escape.
            </motion.p>

            {/* Why Bali */}
            <motion.div
              variants={fadeInUp}
              className="border-l-2 border-primary pl-8 py-2"
            >
              <p className="text-primary font-semibold tracking-widest uppercase mb-5">
                Why Choose Bali
              </p>
              <p className="text-primary  mb-5 italic">
                Bali offers a rare diversity of environments within one island:
              </p>
              <div className="space-y-3">
                {whyBali.map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-5 h-px bg-primary flex-shrink-0" />
                    <span className="text-primary">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-primary italic leading-relaxed ">
                Beyond scenery, Bali carries a sense of calm, ritual, and
                natural rhythm that makes destination weddings here feel deeply
                memorable — not just visually beautiful.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── DESIGN-LED STUDIO ─────────────────────────────────────────── */}
      <motion.section
        className="relative py-20 lg:py-28 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        {/* Background texture block */}
        <div className="absolute inset-0 bg-primary/10" />
        <div className="absolute top-0 right-0 w-1/3 h-full hidden lg:block">
          <Image
            src="https://placehold.net/default.svg"
            alt="Design-led studio"
            fill
            loading="lazy"
            className="object-cover opacity-40"
            sizes="33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="max-w-3xl">
            <motion.div variants={fadeInUp} className="mb-10">
              <p className="text-primary tracking-[0.25em] uppercase mb-3">
                Our Studio
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold leading-tight">
                A Design Led
                <br />
                <span className="italic font-light">
                  Destination Wedding Studio
                </span>
              </h2>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed mb-10 text-justify "
            >
              We are not a template-based wedding organizer. Linda Wiryani
              Design and Event Planning was built as a design-led wedding
              planning studio. From this foundation, we create a complete
              concept — spatial design, styling direction, color harmony, floral
              identity, guest journey, and emotional pacing.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <p className="text-primary italic mb-6 ">
                Every destination wedding begins with:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {designFoundation.map((item, i) => (
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
          </div>
        </div>
      </motion.section>

      {/* ── FULL SERVICE ──────────────────────────────────────────────── */}
      <motion.section
        className="py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Image */}
            <motion.div
              variants={scaleIn}
              className="lg:col-span-5 relative h-[55vh] lg:h-[600px] overflow-hidden"
            >
              <Image
                src="https://placehold.net/default.svg"
                alt="Full service destination wedding planning"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              {/* Floating stat */}
              <div className="absolute bottom-6 left-6 bg-white/90 px-6 py-4">
                <p className="text-primary text-sm tracking-widest uppercase mb-1">
                  Experience
                </p>
                <p className="text-primary font-semibold text-2xl">~20 Years</p>
                <p className="text-primary text-sm">
                  5-star luxury hospitality
                </p>
              </div>
            </motion.div>

            {/* Content */}
            <div className="lg:col-span-7 space-y-10">
              <motion.div variants={fadeInUp}>
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  What We Do
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold">
                  Full Service
                  <br />
                  <span className="italic font-light">
                    Destination Wedding Planning
                  </span>
                </h2>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="grid sm:grid-cols-2 gap-3"
              >
                {fullServiceIncludes.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-px bg-primary/50 flex-shrink-0 mt-2.5" />
                    <span className="text-primary">{item}</span>
                  </div>
                ))}
              </motion.div>

              {/* Hospitality values */}
              <motion.div variants={fadeInUp}>
                <p className="text-primary tracking-widest uppercase mb-5">
                  Hospitality-Driven Execution
                </p>
                <div className="flex flex-wrap gap-3">
                  {hospitalityValues.map((v) => (
                    <span
                      key={v}
                      className="border border-primary/80 text-primary text-sm tracking-wider px-4 py-2"
                    >
                      {v}
                    </span>
                  ))}
                </div>
                <p className="mt-6 text-primary italic leading-relaxed ">
                  We treat your wedding not as an event, but as a curated
                  experience from the first arrival to the final farewell.
                </p>
              </motion.div>

              {/* Couple values */}
              <motion.div
                variants={fadeInUp}
                className="pt-6 border-t border-primary/20"
              >
                <p className="text-primary  mb-4 italic">
                  Chosen by couples who value:
                </p>
                <div className="space-y-2">
                  {coupleValues.map((v) => (
                    <div key={v} className="flex items-center gap-3">
                      <div className="w-5 h-px bg-primary/50 flex-shrink-0" />
                      <span className="text-primary">{v}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── SUB-EXPERIENCES GRID ──────────────────────────────────────── */}
      <motion.section
        className="bg-primary py-16 md:py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05, margin: "0px 0px -80px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-16 lg:px-24">
          <motion.div
            variants={fadeInUp}
            className="mb-10 md:mb-14 lg:mb-20 grid lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8"
          >
            <div className="lg:col-span-5">
              <p className="text-white tracking-[0.25em] uppercase mb-3">
                Explore Further
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
                Wedding
                <br />
                <span className="italic font-light">Experiences</span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:flex lg:items-end">
              <p className="text-white text-justify leading-relaxed text-sm sm:text-base">
                Each experience below is a distinct celebration style, curated
                for the couples who choose it. Explore the one that resonates
                most with your vision.
              </p>
            </div>
          </motion.div>

          {/* 2×2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-8 lg:gap-12">
            {subExperiences.map((exp, i) => (
              <motion.div key={exp.href} variants={fadeInUp} custom={i}>
                <Link href={exp.href} className="group block">
                  <div className="relative h-[52vw] sm:h-[38vh] md:h-[40vh] lg:h-[420px] overflow-hidden mb-4 md:mb-5">
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                    {/* Tag */}
                    <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                      <span className="bg-white/90 text-primary text-xs sm:text-sm tracking-widest px-2.5 py-1 sm:px-3 sm:py-1.5">
                        {exp.tag.toUpperCase()}
                      </span>
                    </div>
                    {/* Arrow CTA */}
                    <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 bg-white/20 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white">
                      <ArrowRight className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  <div className="px-0.5">
                    <h3 className="text-white font-semibold text-lg sm:text-xl group-hover:text-white/80 transition-colors leading-snug">
                      {exp.title}{" "}
                      {exp.subtitle && (
                        <span className="italic font-light">
                          {exp.subtitle}
                        </span>
                      )}
                    </h3>
                    <p className="text-white/90 mt-2 leading-relaxed text-sm sm:text-base">
                      {exp.desc}
                    </p>
                    <div className="flex items-center gap-2 mt-3 sm:mt-4 text-white text-sm tracking-wider group-hover:text-white/80 transition-colors">
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

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
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
              <p className="text-primary tracking-[0.25em] uppercase mb-3">
                FAQ
              </p>
              <h2 className="text-3xl md:text-4xl text-primary font-semibold">
                Bali Destination Wedding Planner
                <br />
                <span className="italic font-light">Questions</span>
              </h2>
            </motion.div>
            <motion.div variants={fadeIn} className="lg:col-span-8">
              {faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── CLOSING QUOTE ─────────────────────────────────────────────── */}
      <motion.section
        className="relative py-24 lg:py-36 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0">
          <Image
            src="https://placehold.net/default.svg"
            alt="Your Bali destination wedding"
            fill
            loading="lazy"
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary/72" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 text-center">
          <motion.p
            variants={fadeInUp}
            className="text-white tracking-[0.25em] uppercase mb-4"
          >
            Your Bali Destination Wedding
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-semibold leading-tight max-w-4xl mx-auto uppercase"
          >
            A destination wedding
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl italic font-light normal-case">
              Should never feel generic.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-white/80  max-w-2xl mx-auto leading-relaxed"
          >
            It should feel like a moment that could only happen here, and only
            belong to you. If you are searching for a Bali destination wedding
            planner who designs with intention, artistry, and emotional depth,
            we would be honored to create your celebration.
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
            <Link href="/wedding-concepts">
              <button className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/10 hover:cursor-pointer transition-colors duration-300">
                VIEW WEDDING CONCEPTS
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}