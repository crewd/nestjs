import { IsString } from 'class-validator';

export class RequestUpdateCommentDto {
  @IsString()
  content: string;
}

export class ResponseUpdateCommentDto {
  success: boolean;
  message: string;
}
