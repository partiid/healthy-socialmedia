export class PostCommentEvent {
    id_user: number;
    id_post: number;
    id_comment: number;

    constructor(id_user: number, id_post: number, id_comment: number) {
        this.id_user = id_user;
        this.id_post = id_post;
        this.id_comment = id_comment; 
    }



}