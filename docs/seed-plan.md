# Content Seed Plan (`prisma/seed.ts`)

| | |
|---|---|
| **Status** | ✅ Implemented and verified on 2026-11-21 — snapshot, exporter, and consolidated `prisma/seed.ts` |
| **Purpose** | Make it possible to populate a new environment with the site’s content without restoring a full production database dump |
| **Applies to** | Destinations, categories, experiences, FAQs, venues, themes, portfolios, articles, open positions |
| **Does not include** | Users, inquiries, submissions, uploaded binaries, static marketing copy that already lives in the repo |

---

## 1. The current situation

`prisma/seed.ts` only creates the **first admin user** from:

```env
ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_NAME=
```

It does not seed content. A fresh database plus `npm run db:seed` produces an
empty site with one login.

The old content seed is gone. `docs/task.md` records that the Phase 3
`seed-content.ts` and parity tools were removed at the Phase 7 cutover, and that
new environments are expected to restore a **database dump** instead.

`prisma.config.ts` still points `db:seed` at `prisma/seed.ts`:

```ts
migrations: {
  path: "prisma/migrations",
  seed: "tsx prisma/seed.ts",
},
```

So today there are two separate concerns:

1. **Admin bootstrap** — `prisma/seed.ts`, already implemented.
2. **Content bootstrap** — not implemented; this document plans it.

---

## 2. What data exists now

The current local PostgreSQL database is the source of truth:

| Data | Rows |
|---|---:|
| Users | 2 |
| Destination categories | 4 |
| Destinations | 53 |
| Destination translations | 265 |
| Wedding experiences | 4 |
| Experience translations | 20 |
| Experience FAQs | 20 |
| Venues | 24 |
| Venue translations | 120 |
| Venue gallery images | 1,150 |
| Wedding themes | 21 |
| Theme translations | 105 |
| Theme gallery images | 48 |
| Articles | 14 |
| Article translations | 70 |
| Portfolios | 1 |
| Portfolio translations | 5 |
| Portfolio gallery images | 6 |
| Open positions | 4 |
| Position translations | 20 |
| Inquiries | 0 |
| Submissions | 0 |

Database size: about **16 MB**.

Media situation:

- Every current hero image and gallery image URL points to **Cloudinary**
  (`res.cloudinary.com`), about 1,204 gallery URLs plus hero images.
- The local `UPLOAD_DIR` is currently empty.
- New admin uploads will go to local VPS disk; those files are outside this
  seed and must be backed up separately.

Two content files intentionally stay in the repository and are **not** seeded:

- `src/lib/data/static/portfolio-reviews.json`
- `src/lib/data/static/experience-page-copy.json`

They ship with the application code.

---

## 3. Two ways to provision an environment

| Approach | Best for | Preserves | Drawbacks |
|---|---|---|---|
| **Database dump** (`pg_dump` / `pg_restore`) | First VPS launch, exact production clone, recovery | IDs, all content, users, submissions, galleries | Includes PII if users/inquiries are included; large binary-ish dump; not human-editable |
| **Content seed** (`prisma/seed.ts`) | Dev/staging, repeatable setup, onboarding | Content by slug, translations, galleries | Needs a maintained snapshot; cannot recreate users/sessions; needs schema updates |

**Recommendation**

- Use a **database dump** for the first production VPS.
- `prisma/seed.ts` now handles content for repeatable development/staging
  environments and as a fallback when a dump is not appropriate.
- The two mechanisms are complementary, not replacements for each other.

---

## 4. Where the seed data can come from

### A. Current database (primary source)

Export the content tables from the local DB into a JSON snapshot. This captures
the latest admin edits, all translations, galleries, statuses, and timestamps.

This is the most accurate source for a seed that matches what is live now.

### B. Old branch data (fallback / original source)

The repository still contains the original static data on some branches:

| Branch | Data files found |
|---|---:|
| `main` | 83 |
| `origin/lindawiryani-beta` | 83 |
| `integration` (current) | 31 (only remaining static copy) |
| `frontend-new` | 12 |
| `translate-web` | 10 |

The full old layout includes:

```
src/lib/data/base/
  article-base.ts
  destination-base.ts
  portfolio-base.ts
  portfolio-media.ts
  venue-base.ts
  venue-media.ts
  wedding-experience-base.ts
  wedding-experience-media.ts
  wedding-theme-base.ts
  wedding-theme-media.ts
  working-with-us-base.ts

src/lib/data/translate/{en,id,zh,fr,ja,de}/
  article-text.*.ts
  destination-text.*.ts
  portfolio-text.*.ts
  venue-text.*.ts
  wedding-experience-text.*.ts
  wedding-theme-text.*.ts

src/lib/data/static/
  experience-page-copy.json
  portfolio-reviews.json
```

