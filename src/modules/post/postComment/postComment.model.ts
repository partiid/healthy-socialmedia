import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'; 
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class PostCommentModel {

    @ApiPropertyOptional()
    id_user: number;

    @ApiProperty()
    @IsNumber()
    id_post: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    content: string;





}