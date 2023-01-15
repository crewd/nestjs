import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { Comment } from '../comment.types';

export class RequestCreateCommentDto {
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsNumber()
  @Type(() => Number)
  postId: number;

  @IsString()
  userName: string;

  @IsString()
  content: string;

  @Type(() => Number)
  parentId?: number;
}

export class ResponseCreateCommentDto {
  success: boolean;
  message: string;
  data: Comment[];
}
