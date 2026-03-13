"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { fadeIn, fadeInUp, scaleIn, staggerContainer } from "@/lib/motion";
import { categories, Category } from "@/lib/types/article/article-types";
import { articles } from "@/lib/data/article/article-data";

const categoryDescriptions: Record<string, string> = {
  Guides: "Step-by-step planning guides for destination couples",
  "Planning Advice": "Practical insight from real planning journeys",
  "Destination Knowledge": "Location intelligence across Bali and Indonesia",
  "Venue & Location": "Environment features and venue explorations",
  "Real Weddings": "Editorial stories from real celebrations",
  "Design & Concept": "Design thinking, atmosphere, and creative direction",
};

// ─── Filter Bar ───────────────────────────────────────────────────────────────

function CategoryFilter({
  active,
  onChange,
}: {
  active: Category;
  onChange: (c: Category) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 lg:gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`text-xs sm:text-sm tracking-[0.15em] uppercase px-4 py-2 border transition-all duration-200 hover:cursor-pointer ${
            active === cat
              ? "bg-primary text-white border-primary"
              : "bg-transparent text-primary border-primary/40 hover:border-primary hover:bg-primary/5"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// ─── Article Card ─────────────────────────────────────────────────────────────

function ArticleCard({
  article,
  index,
}: {
  article: (typeof articles)[number];
  index: number;
}) {
  return (
    <div>
      <Link href={`/journal/${article.slug}`} className="group block">
        {/* Image */}
        <div className="relative h-[260px] lg:h-[300px] overflow-hidden mb-5">
          <Image
            src={article.image}
            alt={article.title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
          {/* Tag */}
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 text-primary text-xs tracking-widest px-3 py-1.5 uppercase">
              {article.category}
            </span>
          </div>
          {/* Arrow */}
          <div className="absolute bottom-4 right-4 w-9 h-9 bg-white/20 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white">
            <ArrowRight className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
          </div>
        </div>

        {/* Content */}
        <div>
          {/* <p className="text-primary/50 text-xs tracking-widest uppercase mb-2">
            {article.readTime}
          </p> */}
          <h3 className="text-primary font-semibold text-lg leading-snug group-hover:text-primary/70 transition-colors mb-2">
            {article.title}
          </h3>
          <p className="text-primary/80 leading-relaxed text-sm">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-2 mt-4 text-primary text-xs tracking-widest group-hover:text-primary/60 transition-colors">
            <span>READ ARTICLE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </Link>
    </div>
  );
}

// ─── Featured Article ─────────────────────────────────────────────────────────

function FeaturedArticle({ article }: { article: (typeof articles)[number] }) {
  return (
    <Link href={`/journal/${article.slug}`} className="group block">
      <div className="grid lg:grid-cols-12 gap-0 border border-primary/10 overflow-hidden">
        {/* Image */}
        <div className="relative h-[320px] lg:h-auto lg:col-span-7 overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/20" />
          <div className="absolute top-6 left-6">
            <span className="bg-white/90 text-primary text-xs tracking-widest px-3 py-1.5 uppercase">
              {article.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-5 bg-primary/10 flex flex-col justify-center p-10 lg:p-14">
          <p className="text-primary/50 text-xs tracking-widest uppercase mb-4">
            Featured
          </p>
          <h2 className="text-primary font-semibold text-2xl lg:text-3xl leading-snug group-hover:text-primary/70 transition-colors mb-5">
            {article.title}
          </h2>
          <p className="text-primary/80 leading-relaxed">{article.excerpt}</p>
          <div className="flex items-center gap-2 mt-8 text-primary text-sm tracking-widest group-hover:text-primary/60 transition-colors">
            <span>READ ARTICLE</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const featured = articles[0];
  const rest = filtered.filter((a) => a.id !== featured.id);

  return (
    <main className="relative overflow-hidden">
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-48">
        <div className="absolute inset-0">
          <Image
            src="/images/service/service3.png"
            alt="Journal — Linda Wiryani Design"
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
              href="/journal"
              className="text-white/80 text-sm tracking-widest uppercase hover:text-white transition-colors"
            >
              Journal
            </Link>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-white tracking-[0.3em] uppercase mb-5"
          >
            Linda Wiryani Design &amp; Event Planning
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-white font-semibold leading-tight max-w-4xl uppercase"
          >
            Journal
            <br />
            <span>Insights, Guides &amp; Stories</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-white/80 max-w-xl leading-relaxed"
          >
            A curated space of insight, inspiration, and practical guidance for
            couples planning destination weddings in Bali and across Indonesia.
          </motion.p>
        </motion.div>
      </section>

      {/* ── INTRO ─────────────────────────────────────────────────────── */}
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
                A journal shaped by
                <br />
                <span>experience.</span>
              </h2>
            </div>
          </motion.div>

          <div className="lg:col-span-8 space-y-8">
            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed text-justify"
            >
              Our articles are not trend reports. They are drawn from real
              planning journeys, real locations, and real conversations with
              couples navigating the decision to celebrate far from home.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed text-justify"
            >
              Here we share design perspectives, destination knowledge, and
              planning guidance shaped by years of working within Bali's diverse
              environments — from private villas and jungle retreats to coastal
              estates and luxury resorts.
            </motion.p>

            {/* Category tiles */}
            <motion.div
              variants={fadeInUp}
              className="grid sm:grid-cols-2 gap-4 pt-4"
            >
              {Object.entries(categoryDescriptions).map(([cat, desc]) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat as Category);
                    document
                      .getElementById("journal-grid")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group flex items-start gap-4 p-4 border border-primary/20 hover:border-primary/60 bg-transparent hover:bg-primary/5 transition-all duration-200 text-left hover:cursor-pointer"
                >
                  <div className="w-3 h-px bg-primary/70 flex-shrink-0 mt-2.5" />
                  <div>
                    <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-1">
                      {cat}
                    </p>
                    <p className="text-primary/80 text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── FEATURED ARTICLE ──────────────────────────────────────────── */}
      <motion.section
        className="bg-primary/10 py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1, margin: "0px 0px -80px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <motion.div variants={fadeInUp} className="mb-10">
            <p className="text-primary tracking-[0.25em] uppercase mb-3">
              Featured Read
            </p>
            <h2 className="text-3xl md:text-4xl text-primary font-semibold">
              Start Here Our Most Essential Article
            </h2>
          </motion.div>
          <motion.div variants={scaleIn}>
            <FeaturedArticle article={featured} />
          </motion.div>
        </div>
      </motion.section>

      {/* ── ARTICLE GRID ──────────────────────────────────────────────── */}
      <motion.section
        id="journal-grid"
        className="py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05, margin: "0px 0px -80px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          {/* Header + filters */}
          <motion.div variants={fadeInUp} className="mb-12 lg:mb-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div>
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  Explore the Journal
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                  {activeCategory === "All" ? "All Articles" : activeCategory}
                  <br />
                  <span>
                    {activeCategory === "All"
                      ? "Guides, stories & insights"
                      : categoryDescriptions[activeCategory]}
                  </span>
                </h2>
              </div>
              <p className="text-primary/80 text-sm tracking-widest uppercase">
                {filtered.length} Article{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>

            <CategoryFilter
              active={activeCategory}
              onChange={setActiveCategory}
            />
          </motion.div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {(activeCategory === "All" ? rest : filtered).map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              variants={fadeIn}
              className="text-center py-20 text-primary/80"
            >
              <p className="text-lg text-primary/80 tracking-widest uppercase">
                No articles in this category yet.
              </p>
              <p className="mt-2 text-primary/80 text-sm">Check back soon.</p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* ── CLOSING CTA ───────────────────────────────────────────────── */}
      <motion.section
        className="relative py-24 lg:py-36 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dzerxindp/image/upload/v1773383174/closing-journal2_pcdihh.jpg"
            alt="Begin your Bali wedding journey"
            fill
            loading="lazy"
            className="object-cover object-top"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 text-center">
          <motion.p
            variants={fadeInUp}
            className="text-white tracking-[0.25em] uppercase mb-4"
          >
            Begin Your Wedding Journey
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-semibold leading-tight max-w-4xl mx-auto uppercase"
          >
            Informed couples
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl italic font-light normal-case">
              create better weddings.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            Whether you are in the early dreaming phase or actively planning, we
            invite you to explore our journal and discover the ideas,
            destinations, and experiences that resonate with you.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <Link href="/wedding-experiences">
              <button className="bg-white text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/90 hover:cursor-pointer transition-colors duration-300">
                EXPLORE WEDDING EXPERIENCES
              </button>
            </Link>
            <Link href="/destinations">
              <button className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/10 hover:cursor-pointer transition-colors duration-300">
                DISCOVER DESTINATIONS
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
