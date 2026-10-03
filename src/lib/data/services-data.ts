import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";

import {
  serviceBase,
  whyChooseNumbers,
  type ServiceText,
  type ServicesContent,
} from "./base/services-base";
import { content as en } from "./translate/en/services-text.en";
import { content as id } from "./translate/id/services-text.id";
import { content as zh } from "./translate/zh/services-text.zh";
import { content as fr } from "./translate/fr/services-text.fr";
import { content as ja } from "./translate/ja/services-text.ja";
import { content as de } from "./translate/de/services-text.de";


/**
 * Services = base (id, gambar) + teks per bahasa.
 *
 *   base/services-base.ts                    id, image, urutan "why choose us"
 *   translate/<l>/services-text.<l>.ts       teks per service id / nomor
 *
 * Menambah bahasa baru: buat services-text.<l>.ts lalu daftarkan di
 * `contentByLocale`. Bagian yang belum diterjemahkan jatuh ke teks en per field.
 */
const contentByLocale: Record<Locale, ServicesContent> = {
  en,
  id,
  zh,
  fr,
  ja,
  de
};

export interface Service extends ServiceText {
  id: string;
  image: string;
}

export interface ServicesData {
  services: Service[];
  whyChooseReasons: { number: string; title: string; desc: string }[];
  serviceDestinations: string[];
}

const cache = new Map<Locale, ServicesData>();

function resolve(locale: Locale): ServicesData {
  const key = contentByLocale[locale] ? locale : routing.defaultLocale;
  const cached = cache.get(key);
  if (cached) return cached;

  const c = contentByLocale[key];
  const data: ServicesData = {
    services: serviceBase.map((base) => ({
      ...base,
      ...en.services[base.id],
      ...c.services[base.id],
    })),
    whyChooseReasons: whyChooseNumbers.map((number) => ({
      number,
      ...en.whyChooseReasons[number],
      ...c.whyChooseReasons[number],
    })),
    serviceDestinations: c.serviceDestinations ?? en.serviceDestinations,
  };
  cache.set(key, data);
  return data;
}

export function getServicesData(locale: Locale): ServicesData {
  return resolve(locale);
}

export function useServicesData(): ServicesData {
  const locale = useLocale() as Locale;
  return resolve(locale);
}
