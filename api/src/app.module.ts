import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { MONGODB_URI_KEY } from './consts/config.const';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';
import { AuthModule } from './auth/auth.module';

const env = process.env.NODE_ENV ? '.development.env' : '.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: env,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(MONGODB_URI_KEY),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}
