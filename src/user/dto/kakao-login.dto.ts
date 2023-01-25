import { IsString } from 'class-validator';

export class KakaoLoginDto {
  /**
   * 카카오 아이디 토큰
   * @example 'KakaoIdToken'
   */
  @IsString()
  kakaoIdToken: string;
}
