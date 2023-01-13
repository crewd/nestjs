import { Body, Controller, Post } from '@nestjs/common';
import { EmailDto } from './dto/email.dto';
import { VerificationDto } from './dto/verification-code.dto';
import { VerificationService } from './email-verification.service';

@Controller('email-verification')
export class VerificationController {
  constructor(private verificationService: VerificationService) {}

  @Post('send')
  async sendEmail(@Body() emailDto: EmailDto) {
    return await this.verificationService.sendEmail(emailDto.email);
  }

  @Post('verify')
  async verify(@Body() verificationDto: VerificationDto) {
    return await this.verificationService.verify(
      verificationDto.email,
      verificationDto.verificationCode,
    );
  }
}
