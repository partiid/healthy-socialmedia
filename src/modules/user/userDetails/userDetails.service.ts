import { Injectable } from "@nestjs/common";
import { UserDetails } from "@prisma/client";
import { PartialServiceInterface } from "src/interfaces/partialService.interface";
import { PrismaService } from "src/prisma.service";
import { UserDetailsModel } from "./userDetails.model";
@Injectable()
export class UserDetailsService implements PartialServiceInterface<UserDetails> {

    constructor (private PrismaService: PrismaService) {} 

    async findAll(where: any): Promise<UserDetails[]> {
        return []
    }

    async findOne(where: number): Promise<UserDetails> {
        return this.PrismaService.userDetails.findUnique({
            where: {
                id_user: where
            }
        }); 
    }

    async create(data: UserDetailsModel): Promise<UserDetails> {
        return await this.PrismaService.userDetails.create({
           data: {
                user: {
                    connect: {
                        id_user: data.id_user
                    },
                    
                },
                bio: data.bio,

                image: data.id_image ? {
                    connect: {
                        id_image: data.id_image
                    }
                } : undefined
           }
        })
    }





}