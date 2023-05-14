import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { PostLikeEvent } from '../../common/events/post/postLike.event';
@Controller()
export class AppController {
    private readonly Logger = new Logger(AppController.name);

    constructor(private readonly appService: AppService) {}

    @EventPattern('post_like')
    async handlePostLike(data: PostLikeEvent) {
        console.log('event received', data);
        return this.Logger.log('Post like event received', data);
    }
}
