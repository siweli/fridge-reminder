/*
  Warnings:

  - Added the required column `claimed` to the `device_temp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `device_temp` ADD COLUMN `claimed` BOOLEAN NOT NULL;
