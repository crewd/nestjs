import { Body, Controller, Post } from '@nestjs/common';
import { RequestLoginDto } from './dto/login.dto';
import { RequestSignUpDto } from './dto/signup.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  login(@Body() loginDto: RequestLoginDto) {
    return this.userService.logIn(loginDto);
  }

  @Post('signup')
  signUp(@Body() signUpDto: RequestSignUpDto) {
    return this.userService.signUp(signUpDto);
  }
}
