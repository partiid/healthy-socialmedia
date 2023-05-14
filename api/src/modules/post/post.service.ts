import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ServiceInterface } from 'src/interfaces/service.interface';
import { Post, Prisma } from '@prisma/client';
import { PostModel } from './post.model';
import { PrismaService } from 'src/prisma.service';
import { UserService } from '../user/user.service';
import { PostTagService } from 'src/modules/post-tag/postTag.service';
@Injectable()
export class PostService implements ServiceInterface<Post> {
    constructor(
        private PrismaService: PrismaService,
        @Inject(forwardRef(() => UserService)) private UserService: UserService,
        private PostTagService: PostTagService,
    ) {}

    async findAll(): Promise<Post[]> {
        return await this.PrismaService.post.findMany({
            include: {
                user: {
                    select: {
                        username: true,
                        id_user: true,
                        details: {
                            select: {
                                image: true,
                            },
                        },
                    },
                },
                comments: {
                    select: {
                        id_comment: true,
                        content: true,
                        createdAt: true,
                        user: {
                            select: {
                                id_user: true,
                                username: true,
                                details: {
                                    select: {
                                        image: true,
                                    },
                                },
                            },
                        },
                        likes: {
                            select: {
                                user: {
                                    select: {
                                        id_user: true,
                                        username: true,
                                        details: {
                                            select: {
                                                image: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                likes: {
                    select: {
                        user: {
                            select: {
                                id_user: true,
                                username: true,
                                details: {
                                    select: {
                                        image: true,
                                    },
                                },
                            },
                        },
                    },
                },

                tags: {
                    select: {
                        tag: {
                            select: {
                                name: true,
                                id_tag: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async findAllByIdUser(id_user: number): Promise<Post[]> {
        return await this.PrismaService.post.findMany({
            where: {
                id_user,
            },
        });
    }

    async findOne(where: Prisma.PostWhereInput): Promise<Post | null> {
        return await this.PrismaService.post.findFirst({
            where: {
                id_post: where.id_post,
            },

            include: {
                user: {
                    select: {
                        username: true,
                        id_user: true,
                        details: {
                            select: {
                                image: true,
                            },
                        },
                    },
                },
                comments: {
                    select: {
                        id_comment: true,
                        content: true,
                        createdAt: true,
                        likes: {
                            select: {
                                user: {
                                    select: {
                                        username: true,
                                        id_user: true,
                                    },
                                },
                                id_comment_like: true,
                            },
                        },
                        user: {
                            select: {
                                id_user: true,
                                username: true,
                                details: {
                                    select: {
                                        image: true,
                                    },
                                },
                            },
                        },
                    },
                },
                likes: {
                    select: {
                        user: {
                            select: {
                                username: true,
                                id_user: true,
                                details: {
                                    select: {
                                        image: true,
                                    },
                                },
                            },
                        },
                        createdAt: true,
                        id_post_like: true,
                    },
                },
                tags: {
                    select: {
                        id_tag: false,
                        id_post: false,
                        tag: {
                            select: {
                                id_tag: true,
                                name: true,
                            },
                        },
                    },
                },
                image: true,
            },
        });
    }

    async create(data: PostModel): Promise<Post> {
        //todo: upload image to post
        const { content, id_user, tags } = data;

        const userExists = await this.UserService.findOne({
            id_user,
        });
        if (!userExists) throw new Error('User not found!');

        let postCreated: Post = null;

        postCreated = await this.PrismaService.post.create({
            data: {
                content: content,
                user: {
                    connect: {
                        id_user: id_user,
                    },
                },
            },
        });

        if (!postCreated) throw new Error('Error on create post');

        //connect post tags

        await this.PostTagService.create(tags, postCreated);

        return this.findOne({
            id_post: postCreated.id_post,
        });
    }
    async update(params: {
        where: Prisma.PostWhereUniqueInput;
        data: Prisma.PostUpdateInput;
    }): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async delete(where: Prisma.PostWhereUniqueInput): Promise<Post> {
        try {
            return await this.PrismaService.post.delete({
                where,
            });
        } catch (err: any) {
            throw new Error(err);
        }
    }
}
