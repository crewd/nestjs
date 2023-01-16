import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RequestVerificationDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: '인증번호를 받은 이메일',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'verification_code',
    description: '이메일에 전송된 인증번호',
  })
  @IsString()
  verificationCode: string;
}
