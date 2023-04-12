import { ApiProperty } from "@nestjs/swagger";
import { PostLike } from "@prisma/client";


export class PostLikeResponse {
    @ApiProperty()
    status: PostLikeStatus;
    @ApiProperty()
    postLike: PostLike;

}

export enum PostLikeStatus {
    LIKE = "like",
    UNLIKE = "unlike"
}

