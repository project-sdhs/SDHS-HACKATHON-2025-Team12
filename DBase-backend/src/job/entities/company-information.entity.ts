import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { JobInformationEntity } from './job-information.entity';
import { PresentCompanyEntity } from './present-company.entity';

@Entity({ name: 'company_information', database: 'DBase' })
export class CompanyInformationEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'year', type: 'int' })
  year: number;

  @Column({ name: 'company_name', type: 'varchar', length: 255, unique: true })
  company_name: string;

  @Column({ name: 'deadline', type: 'varchar', nullable: true })
  deadline: string;

  @Column({ name: 'establishment_year', type: 'int' })
  establishment_year: number;

  @Column({ name: 'business_type', type: 'varchar', length: 255 })
  business_type: string;

  @Column({ name: 'employee_count', type: 'int' })
  employee_count: number;

  @Column({ name: 'main_business', type: 'text' })
  main_business: string;

  @Column({ name: 'website', type: 'varchar', length: 512, nullable: true })
  website?: string;

  @Column({ name: 'address', type: 'text' })
  address: string;

  @Column({ name: 'ai_analysis', type: 'text' })
  ai_analysis: string;

  @OneToMany(() => JobInformationEntity, (job) => job.company)
  jobs: JobInformationEntity[];

  @OneToMany(() => PresentCompanyEntity, (present) => present.company, {
    cascade: true,
  })
  present: PresentCompanyEntity[];
}
