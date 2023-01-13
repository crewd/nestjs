import { Body, Controller, Post } from '@nestjs/common';
import { EmailDto } from './dto/email.dto';
import { VerificationDto } from './dto/verification-code.dto';
import { VerificationService } from './email-verification.service';

@Controller('email-verification')
export class VerificationController {
  constructor(private verificationService: VerificationService) {}

  @Post('send')
  sendEmail(@Body() emailDto: EmailDto) {
    return this.verificationService.sendEmail(emailDto.email);
  }

  @Post('verify')
  verify(@Body() verificationDto: VerificationDto) {
    return this.verificationService.verify(
      verificationDto.email,
      verificationDto.verificationCode,
    );
  }
}
