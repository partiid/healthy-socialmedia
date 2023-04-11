import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Matches, IsInt, IsString, IsOptional, IsNotEmpty } from "class-validator";

export class PostModel {

    @ApiProperty()
    @IsInt()
    id_user: number;

    @ApiProperty()
    @Matches(/^[a-zA-Z0-9 -]*$/)
    @IsNotEmpty()
    content: string


    @ApiProperty()
    @Matches(/^[a-zA-Z0-9 -]*$/)
    @IsOptional()
    title?: string


    @ApiProperty()
    @IsInt()
    @IsOptional()
    id_image?: number

    @ApiProperty()
    @IsNumber({}, {each: true})
    @IsOptional()
    tags?: Array<number>

    




}