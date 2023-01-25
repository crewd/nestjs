import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestEmailDto } from './dto/email.dto';
import { VerificationDto } from './dto/verification.dto';
import { VerificationService } from './email-verification.service';

@ApiTags('Email verification API')
@Controller('email-verification')
export class VerificationController {
  constructor(private verificationService: VerificationService) {}

  @Post('send')
  @ApiOperation({
    summary: '인증 이메일 전송',
    description: '이메일 인증 번호 전송 API',
  })
  @ApiResponse({ status: 400, description: 'BadRequestException' })
  sendEmail(@Body() emailDto: RequestEmailDto) {
    return this.verificationService.sendEmail(emailDto.email);
  }

  @ApiOperation({
    summary: '인증번호 인증',
    description: '인증 번호 인증 API',
  })
  @ApiResponse({ status: 400, description: 'BadRequestException' })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  @Post('verify')
  verify(@Body() verificationDto: VerificationDto) {
    return this.verificationService.verify(
      verificationDto.email,
      verificationDto.verificationCode,
    );
  }
}
