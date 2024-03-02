/*
  Warnings:

  - You are about to drop the column `device_id` on the `items` table. All the data in the column will be lost.
  - You are about to drop the `devices` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `items_device_id_fkey`;

-- AlterTable
ALTER TABLE `items` DROP COLUMN `device_id`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `devices`;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
