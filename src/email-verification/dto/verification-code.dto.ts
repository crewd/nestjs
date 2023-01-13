import { IsNumber } from 'class-validator';

export class VerificationCode {
  @IsNumber()
  verificationCode: number;
}
