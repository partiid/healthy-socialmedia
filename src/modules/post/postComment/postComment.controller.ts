import { Controller, Post, Req, Body, UseGuards } from "@nestjs/common";
import { PostCommentService } from "./postComment.service";
import { PostCommentModel } from "./postComment.model";
import { Comment } from "@prisma/client";
import { HttpCode, HttpStatus, NotFoundException } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiOkResponse, ApiResponse } from "@nestjs/swagger";
import { AuthenticatedRequest } from "src/interfaces/authenticatedRequest.interface";
import { JwtAuthGuard } from "src/modules/auth/jwtAuth.guard";


@ApiTags("comment")
@Controller('comment')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
export class PostCommentController {
    constructor(private PostCommentService: PostCommentService) {}

@Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({status: 201, description: "id_user is OPTIONAL - it is deducted from session customer. Returns the comment object."})
  async commentPost(@Body() postComment: PostCommentModel, @Req() req: AuthenticatedRequest): Promise<Comment> {
    let response: Comment;

    postComment.id_user = req.user.id_user || postComment.id_user;
    
    try {
      response = await this.PostCommentService.create({
      ...postComment
    })
  } catch(err: any) {
      throw new NotFoundException(err); 
  }
    return response; 
}


}
