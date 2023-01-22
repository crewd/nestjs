import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { Comment } from '../comment.types';

export class RequestCreateCommentDto {
  /**
   * 작성할 댓글의 작성자
   * @example 'comment_user_name'
   */
  @IsString()
  userName: string;

  /**
   * 작성할 댓글의 내용
   * @example 'comment_content'
   */
  @IsString()
  content: string;

  /**
   * 부모 댓글의 ID, 없으면 생략
   * @example 1
   */
  @IsNumber()
  @Type(() => Number)
  parentId?: number;
}

export class ResponseCreateCommentDto {
  success: boolean;
  message: string;
  data: Comment[];
}
