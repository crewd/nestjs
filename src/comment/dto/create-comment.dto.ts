import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { Comment } from '../comment.types';

export class RequestCreateCommentDto {
  @ApiProperty({
    example: 'comment_user_name',
    description: '댓글 작성자',
  })
  @IsString()
  userName: string;

  @ApiProperty({
    example: 'comment_content',
    description: '작성할 댓글 내용',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: 1,
    description: '부모 댓글의 ID',
  })
  @IsNumber()
  @Type(() => Number)
  parentId?: number;
}

export class ResponseCreateCommentDto {
  success: boolean;
  message: string;
  data: Comment[];
}
