import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class RequestDeletePostDto {
  @IsNumber()
  @Type(() => Number)
  postId: number;
}

export class ResponseDeletePostDto {
  success: boolean;
  message: string;
}
