import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import {
  RequestCreatePostDto,
  ResponseCreatePostDto,
} from './dto/create-post.dto';
import { ResponseDeletePostDto } from './dto/delete-post.dto';
import {
  RequestUpdatePostDto,
  ResponseUpdatePostDto,
} from './dto/update-post.dto';
import { Post } from './post.entity';
import { PostDetail, PostList } from './post.types';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
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
        writer: post.userName,
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
      writer: post.userName,
      title: post.title,
      content: post.content,
      createdTime: post.createdAt,
      updatedTime: post.updatedAt,
    };

    return { sucess: true, message: 'success_post_detail', data: detailPost };
  }

  async createPost(
    createPostData: RequestCreatePostDto,
    userId: number,
  ): Promise<ResponseCreatePostDto> {
    const user = await this.userRepository.findOne({ id: userId });

    if (user.name !== createPostData.userName) {
      throw new UnauthorizedException();
    }

    const post = new Post();
    post.content = createPostData.content;
    post.title = createPostData.title;
    post.userName = createPostData.userName;
    post.userId = userId;

    await this.postRepository.save(post);

    const postData = {
      id: post.id,
      writer: post.userName,
      title: post.title,
      content: post.content,
      createdTime: post.createdAt,
      updatedTime: post.updatedAt,
    };

    return { success: true, message: 'success_create_post', data: postData };
  }

  async updatePost(
    updateData: RequestUpdatePostDto,
    userId: number,
  ): Promise<ResponseUpdatePostDto> {
    const post = await this.postRepository.findOne({ id: updateData.postId });
    if (!post) {
      throw new NotFoundException();
    }
    if (post.userId !== userId) {
      throw new UnauthorizedException();
    }
    post.title = updateData.title;
    post.content = updateData.content;

    await this.postRepository.save(post);

    const postData = {
      id: post.id,
      writer: post.userName,
      title: post.title,
      content: post.content,
      createdTime: post.createdAt,
      updatedTime: post.updatedAt,
    };

    return { success: true, message: 'success_update_post', data: postData };
  }

  async deletePost(
    postId: number,
    userId: number,
  ): Promise<ResponseDeletePostDto> {
    const post = await this.postRepository.findOne({ id: postId });
    if (!post) {
      console.log(post);
      throw new NotFoundException();
    }
    if (post.userId !== userId) {
      throw new UnauthorizedException();
    }
    await this.postRepository.delete({ id: postId });
    return { success: true, message: 'success_delete_post' };
  }
}
