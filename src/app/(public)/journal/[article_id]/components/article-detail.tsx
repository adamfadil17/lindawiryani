"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { fadeIn, fadeInUp, scaleIn, staggerContainer } from "@/lib/motion";
import { Article } from "@/lib/types/new-strucutre";

interface ArticleDetailProps {
  article: Article;
  related: Article[];
}

function TipTapContent({ html }: { html: string }) {
  return (
    <div
      className="tiptap-content text-primary"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// ─── Related Article Card ──────────────────────────────────────────────────────

function RelatedCard({ article }: { article: Article }) {
  return (
    <Link href={`/journal/${article.slug}`} className="group block">
      <div className="relative h-[220px] overflow-hidden mb-4">
        <Image
          src={article.image}
          alt={article.title}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 text-primary text-xs tracking-widest px-3 py-1.5 uppercase">
            {article.category}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 w-9 h-9 bg-white/20 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white">
          <ArrowRight className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
        </div>
      </div>
      <h3 className="text-primary font-semibold text-base leading-snug group-hover:text-primary/70 transition-colors mb-2">
        {article.title}
      </h3>
      <p className="text-primary/70 text-sm leading-relaxed line-clamp-2">
        {article.excerpt}
      </p>
      <div className="flex items-center gap-2 mt-3 text-primary text-xs tracking-widest group-hover:text-primary/60 transition-colors">
        <span>READ ARTICLE</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ArticleDetail({ article, related }: ArticleDetailProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <main className="relative overflow-hidden">
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-screen flex items-end overflow-hidden pt-20 sm:pt-24 md:pt-32">
        <div className="absolute inset-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
        </div>

        <motion.div
          className="relative z-10 w-full container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 pb-16 lg:pb-24"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Breadcrumb */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-2 mb-8"
          >
            <Link
              href="/journal"
              className="flex items-center gap-2 text-white/80 text-sm tracking-widest uppercase hover:text-white hover:cursor-pointer transition-colors"
            >
              <span>Journal</span>
            </Link>
            <span className="text-white text-sm">/</span>
            <span className="text-white text-sm font-simbold tracking-widest uppercase truncate max-w-[200px]">
              {article.category}
            </span>
          </motion.div>

          {/* Category tag */}
          <motion.div variants={fadeInUp} className="mb-5">
            <span className="bg-white/90 text-primary text-sm tracking-widest px-3 py-1">
              {article.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-white font-semibold leading-tight max-w-4xl"
          >
            {article.title}
          </motion.h1>

          {/* Meta */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-4 mt-6 text-white text-sm tracking-widest uppercase"
          >
            <span>{formattedDate}</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── ARTICLE BODY ──────────────────────────────────────────────── */}
      <motion.section
        className="py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05, margin: "0px 0px -80px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* ── Sticky Sidebar ─────────────────────────────────────── */}
            <motion.aside
              variants={fadeInUp}
              className="lg:col-span-3 order-2 lg:order-1"
            >
              <div className="lg:sticky lg:top-32 space-y-10">
                {/* Back link */}
                <Link
                  href="/journal"
                  className="group flex items-center gap-3 text-primary/80 hover:text-primary transition-colors tracking-widest uppercase"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span>All Articles</span>
                </Link>

                {/* Divider */}
                <div className="w-12 h-px bg-primary/50" />

                {/* Article metadata */}
                <div className="space-y-5">
                  <div>
                    <p className="text-primary/80 text-sm tracking-[0.2em] uppercase mb-1">
                      Category
                    </p>
                    <p className="text-primary font-medium">
                      {article.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-primary/80 text-sm tracking-[0.2em] uppercase mb-1">
                      Published
                    </p>
                    <p className="text-primary">{formattedDate}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-12 h-px bg-primary/50" />

                {/* CTA */}
                <div className="space-y-4">
                  <p className="text-primary leading-relaxed">
                    Ready to begin planning your Bali wedding?
                  </p>
                  <Link href="/contact">
                    <button className="w-full bg-primary text-white text-sm tracking-widest uppercase px-5 py-3 hover:bg-primary/85 hover:cursor-pointer transition-colors duration-300">
                      START A CONVERSATION
                    </button>
                  </Link>
                </div>
              </div>
            </motion.aside>

            {/* ── Article Content ────────────────────────────────────── */}
            <motion.div
              variants={fadeIn}
              className="lg:col-span-9 order-1 lg:order-2"
            >
              {/* Excerpt / Lead */}
              <p className="text-primary text-lg md:text-xl leading-relaxed font-light border-l-2 border-primary pl-6 mb-12 text-justify">
                {article.excerpt}
              </p>

              {/* TipTap HTML */}
              <TipTapContent html={article.content} />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── RELATED ARTICLES ──────────────────────────────────────────── */}
      {related.length > 0 && (
        <motion.section
          className="bg-primary/10 py-20 lg:py-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1, margin: "0px 0px -80px 0px" }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
            <motion.div variants={fadeInUp} className="mb-12">
              <p className="text-primary tracking-[0.25em] uppercase mb-3">
                Continue Reading
              </p>
              <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                More from
                <br />
                <span className="italic font-light">{article.category}</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
              {related.map((rel) => (
                <motion.div key={rel.slug} variants={scaleIn}>
                  <RelatedCard article={rel} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

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
            src="https://placehold.net/default.svg"
            alt="Begin your Bali wedding journey"
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
            invite you to explore our work and discover the ideas, destinations,
            and experiences that resonate with you.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <Link href="/journal">
              <button className="bg-white text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/90 hover:cursor-pointer transition-colors duration-300">
                BACK TO JOURNAL
              </button>
            </Link>
            <Link href="/contact">
              <button className="border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/10 hover:cursor-pointer transition-colors duration-300">
                GET IN TOUCH
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
