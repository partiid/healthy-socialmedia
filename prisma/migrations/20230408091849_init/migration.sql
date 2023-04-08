-- CreateTable
CREATE TABLE `User` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserDetails` (
    `id_user_details` INTEGER NOT NULL AUTO_INCREMENT,
    `bio` VARCHAR(191) NULL,
    `id_user` INTEGER NOT NULL,
    `id_image` INTEGER NULL,

    UNIQUE INDEX `UserDetails_id_user_key`(`id_user`),
    UNIQUE INDEX `UserDetails_id_image_key`(`id_image`),
    PRIMARY KEY (`id_user_details`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserTag` (
    `id_user` INTEGER NOT NULL,
    `id_tag` INTEGER NOT NULL,

    PRIMARY KEY (`id_user`, `id_tag`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id_image` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_image`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id_post` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `id_user` INTEGER NOT NULL,
    `id_image` INTEGER NULL,

    INDEX `post_author_idx`(`id_user`),
    PRIMARY KEY (`id_post`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostLike` (
    `id_post_like` INTEGER NOT NULL AUTO_INCREMENT,
    `id_post` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,

    INDEX `post_like_unique_idx`(`id_post`, `id_user`),
    PRIMARY KEY (`id_post_like`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommentLike` (
    `id_comment_like` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_comment` INTEGER NOT NULL,

    INDEX `comment_like_unique_idx`(`id_comment`, `id_user`),
    PRIMARY KEY (`id_comment_like`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id_comment` INTEGER NOT NULL AUTO_INCREMENT,
    `id_post` INTEGER NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_comment`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostTag` (
    `id_post` INTEGER NOT NULL,
    `id_tag` INTEGER NOT NULL,

    PRIMARY KEY (`id_post`, `id_tag`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id_tag` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `userId_user` INTEGER NULL,

    PRIMARY KEY (`id_tag`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserDetails` ADD CONSTRAINT `UserDetails_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserDetails` ADD CONSTRAINT `UserDetails_id_image_fkey` FOREIGN KEY (`id_image`) REFERENCES `Image`(`id_image`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTag` ADD CONSTRAINT `UserTag_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTag` ADD CONSTRAINT `UserTag_id_tag_fkey` FOREIGN KEY (`id_tag`) REFERENCES `Tag`(`id_tag`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_id_image_fkey` FOREIGN KEY (`id_image`) REFERENCES `Image`(`id_image`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostLike` ADD CONSTRAINT `PostLike_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostLike` ADD CONSTRAINT `PostLike_id_post_fkey` FOREIGN KEY (`id_post`) REFERENCES `Post`(`id_post`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentLike` ADD CONSTRAINT `CommentLike_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentLike` ADD CONSTRAINT `CommentLike_id_comment_fkey` FOREIGN KEY (`id_comment`) REFERENCES `Comment`(`id_comment`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_id_post_fkey` FOREIGN KEY (`id_post`) REFERENCES `Post`(`id_post`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostTag` ADD CONSTRAINT `PostTag_id_post_fkey` FOREIGN KEY (`id_post`) REFERENCES `Post`(`id_post`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostTag` ADD CONSTRAINT `PostTag_id_tag_fkey` FOREIGN KEY (`id_tag`) REFERENCES `Tag`(`id_tag`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_userId_user_fkey` FOREIGN KEY (`userId_user`) REFERENCES `User`(`id_user`) ON DELETE SET NULL ON UPDATE CASCADE;
