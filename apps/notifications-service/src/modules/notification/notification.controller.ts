import { Controller, Sse, MessageEvent } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationObject } from './types/notification.type';
import { OnEvent } from '@nestjs/event-emitter';
import { Observable, interval, map } from 'rxjs';
import { SseService } from '../../sse/sse.service';
@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService,
    private readonly SseService: SseService) {}

  @OnEvent('notification.created', { async: true })
  async handlePostLikeNotification(data: any) {
    console.log(data);
    return this.SseService.addEvent(data);
   
  }

  
  @Sse('notifications')
  getNotifications()  {
   // return  interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
    return this.SseService.sendEvents().pipe(map((_) => ({ data:  {_} })));
    
  }


}
