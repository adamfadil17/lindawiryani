"use client";

import { localeLabels, localeShortLabels } from "@/i18n/routing";
import {
  TRANSLATION_LOCALE_CODES,
  type TranslationLocaleCode,
} from "@/lib/content/translation-fields";

/**
 * Locale tabs for the admin translation editor.
 * English is edited in the main form; these tabs are the other five locales.
 */
export default function LocaleTabs({
  activeLocale,
  onChange,
  completeness,
}: {
  activeLocale: TranslationLocaleCode;
  onChange: (locale: TranslationLocaleCode) => void;
  completeness?: Partial<Record<TranslationLocaleCode, number>>;
}) {
  return (
    <div className="flex flex-wrap gap-1 border-b border-primary/20 pb-3">
      {TRANSLATION_LOCALE_CODES.map((locale) => {
        const percent = completeness?.[locale] ?? 0;
        const active = locale === activeLocale;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => onChange(locale)}
            title={`${localeLabels[locale]} — ${percent}% translated`}
            className={`flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-widest transition-colors ${
              active
                ? "bg-primary text-white"
                : "text-muted-foreground hover:text-primary hover:bg-primary/5"
            }`}
          >
            <span>{localeShortLabels[locale]}</span>
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                percent >= 100
                  ? "bg-emerald-500"
                  : percent > 0
                    ? "bg-amber-400"
                    : active
                      ? "bg-white/50"
                      : "bg-primary/20"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
