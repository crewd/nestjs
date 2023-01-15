import { IsBoolean, IsEmail, IsObject, IsString } from 'class-validator';
import { LoginData } from '../user.types';

export class RequestLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class ResponseLoginDto {
  success: boolean;
  message: string;
  data: LoginData;
}
