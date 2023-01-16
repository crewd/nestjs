import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { PostDetail } from '../post.types';

export class RequestUpdatePostDto {
  @ApiProperty({
    example: 'post_title',
    description: '수정할 게시글의 제목',
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
    example: 1,
    description: '수정할 게시글의 ID',
  })
  @IsNumber()
  @Type(() => Number)
  postId: number;

  @ApiProperty({
    example: 'post_user_name',
    description: '수정할 게시글의 작성자',
  })
  @IsString()
  userName: string;
}

export class ResponseUpdatePostDto {
  success: boolean;
  message: string;
  data: PostDetail;
}
