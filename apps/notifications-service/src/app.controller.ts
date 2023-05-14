import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { PostLikeEvent } from 'apps/common';
import { UserService } from 'apps/reactively-api/src/modules/user/user.service';

@Controller()
export class AppController {
    private readonly Logger = new Logger(AppController.name);

    constructor(private readonly appService: AppService,
        private readonly UserService: UserService
        ) {}

        @EventPattern('post.like')
        async handlePostLike(data: PostLikeEvent) {
            //for post like we want to send notifications for the post owner 
    
            //get the post owner 
            const postOwner = await this.UserService.findOne({id_user: data.id_user});
            if(!postOwner) {
                this.Logger.error(`Post owner not found for post ${data.id_post}`);
                return;
            }
    
            //send notification to the post owner
            this.Logger.log(`Sending notification to ${postOwner.username} for post ${data.id_post}`);
        
            
            
        }

   
}
