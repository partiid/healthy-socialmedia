import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Action } from '@prisma/notifications-client';

@Injectable()
export class ActionService {

    constructor(private readonly PrismaService: PrismaService) {} 
    async getActionId(name: string): Promise<string> {
        let action: Action = await this.PrismaService.action.findFirst({
            where: {
                name
            }
        });
        return action.id_action; 


    }

}
