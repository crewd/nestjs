import { Body, Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
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
}
