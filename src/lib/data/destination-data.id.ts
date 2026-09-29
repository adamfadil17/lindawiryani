import { translateDeep } from "./translate-deep";
import * as en from "./destination-data.en";
import dict from "./dictionaries/destination.id.json";

// Translations live in ./dictionaries/destination.id.json (English source
// string -> translation). Anything missing there falls back to English.
// Run `python3 scripts/i18n-coverage.py destination id` to see what's left.
export const destinationCategories = translateDeep(
  en.destinationCategories,
  dict,
);
export const destinationList = translateDeep(en.destinationList, dict);
