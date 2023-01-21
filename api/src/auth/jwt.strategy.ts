import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET_KEY, JWT_PERIOD_KEY } from 'src/consts/config.const';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: <string>configService.get(JWT_SECRET_KEY),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username, isAdmin: payload.isAdmin };
  }
}
