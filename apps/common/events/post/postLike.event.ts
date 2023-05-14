export class PostLikeEvent {
  constructor(id_user: number, id_post: number) {
    this.id_user = id_user;
    this.id_post = id_post;
  }
  id_user: number;

  id_post: number;
}
