/*
  Warnings:

  - Added the required column `token` to the `devices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `devices` ADD COLUMN `token` VARCHAR(191) NOT NULL,
    MODIFY `user_id` INTEGER NULL;
