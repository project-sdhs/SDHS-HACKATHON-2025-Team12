import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCompanyEntity } from '../user/entities/user.company.entity';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(UserCompanyEntity)
    private readonly userCompanyRepository: Repository<UserCompanyEntity>,
  ) {}

  async getEmployeeListByCompany(companyId: number) {
    const employees = await this.userCompanyRepository.find({
      where: {
        company_id: companyId,
        work_end_date: null,
      },
      relations: ['user'],
    });
    // 필요한 정보만 추려서 반환
    return employees.map((emp) => ({
      user_id: emp.user.id,
      name: emp.user.name,
      skills: emp.user.skills,
      work_start_date: emp.work_start_date,
      work_end_date: emp.work_end_date,
    }));
  }
}
