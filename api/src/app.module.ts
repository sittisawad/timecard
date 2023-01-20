import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { MONGODB_URI_KEY } from './consts/config.const';
import { UserModule } from './user/user.module';

const env = process.env.NODE_ENV ? '.development.env' : '.env';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: env,
        }),
      ],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(MONGODB_URI_KEY),
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}
