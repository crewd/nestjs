import { IsString } from 'class-validator';

export class UpdatePostDto {
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
   * 수정할 게시글의 작성자
   * @example 'post_user_name'
   */
  @IsString()
  userName: string;
}
