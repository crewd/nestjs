import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { LoginData } from '../user.types';

export class RequestKakaoLoginDto {
  @ApiProperty({
    example: 'kakao_id_token',
    description: '카카오 id token',
  })
  @IsString()
  kakaoIdToken: string;
}

export class ResponseKakaoLoginDto {
  success: boolean;
  message: string;
  data: LoginData;
}
