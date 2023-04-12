import { Injectable } from "@nestjs/common";
import { UserDetails } from "@prisma/client";
import { PartialServiceInterface } from "src/interfaces/partialService.interface";
import { PrismaService } from "src/prisma.service";

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




}