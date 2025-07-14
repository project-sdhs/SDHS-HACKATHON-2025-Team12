import { CompanyInformationDto } from './ai-response.dto';
import { JobInformationDto } from './ai-response.dto';

export class UpdateCompanyDto {
  company_information: CompanyInformationDto;
  job_information: JobInformationDto;
}
