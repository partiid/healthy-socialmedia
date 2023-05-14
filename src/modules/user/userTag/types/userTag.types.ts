import { Tag } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class UserTagResponse {
    @ApiProperty()
    userTags: Tag[];
}
