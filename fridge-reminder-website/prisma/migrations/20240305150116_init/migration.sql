/*
  Warnings:

  - You are about to drop the column `user_id` on the `items` table. All the data in the column will be lost.
  - Added the required column `device_id` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `items_user_id_fkey`;

-- AlterTable
ALTER TABLE `items` DROP COLUMN `user_id`,
    ADD COLUMN `device_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `devices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `devices_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `device_temp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `device_id` INTEGER NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `max_age` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `device_temp_id_key`(`id`),
    UNIQUE INDEX `device_temp_device_id_key`(`device_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_device_id_fkey` FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `device_temp` ADD CONSTRAINT `device_temp_device_id_fkey` FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
