import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from '../user/user.module';
import { PostTagService } from 'src/modules/post-tag/postTag.service';
import { TagModule } from '../tag/tag.module';
import { PostTagModule } from '../post-tag/post-tag.module';
import { PostLikeService } from './postLike/postLIke.service';
import { PostCommentService } from './postComment/postComment.service';


@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, PostLikeService, PostCommentService],
  imports: [forwardRef(() => UserModule), PostTagModule],
  exports: [PostService]
})
export class PostModule {}
