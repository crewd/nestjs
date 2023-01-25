import { IsEmail, IsString } from 'class-validator';

export class VerificationDto {
  /**
   * 인증번호를 받은 이메일
   * @example 'example@gmail.com'
   */
  @IsEmail()
  email: string;

  /**
   * 이메일에 전송된 인증번호
   * @example 'verification_code'
   */
  @IsString()
  verificationCode: string;
}
