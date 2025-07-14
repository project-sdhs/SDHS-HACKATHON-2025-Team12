import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'user_experience', database: 'DBase' })
export class UserExperienceEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @Column({ name: 'type', type: 'varchar', length: 50 })
  type: string; // project, experience, award

  @Column({ name: 'date', type: 'varchar', length: 50, nullable: true })
  date?: String;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'skills', type: 'text', nullable: true })
  skills?: string;

  @Column({ name: 'url', type: 'varchar', length: 1024, nullable: true })
  url?: string;

  @ManyToOne(() => UserEntity, (user) => user.experiences, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
