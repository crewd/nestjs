import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import { AuthService } from 'src/auth/auth.service';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: AuthService,
  ) {}
  async logIn(
    loginDto: LoginDto,
  ): Promise<{ success: boolean; message: string; data: any }> {
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
    const userToken = this.jwtService.sign(checkedUser.id.toString());

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
  async signUp(
    signUpDto: SignUpDto,
  ): Promise<{ success: boolean; message: string }> {
    const checkedEmail = await this.userRepository.findOne({
      email: signUpDto.email,
    });

    if (checkedEmail) {
      throw new ConflictException();
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
