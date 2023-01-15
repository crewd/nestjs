import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CommentService } from './comment.service';
import { RequestCreateCommentDto } from './dto/create-comment.dto';
import { RequestUpdateCommentDto } from './dto/update-comment.dto';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Post('post/:id/comment')
  createComment(
    @Param('id', ParseIntPipe) postId: number,
    @Req() request,
    @Body() createCommentDto: RequestCreateCommentDto,
  ) {
    const userId = Number(request.userId);
    return this.commentService.createComment(createCommentDto, postId, userId);
  }

  @Get('post/:id/comments')
  getComments(@Param('id', ParseIntPipe) postId: number) {
    return this.commentService.getComments(postId);
  }

  @UseGuards(AuthGuard)
  @Patch('comment/:commentId')
  updateComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Req() request,
    @Body() updateCommentDto: RequestUpdateCommentDto,
  ) {
    const userId = Number(request.userId);
    return this.commentService.updateComment(
      commentId,
      userId,
      updateCommentDto,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('comment/:commentId')
  deleteComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Req() request,
  ) {
    const userId = Number(request.userId);
    return this.commentService.deleteComment(commentId, userId);
  }
}
