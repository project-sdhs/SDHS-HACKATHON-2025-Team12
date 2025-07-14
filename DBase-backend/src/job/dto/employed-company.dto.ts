import { Expose } from 'class-transformer';

export class EmployedCompanyDto {
  @Expose()
  company_name: string; // 회사 이름

  @Expose()
  business_type: string; // 모집 분야

  @Expose()
  establishment_year: string; // 회사 설립 연도

  @Expose()
  employee_count: number; // 전체 직원 수

  @Expose()
  main_business: string; // 주요 사업

  @Expose()
  website: string; // 회사 홈페이지 주소

  @Expose()
  address: string; // 주소
}
