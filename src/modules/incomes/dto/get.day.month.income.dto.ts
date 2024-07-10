import { IsIn, IsNumberString, IsString } from 'class-validator';

export class GetSomeDayMonthIncomeDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  limit: string;

  @IsNumberString()
  year: string;

  @IsNumberString()
  month: string;

  @IsNumberString()
  day: string;

  @IsString()
  @IsIn(['all', 'cash', 'usd', 'plastik'])
  money_filter: string;
}
