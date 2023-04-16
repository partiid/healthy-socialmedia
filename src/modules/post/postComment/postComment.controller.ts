import { Controller, Post, Param, Req, Body, Delete, UseGuards, Patch, ParseIntPipe, BadRequestException } from "@nestjs/common";
import { PostCommentService } from "./postComment.service";
import { PostCommentModel } from "./postComment.model";
import { Comment } from "@prisma/client";
import { HttpCode, HttpStatus, NotFoundException } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiOkResponse, ApiResponse } from "@nestjs/swagger";
import { AuthenticatedRequest } from "src/interfaces/authenticatedRequest.interface";
import { JwtAuthGuard } from "src/modules/auth/jwtAuth.guard";
import { AllowedActionGuard } from "src/guards/allowedAction.guard";


@ApiTags("comment")
@Controller('comment')
@UseGuards(AllowedActionGuard)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
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

  @Delete(":id_comment")
  @HttpCode(HttpStatus.OK)
  @ApiResponse({status: 200, description: "id_user is OPTIONAL - it is deducted from session customer. Returns the comment object."})
  async deleteComment(@Param('id_comment', ParseIntPipe) id_comment: number , @Req() req: AuthenticatedRequest): Promise<Comment> {
    let response: Comment;
    

    try {
      response = await this.PostCommentService.delete(id_comment);

  } catch(err: any) {
      throw new NotFoundException(err); 
  }
    return response;

}

@Patch()
@HttpCode(HttpStatus.OK)
@ApiResponse({status: 200, description: "id_user is OPTIONAL - it is deducted from session customer. Returns the updated comment object."})
async updateComment(@Body() postComment: PostCommentModel, @Req() req: AuthenticatedRequest): Promise<Comment> {
  let response: Comment;

  postComment.id_user = req.user.id_user || postComment.id_user;

  try {
    response = await this.PostCommentService.update({
      ...postComment
  })

} catch(err: any) {
    throw new NotFoundException(err); 
}
  return response;


}
}