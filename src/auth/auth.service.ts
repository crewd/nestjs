import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  sign(id: string) {
    const token = this.jwtService.sign(id);
    return token;
  }
}
