import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { PostDetail } from '../post.types';

export class RequestUpdatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  @Type(() => Number)
  postId: number;

  @IsString()
  userName: string;
}

export class ResponseUpdatePostDto {
  success: boolean;
  message: string;
  data: PostDetail;
}
