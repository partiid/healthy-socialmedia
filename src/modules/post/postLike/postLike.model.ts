import { ApiConsumes, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PostLikeModel {
    
    @ApiPropertyOptional({description: "Its optional "})
    id_user?: number;

    
    @IsNotEmpty()
    @IsNumber()
    @ApiPropertyOptional()
    id_post: number;


}