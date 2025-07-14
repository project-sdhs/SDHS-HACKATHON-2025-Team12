import { ApplicationFileEntity } from './entities/application-file.entity';
import { Body, Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import * as fs from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationStatusEntity } from './entities/application-status.entity';
import { Repository } from 'typeorm';
import { JobInformationEntity } from 'src/job/entities/job-information.entity';
import { CompanyInformationEntity } from 'src/job/entities/company-information.entity';

@Injectable()
export class ApplyService {
  constructor(
    private readonly userService: UserService,

    @InjectRepository(ApplicationStatusEntity)
    private readonly applicationStatusRepository: Repository<ApplicationStatusEntity>,
    @InjectRepository(JobInformationEntity)
    private readonly jobInformationRepository: Repository<JobInformationEntity>,
    @InjectRepository(ApplicationFileEntity)
    private readonly applicationFileEntity: Repository<ApplicationFileEntity>,
    @InjectRepository(CompanyInformationEntity)
    private readonly companyInformationRepository: Repository<CompanyInformationEntity>,
  ) {}

  async inputApply(
    files: {
      resumeAndCoverLetter: Express.Multer.File;
      portfolio: Express.Multer.File;
      etcFile: Express.Multer.File[];
    },
    @Body() body: { companyId: string },
    @Req() req: Request,
  ) {
    const identifier = req.cookies['identifier'];
    const user = await this.userService.findUserByIdentifier(identifier);
    const userId = user.id;
    const companyId = body.companyId;

    const job = await this.jobInformationRepository.findOne({
      where: { company_id: Number(companyId) },
    });
    if (!job) throw new Error('apply service: job not found');

    const application = await this.applicationStatusRepository.save({
      user_id: userId,
      job_id: job.id,
      status: '미확인',
      feedback: null,
    });

    const basePath = `./uploads/${companyId}/${userId}`;
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    }

    const moveFile = (file: Express.Multer.File) => {
      const newPath = `${basePath}/${file.originalname}`;
      fs.renameSync(file.path, newPath);
      return newPath;
    };

    const resumeAndCoverLetterPath = files.resumeAndCoverLetter?.[0] ? moveFile(files.resumeAndCoverLetter[0]) : null;
    const portfolioPath = files.portfolio?.[0]
      ? moveFile(files.portfolio[0])
      : null;
    const etcPaths = files.etcFile?.map((file) => moveFile(file)) ?? [];

    const applicationFile = this.applicationFileEntity.create({
      application: application,
      resumePath: resumeAndCoverLetterPath || null,
      portfolioPath: portfolioPath || null,
      etcFiles: etcPaths.length > 0 ? etcPaths : null,
    });

    await this.applicationFileEntity.save(applicationFile);

    return {
      success: true,
      applicationId: application.id,
      message: '지원서가 성공적으로 제출되었습니다.',
    };
  }

  async getApplicationStatus(req: Request) {
    const identifier = req.cookies['identifier'];
    const user = await this.userService.findUserByIdentifier(identifier);
    const userId = user.id;

    const applications = await this.applicationStatusRepository.find({
      where: { user_id: userId },
      relations: ['job', 'job.company', 'applicationFile'],
    });

    return applications.map((app) => ({
      id: app.id,
      status: app.status,
      feedback: app.feedback,
      jobTitle: app.job.job_title,
      companyName: app.job.company.company_name,
      companyId: app.job.company.id,
      applicationFile: app.applicationFile,
      userName: user.name || user.email, // 사용자 이름 또는 이메일
    }));
  }

  async downloadApplicationFiles(applicationId: number, req: Request) {
    const identifier = req.cookies['identifier'];
    const user = await this.userService.findUserByIdentifier(identifier);
    const userId = user.id;

    const application = await this.applicationStatusRepository.findOne({
      where: { id: applicationId, user_id: userId },
      relations: ['applicationFile'],
    });

    if (!application) {
      throw new Error('지원서를 찾을 수 없습니다.');
    }

    if (!application.applicationFile) {
      throw new Error('지원서 파일을 찾을 수 없습니다.');
    }

    const files = [];
    
    if (application.applicationFile.resumePath && fs.existsSync(application.applicationFile.resumePath)) {
      files.push({
        path: application.applicationFile.resumePath,
        filename: '이력서_자기소개서.pdf',
        type: 'resume'
      });
    }

    if (application.applicationFile.portfolioPath && fs.existsSync(application.applicationFile.portfolioPath)) {
      files.push({
        path: application.applicationFile.portfolioPath,
        filename: '포트폴리오.pdf',
        type: 'portfolio'
      });
    }

    if (application.applicationFile.etcFiles && application.applicationFile.etcFiles.length > 0) {
      application.applicationFile.etcFiles.forEach((filePath, index) => {
        if (fs.existsSync(filePath)) {
          files.push({
            path: filePath,
            filename: `기타파일_${index + 1}.pdf`,
            type: 'etc'
          });
        }
      });
    }

    if (files.length === 0) {
      throw new Error('다운로드할 파일이 없습니다.');
    }

    return files;
  }

  async updateApplicationStatus(applicationId: number, status: string, feedback?: string) {
    const application = await this.applicationStatusRepository.findOne({
      where: { id: applicationId },
    });

    if (!application) {
      throw new Error('지원서를 찾을 수 없습니다.');
    }

    application.status = status;
    if (feedback) {
      application.feedback = feedback;
    }

    await this.applicationStatusRepository.save(application);
    return { success: true, message: '상태가 업데이트되었습니다.' };
  }
}
