import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from '../../prisma.service';
import { UserModule } from '../user/user.module';
import { PostTagService } from '../post-tag/postTag.service';
import { TagModule } from '../tag/tag.module';
import { PostTagModule } from '../post-tag/post-tag.module';
import { PostLikeService } from './postLike/postLIke.service';
import { PostCommentService } from './postComment/postComment.service';
import { PostCommentController } from './postComment/postComment.controller';
import { PostCommentLikeService } from './postComment/postCommentLike.service';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
@Module({
    controllers: [PostController, PostCommentController],
    providers: [
        PostService,
        PrismaService,
        PostLikeService,
        PostCommentService,
        PostCommentLikeService,
    ],
    imports: [
        forwardRef(() => UserModule),
        PostTagModule,
        ClientsModule.register([
            {
                name: 'NOTIFICATIONS',
                transport: Transport.TCP,
                options: {
                    port: 3005,
                },
            },
        ]),
    ],
    exports: [PostService],
})
export class PostModule {}
