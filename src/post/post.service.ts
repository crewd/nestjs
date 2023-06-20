import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PostListDto } from './dto/post-list.dto';
import { PostDto } from './dto/post.dto';
import { Post } from './post.entity';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async getList(): Promise<PostListDto[]> {
    const posts = await this.postRepository.find();

    const postList: PostListDto[] = plainToInstance(PostListDto, posts);
    return postList;
  }

  async getPost(id: number): Promise<PostDto> {
    const post = await this.postRepository.findOne({ id: id });
    if (!post) {
      throw new BadRequestException();
    }

    const detailPost: PostDto = plainToInstance(PostDto, post);

    return detailPost;
  }

  async createPost(
    createPostData: CreatePostDto,
    userId: number,
  ): Promise<PostDto> {
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

    const postData: PostDto = plainToInstance(PostDto, post);

    return postData;
  }

  async updatePost(
    userId: number,
    postId: number,
    updateData: UpdatePostDto,
  ): Promise<PostDto> {
    const post = await this.postRepository.findOne({ id: postId });
    if (!post) {
      throw new BadRequestException();
    }
    if (post.userId !== userId) {
      throw new UnauthorizedException();
    }
    post.title = updateData.title;
    post.content = updateData.content;

    await this.postRepository.save(post);

    const postData: PostDto = plainToInstance(PostDto, post);

    return postData;
  }

  async deletePost(postId: number, userId: number): Promise<void> {
    const post = await this.postRepository.findOne({ id: postId });
    if (!post) {
      console.log(post);
      throw new NotFoundException();
    }
    if (post.userId !== userId) {
      throw new UnauthorizedException();
    }
    await this.postRepository.delete({ id: postId });
  }
}
