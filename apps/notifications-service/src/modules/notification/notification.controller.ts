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
  async handleNotificationCreated(data: any) {
    //get the notification formatted as output 
    const notification = await this.notificationService.findOne(data.id_notification);
    



    return this.SseService.addEvent(notification);
   
  }

  
  @Sse('notifications')
  getNotifications()  {
   // return  interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
    return this.SseService.sendEvents().pipe(map((_) => ({ data:  {_} })));
    
  }


}
