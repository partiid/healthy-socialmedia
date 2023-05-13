import { Controller, Get, Param, Req, UseGuards, Body, HttpStatus, Post, HttpCode, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { PostModel } from './post.model';
import {PostObject} from './post.alias';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiOkResponse, ApiResponse} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { PostLikeService } from './postLike/postLIke.service';
import { PostLikeModel } from './postLike/postLike.model';
import { PostLike, Comment } from '@prisma/client';
import { PostLikeResponse, PostLikeStatus } from './postLike/types/postLike.types';
import {AuthenticatedRequest} from 'src/interfaces/authenticatedRequest.interface'
import { isEmpty } from 'lodash';
import { PostCommentService } from './postComment/postComment.service';
import { PostCommentModel } from './postComment/postComment.model';
import { AllowedActionGuard } from 'src/guards/allowedAction.guard';
@Controller('post')
@ApiTags("post")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PostController {
  constructor(private readonly postService: PostService, private readonly PostLikeService: PostLikeService, private PostCommentService: PostCommentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() post: PostModel, @Req() req: AuthenticatedRequest): Promise<PostObject> {
    let response: PostObject;

    post.id_user = req.user.id_user || post.id_user;
    
    try {
      response = await this.postService.create({
      ...post
    })
  } catch(err: any) {
      throw new NotFoundException(err); 
  }
  return response; 
  }

  
  /**
   * 
   * @returns {Promise<PostObject[]>} get all posts depending on the user tags if he has any  
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async getPosts(): Promise<PostObject[]> {
    //should we filter posts by tags he likes? 
      return await this.postService.findAll();
    
  


  }

  @Get(":id_post")
  async getPost(@Param('id_post', ParseIntPipe) id_post: number): Promise<PostObject> {
    return await this.postService.findOne({
      id_post
    })

  }

  @Post('/like')
  @UseGuards(AllowedActionGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({description: "if post is already liked, the API will unlike the post and delete the record. Returns the status of the post like and the post like object. ", type: PostLikeResponse})
  async likePost(@Body() postLike: PostLikeModel, @Req() req: AuthenticatedRequest): Promise<PostLikeResponse> {
    
    let response: PostLikeResponse = {
      status: PostLikeStatus.LIKE,
      postLike: null
    };
    let postLikeCreated: PostLike; 
    
    console.log("req.user.id_user", req.user); 
    //deduct id user from the token; 
    postLike.id_user = req.user.id_user || postLike.id_user;
    console.log(postLike);
      postLikeCreated = await this.PostLikeService.findOne({
        id_post: postLike.id_post,
        id_user: postLike.id_user
      })
      if(!isEmpty(postLikeCreated)) {
        await this.PostLikeService.delete({
          id_post: postLike.id_post,
          id_user: postLike.id_user
        })
        response.status = PostLikeStatus.UNLIKE;
        response.postLike = postLikeCreated;
        return response;
      }
    

    try {
      postLikeCreated = await this.PostLikeService.create({
        ...postLike
        
      });

      
    }
    catch(err: any) {
      throw new NotFoundException(err);
    }
    response.status = PostLikeStatus.LIKE; 

    //if user wants to like the same post, we want to remove like from the post based on the body - response would be the same
      response.postLike = postLikeCreated;
      return response;
    
    

  }

 

  
}
