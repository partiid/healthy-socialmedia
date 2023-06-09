import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class UserDetailsModel {

    @ApiPropertyOptional({description: "Use to update or delete user details - it's optional"})
    @IsOptional()
    id_user?: number;

    @ApiProperty()
    @IsOptional()
    bio?: string;

    @ApiProperty()
    @IsOptional()
    id_image?: number;

   


}