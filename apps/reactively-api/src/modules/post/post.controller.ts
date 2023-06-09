import {
    Controller,
    Get,
    Param,
    Req,
    UseGuards,
    Body,
    HttpStatus,
    Post,
    HttpCode,
    NotFoundException,
    ParseIntPipe,
    Delete,
    Logger,
    Inject,
} from '@nestjs/common';
import { PostLikeEvent } from '../../../../common/events/post/postLike.event';
import { PostService } from './post.service';
import { PostModel } from './post.model';
import { PostObject } from './post.alias';
import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiOkResponse,
    ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { PostLikeService } from './postLike/postLIke.service';
import { PostLikeModel } from './postLike/postLike.model';
import { PostLike, Comment, PostTag } from '@prisma/client';
import {
    PostLikeResponse,
    PostLikeStatus,
} from './postLike/types/postLike.types';
import { AuthenticatedRequest } from '../../interfaces/authenticatedRequest.interface';
import { isEmpty } from 'lodash';
import { PostCommentService } from './postComment/postComment.service';
import { PostCommentModel } from './postComment/postComment.model';
import { AllowedActionGuard } from '../../guards/allowedAction.guard';
import { UserService } from '../user/user.service';
import { UserTagService } from '../user/userTag/userTag.service';
import { PostTagService } from '../post-tag/postTag.service';
import { ClientProxy } from '@nestjs/microservices';
@Controller('post')
@ApiTags('post')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PostController {
    private readonly Logger = new Logger(PostController.name);
    constructor(
        private readonly PostService: PostService,
        private readonly PostLikeService: PostLikeService,
        private PostCommentService: PostCommentService,
        private readonly UserService: UserService,
        private UserTagService: UserTagService,
        private PostTagService: PostTagService,
        @Inject('NOTIFICATIONS')
        private NotificationClient: ClientProxy,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() post: PostModel,
        @Req() req: AuthenticatedRequest,
    ): Promise<PostObject> {
        let response: PostObject;

        post.id_user = req.user.id_user || post.id_user;

        try {
            response = await this.PostService.create({
                ...post,
            });
        } catch (err: any) {
            throw new NotFoundException(err);
        }
        return response;
    }

    /**
     * @description get all posts on the website
     * @returns {Promise<PostObject[]>}
     */
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ description: 'Get all posts on the website' })
    @ApiBearerAuth()
    async getPosts(): Promise<PostObject[]> {
        //should we filter posts by tags he likes?
        return await this.PostService.findAll();
    }

    @Get('/feed')
    @ApiOperation({
        description:
            'Get all posts for  currenctly logged in user based on his liked tags',
    })
    @UseGuards(JwtAuthGuard)
    @UseGuards(AllowedActionGuard) //NOTE: we need to feed only the user based on his preferences, noone else can see specific users feed
    @ApiBearerAuth()
    async getPostsForUser(
        @Req() req: AuthenticatedRequest,
    ): Promise<PostObject[]> {
        //check if user has any liked tags
        let user = await this.UserService.findOne({
            id_user: req.user.id_user,
        });
        if (!user) throw new NotFoundException('User not found'); //don't really need to do this since we are using guards
        //find all user tags
        let userTags = await this.UserTagService.findAll(user.id_user);

        let posts: PostObject[] = await this.PostService.findAll();

        //if tags are empty, just return all posts since we don't filter by tags
        if (!isEmpty(userTags)) {
            //filter posts by tags
            for (let post of posts) {
                let postTags = await this.PostTagService.findAll(post.id_post);

                let postTagsIds = postTags.map((tag) => tag.id_tag);
                let userTagsIds = userTags.map((tag) => tag.id_tag);
                let commonTags = postTagsIds.filter((tag) =>
                    userTagsIds.includes(tag),
                );

                if (isEmpty(commonTags)) {
                    posts = posts.filter((p) => p.id_post != post.id_post);
                }
            }

            //if(isEmpty(tags)) throw new NotFoundException("User has no liked tags");
        }
        return posts;
    }

    @Get(':id_post')
    async getPost(
        @Param('id_post', ParseIntPipe) id_post: number,
    ): Promise<PostObject> {
        return await this.PostService.findOne({
            id_post,
        });
    }

    @Delete(':id_post')
    @UseGuards(AllowedActionGuard)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async deletePost(
        @Param('id_post', ParseIntPipe) id_post: number,
        @Req() req: AuthenticatedRequest,
    ): Promise<PostObject> {
        let post = await this.PostService.findOne({ id_post });
        if (!post) throw new NotFoundException('Post not found');
        if (post.id_user != req.user.id_user)
            throw new NotFoundException(
                'You are not allowed to delete this post',
            );
        try {
            return await this.PostService.delete({ id_post });
        } catch (err: any) {
            throw new NotFoundException(err);
        }
    }

    @Post('/like')
    //@UseGuards(AllowedActionGuard)
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @ApiOkResponse({
        description:
            'if post is already liked, the API will unlike the post and delete the record. Returns the status of the post like and the post like object. ',
        type: PostLikeResponse,
    })
    async likePost(
        @Body() postLike: PostLikeModel,
        @Req() req: AuthenticatedRequest,
    ): Promise<PostLikeResponse> {
        let response: PostLikeResponse = {
            status: PostLikeStatus.LIKE,
            postLike: null,
        };
        let postLikeCreated: PostLike;

        //deduct id user from the token;
        postLike.id_user = req.user.id_user || postLike.id_user;
        console.log('POSTLIKE: ', postLike);
        postLikeCreated = await this.PostLikeService.findOne({
            id_post: postLike.id_post,
            id_user: postLike.id_user,
        });

        if (!isEmpty(postLikeCreated)) {
            await this.PostLikeService.delete({
                id_post: postLike.id_post,
                id_user: postLike.id_user,
            });
            response.status = PostLikeStatus.UNLIKE;
            response.postLike = postLikeCreated;
            return response;
        }

        try {
            postLikeCreated = await this.PostLikeService.create({
                ...postLike,
            });
        } catch (err: any) {
            throw new NotFoundException(err);
        }
        response.status = PostLikeStatus.LIKE;

        //if user wants to like the same post, we want to remove like from the post based on the body - response would be the same
        response.postLike = postLikeCreated;

        this.NotificationClient.emit(
            'post.like',
            new PostLikeEvent(postLike.id_user, postLike.id_post),
        );
        return response;
    }
}
