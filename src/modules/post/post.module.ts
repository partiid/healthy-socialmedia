import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from '../user/user.module';
@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
  imports: [UserModule]
})
export class PostModule {}
