// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

// jwt.strategy.ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'adryan123', // replace with configService.get('JWT_SECRET')
    });
  }

  // src/auth/jwt.strategy.ts
  async validate(payload: { sub: string; email: string }) {
  const user = await this.authService.findUserById(payload.sub);
  if (!user) throw new UnauthorizedException();
  return user; // This becomes request.user
  }

}

