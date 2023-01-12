import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // private tokenUtils: TokenUtils,
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
}
