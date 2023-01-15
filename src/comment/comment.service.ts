import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/post.entity';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import {
  RequestCreateCommentDto,
  ResponseCreateCommentDto,
} from './dto/create-comment.dto';

export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createComment(
    commentData: RequestCreateCommentDto,
    postId: number,
    userId: number,
  ): Promise<ResponseCreateCommentDto> {
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
      throw new NotFoundException();
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

    const commentsData = await this.commentRepository.find({ postId: postId });

    const comments = commentsData.map((data) => {
      return {
        id: data.id,
        parentId: data.parentId,
        userName: data.userName,
        content: data.content,
        depth: data.depth,
        group: data.group,
        order: data.order,
        createdTime: data.createdAt,
        updatedTime: data.updatedAt,
      };
    });

    const sortedComments = comments.sort(
      (a, b) => a.group - b.group || a.order - b.order,
    );

    return {
      success: true,
      message: 'success_create_comment',
      data: sortedComments,
    };
  }
}
