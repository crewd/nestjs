import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { PostDetail } from '../post.types';

export class RequestUpdatePostDto {
  /**
   * 수정할 게시글의 제목
   * @example 'post_title'
   */
  @IsString()
  title: string;

  /**
   * 수정할 게시글의 내용
   * @example 'post_content'
   */
  @IsString()
  content: string;

  /**
   * 수정할 게시글의 Id
   * @example 1
   */
  @IsNumber()
  @Type(() => Number)
  postId: number;

  /**
   * 수정할 게시글의 작성자
   * @example 'post_user_name'
   */
  @IsString()
  userName: string;
}

export class ResponseUpdatePostDto {
  success: boolean;
  message: string;
  data: PostDetail;
}