Caveats if this is used:

- It is an **older snapshot**, not necessarily the current DB content.
- Old entities use numeric/legacy IDs (for example venue media keys are `"1"`,
  `"2"`, …); the current schema uses UUIDs and slugs. A converter must map old
  IDs → slugs.
- The old branch predates some current fields and tables:
  - category slugs,
  - FAQ slugs,
  - open-position slugs,
  - proposal `first_published_at`,
  - gallery tables in their current shape.
- The old branch does not contain `prisma/seed-content.ts`; it was never
  committed.
- Cloudinary URLs are present, so no image binaries are needed.

If the old branch is used, we need **the branch name or commit hash**, read
access, and confirmation that it is the intended content snapshot. Otherwise the
current DB export is safer.

### C. Static files

`src/lib/data/static/*` is deployed with the app and needs no seeding.

### D. Media

- Existing images: Cloudinary URLs stored in the DB.
- Future uploads: copy `UPLOAD_DIR` separately; never put binaries in the seed
  JSON.

---

## 5. Snapshot format

The seed reads one JSON file. IDs are deliberately omitted; relations use slugs.

```json
{
  "schemaVersion": 1,
  "exportedAt": "2026-11-20T12:00:00.000Z",
  "source": "local-db | old-branch-name",
  "categories": [
    {
      "slug": "bali",
      "name": "Bali",
      "status": "published",
      "sortOrder": 0,
      "translations": {
        "id": { "name": "Bali" },
        "de": { "name": "Bali" }
      }
    }
  ],
  "destinations": [
    {
      "slug": "amed",
      "name": "Amed",
      "categorySlug": "bali",
      "type": "Raw Coastal Simplicity",
      "description": "...",
      "longDescription": "...",
      "location": "East Bali",
      "atmosphere": "...",
      "accessibilityNotes": "...",
      "seasonalConsiderations": "...",
      "guestCapacity": "5 - 60",
      "image": "https://res.cloudinary.com/...",
      "highlights": ["..."],
      "bestFor": ["..."],
      "ceremonyOptions": ["..."],
      "receptionOptions": ["..."],
      "accommodationNearby": ["..."],
      "diningExperiences": ["..."],
      "uniqueFeatures": ["..."],
      "status": "published",
      "publishedAt": "2026-...",
      "firstPublishedAt": "2026-...",
      "sortOrder": 0,
      "translations": { "de": { "description": "..." } }
    }
  ],
  "experiences": [],
  "venues": [],
  "themes": [],
  "portfolios": [],
  "articles": [],
  "positions": []
}
```

The snapshot deliberately excludes:

- `users`
- `inquiry_submissions`
- `submissions`
- local binary files
- Next.js cache or sitemap output

---

## 6. Files

```
scripts/export-content.ts          # DB → prisma/seed-data/content.json
prisma/seed-data/content.json      # content snapshot
prisma/seed.ts                     # single entrypoint: content + optional admin
```

Package scripts:

```json
"db:export:content": "tsx scripts/export-content.ts",
"db:seed": "npx prisma db seed"
```

---

## 7. Seeder algorithm

### Order

1. Destination categories
2. Destinations (needs category)
3. Wedding experiences + FAQs
4. Venues (needs destination + experience)
5. Wedding themes (needs experience, optional venue)
6. Portfolios (optional destination/venue/experience)
7. Articles
8. Open positions

This order guarantees every foreign key is available before it is referenced.

### Idempotency

Every entity is upserted by its unique `slug`:

- If the slug exists → update the base row.
- If it does not → create it.

The seed does **not** delete records that are missing from the snapshot by
default. A future `--prune` flag can opt into that explicitly.

### Relations

Build slug → UUID maps after each parent pass:

```ts
const categoryIds = new Map(rows.map((row) => [row.slug, row.id]));
```

Then convert snapshot relation slugs to IDs as records are created/updated.

### Translations

Use the existing translation normalizer:

```ts
buildTranslationRows("destination", item.translations)
```

The snapshot stores translations keyed by locale (`{ id: {...}, de: {...} }`),
which is the shape `buildTranslationRows` expects.

