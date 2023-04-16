import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { CryptoService } from 'src/shared/services/crypto.service';
import {UserDetailsService} from './userDetails/userDetails.service';
import { PostModule } from '../post/post.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserDetailsService, PrismaService, CryptoService],
  exports: [UserService],
  imports: [forwardRef(() => PostModule)]
})
export class UserModule {}
