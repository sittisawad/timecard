import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from 'src/dtos/user/create.dto';
import { GetUserDto } from 'src/dtos/user/get-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async createUser(@Body() user: CreateUserDto) {
    if (!(await this.userService.createUser(user))) {
      throw new HttpException('User already exists!', HttpStatus.CONFLICT);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param() params: GetUserDto) {
    return await this.userService.findUserAndRemoveById(params.id);
  }
}
