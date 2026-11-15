/*
  Warnings:

  - Made the column `destination_id` on table `portfolios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `venue_id` on table `portfolios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `experience_id` on table `portfolios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `venue_id` on table `wedding_themes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "portfolios" DROP CONSTRAINT "portfolios_destination_id_fkey";

-- DropForeignKey
ALTER TABLE "portfolios" DROP CONSTRAINT "portfolios_experience_id_fkey";

-- DropForeignKey
ALTER TABLE "portfolios" DROP CONSTRAINT "portfolios_venue_id_fkey";

-- DropForeignKey
ALTER TABLE "wedding_themes" DROP CONSTRAINT "wedding_themes_venue_id_fkey";

-- AlterTable
ALTER TABLE "portfolios" ALTER COLUMN "destination_id" SET NOT NULL,
ALTER COLUMN "venue_id" SET NOT NULL,
ALTER COLUMN "experience_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "wedding_themes" ALTER COLUMN "venue_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "wedding_themes" ADD CONSTRAINT "wedding_themes_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "wedding_experiences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
