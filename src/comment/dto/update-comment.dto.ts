import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RequestUpdateCommentDto {
  @ApiProperty({
    example: 'comment_content',
    description: '수정할 댓글 내용',
  })
  @IsString()
  content: string;
}

export class ResponseUpdateCommentDto {
  success: boolean;
  message: string;
}
