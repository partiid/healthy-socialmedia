import { ApiConsumes, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PostLikeModel {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id_user: number;

    
    @IsNotEmpty()
    @IsNumber()
    @ApiPropertyOptional()
    id_post: number;


}