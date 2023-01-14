import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [JwtModule.register({ secret: process.env.SECRET_KEY })],
  providers: [TokenService],
  exports: [TokenService],
})
export class AuthModule {}
