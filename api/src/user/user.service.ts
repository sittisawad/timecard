import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { hash } from 'bcrypt';

import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from 'src/dtos/user/create.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUserById(id: string): Promise<UserDocument | null> {
    try {
      return await this.userModel.findById(id);
    } catch {
      return null;
    }
  }

  async findUser(
    filter: FilterQuery<UserDocument>,
  ): Promise<UserDocument | null> {
    try {
      return await this.userModel.findOne(filter);
    } catch {
      return null;
    }
  }

  async findUserAndRemoveById(id: string): Promise<boolean> {
    try {
      await this.userModel.findByIdAndRemove<UserDocument>(id);
      return true;
    } catch {
      return false;
    }
  }

  async createUser(newUser: CreateUserDto) {
    try {
      return (
        await new this.userModel({
          ...newUser,
          password: await hash(newUser.password, 10),
          createdDate: new Date()
        }).save()
      ).isNew;
    } catch (err) {
      return false;
    }
  }
}
