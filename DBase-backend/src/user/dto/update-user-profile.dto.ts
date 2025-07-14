import { Expose } from 'class-transformer';

export class UpdateUserProfileDto {
  @Expose()
  phone_number: string;

  @Expose()
  address: string;

  @Expose()
  affiliation: string;
}
