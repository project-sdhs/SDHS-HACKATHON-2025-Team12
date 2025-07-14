import { Controller, Get, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/list')
  async getEmployeeList(@Query('companyId') companyId: number) {
    return this.employeeService.getEmployeeListByCompany(Number(companyId));
  }
}
