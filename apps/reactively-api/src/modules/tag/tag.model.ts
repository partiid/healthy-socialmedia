import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, Length } from "class-validator";

export class TagModel {
    @ApiProperty()
    @IsAlpha()
    @Length(3, 24)
    name: string;


}