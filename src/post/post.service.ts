import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostList } from './post.types';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}
  async getList(): Promise<{
    success: boolean;
    message: string;
    data: PostList[];
  }> {
    const posts = await this.postRepository.find();

    const postList: PostList[] = posts.map((post) => {
      return {
        title: post.title,
        writer: post.writer,
        createdTime: post.createdAt,
        updatedTime: post.updatedAt,
      };
    });
    return { success: true, message: 'success_post_list', data: postList };
  }
}
