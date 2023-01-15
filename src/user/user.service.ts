import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestLoginDto, ResponseLoginDto } from './dto/login.dto';
import { AuthService } from 'src/auth/auth.service';
import { RequestSignUpDto, ResponseSignUpDto } from './dto/signup.dto';
import { EmailVerification } from 'src/email-verification/email-varification.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(EmailVerification)
    private verificationRepository: Repository<EmailVerification>,

    private authService: AuthService,
  ) {}
  async logIn(loginDto: RequestLoginDto): Promise<ResponseLoginDto> {
    const checkedUser = await this.userRepository.findOne({
      email: loginDto.email,
    });

    if (!checkedUser) {
      throw new UnauthorizedException();
    }
    const checkPassword = await compare(
      loginDto.password,
      checkedUser.password,
    );

    if (!checkPassword) {
      throw new UnauthorizedException();
    }
    const userToken = this.authService.sign(checkedUser.id.toString());

    return {
      success: true,
      message: 'success_login',
      data: {
        token: userToken,
        email: checkedUser.email,
        name: checkedUser.name,
      },
    };
  }
  async signUp(signUpDto: RequestSignUpDto): Promise<ResponseSignUpDto> {
    const checkedEmail = await this.userRepository.findOne({
      email: signUpDto.email,
    });

    if (checkedEmail) {
      throw new ConflictException();
    }

    const verificationData = await this.verificationRepository.findOne({
      email: signUpDto.email,
    });

    if (!verificationData) {
      throw new UnauthorizedException('not_verified_email');
    }

    if (!verificationData.isVerified) {
      throw new UnauthorizedException('not_verification');
    }

    const hashPassword = await hash(
      signUpDto.password,
      Number(process.env.SALT_ROUNDS),
    );

    const user = new User();
    user.email = signUpDto.email;
    user.name = signUpDto.name;
    user.password = hashPassword;
    user.age = signUpDto.age;

    await this.userRepository.save(user);

    return { success: true, message: 'success_sign_up' };
  }
}
