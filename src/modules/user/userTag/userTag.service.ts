import { Injectable } from "@nestjs/common";
import { TagService } from "src/modules/tag/tag.service";
import { PrismaService } from "src/prisma.service";
import { Tag } from "@prisma/client";
import {isEmpty} from 'lodash';
import { UserTagModel } from "./userTag.model";
@Injectable()
export class UserTagService {
    constructor(private PrismaService: PrismaService,
        private TagService: TagService) {}


        /**
         * 
         * @param data - type: {tags: Tag[], id_user: number}
         * @returns boolean if tags were created successfully
         */
    async create(data: UserTagModel): Promise<any> {

        

        for(let tag of data.tags){
            
            //check whether tags exist
            const tagDoesNotExists = isEmpty(await this.TagService.findOne({id_tag: tag}));
            if(tagDoesNotExists){
                throw new Error("Tag does not exist, aborting..."); 
            }
            //if tags exist, simply create user tag 
            try {
                await this.PrismaService.userTag.create({
                    data: {
                        user: {
                            connect: {
                                id_user: data.id_user
                            }
                        },
                        tag: {
                            connect: {
                                id_tag: tag
                            }
                        }
                    }
                })
            } catch(err: any) {
                
                throw new Error("Some error occured, probably you already subscribe to this tag");
            }
            

        }
        return true; 



        
    }

    async findByUser(id_user: number): Promise<Tag[]> {
       return null; 

    }

}