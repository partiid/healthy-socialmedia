import { Module } from '@nestjs/common';
import { PostTagService } from './postTag.service';
import { TagModule } from '../tag/tag.module';
import { PrismaService } from 'src/prisma.service';

@Module({
    providers: [PostTagService, PrismaService],
    exports: [PostTagService],
    imports: [TagModule]

})
export class PostTagModule {}
