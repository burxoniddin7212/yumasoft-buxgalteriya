import { IsNumberString } from 'class-validator';

export class GetSomeMonthDebtQueryDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  limit: string;

  @IsNumberString()
  year: string;

  @IsNumberString()
  month: string;
}
