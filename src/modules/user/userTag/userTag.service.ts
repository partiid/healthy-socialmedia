import { Injectable } from '@nestjs/common';
import { TagService } from 'src/modules/tag/tag.service';
import { PrismaService } from 'src/prisma.service';
import { Tag } from '@prisma/client';
import { isEmpty } from 'lodash';
import { UserTagModel } from './userTag.model';
@Injectable()
export class UserTagService {
    constructor(
        private PrismaService: PrismaService,
        private TagService: TagService,
    ) {}

    /**
     *
     * @param data - type: {tags: Tag[], id_user: number}
     * @returns boolean if tags were created successfully
     */
    async create(data: UserTagModel): Promise<any> {
        for (let tag of data.tags) {
            //check whether tags exist
            const tagDoesNotExists = isEmpty(
                await this.TagService.findOne({ id_tag: tag }),
            );
            if (tagDoesNotExists) {
                throw new Error('Tag does not exist, aborting...');
            }
            //if tags exist, simply create user tag
            try {
                await this.PrismaService.userTag.create({
                    data: {
                        user: {
                            connect: {
                                id_user: data.id_user,
                            },
                        },
                        tag: {
                            connect: {
                                id_tag: tag,
                            },
                        },
                    },
                });
            } catch (err: any) {
                throw new Error(
                    'Some error occured, probably you already subscribe to this tag',
                );
            }
        }
        return true;
    }

    /**
     * @description Get all user tags by id_user
     * @param id_user
     * @returns
     */
    async findAll(id_user: number): Promise<Tag[]> {
        return await this.PrismaService.userTag
            .findMany({
                where: {
                    id_user,
                },
                select: {
                    tag: true,
                },
            })
            .then((data) => {
                return data.map((item) => {
                    return item.tag;
                });
            });
    }

    async deleteOne(id_user: number, id_tag: number): Promise<boolean> {
        try {
            await this.PrismaService.userTag.delete({
                where: {
                    id_user_id_tag: {
                        id_user,
                        id_tag,
                    },
                },
            });
        } catch (err) {
            throw new Error(
                "Some error occured, probably you don't subscribe to this tag",
            );
        }
        return true;
    }

    async delete(id_user: number): Promise<boolean> {
        try {
            await this.PrismaService.userTag.deleteMany({
                where: {
                    id_user,
                },
            });
        } catch (err) {
            throw new Error(
                "Some error occured, probably you don't have any tags",
            );
        }
        return true;
    }
}
