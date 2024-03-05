/*
  Warnings:

  - You are about to drop the column `device_id` on the `device_temp` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `device_temp` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `device_temp` DROP FOREIGN KEY `device_temp_device_id_fkey`;

-- AlterTable
ALTER TABLE `device_temp` DROP COLUMN `device_id`,
    ADD COLUMN `user_id` INTEGER NOT NULL;
