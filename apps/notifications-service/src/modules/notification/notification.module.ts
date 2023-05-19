import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'apps/reactively-api/src/prisma.service';
import { SseService } from '../../sse/sse.service';

@Module({
  
  controllers: [NotificationController],
  providers: [NotificationService, PrismaService, SseService],
  
})
export class NotificationModule {}
