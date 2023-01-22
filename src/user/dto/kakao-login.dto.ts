import { IsString } from 'class-validator';
import { LoginData } from '../user.types';

export class RequestKakaoLoginDto {
  /**
   * 카카오 아이디 토큰
   * @example 'KakaoIdToken'
   */
  @IsString()
  kakaoIdToken: string;
}

export class ResponseKakaoLoginDto {
  success: boolean;
  message: string;
  data: LoginData;
}
