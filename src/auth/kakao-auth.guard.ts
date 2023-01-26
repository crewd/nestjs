import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwksClient } from 'jwks-rsa';
import { AuthService } from './auth.service';

@Injectable()
export class KakaoAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const kakaoIdToken = request.body.kakaoIdToken;

    const jwksClient = new JwksClient({
      jwksUri: 'https://kauth.kakao.com/.well-known/jwks.json',
      requestHeaders: {},
      timeout: 30000,
    });

    const tokenHeader = kakaoIdToken.split('.')[0];

    const header = Buffer.from(tokenHeader, 'base64');
    const decodedHeader = JSON.parse(header.toString());

    const kid = decodedHeader.kid;
    const key = await jwksClient.getSigningKey(kid);
    const signKey = key.getPublicKey();

    const verifyToken = this.authService.verify(kakaoIdToken, signKey, {
      issuer: 'https://kauth.kakao.com',
      audience: process.env.KAKAO_API_KEY,
    });

    request.user = { kakaoUid: verifyToken.sub };

    return true;
  }
}
