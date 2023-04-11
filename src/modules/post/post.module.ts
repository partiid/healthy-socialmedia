import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from '../user/user.module';
import { PostTagService } from 'src/modules/post-tag/postTag.service';
import { TagModule } from '../tag/tag.module';
import { PostTagModule } from '../post-tag/post-tag.module';
@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
  imports: [forwardRef(() => UserModule), PostTagModule],
  exports: [PostService]
})
export class PostModule {}
