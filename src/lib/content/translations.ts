import {
  TRANSLATION_FIELDS,
  type TranslationEntity,
} from "./translation-fields";
import { sanitizeRichText } from "@/lib/sanitize";

/**
 * Normalizes the admin translations payload (object keyed by locale) into
 * Prisma nested-write rows. Empty values become null so the public data layer
 * falls back to English.
 */
export function buildTranslationRows(
  entity: TranslationEntity,
  translations: Record<string, Record<string, unknown>> | undefined,
): Record<string, unknown>[] {
  if (!translations) return [];

  const fields = TRANSLATION_FIELDS[entity];
  const rows: Record<string, unknown>[] = [];

  for (const [locale, values] of Object.entries(translations)) {
    const data: Record<string, unknown> = {};

    for (const field of fields) {
      const value = values[field.key];
      if (value === undefined) continue;

      if (typeof value === "string" && value.trim() === "") {
        data[field.key] = null;
        continue;
      }

      if (Array.isArray(value) && value.length === 0) {
        data[field.key] = null;
        continue;
      }

      if (
        Array.isArray(value) &&
        value.every((item) => typeof item === "string" && item.trim() === "")
      ) {
        data[field.key] = null;
        continue;
      }

      data[field.key] = value;
    }

    // Rich-text fields are sanitized on write as well as on read (task 5.5).
    if (
      entity === "article" &&
      typeof data.content === "string"
    ) {
      data.content = sanitizeRichText(data.content);
    }
    if (
      entity === "portfolio" &&
      typeof data.content === "string"
    ) {
      data.content = sanitizeRichText(data.content);
    }
    if (entity === "theme" && typeof data.description === "string") {
      data.description = sanitizeRichText(data.description);
    }

    // Always keep the row when the locale was submitted, even if empty? No:
    // an empty locale should disappear so fallback is used everywhere.
    if (Object.keys(data).length > 0) {
      rows.push({ locale, ...data });
    }
  }

  return rows;
}

export function translationsCreate(
  entity: TranslationEntity,
  translations: Record<string, Record<string, unknown>> | undefined,
) {
  return { create: buildTranslationRows(entity, translations) as never };
}

export function translationsReplace(
  entity: TranslationEntity,
  translations: Record<string, Record<string, unknown>>,
) {
  return {
    deleteMany: {},
    create: buildTranslationRows(entity, translations) as never,
  };
}

/** Publish/draft fields for create and update payloads. */
export function publicationFields(status?: "draft" | "published") {
  if (status === "published") {
    return { status: "published" as const, published_at: new Date() };
  }
  if (status === "draft") {
    return { status: "draft" as const };
  }
  return {};
}
