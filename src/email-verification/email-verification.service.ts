import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import Mailgun from 'mailgun.js';
import * as FormData from 'form-data';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { EmailVerification } from './email-varification.entity';

@Injectable()
export class VerificationService {
  constructor(
    private readonly config: ConfigService,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(EmailVerification)
    private verificationRepository: Repository<EmailVerification>,
  ) {}

  async sendEmail(email: string) {
    const checkedEmail = await this.userRepository.findOne({ email: email });

    if (checkedEmail) {
      throw new ConflictException();
    }

    const verificationEmail = await this.verificationRepository.findOne({
      email: email,
    });

    if (verificationEmail) {
      await this.verificationRepository.delete(verificationEmail);
    }

    const randomCode = Math.floor(Math.random() * 8999) + 1000;

    const date = new Date();
    const expirationTime = new Date(date.setMinutes(date.getMinutes() + 3));

    const verification = new EmailVerification();
    verification.email = email;
    verification.verificationCode = randomCode.toString();
    verification.isVerified = false;
    verification.expirationTime = expirationTime;

    await this.verificationRepository.save(verification);

    const client = new Mailgun(FormData).client({
      username: 'changcheon.ryu@gmail.com',
      key: process.env.MAILGUN_API_KEY,
    });

    const message = {
      from: 'changcheon.ryu@gmail.com',
      to: verification.email,
      subject: '회원가입 인증 메일',
      text: `인증코드 ${verification.verificationCode}`,
    };

    return client.messages
      .create(process.env.MAILGUN_API_URL, message)
      .then(() => {
        return { success: true, message: 'success_send_verification_code' };
      })
      .catch(() => {
        throw new BadRequestException();
      });
  }
}
