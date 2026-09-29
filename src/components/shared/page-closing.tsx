"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { fadeInUp, staggerContainer } from "@/lib/motion";

/**
 * Shared closing (CTA) section shown at the bottom of every public page.
 *
 * Pass already-translated strings from the page. `primaryCta` is the solid
 * white button, `secondaryCta` the outlined one. Set `external` for links
 * that should open in a new tab (e.g. WhatsApp).
 */

export interface ClosingCta {
  label: string;
  href: string;
  external?: boolean;
}

export interface PageClosingProps {
  image: string;
  imageAlt: string;
  imagePosition?: "center" | "top";
  /** Replaces the default dark overlay */
  overlayClassName?: string;

  kicker: string;
  titleLine1: string;
  titleLine2: string;
  body: string;

  primaryCta: ClosingCta;
  secondaryCta: ClosingCta;

  /** "relaxed" = a bit more air above the body and the buttons */
  spacing?: "default" | "relaxed";
}

const SPACING = {
  default: { body: "mt-6", actions: "mt-10" },
  relaxed: { body: "mt-8", actions: "mt-12" },
} as const;

function CtaLink({
  cta,
  variant,
}: {
  cta: ClosingCta;
  variant: "solid" | "outline";
}) {
  const buttonClass =
    variant === "solid"
      ? "bg-white text-primary font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/90 hover:cursor-pointer transition-colors duration-300"
      : "border border-white text-white font-semibold px-8 py-3 text-sm tracking-widest hover:bg-white/10 hover:cursor-pointer transition-colors duration-300";

  return (
    <Link href={cta.href} target={cta.external ? "_blank" : undefined}>
      <button className={buttonClass}>{cta.label}</button>
    </Link>
  );
}

export default function PageClosing({
  image,
  imageAlt,
  imagePosition = "center",
  overlayClassName = "bg-primary/40",
  kicker,
  titleLine1,
  titleLine2,
  body,
  primaryCta,
  secondaryCta,
  spacing = "default",
}: PageClosingProps) {
  const gap = SPACING[spacing];

  return (
    <motion.section
      className="relative py-24 lg:py-36 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2, margin: "0px 0px -100px 0px" }}
      variants={staggerContainer}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className={`object-cover ${
            imagePosition === "top" ? "object-top" : "object-center"
          }`}
          sizes="100vw"
        />
        <div className={`absolute inset-0 ${overlayClassName}`} />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 text-center">
        <motion.p
          variants={fadeInUp}
          className="text-white tracking-[0.25em] uppercase mb-4"
        >
          {kicker}
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-semibold leading-tight max-w-4xl mx-auto uppercase"
        >
          {titleLine1}
          <br />
          <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl italic font-light normal-case">
            {titleLine2}
          </span>
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className={`${gap.body} text-white/80 max-w-2xl mx-auto leading-relaxed`}
        >
          {body}
        </motion.p>
        <motion.div
          variants={fadeInUp}
          className={`${gap.actions} flex flex-wrap gap-4 justify-center`}
        >
          <CtaLink cta={primaryCta} variant="solid" />
          <CtaLink cta={secondaryCta} variant="outline" />
        </motion.div>
      </div>
    </motion.section>
  );
}
