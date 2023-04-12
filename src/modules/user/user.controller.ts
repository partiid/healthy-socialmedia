import { Controller, Query,  Param, Body, HttpStatus,  Post, HttpCode, BadRequestException, Inject, forwardRef, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { PostObject } from '../post/post.alias';
import { User } from '@prisma/client';
import { UserModel } from './user.model';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PostService } from '../post/post.service';
import { ParseIntPipe } from '@nestjs/common';
import { UserDetailsService } from './userDetails.service';
@Controller('user')
@ApiTags("user")
export class UserController {
  constructor(private readonly userService: UserService,
    @Inject(forwardRef(() => PostService)) private PostService: PostService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() user: UserModel): Promise<User> { 
    
    let response: User; 
     try {
       response = await this.userService.create({
        ...user
      })
    } catch(err: any) {
      
      throw new BadRequestException(err);
    }
    return response; 
    
  }

  @Get('/:id_user/posts')
  async getUserPosts(@Param('id_user', ParseIntPipe) id_user: number): Promise<PostObject[]> {
    return this.PostService.findAllByIdUser(id_user);
  }

  @Get('/:id_user/details')
  async getUserDetails(@Param('id_user', ParseIntPipe) id_user: number): Promise<User> {
    return this.userService.findOne({
      id_user
    });
  }

}
