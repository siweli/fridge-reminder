/*
  Warnings:

  - You are about to drop the column `claimed` on the `device_temp` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `devices` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `device_temp` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `device_temp` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `device_temp` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `devices_code_key` ON `devices`;

-- AlterTable
ALTER TABLE `device_temp` DROP COLUMN `claimed`,
    ADD COLUMN `token` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `devices` DROP COLUMN `code`,
    DROP COLUMN `token`;

-- CreateIndex
CREATE UNIQUE INDEX `device_temp_token_key` ON `device_temp`(`token`);

-- CreateIndex
CREATE UNIQUE INDEX `device_temp_code_key` ON `device_temp`(`code`);
