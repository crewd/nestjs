import { IsString } from 'class-validator';
import { Comment } from '../comment.types';

export class RequestUpdateCommentDto {
  @IsString()
  content: string;
}

export class ResponseUpdateCommentDto {
  success: boolean;
  message: string;
}
