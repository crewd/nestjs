import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Post } from 'src/post/post.entity';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentDto } from './dto/comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createComment(
    commentData: CreateCommentDto,
    postId: number,
    userId: number,
  ): Promise<void> {
    const post = await this.postRepository.findOne({ id: postId });

    if (!post) {
      throw new NotFoundException();
    }

    const comment = new Comment();
    comment.content = commentData.content;
    comment.postId = postId;
    comment.userId = userId;
    comment.userName = commentData.userName;

    const group = await this.commentRepository.find({
      parentId: 0,
    });
    comment.group = group.length + 1;

    const parentComment = await this.commentRepository.findOne({
      id: commentData.parentId,
    });

    if (!parentComment && commentData.parentId) {
      console.log('not found');

      throw new BadRequestException();
    }

    if (commentData.parentId) {
      comment.parentId = commentData.parentId;
      comment.depth = parentComment.depth + 1;
      comment.group = parentComment.group;

      const groups = await this.commentRepository.find({
        group: comment.group,
      });

      const childComments = await this.commentRepository.find({
        parentId: commentData.parentId,
      });

      comment.order =
        parentComment.order === 0
          ? groups.length
          : parentComment.order + childComments.length + 1;

      await groups.map(async (data) => {
        if (comment.order <= data.order && data.parentId !== 0) {
          data.order += 1;
          await this.commentRepository.save(data);
        }
      });
    }

    await this.commentRepository.save(comment);
  }

  async getComments(postId: number): Promise<CommentDto[]> {
    const comments = await this.commentRepository.find({ postId: postId });

    const organizedComments: CommentDto[] = plainToInstance(
      CommentDto,
      comments,
    );

    const sortedComments = organizedComments.sort(
      (a, b) => a.group - b.group || a.order - b.order,
    );

    return sortedComments;
  }

  async updateComment(
    commentId: number,
    userId: number,
    updateData: UpdateCommentDto,
  ): Promise<void> {
    const comment = await this.commentRepository.findOne({ id: commentId });
    if (!comment) {
      throw new BadRequestException();
    }

    if (userId !== comment.userId) {
      throw new UnauthorizedException();
    }

    comment.content = updateData.content;
    await this.commentRepository.save(comment);
  }

  async deleteComment(commentId: number, userId: number): Promise<void> {
    const comment = await this.commentRepository.findOne({ id: commentId });

    if (!comment) {
      throw new BadRequestException();
    }

    if (userId !== comment.userId) {
      throw new UnauthorizedException();
    }

    await this.commentRepository.delete({ id: commentId });
  }
}
