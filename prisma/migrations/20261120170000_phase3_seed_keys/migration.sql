-- AlterTable
ALTER TABLE "destination_categories" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "experience_faqs" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "open_positions" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "open_position_translations" ADD COLUMN     "level" TEXT,
ADD COLUMN     "type" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "destination_categories_slug_key" ON "destination_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "experience_faqs_slug_key" ON "experience_faqs"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "open_positions_slug_key" ON "open_positions"("slug");

