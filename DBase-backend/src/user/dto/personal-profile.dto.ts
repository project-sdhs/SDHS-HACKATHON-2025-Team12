import { Expose } from 'class-transformer';

export class UserProfileDto {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phone_number: string;

  @Expose()
  address: string;

  @Expose()
  category: string;

  @Expose()
  affiliation: string;

  @Expose()
  skills: string;

  @Expose()
  github_url?: string;
}

export class CompanyDto {
  @Expose()
  employment_status: string;

  @Expose()
  desired_position?: string;

  @Expose()
  company_name?: string;

  @Expose()
  work_start_date?: string;

  @Expose()
  work_end_date?: string;
}

export class ExperiencesDto {
  @Expose()
  type: string;

  @Expose()
  date?: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  skills?: string;

  @Expose()
  url?: string;
}

export class PersonalProfileDto {
  user_profile: UserProfileDto;
  company: CompanyDto;
  experiences: ExperiencesDto[];
}
