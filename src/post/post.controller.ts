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
import { RequestCreatePostDto } from './dto/create-post.dto';
import { RequestDeletePostDto } from './dto/delete-post.dto';
import { RequestUpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@ApiTags('Post API')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('list')
  @ApiOperation({ summary: '게시글 목록', description: '게시글 목록 API' })
  @ApiCreatedResponse({
    description: '게시글 목록',
    schema: {
      example: {
        success: true,
        message: 'success_post_list',
        data: [
          {
            title: 'post_title',
            writer: 'post_author',
            createdTime: 'post_created_time',
            updatedTime: 'post_updated_time',
          },
        ],
      },
    },
  })
  getLsit() {
    return this.postService.getList();
  }

  @Get(':id')
  @ApiOperation({
    summary: '게시글 상세 조회',
    description: '게시글 상세 조회 API',
  })
  @ApiCreatedResponse({
    description: '게시글 상세 조회',
    schema: {
      example: {
        success: true,
        message: 'success_post_detail',
        data: {
          id: 'post_id',
          writer: 'post_writer',
          title: 'post_title',
          content: 'post_content',
          createdTime: 'post_createdAt',
          updatedTime: 'post_updatedAt',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'BadRequestException' })
  getPost(@Param('id', ParseIntPipe) postId: number) {
    return this.postService.getPost(postId);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  @ApiOperation({
    summary: '게시글 생성',
    description: '게시글 생성 API',
  })
  @ApiCreatedResponse({
    description: '게시글 생성',
    schema: {
      example: {
        success: true,
        message: 'success_create_post',
        data: {
          id: 'post_id',
          writer: 'post_writer',
          title: 'post_title',
          content: 'post_content',
          createdTime: 'post_createdAt',
          updatedTime: 'post_updatedAt',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  createPost(@Req() request, @Body() createPostDto: RequestCreatePostDto) {
    const userId = Number(request.userId);
    return this.postService.createPost(createPostDto, userId);
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  @ApiOperation({
    summary: '게시글 수정',
    description: '게시글 수정 API',
  })
  @ApiCreatedResponse({
    description: '게시글 수정',
    schema: {
      example: {
        success: true,
        message: 'success_update_post',
        data: {
          id: 'post_id',
          writer: 'post_writer',
          title: 'post_title',
          content: 'post_content',
          createdTime: 'post_createdAt',
          updatedTime: 'post_updatedAt',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'BadRequestException' })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  updatePost(@Req() request, @Body() updatePostDto: RequestUpdatePostDto) {
    const userId = Number(request.userId);
    return this.postService.updatePost(updatePostDto, userId);
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  @ApiOperation({
    summary: '게시글 삭제',
    description: '게시글 삭제 API',
  })
  @ApiCreatedResponse({
    description: '게시글 삭제',
    schema: {
      example: {
        success: true,
        message: 'success_delete_post',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'BadRequestException' })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  deletePost(@Req() request, @Body() deletePostDto: RequestDeletePostDto) {
    const userId = Number(request.userId);
    return this.postService.deletePost(deletePostDto.postId, userId);
  }
}
