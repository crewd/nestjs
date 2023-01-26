import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comment API')
@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Post('post/:postId/comment')
  @ApiOperation({ summary: '댓글 작성', description: '댓글 작성 API' })
  @ApiResponse({ status: 400, description: 'BadRequestException' })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  createComment(
    @Param('postId', ParseIntPipe) postId: number,
    @User('userId', ParseIntPipe) userId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.createComment(createCommentDto, postId, userId);
  }

  @Get('post/:postId/comments')
  @ApiOperation({ summary: '댓글 목록', description: '댓글 목록 API' })
  getComments(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentService.getComments(postId);
  }

  @UseGuards(AuthGuard)
  @Patch('comment/:commentId')
  @ApiOperation({ summary: '댓글 수정', description: '댓글 수정 API' })
  @ApiResponse({ status: 400, description: 'BadRequestException' })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  updateComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @User('userId', ParseIntPipe) userId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(
      commentId,
      userId,
      updateCommentDto,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('comment/:commentId')
  @ApiOperation({ summary: '댓글 삭제', description: '댓글 삭제 API' })
  @ApiResponse({ status: 400, description: 'BadRequestException' })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  deleteComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @User('userId', ParseIntPipe) userId: number,
  ) {
    return this.commentService.deleteComment(commentId, userId);
  }
}
