import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class SseService {

    private events = new Subject(); 


    addEvent(data: any) {
        this.events.next({...data});
    }

    getEvents() {
        return this.events.asObservable();
    }

    sendEvents() {
        return this.getEvents(); 
    }


}
