import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SocialLoginEntity } from './social-login.entity';
import { UserCompanyEntity } from './user.company.entity';
import { ApplicationStatusEntity } from 'src/apply/entities/application-status.entity';
import { UserExperienceEntity } from './user.experience.entity';

@Entity({ name: 'user', database: 'DBase' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 191,
    nullable: false,
  })
  name: string;

  @Column({ name: 'email', type: 'varchar', length: 191, unique: true })
  email: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    unique: true,
    nullable: true,
  })
  phone_number?: string;

  @Column({ name: 'address', type: 'varchar', length: 191, nullable: true })
  address?: string;

  @Column({ name: 'category', type: 'varchar' })
  category: string;

  @Column({ name: 'affiliation', type: 'varchar', length: 191, nullable: true })
  affiliation?: string;

  @Column({ name: 'skills', type: 'text', nullable: true })
  skills?: string;

  @Column({ name: 'github_url', type: 'text', nullable: true })
  github_url?: string;

  @OneToOne(() => UserCompanyEntity, (company) => company.user, {
    cascade: true,
  })
  company: UserCompanyEntity;

  @OneToMany(() => UserExperienceEntity, (experience) => experience.user, {
    cascade: true,
  })
  experiences: UserExperienceEntity[];

  @OneToMany(
    () => ApplicationStatusEntity,
    (application) => application.user_id,
    {
      cascade: true,
    },
  )
  applications: ApplicationStatusEntity[];

  @OneToOne(() => SocialLoginEntity, (socialLogin) => socialLogin.user, {
    createForeignKeyConstraints: false,
    cascade: true,
  })
  socialLogin: SocialLoginEntity;

  @OneToOne(() => UserCompanyEntity, (uc) => uc.user, { cascade: true })
  userCompany: UserCompanyEntity;

  @Column({ name: 'created_at', type: 'bigint', nullable: false })
  createdAt: number;
}
