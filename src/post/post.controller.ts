import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
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

  @Post('create')
  createPost(@Body() createPostDto: CreatePostDto) {
    console.log(createPostDto);
    return 'create post';
  }
}
