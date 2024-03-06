/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `devices` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `devices` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_id` on table `devices` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `devices` ADD COLUMN `token` VARCHAR(191) NOT NULL,
    MODIFY `user_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `devices_token_key` ON `devices`(`token`);
