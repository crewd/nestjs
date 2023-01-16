import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class RequestKakaoSignUpDto {
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
  @Type(() => Number)
  age: number;

  @ApiProperty({
    example: 'user_password',
    description: '가입할 유저의 비밀번호 입력',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'kakao_id_token',
    description: '카카오 id token',
  })
  @IsString()
  kakaoIdToken: string;
}

export class ResponseKakaoSignUpDto {
  success: boolean;
  message: string;
}
