import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  sign(id: string) {
    try {
      const token = this.jwtService.sign(id);
      return token;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  verify(token: string, publicKey?: string, options?: JwtVerifyOptions) {
    if (!token) {
      throw new NotFoundException();
    }
    try {
      if (publicKey) {
        const payload = this.jwtService.verify(token, {
          publicKey: publicKey,
          ...options,
        });
        return payload;
      }
      const payload = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
        ...options,
      });
      return payload;
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
