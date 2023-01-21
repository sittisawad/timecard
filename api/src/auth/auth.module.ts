import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET_KEY, JWT_PERIOD_KEY } from 'src/consts/config.const';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(JWT_SECRET_KEY),
        signOptions: { expiresIn: configService.get<string>(JWT_PERIOD_KEY) },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  exports: [],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
