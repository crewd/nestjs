import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { KakaoAuthGuard } from 'src/auth/kakao-auth.guard';
import { RequestKakaoLoginDto } from './dto/kakao-login.dto';
import { RequestKakaoSignUpDto } from './dto/kako-signup.dto';
import { RequestLoginDto } from './dto/login.dto';
import { RequestSignUpDto } from './dto/signup.dto';
import { UserService } from './user.service';

@ApiTags('User API')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  @ApiOperation({ summary: '로그인', description: '유저 로그인 API' })
  @ApiCreatedResponse({
    description: '로그인 성공',
    schema: {
      example: {
        success: true,
        message: 'success_login',
        data: {
          email: 'example@gmail.com',
          name: 'user_name',
          token: 'user_token',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  login(@Body() loginDto: RequestLoginDto) {
    return this.userService.logIn(loginDto);
  }

  @Post('signup')
  @ApiOperation({ summary: '회원가입', description: '유저 회원가입 API' })
  @ApiCreatedResponse({
    description: '회원가입 성공',
    schema: {
      example: {
        success: true,
        message: 'success_sign_up',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  signUp(@Body() signUpDto: RequestSignUpDto) {
    return this.userService.signUp(signUpDto);
  }

  @UseGuards(KakaoAuthGuard)
  @Post('kakao/login')
  @ApiOperation({
    summary: '카카오 로그인',
    description: '카카오 유저 로그인 API',
  })
  @ApiCreatedResponse({
    description: '로그인 성공',
    schema: {
      example: {
        success: true,
        message: 'success_kakao_login',
        data: {
          email: 'example@gmail.com',
          name: 'user_name',
          token: 'user_token',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  kakaoLogin(
    @Req() request,
    @Body() requsetKaKaoLoginDto: RequestKakaoLoginDto,
  ) {
    const kakaoUid = request.kakaoUid;
    return this.userService.kakaoLogin(kakaoUid);
  }

  @UseGuards(KakaoAuthGuard)
  @Post('kakao/signup')
  @ApiOperation({
    summary: '카카오 회원가입',
    description: '카카오 유저 회원가입 API',
  })
  @ApiCreatedResponse({
    description: '회원가입 성공',
    schema: {
      example: {
        success: true,
        message: 'success_kakao_sign_up',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'UnauthorizedException' })
  kakaoSignUp(
    @Req() request,
    @Body() requestKakaoSignupDto: RequestKakaoSignUpDto,
  ) {
    const kakaoUid = request.kakaoUid;
    return this.userService.kakaoSignUp(requestKakaoSignupDto, kakaoUid);
  }
}
