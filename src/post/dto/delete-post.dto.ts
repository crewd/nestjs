import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class RequestDeletePostDto {
  @ApiProperty({
    example: 1,
    description: '삭제할 게시글의 ID',
  })
  @IsNumber()
  @Type(() => Number)
  postId: number;
}

export class ResponseDeletePostDto {
  success: boolean;
  message: string;
}
