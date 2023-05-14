import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { PrismaService } from '../../prisma.service';
import { TagController } from './tag.controller';

@Module({
    providers: [TagService, PrismaService],
    exports: [TagService],
    controllers: [TagController],
})
export class TagModule {}
