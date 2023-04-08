import { Injectable } from '@nestjs/common';
import { ServiceInterface } from 'src/interfaces/service.interface';
import {Post, Prisma} from '@prisma/client';
import { PostModel } from './post.model';
import { PrismaService } from 'src/prisma.service';
import { UserService } from '../user/user.service';
@Injectable()
export class PostService implements ServiceInterface<Post>{
    constructor(private PrismaService: PrismaService,
        private UserService: UserService) {}

    async findAll(): Promise<Post[]> {
        throw new Error('Method not implemented.');
    }
    async findOne(where: Prisma.PostWhereInput): Promise<Post | null> {
        throw new Error('Method not implemented.');
    }
    async create(data: PostModel): Promise<Post> {

        //todo: upload image to post 
        const {content, id_user} = data;

        const userExists = await this.UserService.findOne({
            id_user
        });
        if(!userExists) throw new Error('User not found!'); 

        return this.PrismaService.post.create({
            data: {
                content: content,
                user: {
                    connect: {
                        id_user: id_user
                    }
                },

            } 
        })
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
