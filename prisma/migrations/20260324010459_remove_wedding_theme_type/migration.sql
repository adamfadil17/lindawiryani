/*
  Warnings:

  - You are about to drop the column `type` on the `wedding_themes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "wedding_themes" DROP COLUMN "type";

-- DropEnum
DROP TYPE "WeddingThemeType";
