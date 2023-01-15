import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class UpdatePostDto {
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
