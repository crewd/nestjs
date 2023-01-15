import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestCreateCommentDto } from './dto/create-comment.dto';

@Controller()
export class CommentController {
  // constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard)
  @Post()
  createComment(
    @Req() request,
    @Body() createCommentDto: RequestCreateCommentDto,
  ) {
    const userId = Number(request.userId);
    return 'create comment';
  }
}
