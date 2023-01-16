import { Type } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class RequestKakaoSignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsNumber()
  @Type(() => Number)
  age: number;

  @IsString()
  kakaoIdToken: string;
}

export class ResponseKakaoSignUpDto {
  success: boolean;
  message: string;
}
