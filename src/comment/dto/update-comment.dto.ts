import { IsString } from 'class-validator';

export class UpdateCommentDto {
  /**
   * 수정할 댓글의 내용
   * @example 'comment_update_content'
   */
  @IsString()
  content: string;
}
