import { Controller, UseGuards, Body, HttpStatus, Post, HttpCode, NotFoundException } from '@nestjs/common';
import { PostService } from './post.service';
import { PostModel } from './post.model';
import {PostObject} from './post.alias';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';

@Controller('post')
@ApiTags("post")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() post: PostModel): Promise<PostObject> {
    let response: PostObject;
    try {
      response = await this.postService.create({
      ...post
    })
  } catch(err: any) {
      throw new NotFoundException(err); 
  }
  return response; 
  }

  //TODO ADD POST EDITION 



}
