import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailDto } from './dto/email.dto';
import { VerificationDto } from './dto/verification-code.dto';
import { VerificationService } from './email-verification.service';

@ApiTags('Email verification API')
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
