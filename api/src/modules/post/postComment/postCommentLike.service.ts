import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { CommentLike } from '@prisma/client';

import { PostCommentLikeModel } from './postCommentLike.model';
@Injectable()
export class PostCommentLikeService {
    constructor(private PrismaService: PrismaService) {}

    /**
     * @description Find all comment likes associated with given comment
     * @param id_comment
     */
    async findAllByIdComment(id_comment: number): Promise<CommentLike[]> {
        return await this.PrismaService.commentLike.findMany({
            where: {
                id_comment,
            },
        });
    }

    /**
     * @description Find one comment like by id_comment and id_user
     * @param where {id_comment: number, id_user: number}
     * @returns
     */
    async findOne(where: {
        id_comment: number;
        id_user: number;
    }): Promise<CommentLike> {
        return await this.PrismaService.commentLike.findFirst({
            where: {
                id_comment: where.id_comment,
                id_user: where.id_user,
            },
        });
    }
    async create(data: PostCommentLikeModel): Promise<CommentLike> {
        try {
            return await this.PrismaService.commentLike.create({
                data: {
                    comment: {
                        connect: {
                            id_comment: data.id_comment,
                        },
                    },
                    user: {
                        connect: {
                            id_user: data.id_user,
                        },
                    },
                },
            });
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async delete(id_comment_like: number): Promise<CommentLike> {
        try {
            return await this.PrismaService.commentLike.delete({
                where: {
                    id_comment_like,
                },
            });
        } catch (err: any) {
            throw new Error(err);
        }
    }
}
