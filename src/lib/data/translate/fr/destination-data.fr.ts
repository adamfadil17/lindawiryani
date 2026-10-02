import { translateDeep } from "@/lib/data/translate-deep";
import * as en from "@/lib/data/translate/en/destination-data.en";
import dict from "@/lib/data/translate/dictionaries/destination.fr.json";

// Translations live in ./dictionaries/destination.fr.json (English source
// string -> translation). Anything missing there falls back to English.
// Run `python3 scripts/i18n-coverage.py destination fr` to see what's left.
export const destinationCategories = translateDeep(
  en.destinationCategories,
  dict,
);
export const destinationList = translateDeep(en.destinationList, dict);
