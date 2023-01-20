import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateEmployeeDto) {
    await this.employeeService.create(body);
  }
}
