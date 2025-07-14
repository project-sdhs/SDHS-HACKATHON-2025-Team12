import { Module } from '@nestjs/common';
import { ApplyService } from './apply.service';
import { ApplyController } from './apply.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { JobInformationEntity } from 'src/job/entities/job-information.entity';
import { CompanyInformationEntity } from 'src/job/entities/company-information.entity';
import { ApplicationFileEntity } from './entities/application-file.entity';
import { ApplicationStatusEntity } from './entities/application-status.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      ApplicationFileEntity,
      ApplicationStatusEntity,
      UserEntity,
      JobInformationEntity,
      CompanyInformationEntity,
    ]),
    AuthModule,
  ],
  controllers: [ApplyController],
  providers: [ApplyService, JwtAuthGuard],
})
export class ApplyModule {}
