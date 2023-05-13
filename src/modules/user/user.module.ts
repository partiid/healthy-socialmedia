import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { CryptoService } from 'src/shared/services/crypto.service';
import {UserDetailsService} from './userDetails/userDetails.service';
import { PostModule } from '../post/post.module';
import { TagModule } from '../tag/tag.module';
import { UserTagService } from './userTag/userTag.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserDetailsService, UserTagService, PrismaService, CryptoService],
  exports: [UserService, UserTagService],
  imports: [forwardRef(() => PostModule), TagModule]
})
export class UserModule {}
