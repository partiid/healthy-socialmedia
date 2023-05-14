import { Module } from '@nestjs/common';
import { TagService } from 'src/modules/tag/tag.service';
import { PrismaService } from 'src/prisma.service';
import { TagController } from './tag.controller';

@Module({
    
    providers: [TagService, PrismaService],
    exports: [TagService],
    controllers: [TagController]


})
export class TagModule {}
