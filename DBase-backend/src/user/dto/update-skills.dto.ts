import { Expose } from 'class-transformer';

export class UpdateSkillsDto {
  @Expose()
  skills: string;
}
