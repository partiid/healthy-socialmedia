import { ServiceInterface } from '../../interfaces/service.interface';
import { Tag } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TagService implements ServiceInterface<Tag> {
    constructor(private PrismaService: PrismaService) {}

    findAll(): Promise<Tag[]> {
        return this.PrismaService.tag.findMany();
    }

    findOne(where: any): Promise<Tag | null> {
        console.log(where);
        return this.PrismaService.tag.findUnique({
            where: {
                id_tag: where.id_tag,
            },
        });
    }

    async create(data: Prisma.TagCreateInput): Promise<Tag> {
        let response: Tag;
        try {
            response = await this.PrismaService.tag.create({
                data: {
                    name: data.name,
                },
            });
        } catch (err) {
            console.log(err);
            throw new Error('Some error occured');
        }
        return response;
    }
    update(params: { where: any; data: any }): Promise<any> {
        throw new Error('Method not implemented.');
    }
    delete(where: any): Promise<Tag> {
        throw new Error('Method not implemented.');
    }
}
