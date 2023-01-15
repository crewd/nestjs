import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('list')
  getLsit() {
    return this.postService.getList();
  }

  @Get(':id')
  getPost(@Param('id', ParseIntPipe) postId: number) {
    return this.postService.getPost(postId);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  createPost(@Req() request, @Body() createPostDto: CreatePostDto) {
    const userId = Number(request.userId);
    return this.postService.createPost(createPostDto, userId);
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  updatePost(@Req() request, @Body() updatePostDto: UpdatePostDto) {
    const userId = Number(request.userId);
    return this.postService.updatePost(updatePostDto, userId);
  }
}
