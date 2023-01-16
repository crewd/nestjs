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
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CommentService } from './comment.service';
import { RequestCreateCommentDto } from './dto/create-comment.dto';
import { RequestUpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comment API')
@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Post('post/:postId/comment')
  @ApiOperation({ summary: '댓글 작성', description: '댓글 작성 API' })
  @ApiCreatedResponse({
    description: '댓글 작성',
    schema: {
      example: {
        success: true,
        message: 'success_create_comment',
        data: {
          id: 'comment_id',
          parentId: 'comment_parentId',
          userName: 'comment_userName',
          content: 'comment_content',
          depth: 'comment_depth',
          group: 'comment_group',
          order: 'comment_order',
          createdTime: 'comment_createdAt',
          updatedTime: 'comment_updatedAt',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'BadRequestException' })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  createComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() request,
    @Body() createCommentDto: RequestCreateCommentDto,
  ) {
    const userId = Number(request.userId);
    return this.commentService.createComment(createCommentDto, postId, userId);
  }

  @Get('post/:postId/comments')
  @ApiOperation({ summary: '댓글 목록', description: '댓글 목록 API' })
  @ApiCreatedResponse({
    description: '댓글 목록',
    schema: {
      example: {
        success: true,
        message: 'success_comment_list',
        data: [
          {
            id: 'post_id',
            title: 'post_title',
            writer: 'post_userName',
            createdTime: 'post_createdAt',
            updatedTime: 'post_updatedAt',
          },
        ],
      },
    },
  })
  getComments(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentService.getComments(postId);
  }

  @UseGuards(AuthGuard)
  @Patch('comment/:commentId')
  @ApiOperation({ summary: '댓글 수정', description: '댓글 수정 API' })
  @ApiCreatedResponse({
    description: '댓글 수정',
    schema: {
      example: {
        success: true,
        message: 'success_update_comment',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'BadRequestException' })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
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
  @ApiOperation({ summary: '댓글 삭제', description: '댓글 삭제 API' })
  @ApiCreatedResponse({
    description: '댓글 삭제',
    schema: {
      example: {
        success: true,
        message: 'success_delete_comment',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'BadRequestException' })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  deleteComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Req() request,
  ) {
    const userId = Number(request.userId);
    return this.commentService.deleteComment(commentId, userId);
  }
}
