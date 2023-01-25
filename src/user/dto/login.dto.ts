import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  /**
   * 가입돤 계정의 이메일
   * @example 'example@gmail.com'
   */
  @IsEmail()
  email: string;

  /**
   * 가입돤 계정의 비밀번호
   * @example 'user_password'
   */
  @IsString()
  password: string;
}
