import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CompanyInformationEntity } from './company-information.entity';

@Entity({ name: 'present_company', database: 'DBase' })
export class PresentCompanyEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'company_id', type: 'int' })
  company_id: number;

  @ManyToOne(() => CompanyInformationEntity, (company) => company.present, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyInformationEntity;
}
