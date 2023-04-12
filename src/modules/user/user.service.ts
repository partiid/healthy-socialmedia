import { Injectable } from '@nestjs/common';
import { ServiceInterface } from 'src/interfaces/service.interface';
import { PrismaService } from 'src/prisma.service';
import {User, Prisma, PrismaClient} from '@prisma/client';
import { CryptoService } from 'src/shared/services/crypto.service';
import { PrismaTools } from 'src/tools/prisma/prisma.tools';


@Injectable()
export class UserService implements ServiceInterface<User> {

    constructor(private prismaService: PrismaService, private CryptoService: CryptoService,
        ) { }
    
    async findAll(): Promise<User[]> {
        return this.prismaService.user.findMany();
    }
    
    async findOne(where: Prisma.UserWhereInput): Promise<User | null> {
        return this.prismaService.user.findFirst({
            where: {
                id_user: where.id_user
            },
            include: {
                details: true,
                posts: true,
                comments: true,
                userTags: true

            }
            
        }); 
 
    }


    
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const {password} = data; 
        data.password = await this.CryptoService.hash(password);

        let user: Promise<User> = this.prismaService.user.create({
            data,
        });
        if(await user) {
            return PrismaTools.excludeFields(await user, ['password']);
        }
        

    }
    
    async update(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<any> {
        const {where, data} = params;
        return this.prismaService.user.update({
            where,
            data,
        });
    }
    
    async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prismaService.user.delete({
            where,
        })
    }

    



}
