import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from 'src/dtos/login.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() cred: LoginDto) {
    return await this.authService.login(cred);
  }
}
