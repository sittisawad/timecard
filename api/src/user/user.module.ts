import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SECRET_KEY } from 'src/consts/config.const';

const env = process.env.NODE_ENV ? '.development.env' : '.env';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: env,
        }),
      ],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(SECRET_KEY),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
