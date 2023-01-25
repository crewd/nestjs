import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { KakaoAuthGuard } from 'src/auth/kakao-auth.guard';
import { KakaoLoginDto } from './dto/kakao-login.dto';
import { KakaoSignUpDto } from './dto/kako-signup.dto';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { UserService } from './user.service';

@ApiTags('User API')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  @ApiOperation({ summary: '로그인', description: '유저 로그인 API' })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  login(@Body() loginDto: LoginDto) {
    return this.userService.logIn(loginDto);
  }

  @Post('signup')
  @ApiOperation({ summary: '회원가입', description: '유저 회원가입 API' })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }

  @UseGuards(KakaoAuthGuard)
  @Post('kakao/login')
  @ApiOperation({
    summary: '카카오 로그인',
    description: '카카오 유저 로그인 API',
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  kakaoLogin(@Req() request, @Body() kaKaoLoginDto: KakaoLoginDto) {
    const kakaoUid = request.kakaoUid;
    return this.userService.kakaoLogin(kakaoUid);
  }

  @UseGuards(KakaoAuthGuard)
  @Post('kakao/signup')
  @ApiOperation({
    summary: '카카오 회원가입',
    description: '카카오 유저 회원가입 API',
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  kakaoSignUp(@Req() request, @Body() requestKakaoSignupDto: KakaoSignUpDto) {
    const kakaoUid = request.kakaoUid;
    return this.userService.kakaoSignUp(requestKakaoSignupDto, kakaoUid);
  }
}