For updates, replace translations atomically:

```ts
translations: { deleteMany: {}, create: rows }
```

For creates:

```ts
translations: { create: rows }
```

### Galleries

Venues, themes, and portfolios store galleries in child tables. The seed should
replace the gallery from the snapshot:

```ts
gallery: existing
  ? { deleteMany: {}, create: galleryRows }
  : { create: galleryRows }
```

`sortOrder` comes from the snapshot; otherwise array index is used.

### Publication fields

The seed should produce content visible on the public site:

- `status: "published"` if the snapshot says published.
- `published_at`: from the snapshot, otherwise the seed timestamp.
- `first_published_at`: from the snapshot, otherwise the publish timestamp.
- `draft` records stay drafts.

Slug locking does **not** apply: the current policy allows slug changes at any
status, and the seed should be able to upsert a changed slug.

### Rich text

Run article and portfolio content through `sanitizeRichText` before writing.

### FAQs

FAQs are owned by an experience. For simplicity the seeder can replace all FAQs
for that experience:

```ts
await prisma.experienceFaq.deleteMany({ where: { experience_id } });
```

Then recreate them from the snapshot with their translations. FAQ IDs are not
referenced externally, so replacing them is safe.

---

## 8. Proposed `prisma/seed.ts`

> **Implemented.** The real file uses the snapshot’s Prisma-style
> `snake_case` fields directly and is now consolidated into `prisma/seed.ts`. The
> sketch below documents the original approach; the implementation also
> handles FAQs, galleries, publications, and all entity relations.

This is the proposed shape, not an existing file:

