import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

import { User, UserDocument } from 'src/schemas/user.schema';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { LoginResponseDto } from './dtos/login-response.dto';
import { MongoServerError } from 'mongodb';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(user: RegisterDto) {
    try {
      await new this.userModel({
        ...user,
        password: await hash(user.password, 10),
        createdDate: new Date(),
      }).save();
    } catch (err) {
      if (err instanceof MongoServerError) {
        throw new HttpException('User already exists!', HttpStatus.CONFLICT);
      } else {
        throw new HttpException(
          'Unknow error!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async login(user: LoginDto): Promise<LoginResponseDto> {
    try {
      const current = await this.userModel.findOne({ email: user.email });

      if (!current || !(await compare(user.password, current.password)))
        throw new UnauthorizedException();

      return {
        access_token: this.jwtService.sign({
          username: current.email,
          sub: current.id,
        }),
      };
    } catch {
      throw new UnauthorizedException();
    }
  }

  async getUser(id: string): Promise<User | null> {
    try {
      return await this.userModel.findById<User>(id);
    } catch {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
  }
}
