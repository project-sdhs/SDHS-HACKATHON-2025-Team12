import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApplicationStatusEntity } from './application-status.entity';

@Entity({ name: 'application_file', database: 'DBase' })
export class ApplicationFileEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'resume_path', type: 'varchar', length: 1024, nullable: true })
  resumePath: string;

  @Column({ name: 'portfolio_path', type: 'varchar', length: 1024, nullable: true })
  portfolioPath: string;

  @Column({
    name: 'etc_files',
    type: 'simple-array',
    nullable: true,
  })
  etcFiles: string[];

  @OneToOne(() => ApplicationStatusEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'application_id' })
  application: ApplicationStatusEntity;
}
