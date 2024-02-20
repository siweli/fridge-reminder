-- CreateTable
CREATE TABLE `item` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
