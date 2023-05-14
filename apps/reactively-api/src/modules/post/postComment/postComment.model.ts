import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'; 
import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';

export class PostCommentModel {

    @ApiPropertyOptional({description: "Use to update or delete"})
    @IsOptional()
    @IsNumber()
    id_comment?: number;

    @ApiPropertyOptional({description: "It's deducted from the session"})
    id_user: number;

    @ApiPropertyOptional({description: "It's required to create a comment"})
    @IsOptional()
    @IsNumber()
    id_post?: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    content: string;



}