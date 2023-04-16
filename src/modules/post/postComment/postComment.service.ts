import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {PostCommentModel} from './postComment.model';
import {Comment} from '@prisma/client';
@Injectable()
export class PostCommentService {

    constructor(private PrismaService: PrismaService) {}
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



    
}
