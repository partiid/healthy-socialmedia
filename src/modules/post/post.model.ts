import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsAlphanumeric, IsInt, IsString, IsOptional } from "class-validator";

export class PostModel {

    @ApiProperty()
    @IsInt()
    id_user: number;

    @ApiProperty()
    @IsAlphanumeric()
    content: string

    @ApiProperty()
    @IsNumber({}, {each: true})
    @IsOptional()
    PostTag?: Array<number>

    




}