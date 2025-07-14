import { Expose } from 'class-transformer';

export class UpdateExperienceDto {
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
