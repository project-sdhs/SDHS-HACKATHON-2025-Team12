import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationStatusEntity } from '../apply/entities/application-status.entity';
import { CompanyInformationEntity } from './entities/company-information.entity';
import { JobInformationEntity } from './entities/job-information.entity';
import { PresentCompanyEntity } from './entities/present-company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApplicationStatusEntity,
      CompanyInformationEntity,
      JobInformationEntity,
      PresentCompanyEntity,
    ]),
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}

('/upload/jobinformation/1/file.pdf');
