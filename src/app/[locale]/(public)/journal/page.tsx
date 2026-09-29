"use client";

import { useTranslations } from "next-intl";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { fadeIn, fadeInUp, scaleIn, staggerContainer } from "@/lib/motion";
import { useArticleData, type ArticleData } from "@/lib/data/article-data";
import { articleCategories, ArticleCategory } from "@/types";
import PageClosing from "@/components/shared/page-closing";
import PageHero from "@/components/shared/page-hero";

// Article categories are stable English values in the data (used for
// filtering); these keys map them to the translated labels in messages.
const categoryKeys: Record<ArticleCategory, string> = {
  Guides: "guides",
  "Planning Advice": "planningAdvice",
  "Destination Knowledge": "destinationKnowledge",
  "Venue & Location": "venueLocation",
  "Real Weddings": "realWeddings",
  "Design & Concept": "designConcept",
};

function useCategoryText() {
  const t = useTranslations("journalPage");
  return {
    label: (c: ArticleCategory) => t(`categories.${categoryKeys[c]}`),
    description: (c: ArticleCategory) =>
      t(`categoryDescriptions.${categoryKeys[c]}`),
  };
}

type ActiveCategory = ArticleCategory | "All";

function CategoryFilter({
  active,
  onChange,
}: {
  active: ActiveCategory;
  onChange: (c: ActiveCategory) => void;
}) {
  const t = useTranslations("journalPage");
  const category = useCategoryText();
  const allCategories: ActiveCategory[] = ["All", ...articleCategories];
  return (
    <div className="flex flex-wrap gap-2 lg:gap-3">
      {allCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`text-xs sm:text-sm tracking-[0.15em] uppercase px-4 py-2 border transition-all duration-200 hover:cursor-pointer ${
            active === cat
              ? "bg-primary text-white border-primary"
              : "bg-transparent text-primary border-primary/30 hover:border-primary/50 hover:bg-primary/5"
          }`}
        >
          {cat === "All" ? t("filterAll") : category.label(cat)}
        </button>
      ))}
    </div>
  );
}

