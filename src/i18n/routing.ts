import { defineRouting } from "next-intl/routing";

/**
 * Central place for everything that has to do with the locales the
 * public site supports. Add/remove a language ONLY here + in
 * src/messages/<locale>.json + the *-data.<locale>.ts data files.
 *
 * Admin dashboard (src/app/(admin)) intentionally does NOT use this —
 * it stays single-language for now, per project scope.
 */
export const routing = defineRouting({
  locales: ["en", "id", "zh", "fr"],
  defaultLocale: "en",

  // "as-needed" => default locale (en) has no /en prefix, others do
  // (/id/services, /zh/services, /fr/services). Switch to "always"
  // later if you want /en/... explicit too.
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
  zh: "中文",
  fr: "Français",
};

export const localeShortLabels: Record<Locale, string> = {
  en: "EN",
  id: "ID",
  zh: "中文",
  fr: "FR",
};
