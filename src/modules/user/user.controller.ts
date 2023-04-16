import { Controller, Req, UseGuards, Put,  Param, Body, HttpStatus,  Post, HttpCode, BadRequestException, Inject, forwardRef, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { PostObject } from '../post/post.alias';
import { User, UserDetails } from '@prisma/client';
import { UserModel } from './user.model';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PostService } from '../post/post.service';
import { ParseIntPipe } from '@nestjs/common';
import { UserDetailsService } from './userDetails/userDetails.service';
import { UserDetailsModel } from './userDetails/userDetails.model';
import { AllowedActionGuard } from 'src/guards/allowedAction.guard';
import { Request } from 'express';
import { AuthenticatedRequest } from 'src/interfaces/authenticatedRequest.interface';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
@Controller('user')
@ApiTags("user")
export class UserController {
  constructor(private readonly userService: UserService,
    @Inject(forwardRef(() => PostService)) private PostService: PostService, private UserDetailsService: UserDetailsService) {}

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

  
  @Post('/details')
  @UseGuards(AllowedActionGuard)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateUserDetails(@Body() user: UserDetailsModel, @Req() req: AuthenticatedRequest): Promise<UserDetails> {
    user.id_user = req.user.id_user || user.id_user;

    return this.UserDetailsService.create(user);

  }


  @Get('/:id_user/details')
  async getUserDetails(@Param('id_user', ParseIntPipe) id_user: number): Promise<UserDetails> {
    
    const user: any = await this.userService.findOne({
      id_user
    });
    if(!user) {
      throw new BadRequestException("User not found");
    }
    return user.details; 
    
  }



}
