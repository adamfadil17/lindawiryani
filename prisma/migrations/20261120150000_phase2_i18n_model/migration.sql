-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('draft', 'published');

-- DropForeignKey
ALTER TABLE "experience_faqs" DROP CONSTRAINT "experience_faqs_experience_id_fkey";

-- DropForeignKey
ALTER TABLE "venue_images" DROP CONSTRAINT "venue_images_venue_id_fkey";

-- DropForeignKey
ALTER TABLE "wedding_theme_images" DROP CONSTRAINT "wedding_theme_images_theme_id_fkey";

-- DropForeignKey
ALTER TABLE "portfolio_images" DROP CONSTRAINT "portfolio_images_portfolio_id_fkey";

-- AlterTable
ALTER TABLE "destination_categories" ADD COLUMN     "published_at" TIMESTAMP(3),
ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "ContentStatus" NOT NULL DEFAULT 'draft';

-- AlterTable
ALTER TABLE "destinations" ADD COLUMN     "published_at" TIMESTAMP(3),
ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "ContentStatus" NOT NULL DEFAULT 'draft';

-- AlterTable
ALTER TABLE "wedding_experiences" ADD COLUMN     "published_at" TIMESTAMP(3),
ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "ContentStatus" NOT NULL DEFAULT 'draft';

-- AlterTable
ALTER TABLE "venues" ADD COLUMN     "published_at" TIMESTAMP(3),
ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "ContentStatus" NOT NULL DEFAULT 'draft';

-- AlterTable
ALTER TABLE "wedding_themes" ADD COLUMN     "published_at" TIMESTAMP(3),
ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "ContentStatus" NOT NULL DEFAULT 'draft';

-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "ContentStatus" NOT NULL DEFAULT 'draft';

-- AlterTable
ALTER TABLE "portfolios" ADD COLUMN     "published_at" TIMESTAMP(3),
ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "ContentStatus" NOT NULL DEFAULT 'draft';

-- AlterTable
ALTER TABLE "inquiry_submissions" DROP COLUMN "approximate_wedding_budget",
DROP COLUMN "arrival_date",
DROP COLUMN "departure_date",
DROP COLUMN "hotel_name_in_bali",
DROP COLUMN "name_of_bride",
DROP COLUMN "name_of_groom",
DROP COLUMN "nationality_of_bride",
DROP COLUMN "nationality_of_groom",
DROP COLUMN "number_of_attendance",
DROP COLUMN "religion_of_bride",
DROP COLUMN "religion_of_groom",
DROP COLUMN "telephone",
DROP COLUMN "wedding_venue",
DROP COLUMN "your_address",
DROP COLUMN "your_email",
DROP COLUMN "your_message",
DROP COLUMN "your_name",
ADD COLUMN     "email_or_whatsapp" TEXT NOT NULL,
ADD COLUMN     "estimated_budget" TEXT,
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "how_did_you_find_us" TEXT,
ADD COLUMN     "locale" TEXT,
ADD COLUMN     "number_of_guests" TEXT,
ADD COLUMN     "services_needed" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "venue_secured" TEXT,
ADD COLUMN     "wedding_location_interest" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "wedding_style" TEXT,
ADD COLUMN     "your_vision" TEXT,
ALTER COLUMN "wedding_date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "open_positions" ADD COLUMN     "published_at" TIMESTAMP(3),
ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "ContentStatus" NOT NULL DEFAULT 'draft';

