/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `devices` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `devices_code_key` ON `devices`(`code`);
