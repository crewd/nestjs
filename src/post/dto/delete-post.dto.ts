import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DeletePostDto {
  /**
   * 삭제할 게시글의 Id
   * @example 'post_id'
   */
  @IsNumber()
  @Type(() => Number)
  postId: number;
}
