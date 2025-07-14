import { Body, Injectable } from '@nestjs/common';
import axios from 'axios';
import { JobInformationEntity } from './entities/job-information.entity';
import { CompanyInformationEntity } from './entities/company-information.entity';
import * as fs from 'fs';
import { Repository } from 'typeorm';
import {
  AIResponseDto,
  CompanyInformationDto,
  JobInformationDto,
} from './dto/ai-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanysDto } from './dto/company.dto';
import { EmployedCompanyDto } from './dto/employed-company.dto';
import { plainToInstance } from 'class-transformer';
import { PresentCompanyEntity } from './entities/present-company.entity';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobInformationEntity)
    private readonly jobInformationRepository: Repository<JobInformationEntity>,
    @InjectRepository(CompanyInformationEntity)
    private readonly companyInformationRepository: Repository<CompanyInformationEntity>,
    @InjectRepository(PresentCompanyEntity)
    private readonly presentCompanyRepository: Repository<PresentCompanyEntity>,
  ) {}

  async sendFile(fileName: string) {
    const fileId = (await this.companyInformationRepository.find()).length + 1;

    try {
      const response = await axios.post(
        'http://localhost:3000/api/process-pdf',
        {
          fileName,
        },
      );

      console.log('AI 서버로부터 상태 응답:', response.data.status);

      if (response.data.status !== 'success') {
        return { success: false, message: response.data.message };
      }

      const company = await this.companyInformationRepository.findOne({
        where: { id: fileId },
      });

      const job = await this.jobInformationRepository.findOne({
        where: { company_id: fileId },
      });

      if (!company || !job) {
        return {
          success: false,
          message: 'company와 job 데이터가 비어있습니다.',
        };
      }

      const companyInformation: CompanyInformationDto = plainToInstance(
        CompanyInformationDto,
        company,
        {
          excludeExtraneousValues: true,
        },
      );
      const jobInformation: JobInformationDto = plainToInstance(
        JobInformationDto,
        job,
        {
          excludeExtraneousValues: true,
        },
      );

      const result: AIResponseDto = {
        company_information: companyInformation,
        job_information: jobInformation,
      };

      return result;
    } catch (error) {
      console.error('Error sending file:', error);
      return {
        success: false,
        message: '서버 오류가 발생했습니다.',
      };
    }
  }

  async findAll() {
    const companies = await this.companyInformationRepository.find();

    if (!companies || companies.length === 0) {
      return { success: false, message: '데이터가 비어있습니다.' };
    }

    const result: CompanysDto[] = companies as CompanysDto[];

    return { success: true, result };
  }

  async findCompany(id: number) {
    const company = await this.companyInformationRepository.findOne({
      where: { id },
      relations: ['jobs'],
    });

    return company;
  }

  async findPinnedCompany(id: number) {
    const company = await this.companyInformationRepository.findOne({
      where: { id },
    });

    if (!company) return null;

    const result: EmployedCompanyDto = plainToInstance(
      EmployedCompanyDto,
      company,
      { excludeExtraneousValues: true },
    );
  }

  async findAllEmployedStatus() {
    return this.presentCompanyRepository.find({
      relations: ['company'],
      select: {
        company: {
          address: true,
        },
      },
    });
  }

  async updateCompanyAndJob(@Body() body: UpdateCompanyDto) {
    const { company_information, job_information } = body;

    const company = await this.companyInformationRepository.findOne({
      where: { id: company_information.id },
    });

    if (!company) throw new Error('회사를 찾을 수 없습니다.');

    company.company_name = company_information.company_name;
    company.deadline = company_information.deadline;
    company.establishment_year = company_information.establishment_year;
    company.business_type = company_information.business_type;
    company.employee_count = company_information.employee_count;
    company.main_business = company_information.main_business;
    company.website = company_information.website;
    company.address = company_information.address;

    await this.companyInformationRepository.save(company);

    const job = await this.jobInformationRepository.findOne({
      where: { company_id: company_information.id },
    });

    if (!job) throw new Error('채용 정보가 존재하지 않습니다.');

    job.job_title = job_information.job_title;
    job.recruitment_count = job_information.recruitment_count;
    job.job_description = job_information.job_description;
    job.qualifications = job_information.qualifications;
    job.working_hours = job_information.working_hours;
    job.work_type = job_information.work_type;
    job.internship_pay = job_information.internship_pay;
    job.salary = job_information.salary;
    job.additional_requirements = job_information.additional_requirements;

    await this.jobInformationRepository.save(job);

    return { success: true, message: '업데이트 완료' };
  }
}
