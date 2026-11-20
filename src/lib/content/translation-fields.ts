/**
 * Translation field definitions shared by the admin editor and the API
 * normalizer. Keep these in sync with prisma/schema.prisma.
 */

export const TRANSLATION_LOCALE_CODES = ["id", "zh", "fr", "ja", "de"] as const;
export type TranslationLocaleCode = (typeof TRANSLATION_LOCALE_CODES)[number];

export type TranslationFieldType =
  | "text"
  | "textarea"
  | "list"
  | "pair"
  | "html";

export interface TranslationField {
  key: string;
  label: string;
  type: TranslationFieldType;
  /** Rows for textarea fields. */
  rows?: number;
}

export type TranslationEntity =
  | "destination"
  | "category"
  | "experience"
  | "faq"
  | "venue"
  | "theme"
  | "portfolio"
  | "article"
  | "position";

export type TranslationState = Partial<
  Record<TranslationLocaleCode, Record<string, unknown>>
>;

const text = (key: string, label: string): TranslationField => ({
  key,
  label,
  type: "text",
});

const area = (key: string, label: string, rows = 4): TranslationField => ({
  key,
  label,
  type: "textarea",
  rows,
});

const list = (key: string, label: string): TranslationField => ({
  key,
  label,
  type: "list",
});

const pair = (key: string, label: string): TranslationField => ({
  key,
  label,
  type: "pair",
});

const html = (key: string, label: string): TranslationField => ({
  key,
  label,
  type: "html",
});

export const TRANSLATION_FIELDS: Record<TranslationEntity, TranslationField[]> = {
  category: [text("name", "Name")],
  destination: [
    text("name", "Name"),
    text("type", "Type"),
    area("description", "Short description", 3),
    area("long_description", "Long description", 6),
    text("location", "Location"),
    area("atmosphere", "Atmosphere", 3),
    area("accessibility_notes", "Accessibility notes", 3),
    area("seasonal_considerations", "Seasonal considerations", 3),
    text("guest_capacity", "Guest capacity"),
    list("highlights", "Highlights"),
    list("best_for", "Best for"),
    list("ceremony_options", "Ceremony options"),
    list("reception_options", "Reception options"),
    list("accommodation_nearby", "Accommodation nearby"),
    list("dining_experiences", "Dining experiences"),
    list("unique_features", "Unique features"),
  ],
  experience: [
    text("name", "Name"),
    area("hero_desc", "Hero description", 3),
    text("intro_label", "Intro label"),
    pair("intro_heading", "Intro heading (2 lines)"),
    area("intro_body", "Intro body", 5),
    text("intro_list_label", "Intro list label"),
    list("intro_list", "Intro list"),
    text("intro_footnote", "Intro footnote"),
    text("approach_label", "Approach label"),
    pair("approach_heading", "Approach heading (2 lines)"),
    area("approach_body", "Approach body", 5),
    text("approach_list_label", "Approach list label"),
    list("approach_list", "Approach list"),
    text("services_label", "Services label"),
    pair("services_heading", "Services heading (2 lines)"),
    list("services_list", "Services list"),
    text("services_footnote", "Services footnote"),
    text("services_dark_label", "Dark services label"),
    pair("services_dark_heading", "Dark services heading (2 lines)"),
    area("services_dark_body", "Dark services body", 4),
    list("services_dark_list", "Dark services list"),
    text("closing_label", "Closing label"),
    pair("closing_heading", "Closing heading (2 lines)"),
    area("closing_body", "Closing body", 5),
    text("closing_couple_label", "Closing couple label"),
    list("closing_couple_values", "Closing couple values"),
  ],
  faq: [text("question", "Question"), area("answer", "Answer", 3)],
  venue: [
    text("name", "Name"),
    text("slogan", "Slogan"),
    area("description", "Description", 5),
  ],
  theme: [
    text("title", "Title"),
    area("description", "Description", 4),
    list("inclusions", "Inclusions"),
  ],
  portfolio: [
    text("subtitle", "Subtitle"),
    list("tags", "Tags"),
    area("excerpt", "Excerpt", 4),
    text("origin", "Origin"),
    area("review", "Review", 3),
    html("content", "Story content"),
    text("credit_role", "Credit role"),
    text("credit_location_detail", "Credit location"),
    text("credit_couple_origin", "Credit couple origin"),
  ],
  article: [
    text("title", "Title"),
    area("excerpt", "Excerpt", 3),
    html("content", "Article content"),
  ],
  position: [
    text("title", "Title"),
    text("type", "Type"),
    text("level", "Level"),
    area("desc", "Description", 3),
  ],
};

export function rowsToTranslationState(
  rows:
    | {
        locale: string;
        [key: string]: unknown;
      }[]
    | undefined,
  fields: TranslationField[],
): TranslationState {
  if (!Array.isArray(rows)) return {};

  const state: TranslationState = {};
  for (const row of rows) {
    if (!TRANSLATION_LOCALE_CODES.includes(row.locale as TranslationLocaleCode)) {
      continue;
    }
    const values: Record<string, unknown> = {};
    for (const field of fields) {
      if (row[field.key] !== undefined && row[field.key] !== null) {
        values[field.key] = row[field.key];
      }
    }
    state[row.locale as TranslationLocaleCode] = values;
  }
  return state;
}

/**
 * Converts editor state into the object keyed by locale expected by the API.
 * Empty strings/arrays are dropped so the field falls back to English.
 */
export function translationStateToPayload(
  state: TranslationState,
): Record<string, Record<string, unknown>> {
  const payload: Record<string, Record<string, unknown>> = {};

  for (const locale of TRANSLATION_LOCALE_CODES) {
    const values = state[locale];
    if (!values) continue;

    const cleaned: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(values)) {
      if (typeof value === "string" && value.trim() === "") continue;
      if (Array.isArray(value) && value.length === 0) continue;
      if (
        Array.isArray(value) &&
        value.length > 0 &&
        value.every((item) => typeof item === "string" && item.trim() === "")
      ) {
        continue;
      }
      if (value === undefined || value === null) continue;
      cleaned[key] = value;
    }

    if (Object.keys(cleaned).length > 0) payload[locale] = cleaned;
  }

  return payload;
}

/** Percentage (0-100) of non-empty translatable fields per locale. */
export function translationCompleteness(
  state: TranslationState,
  fields: TranslationField[],
): Record<TranslationLocaleCode, number> {
  const result = {} as Record<TranslationLocaleCode, number>;

  for (const locale of TRANSLATION_LOCALE_CODES) {
    const values = state[locale] ?? {};
    let filled = 0;
    for (const field of fields) {
      const value = values[field.key];
      if (typeof value === "string" && value.trim() !== "") filled++;
      else if (Array.isArray(value) && value.length > 0) filled++;
    }
    result[locale] = fields.length === 0 ? 0 : Math.round((filled / fields.length) * 100);
  }

  return result;
}
