import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { LoginData } from '../user.types';

export class RequestLoginDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: '가입된 계정의 이메일 입력',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'user_password',
    description: '가입된 계정의 비밀번호 입력',
  })
  @IsString()
  password: string;
}

export class ResponseLoginDto {
  success: boolean;
  message: string;
  data: LoginData;
}