function ArticleCard({
  article,
  index,
}: {
  article: ArticleData["articles"][number];
  index: number;
}) {
  const t = useTranslations("journalPage");
  const category = useCategoryText();
  return (
    <div>
      <Link href={`/journal/${article.slug}`} className="group block">
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
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 text-primary text-xs tracking-widest px-3 py-1.5 uppercase">
              {category.label(article.category)}
            </span>
          </div>
          <div className="absolute bottom-4 right-4 w-9 h-9 bg-white/20 border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white">
            <ArrowRight className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
          </div>
        </div>

        <div>
          <h3 className="text-primary font-semibold text-lg leading-snug group-hover:text-primary/80 transition-colors mb-2">
            {article.title}
          </h3>
          <p className="text-primary group-hover:text-primary/80 leading-relaxed text-sm">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-2 mt-4 text-primary text-xs tracking-widest group-hover:text-primary/80 transition-colors">
            <span>{t("readArticle")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </Link>
    </div>
  );
}

function FeaturedArticle({
  article,
}: {
  article: ArticleData["articles"][number];
}) {
  const t = useTranslations("journalPage");
  const category = useCategoryText();
  return (
    <Link href={`/journal/${article.slug}`} className="group block">
      <div className="grid lg:grid-cols-12 gap-0 border border-primary/10 overflow-hidden">
        <div className="relative h-[320px] lg:h-auto lg:col-span-7 overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/20" />
          <div className="absolute top-6 left-6">
            <span className="bg-white/90 text-primary text-xs tracking-widest px-3 py-1.5 uppercase">
              {category.label(article.category)}
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 bg-primary/10 flex flex-col justify-center p-10 lg:p-14">
          <p className="text-primary/80 text-xs tracking-widest uppercase mb-4">
            {t("featuredLabel")}
          </p>
          <h2 className="text-primary font-semibold text-2xl lg:text-3xl leading-snug group-hover:text-primary/80 transition-colors mb-5">
            {article.title}
          </h2>
          <p className="text-primary group-hover:text-primary/80 leading-relaxed">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-2 mt-8 text-primary text-sm tracking-widest group-hover:text-primary/80 transition-colors">
            <span>{t("readArticle")}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function JournalPage() {
  const t = useTranslations("journalPage");
  const category = useCategoryText();
  const { articles } = useArticleData();
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("All");

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const featured = articles[0];
  const rest = filtered.filter((a) => a.id !== featured.id);

  return (
    <main className="relative overflow-hidden">
      <PageHero
        image="/images/service/service3.png"
        imageAlt="Journal — Linda Wiryani Design"
        breadcrumb={t("breadcrumb")}
        breadcrumbHref="/journal"
        kicker={t("heroKicker")}
        title={t("heroTitle1")}
        titleSecondLine={t("heroTitle2")}
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
                {t("introTitle1")}
                <br />
                <span>{t("introTitle2")}</span>
              </h2>
            </div>
          </motion.div>

          <div className="lg:col-span-8 space-y-8">
            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed text-justify"
            >
              {t("introBody1")}
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-primary leading-relaxed text-justify"
            >
              {t("introBody2")}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="grid sm:grid-cols-2 gap-4 pt-4"
            >
              {articleCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    document
                      .getElementById("journal-grid")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group flex items-start gap-4 p-4 border border-primary/30 hover:border-primary/50 bg-transparent hover:bg-primary/5 transition-all duration-200 text-left hover:cursor-pointer"
                >
                  <div className="w-3 h-px bg-primary/70 flex-shrink-0 mt-2.5" />
                  <div>
                    <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-1">
                      {category.label(cat)}
                    </p>
                    <p className="text-primary text-sm leading-relaxed">
                      {category.description(cat)}
                    </p>
                  </div>
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

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
              {t("featuredReadKicker")}
            </p>
            <h2 className="text-3xl md:text-4xl text-primary font-semibold">
              {t("featuredReadTitle")}
            </h2>
          </motion.div>
          <motion.div variants={scaleIn}>
            <FeaturedArticle article={featured} />
          </motion.div>
        </div>
      </motion.section>
      <motion.section
        id="journal-grid"
        className="py-20 lg:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05, margin: "0px 0px -80px 0px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
          <motion.div variants={fadeInUp} className="mb-12 lg:mb-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div>
                <p className="text-primary tracking-[0.25em] uppercase mb-3">
                  {t("exploreKicker")}
                </p>
                <h2 className="text-3xl md:text-4xl text-primary font-semibold leading-tight">
                  {activeCategory === "All"
                    ? t("allArticles")
                    : category.label(activeCategory)}
                  <br />
                  <span>
                    {activeCategory === "All"
                      ? t("allArticlesSubtitle")
                      : category.description(activeCategory)}
                  </span>
                </h2>
              </div>
              <p className="text-primary/80 text-sm tracking-widest uppercase">
                {t("articleCount", { count: filtered.length })}
              </p>
            </div>

            <CategoryFilter
              active={activeCategory}
              onChange={setActiveCategory}
            />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {(activeCategory === "All" ? rest : filtered).map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <motion.div
              variants={fadeIn}
              className="text-center py-20 text-primary/80"
            >
              <p className="text-lg text-primary/80 tracking-widest uppercase">
                {t("emptyTitle")}
              </p>
              <p className="mt-2 text-primary/80 text-sm">{t("emptyBody")}</p>
            </motion.div>
          )}
        </div>
      </motion.section>

      <PageClosing
        image="https://res.cloudinary.com/dzerxindp/image/upload/v1773383174/closing-journal2_pcdihh.jpg"
        imageAlt="Begin your Bali wedding journey"
        imagePosition="top"
        kicker={t("closingKicker")}
        titleLine1={t("closingTitle1")}
        titleLine2={t("closingTitle2")}
        body={t("closingBody")}
        primaryCta={{
          label: t("ctaExperiences"),
          href: "/wedding-experiences",
        }}
        secondaryCta={{ label: t("ctaDestinations"), href: "/destinations" }}
      />
    </main>
  );
}