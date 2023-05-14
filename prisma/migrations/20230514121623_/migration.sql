-- DropForeignKey
ALTER TABLE `posttag` DROP FOREIGN KEY `PostTag_id_post_fkey`;

-- DropForeignKey
ALTER TABLE `posttag` DROP FOREIGN KEY `PostTag_id_tag_fkey`;

-- AddForeignKey
ALTER TABLE `PostTag` ADD CONSTRAINT `PostTag_id_post_fkey` FOREIGN KEY (`id_post`) REFERENCES `Post`(`id_post`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostTag` ADD CONSTRAINT `PostTag_id_tag_fkey` FOREIGN KEY (`id_tag`) REFERENCES `Tag`(`id_tag`) ON DELETE CASCADE ON UPDATE CASCADE;
