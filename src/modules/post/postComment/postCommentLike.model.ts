import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
export class PostCommentLikeModel {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    id_comment: number;

    @ApiPropertyOptional({description: "Its optional "})
    id_user?: number;

    

}