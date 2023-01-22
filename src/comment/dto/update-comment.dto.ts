import { IsString } from 'class-validator';

export class RequestUpdateCommentDto {
  /**
   * 수정할 댓글의 내용
   * @example 'comment_update_content'
   */
  @IsString()
  content: string;
}

export class ResponseUpdateCommentDto {
  success: boolean;
  message: string;
}
