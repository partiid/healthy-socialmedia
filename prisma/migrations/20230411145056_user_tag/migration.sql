/*
  Warnings:

  - You are about to drop the column `userId_user` on the `tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `tag` DROP FOREIGN KEY `Tag_userId_user_fkey`;

-- AlterTable
ALTER TABLE `tag` DROP COLUMN `userId_user`;
