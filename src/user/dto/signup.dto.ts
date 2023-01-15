import { IsEmail, IsNumber, IsString } from 'class-validator';

export class RequestSignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  password: string;
}

export class ResponseSignUpDto {
  success: boolean;
  message: string;
}
