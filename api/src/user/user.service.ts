import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

import { User, UserDocument } from 'src/schemas/user.schema';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { LoginResponseDto } from './dtos/login-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(user: RegisterDto): Promise<boolean> {
    const exist = await this.userModel.find({ email: user.email });
    if (exist.length > 0) return false;

    return (
      (await new this.userModel({
        ...user,
        password: await hash(user.password, 10),
        createdDate: new Date(),
      }).save()) != null
    );
  }

  async login(user: LoginDto): Promise<LoginResponseDto> {
    const current = await this.userModel.findOne({ email: user.email });

    if (!current || !(await compare(user.password, current.password)))
      throw new UnauthorizedException();

    return {
      access_token: this.jwtService.sign({
        username: current.email,
        sub: current.id,
      }),
    };
  }
}
