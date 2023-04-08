import { Controller,  Body, HttpStatus,  Post, HttpCode, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';

import { User } from '@prisma/client';
import { UserModel } from './user.model';
import { ApiTags } from '@nestjs/swagger';
@Controller('user')
@ApiTags("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

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

}
