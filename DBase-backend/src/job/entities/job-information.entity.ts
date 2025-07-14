import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CompanyInformationEntity } from './company-information.entity';
import { ApplicationStatusEntity } from '../../apply/entities/application-status.entity';

@Entity({ name: 'job_information', database: 'DBase' })
export class JobInformationEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'company_id', type: 'int' })
  company_id: number;

  @ManyToOne(() => CompanyInformationEntity, (company) => company.jobs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyInformationEntity;

  @Column({ name: 'job_title', type: 'text', nullable: true })
  job_title: string;

  @Column({ name: 'recruitment_count', type: 'int' })
  recruitment_count: number;

  @Column({ name: 'job_description', type: 'text', nullable: true })
  job_description: string;

  @Column({ name: 'qualifications', type: 'text' })
  qualifications: string;

  @Column({ name: 'working_hours', type: 'text' })
  working_hours: string;

  @Column({ name: 'work_type', type: 'text' })
  work_type: string;

  @Column({ name: 'internship_pay', type: 'varchar', length: 100 })
  internship_pay: string;

  @Column({ name: 'salary', type: 'varchar', length: 100 })
  salary: string;

  @Column({ name: 'additional_requirements', type: 'text' })
  additional_requirements?: string;

  @OneToMany(() => ApplicationStatusEntity, (application) => application.job, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  applications: ApplicationStatusEntity[];
}
