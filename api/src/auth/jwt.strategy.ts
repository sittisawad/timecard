import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SECRET_KEY } from 'src/consts/config.const';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: <string>configService.get(SECRET_KEY),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username, isAdmin: payload.isAdmin };
  }
}
