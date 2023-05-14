-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_id_post_fkey`;

-- DropForeignKey
ALTER TABLE `commentlike` DROP FOREIGN KEY `CommentLike_id_comment_fkey`;

-- DropForeignKey
ALTER TABLE `postlike` DROP FOREIGN KEY `PostLike_id_post_fkey`;

-- DropForeignKey
ALTER TABLE `userdetails` DROP FOREIGN KEY `UserDetails_id_user_fkey`;

-- AddForeignKey
ALTER TABLE `UserDetails` ADD CONSTRAINT `UserDetails_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostLike` ADD CONSTRAINT `PostLike_id_post_fkey` FOREIGN KEY (`id_post`) REFERENCES `Post`(`id_post`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentLike` ADD CONSTRAINT `CommentLike_id_comment_fkey` FOREIGN KEY (`id_comment`) REFERENCES `Comment`(`id_comment`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_id_post_fkey` FOREIGN KEY (`id_post`) REFERENCES `Post`(`id_post`) ON DELETE CASCADE ON UPDATE CASCADE;
