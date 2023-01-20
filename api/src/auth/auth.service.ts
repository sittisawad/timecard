import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { LoginResponseDto } from 'src/dtos/login-response.dto';
import { LoginDto } from 'src/dtos/login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(cred: LoginDto): Promise<LoginResponseDto> {
    try {
      const user = await this.userService.findUser({ email: cred.email });
      if (await compare(cred.password, user!.password)) {
        return {
          access_token: this.jwtService.sign({
            username: user!.email,
            sub: user!.id,
            isAdmin: user!.isAdmin
          }),
        };
      }

      throw new HttpException(
        'Wrong email or password!',
        HttpStatus.UNAUTHORIZED,
      );
    } catch (err) {
      throw new HttpException('Login fail!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
