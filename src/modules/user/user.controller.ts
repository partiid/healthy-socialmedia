import { Controller, Req, UseGuards, Put,  Param, Body, HttpStatus,  Post, HttpCode, BadRequestException, Inject, forwardRef, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { PostObject } from '../post/post.alias';
import { User, UserDetails } from '@prisma/client';
import { UserModel } from './user.model';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PostService } from '../post/post.service';
import { ParseIntPipe } from '@nestjs/common';
import { UserDetailsService } from './userDetails/userDetails.service';
import { UserDetailsModel } from './userDetails/userDetails.model';
import { AllowedActionGuard } from 'src/guards/allowedAction.guard';
import { Request } from 'express';
import { AuthenticatedRequest } from 'src/interfaces/authenticatedRequest.interface';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { UserTagService } from './userTag/userTag.service';
import { UserTagModel } from './userTag/userTag.model';
@Controller('user')
@ApiTags("user")
export class UserController {
  constructor(private readonly userService: UserService,
    @Inject(forwardRef(() => PostService)) private PostService: PostService, private UserDetailsService: UserDetailsService,
    private UserTagService: UserTagService) {}

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

  @Post('/tags')
  @UseGuards(AllowedActionGuard)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({description: "id_user is deducted from token"})
  async createUserTags(@Body() tags: UserTagModel, @Req() req: AuthenticatedRequest): Promise<User> {

    
    tags.id_user = req.user.id_user || tags.id_user;
    try {
      if(await this.UserTagService.create(tags) == true) {
        return this.userService.findOne({
          id_user: tags.id_user
        }); 
     };
    } catch(err: any) {
      throw new BadRequestException(err);
    }
     


  }
  @Get('/:id_user/posts')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getUserPosts(@Param('id_user', ParseIntPipe) id_user: number): Promise<PostObject[]> {
    return await this.PostService.findAllByIdUser(id_user);
  }


  
  @Post('/details')
  @UseGuards(AllowedActionGuard)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({description: "Create user details - bio, profile image etc."})
  async updateUserDetails(@Body() user: UserDetailsModel, @Req() req: AuthenticatedRequest): Promise<UserDetails> {
    user.id_user = req.user.id_user || user.id_user;

    return this.UserDetailsService.create(user);

  }


  @Get('/:id_user/details')
  @ApiOperation({description: "Get ONLY user details"})
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getUserDetails(@Param('id_user', ParseIntPipe) id_user: number): Promise<UserDetails> {
    
    const user: any = await this.userService.findOne({
      id_user
    });

    if(!user) {
      throw new BadRequestException("User not found");
    }
    return user.details; 
    
  }

  @Get("/:id_user/profile")
  @ApiOperation({description: "Get full user profile - posts w/ likes & comments, details, tags"})
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getUserProfile(@Param("id_user", ParseIntPipe) id_user: number): Promise<User> {
   return this.userService.findOne({
     id_user
   });
  }




}
