import { Expose } from 'class-transformer';

export class CompanysDto {
  @Expose()
  id: number; // 회사 ID

  @Expose()
  year: number; // 의뢰서 요청 연도

  @Expose()
  company_name: string; // 회사 이름

  @Expose()
  deadline: string; // 마감일

  @Expose()
  business_type: string; // 모집 분야

  @Expose()
  main_business: string; // 주요 사업

  @Expose()
  address: string; // 주소
}
