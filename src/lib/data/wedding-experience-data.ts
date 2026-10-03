import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import type { WeddingExperience } from "@/types";
import { useLocale } from "next-intl";

import {
  subExperienceBase,
  weddingExperienceBase,
} from "./base/wedding-experience-base";
import type { WeddingExperienceContent } from "./base/wedding-experience-base";
import {
  subExperienceImages,
  weddingExperienceMedia,
} from "./base/wedding-experience-media";
import { content as en } from "./translate/en/wedding-experience-text.en";
import { content as id } from "./translate/id/wedding-experience-text.id";
import { content as zh } from "./translate/zh/wedding-experience-text.zh";
import { content as fr } from "./translate/fr/wedding-experience-text.fr";
import { content as ja } from "./translate/ja/wedding-experience-text.ja";

/**
 * WeddingExperience = base (bahasa-netral) + media (gambar) + teks per bahasa.
 *
 *   base/wedding-experience-base.ts    id, slug, category, hero_style, urutan faq id
 *   base/wedding-experience-media.ts   hero/intro/approach/closing image
 *   translate/<l>/wedding-experience-text.<l>.ts
 *        teks per experience id, FAQ per faq id, kartu sub-experience per slug,
 *        plus daftar teks umum (whyBali, faqs, dst.)
 *
 * Menambah bahasa baru: buat wedding-experience-text.<l>.ts lalu daftarkan di
 * `contentByLocale`. Bagian yang belum diterjemahkan jatuh ke teks en.
 */
const contentByLocale: Record<Locale, WeddingExperienceContent> = {
  en,
  id,
  zh,
  fr,
  ja,
};

export interface SubExperience {
  title: string;
  subtitle: string;
  tag: string;
  desc: string;
  href: string;
  image: string;
}

export interface WeddingExperienceData {
  weddingExperienceList: WeddingExperience[];
  whyBali: string[];
  fullServiceIncludes: string[];
  hospitalityValues: string[];
  coupleValues: string[];
  designFoundation: string[];
  subExperiences: SubExperience[];
  faqs: { q: string; a: string }[];
}

const cache = new Map<Locale, WeddingExperienceData>();

function resolve(locale: Locale): WeddingExperienceData {
  const key = contentByLocale[locale] ? locale : routing.defaultLocale;
  const cached = cache.get(key);
  if (cached) return cached;

  const c = contentByLocale[key];

  const weddingExperienceList: WeddingExperience[] = weddingExperienceBase.map(
    ({ faq_ids, ...base }) => {
      const t = { ...en.experiences[base.id], ...c.experiences[base.id] };
      const faqText = { ...en.experiences[base.id].faqs, ...t.faqs };
      const { faqs: _faqs, ...text } = t;
      return {
        ...base,
        ...text,
        ...weddingExperienceMedia[base.id],
        faqs: faq_ids.map((faqId, i) => ({
          id: faqId,
          experience_id: base.id,
          question: faqText[faqId].question,
          answer: faqText[faqId].answer,
          sort_order: i,
        })),
      };
    },
  );

  const subExperiences: SubExperience[] = subExperienceBase.map((s) => ({
    ...en.subExperiences[s.slug],
    ...c.subExperiences[s.slug],
    href: s.href,
    image: subExperienceImages[s.slug],
  }));

  const data: WeddingExperienceData = {
    weddingExperienceList,
    whyBali: c.whyBali ?? en.whyBali,
    fullServiceIncludes: c.fullServiceIncludes ?? en.fullServiceIncludes,
    hospitalityValues: c.hospitalityValues ?? en.hospitalityValues,
    coupleValues: c.coupleValues ?? en.coupleValues,
    designFoundation: c.designFoundation ?? en.designFoundation,
    subExperiences,
    faqs: c.faqs ?? en.faqs,
  };
  cache.set(key, data);
  return data;
}

export function getWeddingExperienceData(locale: Locale): WeddingExperienceData {
  return resolve(locale);
}

export function useWeddingExperienceData(): WeddingExperienceData {
  const locale = useLocale() as Locale;
  return resolve(locale);
}
