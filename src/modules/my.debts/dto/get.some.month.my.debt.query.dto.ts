import { IsNumberString } from 'class-validator';

export class GetSomeMonthMyDebtQueryDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  limit: string;

  @IsNumberString()
  year: string;

  @IsNumberString()
  month: string;
}
