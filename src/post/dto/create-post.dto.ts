import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PostDetail } from '../post.types';

export class RequestCreatePostDto {
  @ApiProperty({
    example: 'post_title',
    description: '생성할 게시글의 제목',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'post_content',
    description: '생성할 게시글의 내용',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: 'post_user_name',
    description: '생성할 게시글의 작성자',
  })
  @IsString()
  userName: string;
}

export class ResponseCreatePostDto {
  success: boolean;
  message: string;
  data: PostDetail;
}
