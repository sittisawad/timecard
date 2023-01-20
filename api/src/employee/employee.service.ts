import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { Employee, EmployeeDocument } from 'src/schemas/employee.schema';
import { UserService } from 'src/user/user.service';
import { CreateEmployeeDto } from './dtos/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    private userService: UserService,
  ) {}
  async create(employee: CreateEmployeeDto) {
    try {
      const user = await this.userService.getUser(employee.userId);
      (await new this.employeeModel({
        email: user!.email,
        firstName: user!.firstName,
        lastName: user!.lastName,
        createdDate: new Date(),
        user: user,
      }).save()) != null;
    } catch (err: unknown) {
      if (err instanceof MongoServerError) {
        throw new HttpException(
          'Employee already exists!',
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          'Unknow Error!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
