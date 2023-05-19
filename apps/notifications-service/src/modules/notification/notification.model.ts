export class NotificationModel {
    id_user_sender: number;
    id_user_receiver: number;
    id_action: string;
    text: string;

    constructor(id_user_sender: number, id_user_receiver: number, id_action: string, text: string) { 
        this.id_user_sender = id_user_sender;
        this.id_user_receiver = id_user_receiver;
        this.id_action = id_action;
        this.text = text;
    }

}