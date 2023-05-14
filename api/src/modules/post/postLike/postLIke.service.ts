import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {PostLike, Prisma} from '@prisma/client';
import { PostLikeModel } from './postLike.model';
import { PostLikeResponse } from './types/postLike.types';


@Injectable()
export class PostLikeService  {

    constructor(private PrismaService: PrismaService) {}

    /**
     * 
     * @description Create a new like for a post, if the like already exists, returns existing like.
     * @returns {Promise<PostLike[]>} 
     */

    async create(data: PostLikeModel): Promise<PostLike> {
        

        const {id_user, id_post} = data;
        

        if(!id_user || !id_post) throw new Error('Missing data!');

        const postExists = await this.PrismaService.post.findUnique({
            where: {
                id_post: id_post
            }
        }); 
        if(!postExists) throw new Error('Post not found!');
        const userExists = await this.PrismaService.user.findUnique({
            where: {
                id_user: id_user
            }
        });
        if(!userExists) throw new Error('User not found!');
        const likeExists = await this.PrismaService.postLike.findFirst({
            where: {
               post: {
                id_post
               },
               user: {
                id_user
               }

            }});
             
        //if like already exists, we want to delete the like to unlike the post
        if(likeExists)  return likeExists;
        
        return await this.PrismaService.postLike.create({
            data: {
                post: {
                    connect: {
                        id_post: id_post
                    }
                },
                user: {
                    connect: {
                        id_user: id_user
                    }
                }
            }
         });

        
    }

    async delete(data: PostLikeModel): Promise<PostLike> {
        const {id_user, id_post} = data;
        if(!id_user || !id_post) throw new Error('Missing data!');

        const postExists = await this.PrismaService.post.findUnique({
            where: {
                id_post: id_post
            }
        }); 
        if(!postExists) throw new Error('Post not found!');
        const userExists = await this.PrismaService.user.findUnique({
            where: {
                id_user: id_user
            }
        });
        if(!userExists) throw new Error('User not found!');
        const likeExists = await this.PrismaService.postLike.findFirst({
            where: {
               post: {
                id_post
               },
               user: {
                id_user
               }

            }}); 
        if(!likeExists) throw new Error('Like not found!'); 

        return await this.PrismaService.postLike.delete({
            where: {
                id_post_like: likeExists.id_post_like
            }
        })
    }

    async findOne(where: PostLikeModel): Promise<PostLike> {
        return await this.PrismaService.postLike.findFirst({
            where: {
                post: {
                    id_post: where.id_post
                },
                user: {
                    id_user: where.id_user
                }
            }
        })

    }




}
