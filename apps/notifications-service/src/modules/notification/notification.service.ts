import { Injectable } from '@nestjs/common';
import { User, Notification } from '@prisma/notifications-client';
import { ServiceInterface } from 'apps/reactively-api/src/interfaces/service.interface';
import { NotificationObject } from './types/notification.type';
import { PrismaService } from '../../prisma.service';
import { NotificationModel } from './notification.model';
import { ConnectorService } from '../../connector/connector.service';

@Injectable()
export class NotificationService {

    constructor(private readonly PrismaService: PrismaService,
        private readonly ConnectorService: ConnectorService ) {} 

    async create(data: NotificationModel): Promise<Notification> {
        try {
            const notification = await this.PrismaService.notification.create({
                data: {
                    userSender: {
                        connect: {
                            id_user: await this.ConnectorService.getOrCreateUser(data.id_user_sender).then((user: User) => { return user.id_user })
                        }
                    },
                    userReceiver: {
                        connect: {
                            id_user: await this.ConnectorService.getOrCreateUser(data.id_user_receiver).then((user: User) => { return user.id_user })
                        }
                    },
                    action: {
                        connect : {
                            id_action: data.id_action.toString()
                        },
                    },
                    text: data.text
                   
                }
            });
            return notification;
        } catch(err: any) {
            throw new Error(err);
        }
        


    }

    


}
