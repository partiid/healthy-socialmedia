import {
    Controller,
    Post,
    Param,
    Req,
    Body,
    Delete,
    UseGuards,
    Patch,
    ParseIntPipe,
    BadRequestException,
} from '@nestjs/common';
import { PostCommentService } from './postComment.service';
import { PostCommentModel } from './postComment.model';
import { Comment, CommentLike } from '@prisma/client';
import { HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiConsumes,
} from '@nestjs/swagger';
import { AuthenticatedRequest } from '../../../interfaces/authenticatedRequest.interface';
import { JwtAuthGuard } from '../../auth/jwtAuth.guard';
import { AllowedActionGuard } from '../../../guards/allowedAction.guard';
import { PostCommentLikeModel } from './postCommentLike.model';
import { isEmpty } from 'lodash';
import {
    PostCommentLikeResponse,
    PostCommentLikeStatus,
} from './types/postCommentLike.types';
import { PostCommentLikeService } from './postCommentLike.service';

@ApiTags('comment')
@Controller('comment')
@UseGuards(AllowedActionGuard)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PostCommentController {
    constructor(
        private PostCommentService: PostCommentService,
        private PostCommentLikeService: PostCommentLikeService,
    ) {}

    @Post()
    @ApiOperation({ description: 'id user is deducted from token' })
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({
        status: 201,
        description:
            'id_user is OPTIONAL - it is deducted from session customer. Returns the comment object.',
    })
    async commentPost(
        @Body() postComment: PostCommentModel,
        @Req() req: AuthenticatedRequest,
    ): Promise<Comment> {
        let response: Comment;

        postComment.id_user = req.user.id_user || postComment.id_user;
        try {
            response = await this.PostCommentService.create({
                ...postComment,
            });
        } catch (err: any) {
            throw new NotFoundException(err);
        }
        return response;
    }

    @Delete(':id_comment')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description:
            'id_user is OPTIONAL - it is deducted from session customer. Returns the comment object.',
    })
    async deleteComment(
        @Param('id_comment', ParseIntPipe) id_comment: number,
        @Req() req: AuthenticatedRequest,
    ): Promise<Comment> {
        let response: Comment;

        try {
            response = await this.PostCommentService.delete(id_comment);
        } catch (err: any) {
            throw new NotFoundException(err);
        }
        return response;
    }

    @Patch()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description:
            'id_user is OPTIONAL - it is deducted from session customer. Returns the updated comment object.',
    })
    @ApiOperation({
        description:
            'provide only id_comment and content to update the comment',
    })
    async updateComment(
        @Body() postComment: PostCommentModel,
        @Req() req: AuthenticatedRequest,
    ): Promise<Comment> {
        let response: Comment;

        postComment.id_user = req.user.id_user || postComment.id_user;

        try {
            response = await this.PostCommentService.update({
                ...postComment,
            });
        } catch (err: any) {
            throw new NotFoundException(err);
        }
        return response;
    }

    @Post('/like')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AllowedActionGuard)
    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 200,
        description:
            'id_user is OPTIONAL - it is deducted from session customer. Returns the updated comment object.',
        type: PostCommentLikeResponse,
    })
    @ApiOperation({
        description:
            'provide only id_comment and content to update the comment',
    })
    async likeComment(
        @Body() postCommentLike: PostCommentLikeModel,
        @Req() req: AuthenticatedRequest,
    ): Promise<PostCommentLikeResponse> {
        let response: PostCommentLikeResponse = {
            status: PostCommentLikeStatus.LIKE,
            postCommentLike: null,
        };

        let postCommentLikeCreated: CommentLike = null;

        postCommentLike.id_user = req.user.id_user || postCommentLike.id_user;
        try {
            postCommentLikeCreated = await this.PostCommentLikeService.findOne({
                id_user: postCommentLike.id_user,
                id_comment: postCommentLike.id_comment,
            });
            if (!isEmpty(postCommentLikeCreated)) {
                try {
                    await this.PostCommentLikeService.delete(
                        postCommentLikeCreated.id_comment_like,
                    );
                } catch (err: any) {
                    throw new NotFoundException(
                        "Unable to unlike the comment - like doesn't exists!",
                    );
                }

                response.status = PostCommentLikeStatus.UNLIKE;
                response.postCommentLike = postCommentLikeCreated;
                return response;
            }
        } catch (err: any) {
            throw new BadRequestException(err);
        }

        try {
            postCommentLikeCreated = await this.PostCommentLikeService.create({
                ...postCommentLike,
            });
            response.postCommentLike = postCommentLikeCreated;
        } catch (err: any) {
            throw new NotFoundException('Comment does not exist!');
        }
        response.status = PostCommentLikeStatus.LIKE;
        response.postCommentLike = postCommentLikeCreated;

        return response;
    }
}
