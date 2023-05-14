import { Injectable, Logger } from '@nestjs/common';
import { PostLikeEvent } from 'apps/common';
import { PostService } from 'apps/reactively-api/src/modules/post/post.service';
import { UserService } from 'apps/reactively-api/src/modules/user/user.service';
@Injectable()
export class HandlerService {
    private readonly Logger = new Logger(HandlerService.name);

    constructor(private readonly UserService: UserService,
        private readonly PostService: PostService) {}

    /**
     * @description Handle post like
     */
    async handlePostLike(data: PostLikeEvent) {
        //for post like we want to send notifications for the post owner

        //get the post owner
        const postOwner = await this.UserService.findOne({
            id_user: data.id_user,
        });
        if (!postOwner) {
            this.Logger.error(`Post owner not found for post ${data.id_post}`);
            return;
        }

        //send notification to the post owner
        this.Logger.log(
            `Sending notification to ${postOwner.username} for post ${data.id_post}`,
        );

        //get the post
        const post = await this.PostService.findOne({
            id_post: data.id_post,
        });
        if (!post) {
            this.Logger.error(`Post not found for post ${data.id_post}`);
            return;
        }

        //save the notification in the database



    }



}
