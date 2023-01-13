import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostDetail, PostList } from './post.types';

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
        id: post.id,
        title: post.title,
        writer: post.writer,
        createdTime: post.createdAt,
        updatedTime: post.updatedAt,
      };
    });
    return { success: true, message: 'success_post_list', data: postList };
  }

  async getPost(
    id: number,
  ): Promise<{ sucess: boolean; message: string; data: PostDetail }> {
    const post = await this.postRepository.findOne({ id: id });
    if (!post) {
      throw new NotFoundException();
    }
    const detailPost: PostDetail = {
      id: post.id,
      writer: post.writer,
      title: post.title,
      content: post.content,
      createdTime: post.createdAt,
      updatedTime: post.updatedAt,
    };

    return { sucess: true, message: 'success_post_detail', data: detailPost };
  }
}
