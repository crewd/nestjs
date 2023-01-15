import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Global()
@Module({
  imports: [JwtModule.register({ secret: process.env.SECRET_KEY })],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
