import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class RequestSignUpDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: '가입할 유저의 이메일 입력',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'user_name',
    description: '가입할 유저의 이름 입력',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 25,
    description: '가입할 유저의 나이 입력',
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    example: 'user_password',
    description: '가입할 유저의 비밀번호 입력',
  })
  @IsString()
  password: string;
}

export class ResponseSignUpDto {
  success: boolean;
  message: string;
}
