import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CompanyInformationEntity } from 'src/job/entities/company-information.entity';

@Entity({ name: 'user_company', database: 'DBase' })
export class UserCompanyEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'user_id', type: 'int', unique: true })
  userId: number;

  @Column({ name: 'employment_status', type: 'varchar', length: 50 })
  employment_status: string;

  @Column({ name: 'desired_position', type: 'varchar', length: 100 })
  desired_position?: string;

  @Column({ name: 'company_id', type: 'int', nullable: true })
  company_id: number;

  @Column({ nullable: true })
  company_name: string;

  @Column({ name: 'work_start_date', type: 'varchar', nullable: true })
  work_start_date?: String;

  @Column({ name: 'work_end_date', type: 'varchar', nullable: true })
  work_end_date?: String;

  @ManyToOne(() => UserEntity, (user) => user.company, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CompanyInformationEntity, (company) => company.present, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyInformationEntity;
}
