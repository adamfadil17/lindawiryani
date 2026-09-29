"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { fadeInUp, staggerContainer } from "@/lib/motion";

/**
 * Shared hero (page header) used by every public page.
 *
 * It only renders what it receives — pass already-translated strings
 * (`t("heroKicker")`, ...) from the page so the translation keys stay
 * next to the rest of that page's copy.
 *
 * The optional style props exist only to reproduce the small per-page
 * differences that were already in the design. Leave them out to get the
 * default look.
 */

const OVERLAY = {
  soft: "bg-gradient-to-b from-black/28 via-black/10 to-black/20",
  medium: "bg-gradient-to-b from-black/34 via-black/10 to-black/20",
} as const;

const SPACING = {
  default: "pb-20 lg:pb-28",
  compact: "pb-10 md:pb-14 lg:pb-24 text-start lg:text-left",
} as const;

const TITLE_SIZE = {
  default: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl",
  xlLarge: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
} as const;

export interface PageHeroProps {
  /** Background image */
  image: string;
  imageAlt: string;

  /** Small breadcrumb link above the kicker */
  breadcrumb: string;
  breadcrumbHref: string;

  kicker: string;
  /** First (or only) line of the <h1> */
  title: string;
  /** Optional second line, rendered after a <br /> */
  titleSecondLine?: string;
  /** Render the second line italic / light (used by the split layout pages) */
  secondLineItalic?: boolean;

  subtitle?: string;
  /** Replaces the default subtitle classes */
  subtitleClassName?: string;

  /** Extra content under the subtitle (buttons, ...) */
  actions?: ReactNode;
  /** Replaces the default wrapper classes of `actions` */
  actionsClassName?: string;

  /**
   * "stacked": kicker → title → subtitle, all in one column.
   * "split": title on the left, subtitle + actions on the right (desktop).
   */
  layout?: "stacked" | "split";

  spacing?: keyof typeof SPACING;
  overlay?: keyof typeof OVERLAY;
  titleSize?: keyof typeof TITLE_SIZE;
  breadcrumbSpacing?: "mb-10" | "mb-12";
  kickerSpacing?: "mb-4" | "mb-5";
}

export default function PageHero({
  image,
  imageAlt,
  breadcrumb,
  breadcrumbHref,
  kicker,
  title,
  titleSecondLine,
  secondLineItalic = false,
  subtitle,
  subtitleClassName,
  actions,
  actionsClassName = "mt-8",
  layout = "stacked",
  spacing = "default",
  overlay = "medium",
  titleSize = "default",
  breadcrumbSpacing = "mb-10",
  kickerSpacing = "mb-5",
}: PageHeroProps) {
  const isSplit = layout === "split";

  const subtitleClasses =
    subtitleClassName ??
    (isSplit
      ? "text-white/80 leading-relaxed border-l border-white/80 pl-6"
      : "mt-6 text-white/80 max-w-xl leading-relaxed");

  const heading = (
    <>
      <motion.p
        variants={fadeInUp}
        className={`text-white tracking-[0.3em] uppercase ${kickerSpacing}`}
      >
        {kicker}
      </motion.p>
      <motion.h1
        variants={fadeInUp}
        className={`${TITLE_SIZE[titleSize]} text-white font-semibold leading-tight max-w-4xl uppercase`}
      >
        {title}
        {titleSecondLine && (
          <>
            <br />
            <span
              className={
                secondLineItalic ? "italic font-light normal-case" : undefined
              }
            >
              {titleSecondLine}
            </span>
          </>
        )}
      </motion.h1>
    </>
  );

  const subtitleEl = subtitle ? (
    <motion.p variants={fadeInUp} className={subtitleClasses}>
      {subtitle}
    </motion.p>
  ) : null;

  const actionsEl = actions ? (
    <motion.div variants={fadeInUp} className={actionsClassName}>
      {actions}
    </motion.div>
  ) : null;

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-32 lg:pt-48">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className={`absolute inset-0 ${OVERLAY[overlay]}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
      </div>

      <motion.div
        className={`relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 ${SPACING[spacing]}`}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div
          variants={fadeInUp}
          className={`flex items-center gap-2 ${breadcrumbSpacing} mt-6`}
        >
          <Link
            href={breadcrumbHref}
            className="text-white/80 text-sm tracking-widest uppercase hover:text-white transition-colors"
          >
            {breadcrumb}
          </Link>
        </motion.div>

        {isSplit ? (
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">{heading}</div>
            <div className="lg:col-span-5 lg:pb-2">
              {subtitleEl}
              {actionsEl}
            </div>
          </div>
        ) : (
          <>
            {heading}
            {subtitleEl}
            {actionsEl}
          </>
        )}
      </motion.div>
    </section>
  );
}
