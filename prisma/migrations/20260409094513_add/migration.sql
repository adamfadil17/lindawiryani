/*
  Warnings:

  - Added the required column `description` to the `destination_locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "destination_locations" ADD COLUMN     "description" TEXT NOT NULL;
