import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { CryptoService } from 'src/shared/services/crypto.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, CryptoService],
  exports: [UserService]
})
export class UserModule {}
