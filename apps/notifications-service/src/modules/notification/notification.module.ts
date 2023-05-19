import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';

import { PrismaService } from '../../prisma.service';
import { SseService } from '../../sse/sse.service';
import { ConnectorService } from '../../connector/connector.service';

@Module({
  imports: [],
  controllers: [NotificationController],
  exports: [NotificationService],
  providers: [NotificationService, SseService, PrismaService, ConnectorService],
  
})
export class NotificationModule {}
