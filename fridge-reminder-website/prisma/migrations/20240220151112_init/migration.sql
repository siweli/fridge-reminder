/*
  Warnings:

  - You are about to drop the `list` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `device_id` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `list` DROP FOREIGN KEY `list_device_id_fkey`;

-- DropForeignKey
ALTER TABLE `list` DROP FOREIGN KEY `list_item_id_fkey`;

-- AlterTable
ALTER TABLE `items` ADD COLUMN `device_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `list`;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_device_id_fkey` FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
