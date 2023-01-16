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
import { BadRequestException } from '@nestjs/common/exceptions';
import { ResponseKakaoLoginDto } from './dto/kakao-login.dto';
import {
  RequestKakaoSignUpDto,
  ResponseKakaoSignUpDto,
} from './dto/kako-signup.dto';

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

  async kakaoLogin(kakaoUid: string): Promise<ResponseKakaoLoginDto> {
    if (!kakaoUid) {
      throw new BadRequestException('invaild_kakaoUid');
    }
    const user = await this.userRepository.findOne({ kakaoUid: kakaoUid });

    if (!user) {
      throw new UnauthorizedException('not_found_user');
    }

    const token = await this.authService.sign(user.id.toString());

    return {
      success: true,
      message: 'success_kakao_login',
      data: { token: token, email: user.email, name: user.name },
    };
  }

  async kakaoSignUp(
    kakaoSignUpData: RequestKakaoSignUpDto,
    kakaoUid: string,
  ): Promise<ResponseKakaoSignUpDto> {
    const checkedEmail = await this.userRepository.findOne({
      email: kakaoSignUpData.email,
    });

    if (checkedEmail) {
      throw new ConflictException('duplicate_email');
    }
    const checkedKakaoUid = await this.userRepository.findOne({
      kakaoUid: kakaoUid,
    });

    if (checkedKakaoUid) {
      throw new ConflictException('duplicate_kakao_id');
    }

    const user = new User();
    user.email = kakaoSignUpData.email;
    user.name = kakaoSignUpData.name;
    user.age = kakaoSignUpData.age;
    user.kakaoUid = kakaoUid;

    await this.userRepository.save(user);
    return { success: true, message: 'success_sign_up' };
  }
}
