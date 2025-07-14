import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { JobModule } from 'src/job/job.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCompanyEntity } from 'src/user/entities/user.company.entity';

@Module({
  imports: [
    JobModule,
    AuthModule,
    TypeOrmModule.forFeature([UserCompanyEntity]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, JwtAuthGuard],
})
export class EmployeeModule {}
