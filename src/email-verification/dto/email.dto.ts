import { IsEmail } from 'class-validator';

export class RequestEmailDto {
  /**
   * 인증번호를 받을 이메일
   * @example 'example@gmail.com'
   */
  @IsEmail()
  email: string;
}
