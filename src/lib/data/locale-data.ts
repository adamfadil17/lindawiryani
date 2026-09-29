import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

/**
 * Shared factory for every *-data.ts barrel in this folder.
 *
 * Each translatable dataset lives in 4 sibling files:
 *   <name>-data.en.ts / .id.ts / .zh.ts / .fr.ts
 * all exporting the exact same shape. The barrel (<name>-data.ts)
 * uses this factory to expose:
 *   - get<Name>Data(locale)  -> for Server Components / route handlers
 *   - use<Name>Data()        -> for Client Components (reads current
 *                                locale via next-intl's useLocale())
 *
 * When the admin dashboard eventually drives this content from the
 * database instead of these static files, only the barrel file needs
 * to change — every page importing the get/use helpers keeps working as-is.
 */
export function createLocaleData<T>(byLocale: Record<Locale, T>) {
  function getData(locale: Locale): T {
    return byLocale[locale] ?? byLocale[routing.defaultLocale];
  }

  function useData(): T {
    const locale = useLocale() as Locale;
    return getData(locale);
  }

  return { getData, useData };
}
