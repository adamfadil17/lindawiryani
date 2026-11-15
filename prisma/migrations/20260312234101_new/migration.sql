/*
  Warnings:

  - You are about to drop the column `content` on the `venues` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `venues` table. All the data in the column will be lost.
  - You are about to drop the column `featured_image` on the `venues` table. All the data in the column will be lost.
  - You are about to drop the column `is_featured` on the `venues` table. All the data in the column will be lost.
  - You are about to drop the column `location_id` on the `venues` table. All the data in the column will be lost.
  - You are about to drop the column `og_image` on the `venues` table. All the data in the column will be lost.
  - You are about to drop the column `venue_type` on the `venues` table. All the data in the column will be lost.
  - You are about to drop the column `wedding_theme_id` on the `venues` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `wedding_experiences` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `wedding_experiences` table. All the data in the column will be lost.
  - You are about to drop the column `featured_image` on the `wedding_experiences` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `wedding_experiences` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `wedding_themes` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `wedding_themes` table. All the data in the column will be lost.
  - You are about to drop the column `og_image` on the `wedding_themes` table. All the data in the column will be lost.
  - You are about to drop the `galleries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inquiries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `locations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `capacity` to the `venues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination_id` to the `venues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience_id` to the `venues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `venues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slogan` to the `venues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starting_price` to the `venues` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `venues` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `approach_body` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approach_heading` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approach_image` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approach_label` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approach_list` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `closing_body` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `closing_couple_values` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `closing_heading` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `closing_image` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `closing_label` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hero_desc` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hero_image` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hero_style` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intro_body` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intro_heading` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intro_images` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intro_label` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intro_list` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `services_dark_body` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `services_dark_heading` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `services_dark_label` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `services_dark_list` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `services_footnote` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `services_heading` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `services_label` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `services_list` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `wedding_experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience_id` to the `wedding_themes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `wedding_themes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inclusions` to the `wedding_themes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme_name` to the `wedding_themes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `wedding_themes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `wedding_themes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venue_id` to the `wedding_themes` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `wedding_themes` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "WeddingExperienceHeroStyle" AS ENUM ('split', 'centered', 'editorial', 'bottom');

-- CreateEnum
CREATE TYPE "WeddingThemeType" AS ENUM ('ELOPEMENT', 'INTIMATE');

-- CreateEnum
CREATE TYPE "WeddingExperienceType" AS ENUM ('elopement-weddings', 'intimate-weddings', 'luxury-weddings', 'private-villa-weddings');

-- CreateEnum
CREATE TYPE "ArticleCategory" AS ENUM ('All', 'Guides', 'Planning Advice', 'Destination Knowledge', 'Venue & Location', 'Real Weddings', 'Design & Concept');

-- CreateEnum
CREATE TYPE "SubmissionType" AS ENUM ('vendor', 'career');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('new', 'reviewed', 'contacted', 'archived');

-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('new', 'reviewed', 'quoted', 'booked', 'archived');

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_portfolio_id_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_service_id_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_theme_id_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_venue_id_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_wedding_experiences_id_fkey";

-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "venues" DROP CONSTRAINT "venues_location_id_fkey";

-- DropForeignKey
ALTER TABLE "venues" DROP CONSTRAINT "venues_wedding_theme_id_fkey";

-- AlterTable
ALTER TABLE "venues" DROP COLUMN "content",
DROP COLUMN "created_at",
DROP COLUMN "featured_image",
DROP COLUMN "is_featured",
DROP COLUMN "location_id",
DROP COLUMN "og_image",
DROP COLUMN "venue_type",
DROP COLUMN "wedding_theme_id",
ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "destination_id" TEXT NOT NULL,
ADD COLUMN     "experience_id" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "slogan" TEXT NOT NULL,
ADD COLUMN     "starting_price" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "wedding_experiences" DROP COLUMN "content",
DROP COLUMN "description",
DROP COLUMN "featured_image",
DROP COLUMN "title",
ADD COLUMN     "approach_body" TEXT NOT NULL,
ADD COLUMN     "approach_heading" JSONB NOT NULL,
ADD COLUMN     "approach_image" TEXT NOT NULL,
ADD COLUMN     "approach_label" TEXT NOT NULL,
ADD COLUMN     "approach_list" JSONB NOT NULL,
ADD COLUMN     "approach_list_label" TEXT,
ADD COLUMN     "category" "WeddingExperienceType" NOT NULL,
ADD COLUMN     "closing_body" TEXT NOT NULL,
ADD COLUMN     "closing_couple_label" TEXT,
ADD COLUMN     "closing_couple_values" JSONB NOT NULL,
ADD COLUMN     "closing_heading" JSONB NOT NULL,
ADD COLUMN     "closing_image" TEXT NOT NULL,
ADD COLUMN     "closing_label" TEXT NOT NULL,
ADD COLUMN     "hero_desc" TEXT NOT NULL,
ADD COLUMN     "hero_image" TEXT NOT NULL,
ADD COLUMN     "hero_style" "WeddingExperienceHeroStyle" NOT NULL,
ADD COLUMN     "intro_body" TEXT NOT NULL,
ADD COLUMN     "intro_footnote" TEXT,
ADD COLUMN     "intro_heading" JSONB NOT NULL,
ADD COLUMN     "intro_images" JSONB NOT NULL,
ADD COLUMN     "intro_label" TEXT NOT NULL,
ADD COLUMN     "intro_list" JSONB NOT NULL,
ADD COLUMN     "intro_list_label" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "services_dark_body" TEXT NOT NULL,
ADD COLUMN     "services_dark_heading" JSONB NOT NULL,
ADD COLUMN     "services_dark_label" TEXT NOT NULL,
ADD COLUMN     "services_dark_list" JSONB NOT NULL,
ADD COLUMN     "services_footnote" TEXT NOT NULL,
ADD COLUMN     "services_heading" JSONB NOT NULL,
ADD COLUMN     "services_label" TEXT NOT NULL,
ADD COLUMN     "services_list" JSONB NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "wedding_themes" DROP COLUMN "created_at",
DROP COLUMN "name",
DROP COLUMN "og_image",
ADD COLUMN     "experience_id" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "inclusions" JSONB NOT NULL,
ADD COLUMN     "theme_name" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" "WeddingThemeType" NOT NULL,
ADD COLUMN     "venue_id" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- DropTable
DROP TABLE "galleries";

-- DropTable
DROP TABLE "images";

-- DropTable
DROP TABLE "inquiries";

-- DropTable
DROP TABLE "locations";

-- DropTable
DROP TABLE "services";

-- CreateTable
CREATE TABLE "destination_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "destination_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destinations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "long_description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "atmosphere" TEXT NOT NULL,
    "accessibility_notes" TEXT NOT NULL,
    "seasonal_considerations" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "guest_capacity" TEXT NOT NULL,
    "highlights" JSONB NOT NULL,
    "best_for" JSONB NOT NULL,
    "ceremony_options" JSONB NOT NULL,
    "reception_options" JSONB NOT NULL,
    "accommodation_nearby" JSONB NOT NULL,
    "dining_experiences" JSONB NOT NULL,
    "unique_features" JSONB NOT NULL,

    CONSTRAINT "destinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experience_faqs" (
    "id" TEXT NOT NULL,
    "experience_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "experience_faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venue_images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "venue_id" TEXT NOT NULL,

    CONSTRAINT "venue_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wedding_theme_images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "theme_id" TEXT NOT NULL,

    CONSTRAINT "wedding_theme_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "ArticleCategory" NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolios" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "couple" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "destination_id" TEXT NOT NULL,
    "venue_id" TEXT NOT NULL,
    "experience_id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "tags" JSONB NOT NULL,
    "excerpt" TEXT NOT NULL,
    "origin" TEXT,
    "review" TEXT,
    "content" TEXT,
    "story_sections" JSONB NOT NULL,
    "credit_role" TEXT NOT NULL,
    "credit_planner" TEXT NOT NULL,
    "credit_location_detail" TEXT NOT NULL,
    "credit_couple_origin" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "portfolios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "portfolio_id" TEXT NOT NULL,

    CONSTRAINT "portfolio_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submissions" (
    "id" TEXT NOT NULL,
    "type" "SubmissionType" NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'new',
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "company_name" TEXT,
    "contact_person" TEXT,
    "vendor_category" TEXT,
    "years_in_business" TEXT,
    "portfolio_link" TEXT,
    "website" TEXT,
    "full_name" TEXT,
    "position" TEXT,
    "experience" TEXT,
    "linked_in" TEXT,
    "cover_letter" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT,

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inquiry_submissions" (
    "id" TEXT NOT NULL,
    "status" "InquiryStatus" NOT NULL DEFAULT 'new',
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "your_name" TEXT NOT NULL,
    "your_email" TEXT NOT NULL,
    "your_address" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "name_of_groom" TEXT NOT NULL,
    "religion_of_groom" TEXT NOT NULL,
    "nationality_of_groom" TEXT NOT NULL,
    "name_of_bride" TEXT NOT NULL,
    "religion_of_bride" TEXT NOT NULL,
    "nationality_of_bride" TEXT NOT NULL,
    "wedding_date" TEXT NOT NULL,
    "wedding_venue" TEXT NOT NULL,
    "number_of_attendance" TEXT NOT NULL,
    "approximate_wedding_budget" TEXT NOT NULL,
    "hotel_name_in_bali" TEXT NOT NULL,
    "arrival_date" TEXT NOT NULL,
    "departure_date" TEXT NOT NULL,
    "your_message" TEXT NOT NULL,

    CONSTRAINT "inquiry_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "open_positions" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "open_positions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "destinations_slug_key" ON "destinations"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "portfolios_slug_key" ON "portfolios"("slug");

-- AddForeignKey
ALTER TABLE "destinations" ADD CONSTRAINT "destinations_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "destination_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_faqs" ADD CONSTRAINT "experience_faqs_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "wedding_experiences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venues" ADD CONSTRAINT "venues_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venues" ADD CONSTRAINT "venues_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "wedding_experiences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_images" ADD CONSTRAINT "venue_images_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wedding_themes" ADD CONSTRAINT "wedding_themes_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wedding_themes" ADD CONSTRAINT "wedding_themes_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "wedding_experiences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wedding_theme_images" ADD CONSTRAINT "wedding_theme_images_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "wedding_themes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "wedding_experiences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_images" ADD CONSTRAINT "portfolio_images_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
