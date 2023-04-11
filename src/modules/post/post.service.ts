import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ServiceInterface } from 'src/interfaces/service.interface';
import {Post, Prisma} from '@prisma/client';
import { PostModel } from './post.model';
import { PrismaService } from 'src/prisma.service';
import { UserService } from '../user/user.service';
import { PostTagService } from 'src/modules/post-tag/postTag.service';
@Injectable()
export class PostService implements ServiceInterface<Post>{
    constructor(private PrismaService: PrismaService,
       @Inject(forwardRef(() => UserService)) private UserService: UserService,
       private PostTagService: PostTagService) {}

    async findAll(): Promise<Post[]> {
        throw new Error('Method not implemented.');
    }


    async findAllByIdUser(id_user: number): Promise<Post[]> {
        return this.PrismaService.post.findMany({
            where: {
                id_user
            }
        })
    }


    async findOne(where: Prisma.PostWhereInput): Promise<Post | null> {
        throw new Error('Method not implemented.');
    }

    async create(data: PostModel): Promise<Post> {

        //todo: upload image to post 
        const {content, id_user, tags} = data;

        const userExists = await this.UserService.findOne({
            id_user
        });
        if(!userExists) throw new Error('User not found!'); 

        let postCreated: Post = null; 


        postCreated = await this.PrismaService.post.create({
            data: {
                content: content,
                user: {
                    connect: {
                        id_user: id_user
                    }
                },

            } 
        })

        if(!postCreated) throw new Error('Error on create post');

        //connect post tags 
        
        await this.PostTagService.create(tags, postCreated); 

        return postCreated; 


    }
    async update(params: {
        where: Prisma.PostWhereUniqueInput;
        data: Prisma.PostUpdateInput;
    }): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async delete(where: Prisma.PostWhereUniqueInput): Promise<Post> {
        throw new Error('Method not implemented.');
    }
}
