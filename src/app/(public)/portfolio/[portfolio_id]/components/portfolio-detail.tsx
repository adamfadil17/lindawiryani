"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, ArrowLeft } from "lucide-react";
import { fadeIn, fadeInUp, scaleIn, staggerContainer } from "@/lib/motion";
import { portfolioItems } from "@/lib/data/portfolio/portfolio-data";
import type { PortfolioItem } from "@/lib/types/portfolio/portfolio-types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PortfolioDetailProps {
  item: PortfolioItem;
}

function TipTapContent({ html }: { html: string }) {
  return (
    <div
      className="tiptap-content text-primary"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

const experienceLabels: Record<string, string> = {
  "private-villa-weddings": "Private Villa Weddings",
  "intimate-weddings": "Intimate Weddings",
  "elopement-weddings": "Elopement Weddings",
  "luxury-weddings": "Luxury & Multi-Day",
  "bali-destination-wedding": "Destination Weddings in Bali",
};

const destinationLabels: Record<string, string> = {
  uluwatu: "Uluwatu",
  ubud: "Ubud",
  canggu: "Canggu",
  seminyak: "Seminyak",
  sanur: "Sanur",
  kintamani: "Kintamani",
  "nusa-dua": "Nusa Dua",
  "east-bali": "East Bali",
  tabanan: "Tabanan",
  "nusa-penida": "Nusa Penida",
};

// ─── Placeholder gallery ─ replace with real per-wedding image arrays ─────────
// ─── Sub-Components ───────────────────────────────────────────────────────────

function GalleryGrid({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {images.map((src, i) => (
        <motion.div
          key={i}
          variants={fadeInUp}
          className={`relative overflow-hidden aspect-square`}
        >
          <Image
            src={src}
            alt={`Gallery image ${i + 1}`}
            fill
            quality={85}
            className="object-cover hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>
      ))}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PortfolioDetail({ item }: PortfolioDetailProps) {
  const relatedItems = portfolioItems
    .filter(
      (p) =>
        p.id !== item.id &&
        (p.destinationSlug === item.destinationSlug ||
          p.experiences.some((e) => item.experiences.includes(e))),
    )
    .slice(0, 3);

  return (
    <main className="relative overflow-hidden">
      <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-48">
        <div className="absolute inset-0">
          <Image
            src={item.heroImage}
            alt={`${item.couple} — ${item.subtitle}`}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 pb-10 md:pb-14 lg:pb-24 text-start lg:text-left"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Breadcrumb */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-2 mb-10 mt-6"
          >
            <Link
              href="/portfolio"
              className="text-white/80 text-sm tracking-widest uppercase hover:text-white transition-colors"
            >
              Portfolio
            </Link>
            <span className="text-white text-sm">/</span>
            <span className="text-white text-sm font-simbold tracking-widest uppercase truncate max-w-[200px]">
              {item.couple}
            </span>
          </motion.div>

          {/* Tags */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-6">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="bg-white/90 text-primary text-sm tracking-widest px-3 py-1"
              >
                {tag.toUpperCase()}
              </span>
            ))}
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-semibold leading-tight mb-4"
          >
            {item.couple}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-white/80 italic text-lg md:text-xl max-w-2xl mb-6"
          >
            {item.subtitle}
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-2 text-white/80 text-sm"
          >
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>{item.location}</span>
            {item.origin && (
              <>
                <span className="text-white/80">·</span>
                <span>Couple from {item.origin}</span>
              </>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* ── STORY ─────────────────────────────────────────────────────── */}
      <motion.section
        className="py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Sticky sidebar */}
            <motion.div variants={fadeInUp} className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 space-y-8">
                <div>
                  <div className="w-16 h-px bg-primary/70 mb-6" />
                  <p className="text-primary tracking-[0.25em] uppercase mb-3 text-sm">
                    Wedding Details
                  </p>
                  <h2 className="text-2xl md:text-3xl text-primary font-semibold leading-tight">
                    {item.couple}
                    <br />
                    <span className="italic font-light text-xl">
                      A Design Story
                    </span>
                  </h2>
                </div>

                {/* Destination */}
                <div className="space-y-3">
                  <p className="text-primary text-xs tracking-widest uppercase font-semibold">
                    Destination
                  </p>
                  <Link
                    href={`/destinations/${item.destinationSlug}`}
                    className="inline-flex items-center gap-2 border border-primary/30 px-4 py-2.5 text-primary text-sm hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 group"
                  >
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="tracking-wide">
                      {destinationLabels[item.destinationSlug]}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>

                {/* Experiences */}
                <div className="space-y-3">
                  <p className="text-primary text-xs tracking-widest uppercase font-semibold">
                    Wedding Experiences
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.experiences.map((exp) => (
                      <Link
                        key={exp}
                        href={`/wedding-experiences/${exp}`}
                        className="inline-flex items-center gap-2 border border-primary/30 px-4 py-2.5 text-primary text-sm hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 group"
                      >
                        <span className="tracking-wide">
                          {experienceLabels[exp]}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <Link href="https://wa.me/628113980998" target="_blank">
                    <button className="w-full bg-primary text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary/90 hover:cursor-pointer transition-colors duration-300">
                      PLAN YOUR WEDDING
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Story body */}
            <div className="lg:col-span-8 space-y-10">
              {/* Excerpt */}
              <motion.p
                variants={fadeInUp}
                className="text-primary leading-relaxed text-justify text-lg italic"
              >
                {item.excerpt}
              </motion.p>

              {/* Story body — TipTap HTML takes priority; falls back to
                  structured storySections for items not yet in the CMS */}
              {item.content ? (
                <motion.div variants={fadeIn}>
                  <TipTapContent html={item.content} />
                </motion.div>
              ) : (
                item.storySections.map((section, i) => (
                  <motion.div key={i} variants={fadeInUp} className="space-y-5">
                    {section.heading && (
                      <h3 className="text-primary font-semibold text-xl tracking-wide">
                        {section.heading}
                      </h3>
                    )}
                    {section.body.map((paragraph, j) => (
                      <p
                        key={j}
                        className="text-primary leading-relaxed text-justify"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </motion.div>
                ))
              )}

              {/* Review / couple testimonial */}
              {item.review && (
                <motion.div
                  variants={fadeInUp}
                  className="border-l-2 border-primary pl-8 py-2"
                >
                  <p className="text-primary italic leading-relaxed text-lg">
                    "{item.review}"
                  </p>
                  <footer className="mt-4 text-primary/60 text-sm tracking-widest uppercase">
                    — {item.credit.coupleOrigin}
                  </footer>
                </motion.div>
              )}

              {/* Credit block */}
              <motion.div
                variants={fadeInUp}
                className="pt-4 border-t border-primary/20 space-y-1"
              >
                <p className="text-primary/80 text-sm tracking-widest uppercase">
                  Designed & Curated by
                </p>
                <p className="text-primary font-semibold">
                  {item.credit.planner}
                </p>
                <p className="text-primary/80 text-sm italic">
                  {item.credit.role}
                </p>
                <p className="text-primary/80 text-sm">
                  📍 {item.credit.locationDetail}
                </p>
                <p className="text-primary/80 text-sm">
                  Couple: {item.credit.coupleOrigin}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── GALLERY ───────────────────────────────────────────────────── */}
      <motion.section
        className="py-16 lg:py-20 bg-primary/10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05, margin: "0px 0px -80px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <motion.div variants={fadeInUp} className="mb-12">
            <p className="text-primary tracking-[0.25em] uppercase mb-3">
              Design Gallery
            </p>
            <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
              Moments from
              <br />
              <span className="italic font-light">{item.couple}</span>
            </h2>
          </motion.div>

          <GalleryGrid images={item.galleryImages} />
        </div>
      </motion.section>

      {/* ── CTA TAGS: EXPERIENCE & DESTINATION ───────────────────────── */}
      <motion.section
        className="py-20 lg:py-28 bg-primary"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -80px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Experiences CTAs */}
            <motion.div variants={fadeInUp}>
              <p className="text-white/60 tracking-[0.25em] uppercase mb-4 text-sm">
                Explore by Experience
              </p>
              <h3 className="text-2xl md:text-3xl text-white font-semibold mb-8 leading-tight">
                Weddings with a similar
                <br />
                <span className="italic font-light">feeling & approach</span>
              </h3>
              <div className="space-y-3">
                {item.experiences.map((exp) => (
                  <Link
                    key={exp}
                    href={`/wedding-experiences/${exp}`}
                    className="group flex items-center justify-between border border-white/20 p-5 hover:border-white/60 hover:bg-white/5 transition-all duration-300"
                  >
                    <span className="text-white font-medium group-hover:text-white/80 transition-colors">
                      {experienceLabels[exp]}
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Destination CTA */}
            <motion.div variants={fadeInUp}>
              <p className="text-white/60 tracking-[0.25em] uppercase mb-4 text-sm">
                Explore by Destination
              </p>
              <h3 className="text-2xl md:text-3xl text-white font-semibold mb-8 leading-tight">
                More weddings in
                <br />
                <span className="italic font-light">
                  {destinationLabels[item.destinationSlug]}
                </span>
              </h3>
              <Link
                href={`/destinations/${item.destinationSlug}`}
                className="group flex items-center justify-between border border-white/20 p-5 hover:border-white/60 hover:bg-white/5 transition-all duration-300 mb-8"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-white/60 flex-shrink-0" />
                  <span className="text-white font-medium group-hover:text-white/80 transition-colors">
                    {destinationLabels[item.destinationSlug]}, Bali
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors flex-shrink-0" />
              </Link>

              <div className="pt-4 border-t border-white/10">
                <p className="text-white/60 text-sm mb-5 leading-relaxed">
                  Ready to begin your own wedding journey? We would be honored
                  to start a conversation.
                </p>
                <Link href="https://wa.me/628113980998" target="_blank">
                  <button className="bg-white text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/90 hover:cursor-pointer transition-colors duration-300">
                    PLAN YOUR WEDDING
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── RELATED PORTFOLIOS ────────────────────────────────────────── */}
      {relatedItems.length > 0 && (
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
              className="mb-12 flex items-end justify-between"
            >
              <div>
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  You May Also Enjoy
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                  Related
                  <br />
                  <span className="italic font-light">Stories</span>
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="hidden md:flex items-center gap-2 text-primary text-sm tracking-widest uppercase hover:text-primary/70 transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedItems.map((related) => (
                <motion.article
                  key={related.id}
                  variants={fadeInUp}
                  className="relative group overflow-hidden aspect-[4/5] cursor-pointer"
                >
                  <Link
                    href={`/portfolio/${related.slug}`}
                    className="block h-full"
                  >
                    <Image
                      src={related.heroImage}
                      alt={`${related.couple} — ${related.subtitle}`}
                      fill
                      quality={80}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <div className="absolute top-5 right-5 w-9 h-9 bg-white/10 border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white">
                      <ArrowRight className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-semibold leading-tight mb-1">
                        {related.couple}
                      </h3>
                      <p className="text-white/70 italic text-sm mb-2">
                        {related.subtitle}
                      </p>
                      <div className="flex items-center gap-1.5 text-white/60 text-xs">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span>{related.location}</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            <div className="text-center mt-10 md:hidden">
              <Link href="/portfolio">
                <button className="border border-primary text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:bg-primary hover:text-white hover:cursor-pointer transition-colors duration-300">
                  VIEW ALL PORTFOLIO
                </button>
              </Link>
            </div>
          </div>
        </motion.section>
      )}
    </main>
  );
}
