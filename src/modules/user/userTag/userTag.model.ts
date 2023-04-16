import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
export class UserTagModel {

    @ApiPropertyOptional({description: "Its optional"})
    id_user?: number;

    @ApiProperty({description: "Array of tag ids"})
    @IsNumber({}, {each: true})
    tags: number[];
}