-- CreateTable
CREATE TABLE "destination_category_translations" (
    "id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "destination_category_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destination_translations" (
    "id" TEXT NOT NULL,
    "destination_id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT,
    "type" TEXT,
    "description" TEXT,
    "long_description" TEXT,
    "location" TEXT,
    "atmosphere" TEXT,
    "accessibility_notes" TEXT,
    "seasonal_considerations" TEXT,
    "guest_capacity" TEXT,
    "highlights" JSONB,
    "best_for" JSONB,
    "ceremony_options" JSONB,
    "reception_options" JSONB,
    "accommodation_nearby" JSONB,
    "dining_experiences" JSONB,
    "unique_features" JSONB,

    CONSTRAINT "destination_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wedding_experience_translations" (
    "id" TEXT NOT NULL,
    "experience_id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT,
    "hero_desc" TEXT,
    "intro_label" TEXT,
    "intro_heading" JSONB,
    "intro_body" TEXT,
    "intro_list_label" TEXT,
    "intro_list" JSONB,
    "intro_footnote" TEXT,
    "approach_label" TEXT,
    "approach_heading" JSONB,
    "approach_body" TEXT,
    "approach_list_label" TEXT,
    "approach_list" JSONB,
    "services_label" TEXT,
    "services_heading" JSONB,
    "services_list" JSONB,
    "services_footnote" TEXT,
    "services_dark_label" TEXT,
    "services_dark_heading" JSONB,
    "services_dark_body" TEXT,
    "services_dark_list" JSONB,
    "closing_label" TEXT,
    "closing_heading" JSONB,
    "closing_body" TEXT,
    "closing_couple_label" TEXT,
    "closing_couple_values" JSONB,

    CONSTRAINT "wedding_experience_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experience_faq_translations" (
    "id" TEXT NOT NULL,
    "faq_id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "question" TEXT,
    "answer" TEXT,

    CONSTRAINT "experience_faq_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venue_translations" (
    "id" TEXT NOT NULL,
    "venue_id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT,
    "slogan" TEXT,
    "description" TEXT,

    CONSTRAINT "venue_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wedding_theme_translations" (
    "id" TEXT NOT NULL,
    "theme_id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "inclusions" JSONB,

    CONSTRAINT "wedding_theme_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_translations" (
    "id" TEXT NOT NULL,
    "article_id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT,
    "excerpt" TEXT,
    "content" TEXT,

    CONSTRAINT "article_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_translations" (
    "id" TEXT NOT NULL,
    "portfolio_id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "subtitle" TEXT,
    "excerpt" TEXT,
    "origin" TEXT,
    "review" TEXT,
    "content" TEXT,
    "story_sections" JSONB,
    "tags" JSONB,
    "credit_role" TEXT,
    "credit_location_detail" TEXT,
    "credit_couple_origin" TEXT,

    CONSTRAINT "portfolio_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "open_position_translations" (
    "id" TEXT NOT NULL,
    "position_id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT,
    "desc" TEXT,

    CONSTRAINT "open_position_translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "destination_category_translations_category_id_locale_key" ON "destination_category_translations"("category_id", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "destination_translations_destination_id_locale_key" ON "destination_translations"("destination_id", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "wedding_experience_translations_experience_id_locale_key" ON "wedding_experience_translations"("experience_id", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "experience_faq_translations_faq_id_locale_key" ON "experience_faq_translations"("faq_id", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "venue_translations_venue_id_locale_key" ON "venue_translations"("venue_id", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "wedding_theme_translations_theme_id_locale_key" ON "wedding_theme_translations"("theme_id", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "article_translations_article_id_locale_key" ON "article_translations"("article_id", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "portfolio_translations_portfolio_id_locale_key" ON "portfolio_translations"("portfolio_id", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "open_position_translations_position_id_locale_key" ON "open_position_translations"("position_id", "locale");

-- CreateIndex
CREATE INDEX "destination_categories_status_sort_order_idx" ON "destination_categories"("status", "sort_order");

-- CreateIndex
CREATE INDEX "destinations_category_id_idx" ON "destinations"("category_id");

-- CreateIndex
CREATE INDEX "destinations_status_sort_order_idx" ON "destinations"("status", "sort_order");

-- CreateIndex
CREATE INDEX "wedding_experiences_status_sort_order_idx" ON "wedding_experiences"("status", "sort_order");

-- CreateIndex
CREATE INDEX "experience_faqs_experience_id_idx" ON "experience_faqs"("experience_id");

-- CreateIndex
CREATE INDEX "venues_destination_id_idx" ON "venues"("destination_id");

-- CreateIndex
CREATE INDEX "venues_experience_id_idx" ON "venues"("experience_id");

-- CreateIndex
CREATE INDEX "venues_status_sort_order_idx" ON "venues"("status", "sort_order");

-- CreateIndex
CREATE INDEX "venue_images_venue_id_idx" ON "venue_images"("venue_id");

-- CreateIndex
CREATE INDEX "wedding_themes_venue_id_idx" ON "wedding_themes"("venue_id");

-- CreateIndex
CREATE INDEX "wedding_themes_experience_id_idx" ON "wedding_themes"("experience_id");

-- CreateIndex
CREATE INDEX "wedding_themes_status_sort_order_idx" ON "wedding_themes"("status", "sort_order");

-- CreateIndex
CREATE INDEX "wedding_theme_images_theme_id_idx" ON "wedding_theme_images"("theme_id");

-- CreateIndex
CREATE INDEX "articles_status_sort_order_idx" ON "articles"("status", "sort_order");

-- CreateIndex
CREATE INDEX "portfolios_destination_id_idx" ON "portfolios"("destination_id");

-- CreateIndex
CREATE INDEX "portfolios_venue_id_idx" ON "portfolios"("venue_id");

-- CreateIndex
CREATE INDEX "portfolios_experience_id_idx" ON "portfolios"("experience_id");

-- CreateIndex
CREATE INDEX "portfolios_status_sort_order_idx" ON "portfolios"("status", "sort_order");

-- CreateIndex
CREATE INDEX "portfolio_images_portfolio_id_idx" ON "portfolio_images"("portfolio_id");

-- CreateIndex
CREATE INDEX "inquiry_submissions_status_submitted_at_idx" ON "inquiry_submissions"("status", "submitted_at");

-- CreateIndex
CREATE INDEX "open_positions_status_sort_order_idx" ON "open_positions"("status", "sort_order");

-- AddForeignKey
ALTER TABLE "destination_category_translations" ADD CONSTRAINT "destination_category_translations_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "destination_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destination_translations" ADD CONSTRAINT "destination_translations_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wedding_experience_translations" ADD CONSTRAINT "wedding_experience_translations_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "wedding_experiences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_faqs" ADD CONSTRAINT "experience_faqs_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "wedding_experiences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_faq_translations" ADD CONSTRAINT "experience_faq_translations_faq_id_fkey" FOREIGN KEY ("faq_id") REFERENCES "experience_faqs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_translations" ADD CONSTRAINT "venue_translations_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_images" ADD CONSTRAINT "venue_images_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wedding_theme_translations" ADD CONSTRAINT "wedding_theme_translations_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "wedding_themes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wedding_theme_images" ADD CONSTRAINT "wedding_theme_images_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "wedding_themes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_translations" ADD CONSTRAINT "article_translations_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_translations" ADD CONSTRAINT "portfolio_translations_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_images" ADD CONSTRAINT "portfolio_images_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "open_position_translations" ADD CONSTRAINT "open_position_translations_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "open_positions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

