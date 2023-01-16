import { IsString } from 'class-validator';
import { LoginData } from '../user.types';

export class RequestKakaoLoginDto {
  @IsString()
  kakaoIdToken: string;
}

export class ResponseKakaoLoginDto {
  success: boolean;
  message: string;
  data: LoginData;
}
