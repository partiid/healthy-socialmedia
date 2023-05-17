import { Injectable, Logger } from '@nestjs/common';
import { PostLikeEvent } from 'apps/common';
import { UserService } from 'apps/reactively-api/src/modules/user/user.service';
import { PrismaService } from '../prisma.service';
import { ActionService } from '../action/action.service';
import { PostService } from 'apps/reactively-api/src/modules/post/post.service';
@Injectable()
export class HandlerService {

    private readonly Logger = new Logger(HandlerService.name);

    constructor(private readonly UserService: UserService,
        private readonly PrismaService: PrismaService,
        private readonly ActionService: ActionService,
        private readonly PostService: PostService){}    /**
     * @description Handle post like 
     */
    async handlePostLike(data: PostLikeEvent) {
           //for post like we want to send notifications for the post owner 
    
            //get the post owner 
            const post = await this.PostService.findOne({id_post: data.id_post});
            if(!post) {
                this.Logger.error(`Post owner not found for post ${data.id_post}`);
                return;
            }
            const postOwner = await this.UserService.findOne({id_user: post.id_user});
    
            /** User who liked the post  */
            const postLikeUser = await this.UserService.findOne({id_user: data.id_user});
            if(!postLikeUser) {
                this.Logger.error(`Post like user not found for post ${data.id_post}`);
                return;
            }
            //send notification to the post owner
            this.Logger.log(`Sending notification to ${postOwner.username} for post ${data.id_post}`);

            const id_action: string = await this.ActionService.getActionId('post.like');
            try {
                this.Logger.log(`Creating notification for ${postOwner.username} for post ${data.id_post}`);
                
                await this.PrismaService.notification.create({
                    data: {
                        userSender: {
                            connectOrCreate: {
                                where: {
                                    id_user: data.id_user.toString()
                                },
                                create: {
                                    id_user: data.id_user.toString()
                                }
                            }
                        },
                        userReceiver: {
                            connectOrCreate: {
                                where: {
                                    id_user: postOwner.id_user.toString()
                                },
                                create: {
                                    id_user: postOwner.id_user.toString()
                                }
                            }
                        },
                        text: `${postLikeUser.username} liked your post`,
                        action: {
                            connect: {
                                id_action: id_action
                            }
                        },
                    }
                })
            }catch(err: any) {
                this.Logger.error(err);
            }
            this.Logger.log(`Notification sent to ${postOwner.username} for post ${data.id_post}, Action: post.like`);


            
    }



}
