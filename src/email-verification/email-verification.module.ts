import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { EmailVerification } from './email-varification.entity';
import { VerificationController } from './email-verification.controller';
import { VerificationService } from './email-verification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailVerification]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [VerificationController],
  providers: [VerificationService],
})
export class VerificationModule {}
