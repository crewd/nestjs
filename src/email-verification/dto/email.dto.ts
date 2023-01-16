import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RequestEmailDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: '인증번호를 받을 이메일',
  })
  @IsEmail()
  email: string;
}
