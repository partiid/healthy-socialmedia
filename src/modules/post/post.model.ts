import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, Matches, IsInt, IsString,  IsOptional, IsNotEmpty } from "class-validator";

export class PostModel {

    @ApiPropertyOptional()
    id_user?: number;

    @ApiProperty()
    @Matches(/^[a-zA-Z0-9 -]*$/)
    @IsNotEmpty()
    content: string


    @ApiPropertyOptional()
    @Matches(/^[a-zA-Z0-9 -]*$/)
    @IsOptional()

    title?: string


    @ApiPropertyOptional()
    @IsInt()
    @IsOptional()
    id_image?: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber({}, {each: true})
    tags?: Array<number>

    




}