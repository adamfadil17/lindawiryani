-- Adds a permanent "first published" watermark used to lock slugs.
-- Slugs may change while a record has never been published; after the first
-- publish they stay immutable even if the record is reverted to draft.
--
-- Backfill: records currently published are treated as already exposed.
-- Draft records are left NULL so their slugs remain editable. This cannot
-- detect records that were published and later reverted to draft before this
-- migration; they will remain editable once (acceptable one-time gap).

ALTER TABLE "destination_categories" ADD COLUMN "first_published_at" TIMESTAMP(3);
ALTER TABLE "destinations" ADD COLUMN "first_published_at" TIMESTAMP(3);
ALTER TABLE "wedding_experiences" ADD COLUMN "first_published_at" TIMESTAMP(3);
ALTER TABLE "venues" ADD COLUMN "first_published_at" TIMESTAMP(3);
ALTER TABLE "wedding_themes" ADD COLUMN "first_published_at" TIMESTAMP(3);
ALTER TABLE "articles" ADD COLUMN "first_published_at" TIMESTAMP(3);
ALTER TABLE "portfolios" ADD COLUMN "first_published_at" TIMESTAMP(3);
ALTER TABLE "open_positions" ADD COLUMN "first_published_at" TIMESTAMP(3);

UPDATE "destination_categories"
SET "first_published_at" = "published_at"
WHERE "status" = 'published' AND "published_at" IS NOT NULL;

UPDATE "destinations"
SET "first_published_at" = "published_at"
WHERE "status" = 'published' AND "published_at" IS NOT NULL;

UPDATE "wedding_experiences"
SET "first_published_at" = "published_at"
WHERE "status" = 'published' AND "published_at" IS NOT NULL;

UPDATE "venues"
SET "first_published_at" = "published_at"
WHERE "status" = 'published' AND "published_at" IS NOT NULL;

UPDATE "wedding_themes"
SET "first_published_at" = "published_at"
WHERE "status" = 'published' AND "published_at" IS NOT NULL;

UPDATE "articles"
SET "first_published_at" = "published_at"
WHERE "status" = 'published';

UPDATE "portfolios"
SET "first_published_at" = "published_at"
WHERE "status" = 'published' AND "published_at" IS NOT NULL;

UPDATE "open_positions"
SET "first_published_at" = "published_at"
WHERE "status" = 'published' AND "published_at" IS NOT NULL;
