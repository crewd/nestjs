import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { KakaoAuthGuard } from 'src/auth/kakao-auth.guard';
import { RequestKakaoSignUpDto } from './dto/kako-signup.dto';
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

  @UseGuards(KakaoAuthGuard)
  @Post('kakao/login')
  kakaoLogin(@Req() request) {
    const kakaoUid = request.kakaoUid;
    return this.userService.kakaoLogin(kakaoUid);
  }

  @UseGuards(KakaoAuthGuard)
  @Post('kakao/signup')
  kakaoSignUp(
    @Req() request,
    @Body() requestKakaoSignupDto: RequestKakaoSignUpDto,
  ) {
    const kakaoUid = request.kakaoUid;
    return this.userService.kakaoSignUp(requestKakaoSignupDto, kakaoUid);
  }
}
