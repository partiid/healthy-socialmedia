import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {PostCommentModel} from './postComment.model';
import {Comment} from '@prisma/client';

@Injectable()
export class PostCommentService {

    constructor(private PrismaService: PrismaService) {}


    async findOneByIdComment(id_comment: number): Promise<Comment> {
        let postComment: Comment = null;
        try {
            postComment = await this.PrismaService.comment.findUnique({
                where: {
                    id_comment
                }
            });
            
        } catch(err: any) {
            throw new Error(err);
        }
        return postComment;
    }

    async update(data: PostCommentModel): Promise<Comment> {
        let postComment: Comment = null;
        let {id_comment, content} = data;
        if(await this.findOneByIdComment(id_comment) === null){
            throw new Error("Comment not found");   
        } 
        try {
            postComment = await this.PrismaService.comment.update({
                where: {
                    id_comment
                },
                data: {
                    content
                }
            })
        } catch(err: any) {
            throw new Error(err);
        }
        return postComment;

    }


    async create(data: PostCommentModel): Promise<Comment> {
        
        let postComment: Comment = null; 
        
        try {
            postComment = await this.PrismaService.comment.create({
                data: {
                    content: data.content,
                    post: {
                        connect: {
                            id_post: data.id_post
                        },
                    },
                    user: {
                        connect: {
                            id_user: data.id_user
                        }
                    }
                }
            })

        } catch(err: any) {
            throw new Error(err);
        }
        return postComment;


    }
    async delete(id_comment: number): Promise<Comment> {
        
        let postComment: Comment = null; 
        
        
        if(await this.findOneByIdComment(id_comment) === null){
            throw new Error("Comment not found");   
            
        } 
        try {
            postComment = await this.PrismaService.comment.delete({
                where: {
                    id_comment
                }
            })

        } catch(err: any) {
            throw new Error(err);
        }
        return postComment;



    }
}
