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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@ApiTags('Post API')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('list')
  @ApiOperation({
    summary: '게시글 목록 조회',
    description: '게시글 목록 조회 API',
  })
  getLsit() {
    return this.postService.getList();
  }

  @Get(':id')
  @ApiOperation({
    summary: '게시글 상세 조회',
    description: '게시글 상세 조회 API',
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
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  createPost(@Req() request, @Body() createPostDto: CreatePostDto) {
    const userId = Number(request.userId);
    return this.postService.createPost(createPostDto, userId);
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  @ApiOperation({
    summary: '게시글 수정',
    description: '게시글 수정 API',
  })
  @ApiResponse({ status: 400, description: 'BadRequestException' })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  updatePost(@Req() request, @Body() updatePostDto: UpdatePostDto) {
    const userId = Number(request.userId);
    return this.postService.updatePost(updatePostDto, userId);
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  @ApiOperation({
    summary: '게시글 삭제',
    description: '게시글 삭제 API',
  })
  @ApiResponse({ status: 400, description: 'BadRequestException' })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  deletePost(@Req() request, @Body() deletePostDto: DeletePostDto) {
    const userId = Number(request.userId);
    return this.postService.deletePost(deletePostDto.postId, userId);
  }
}
