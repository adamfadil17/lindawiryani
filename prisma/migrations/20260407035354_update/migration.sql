/*
  Warnings:

  - You are about to drop the column `category_id` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `destinations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `destination_categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `destination_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_id` to the `destinations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "destinations" DROP CONSTRAINT "destinations_category_id_fkey";

-- DropForeignKey
ALTER TABLE "experience_faqs" DROP CONSTRAINT "experience_faqs_experience_id_fkey";

-- DropForeignKey
ALTER TABLE "portfolio_images" DROP CONSTRAINT "portfolio_images_portfolio_id_fkey";

-- DropForeignKey
ALTER TABLE "portfolios" DROP CONSTRAINT "portfolios_destination_id_fkey";

-- DropForeignKey
ALTER TABLE "portfolios" DROP CONSTRAINT "portfolios_experience_id_fkey";

-- DropForeignKey
ALTER TABLE "portfolios" DROP CONSTRAINT "portfolios_venue_id_fkey";

-- DropForeignKey
ALTER TABLE "venue_images" DROP CONSTRAINT "venue_images_venue_id_fkey";

-- DropForeignKey
ALTER TABLE "venues" DROP CONSTRAINT "venues_destination_id_fkey";

-- DropForeignKey
ALTER TABLE "venues" DROP CONSTRAINT "venues_experience_id_fkey";

-- DropForeignKey
ALTER TABLE "wedding_theme_images" DROP CONSTRAINT "wedding_theme_images_theme_id_fkey";

-- DropForeignKey
ALTER TABLE "wedding_themes" DROP CONSTRAINT "wedding_themes_experience_id_fkey";

-- DropForeignKey
ALTER TABLE "wedding_themes" DROP CONSTRAINT "wedding_themes_venue_id_fkey";

-- AlterTable
ALTER TABLE "destination_categories" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "destinations" DROP COLUMN "category_id",
DROP COLUMN "location",
ADD COLUMN     "location_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "destination_locations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "destination_locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "destination_locations_slug_key" ON "destination_locations"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "destination_categories_slug_key" ON "destination_categories"("slug");

-- AddForeignKey
ALTER TABLE "destination_locations" ADD CONSTRAINT "destination_locations_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "destination_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destinations" ADD CONSTRAINT "destinations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "destination_locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_faqs" ADD CONSTRAINT "experience_faqs_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "wedding_experiences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venues" ADD CONSTRAINT "venues_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venues" ADD CONSTRAINT "venues_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "wedding_experiences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_images" ADD CONSTRAINT "venue_images_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wedding_themes" ADD CONSTRAINT "wedding_themes_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wedding_themes" ADD CONSTRAINT "wedding_themes_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "wedding_experiences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wedding_theme_images" ADD CONSTRAINT "wedding_theme_images_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "wedding_themes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "wedding_experiences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_images" ADD CONSTRAINT "portfolio_images_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
