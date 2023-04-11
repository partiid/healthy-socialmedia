import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TagService } from './tag.service';
import { TagModel } from './tag.model';
@Controller('tag')
@ApiTags("tag")

export class TagController {

    constructor(private TagService: TagService) {}
    @Get()
    async findAll() {
        return await this.TagService.findAll(); 
    }

    @Post()
    async create(@Body() tag: TagModel) {
        return await this.TagService.create(
            tag
        );
    }


}
