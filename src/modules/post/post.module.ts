import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from '../user/user.module';
@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
  imports: [forwardRef(() => UserModule)],
  exports: [PostService]
})
export class PostModule {}
