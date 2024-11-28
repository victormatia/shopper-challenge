/*
  Warnings:

  - You are about to drop the column `review` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Review` DROP COLUMN `review`,
    ADD COLUMN `comment` VARCHAR(191) NULL;
