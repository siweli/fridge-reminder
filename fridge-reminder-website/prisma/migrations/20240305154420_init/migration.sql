/*
  Warnings:

  - Added the required column `code` to the `devices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `devices` ADD COLUMN `code` VARCHAR(191) NOT NULL;
