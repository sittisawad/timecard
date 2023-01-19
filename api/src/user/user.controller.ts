import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() user: RegisterDto) {
    await this.userService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: LoginDto) {
    return this.userService.login(user);
  }
}
