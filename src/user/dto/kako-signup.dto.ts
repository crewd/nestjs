import { Type } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class KakaoSignUpDto {
  /**
   * 가입할 유저의 이메일
   * @example 'example@gmail.com'
   */
  @IsEmail()
  email: string;

  /**
   * 가입할 유저의 이메일
   * @example '홍길동'
   */
  @IsString()
  name: string;

  /**
   * 가입할 유저의 나이
   * @example 25
   */
  @IsNumber()
  @Type(() => Number)
  age: number;

  /**
   * 가입할 유저의 비밀번호
   * @example 'user_password'
   */
  @IsString()
  password: string;

  /**
   * 카카오 아이디 토큰
   * @example 'KakaoIdToken'
   */
  @IsString()
  kakaoIdToken: string;
}