```ts
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { prisma } from "../src/lib/prisma";
import { buildTranslationRows } from "../src/lib/content/translations";
import { sanitizeRichText } from "../src/lib/sanitize";
import type { TranslationEntity } from "../src/lib/content/translation-fields";

type LocaleMap = Record<string, Record<string, unknown>>;

interface Snapshot {
  schemaVersion: number;
  categories: any[];
  destinations: any[];
  experiences: any[];
  venues: any[];
  themes: any[];
  portfolios: any[];
  articles: any[];
  positions: any[];
}

const snapshot: Snapshot = JSON.parse(
  readFileSync(
    fileURLToPath(new URL("./seed-data/content.json", import.meta.url)),
    "utf8",
  ),
);

const translations = (entity: TranslationEntity, map: LocaleMap | undefined) =>
  buildTranslationRows(entity, map);

const nestedTranslations = (
  exists: boolean,
  entity: TranslationEntity,
  map: LocaleMap | undefined,
) => {
  const rows = translations(entity, map);
  return exists
    ? { deleteMany: {}, create: rows as never }
    : { create: rows as never };
};

const publication = (item: any) => {
  if (item.status !== "published") return { status: "draft" as const };
  const publishedAt = item.publishedAt ? new Date(item.publishedAt) : new Date();
  return {
    status: "published" as const,
    published_at: publishedAt,
    first_published_at: item.firstPublishedAt
      ? new Date(item.firstPublishedAt)
      : publishedAt,
  };
};

async function seedCategories() {
  for (const item of snapshot.categories) {
    const existing = await prisma.destinationCategory.findUnique({
      where: { slug: item.slug },
      select: { id: true },
    });
    const data = {
      name: item.name,
      sort_order: item.sortOrder ?? 0,
      ...publication(item),
      translations: nestedTranslations(Boolean(existing), "category", item.translations),
    };

    if (existing) {
      await prisma.destinationCategory.update({ where: { id: existing.id }, data });
    } else {
      await prisma.destinationCategory.create({ data: { slug: item.slug, ...data } });
    }
  }
}

async function seedDestinations() {
  const categoryIds = new Map(
    (await prisma.destinationCategory.findMany({ select: { id: true, slug: true } }))
      .map((row) => [row.slug, row.id]),
  );

  for (const item of snapshot.destinations) {
    const categoryId = categoryIds.get(item.categorySlug);
    if (!categoryId) throw new Error(`Unknown category: ${item.categorySlug}`);

    const existing = await prisma.destination.findUnique({
      where: { slug: item.slug },
      select: { id: true },
    });
    const data = {
      name: item.name,
      category_id: categoryId,
      type: item.type,
      description: item.description,
      long_description: item.longDescription,
      location: item.location,
      atmosphere: item.atmosphere,
      accessibility_notes: item.accessibilityNotes,
      seasonal_considerations: item.seasonalConsiderations,
      guest_capacity: item.guestCapacity,
      image: item.image,
      highlights: item.highlights ?? [],
      best_for: item.bestFor ?? [],
      ceremony_options: item.ceremonyOptions ?? [],
      reception_options: item.receptionOptions ?? [],
      accommodation_nearby: item.accommodationNearby ?? [],
      dining_experiences: item.diningExperiences ?? [],
      unique_features: item.uniqueFeatures ?? [],
      sort_order: item.sortOrder ?? 0,
      ...publication(item),
      translations: nestedTranslations(Boolean(existing), "destination", item.translations),
    };

    if (existing) {
      await prisma.destination.update({ where: { id: existing.id }, data });
    } else {
      await prisma.destination.create({ data: { slug: item.slug, ...data } });
    }
  }
}

// Experiences, venues, themes, portfolios, articles, and positions follow the
// same pattern:
//   experiences → FAQs + translations
//   venues      → destination/experience lookup + gallery + translations
//   themes      → experience/optional venue + gallery + translations
//   portfolios  → optional relations + gallery + sanitized content
//   articles    → category enum + required published_at + sanitized content
//   positions   → title/type/level/desc/is_active + translations

async function main() {
  if (snapshot.schemaVersion !== 1) {
    throw new Error(`Unsupported seed schema version: ${snapshot.schemaVersion}`);
  }

  await seedCategories();
  await seedDestinations();

  console.log("Content seed complete.");
}

main()
  .catch((error) => {
    console.error("Content seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

The remaining entity functions would be added following the same structure. The
exact field list should be taken from `prisma/schema.prisma`, not from old static
types.

---

## 9. Exporter plan (`scripts/export-content.ts`)

The exporter is required before the seed can work.

Inputs:

- `DATABASE_URL`
- current Prisma schema

Read:

- `destination_categories` + translations
- `destinations` + translations
- `wedding_experiences` + translations + FAQs + FAQ translations
- `venues` + translations + `venue_images`
- `wedding_themes` + translations + `wedding_theme_images`
- `portfolios` + translations + `portfolio_images`
- `articles` + translations
- `open_positions` + translations

Exclude:

- `users`
- `inquiry_submissions`
- `submissions`
- `_prisma_migrations`

Transform:

- IDs → slugs for relations:
  - `category_id` → category `slug`
  - `destination_id` → destination `slug`
  - `experience_id` → experience `slug`
  - `venue_id` → venue `slug`
- translation rows → object keyed by locale
- gallery rows → `{ url, sortOrder }`
- dates → ISO strings
- remove internal IDs and timestamps

Output:

- `prisma/seed-data/content.json`
- optional `prisma/seed-data/summary.json` with counts for verification

The snapshot should be deterministic enough to diff between exports.

---

## 10. Running it

On a new environment:

```bash
npx prisma migrate deploy
npm run db:seed           # content + optional admin
npm run build
```

If the seed runs while the app is live, restart/reload the app afterwards so
Next.js caches and public pages pick up the new data.

---

## 11. Verification checklist

After seeding:

- [ ] Counts match the snapshot:
  - 4 categories
  - 53 destinations / 265 translations
  - 4 experiences / 20 translations / 20 FAQs
  - 24 venues / 120 translations / 1,150 gallery rows
  - 21 themes / 105 translations / 48 gallery rows
  - 14 articles / 70 translations
  - 1 portfolio / 5 translations / 6 gallery rows
  - 4 positions / 20 translations
- [ ] Every relation resolves by slug (no missing category/destination/experience).
- [ ] Public list pages render the same counts.
- [ ] Detail pages load for one record per entity and locale.
- [ ] At least one Cloudinary image loads on each entity type.
- [ ] Admin list pages show the seeded records.
- [ ] Re-running the seed does not duplicate rows.
- [ ] `prisma migrate deploy` succeeds on the target DB.
- [ ] `npm run build` passes.

---

## 12. Risks and gotchas

| Risk | Mitigation |
|---|---|
| Seed snapshot is stale vs current DB | Export from the current DB before launching; treat old branch data as fallback only |
| Old data uses numeric IDs | Convert to slug-based relations before writing |
| Schema drift breaks the seed | Keep snapshot types and field mapping updated; bump `schemaVersion` |
| Missing translations | Validate locale keys against `TRANSLATION_LOCALE_CODES` |
| Duplicate slugs | Upsert by slug; catch `P2002` and report the row |
| Deleting content unintentionally | No pruning by default; require `--prune` |
| Losing media | Keep Cloudinary URLs; copy `UPLOAD_DIR` for local files |
| PII in seed | Never export users, inquiries, or submissions |
| Seed runs against production accidentally | Require an explicit `DATABASE_URL`; log host/database before writing |
| Long-running seed | Process per entity, not one giant transaction |

---

## 13. Open decisions

1. Is the seed snapshot the **current DB** or the **old branch** content?
2. If old branch: which branch/commit, and is it the authoritative snapshot?
3. Commit `prisma/seed-data/content.json`, or ship it as an artifact outside Git?
4. Keep translations for all five locales in the seed, or English only?
5. Allow `--prune` for records removed from the snapshot?
6. Should the seeder be allowed to overwrite existing content on every run, or
   only create missing rows? (Upsert-by-slug is the proposed default.)
7. ~~Should `db:seed` remain admin-only?~~ Decided: `db:seed` seeds content and optionally the admin.

---

## 14. Recommendation

For the first VPS deployment, use a **database dump**. It is exact, includes all
content and translations, and avoids schema/data mapping work.

`prisma/seed.ts` now handles both content and the optional admin account. Build it from a snapshot exported from the current DB; use the old
branch data only if the current DB is unavailable or if an older snapshot is
intentionally desired.

---

## 15. Decision log — 2026-11-21

### Confirmed decisions

- **Source of truth:** the current database. When the old branch and DB differ,
  the DB wins.
- **Old branch:** `origin/lindawiryani-beta` may be read read-only for comparison
  (`main` contains identical data files). It is not checked out or modified.
- **Locales:** English base fields + `id`, `zh`, `fr`, `ja`, `de` translations.
  English is the fallback and is not duplicated inside `translations`.
- **Status:** everything in the snapshot is `published`.
- **Enum values:** current Prisma values (`Planning_Advice`, `luxury_weddings`,
  etc.), not the old display labels.
- **IDs:** no IDs are exported or inserted. Prisma generates UUIDs for new rows;
  upserts find existing rows by `slug`.
- **Snapshot storage:** `prisma/seed-data/content.json`.

### Snapshot implementation

- Exporter: `scripts/export-content.ts`
  - run with `npx tsx scripts/export-content.ts`
  - rebuilds the snapshot from the current DB.
- Snapshot: `prisma/seed-data/content.json`
  - 2.8 MB
  - 4 categories, 53 destinations, 4 experiences (+20 FAQs), 24 venues,
    21 themes, 1 portfolio, 14 articles, 4 positions
  - no `id`, `created_at`, or `updated_at` fields
  - relations use slugs: `category_slug`, `destination_slug`,
    `experience_slug`, `venue_slug`
  - galleries are `{ url, sort_order }[]`
  - translations are keyed by locale
  - field names mirror Prisma (`snake_case`) rather than the camelCase example
    earlier in this document, to make the future seeder a direct mapping

### Old branch vs DB comparison

Counts match for every entity. One slug differs:

```
old branch: bali-botanical-garden-wedding
current DB: bali-botanical-garden
```

The DB value is used. Old branch article categories use display labels; the
snapshot uses the current Prisma enum names. All Cloudinary image URLs are
present in the snapshot; no binaries are needed.

### Built and verified

1. `prisma/seed.ts` — single entrypoint: content plus the optional first-admin
   seed, using slug upserts and old-ID-free relation maps. If
   `ADMIN_EMAIL`/`ADMIN_PASSWORD` are not set, the admin step is skipped with a
   warning and content still seeds.
2. `scripts/export-content.ts` — implemented; regenerates the snapshot from
   the current DB.
3. Package scripts:
   - `npm run db:export:content`
   - `npm run db:seed`
4. Tested against a fresh scratch database:
   - migrations applied,
   - seed ran twice without duplicating rows,
   - counts matched: 4 categories, 53 destinations, 4 experiences + 20 FAQs,
     24 venues, 21 themes, 1 portfolio, 14 articles, 4 positions,
   - galleries matched: 1,150 venue, 48 theme, 6 portfolio images,
   - translations matched for all five locales,
   - all generated IDs were UUIDs,
   - venue → destination/experience relations were intact,
   - all test data remained outside the production DB; scratch DB was dropped.

The seed does not insert any old numeric IDs. Slugs are the only stable keys
used by the snapshot; Prisma generates UUIDs for new rows.

