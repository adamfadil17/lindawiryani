import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

import reviewsJson from "./portfolio-reviews.json";
import experienceCopyJson from "./experience-page-copy.json";

/**
 * Static copy that intentionally stays out of the database (D4):
 * portfolio reviews and the wedding-experiences page copy.
 * Extracted from the former translate/* files at the Phase 7 cutover.
 */

export interface PortfolioReview {
  quote: string;
  couple: string;
  origin: string;
}

export interface SubExperience {
  title: string;
  subtitle: string;
  tag: string;
  desc: string;
  href: string;
  image: string;
}

export interface ExperiencePageCopy {
  whyBali: string[];
  fullServiceIncludes: string[];
  hospitalityValues: string[];
  coupleValues: string[];
  designFoundation: string[];
  subExperiences: SubExperience[];
  faqs: { q: string; a: string }[];
}

const reviews = reviewsJson as Record<string, PortfolioReview[]>;
const experienceCopy = experienceCopyJson as Record<string, ExperiencePageCopy>;

export function getStaticPortfolioReviews(locale: Locale): PortfolioReview[] {
  return reviews[locale] ?? reviews[routing.defaultLocale] ?? [];
}

export function getStaticExperiencePageCopy(locale: Locale): ExperiencePageCopy {
  return (
    experienceCopy[locale] ??
    experienceCopy[routing.defaultLocale] ?? {
      whyBali: [],
      fullServiceIncludes: [],
      hospitalityValues: [],
      coupleValues: [],
      designFoundation: [],
      subExperiences: [],
      faqs: [],
    }
  );
}
