-- DropForeignKey
ALTER TABLE "portfolios" DROP CONSTRAINT "portfolios_destination_id_fkey";

-- DropForeignKey
ALTER TABLE "portfolios" DROP CONSTRAINT "portfolios_experience_id_fkey";

-- DropForeignKey
ALTER TABLE "portfolios" DROP CONSTRAINT "portfolios_venue_id_fkey";

-- DropForeignKey
ALTER TABLE "wedding_themes" DROP CONSTRAINT "wedding_themes_venue_id_fkey";

-- AlterTable
ALTER TABLE "portfolios" ALTER COLUMN "destination_id" DROP NOT NULL,
ALTER COLUMN "venue_id" DROP NOT NULL,
ALTER COLUMN "experience_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "wedding_themes" ALTER COLUMN "venue_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "wedding_themes" ADD CONSTRAINT "wedding_themes_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "wedding_experiences"("id") ON DELETE SET NULL ON UPDATE CASCADE;
