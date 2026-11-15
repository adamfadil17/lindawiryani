/*
  Warnings:

  - The values [All] on the enum `ArticleCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ArticleCategory_new" AS ENUM ('Guides', 'Planning Advice', 'Destination Knowledge', 'Venue & Location', 'Real Weddings', 'Design & Concept');
ALTER TABLE "articles" ALTER COLUMN "category" TYPE "ArticleCategory_new" USING ("category"::text::"ArticleCategory_new");
ALTER TYPE "ArticleCategory" RENAME TO "ArticleCategory_old";
ALTER TYPE "ArticleCategory_new" RENAME TO "ArticleCategory";
DROP TYPE "public"."ArticleCategory_old";
COMMIT;
