import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CommentService } from './comment.service';
import { RequestCreateCommentDto } from './dto/create-comment.dto';

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
}
