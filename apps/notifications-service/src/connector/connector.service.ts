import { Injectable } from '@nestjs/common';
import { User } from '@prisma/notifications-client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ConnectorService {
    constructor(private readonly PrismaService: PrismaService) {} 
    /**
     * @description Get notifications-service user from MongoDB
     * @param api_id_user 
     * @returns 
     */
    async getUser(api_id_user: number): Promise<User> {
        return await this.PrismaService.user.findUnique({ 
            where: {
                api_id_user: api_id_user
            }

        }); 
    }   

     /**
     * @description get user - NotificationsService based on api_id_user , if not found create new user
     * @param api_id_user 
     * @returns 
     */
     async getOrCreateUser(api_id_user: number): Promise<User> {
        let user: User = await this.getUser(api_id_user);
        if(!user) {
            //this.Logger.log(`User with api_id_user ${api_id_user} not found, creating new user`);
            user = await this.PrismaService.user.create({
                data: {
                    api_id_user: api_id_user,
                    
                }
            });
            //this.Logger.log(`User with api_id_user ${api_id_user} created`);
        }
        return user;

    }



}
