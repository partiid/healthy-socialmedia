import { ApiProperty } from "@nestjs/swagger";
import { CommentLike } from "@prisma/client";
export class PostCommentLikeResponse {
    @ApiProperty()
    status: PostCommentLikeStatus;

    @ApiProperty()
    postCommentLike: CommentLike;
}
export enum PostCommentLikeStatus {
    LIKE = "like",
    UNLIKE = "unlike"
}