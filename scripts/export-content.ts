import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { prisma } from "../src/lib/prisma";

/**
 * Exports the current database into the content seed snapshot.
 *
 * - IDs are intentionally omitted; the seed resolves relations by slug and
 *   lets Prisma generate UUIDs for new rows.
 * - English lives in the base fields; `translations` holds the five other
 *   locales. The `locales` metadata lists all six for clarity.
 * - Users, inquiries, and submissions are never exported.
 */

type TranslationRow = Record<string, unknown> & { locale: string };

function translations(
  rows: TranslationRow[] | undefined,
  foreignKey: string,
): Record<string, Record<string, unknown>> {
  const output: Record<string, Record<string, unknown>> = {};

  for (const row of rows ?? []) {
    const values: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(row)) {
      if (key === "id" || key === "locale" || key === foreignKey) continue;
      if (value === null || value === undefined) continue;
      if (typeof value === "string" && value.trim() === "") continue;
      if (Array.isArray(value) && value.length === 0) continue;
      values[key] = value;
    }

    if (Object.keys(values).length > 0) {
      output[row.locale] = values;
    }
  }

  return output;
}

async function main() {
  const [
    categories,
    destinations,
    experiences,
    venues,
    themes,
    portfolios,
    articles,
    positions,
  ] = await Promise.all([
    prisma.destinationCategory.findMany({
      orderBy: [{ sort_order: "asc" }, { slug: "asc" }],
      include: { translations: true },
    }),
    prisma.destination.findMany({
      orderBy: [{ sort_order: "asc" }, { slug: "asc" }],
      include: {
        category: { select: { slug: true } },
        translations: true,
      },
    }),
    prisma.weddingExperience.findMany({
      orderBy: [{ sort_order: "asc" }, { slug: "asc" }],
      include: {
        translations: true,
        faqs: {
          orderBy: [{ sort_order: "asc" }, { slug: "asc" }],
          include: { translations: true },
        },
      },
    }),
    prisma.venue.findMany({
      orderBy: [{ sort_order: "asc" }, { slug: "asc" }],
      include: {
        destination: { select: { slug: true } },
        experience: { select: { slug: true } },
        translations: true,
        gallery: { orderBy: [{ sort_order: "asc" }, { url: "asc" }] },
      },
    }),
    prisma.weddingTheme.findMany({
      orderBy: [{ sort_order: "asc" }, { slug: "asc" }],
      include: {
        venue: { select: { slug: true } },
        experience: { select: { slug: true } },
        translations: true,
        gallery: { orderBy: [{ sort_order: "asc" }, { url: "asc" }] },
      },
    }),
    prisma.portfolio.findMany({
      orderBy: [{ sort_order: "asc" }, { slug: "asc" }],
      include: {
        destination: { select: { slug: true } },
        venue: { select: { slug: true } },
        experience: { select: { slug: true } },
        translations: true,
        gallery: { orderBy: [{ sort_order: "asc" }, { url: "asc" }] },
      },
    }),
    prisma.article.findMany({
      orderBy: [{ sort_order: "asc" }, { slug: "asc" }],
      include: { translations: true },
    }),
    prisma.openPosition.findMany({
      orderBy: [{ sort_order: "asc" }, { slug: "asc" }],
      include: { translations: true },
    }),
  ]);

  const snapshot = {
    schemaVersion: 1,
    exportedAt: new Date().toISOString(),
    source: "database",
    locales: ["en", "id", "zh", "fr", "ja", "de"] as const,
    categories: categories.map(
      ({ id: _id, updated_at: _updatedAt, translations: rows, ...category }) => ({
        ...category,
        translations: translations(rows, "category_id"),
      }),
    ),
    destinations: destinations.map(
      ({
        id: _id,
        category_id: _categoryId,
        updated_at: _updatedAt,
        category,
        translations: rows,
        ...destination
      }) => ({
        ...destination,
        category_slug: category.slug,
        translations: translations(rows, "destination_id"),
      }),
    ),
    experiences: experiences.map(
      ({ id: _id, created_at: _createdAt, updated_at: _updatedAt, translations: rows, faqs, ...experience }) => ({
        ...experience,
        faqs: faqs.map(
          ({ id: _faqId, experience_id: _experienceId, translations: faqRows, ...faq }) => ({
            ...faq,
            translations: translations(faqRows, "faq_id"),
          }),
        ),
        translations: translations(rows, "experience_id"),
      }),
    ),
    venues: venues.map(
      ({
        id: _id,
        destination_id: _destinationId,
        updated_at: _updatedAt,
        experience_id: _experienceId,
        destination,
        experience,
        translations: rows,
        gallery,
        ...venue
      }) => ({
        ...venue,
        destination_slug: destination.slug,
        experience_slug: experience.slug,
        gallery: gallery.map(({ id: _imageId, venue_id: _venueId, ...image }) => image),
        translations: translations(rows, "venue_id"),
      }),
    ),
    themes: themes.map(
      ({
        id: _id,
        venue_id: _venueId,
        updated_at: _updatedAt,
        experience_id: _experienceId,
        venue,
        experience,
        translations: rows,
        gallery,
        ...theme
      }) => ({
        ...theme,
        venue_slug: venue?.slug ?? null,
        experience_slug: experience.slug,
        gallery: gallery.map(({ id: _imageId, theme_id: _themeId, ...image }) => image),
        translations: translations(rows, "theme_id"),
      }),
    ),
    portfolios: portfolios.map(
      ({
        id: _id,
        destination_id: _destinationId,
        venue_id: _venueId,
        created_at: _createdAt,
        updated_at: _updatedAt,
        experience_id: _experienceId,
        destination,
        venue,
        experience,
        translations: rows,
        gallery,
        ...portfolio
      }) => ({
        ...portfolio,
        destination_slug: destination?.slug ?? null,
        venue_slug: venue?.slug ?? null,
        experience_slug: experience?.slug ?? null,
        gallery: gallery.map(
          ({ id: _imageId, portfolio_id: _portfolioId, ...image }) => image,
        ),
        translations: translations(rows, "portfolio_id"),
      }),
    ),
    articles: articles.map(
      ({ id: _id, created_at: _createdAt, updated_at: _updatedAt, translations: rows, ...article }) => ({
        ...article,
        translations: translations(rows, "article_id"),
      }),
    ),
    positions: positions.map(
      ({ id: _id, created_at: _createdAt, updated_at: _updatedAt, translations: rows, ...position }) => ({
        ...position,
        translations: translations(rows, "position_id"),
      }),
    ),
  };

  const counts = {
    categories: snapshot.categories.length,
    destinations: snapshot.destinations.length,
    experiences: snapshot.experiences.length,
    venues: snapshot.venues.length,
    themes: snapshot.themes.length,
    portfolios: snapshot.portfolios.length,
    articles: snapshot.articles.length,
    positions: snapshot.positions.length,
  };

  const outputPath = fileURLToPath(
    new URL("../prisma/seed-data/content.json", import.meta.url),
  );
  mkdirSync(fileURLToPath(new URL("../prisma/seed-data", import.meta.url)), {
    recursive: true,
  });
  writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");

  console.log("Wrote", outputPath);
  console.log(counts);
}

main()
  .catch((error) => {
    console.error("Export failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
