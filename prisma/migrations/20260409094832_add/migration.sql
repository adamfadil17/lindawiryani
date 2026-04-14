/*
  Warnings:

  - Added the required column `description` to the `destination_categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "destination_categories" ADD COLUMN     "description" TEXT NOT NULL;
