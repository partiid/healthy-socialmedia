import { PartialServiceInterface } from "src/interfaces/partialService.interface";
import {Tag, PostTag, Post} from '@prisma/client'
import { PrismaService } from "src/prisma.service";
import { TagService } from "../tag/tag.service";
import {isEmpty} from 'lodash'
import { Prisma } from "@prisma/client";
import { Injectable, Inject} from "@nestjs/common";

@Injectable()
export class PostTagService implements PartialServiceInterface<PostTag> {
    constructor(private PrismaService: PrismaService, 
         private TagService: TagService) {}

        /**
         * @description Find all tags by id_post - return array of tags associated with given post
         */
    async findAll(id_post: number): Promise<PostTag[]> {
        return this.PrismaService.postTag.findMany({
            where: {
                id_post
            }
        });
        
    }

    async findOne(where: Prisma.PostTagWhereInput): Promise<PostTag> {
        console.log("where", where);
        return this.PrismaService.postTag.findFirst({
            where: {
                post: {
                    id_post: where.id_post
                },
                tag: {
                    id_tag: where.id_tag
                }
                
            }
        })

    }
  
    async create(tags: Array<number>, post: Post): Promise<boolean> {

        console.log("called");
        let result: boolean = true;
        try {
            for(let tag of tags){
                console.log(tag);
                const tagExists = isEmpty(await this.TagService.findOne({id_tag: tag})); 
                if(tagExists) throw new Error('Tag not found!');

                const postTagExists = !isEmpty(await this.findOne({id_post: post.id_post, id_tag: tag}));
                if(postTagExists) throw new Error('Unable to add tag to post, each tag must be added exactly once.');

                await this.PrismaService.postTag.create({
                    data: {
                        post: {
                            connect: {
                                id_post: post.id_post
                            },
                        },
                        tag: {
                            connect: {
                                id_tag: tag
                            },
                        }
                }}); 

        } }
         catch(err: any) {
            result = false;
            throw new Error(err.message)
        }
         return result;  
            
        }
    

    update(params: {
        where: any;
        data: any;
    }): Promise<any> {
        throw new Error("Method not implemented.");
    }
    delete(where: any): Promise<PostTag> {
        throw new Error("Method not implemented.");
    }

}


