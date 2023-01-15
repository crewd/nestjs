import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { Comment } from '../comment.types';

export class RequestCreateCommentDto {
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
