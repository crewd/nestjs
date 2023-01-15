import { IsBoolean, IsString } from 'class-validator';
import { PostDetail } from '../post.types';

export class RequestCreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  userName: string;
}

export class ResponseCreatePostDto {
  success: boolean;
  message: string;
  data: PostDetail;
}
